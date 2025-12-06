import { Router } from 'express';
import {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  purchaseCredits
} from '../controllers/subscription.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.post('/', createSubscription);
router.put('/:id', updateSubscription);
router.post('/:id/credits', purchaseCredits);

export default router;


