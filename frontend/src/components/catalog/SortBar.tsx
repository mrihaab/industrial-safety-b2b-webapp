import React from 'react';
import { Select } from '@/components/ui/Select';
import { SearchBar } from '@/components/layout/SearchBar';

interface SortBarProps {
  totalItems: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onSearch: (query: string) => void;
}

export const SortBar: React.FC<SortBarProps> = ({
  totalItems,
  sortBy,
  onSortChange,
  onSearch,
}) => {
  return (
    <div className="bg-surface-container industrial-border p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Product Counter Badge */}
      <div className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">
        Showing <span className="text-primary font-bold">{totalItems}</span> Industrial Safety Items
      </div>

      {/* Search Input & Sort Options */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <SearchBar onSearch={onSearch} className="w-full sm:w-64" placeholder="Search catalog..." />
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-label-caps text-xs text-on-surface-variant whitespace-nowrap">Sort By:</span>
          <Select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            options={[
              { value: 'featured', label: 'Featured Gear' },
              { value: 'price_asc', label: 'Price: Low to High' },
              { value: 'price_desc', label: 'Price: High to Low' },
              { value: 'rating', label: 'Top Rated' },
            ]}
            className="py-1.5 text-xs"
          />
        </div>
      </div>
    </div>
  );
};
