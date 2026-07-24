import { RowDataPacket } from 'mysql2/promise';
import { dbPool } from '@/config/db';
import { CategoryRow } from '@/types/category';

export class CategoryModel {
  /**
   * Find all category rows ordered by parent_id and id
   */
  static async findAllCategories(): Promise<CategoryRow[]> {
    const sql = `
      SELECT id, parent_id, name, slug, tag_name
      FROM categories
      ORDER BY parent_id ASC, id ASC
    `;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql);
    return rows as CategoryRow[];
  }
}
