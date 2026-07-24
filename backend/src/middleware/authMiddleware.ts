import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload } from '@/types/auth';

export function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Bearer token missing.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'ghulam_safety_hub_jwt_super_secret_key_2026';

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (decoded.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access forbidden. Administrator privileges required.',
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
    return;
  }
}
