import { Router } from 'express';
import { ProductController } from '@/controllers/productController';

const router = Router();

// GET /api/v1/products - Get paginated product list with search and filters
router.get('/', ProductController.getProducts);

// GET /api/v1/products/:slug - Get product detail by slug
router.get('/:slug', ProductController.getProductBySlug);

export default router;
