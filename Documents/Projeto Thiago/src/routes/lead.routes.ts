import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  assignLead,
  convertLead
} from '../controllers/lead.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.post('/:id/assign', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), assignLead);
router.post('/:id/convert', convertLead);

export default router;


