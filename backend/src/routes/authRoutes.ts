import { Router } from 'express';
import { AuthController } from '@/controllers/authController';

const router = Router();

// POST /api/v1/admin/auth/login - Admin Login
router.post('/login', AuthController.login);

export default router;
