import { Router } from 'express';
import { AdminCategoryController } from '@/controllers/adminCategoryController';
import { authenticateAdmin } from '@/middleware/authMiddleware';

const router = Router();

router.use(authenticateAdmin);

router.get('/', AdminCategoryController.getAll);
router.post('/', AdminCategoryController.create);
router.put('/:id', AdminCategoryController.update);
router.delete('/:id', AdminCategoryController.delete);

export default router;
