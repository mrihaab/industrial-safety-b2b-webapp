import { dbPool } from '@/config/db';
import { RowDataPacket } from 'mysql2/promise';

export class AdminDashboardService {
  static async getStats() {
    const [[prodCount]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM products`);
    const [[catCount]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM categories`);
    const [[rfqPending]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM rfq_inquiries WHERE status = 'pending'`);
    const [[rfqCompleted]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM rfq_inquiries WHERE status IN ('approved', 'completed')`);
    const [[rfqToday]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM rfq_inquiries WHERE DATE(created_at) = CURDATE()`);
    const [[rfqMonth]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM rfq_inquiries WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`);
    const [[lowStock]] = await dbPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM products WHERE stock_status IN ('LIMITED STOCK', 'OUT OF STOCK')`);

    // Latest products
    const [latestProducts] = await dbPool.query<RowDataPacket[]>(`
      SELECT p.id, p.sku, p.title, p.price, p.moq, p.stock_status, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT 5
    `);

    // Latest inquiries with COALESCE fallback for column names
    const [latestInquiries] = await dbPool.query<RowDataPacket[]>(`
      SELECT id, company_name,
             COALESCE(business_email, email, '') AS business_email,
             COALESCE(industry_segment, industry, 'Industrial Safety') AS industry_segment,
             status, created_at
      FROM rfq_inquiries
      ORDER BY created_at DESC
      LIMIT 5
    `);

    return {
      totalProducts: Number(prodCount.total || 0),
      totalCategories: Number(catCount.total || 0),
      pendingRfqs: Number(rfqPending.total || 0),
      completedRfqs: Number(rfqCompleted.total || 0),
      todayRfqs: Number(rfqToday.total || 0),
      monthlyRfqs: Number(rfqMonth.total || 0),
      lowStockProducts: Number(lowStock.total || 0),
      latestProducts,
      latestInquiries,
    };
  }
}
