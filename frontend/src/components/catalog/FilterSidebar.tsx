import React, { useEffect, useState } from 'react';
import { CategoryService, CategoryTreeDto } from '@/services/categoryService';

interface FilterSidebarProps {
  selectedCategories: string[];
  onToggleCategory: (categorySlug: string) => void;
  onSelectAllCategories: () => void;
  stockFilter: string;
  onSelectStockFilter: (stock: string) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
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

  const isAllSelected = selectedCategories.length === 0;

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-stack-lg">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">filter_list</span>
          <h2 className="font-title-md text-title-md uppercase tracking-widest text-on-surface font-bold">Filters</h2>
        </div>
        {!isAllSelected && (
          <button
            onClick={onSelectAllCategories}
            className="text-[11px] font-label-caps text-primary hover:underline cursor-pointer"
          >
            Clear Selected ({selectedCategories.length})
          </button>
        )}
      </div>

      {/* Actual Database Product Categories Section with Multi-select Checkboxes */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Product Categories
        </h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={onSelectAllCategories}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className={`font-body-sm text-body-sm transition-colors ${
              isAllSelected ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}>
              All Categories
            </span>
          </label>

          {categories.length > 0 ? (
            categories.map(cat => {
              const isChecked = selectedCategories.includes(cat.slug);
              return (
                <div key={cat.id} className="space-y-2">
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCategory(cat.slug)}
                      className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
                    />
                    <span className={`font-body-sm text-body-sm transition-colors capitalize ${
                      isChecked ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-on-surface'
                    }`}>
                      {cat.name}
                    </span>
                  </label>

                  {/* Subcategories Indented List */}
                  {cat.children && cat.children.length > 0 && (
                    <div className="pl-6 space-y-1.5 border-l border-outline-variant/40 ml-2">
                      {cat.children.map((sub: CategoryTreeDto) => {
                        const isSubChecked = selectedCategories.includes(sub.slug);
                        return (
                          <label key={sub.id} className="flex items-center gap-2.5 group cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSubChecked}
                              onChange={() => onToggleCategory(sub.slug)}
                              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className={`font-body-sm text-xs transition-colors capitalize ${
                              isSubChecked ? 'text-primary font-bold' : 'text-on-surface-variant/80 group-hover:text-on-surface'
                            }`}>
                              {sub.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="space-y-2">
              <label className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('working-gloves')}
                  onChange={() => onToggleCategory('working-gloves')}
                  className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Working Gloves
                </span>
              </label>
              <label className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('sports-gloves')}
                  onChange={() => onToggleCategory('sports-gloves')}
                  className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Sports Gloves
                </span>
              </label>
              <label className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes('workwear-safety-wear')}
                  onChange={() => onToggleCategory('workwear-safety-wear')}
                  className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Workwear & Safety Wear
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Stock Availability Filter matching HTML Mockup */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Stock Availability
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={stockFilter === 'all'}
              onChange={() => onSelectStockFilter('all')}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              Show All Stock Items
            </span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={stockFilter === 'IN STOCK'}
              onChange={() => onSelectStockFilter(stockFilter === 'IN STOCK' ? 'all' : 'IN STOCK')}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-body-sm text-body-sm text-[#4ade80] font-bold group-hover:text-on-surface transition-colors">
              In Stock Only
            </span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={stockFilter === 'LIMITED STOCK'}
              onChange={() => onSelectStockFilter(stockFilter === 'LIMITED STOCK' ? 'all' : 'LIMITED STOCK')}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-body-sm text-body-sm text-error group-hover:text-on-surface transition-colors">
              Limited Stock
            </span>
          </label>
        </div>
      </div>

      {/* Certification Filter matching HTML Mockup */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Certification
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input defaultChecked className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">ANSI/ISEA Z87.1</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">CE EN 388</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">ISO 9001:2015</span>
          </label>
        </div>
      </div>

      <div className="pt-stack-lg">
        <button
          onClick={onReset}
          className="w-full font-label-caps text-label-caps py-3 border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container transition-all uppercase tracking-widest cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};
