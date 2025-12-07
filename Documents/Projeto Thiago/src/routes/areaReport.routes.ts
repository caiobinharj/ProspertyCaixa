import { Router } from 'express';
import {
  generateAreaReport,
  getAreaReports,
  getAreaReportById
} from '../controllers/areaReport.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/generate', generateAreaReport);
router.get('/', getAreaReports);
router.get('/:id', getAreaReportById);

export default router;




