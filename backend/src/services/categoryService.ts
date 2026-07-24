import { CategoryModel } from '@/models/categoryModel';
import { CategoryRow, CategoryDto } from '@/types/category';

export class CategoryService {
  /**
   * Get hierarchical category tree
   */
  static async getCategoryTree(): Promise<CategoryDto[]> {
    const flatRows = await CategoryModel.findAllCategories();

    if (flatRows.length === 0) {
      return this.getDefaultCategoryTree();
    }

    return this.buildTree(flatRows);
  }

  /**
   * Build hierarchical category tree from flat rows
   */
  private static buildTree(flatRows: CategoryRow[]): CategoryDto[] {
    const categoryMap = new Map<number, CategoryDto>();
    const tree: CategoryDto[] = [];

    // First pass: Instantiate DTOs
    flatRows.forEach(row => {
      categoryMap.set(row.id, {
        id: row.id,
        name: row.name,
        slug: row.slug,
        tag_name: row.tag_name,
        subcategories: [],
      });
    });

    // Second pass: Populate subcategories tree
    flatRows.forEach(row => {
      const node = categoryMap.get(row.id);
      if (node) {
        if (row.parent_id === null || row.parent_id === 0) {
          tree.push(node);
        } else {
          const parent = categoryMap.get(row.parent_id);
          if (parent) {
            parent.subcategories.push(node);
          } else {
            tree.push(node);
          }
        }
      }
    });

    return tree;
  }

  /**
   * Default category tree backup matching docs/01-project-requirements.md
   */
  private static getDefaultCategoryTree(): CategoryDto[] {
    return [
      {
        id: 1,
        name: 'Working Gloves',
        slug: 'working-gloves',
        tag_name: 'General Protection',
        subcategories: [
          { id: 101, name: 'Assembly Gloves', slug: 'assembly-gloves', tag_name: 'Precision Handling', subcategories: [] },
          { id: 102, name: 'Welding Gloves', slug: 'welding-gloves', tag_name: 'Heat Protection', subcategories: [] },
          { id: 103, name: 'Driving Gloves', slug: 'driving-gloves', tag_name: 'Enhanced Grip', subcategories: [] },
          { id: 104, name: 'Canadian Gloves', slug: 'canadian-gloves', tag_name: 'Heavy Duty', subcategories: [] },
          { id: 105, name: 'Gardening Gloves', slug: 'gardening-gloves', tag_name: 'Hand Protection', subcategories: [] },
          { id: 106, name: 'High-Performance Gloves', slug: 'high-performance-gloves', tag_name: 'Maximum Protection', subcategories: [] },
          { id: 107, name: 'Oil & Gas Gloves', slug: 'oil-and-gas-gloves', tag_name: 'Hazard Protection', subcategories: [] },
          { id: 108, name: 'Winter Gloves', slug: 'winter-gloves', tag_name: 'Cold Protection', subcategories: [] },
          { id: 109, name: 'Ski Gloves', slug: 'ski-gloves', tag_name: 'Snow Protection', subcategories: [] },
          { id: 110, name: 'Cotton Gloves', slug: 'cotton-gloves', tag_name: 'Dust Protection', subcategories: [] },
        ],
      },
      {
        id: 2,
        name: 'Sports Gloves',
        slug: 'sports-gloves',
        tag_name: 'Athletic Performance',
        subcategories: [
          { id: 201, name: 'Cycling Gloves', slug: 'cycling-gloves', tag_name: 'Shock Absorption', subcategories: [] },
          { id: 202, name: 'Goalkeeper Gloves', slug: 'goalkeeper-gloves', tag_name: 'Ball Grip', subcategories: [] },
          { id: 203, name: 'Weight Lifting Gloves', slug: 'weight-lifting-gloves', tag_name: 'Grip Support', subcategories: [] },
          { id: 204, name: 'Ski Sports Gloves', slug: 'ski-sports-gloves', tag_name: 'Thermal Protection', subcategories: [] },
        ],
      },
      {
        id: 3,
        name: 'Workwear / Safety Wear',
        slug: 'workwear-safety-wear',
        tag_name: 'Industrial Apparel',
        subcategories: [
          { id: 301, name: 'Working Suit', slug: 'working-suit', tag_name: 'Full Protection', subcategories: [] },
          { id: 302, name: 'Working Vest', slug: 'working-vest', tag_name: 'Utility Wear', subcategories: [] },
          { id: 303, name: 'Working Jacket', slug: 'working-jacket', tag_name: 'Weather Protection', subcategories: [] },
          { id: 304, name: 'Working Shirt', slug: 'working-shirt', tag_name: 'Durable Wear', subcategories: [] },
          { id: 305, name: 'Working Trousers', slug: 'working-trousers', tag_name: 'Flexible Protection', subcategories: [] },
        ],
      },
    ];
  }
}
