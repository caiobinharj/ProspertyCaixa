import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';
import { createAuditLog } from '../utils/audit';

const prisma = new PrismaClient();

const createAssetSchema = z.object({
  assetCode: z.string(),
  assetType: z.enum(['REO', 'JUDICIAL_AUCTION', 'SOCIAL_HOUSING', 'REPOSSESSED_DEVELOPER', 'DISTRESSED']),
  title: z.string(),
  description: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'MIXED_USE']),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().int().optional(),
  area: z.number(),
  lotArea: z.number().optional(),
  constructionYear: z.number().int().optional(),
  estimatedValue: z.number().optional(),
  askingPrice: z.number().optional(),
  reservePrice: z.number().optional(),
  legalStatus: z.enum(['FORECLOSURE_PENDING', 'REPOSSESSED', 'JUDICIAL_PROCESS', 'CLEAR_TITLE', 'TITLE_DISPUTE']),
  hasTitleIssues: z.boolean().default(false),
  hasOccupancy: z.boolean().default(false),
  foreclosureStage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.any()).optional()
});

export const createAsset = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createAssetSchema.parse(req.body);

    const asset = await prisma.asset.create({
      data
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: asset.id,
      action: 'CREATE_ASSET',
      entityType: 'Asset',
      entityId: asset.id,
      changes: { created: data }
    });

    res.status(201).json({
      success: true,
      data: { asset }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssets = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      status,
      assetType,
      city,
      state,
      search
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};

    if (status) where.status = status;
    if (assetType) where.assetType = assetType;
    if (city) where.city = { contains: city as string, mode: 'insensitive' };
    if (state) where.state = state;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { address: { contains: search as string, mode: 'insensitive' } },
        { assetCode: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [assets, total] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          media: {
            where: { isPrimary: true },
            take: 1
          },
          _count: {
            select: {
              leads: true,
              auctions: true
            }
          }
        }
      }),
      prisma.asset.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        assets,
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

export const getAssetById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        documents: true,
        media: true,
        auctions: {
          orderBy: { scheduledStart: 'desc' },
          take: 5
        },
        valuations: {
          orderBy: { generatedAt: 'desc' },
          take: 1
        },
        areaReports: {
          orderBy: { generatedAt: 'desc' },
          take: 1
        },
        _count: {
          select: {
            leads: true
          }
        }
      }
    });

    if (!asset) {
      throw new AppError('Asset not found', 404);
    }

    res.json({
      success: true,
      data: { asset }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAsset = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingAsset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      throw new AppError('Asset not found', 404);
    }

    const asset = await prisma.asset.update({
      where: { id },
      data: updateData
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: asset.id,
      action: 'UPDATE_ASSET',
      entityType: 'Asset',
      entityId: asset.id,
      changes: { before: existingAsset, after: asset }
    });

    res.json({
      success: true,
      data: { asset }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAsset = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const asset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!asset) {
      throw new AppError('Asset not found', 404);
    }

    await prisma.asset.delete({
      where: { id }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: id,
      action: 'DELETE_ASSET',
      entityType: 'Asset',
      entityId: id
    });

    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAssetDocuments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const documents = await prisma.document.findMany({
      where: { assetId: id },
      orderBy: { uploadedAt: 'desc' }
    });

    res.json({
      success: true,
      data: { documents }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAssetDocument = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // File upload handling would go here
    // For now, assuming file URL is provided
    const { fileName, fileUrl, fileType, documentType } = req.body;

    const document = await prisma.document.create({
      data: {
        assetId: id,
        fileName,
        fileUrl,
        fileType,
        documentType
      }
    });

    res.status(201).json({
      success: true,
      data: { document }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssetMedia = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findMany({
      where: { assetId: id },
      orderBy: { uploadedAt: 'desc' }
    });

    res.json({
      success: true,
      data: { media }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAssetMedia = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { fileUrl, mediaType, isPrimary } = req.body;

    // If setting as primary, unset others
    if (isPrimary) {
      await prisma.media.updateMany({
        where: { assetId: id, isPrimary: true },
        data: { isPrimary: false }
      });
    }

    const media = await prisma.media.create({
      data: {
        assetId: id,
        fileUrl,
        mediaType,
        isPrimary: isPrimary || false
      }
    });

    res.status(201).json({
      success: true,
      data: { media }
    });
  } catch (error) {
    next(error);
  }
};




