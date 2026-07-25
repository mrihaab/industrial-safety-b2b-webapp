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
    <aside className="w-full md:w-64 flex-shrink-0 space-y-stack-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">filter_list</span>
        <h2 className="font-title-md text-title-md uppercase tracking-widest text-on-surface">Filters</h2>
      </div>

      {/* Dynamic Database Categories Filter */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase">Categories</h3>
        <div className="space-y-2 font-body-sm text-sm">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left py-1.5 px-3 rounded-xs transition-colors ${
              selectedCategory === 'all' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Categories
          </button>

          {categories.map(cat => (
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
          ))}
        </div>
      </div>

      {/* Filter Category 1: Protection Level matching HTML Mockup */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase">Protection Level</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" defaultChecked />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Heavy Duty (Level 5)</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Standard (Level 3)</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Tactical Precision</span>
          </label>
        </div>
      </div>

      {/* Filter Category 2: Material matching HTML Mockup */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase">Material</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" defaultChecked />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Reinforced Kevlar</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Polycarbonate Shield</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">High-Vis Reflective</span>
          </label>
        </div>
      </div>

      {/* Filter Category 3: Certification matching HTML Mockup */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase">Certification</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer">
            <input defaultChecked className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">ANSI/ISEA Z87.1</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">CE EN 388</span>
          </label>
          <label className="flex items-center gap-3 group cursor-pointer">
            <input className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary" type="checkbox" />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">ISO 9001:2015</span>
          </label>
        </div>
      </div>

      <div className="pt-stack-lg">
        <button
          onClick={onReset}
          className="w-full font-label-caps text-label-caps py-3 border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container transition-all uppercase tracking-widest cursor-pointer"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
};
