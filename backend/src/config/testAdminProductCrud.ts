import { AuthService } from '@/services/authService';
import { AdminProductService } from '@/services/adminProductService';
import { ProductService } from '@/services/productService';
import { dbPool } from './db';

export async function testAdminProductCrud() {
  console.log('[Admin Product CRUD Test]: Testing Admin CRUD Operations & Integrity...');

  // 1. Authenticate Admin User & Obtain JWT
  const authResult = await AuthService.login({
    email: 'admin@ghulamsafety.com',
    password: 'AdminPassword123!',
  });

  if (!authResult || !authResult.token) {
    throw new Error('Admin authentication failed during CRUD test');
  }
  console.log('[Admin Product CRUD Test]: JWT Authentication Verified.');

  // 2. Test Create Product (POST)
  const newProductData = {
    category_id: 1,
    sku: 'TEST-SKU-999',
    title: 'TitanShield Welding Gloves',
    slug: 'titanshield-welding-gloves',
    series_name: 'Heavy Duty Series',
    price: 55.00,
    moq: 50,
    stock_status: 'IN STOCK',
    status_tag: 'Safety-System-Active',
    description: 'High-temperature resistant welding gloves with Kevlar stitching.',
  };

  const createdProduct = await AdminProductService.createProduct(
    newProductData,
    undefined,
    JSON.stringify([{ key: 'Heat Resistance', value: 'Up to 500°C' }]),
    JSON.stringify([{ title: 'Heat Shield', description: 'Thermal lining', icon: 'local_fire_department' }])
  );

  if (!createdProduct || createdProduct.slug !== 'titanshield-welding-gloves') {
    throw new Error('Product creation failed or returned invalid data');
  }
  console.log('[Admin Product CRUD Test]: Product Created Successfully:', createdProduct.title, 'ID:', createdProduct.id);

  // 3. Test Update Product (PUT)
  const updatedProduct = await AdminProductService.updateProduct(createdProduct.id, {
    price: 62.50,
    stock_status: 'LIMITED STOCK',
  });

  if (!updatedProduct || updatedProduct.price !== 62.50) {
    throw new Error('Product update failed');
  }
  console.log('[Admin Product CRUD Test]: Product Updated Successfully. New Price:', updatedProduct.price);

  // 4. Test Delete Product (DELETE)
  const deleteSuccess = await AdminProductService.deleteProduct(createdProduct.id);
  if (!deleteSuccess) {
    throw new Error('Product deletion failed');
  }

  const deletedCheck = await ProductService.getProductBySlug('titanshield-welding-gloves');
  if (deletedCheck !== null) {
    throw new Error('Product was not properly removed from database');
  }
  console.log('[Admin Product CRUD Test]: Product Deleted Successfully & Database Integrity Preserved.');

  console.log('[Admin Product CRUD Test]: ALL ADMIN PRODUCT CRUD CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testAdminProductCrud()
    .then(async () => {
      await dbPool.end();
      process.exit(0);
    })
    .catch(async err => {
      console.error('[Admin Product CRUD Test Error]:', err);
      await dbPool.end();
      process.exit(1);
    });
}
