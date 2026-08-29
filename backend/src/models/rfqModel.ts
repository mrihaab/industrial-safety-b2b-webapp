import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool } from '@/config/db';
import { CreateRfqInput, RfqInquiryRow, RfqItemRow } from '@/types/rfq';

export class RfqModel {
  /**
   * Create RFQ inquiry record and its requested items inside a transaction
   */
  static async createRfq(input: CreateRfqInput): Promise<{ rfq_id: number; status: string }> {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Insert into rfq_inquiries with backward-compatible column mappings
      const insertInquirySql = `
        INSERT INTO rfq_inquiries (
          company_name, contact_person, email, business_email, industry, industry_segment, estimated_monthly_volume, monthly_volume, detailed_requirements, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `;
      const inquiryParams = [
        input.company_name,
        input.contact_person || input.company_name || 'Enterprise Client',
        input.business_email || 'client@company.com',
        input.business_email || 'client@company.com',
        input.industry_segment || 'Industrial Safety',
        input.industry_segment || 'Industrial Safety',
        input.monthly_volume || '$50k - $250k',
        input.monthly_volume || '$50k - $250k',
        input.detailed_requirements || '',
      ];

      const [inquiryResult] = await connection.query<ResultSetHeader>(insertInquirySql, inquiryParams);
      const rfqId = inquiryResult.insertId;

      // 2. Insert items into rfq_items
      const insertItemSql = `
        INSERT INTO rfq_items (rfq_id, product_id, product_title, sku, quantity, size_range)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      for (const item of input.items) {
        // Fetch product title/sku if product_id exists
        let productTitle = (item as any).product_title || 'Industrial Safety Product';
        let productSku = (item as any).sku || 'GSH-ITEM';

        if (item.product_id && (!productTitle || productTitle === 'Industrial Safety Product')) {
          try {
            const [pRows] = await connection.query<RowDataPacket[]>(
              `SELECT title, sku FROM products WHERE id = ? LIMIT 1`,
              [item.product_id]
            );
            if (pRows.length > 0) {
              productTitle = pRows[0].title;
              productSku = pRows[0].sku;
            }
          } catch (pErr) {
            // Ignore error
          }
        }

        const itemParams = [
          rfqId,
          item.product_id || null,
          productTitle,
          productSku,
          item.quantity,
          item.size_range || 'Assorted S/M/L/XL',
        ];
        await connection.query(insertItemSql, itemParams);
      }

      await connection.commit();
      return { rfq_id: rfqId, status: 'pending' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Find RFQ inquiry by ID (for verification tests)
   */
  static async findRfqById(id: number): Promise<RfqInquiryRow | null> {
    const sql = `SELECT * FROM rfq_inquiries WHERE id = ? LIMIT 1`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0] as RfqInquiryRow;
  }

  /**
   * Find items for RFQ inquiry (for verification tests)
   */
  static async findRfqItems(rfqId: number): Promise<RfqItemRow[]> {
    const sql = `SELECT * FROM rfq_items WHERE rfq_id = ? ORDER BY id ASC`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [rfqId]);
    return rows as RfqItemRow[];
  }
}
