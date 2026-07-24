import { Router } from 'express';
import { CategoryController } from '@/controllers/categoryController';

const router = Router();

// GET /api/v1/categories - Get hierarchical category tree
router.get('/', CategoryController.getCategories);

export default router;
