import path from 'path';
import fs from 'fs';
import { AdminProductModel, AdminCreateProductInput, AdminUpdateProductInput } from '@/models/adminProductModel';
import { ProductModel } from '@/models/productModel';
import { ProductDetailDto } from '@/types/product';
import { ProductService } from '@/services/productService';
import { dbPool } from '@/config/db';

export class AdminProductService {
  /**
   * Helper to safely remove file from uploads folder on disk
   */
  private static deletePhysicalFile(imageUrl: string): void {
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
    try {
      const filename = imageUrl.replace('/uploads/', '');
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.warn('[File Cleanup Warning]: Could not delete file:', imageUrl, err);
    }
  }

  /**
   * Create new product with uploaded multi-images, size_code mappings, specs, and features
   */
  static async createProduct(
    input: AdminCreateProductInput,
    files?: Express.Multer.File[],
    specsJson?: string,
    featuresJson?: string,
    sizeMappingsJson?: string
  ): Promise<ProductDetailDto | null> {
    const productId = await AdminProductModel.insertProduct(input);

    let sizeMappings: Record<number, string> = {};
    if (sizeMappingsJson) {
      try {
        sizeMappings = JSON.parse(sizeMappingsJson);
      } catch (err) {
        console.warn('[Admin Product Service]: Failed to parse size_mappings JSON:', err);
      }
    }

    // Save uploaded media files with size_code association
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        const isPrimary = i === 0;
        const sizeCode = sizeMappings[i] || null;
        await AdminProductModel.insertProductImage(productId, imageUrl, isPrimary, false, sizeCode);
      }
    } else {
      // Default primary image
      await AdminProductModel.insertProductImage(productId, '/uploads/gsh-glove-1.jpg', true, false, null);
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
   * Update product by ID and process uploaded multi-images with size_code mappings
   */
  static async updateProduct(
    id: number,
    input: AdminUpdateProductInput,
    files?: Express.Multer.File[],
    sizeMappingsJson?: string
  ): Promise<ProductDetailDto | null> {
    const success = await AdminProductModel.updateProduct(id, input);

    let sizeMappings: Record<number, string> = {};
    if (sizeMappingsJson) {
      try {
        sizeMappings = JSON.parse(sizeMappingsJson);
      } catch (err) {
        console.warn('[Admin Product Service]: Failed to parse size_mappings JSON:', err);
      }
    }

    if (files && files.length > 0) {
      const oldImages = await ProductModel.findProductImages(id);
      await dbPool.query('DELETE FROM product_images WHERE product_id = ?', [id]);
      
      // Clean up old orphaned files from disk
      for (const img of oldImages) {
        this.deletePhysicalFile(img.image_url);
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        const isPrimary = i === 0;
        const sizeCode = sizeMappings[i] || null;
        await AdminProductModel.insertProductImage(id, imageUrl, isPrimary, false, sizeCode);
      }
    }

    const [rows] = await Promise.all([ProductModel.findProducts({ limit: 1000 })]);
    const updatedRow = rows.find(r => r.id === id);
    if (!updatedRow) return null;

    return ProductService.getProductBySlug(updatedRow.slug);
  }

  /**
   * Delete product by ID and remove uploaded media files from disk
   */
  static async deleteProduct(id: number): Promise<boolean> {
    const oldImages = await ProductModel.findProductImages(id);
    const success = await AdminProductModel.deleteProduct(id);

    if (success && oldImages.length > 0) {
      for (const img of oldImages) {
        this.deletePhysicalFile(img.image_url);
      }
    }

    return success;
  }
}
