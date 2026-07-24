import { ProductService } from '@/services/productService';
import { dbPool } from './db';

export async function testProductsApi() {
  console.log('[Products API Test]: Testing Product Module Service & Model Logic...');

  // 1. Test List Products API
  console.log('[Products API Test]: Testing GET /api/v1/products query...');
  const listResult = await ProductService.getProducts({ page: 1, limit: 12 });
  console.log('[Products API Test]: List Result Count:', listResult.products.length);
  console.log('[Products API Test]: List Result Sample Item:', listResult.products[0]);
  console.log('[Products API Test]: Pagination:', { total: listResult.total, totalPages: listResult.totalPages });

  if (listResult.products.length === 0) {
    throw new Error('List Products test returned 0 items');
  }

  // 2. Test Get Product By Slug API
  console.log('[Products API Test]: Testing GET /api/v1/products/:slug query for "gsh-elite-industrial-gloves"...');
  const detailResult = await ProductService.getProductBySlug('gsh-elite-industrial-gloves');

  if (!detailResult) {
    throw new Error('Get Product By Slug test returned null for "gsh-elite-industrial-gloves"');
  }

  console.log('[Products API Test]: Detail Title:', detailResult.title);
  console.log('[Products API Test]: Detail Price & MOQ:', { price: detailResult.price, moq: detailResult.moq });
  console.log('[Products API Test]: Detail Gallery items:', detailResult.gallery.length);
  console.log('[Products API Test]: Detail Specs matrix count:', detailResult.specs.length);
  console.log('[Products API Test]: Detail Features count:', detailResult.features.length);

  console.log('[Products API Test]: ALL PRODUCT MODULE CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testProductsApi()
    .then(async () => {
      await dbPool.end();
      process.exit(0);
    })
    .catch(async err => {
      console.error('[Products API Test Error]:', err);
      await dbPool.end();
      process.exit(1);
    });
}
