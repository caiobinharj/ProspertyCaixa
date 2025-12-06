import { Request, Response, NextFunction } from 'express';
import { propertyInvest } from '../services/propertyInvest.service';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

const simulateSchema = z.object({
  assetId: z.string().uuid(),
  scenario: z.enum(['FLIP', 'HOLD', 'RENT']),
  purchasePrice: z.number().optional(),
  renovationCost: z.number().optional(),
  holdingPeriod: z.number().optional(),
  rentalIncome: z.number().optional(),
  salePrice: z.number().optional(),
  expenses: z.object({
    propertyTax: z.number().optional(),
    insurance: z.number().optional(),
    maintenance: z.number().optional(),
    managementFee: z.number().optional()
  }).optional()
});

export const simulateInvestment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = simulateSchema.parse(req.body);
    // Ensure purchasePrice is defined
    const scenario = {
      ...data,
      purchasePrice: data.purchasePrice || 0
    };
    const result = await propertyInvest.simulateInvestment(data.assetId, scenario);

    res.json({
      success: true,
      data: { result }
    });
  } catch (error) {
    next(error);
  }
};

export const compareScenarios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId, scenarios } = req.body;
    const result = await propertyInvest.compareScenarios(assetId, scenarios);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};


