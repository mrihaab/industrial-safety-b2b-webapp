import { api, ApiResponse } from '@/services/api';
import { ProductDetailDto } from '@/services/productService';

export class AdminProductService {
  static async createProduct(formData: FormData): Promise<ApiResponse<ProductDetailDto>> {
    return api.post<ProductDetailDto>('/admin/products', formData);
  }

  static async updateProduct(id: number, data: unknown): Promise<ApiResponse<ProductDetailDto>> {
    return api.put<ProductDetailDto>(`/admin/products/${id}`, data);
  }

  static async deleteProduct(id: number): Promise<ApiResponse<{ message: string }>> {
    return api.delete<{ message: string }>(`/admin/products/${id}`);
  }
}
