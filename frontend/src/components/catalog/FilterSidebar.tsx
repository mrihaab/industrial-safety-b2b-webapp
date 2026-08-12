import React, { useEffect, useState } from 'react';
import { CategoryService, CategoryTreeDto } from '@/services/categoryService';

interface FilterSidebarProps {
  selectedCategories: string[];
  onToggleCategory: (categorySlug: string) => void;
  onSelectAllCategories: () => void;
  stockFilter: string;
  onSelectStockFilter: (stock: string) => void;
  selectedCertifications: string[];
  onToggleCertification: (cert: string) => void;
  onSelectAllCertifications: () => void;
  onReset: () => void;
  onCloseMobileDrawer?: () => void;
}

const SIDEBAR_CERTIFICATIONS = [
  'CE Certified',
  'ISO 9001:2015',
  'ANSI / ISEA 107',
  'EN 388:2016',
  'OSHA Ready',
  'REACH Compliant',
  'UKCA',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
  stockFilter,
  onSelectStockFilter,
  selectedCertifications,
  onToggleCertification,
  onSelectAllCertifications,
  onReset,
  onCloseMobileDrawer,
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

  const isAllCategoriesSelected = selectedCategories.length === 0;
  const isAllCertificationsSelected = selectedCertifications.length === 0;

  return (
    <div className="space-y-stack-lg">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">filter_list</span>
          <h2 className="font-title-md text-title-md uppercase tracking-widest text-on-surface font-bold">Filter Options</h2>
        </div>
        {(!isAllCategoriesSelected || stockFilter !== 'all' || !isAllCertificationsSelected) && (
          <button
            onClick={onReset}
            className="text-[11px] font-label-caps text-primary hover:underline cursor-pointer font-bold py-1 px-2"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Product Categories Section */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Product Categories
        </h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 group cursor-pointer py-1">
            <input
              type="checkbox"
              checked={isAllCategoriesSelected}
              onChange={onSelectAllCategories}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className={`font-body-sm text-body-sm transition-colors ${
              isAllCategoriesSelected ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}>
              All Categories
            </span>
          </label>

          {categories.length > 0 ? (
            categories.map(cat => {
              const isChecked = selectedCategories.includes(cat.slug);
              return (
                <div key={cat.id} className="space-y-2">
                  <label className="flex items-center gap-3 group cursor-pointer py-1">
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

                  {cat.children && cat.children.length > 0 && (
                    <div className="pl-6 space-y-1.5 border-l border-outline-variant/40 ml-2">
                      {cat.children.map((sub: CategoryTreeDto) => {
                        const isSubChecked = selectedCategories.includes(sub.slug);
                        return (
                          <label key={sub.id} className="flex items-center gap-2.5 group cursor-pointer py-1">
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
              <label className="flex items-center gap-3 group cursor-pointer py-1">
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
              <label className="flex items-center gap-3 group cursor-pointer py-1">
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
            </div>
          )}
        </div>
      </div>

      {/* Stock Availability Filter */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Stock Availability
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer py-1">
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
          <label className="flex items-center gap-3 group cursor-pointer py-1">
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
          <label className="flex items-center gap-3 group cursor-pointer py-1">
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

      {/* Multi-Select Certification Standards Section */}
      <div className="border-t border-outline-variant pt-stack-md">
        <h3 className="font-label-caps text-label-caps text-primary mb-stack-md uppercase tracking-wider font-bold">
          Certification Standards
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 group cursor-pointer py-1">
            <input
              type="checkbox"
              checked={isAllCertificationsSelected}
              onChange={onSelectAllCertifications}
              className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
            />
            <span className={`font-body-sm text-body-sm transition-colors ${
              isAllCertificationsSelected ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-on-surface'
            }`}>
              All Certifications
            </span>
          </label>

          {SIDEBAR_CERTIFICATIONS.map(cert => {
            const isCertChecked = selectedCertifications.includes(cert);
            return (
              <label key={cert} className="flex items-center gap-3 group cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={isCertChecked}
                  onChange={() => onToggleCertification(cert)}
                  className="rounded-none border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container accent-primary w-4 h-4 cursor-pointer"
                />
                <span className={`font-body-sm text-body-sm transition-colors ${
                  isCertChecked ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-on-surface'
                }`}>
                  {cert}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {onCloseMobileDrawer ? (
        <div className="pt-stack-md sticky bottom-0 bg-surface-container pb-safe">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3.5 orange-glow uppercase tracking-widest cursor-pointer font-bold rounded-xs min-h-[44px]"
          >
            Apply Filters & View Results
          </button>
        </div>
      ) : (
        <div className="pt-stack-lg">
          <button
            onClick={onReset}
            className="w-full font-label-caps text-label-caps py-3 border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container transition-all uppercase tracking-widest cursor-pointer font-bold rounded-xs min-h-[44px]"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
