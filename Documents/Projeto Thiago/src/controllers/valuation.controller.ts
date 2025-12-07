import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const prisma = new PrismaClient();

const generateValuationSchema = z.object({
  assetId: z.string().uuid(),
  valuationType: z.enum(['AVM_SALE', 'AVM_RENT', 'MANUAL_APPRAISAL', 'MARKET_COMPARISON'])
});

// Mock AVM service - would integrate with actual AVM API
async function generateAVM(asset: any, type: string): Promise<any> {
  // This would call external AVM service
  // For now, return mock data based on asset properties
  
  const baseValue = asset.area * 5000; // R$ 5,000 per m² base
  const adjustments = {
    bedrooms: asset.bedrooms ? asset.bedrooms * 50000 : 0,
    bathrooms: asset.bathrooms ? asset.bathrooms * 30000 : 0,
    location: 0.1, // Location multiplier
    condition: 0.9 // Condition multiplier
  };

  const estimatedValue = baseValue * (1 + adjustments.location) * adjustments.condition 
    + adjustments.bedrooms + adjustments.bathrooms;

  const confidence = 0.75; // Mock confidence score

  // Mock comparables
  const comparables = [
    {
      address: 'Similar Property 1',
      price: estimatedValue * 0.95,
      area: asset.area * 0.98,
      distance: 0.5
    },
    {
      address: 'Similar Property 2',
      price: estimatedValue * 1.05,
      area: asset.area * 1.02,
      distance: 0.8
    }
  ];

  return {
    estimatedValue: Math.round(estimatedValue),
    confidence,
    comparables,
    methodology: 'Automated Valuation Model (AVM) using comparable sales and property characteristics'
  };
}

export const generateValuation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId, valuationType } = generateValuationSchema.parse(req.body);

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

      if (!subscription || subscription.credits <= subscription.creditsUsed) {
        throw new AppError('Insufficient credits for valuation', 402);
      }

      // Deduct credit
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          creditsUsed: { increment: 1 }
        }
      });
    }

    // Generate valuation
    const avmResult = await generateAVM(asset, valuationType);

    const valuation = await prisma.valuation.create({
      data: {
        assetId,
        valuationType,
        estimatedValue: avmResult.estimatedValue,
        confidence: avmResult.confidence,
        methodology: avmResult.methodology,
        comparables: avmResult.comparables,
        reportData: avmResult
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

    // Update asset estimated value if AVM
    if (valuationType === 'AVM_SALE' || valuationType === 'AVM_RENT') {
      await prisma.asset.update({
        where: { id: assetId },
        data: { estimatedValue: avmResult.estimatedValue }
      });
    }

    res.status(201).json({
      success: true,
      data: { valuation }
    });
  } catch (error) {
    next(error);
  }
};

export const getValuations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      assetId,
      valuationType
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};

    if (assetId) where.assetId = assetId;
    if (valuationType) where.valuationType = valuationType;

    // Filter by user access
    if (req.user!.role === 'AGENT' || req.user!.role === 'USER') {
      // Only show valuations for assets they have access to
      // This would need additional access control logic
    }

    const [valuations, total] = await Promise.all([
      prisma.valuation.findMany({
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
      prisma.valuation.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        valuations,
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

export const getValuationById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const valuation = await prisma.valuation.findUnique({
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

    if (!valuation) {
      throw new AppError('Valuation not found', 404);
    }

    res.json({
      success: true,
      data: { valuation }
    });
  } catch (error) {
    next(error);
  }
};




