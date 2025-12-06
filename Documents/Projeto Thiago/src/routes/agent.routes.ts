import { Router } from 'express';
import {
  getAgents,
  getAgentById,
  updateAgentProfile,
  certifyAgent,
  getAgentStats
} from '../controllers/agent.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.get('/:id/stats', getAgentStats);
router.put('/:id/profile', updateAgentProfile);
router.post('/:id/certify', authorize('CAIXA_ADMIN', 'SUPER_ADMIN'), certifyAgent);

export default router;


