/**
 * PropertyInvest Service
 * Investment simulation engine (Flip, Hold, Rent scenarios)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface InvestmentScenario {
  scenario: 'FLIP' | 'HOLD' | 'RENT';
  purchasePrice: number;
  renovationCost?: number;
  holdingPeriod?: number; // months
  rentalIncome?: number; // monthly
  salePrice?: number;
  expenses?: {
    propertyTax?: number; // monthly
    insurance?: number; // monthly
    maintenance?: number; // monthly
    managementFee?: number; // % of rental income
  };
}

interface InvestmentResult {
  totalInvestment: number;
  totalReturn: number;
  netProfit: number;
  roi: number; // %
  irr?: number; // %
  paybackPeriod?: number; // months
  monthlyCashFlow?: number;
  breakEvenPoint?: number; // months
}

export class PropertyInvestService {
  /**
   * Simulate FLIP scenario
   */
  simulateFlip(scenario: InvestmentScenario): InvestmentResult {
    const totalInvestment = scenario.purchasePrice + (scenario.renovationCost || 0);
    const salePrice = scenario.salePrice || scenario.purchasePrice * 1.2; // Default 20% appreciation
    const totalReturn = salePrice;
    const netProfit = totalReturn - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;

    return {
      totalInvestment,
      totalReturn,
      netProfit,
      roi,
      paybackPeriod: 0 // Immediate sale
    };
  }

  /**
   * Simulate HOLD scenario (long-term investment)
   */
  simulateHold(scenario: InvestmentScenario): InvestmentResult {
    const holdingPeriod = scenario.holdingPeriod || 60; // Default 5 years
    const totalInvestment = scenario.purchasePrice;
    const appreciation = 0.05; // 5% annual appreciation
    const salePrice = totalInvestment * Math.pow(1 + appreciation, holdingPeriod / 12);
    const totalReturn = salePrice;
    const netProfit = totalReturn - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;

    // Calculate IRR (simplified)
    const irr = (Math.pow(salePrice / totalInvestment, 12 / holdingPeriod) - 1) * 100;

    return {
      totalInvestment,
      totalReturn,
      netProfit,
      roi,
      irr,
      paybackPeriod: holdingPeriod
    };
  }

  /**
   * Simulate RENT scenario (rental income)
   */
  simulateRent(scenario: InvestmentScenario): InvestmentResult {
    const totalInvestment = scenario.purchasePrice;
    const holdingPeriod = scenario.holdingPeriod || 60;
    const monthlyRental = scenario.rentalIncome || totalInvestment * 0.005; // 0.5% of purchase price
    const expenses = scenario.expenses || {};
    
    const monthlyExpenses = 
      (expenses.propertyTax || 0) +
      (expenses.insurance || 0) +
      (expenses.maintenance || 0) +
      (monthlyRental * (expenses.managementFee || 0.1));

    const monthlyCashFlow = monthlyRental - monthlyExpenses;
    const totalRentalIncome = monthlyCashFlow * holdingPeriod;
    const appreciation = 0.03; // 3% annual
    const finalValue = totalInvestment * Math.pow(1 + appreciation, holdingPeriod / 12);
    const totalReturn = totalRentalIncome + finalValue;
    const netProfit = totalReturn - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;

    // Break-even point
    const breakEvenPoint = totalInvestment / monthlyCashFlow;

    return {
      totalInvestment,
      totalReturn,
      netProfit,
      roi,
      monthlyCashFlow,
      breakEvenPoint,
      paybackPeriod: holdingPeriod
    };
  }

  /**
   * Run investment simulation
   */
  async simulateInvestment(assetId: string, scenario: InvestmentScenario): Promise<InvestmentResult> {
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
      include: {
        valuations: { orderBy: { generatedAt: 'desc' }, take: 1 },
        areaReports: { orderBy: { generatedAt: 'desc' }, take: 1 }
      }
    });

    if (!asset) {
      throw new Error('Asset not found');
    }

    // Use asset data to enhance scenario
    const purchasePrice = scenario.purchasePrice || asset.askingPrice || asset.estimatedValue || 0;

    let result: InvestmentResult;

    switch (scenario.scenario) {
      case 'FLIP':
        result = this.simulateFlip({ ...scenario, purchasePrice });
        break;
      case 'HOLD':
        result = this.simulateHold({ ...scenario, purchasePrice });
        break;
      case 'RENT':
        // Use AreaIQ data for rental estimates if available
        const areaReport = asset.areaReports[0];
        const marketRental = areaReport?.marketData 
          ? (areaReport.marketData as any).rentalYield 
          : undefined;
        
        result = this.simulateRent({
          ...scenario,
          purchasePrice,
          rentalIncome: scenario.rentalIncome || (purchasePrice * (marketRental || 0.005))
        });
        break;
      default:
        throw new Error('Invalid scenario');
    }

    return result;
  }

  /**
   * Compare multiple scenarios
   */
  async compareScenarios(assetId: string, scenarios: InvestmentScenario[]): Promise<{
    scenarios: { scenario: string; result: InvestmentResult }[];
    recommendation: string;
  }> {
    const results = await Promise.all(
      scenarios.map(async (scenario) => ({
        scenario: scenario.scenario,
        result: await this.simulateInvestment(assetId, scenario)
      }))
    );

    // Find best ROI
    const bestScenario = results.reduce((best, current) => 
      current.result.roi > best.result.roi ? current : best
    );

    return {
      scenarios: results,
      recommendation: `Recomendamos o cenário ${bestScenario.scenario} com ROI de ${bestScenario.result.roi.toFixed(2)}%`
    };
  }
}

export const propertyInvest = new PropertyInvestService();


