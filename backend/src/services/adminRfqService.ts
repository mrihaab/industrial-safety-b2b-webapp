import { dbPool } from '@/config/db';
import { RowDataPacket } from 'mysql2/promise';

export class AdminRfqService {
  static async getRfqs(query: { status?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    let sql = `SELECT id, company_name, 
                      COALESCE(business_email, email, '') AS business_email, 
                      COALESCE(industry_segment, industry, 'Industrial Safety') AS industry_segment, 
                      COALESCE(monthly_volume, estimated_monthly_volume, '') AS monthly_volume,
                      COALESCE(detailed_requirements, notes, '') AS detailed_requirements,
                      status, created_at 
               FROM rfq_inquiries WHERE 1=1`;
    const params: (string | number)[] = [];

    if (query.status && query.status !== 'all') {
      sql += ` AND status = ?`;
      params.push(query.status);
    }

    if (query.search) {
      sql += ` AND (company_name LIKE ? OR COALESCE(business_email, email, '') LIKE ? OR COALESCE(industry_segment, industry, '') LIKE ?)`;
      const pattern = `%${query.search}%`;
      params.push(pattern, pattern, pattern);
    }

    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await dbPool.query<RowDataPacket[]>(sql, params);

    // Count total
    let countSql = `SELECT COUNT(*) AS total FROM rfq_inquiries WHERE 1=1`;
    const countParams: (string | number)[] = [];
    if (query.status && query.status !== 'all') {
      countSql += ` AND status = ?`;
      countParams.push(query.status);
    }
    if (query.search) {
      countSql += ` AND (company_name LIKE ? OR COALESCE(business_email, email, '') LIKE ? OR COALESCE(industry_segment, industry, '') LIKE ?)`;
      const pattern = `%${query.search}%`;
      countParams.push(pattern, pattern, pattern);
    }
    const [[countRow]] = await dbPool.query<RowDataPacket[]>(countSql, countParams);

    return {
      data: rows,
      pagination: {
        total: Number(countRow.total || 0),
        page,
        limit,
        totalPages: Math.ceil(Number(countRow.total || 0) / limit) || 1,
      },
    };
  }

  static async getRfqDetails(id: number) {
    const [[rfq]] = await dbPool.query<RowDataPacket[]>(
      `SELECT id, company_name, 
              COALESCE(business_email, email, '') AS business_email, 
              COALESCE(industry_segment, industry, 'Industrial Safety') AS industry_segment, 
              COALESCE(monthly_volume, estimated_monthly_volume, '') AS monthly_volume,
              COALESCE(detailed_requirements, notes, '') AS detailed_requirements,
              status, created_at 
       FROM rfq_inquiries WHERE id = ?`,
      [id]
    );

    if (!rfq) return null;

    const [items] = await dbPool.query<RowDataPacket[]>(
      `SELECT ri.*, p.title AS product_title, p.sku, p.price
       FROM rfq_items ri
       LEFT JOIN products p ON ri.product_id = p.id
       WHERE ri.rfq_id = ?`,
      [id]
    );

    return { ...rfq, items };
  }

  static async updateStatus(id: number, status: string) {
    await dbPool.query(
      `UPDATE rfq_inquiries SET status = ? WHERE id = ?`,
      [status, id]
    );

    return this.getRfqDetails(id);
  }
}
