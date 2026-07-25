import { dbPool } from './db';

export async function seedDatabase() {
  console.log('[Database Seed]: Seeding initial product & category test data...');

  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insert Parent Category
    const [catResult]: any = await connection.query(`
      INSERT INTO categories (name, slug, tag_name)
      VALUES ('Working Gloves', 'working-gloves', 'Precision Handling')
      ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);
    `);
    const categoryId = catResult.insertId;

    // 2. Insert Product
    const [prodResult]: any = await connection.query(`
      INSERT INTO products (
        category_id, sku, title, slug, series_name, price, moq, stock_status, status_tag, description, rating_score, review_count, is_featured
      ) VALUES (
        ?, 'GSH-GLV-001', 'GSH Elite Industrial Gloves', 'gsh-elite-industrial-gloves',
        'Heavy Duty Series', 42.00, 50, 'IN STOCK', 'Safety-System-Active',
        'Designed for high-precision industrial environments requiring maximum tactile feedback and superior abrasion resistance.',
        4.80, 124, TRUE
      )
      ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);
    `, [categoryId]);
    const productId = prodResult.insertId;

    // 3. Clear & Insert Product Images
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [productId]);
    await connection.query(`
      INSERT INTO product_images (product_id, image_url, is_primary, is_video) VALUES
      (?, '/uploads/gsh-glove-1.jpg', TRUE, FALSE),
      (?, '/uploads/gsh-glove-2.jpg', FALSE, FALSE),
      (?, '/uploads/gsh-glove-3.jpg', FALSE, FALSE);
    `, [productId, productId, productId]);

    // 4. Clear & Insert Product Specs (Exactly 4 items matching HTML mockup)
    await connection.query('DELETE FROM product_specs WHERE product_id = ?', [productId]);
    await connection.query(`
      INSERT INTO product_specs (product_id, spec_key, spec_value) VALUES
      (?, 'Certification', 'CE Certified'),
      (?, 'Abrasion Rating', '4X (High Intensity)'),
      (?, 'Thermal Resistance', 'Up to 250°C'),
      (?, 'Material Composition', 'Nitri-Flex / Kevlar');
    `, [productId, productId, productId, productId]);

    // 5. Clear & Insert Product Features
    await connection.query('DELETE FROM product_features WHERE product_id = ?', [productId]);
    await connection.query(`
      INSERT INTO product_features (product_id, title, description, icon_name) VALUES
      (?, 'Anatomical Fit', 'Contoured design reducing hand fatigue during extended 12-hour shifts.', 'construction'),
      (?, 'Fluid Resistance', 'Impermeable barrier protects against synthetic oils and industrial solvents.', 'water_drop'),
      (?, 'Reinforced Core', 'Multi-layered Kevlar weave prevents puncture hazards from sharp metal shavings.', 'shield');
    `, [productId, productId, productId]);

    await connection.commit();
    console.log('[Database Seed]: Seeding completed successfully for GSH Elite Industrial Gloves.');
  } catch (error) {
    await connection.rollback();
    console.error('[Database Seed Error]:', error);
    throw error;
  } finally {
    connection.release();
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
