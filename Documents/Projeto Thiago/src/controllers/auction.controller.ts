import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';
import { createAuditLog } from '../utils/audit';

const prisma = new PrismaClient();

const createAuctionSchema = z.object({
  assetId: z.string().uuid(),
  auctionCode: z.string(),
  auctionType: z.enum(['ENGLISH', 'DUTCH', 'SEALED_BID', 'HYBRID']),
  scheduledStart: z.string().datetime(),
  scheduledEnd: z.string().datetime().optional(),
  startingBid: z.number(),
  reservePrice: z.number().optional(),
  bidIncrement: z.number(),
  auctionRules: z.record(z.any()).optional(),
  vendorId: z.string().optional(),
  vendorName: z.string().optional()
});

export const createAuction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createAuctionSchema.parse(req.body);

    // Verify asset exists
    const asset = await prisma.asset.findUnique({
      where: { id: data.assetId }
    });

    if (!asset) {
      throw new AppError('Asset not found', 404);
    }

    const auction = await prisma.auction.create({
      data: {
        ...data,
        scheduledStart: new Date(data.scheduledStart),
        scheduledEnd: data.scheduledEnd ? new Date(data.scheduledEnd) : undefined
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

    // Update asset status
    await prisma.asset.update({
      where: { id: data.assetId },
      data: { status: 'AUCTION_SCHEDULED' }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: data.assetId,
      action: 'CREATE_AUCTION',
      entityType: 'Auction',
      entityId: auction.id
    });

    res.status(201).json({
      success: true,
      data: { auction }
    });
  } catch (error) {
    next(error);
  }
};

export const getAuctions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = '1',
      limit = '20',
      status,
      auctionType,
      assetId
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};

    if (status) where.status = status;
    if (auctionType) where.auctionType = auctionType;
    if (assetId) where.assetId = assetId;

    const [auctions, total] = await Promise.all([
      prisma.auction.findMany({
        where,
        skip,
        take,
        orderBy: { scheduledStart: 'desc' },
        include: {
          asset: {
            include: {
              media: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          _count: {
            select: {
              bids: true,
              registrations: true
            }
          }
        }
      }),
      prisma.auction.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        auctions,
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

export const getAuctionById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        asset: {
          include: {
            documents: true,
            media: true,
            valuations: {
              orderBy: { generatedAt: 'desc' },
              take: 1
            }
          }
        },
        bids: {
          orderBy: { placedAt: 'desc' },
          take: 10,
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
        },
        _count: {
          select: {
            registrations: true,
            bids: true
          }
        }
      }
    });

    if (!auction) {
      throw new AppError('Auction not found', 404);
    }

    res.json({
      success: true,
      data: { auction }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAuction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const auction = await prisma.auction.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: { auction }
    });
  } catch (error) {
    next(error);
  }
};

export const registerForAuction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { kycData } = req.body;

    const auction = await prisma.auction.findUnique({
      where: { id }
    });

    if (!auction) {
      throw new AppError('Auction not found', 404);
    }

    // Check if already registered
    const existing = await prisma.auctionRegistration.findUnique({
      where: {
        auctionId_userId: {
          auctionId: id,
          userId: req.user!.id
        }
      }
    });

    if (existing) {
      throw new AppError('Already registered for this auction', 400);
    }

    const registration = await prisma.auctionRegistration.create({
      data: {
        auctionId: id,
        userId: req.user!.id,
        kycData,
        kycStatus: 'PENDING' // Would be processed by KYC service
      }
    });

    res.status(201).json({
      success: true,
      data: { registration }
    });
  } catch (error) {
    next(error);
  }
};

export const placeBid = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          take: 1
        }
      }
    });

    if (!auction) {
      throw new AppError('Auction not found', 404);
    }

    if (auction.status !== 'ACTIVE') {
      throw new AppError('Auction is not active', 400);
    }

    // Check registration
    const registration = await prisma.auctionRegistration.findUnique({
      where: {
        auctionId_userId: {
          auctionId: id,
          userId: req.user!.id
        }
      }
    });

    if (!registration || registration.kycStatus !== 'APPROVED') {
      throw new AppError('Must be registered and KYC approved to bid', 403);
    }

    // Validate bid amount
    const currentHighest = auction.bids[0]?.amount || auction.startingBid;
    const minBid = currentHighest + auction.bidIncrement;

    if (amount < minBid) {
      throw new AppError(`Minimum bid is ${minBid}`, 400);
    }

    // Unset previous winning bid
    await prisma.bid.updateMany({
      where: { auctionId: id, isWinning: true },
      data: { isWinning: false }
    });

    // Create new bid
    const bid = await prisma.bid.create({
      data: {
        auctionId: id,
        userId: req.user!.id,
        amount,
        isWinning: true
      }
    });

    // Update auction stats
    await prisma.auction.update({
      where: { id },
      data: {
        totalBids: { increment: 1 },
        winningBidId: bid.id
      }
    });

    await createAuditLog({
      userId: req.user!.id,
      assetId: auction.assetId,
      action: 'PLACE_BID',
      entityType: 'Bid',
      entityId: bid.id,
      changes: { amount }
    });

    res.status(201).json({
      success: true,
      data: { bid }
    });
  } catch (error) {
    next(error);
  }
};

export const getAuctionBids = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const bids = await prisma.bid.findMany({
      where: { auctionId: id },
      orderBy: { placedAt: 'desc' },
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
      data: { bids }
    });
  } catch (error) {
    next(error);
  }
};

export const getAuctionRegistrations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const registrations = await prisma.auctionRegistration.findMany({
      where: { auctionId: id },
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
      data: { registrations }
    });
  } catch (error) {
    next(error);
  }
};


