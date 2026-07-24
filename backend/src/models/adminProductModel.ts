import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool } from '@/config/db';

export interface AdminCreateProductInput {
  category_id: number;
  sku: string;
  title: string;
  slug: string;
  series_name?: string;
  price: number;
  moq?: number;
  stock_status?: string;
  status_tag?: string;
  description: string;
  rating_score?: number;
  review_count?: number;
  is_featured?: boolean;
}

export interface AdminUpdateProductInput extends Partial<AdminCreateProductInput> {}

export class AdminProductModel {
  /**
   * Insert new product row
   */
  static async insertProduct(input: AdminCreateProductInput): Promise<number> {
    const sql = `
      INSERT INTO products (
        category_id, sku, title, slug, series_name, price, moq, stock_status, status_tag, description, rating_score, review_count, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      input.category_id,
      input.sku,
      input.title,
      input.slug,
      input.series_name || 'Heavy Duty Series',
      input.price,
      input.moq || 50,
      input.stock_status || 'IN STOCK',
      input.status_tag || 'Safety-System-Active',
      input.description,
      input.rating_score || 5.0,
      input.review_count || 0,
      input.is_featured ? 1 : 0,
    ];

    const [result] = await dbPool.query<ResultSetHeader>(sql, params);
    return result.insertId;
  }

  /**
   * Update existing product row dynamically
   */
  static async updateProduct(id: number, input: AdminUpdateProductInput): Promise<boolean> {
    const fields: string[] = [];
    const params: (string | number | boolean)[] = [];

    if (input.category_id !== undefined) { fields.push('category_id = ?'); params.push(input.category_id); }
    if (input.sku !== undefined) { fields.push('sku = ?'); params.push(input.sku); }
    if (input.title !== undefined) { fields.push('title = ?'); params.push(input.title); }
    if (input.slug !== undefined) { fields.push('slug = ?'); params.push(input.slug); }
    if (input.series_name !== undefined) { fields.push('series_name = ?'); params.push(input.series_name); }
    if (input.price !== undefined) { fields.push('price = ?'); params.push(input.price); }
    if (input.moq !== undefined) { fields.push('moq = ?'); params.push(input.moq); }
    if (input.stock_status !== undefined) { fields.push('stock_status = ?'); params.push(input.stock_status); }
    if (input.status_tag !== undefined) { fields.push('status_tag = ?'); params.push(input.status_tag); }
    if (input.description !== undefined) { fields.push('description = ?'); params.push(input.description); }
    if (input.rating_score !== undefined) { fields.push('rating_score = ?'); params.push(input.rating_score); }
    if (input.review_count !== undefined) { fields.push('review_count = ?'); params.push(input.review_count); }
    if (input.is_featured !== undefined) { fields.push('is_featured = ?'); params.push(input.is_featured ? 1 : 0); }

    if (fields.length === 0) return true;

    params.push(id);
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await dbPool.query<ResultSetHeader>(sql, params);
    return result.affectedRows > 0;
  }

  /**
   * Delete product row and cascade image/spec/feature rows
   */
  static async deleteProduct(id: number): Promise<boolean> {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query('DELETE FROM product_images WHERE product_id = ?', [id]);
      await connection.query('DELETE FROM product_specs WHERE product_id = ?', [id]);
      await connection.query('DELETE FROM product_features WHERE product_id = ?', [id]);
      const [result] = await connection.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Insert product media images
   */
  static async insertProductImage(productId: number, imageUrl: string, isPrimary: boolean, isVideo: boolean): Promise<number> {
    const sql = `
      INSERT INTO product_images (product_id, image_url, is_primary, is_video)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await dbPool.query<ResultSetHeader>(sql, [productId, imageUrl, isPrimary ? 1 : 0, isVideo ? 1 : 0]);
    return result.insertId;
  }

  /**
   * Insert product specification
   */
  static async insertProductSpec(productId: number, specKey: string, specValue: string): Promise<number> {
    const sql = `
      INSERT INTO product_specs (product_id, spec_key, spec_value)
      VALUES (?, ?, ?)
    `;
    const [result] = await dbPool.query<ResultSetHeader>(sql, [productId, specKey, specValue]);
    return result.insertId;
  }

  /**
   * Insert product feature
   */
  static async insertProductFeature(productId: number, title: string, description: string, iconName: string): Promise<number> {
    const sql = `
      INSERT INTO product_features (product_id, title, description, icon_name)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await dbPool.query<ResultSetHeader>(sql, [productId, title, description, iconName]);
    return result.insertId;
  }
}
