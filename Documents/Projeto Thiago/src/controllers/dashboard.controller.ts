import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalAssets = await prisma.asset.count();
    const activeAuctions = await prisma.auction.count({
      where: { status: 'ACTIVE' }
    });
    const totalLeads = await prisma.lead.count();
    const convertedLeads = await prisma.lead.count({
      where: { status: 'CONVERTED' }
    });

    const assetsByStatus = await prisma.asset.groupBy({
      by: ['status'],
      _count: true
    });

    const assetsByType = await prisma.asset.groupBy({
      by: ['assetType'],
      _count: true
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalAssets,
          activeAuctions,
          totalLeads,
          convertedLeads,
          conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
        },
        assetsByStatus,
        assetsByType
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssetStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      startDate,
      endDate,
      city,
      state
    } = req.query;

    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    if (city) where.city = city;
    if (state) where.state = state;

    const stats = await prisma.asset.groupBy({
      by: ['status', 'assetType'],
      where,
      _count: true,
      _avg: {
        estimatedValue: true,
        askingPrice: true
      },
      _sum: {
        area: true
      }
    });

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
};

export const getAuctionStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalAuctions = await prisma.auction.count();
    const completedAuctions = await prisma.auction.count({
      where: { status: 'COMPLETED' }
    });
    const failedAuctions = await prisma.auction.count({
      where: { status: 'FAILED' }
    });

    const avgBidsPerAuction = await prisma.auction.aggregate({
      _avg: {
        totalBids: true
      }
    });

    const avgParticipants = await prisma.auction.aggregate({
      _avg: {
        participants: true
      }
    });

    res.json({
      success: true,
      data: {
        totalAuctions,
        completedAuctions,
        failedAuctions,
        successRate: totalAuctions > 0 ? (completedAuctions / totalAuctions) * 100 : 0,
        avgBidsPerAuction: avgBidsPerAuction._avg.totalBids || 0,
        avgParticipants: avgParticipants._avg.participants || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const where: any = {};

    // Filter by user role
    if (req.user!.role === 'AGENT') {
      where.assignedToId = req.user!.id;
    }

    const leadStats = await prisma.lead.groupBy({
      by: ['status', 'source'],
      where,
      _count: true
    });

    const totalLeads = await prisma.lead.count({ where });
    const convertedLeads = await prisma.lead.count({
      where: { ...where, status: 'CONVERTED' }
    });

    res.json({
      success: true,
      data: {
        leadBreakdown: leadStats,
        totalLeads,
        convertedLeads,
        conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAgentPerformance = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await prisma.agentProfile.findMany({
      where: {
        isActive: true
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        convertedLeads: 'desc'
      },
      take: 10
    });

    const performance = agents.map(agent => ({
      agent: agent.user,
      stats: {
        totalLeads: agent.totalLeads,
        convertedLeads: agent.convertedLeads,
        conversionRate: agent.totalLeads > 0
          ? (agent.convertedLeads / agent.totalLeads) * 100
          : 0,
        totalSales: agent.totalSales,
        totalVolume: agent.totalVolume,
        rating: agent.rating
      }
    }));

    res.json({
      success: true,
      data: { performance }
    });
  } catch (error) {
    next(error);
  }
};


