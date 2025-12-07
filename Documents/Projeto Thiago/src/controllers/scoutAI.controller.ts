import { Request, Response, NextFunction } from 'express';
import { scoutAI } from '../services/scoutAI.service';
import { AppError } from '../middleware/errorHandler';

export const aggregateListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = {
      city: req.query.city as string,
      state: req.query.state as string,
      propertyType: req.query.propertyType as string,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined
    };

    const listings = await scoutAI.aggregateListings(filters);

    res.json({
      success: true,
      data: { listings, count: listings.length }
    });
  } catch (error) {
    next(error);
  }
};




