import { ProductModel } from '@/models/productModel';
import {
  ProductListQuery,
  ProductDetailDto,
  PaginatedProductsResult,
} from '@/types/product';

export class ProductService {
  /**
   * Get paginated products with formatted DTOs matching ProductCardData
   */
  static async getProducts(query: ProductListQuery): Promise<PaginatedProductsResult> {
    const page = query.page || 1;
    const limit = query.limit || 12;

    const [productRows, total] = await Promise.all([
      ProductModel.findProducts(query),
      ProductModel.countProducts(query),
    ]);

    // Build ProductListItemDto list
    const products: any[] = await Promise.all(
      productRows.map(async row => {
        const [images, specs] = await Promise.all([
          ProductModel.findProductImages(row.id),
          ProductModel.findProductSpecs(row.id),
        ]);

        const primaryImage = images.find(img => img.is_primary) || images[0];
        const imageUrl = primaryImage ? primaryImage.image_url : '/uploads/placeholder.jpg';

        const certifications = specs
          .filter(spec => 
            spec.spec_key.toLowerCase().includes('cert') || 
            spec.spec_key.toLowerCase().includes('protection') ||
            spec.spec_value.toLowerCase().includes('ansi') ||
            spec.spec_value.toLowerCase().includes('ce') ||
            spec.spec_value.toLowerCase().includes('iso')
          )
          .map(spec => spec.spec_value)
          .slice(0, 3);

        return {
          id: row.id,
          sku: row.sku,
          title: row.title,
          slug: row.slug,
          seriesName: row.series_name || 'HEAVY DUTY SERIES',
          price: Number(row.price),
          moq: row.moq || 50,
          stockStatus: row.stock_status || 'IN STOCK',
          statusTag: row.status_tag || 'Safety-System-Active',
          ratingScore: Number(row.rating_score) || 4.9,
          reviewCount: row.review_count || 12,
          primaryImage: imageUrl,
          image_url: imageUrl,
          status_tag: row.status_tag || 'Safety-System-Active',
          short_tag: row.tag_name || 'Industrial Safety',
          certifications: certifications.length > 0 ? certifications : ['CE Certified'],
        };
      })
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      products,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Get product details by slug with gallery, specs, and features
   */
  static async getProductBySlug(slug: string): Promise<ProductDetailDto | null> {
    const product = await ProductModel.findProductBySlug(slug);
    if (!product) return null;

    const [images, specs, features] = await Promise.all([
      ProductModel.findProductImages(product.id),
      ProductModel.findProductSpecs(product.id),
      ProductModel.findProductFeatures(product.id),
    ]);

    const primaryImage = images.find(img => img.is_primary) || images[0];

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      sku: product.sku,
      seriesName: product.series_name || 'Heavy Duty Series',
      price: Number(product.price),
      moq: product.moq || 50,
      stockStatus: product.stock_status || 'IN STOCK',
      statusTag: product.status_tag || 'Safety-System-Active',
      ratingScore: Number(product.rating_score) || 5.0,
      reviewCount: product.review_count || 0,
      primaryImage: primaryImage ? primaryImage.image_url : '/uploads/placeholder.jpg',
      description: product.description,
      images: images.map(img => img.image_url),
      gallery: images.map(img => ({
        url: img.image_url,
        is_primary: Boolean(img.is_primary),
        is_video: Boolean(img.is_video),
      })),
      specs: specs.map(s => ({
        key: s.spec_key,
        value: s.spec_value,
      })),
      features: features.map(f => ({
        title: f.title,
        description: f.description,
        icon: f.icon_name,
      })),
    } as any;
  }
}
