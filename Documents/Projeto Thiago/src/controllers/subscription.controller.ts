import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const prisma = new PrismaClient();

const subscriptionCredits = {
  FREE: 0,
  STARTER: 5,
  PRO: 20,
  INVESTOR_PLUS: 100
};

export const createSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { planType } = req.body;

    // Check for existing active subscription
    const existing = await prisma.subscription.findFirst({
      where: {
        userId: req.user!.id,
        status: 'ACTIVE'
      }
    });

    if (existing) {
      throw new AppError('User already has an active subscription', 400);
    }

    const credits = subscriptionCredits[planType as keyof typeof subscriptionCredits] || 0;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month subscription

    const subscription = await prisma.subscription.create({
      data: {
        userId: req.user!.id,
        planType,
        credits,
        expiresAt
      }
    });

    res.status(201).json({
      success: true,
      data: { subscription }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: req.user!.id
      },
      orderBy: { startedAt: 'desc' }
    });

    res.json({
      success: true,
      data: { subscriptions }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const subscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!subscription || subscription.userId !== req.user!.id) {
      throw new AppError('Subscription not found', 404);
    }

    res.json({
      success: true,
      data: { subscription }
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { planType, status } = req.body;

    const subscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!subscription || subscription.userId !== req.user!.id) {
      throw new AppError('Subscription not found', 404);
    }

    const updateData: any = {};
    if (planType) {
      updateData.planType = planType;
      updateData.credits = subscriptionCredits[planType as keyof typeof subscriptionCredits] || 0;
    }
    if (status) updateData.status = status;

    const updated = await prisma.subscription.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: { subscription: updated }
    });
  } catch (error) {
    next(error);
  }
};

export const purchaseCredits = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { credits } = req.body;

    const subscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!subscription || subscription.userId !== req.user!.id) {
      throw new AppError('Subscription not found', 404);
    }

    const updated = await prisma.subscription.update({
      where: { id },
      data: {
        credits: { increment: credits }
      }
    });

    res.json({
      success: true,
      data: { subscription: updated }
    });
  } catch (error) {
    next(error);
  }
};




