import { api, ApiResponse } from '@/services/api';

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  pendingRfqs: number;
  completedRfqs: number;
  todayRfqs: number;
  monthlyRfqs: number;
  lowStockProducts: number;
  latestProducts: {
    id: number;
    sku: string;
    title: string;
    price: number;
    moq: number;
    stock_status: string;
    category_name: string;
  }[];
  latestInquiries: {
    id: number;
    company_name: string;
    business_email: string;
    industry_segment: string;
    status: string;
    created_at: string;
  }[];
}

export class AdminDashboardService {
  static async getStats(): Promise<ApiResponse<DashboardStats>> {
    return api.get<DashboardStats>('/admin/dashboard/stats');
  }
}
