import React, { useEffect, useState } from 'react';
import { CategoryService, CategoryTreeDto } from '@/services/categoryService';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  stockFilter: string;
  onSelectStockFilter: (stock: string) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  stockFilter,
  onSelectStockFilter,
  onReset,
}) => {
  const [categories, setCategories] = useState<CategoryTreeDto[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        if (response.success && response.data && response.data.length > 0) {
          setCategories(response.data);
        }
      } catch (err: unknown) {
        console.warn('API error fetching category tree for sidebar:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-full lg:w-64 bg-surface-container industrial-border p-6 rounded-sm space-y-8 h-fit">
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <h3 className="font-label-caps text-label-caps text-primary tracking-widest uppercase font-bold">
          Filter Inventory
        </h3>
        <button onClick={onReset} className="text-xs text-on-surface-variant hover:text-primary transition-colors underline">
          Reset All
        </button>
      </div>

      {/* Dynamic Database Categories */}
      <div className="space-y-4">
        <h4 className="font-title-md text-sm text-on-surface font-bold uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-2 font-body-sm text-sm">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left py-1.5 px-3 rounded-xs transition-colors ${
              selectedCategory === 'all' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Categories
          </button>

          {categories.length > 0 ? (
            categories.map(cat => (
              <div key={cat.id} className="space-y-1 pl-2 pt-1">
                <button
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`w-full text-left py-1 px-3 rounded-xs text-xs transition-colors capitalize font-semibold ${
                    selectedCategory === cat.slug ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat.name}
                </button>
                {cat.children && cat.children.length > 0 && (
                  <div className="pl-3 space-y-1 border-l border-outline-variant/40 ml-2">
                    {cat.children.map((sub: CategoryTreeDto) => (
                      <button
                        key={sub.id}
                        onClick={() => onSelectCategory(sub.slug)}
                        className={`w-full text-left py-0.5 px-2 rounded-xs text-[11px] transition-colors capitalize ${
                          selectedCategory === sub.slug ? 'text-primary font-bold' : 'text-on-surface-variant/80 hover:text-on-surface'
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="space-y-1 pl-2">
              <button
                onClick={() => onSelectCategory('working-gloves')}
                className={`w-full text-left py-1 px-3 rounded-xs text-xs transition-colors capitalize ${
                  selectedCategory === 'working-gloves' ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Working Gloves
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stock Status Filter */}
      <div className="space-y-3 pt-4 border-t border-outline-variant">
        <h4 className="font-title-md text-sm text-on-surface font-bold uppercase tracking-wider">
          Stock Availability
        </h4>
        <div className="space-y-2 text-xs text-on-surface-variant">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === 'all'}
              onChange={() => onSelectStockFilter('all')}
              className="accent-primary"
            />
            <span>Show All Items</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === 'IN STOCK'}
              onChange={() => onSelectStockFilter('IN STOCK')}
              className="accent-primary"
            />
            <span className="text-[#4ade80]">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === 'LIMITED STOCK'}
              onChange={() => onSelectStockFilter('LIMITED STOCK')}
              className="accent-primary"
            />
            <span className="text-error">Limited Stock</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
