import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/authService';
import { loginSchema } from '@/validators/authValidator';

export class AuthController {
  /**
   * POST /api/v1/admin/auth/login
   * Authenticate admin user and issue JWT
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsedBody = loginSchema.parse(req.body);
      const authResult = await AuthService.login(parsedBody);

      if (!authResult) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password credentials.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: authResult,
      });
    } catch (error) {
      next(error);
    }
  }
}
