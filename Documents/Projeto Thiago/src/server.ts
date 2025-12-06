import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth.routes';
import assetRoutes from './routes/asset.routes';
import auctionRoutes from './routes/auction.routes';
import leadRoutes from './routes/lead.routes';
import agentRoutes from './routes/agent.routes';
import valuationRoutes from './routes/valuation.routes';
import areaReportRoutes from './routes/areaReport.routes';
import subscriptionRoutes from './routes/subscription.routes';
import dashboardRoutes from './routes/dashboard.routes';
import scoutAIRoutes from './routes/scoutAI.routes';
import propertyInvestRoutes from './routes/propertyInvest.routes';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Prosperty Brazil API'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/valuations', valuationRoutes);
app.use('/api/area-reports', areaReportRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/scout-ai', scoutAIRoutes);
app.use('/api/property-invest', propertyInvestRoutes);

// Error handling
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
    
    app.listen(PORT, () => {
      logger.info(`🚀 Prosperty Brazil API running on port ${PORT}`);
      logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

