import { AdminProductModel, AdminCreateProductInput, AdminUpdateProductInput } from '@/models/adminProductModel';
import { ProductModel } from '@/models/productModel';
import { ProductDetailDto } from '@/types/product';
import { ProductService } from '@/services/productService';
import { dbPool } from '@/config/db';

export class AdminProductService {
  /**
   * Create new product with optional uploaded files, specs, and features
   */
  static async createProduct(
    input: AdminCreateProductInput,
    files?: Express.Multer.File[],
    specsJson?: string,
    featuresJson?: string
  ): Promise<ProductDetailDto | null> {
    const productId = await AdminProductModel.insertProduct(input);

    // Save uploaded media files
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        const isPrimary = i === 0;
        const isVideo = file.mimetype.includes('video');
        await AdminProductModel.insertProductImage(productId, imageUrl, isPrimary, isVideo);
      }
    } else {
      // Default placeholder primary image
      await AdminProductModel.insertProductImage(productId, '/uploads/gsh-glove-1.jpg', true, false);
    }

    // Save specs if provided
    if (specsJson) {
      try {
        const specsArray = JSON.parse(specsJson);
        if (Array.isArray(specsArray)) {
          for (const s of specsArray) {
            if (s.key && s.value) {
              await AdminProductModel.insertProductSpec(productId, s.key, s.value);
            }
          }
        }
      } catch (err) {
        console.warn('[Admin Product Service]: Failed to parse specs JSON:', err);
      }
    }

    // Save features if provided
    if (featuresJson) {
      try {
        const featuresArray = JSON.parse(featuresJson);
        if (Array.isArray(featuresArray)) {
          for (const f of featuresArray) {
            if (f.title && f.description) {
              await AdminProductModel.insertProductFeature(productId, f.title, f.description, f.icon || 'shield');
            }
          }
        }
      } catch (err) {
        console.warn('[Admin Product Service]: Failed to parse features JSON:', err);
      }
    }

    return ProductService.getProductBySlug(input.slug);
  }

  /**
   * Update product by ID and process optional uploaded files
   */
  static async updateProduct(
    id: number,
    input: AdminUpdateProductInput,
    files?: Express.Multer.File[]
  ): Promise<ProductDetailDto | null> {
    const success = await AdminProductModel.updateProduct(id, input);

    if (files && files.length > 0) {
      await dbPool.query('DELETE FROM product_images WHERE product_id = ?', [id]);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        const isPrimary = i === 0;
        const isVideo = file.mimetype.includes('video');
        await AdminProductModel.insertProductImage(id, imageUrl, isPrimary, isVideo);
      }
    }

    const [rows] = await Promise.all([ProductModel.findProducts({ limit: 1000 })]);
    const updatedRow = rows.find(r => r.id === id);
    if (!updatedRow) return null;

    return ProductService.getProductBySlug(updatedRow.slug);
  }

  /**
   * Delete product by ID
   */
  static async deleteProduct(id: number): Promise<boolean> {
    return AdminProductModel.deleteProduct(id);
  }
}
