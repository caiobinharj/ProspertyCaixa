import { Router } from 'express';
import {
  createAuction,
  getAuctions,
  getAuctionById,
  updateAuction,
  registerForAuction,
  placeBid,
  getAuctionBids,
  getAuctionRegistrations
} from '../controllers/auction.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Auction management
router.post('/', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'AUCTION_VENDOR', 'SUPER_ADMIN'), createAuction);
router.get('/', getAuctions);
router.get('/:id', getAuctionById);
router.put('/:id', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'AUCTION_VENDOR', 'SUPER_ADMIN'), updateAuction);

// Registration & Bidding
router.post('/:id/register', registerForAuction);
router.post('/:id/bid', placeBid);
router.get('/:id/bids', getAuctionBids);
router.get('/:id/registrations', getAuctionRegistrations);

export default router;




