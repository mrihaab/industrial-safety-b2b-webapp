import { Request, Response, NextFunction } from 'express';
import { AdminDashboardService } from '@/services/adminDashboardService';

export class AdminDashboardController {
  static async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await AdminDashboardService.getStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      next(err);
    }
  }
}
