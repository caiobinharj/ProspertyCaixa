import { Router } from 'express';
import {
  generateValuation,
  getValuations,
  getValuationById
} from '../controllers/valuation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/generate', generateValuation);
router.get('/', getValuations);
router.get('/:id', getValuationById);

export default router;




