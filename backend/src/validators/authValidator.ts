import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid admin email is required').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters').trim(),
});
