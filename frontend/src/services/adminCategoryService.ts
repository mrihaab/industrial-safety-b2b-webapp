import { api, ApiResponse } from '@/services/api';

export interface AdminCategoryItem {
  id: number;
  parent_id?: number | null;
  name: string;
  slug: string;
  tag_name: string;
  product_count?: number;
  parent_name?: string;
}

export class AdminCategoryService {
  static async getCategories(): Promise<ApiResponse<AdminCategoryItem[]>> {
    return api.get<AdminCategoryItem[]>('/admin/categories');
  }

  static async createCategory(payload: { name: string; slug?: string; tag_name?: string; parent_id?: number | null }): Promise<ApiResponse<AdminCategoryItem>> {
    return api.post<AdminCategoryItem>('/admin/categories', payload);
  }

  static async updateCategory(id: number, payload: { name: string; slug?: string; tag_name?: string; parent_id?: number | null }): Promise<ApiResponse<AdminCategoryItem>> {
    return api.put<AdminCategoryItem>(`/admin/categories/${id}`, payload);
  }

  static async deleteCategory(id: number): Promise<ApiResponse<void>> {
    return api.delete<void>(`/admin/categories/${id}`);
  }
}
