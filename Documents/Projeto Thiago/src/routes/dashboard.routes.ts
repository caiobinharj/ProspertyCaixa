import { Router } from 'express';
import {
  getDashboardStats,
  getAssetStats,
  getAuctionStats,
  getLeadStats,
  getAgentPerformance
} from '../controllers/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/stats', getDashboardStats);
router.get('/assets', getAssetStats);
router.get('/auctions', getAuctionStats);
router.get('/leads', getLeadStats);
router.get('/agents', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), getAgentPerformance);

export default router;




