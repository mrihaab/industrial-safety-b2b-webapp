import { z } from 'zod';

// Zod validation schema for GET /api/v1/products query params
export const productListQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z.string().optional().transform(val => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 12)),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  protection_level: z.string().trim().optional(),
  material: z.string().trim().optional(),
  certification: z.string().trim().optional(),
  sort: z.enum(['performance', 'newest', 'price_high_low']).optional().default('performance'),
});

// Zod validation schema for GET /api/v1/products/:slug route params
export const productSlugParamSchema = z.object({
  slug: z.string().min(1, 'Product slug is required').trim(),
});
