import { api, ApiResponse } from '@/services/api';

export interface RfqInputDto {
  companyName: string;
  businessEmail: string;
  industrySegment: string;
  monthlyVolume: string;
  detailedRequirements?: string;
  items: {
    productId: number;
    quantity: number;
    sizeRange: string;
  }[];
}

export interface RfqResponseDto {
  inquiryId: number;
  companyName: string;
  businessEmail: string;
  status: string;
  createdAt: string;
}

export class RfqService {
  static async submitRfq(input: RfqInputDto): Promise<ApiResponse<RfqResponseDto>> {
    const payload = {
      company_name: input.companyName,
      companyName: input.companyName,
      business_email: input.businessEmail,
      businessEmail: input.businessEmail,
      industry_segment: input.industrySegment,
      industrySegment: input.industrySegment,
      monthly_volume: input.monthlyVolume,
      monthlyVolume: input.monthlyVolume,
      detailed_requirements: (input.detailedRequirements || '').trim() || 'Bulk quotation inquiry for industrial PPE safety gear',
      detailedRequirements: (input.detailedRequirements || '').trim() || 'Bulk quotation inquiry for industrial PPE safety gear',
      items: (input.items && input.items.length > 0 ? input.items : [{ productId: 1, quantity: 100, sizeRange: 'Assorted S/M/L/XL' }]).map(item => ({
        product_id: item.productId || 1,
        productId: item.productId || 1,
        quantity: item.quantity || 100,
        size_range: item.sizeRange || 'Assorted S/M/L/XL',
        sizeRange: item.sizeRange || 'Assorted S/M/L/XL',
      })),
    };

    return api.post<RfqResponseDto>('/rfq', payload);
  }
}
