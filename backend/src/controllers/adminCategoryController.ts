import { Request, Response, NextFunction } from 'express';
import { AdminCategoryService } from '@/services/adminCategoryService';

export class AdminCategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await AdminCategoryService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await AdminCategoryService.createCategory(req.body);
      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const category = await AdminCategoryService.updateCategory(id, req.body);
      res.json({
        success: true,
        message: 'Category updated successfully',
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await AdminCategoryService.deleteCategory(id);
      res.json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}
