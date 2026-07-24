import { api, ApiResponse } from '@/services/api';

export interface CategoryTreeDto {
  id: number;
  name: string;
  slug: string;
  tagName: string;
  children?: CategoryTreeDto[];
}

export class CategoryService {
  static async getCategories(): Promise<ApiResponse<CategoryTreeDto[]>> {
    return api.get<CategoryTreeDto[]>('/categories');
  }
}
