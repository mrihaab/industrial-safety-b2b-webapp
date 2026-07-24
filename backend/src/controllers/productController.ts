import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/services/productService';
import { productListQuerySchema, productSlugParamSchema } from '@/validators/productValidator';

export class ProductController {
  /**
   * GET /api/v1/products
   * List paginated products with filter & sort options
   */
  static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedQuery = productListQuerySchema.parse(req.query);
      const result = await ProductService.getProducts(parsedQuery);

      res.status(200).json({
        success: true,
        data: result.products,
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/products/:slug
   * Retrieve single product detail by slug
   */
  static async getProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = productSlugParamSchema.parse(req.params);
      const product = await ProductService.getProductBySlug(slug);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}
