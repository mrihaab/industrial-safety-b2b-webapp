import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { SortBar } from '@/components/catalog/SortBar';
import { ProductCard, ProductCardData } from '@/components/product/ProductCard';
import { Pagination } from '@/components/ui/Pagination';

// Temporary Mock Products matching Product DTO specifications
const MOCK_PRODUCTS: ProductCardData[] = [
  {
    id: 1,
    slug: 'gsh-elite-industrial-gloves',
    sku: 'GSH-WG-001',
    title: 'GSH Elite Industrial Working Gloves',
    seriesName: 'HEAVY DUTY SERIES',
    price: 45.00,
    moq: 50,
    stockStatus: 'IN STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 4.9,
    reviewCount: 128,
    primaryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    slug: 'titanshield-assembly-gloves',
    sku: 'GSH-AG-002',
    title: 'TitanShield Precision Assembly Gloves',
    seriesName: 'PRECISION SERIES',
    price: 32.50,
    moq: 100,
    stockStatus: 'IN STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 4.8,
    reviewCount: 94,
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    slug: 'vulcan-welding-gloves',
    sku: 'GSH-WG-003',
    title: 'Vulcan Heat-Resistant Heavy Welding Gloves',
    seriesName: 'THERMAL ARMOR',
    price: 58.00,
    moq: 50,
    stockStatus: 'IN STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 5.0,
    reviewCount: 67,
    primaryImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    slug: 'pro-vis-safety-vest-class2',
    sku: 'GSH-SV-004',
    title: 'Pro-Vis Class 2 High-Visibility Safety Vest',
    seriesName: 'REFLECTIVE SERIES',
    price: 24.00,
    moq: 50,
    stockStatus: 'IN STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 4.7,
    reviewCount: 210,
    primaryImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    slug: 'ironstride-steel-toe-boots',
    sku: 'GSH-FW-005',
    title: 'IronStride Anti-Puncture Steel Toe Boots',
    seriesName: 'FOOTWEAR ARMOR',
    price: 68.00,
    moq: 20,
    stockStatus: 'LIMITED STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 4.9,
    reviewCount: 156,
    primaryImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    slug: 'apex-sports-performance-gloves',
    sku: 'GSH-SG-006',
    title: 'Apex Tactical Performance Sports Gloves',
    seriesName: 'ATHLETIC GEAR',
    price: 39.00,
    moq: 50,
    stockStatus: 'IN STOCK',
    statusTag: 'Safety-System-Active',
    ratingScore: 4.6,
    reviewCount: 82,
    primaryImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
  },
];

export const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [{ label: 'PPE & Safety Catalog' }];

  // Client-side filtering simulation
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (selectedCategory !== 'all' && !product.slug.includes(selectedCategory.split('-')[0])) return false;
    if (stockFilter !== 'all' && product.stockStatus !== stockFilter) return false;
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && !product.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleReset = () => {
    setSelectedCategory('all');
    setStockFilter('all');
    setSortBy('featured');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Banner */}
      <SectionHeader
        badge="WHOLESALE CATALOG"
        title="Industrial PPE & Safety Equipment"
        subtitle="Explore ISO-certified safety gloves, workwear, high-visibility apparel, and industrial protective gear."
      />

      {/* Catalog Layout Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          stockFilter={stockFilter}
          onSelectStockFilter={setStockFilter}
          onReset={handleReset}
        />

        {/* Right Main Grid */}
        <div className="flex-1 space-y-6">
          {/* Top Sort & Search Bar */}
          <SortBar
            totalItems={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={setSearchQuery}
          />

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container industrial-border p-12 text-center rounded-sm space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">search_off</span>
              <h3 className="font-headline-lg text-xl text-on-surface font-bold">No Products Found</h3>
              <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto">
                No safety items match your selected filters. Try resetting your search parameters.
              </p>
              <button onClick={handleReset} className="font-label-caps text-primary underline text-sm">
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={2}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
