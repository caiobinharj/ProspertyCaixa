import { Router } from 'express';
import { aggregateListings } from '../controllers/scoutAI.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/listings', aggregateListings);

export default router;




