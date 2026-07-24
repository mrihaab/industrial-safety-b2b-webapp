import { Request, Response, NextFunction } from 'express';
import { RfqService } from '@/services/rfqService';
import { createRfqSchema } from '@/validators/rfqValidator';

export class RfqController {
  /**
   * POST /api/v1/rfq
   * Submit enterprise quotation request
   */
  static async createRfq(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedBody = createRfqSchema.parse(req.body);
      const result = await RfqService.createRfq(parsedBody);

      res.status(201).json({
        success: true,
        message: 'Quotation request initialized successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
