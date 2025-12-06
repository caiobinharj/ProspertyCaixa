import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const prisma = new PrismaClient();

const generateAreaReportSchema = z.object({
  assetId: z.string().uuid(),
  areaType: z.enum(['NEIGHBORHOOD', 'MUNICIPALITY', 'REGION', 'STATE'])
});

// Mock AreaIQ service - would integrate with actual service
async function generateAreaIQ(asset: any, areaType: string): Promise<any> {
  // This would call external AreaIQ service
  // For now, return mock data
  
  const areaName = asset.neighborhood || asset.city || asset.state;
  
  // Mock scoring (0-100)
  const demandScore = 65 + Math.random() * 20;
  const supplyScore = 70 + Math.random() * 15;
  const infrastructureScore = 60 + Math.random() * 25;
  
  const overallScore = (demandScore * 0.4 + supplyScore * 0.3 + infrastructureScore * 0.3);

  // Mock price trend
  const priceTrend = {
    last6Months: [
      { month: '2024-07', avgPrice: 450000 },
      { month: '2024-08', avgPrice: 465000 },
      { month: '2024-09', avgPrice: 480000 },
      { month: '2024-10', avgPrice: 475000 },
      { month: '2024-11', avgPrice: 490000 },
      { month: '2024-12', avgPrice: 505000 }
    ],
    trend: 'INCREASING',
    changePercent: 12.2
  };

  const marketData = {
    totalListings: 1250,
    activeListings: 342,
    avgDaysOnMarket: 45,
    pricePerSqm: 8500,
    rentalYield: 6.5,
    schools: 12,
    hospitals: 3,
    shoppingCenters: 2,
    publicTransport: 'HIGH',
    safetyIndex: 7.2
  };

  return {
    areaName,
    score: Math.round(overallScore * 100) / 100,
    demandScore: Math.round(demandScore * 100) / 100,
    supplyScore: Math.round(supplyScore * 100) / 100,
    infrastructureScore: Math.round(infrastructureScore * 100) / 100,
    priceTrend,
    marketData
  };
}

export const generateAreaReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId, areaType } = generateAreaReportSchema.parse(req.body);

    const asset = await prisma.asset.findUnique({
      where: { id: assetId }
    });

    if (!asset) {
      throw new AppError('Asset not found', 404);
    }

    // Check subscription/credits for non-CAIXA users
    if (!['CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'].includes(req.user!.role)) {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: req.user!.id,
          status: 'ACTIVE',
          expiresAt: { gte: new Date() }
        }
      });

      if (!subscription || subscription.credits < 3) {
        throw new AppError('Insufficient credits for area report (requires 3 credits)', 402);
      }

      // Deduct credits
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          creditsUsed: { increment: 3 }
        }
      });
    }

    // Generate report
    const areaIQResult = await generateAreaIQ(asset, areaType);

    const areaReport = await prisma.areaReport.create({
      data: {
        assetId,
        areaType,
        areaName: areaIQResult.areaName,
        score: areaIQResult.score,
        demandScore: areaIQResult.demandScore,
        supplyScore: areaIQResult.supplyScore,
        infrastructureScore: areaIQResult.infrastructureScore,
        priceTrend: areaIQResult.priceTrend,
        marketData: areaIQResult.marketData
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

    res.status(201).json({
      success: true,
      data: { areaReport }
    });
  } catch (error) {
    next(error);
  }
};

export const getAreaReports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      assetId,
      areaType,
      areaName
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};

    if (assetId) where.assetId = assetId;
    if (areaType) where.areaType = areaType;
    if (areaName) where.areaName = { contains: areaName as string, mode: 'insensitive' };

    const [reports, total] = await Promise.all([
      prisma.areaReport.findMany({
        where,
        skip,
        take,
        orderBy: { generatedAt: 'desc' },
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
      }),
      prisma.areaReport.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        reports,
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

export const getAreaReportById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const report = await prisma.areaReport.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            documents: true,
            media: true
          }
        }
      }
    });

    if (!report) {
      throw new AppError('Area report not found', 404);
    }

    res.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    next(error);
  }
};


