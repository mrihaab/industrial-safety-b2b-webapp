import { api, ApiResponse } from '@/services/api';

export interface AdminRfqItem {
  id: number;
  company_name: string;
  business_email: string;
  industry_segment: string;
  monthly_volume: string;
  detailed_requirements: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  created_at: string;
  items?: {
    id: number;
    product_id: number;
    quantity: number;
    size_range: string;
    product_title?: string;
    sku?: string;
    price?: number;
  }[];
}

export class AdminRfqService {
  static async getRfqs(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<AdminRfqItem[]>> {
    return api.get<AdminRfqItem[]>('/admin/rfqs', params as Record<string, string | number>);
  }

  static async getRfqById(id: number): Promise<ApiResponse<AdminRfqItem>> {
    return api.get<AdminRfqItem>(`/admin/rfqs/${id}`);
  }

  static async updateStatus(id: number, status: string): Promise<ApiResponse<AdminRfqItem>> {
    return api.put<AdminRfqItem>(`/admin/rfqs/${id}/status`, { status });
  }

  static async deleteRfq(id: number): Promise<ApiResponse<void>> {
    return api.delete<void>(`/admin/rfqs/${id}`);
  }
}
