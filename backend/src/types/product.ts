export interface ProductRow {
  id: number;
  category_id: number;
  sku: string;
  title: string;
  slug: string;
  series_name: string;
  price: number;
  moq: number;
  stock_status: string;
  status_tag: string;
  description: string;
  size_options?: string;
  rating_score: number;
  review_count: number;
  is_featured: boolean;
  created_at: Date;
  category_name?: string;
  category_slug?: string;
  tag_name?: string;
}

export interface ProductImageRow {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  is_video: boolean;
  size_code?: string;
}

export interface ProductSpecRow {
  id: number;
  product_id: number;
  spec_key: string;
  spec_value: string;
}

export interface ProductFeatureRow {
  id: number;
  product_id: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface ProductListQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  stock?: string;
  protection_level?: string;
  material?: string;
  certification?: string;
  sort?: string;
}

export interface ProductListItemDto {
  id: number;
  sku: string;
  title: string;
  slug: string;
  price: number;
  status_tag: string;
  short_tag: string;
  image_url: string;
  certifications: string[];
}

export interface ProductDetailDto {
  id: number;
  title: string;
  slug: string;
  sku: string;
  series_name: string;
  price: number;
  moq: number;
  stock_status: string;
  status_tag: string;
  description: string;
  size_options?: string;
  rating_score: number;
  review_count: number;
  gallery: Array<{
    url: string;
    is_primary: boolean;
    is_video: boolean;
    size_code?: string;
  }>;
  specs: Array<{
    key: string;
    value: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface PaginatedProductsResult {
  products: ProductListItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
