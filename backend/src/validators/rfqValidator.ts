import { z } from 'zod';

export const createRfqItemSchema = z.object({
  product_id: z.number().int().positive('Valid product_id is required'),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
  size_range: z.string().trim().optional().default('Assorted S/M/L/XL'),
});

export const createRfqSchema = z.preprocess(
  (data: any) => {
    if (!data || typeof data !== 'object') return data;
    return {
      company_name: data.company_name || data.companyName,
      business_email: data.business_email || data.businessEmail,
      industry_segment: data.industry_segment || data.industrySegment,
      monthly_volume: data.monthly_volume || data.monthlyVolume,
      detailed_requirements: (data.detailed_requirements || data.detailedRequirements || '').trim() || 'Bulk quotation inquiry for industrial PPE safety gear',
      items: Array.isArray(data.items) && data.items.length > 0
        ? data.items.map((item: any) => ({
            product_id: Number(item.product_id ?? item.productId ?? item.id ?? 1),
            quantity: Number(item.quantity ?? 100),
            size_range: item.size_range || item.sizeRange || 'Assorted S/M/L/XL',
          }))
        : [{ product_id: 1, quantity: 100, size_range: 'Assorted S/M/L/XL' }],
    };
  },
  z.object({
    company_name: z.string().min(2, 'Company name is required').trim(),
    business_email: z.string().email('Valid business email is required').trim(),
    industry_segment: z.string().min(2, 'Industry segment is required').trim(),
    monthly_volume: z.string().min(2, 'Monthly volume is required').trim(),
    detailed_requirements: z.string().min(5, 'Detailed requirements must be at least 5 characters').trim(),
    items: z.array(createRfqItemSchema).min(1, 'At least one item is required in quote request'),
  })
);
