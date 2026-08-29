import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const DDL_STATEMENTS = [
  // 1. Users Table
  `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(32) DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 2. Categories Table
  `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      slug VARCHAR(128) UNIQUE NOT NULL,
      description TEXT,
      tag_name VARCHAR(64) DEFAULT 'Safety System Active',
      parent_id INT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 3. Products Table
  `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      sku VARCHAR(64) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      series_name VARCHAR(128) DEFAULT 'Heavy Duty Series',
      price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      moq INT NOT NULL DEFAULT 50,
      stock_status VARCHAR(32) DEFAULT 'IN STOCK',
      status_tag VARCHAR(64) DEFAULT 'Safety-System-Active',
      description TEXT NOT NULL,
      size_options VARCHAR(255) DEFAULT 'Assorted S/M/L/XL',
      rating_score DECIMAL(3, 2) DEFAULT 5.00,
      review_count INT DEFAULT 0,
      is_featured BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 4. Product Images Table
  `CREATE TABLE IF NOT EXISTS product_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      image_url VARCHAR(512) NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      is_video BOOLEAN DEFAULT FALSE,
      size_code VARCHAR(32) DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 5. Product Specs Table
  `CREATE TABLE IF NOT EXISTS product_specs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      spec_key VARCHAR(128) NOT NULL,
      spec_value VARCHAR(255) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 6. Product Features Table
  `CREATE TABLE IF NOT EXISTS product_features (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      title VARCHAR(128) NOT NULL,
      description TEXT NOT NULL,
      icon_name VARCHAR(64) DEFAULT 'shield',
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 7. RFQ Inquiries Table
  `CREATE TABLE IF NOT EXISTS rfq_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_name VARCHAR(128) NOT NULL,
      contact_person VARCHAR(128) DEFAULT NULL,
      email VARCHAR(128) DEFAULT NULL,
      business_email VARCHAR(128) DEFAULT NULL,
      phone VARCHAR(64) DEFAULT NULL,
      industry VARCHAR(64) DEFAULT NULL,
      industry_segment VARCHAR(64) DEFAULT NULL,
      estimated_monthly_volume VARCHAR(64) DEFAULT NULL,
      monthly_volume VARCHAR(64) DEFAULT NULL,
      notes TEXT,
      detailed_requirements TEXT,
      status VARCHAR(32) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 8. RFQ Items Table
  `CREATE TABLE IF NOT EXISTS rfq_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      rfq_id INT NOT NULL,
      product_id INT,
      product_title VARCHAR(255) NOT NULL,
      sku VARCHAR(64) NOT NULL,
      quantity INT NOT NULL,
      size_range VARCHAR(64),
      target_price DECIMAL(10, 2),
      FOREIGN KEY (rfq_id) REFERENCES rfq_inquiries(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
];

export async function initializeDatabase(): Promise<void> {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'ghulam_safety_hub';

  console.log(`[Database Init]: Connecting to MySQL Server at ${host}:${port}...`);

  let connection: mysql.Connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
      console.log(`[Database Init]: Database '${database}' verified/created successfully.`);
    } catch (dbErr: any) {
      console.log(`[Database Init Notice]: Global CREATE DATABASE skipped or restricted on cloud host: ${dbErr.message}`);
    }
    await connection.changeUser({ database });
  } catch (connErr: any) {
    console.log(`[Database Init Notice]: Initializing direct connection to database '${database}'...`);
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });
  }

  try {
    for (let i = 0; i < DDL_STATEMENTS.length; i++) {
      await connection.query(DDL_STATEMENTS[i]);
    }

    // Safety column migration for size_options in products
    try {
      await connection.query(`ALTER TABLE products ADD COLUMN size_options VARCHAR(255) DEFAULT 'Assorted S/M/L/XL';`);
      console.log(`[Database Init]: Added missing 'size_options' column to products table.`);
    } catch (migErr: any) {
      // Ignore if already exists
    }

    // Safety column migration for size_code in product_images
    try {
      await connection.query(`ALTER TABLE product_images ADD COLUMN size_code VARCHAR(32) DEFAULT NULL;`);
      console.log(`[Database Init]: Added missing 'size_code' column to product_images table.`);
    } catch (migErr: any) {
      // Ignore if already exists
    }

    // Safety column migrations for rfq_inquiries
    try {
      await connection.query(`ALTER TABLE rfq_inquiries ADD COLUMN business_email VARCHAR(128) DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries ADD COLUMN industry_segment VARCHAR(64) DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries ADD COLUMN monthly_volume VARCHAR(64) DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries ADD COLUMN detailed_requirements TEXT DEFAULT NULL;`);
    } catch (migErr: any) {}

    // Make all columns NULL DEFAULT NULL to fix 'Field contact_person doesn't have a default value'
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN contact_person VARCHAR(128) NULL DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN email VARCHAR(128) NULL DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN phone VARCHAR(64) NULL DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN industry VARCHAR(64) NULL DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN estimated_monthly_volume VARCHAR(64) NULL DEFAULT NULL;`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_inquiries MODIFY COLUMN notes TEXT NULL DEFAULT NULL;`);
    } catch (migErr: any) {}

    // Make rfq_items product_title & sku columns NULL DEFAULT
    try {
      await connection.query(`ALTER TABLE rfq_items MODIFY COLUMN product_title VARCHAR(255) NULL DEFAULT 'Industrial Safety Product';`);
    } catch (migErr: any) {}
    try {
      await connection.query(`ALTER TABLE rfq_items MODIFY COLUMN sku VARCHAR(64) NULL DEFAULT 'GSH-ITEM';`);
    } catch (migErr: any) {}

    console.log(`[Database Init]: Executed ${DDL_STATEMENTS.length} DDL statements. All 8 tables created/verified.`);
  } catch (error) {
    console.error('[Database Init Error]:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('[Database Init Script]: Database initialization complete.');
      process.exit(0);
    })
    .catch(err => {
      console.error('[Database Init Script]: Failed:', err);
      process.exit(1);
    });
}
