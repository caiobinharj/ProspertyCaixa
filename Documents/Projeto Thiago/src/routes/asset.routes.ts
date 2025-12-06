import { Router } from 'express';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  getAssetDocuments,
  uploadAssetDocument,
  getAssetMedia,
  uploadAssetMedia
} from '../controllers/asset.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Asset CRUD
router.post('/', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), createAsset);
router.get('/', getAssets);
router.get('/:id', getAssetById);
router.put('/:id', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), updateAsset);
router.delete('/:id', authorize('CAIXA_ADMIN', 'SUPER_ADMIN'), deleteAsset);

// Documents & Media
router.get('/:id/documents', getAssetDocuments);
router.post('/:id/documents', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), uploadAssetDocument);
router.get('/:id/media', getAssetMedia);
router.post('/:id/media', authorize('CAIXA_ADMIN', 'CAIXA_OPERATOR', 'SUPER_ADMIN'), uploadAssetMedia);

export default router;


