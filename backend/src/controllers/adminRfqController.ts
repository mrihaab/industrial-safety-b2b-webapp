import { Request, Response, NextFunction } from 'express';
import { AdminRfqService } from '@/services/adminRfqService';

export class AdminRfqController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string;
      const search = req.query.search as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await AdminRfqService.getRfqs({ status, search, page, limit });
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const rfq = await AdminRfqService.getRfqDetails(id);
      if (!rfq) {
        return res.status(404).json({ success: false, message: 'RFQ inquiry not found' });
      }
      res.json({ success: true, data: rfq });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!['pending', 'approved', 'completed', 'rejected'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }

      const rfq = await AdminRfqService.updateStatus(id, status);
      res.json({
        success: true,
        message: `RFQ status updated to ${status}`,
        data: rfq,
      });
    } catch (err) {
      next(err);
    }
  }
}
