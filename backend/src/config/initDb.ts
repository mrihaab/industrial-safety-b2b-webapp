import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DDL_STATEMENTS = [
  // 1. Table: users (Admin authentication)
  `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(32) DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 2. Table: categories
  `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      parent_id INT DEFAULT NULL,
      name VARCHAR(128) NOT NULL,
      slug VARCHAR(128) UNIQUE NOT NULL,
      tag_name VARCHAR(128) NOT NULL,
      FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 3. Table: products
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
      rating_score DECIMAL(3, 2) DEFAULT 5.00,
      review_count INT DEFAULT 0,
      is_featured BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 4. Table: product_images
  `CREATE TABLE IF NOT EXISTS product_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      image_url VARCHAR(512) NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      is_video BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 5. Table: product_specs
  `CREATE TABLE IF NOT EXISTS product_specs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      spec_key VARCHAR(128) NOT NULL,
      spec_value VARCHAR(255) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 6. Table: product_features
  `CREATE TABLE IF NOT EXISTS product_features (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      title VARCHAR(128) NOT NULL,
      description TEXT NOT NULL,
      icon_name VARCHAR(64) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 7. Table: rfq_inquiries
  `CREATE TABLE IF NOT EXISTS rfq_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_name VARCHAR(128) NOT NULL,
      business_email VARCHAR(128) NOT NULL,
      industry_segment VARCHAR(64) NOT NULL,
      monthly_volume VARCHAR(64) NOT NULL,
      detailed_requirements TEXT NOT NULL,
      status VARCHAR(32) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  // 8. Table: rfq_items
  `CREATE TABLE IF NOT EXISTS rfq_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      rfq_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL CHECK (quantity > 0),
      size_range VARCHAR(64) DEFAULT 'Assorted S/M/L/XL',
      FOREIGN KEY (rfq_id) REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
];

export async function initializeDatabase() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'ghulam_safety_hub';

  console.log(`[Database Init]: Connecting to MySQL Server at ${host}:${port}...`);

  // Step 1: Connect without database to ensure DB creation
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  try {
    // Step 2: Create Database
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`[Database Init]: Database '${database}' verified/created successfully.`);

    // Step 3: Switch to target Database
    await connection.changeUser({ database });

    // Step 4: Execute DDL Statements
    for (let i = 0; i < DDL_STATEMENTS.length; i++) {
      await connection.query(DDL_STATEMENTS[i]);
    }
    console.log(`[Database Init]: Executed ${DDL_STATEMENTS.length} DDL statements. All 8 tables created/verified.`);

    // Step 5: Verify Created Tables
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('[Database Init]: Active tables in database:', rows);
  } catch (error) {
    console.error('[Database Init Error]:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Execute if run directly via CLI script
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('[Database Init]: Completed successfully.');
      process.exit(0);
    })
    .catch(err => {
      console.error('[Database Init Failed]:', err);
      process.exit(1);
    });
}
