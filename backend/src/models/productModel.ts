import { RowDataPacket } from 'mysql2/promise';
import { dbPool } from '@/config/db';
import {
  ProductRow,
  ProductImageRow,
  ProductSpecRow,
  ProductFeatureRow,
  ProductListQuery,
} from '@/types/product';

export class ProductModel {
  /**
   * Find paginated products list with category, stock, search, & spec filters
   */
  static async findProducts(query: ProductListQuery): Promise<ProductRow[]> {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.tag_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (query.search) {
      sql += ` AND (p.title LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)`;
      const searchPattern = `%${query.search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (query.category && query.category !== 'all') {
      const categorySlugs = String(query.category).split(',').map(s => s.trim()).filter(Boolean);
      if (categorySlugs.length === 1) {
        sql += ` AND (c.slug = ? OR c.parent_id = (SELECT id FROM categories WHERE slug = ? LIMIT 1))`;
        params.push(categorySlugs[0], categorySlugs[0]);
      } else if (categorySlugs.length > 1) {
        sql += ` AND (c.slug IN (?) OR c.parent_id IN (SELECT id FROM categories WHERE slug IN (?)))`;
        params.push(categorySlugs, categorySlugs);
      }
    }

    if (query.stock && query.stock !== 'all') {
      sql += ` AND p.stock_status = ?`;
      params.push(query.stock);
    }

    if (query.protection_level) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND (ps.spec_key = 'Impact Protection' OR ps.spec_value LIKE ?)
      )`;
      params.push(`%${query.protection_level}%`);
    }

    if (query.material) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND (ps.spec_key = 'Material Composition' OR ps.spec_value LIKE ?)
      )`;
      params.push(`%${query.material}%`);
    }

    if (query.certification) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND ps.spec_value LIKE ?
      )`;
      params.push(`%${query.certification}%`);
    }

    // Sorting logic
    if (query.sort === 'newest') {
      sql += ` ORDER BY p.created_at DESC`;
    } else if (query.sort === 'price_high_low') {
      sql += ` ORDER BY p.price DESC`;
    } else {
      sql += ` ORDER BY p.is_featured DESC, p.rating_score DESC, p.id ASC`;
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await dbPool.query<RowDataPacket[]>(sql, params);
    return rows as ProductRow[];
  }

  /**
   * Count total products matching filters
   */
  static async countProducts(query: ProductListQuery): Promise<number> {
    let sql = `
      SELECT COUNT(DISTINCT p.id) AS total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (query.search) {
      sql += ` AND (p.title LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)`;
      const searchPattern = `%${query.search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (query.category && query.category !== 'all') {
      const categorySlugs = String(query.category).split(',').map(s => s.trim()).filter(Boolean);
      if (categorySlugs.length === 1) {
        sql += ` AND (c.slug = ? OR c.parent_id = (SELECT id FROM categories WHERE slug = ? LIMIT 1))`;
        params.push(categorySlugs[0], categorySlugs[0]);
      } else if (categorySlugs.length > 1) {
        sql += ` AND (c.slug IN (?) OR c.parent_id IN (SELECT id FROM categories WHERE slug IN (?)))`;
        params.push(categorySlugs, categorySlugs);
      }
    }

    if (query.stock && query.stock !== 'all') {
      sql += ` AND p.stock_status = ?`;
      params.push(query.stock);
    }

    if (query.protection_level) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND (ps.spec_key = 'Impact Protection' OR ps.spec_value LIKE ?)
      )`;
      params.push(`%${query.protection_level}%`);
    }

    if (query.material) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND (ps.spec_key = 'Material Composition' OR ps.spec_value LIKE ?)
      )`;
      params.push(`%${query.material}%`);
    }

    if (query.certification) {
      sql += ` AND EXISTS (
        SELECT 1 FROM product_specs ps 
        WHERE ps.product_id = p.id AND ps.spec_value LIKE ?
      )`;
      params.push(`%${query.certification}%`);
    }

    const [rows] = await dbPool.query<RowDataPacket[]>(sql, params);
    return rows[0]?.total ? Number(rows[0].total) : 0;
  }

  /**
   * Find product by slug
   */
  static async findProductBySlug(slug: string): Promise<ProductRow | null> {
    const sql = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.tag_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
      LIMIT 1
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [slug]);
    if (rows.length === 0) return null;
    return rows[0] as ProductRow;
  }

  /**
   * Batch find images for multiple products to prevent N+1 queries
   */
  static async findImagesForProducts(productIds: number[]): Promise<ProductImageRow[]> {
    if (!productIds || productIds.length === 0) return [];
    const sql = `
      SELECT id, product_id, image_url, is_primary, is_video, size_code
      FROM product_images
      WHERE product_id IN (?)
      ORDER BY is_primary DESC, id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [productIds]);
    return rows as ProductImageRow[];
  }

  /**
   * Batch find specs for multiple products to prevent N+1 queries
   */
  static async findSpecsForProducts(productIds: number[]): Promise<ProductSpecRow[]> {
    if (!productIds || productIds.length === 0) return [];
    const sql = `
      SELECT id, product_id, spec_key, spec_value
      FROM product_specs
      WHERE product_id IN (?)
      ORDER BY id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [productIds]);
    return rows as ProductSpecRow[];
  }

  /**
   * Find product gallery images for single product
   */
  static async findProductImages(productId: number): Promise<ProductImageRow[]> {
    const sql = `
      SELECT id, product_id, image_url, is_primary, is_video, size_code
      FROM product_images
      WHERE product_id = ?
      ORDER BY is_primary DESC, id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [productId]);
    return rows as ProductImageRow[];
  }

  /**
   * Find product specifications for single product
   */
  static async findProductSpecs(productId: number): Promise<ProductSpecRow[]> {
    const sql = `
      SELECT id, product_id, spec_key, spec_value
      FROM product_specs
      WHERE product_id = ?
      ORDER BY id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [productId]);
    return rows as ProductSpecRow[];
  }

  /**
   * Find product engineering features for single product
   */
  static async findProductFeatures(productId: number): Promise<ProductFeatureRow[]> {
    const sql = `
      SELECT id, product_id, title, description, icon_name
      FROM product_features
      WHERE product_id = ?
      ORDER BY id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [productId]);
    return rows as ProductFeatureRow[];
  }
}
