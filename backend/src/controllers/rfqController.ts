import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
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
    } catch (error: any) {
      if (error instanceof ZodError) {
        const readableMsg = error.errors.map(err => err.message).join('. ');
        res.status(400).json({
          success: false,
          message: readableMsg || 'Please provide valid quotation details.',
        });
        return;
      }
      next(error);
    }
  }
}
