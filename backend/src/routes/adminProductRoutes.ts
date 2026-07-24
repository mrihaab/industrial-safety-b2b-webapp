import { Router } from 'express';
import { AdminProductController } from '@/controllers/adminProductController';
import { authenticateAdmin } from '@/middleware/authMiddleware';
import { uploadProductMedia } from '@/middleware/uploadMiddleware';

const router = Router();

// POST /api/v1/admin/products - Create Product (JWT Protected + Multer Upload)
router.post(
  '/',
  authenticateAdmin,
  uploadProductMedia.array('images', 5),
  AdminProductController.createProduct
);

// PUT /api/v1/admin/products/:id - Update Product (JWT Protected)
router.put('/:id', authenticateAdmin, AdminProductController.updateProduct);

// DELETE /api/v1/admin/products/:id - Delete Product (JWT Protected)
router.delete('/:id', authenticateAdmin, AdminProductController.deleteProduct);

export default router;
