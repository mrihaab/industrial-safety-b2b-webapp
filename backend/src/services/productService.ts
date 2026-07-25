import { ProductModel } from '@/models/productModel';
import {
  ProductListQuery,
  ProductDetailDto,
  ProductImageRow,
  ProductSpecRow,
  PaginatedProductsResult,
} from '@/types/product';

export class ProductService {
  /**
   * Get paginated products with formatted DTOs matching ProductCardData (N+1 Query Optimized)
   */
  static async getProducts(query: ProductListQuery): Promise<PaginatedProductsResult> {
    const page = query.page || 1;
    const limit = query.limit || 12;

    const [productRows, total] = await Promise.all([
      ProductModel.findProducts(query),
      ProductModel.countProducts(query),
    ]);

    if (productRows.length === 0) {
      return {
        products: [],
        total: 0,
        page,
        limit,
        totalPages: 1,
      };
    }

    // Batch retrieve images & specs for all fetched products in 2 queries total
    const productIds = productRows.map(r => r.id);
    const [allImages, allSpecs] = await Promise.all([
      ProductModel.findImagesForProducts(productIds),
      ProductModel.findSpecsForProducts(productIds),
    ]);

    const imagesByProduct = new Map<number, ProductImageRow[]>();
    for (const img of allImages) {
      if (!imagesByProduct.has(img.product_id)) {
        imagesByProduct.set(img.product_id, []);
      }
      imagesByProduct.get(img.product_id)!.push(img);
    }

    const specsByProduct = new Map<number, ProductSpecRow[]>();
    for (const spec of allSpecs) {
      if (!specsByProduct.has(spec.product_id)) {
        specsByProduct.set(spec.product_id, []);
      }
      specsByProduct.get(spec.product_id)!.push(spec);
    }

    const products: any[] = productRows.map(row => {
      const images = imagesByProduct.get(row.id) || [];
      const specs = specsByProduct.get(row.id) || [];

      const primaryImage = images.find(img => img.is_primary) || images[0];
      const imageUrl = primaryImage ? primaryImage.image_url : '/uploads/gsh-glove-1.jpg';

      const certifications = specs
        .filter(spec => 
          spec.spec_key.toLowerCase() === 'certification' || 
          spec.spec_key.toLowerCase() === 'certifications'
        )
        .map(spec => spec.spec_value);

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
        description: row.description,
        isFeatured: Boolean(row.is_featured),
        is_featured: Boolean(row.is_featured),
        status_tag: row.status_tag || 'Safety-System-Active',
        short_tag: row.tag_name || 'Industrial Safety',
        certifications: certifications,
      };
    });

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
   * Get product details by slug with gallery, size_code per image, specs, size options, and features
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
      seriesName: product.series_name || 'HEAVY DUTY SERIES',
      price: Number(product.price),
      moq: product.moq || 50,
      stockStatus: product.stock_status || 'IN STOCK',
      statusTag: product.status_tag || 'Safety-System-Active',
      ratingScore: Number(product.rating_score) || 5.0,
      reviewCount: product.review_count || 0,
      size_options: product.size_options || 'Assorted S/M/L/XL',
      sizeOptions: product.size_options || 'Assorted S/M/L/XL',
      primaryImage: primaryImage ? primaryImage.image_url : '/uploads/gsh-glove-1.jpg',
      description: product.description,
      isFeatured: Boolean(product.is_featured),
      is_featured: Boolean(product.is_featured),
      certifications: specs
        .filter(spec => 
          spec.spec_key.toLowerCase() === 'certification' || 
          spec.spec_key.toLowerCase() === 'certifications'
        )
        .map(spec => spec.spec_value),
      images: images.map(img => img.image_url),
      gallery: images.map(img => ({
        url: img.image_url,
        is_primary: Boolean(img.is_primary),
        is_video: Boolean(img.is_video),
        size_code: img.size_code || undefined,
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
