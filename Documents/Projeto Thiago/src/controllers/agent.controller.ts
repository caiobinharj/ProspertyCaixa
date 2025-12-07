import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getAgents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      isActive,
      isCertified,
      region
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {
      user: {
        role: 'AGENT'
      }
    };

    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (isCertified !== undefined) where.isCertified = isCertified === 'true';
    if (region) where.regions = { has: region };

    const [agents, total] = await Promise.all([
      prisma.agentProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.agentProfile.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        agents,
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

export const getAgentById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const agent = await prisma.agentProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            createdAt: true
          }
        }
      }
    });

    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    res.json({
      success: true,
      data: { agent }
    });
  } catch (error) {
    next(error);
  }
};

export const getAgentStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const agent = await prisma.agentProfile.findUnique({
      where: { id }
    });

    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Get lead stats
    const leadStats = await prisma.lead.groupBy({
      by: ['status'],
      where: { assignedToId: agent.userId },
      _count: true
    });

    // Get conversion rate
    const conversionRate = agent.totalLeads > 0
      ? (agent.convertedLeads / agent.totalLeads) * 100
      : 0;

    res.json({
      success: true,
      data: {
        agent,
        stats: {
          totalLeads: agent.totalLeads,
          convertedLeads: agent.convertedLeads,
          totalSales: agent.totalSales,
          totalVolume: agent.totalVolume,
          conversionRate: Math.round(conversionRate * 100) / 100,
          rating: agent.rating,
          leadBreakdown: leadStats
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAgentProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if user can update (own profile or admin)
    if (req.user!.id !== id && !['CAIXA_ADMIN', 'SUPER_ADMIN'].includes(req.user!.role)) {
      throw new AppError('Unauthorized', 403);
    }

    const agent = await prisma.agentProfile.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: { agent }
    });
  } catch (error) {
    next(error);
  }
};

export const certifyAgent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const agent = await prisma.agentProfile.update({
      where: { id },
      data: {
        isCertified: true,
        certifiedAt: new Date()
      }
    });

    res.json({
      success: true,
      data: { agent }
    });
  } catch (error) {
    next(error);
  }
};




