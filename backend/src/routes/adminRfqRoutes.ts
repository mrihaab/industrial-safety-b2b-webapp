import { Router } from 'express';
import { AdminRfqController } from '@/controllers/adminRfqController';
import { authenticateAdmin } from '@/middleware/authMiddleware';

const router = Router();

router.use(authenticateAdmin);

router.get('/', AdminRfqController.getAll);
router.get('/:id', AdminRfqController.getById);
router.put('/:id/status', AdminRfqController.updateStatus);
router.delete('/:id', AdminRfqController.deleteRfq);

export default router;
