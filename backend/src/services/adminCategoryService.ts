import { dbPool } from '@/config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface CategoryPayload {
  name: string;
  slug?: string;
  tag_name?: string;
  parent_id?: number | null;
}

export class AdminCategoryService {
  /**
   * Get all categories with product counts
   */
  static async getAllCategories() {
    const [rows] = await dbPool.query<RowDataPacket[]>(`
      SELECT c.*, 
             COUNT(p.id) AS product_count,
             p_cat.name AS parent_name
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      LEFT JOIN categories p_cat ON c.parent_id = p_cat.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
    return rows;
  }

  /**
   * Create a new category
   */
  static async createCategory(payload: CategoryPayload) {
    const name = payload.name.trim();
    const slug = (payload.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const tagName = (payload.tag_name || 'Standard Equipment').trim();
    const parentId = payload.parent_id || null;

    const [result] = await dbPool.query<ResultSetHeader>(
      `INSERT INTO categories (name, slug, tag_name, parent_id) VALUES (?, ?, ?, ?)`,
      [name, slug, tagName, parentId]
    );

    const [rows] = await dbPool.query<RowDataPacket[]>(
      `SELECT * FROM categories WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  /**
   * Update category
   */
  static async updateCategory(id: number, payload: CategoryPayload) {
    const name = payload.name.trim();
    const slug = (payload.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const tagName = (payload.tag_name || 'Standard Equipment').trim();
    const parentId = payload.parent_id || null;

    await dbPool.query(
      `UPDATE categories SET name = ?, slug = ?, tag_name = ?, parent_id = ? WHERE id = ?`,
      [name, slug, tagName, parentId, id]
    );

    const [rows] = await dbPool.query<RowDataPacket[]>(
      `SELECT * FROM categories WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  /**
   * Delete category if no products are assigned
   */
  static async deleteCategory(id: number) {
    const [prodCheck] = await dbPool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM products WHERE category_id = ?`,
      [id]
    );

    if (prodCheck[0].count > 0) {
      throw new Error(`Cannot delete category with ${prodCheck[0].count} assigned products. Reassign or delete products first.`);
    }

    await dbPool.query(`DELETE FROM categories WHERE id = ?`, [id]);
    return true;
  }
}
