import { api, ApiResponse } from '@/services/api';
import { ProductCardData } from '@/components/product/ProductCard';

export interface ProductDetailDto extends ProductCardData {
  description: string;
  images: string[];
  size_options?: string;
  sizeOptions?: string;
  gallery?: Array<{
    url: string;
    is_primary?: boolean;
    is_video?: boolean;
  }>;
  specs: { key: string; value: string }[];
  features: { title: string; description: string; icon: string }[];
}

export class ProductService {
  static async getProducts(params?: {
    category?: string;
    stock?: string;
    sort?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<ProductCardData[]>> {
    return api.get<ProductCardData[]>('/products', params as Record<string, string | number>);
  }

  static async getProductBySlug(slug: string): Promise<ApiResponse<ProductDetailDto>> {
    return api.get<ProductDetailDto>(`/products/${slug}`);
  }
}
