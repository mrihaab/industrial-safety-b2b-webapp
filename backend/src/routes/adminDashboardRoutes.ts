import { Router } from 'express';
import { AdminDashboardController } from '@/controllers/adminDashboardController';
import { authenticateAdmin } from '@/middleware/authMiddleware';

const router = Router();

router.use(authenticateAdmin);
router.get('/stats', AdminDashboardController.getStats);

export default router;
