import { Router } from 'express';
import { simulateInvestment, compareScenarios } from '../controllers/propertyInvest.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/simulate', simulateInvestment);
router.post('/compare', compareScenarios);

export default router;




