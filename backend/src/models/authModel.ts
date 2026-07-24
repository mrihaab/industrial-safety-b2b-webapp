import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { dbPool } from '@/config/db';
import { UserRow } from '@/types/auth';

export class AuthModel {
  /**
   * Find admin user by email
   */
  static async findUserByEmail(email: string): Promise<UserRow | null> {
    const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [email]);
    if (rows.length === 0) return null;
    return rows[0] as UserRow;
  }

  /**
   * Find admin user by ID
   */
  static async findUserById(id: number): Promise<UserRow | null> {
    const sql = `SELECT id, username, email, password_hash, role, created_at FROM users WHERE id = ? LIMIT 1`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0] as UserRow;
  }

  /**
   * Create admin user (for seeding/setup script)
   */
  static async createUser(username: string, email: string, passwordHash: string, role: string = 'admin'): Promise<number> {
    const sql = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
    `;
    const [result] = await dbPool.query<ResultSetHeader>(sql, [username, email, passwordHash, role]);
    return result.insertId;
  }
}
