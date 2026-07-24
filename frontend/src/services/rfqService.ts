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
    return api.post<RfqResponseDto>('/rfq', input);
  }
}
