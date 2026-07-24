import { z } from 'zod';

export const createRfqItemSchema = z.object({
  product_id: z.number().int().positive('Valid product_id is required'),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
  size_range: z.string().trim().optional().default('Assorted S/M/L/XL'),
});

export const createRfqSchema = z.object({
  company_name: z.string().min(2, 'Company name is required').trim(),
  business_email: z.string().email('Valid business email is required').trim(),
  industry_segment: z.string().min(2, 'Industry segment is required').trim(),
  monthly_volume: z.string().min(2, 'Monthly volume is required').trim(),
  detailed_requirements: z.string().min(5, 'Detailed requirements must be at least 5 characters').trim(),
  items: z.array(createRfqItemSchema).min(1, 'At least one item is required in quote request'),
});
