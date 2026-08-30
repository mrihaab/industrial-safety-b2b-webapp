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
    if (input.is_featured) {
      const currentFeatured = await AdminProductModel.countFeaturedProducts();
      if (currentFeatured >= 1) {
        throw new Error('Maximum limit reached: Only 1 product can be featured on the home page at a time. Please unfeature the currently featured product first.');
      }
    }

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
        const imageUrl = (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://')))
          ? file.path
          : `/uploads/${file.filename}`;
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

    // Save certifications if provided
    if ((input as any).certifications) {
      const certList = String((input as any).certifications).split(',').map(c => c.trim()).filter(Boolean);
      for (const cert of certList) {
        await AdminProductModel.insertProductSpec(productId, 'Certification', cert);
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
   * Update product by ID and process uploaded multi-images & kept existing images with size_code mappings
   */
  static async updateProduct(
    id: number,
    input: AdminUpdateProductInput,
    files?: Express.Multer.File[],
    sizeMappingsJson?: string,
    existingImagesJson?: string
  ): Promise<ProductDetailDto | null> {
    if (input.is_featured === true) {
      const currentFeatured = await AdminProductModel.countFeaturedProducts(id);
      if (currentFeatured >= 1) {
        throw new Error('Maximum limit reached: Only 1 product can be featured on the home page at a time. Please unfeature the currently featured product first.');
      }
    }

    const success = await AdminProductModel.updateProduct(id, input);

    let sizeMappings: Record<number, string> = {};
    if (sizeMappingsJson) {
      try {
        sizeMappings = JSON.parse(sizeMappingsJson);
      } catch (err) {
        console.warn('[Admin Product Service]: Failed to parse size_mappings JSON:', err);
      }
    }

    if (existingImagesJson !== undefined || (files && files.length > 0)) {
      const oldImages = await ProductModel.findProductImages(id);
      await dbPool.query('DELETE FROM product_images WHERE product_id = ?', [id]);

      let isFirst = true;
      const reinsertedUrls = new Set<string>();

      // 1. Re-insert kept existing images
      if (existingImagesJson) {
        try {
          const keptImages = JSON.parse(existingImagesJson);
          if (Array.isArray(keptImages)) {
            for (const img of keptImages) {
              if (img && img.url) {
                const isPrimary = isFirst;
                isFirst = false;
                reinsertedUrls.add(img.url);
                await AdminProductModel.insertProductImage(id, img.url, isPrimary, false, img.size_code || null);
              }
            }
          }
        } catch (err) {
          console.warn('[Admin Product Service]: Failed to parse existingImagesJson:', err);
        }
      }

      // 2. Insert newly uploaded files
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const imageUrl = (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://')))
            ? file.path
            : `/uploads/${file.filename}`;
          const isPrimary = isFirst;
          isFirst = false;
          const sizeCode = sizeMappings[i] || null;
          reinsertedUrls.add(imageUrl);
          await AdminProductModel.insertProductImage(id, imageUrl, isPrimary, false, sizeCode);
        }
      }

      // 3. Clean up physical disk files for any old image URLs that were removed
      for (const img of oldImages) {
        if (!reinsertedUrls.has(img.image_url)) {
          this.deletePhysicalFile(img.image_url);
        }
      }
    }

    if ((input as any).certifications !== undefined) {
      await dbPool.query("DELETE FROM product_specs WHERE product_id = ? AND (spec_key = 'Certification' OR spec_key = 'certification')", [id]);
      const certList = String((input as any).certifications).split(',').map(c => c.trim()).filter(Boolean);
      for (const cert of certList) {
        await AdminProductModel.insertProductSpec(id, 'Certification', cert);
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
