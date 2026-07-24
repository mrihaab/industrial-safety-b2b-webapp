import { Request, Response, NextFunction } from 'express';
import { AdminProductService } from '@/services/adminProductService';
import {
  createAdminProductSchema,
  updateAdminProductSchema,
  productIdParamSchema,
} from '@/validators/adminProductValidator';

export class AdminProductController {
  /**
   * POST /api/v1/admin/products
   * Create new product with uploaded files
   */
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedBody = createAdminProductSchema.parse(req.body);
      const files = req.files as Express.Multer.File[] | undefined;

      const product = await AdminProductService.createProduct(
        parsedBody,
        files,
        parsedBody.specs,
        parsedBody.features
      );

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/v1/admin/products/:id
   * Update existing product details & optional uploaded files
   */
  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const parsedBody = updateAdminProductSchema.parse(req.body);
      const files = req.files as Express.Multer.File[] | undefined;

      const product = await AdminProductService.updateProduct(id, parsedBody, files);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found or no changes made',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/admin/products/:id
   * Delete product by ID
   */
  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = productIdParamSchema.parse(req.params);
      const success = await AdminProductService.deleteProduct(id);

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
