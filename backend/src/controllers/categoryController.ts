import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/services/categoryService';

export class CategoryController {
  /**
   * GET /api/v1/categories
   * Retrieve hierarchical category tree
   */
  static async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await CategoryService.getCategoryTree();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
