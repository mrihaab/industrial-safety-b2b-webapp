import { CategoryService } from '@/services/categoryService';
import { dbPool } from './db';

export async function testCategoriesApi() {
  console.log('[Categories API Test]: Testing Category Module Service & Model Logic...');

  const tree = await CategoryService.getCategoryTree();
  console.log('[Categories API Test]: Top-level categories count:', tree.length);

  if (tree.length === 0) {
    throw new Error('Category tree test returned 0 top-level categories');
  }

  tree.forEach((cat, idx) => {
    console.log(`[Categories API Test]: Category [${idx + 1}] ${cat.name} (${cat.slug}) -> Subcategories: ${cat.subcategories.length}`);
  });

  const workingGloves = tree.find(c => c.slug === 'working-gloves');
  if (workingGloves) {
    console.log('[Categories API Test]: Working Gloves subcategories sample:', workingGloves.subcategories.slice(0, 3));
  }

  console.log('[Categories API Test]: ALL CATEGORY MODULE CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testCategoriesApi()
    .then(async () => {
      await dbPool.end();
      process.exit(0);
    })
    .catch(async err => {
      console.error('[Categories API Test Error]:', err);
      await dbPool.end();
      process.exit(1);
    });
}
