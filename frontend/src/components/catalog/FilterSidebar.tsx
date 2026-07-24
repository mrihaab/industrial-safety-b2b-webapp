import React from 'react';
import { Button } from '@/components/ui/Button';

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

      {/* Category Tree Hierarchy */}
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
          
          <div className="space-y-1 pl-2">
            <span className="font-label-caps text-xs text-primary font-semibold block uppercase tracking-wider py-1">
              Working Gloves
            </span>
            {['working-gloves', 'assembly-gloves', 'welding-gloves', 'driving-gloves', 'cut-resistant-gloves'].map(slug => (
              <button
                key={slug}
                onClick={() => onSelectCategory(slug)}
                className={`w-full text-left py-1 px-3 rounded-xs text-xs transition-colors capitalize ${
                  selectedCategory === slug ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {slug.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-1 pl-2 pt-2">
            <span className="font-label-caps text-xs text-primary font-semibold block uppercase tracking-wider py-1">
              Sports & Workwear
            </span>
            {['sports-gloves', 'workwear-safety-wear', 'safety-vests'].map(slug => (
              <button
                key={slug}
                onClick={() => onSelectCategory(slug)}
                className={`w-full text-left py-1 px-3 rounded-xs text-xs transition-colors capitalize ${
                  selectedCategory === slug ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {slug.replace('-', ' ')}
              </button>
            ))}
          </div>
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
