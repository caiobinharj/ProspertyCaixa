import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';
import { createAuditLog } from '../utils/audit';

const prisma = new PrismaClient();

const createLeadSchema = z.object({
  assetId: z.string().uuid().optional(),
  source: z.enum(['PORTAL_INQUIRY', 'PHONE_CALL', 'EMAIL', 'AUCTION_REGISTRATION', 'AGENT_REFERRAL', 'MARKETPLACE_SYNDICATION']),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  intent: z.enum(['BUY', 'INVEST', 'RENT', 'AUCTION_PARTICIPATION', 'INFORMATION']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM')
});

export const createLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        ...data,
        createdById: req.user!.id
      },
      include: {
        asset: {
          include: {
            media: {
              where: { isPrimary: true },
              take: 1
            }
          }
        }
      }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: lead.assetId || undefined,
      action: 'CREATE_LEAD',
      entityType: 'Lead',
      entityId: lead.id
    });

    res.status(201).json({
      success: true,
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      status,
      assignedToId,
      assetId,
      source
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};

    // Filter by user role
    if (req.user!.role === 'AGENT') {
      where.assignedToId = req.user!.id;
    }

    if (status) where.status = status;
    if (assignedToId) where.assignedToId = assignedToId;
    if (assetId) where.assetId = assetId;
    if (source) where.source = source;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          asset: {
            include: {
              media: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          assignedTo: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prisma.lead.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          page: parseInt(page as string),
          limit: take,
          total,
          pages: Math.ceil(total / take)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            documents: true,
            media: true
          }
        },
        assignedTo: {
          include: {
            agentProfile: true
          }
        },
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!lead) {
      throw new AppError('Lead not found', 404);
    }

    res.json({
      success: true,
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...updateData,
        lastContactAt: updateData.status ? new Date() : undefined
      }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: lead.assetId || undefined,
      action: 'UPDATE_LEAD',
      entityType: 'Lead',
      entityId: lead.id,
      changes: updateData
    });

    res.json({
      success: true,
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};

export const assignLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { agentId } = req.body;

    // Verify agent exists
    const agent = await prisma.user.findUnique({
      where: { id: agentId },
      include: { agentProfile: true }
    });

    if (!agent || agent.role !== 'AGENT' || !agent.agentProfile?.isActive) {
      throw new AppError('Invalid or inactive agent', 400);
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        assignedToId: agentId,
        status: 'CONTACTED'
      },
      include: {
        assignedTo: {
          include: {
            agentProfile: true
          }
        }
      }
    });

    // Update agent stats
    await prisma.agentProfile.update({
      where: { userId: agentId },
      data: {
        totalLeads: { increment: 1 }
      }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: lead.assetId || undefined,
      action: 'ASSIGN_LEAD',
      entityType: 'Lead',
      entityId: lead.id,
      changes: { assignedTo: agentId }
    });

    res.json({
      success: true,
      data: { lead }
    });
  } catch (error) {
    next(error);
  }
};

export const convertLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: true
      }
    });

    if (!lead) {
      throw new AppError('Lead not found', 404);
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: 'CONVERTED',
        convertedAt: new Date()
      }
    });

    // Update agent stats if assigned
    if (lead.assignedToId) {
      await prisma.agentProfile.update({
        where: { userId: lead.assignedToId },
        data: {
          convertedLeads: { increment: 1 }
        }
      });
    }

    await createAuditLog({
      userId: req.user!.id,
      assetId: lead.assetId || undefined,
      action: 'CONVERT_LEAD',
      entityType: 'Lead',
      entityId: lead.id
    });

    res.json({
      success: true,
      data: { lead: updatedLead }
    });
  } catch (error) {
    next(error);
  }
};


