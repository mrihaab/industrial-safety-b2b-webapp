import { z } from 'zod';

export const createAdminProductSchema = z.object({
  category_id: z.coerce.number().int().positive('Valid category_id is required'),
  sku: z.string().min(3, 'SKU must be at least 3 characters').trim(),
  title: z.string().min(3, 'Title is required').trim(),
  slug: z.string().min(3, 'Slug is required').trim(),
  series_name: z.string().trim().optional().default('Heavy Duty Series'),
  price: z.coerce.number().nonnegative('Price must be non-negative'),
  moq: z.coerce.number().int().min(1, 'MOQ must be at least 1').optional().default(50),
  stock_status: z.string().trim().optional().default('IN STOCK'),
  status_tag: z.string().trim().optional().default('Safety-System-Active'),
  description: z.string().min(5, 'Description is required').trim(),
  size_options: z.string().trim().optional().default('Assorted S/M/L/XL'),
  rating_score: z.coerce.number().min(0).max(5).optional().default(5.0),
  review_count: z.coerce.number().int().nonnegative().optional().default(0),
  is_featured: z.coerce.boolean().optional().default(false),
  certifications: z.string().optional(),
  existing_images: z.string().optional(),
  specs: z.string().optional(),
  features: z.string().optional(),
});

export const updateAdminProductSchema = createAdminProductSchema.partial();

export const productIdParamSchema = z.object({
  id: z.coerce.number().int().positive('Valid product ID is required'),
});
