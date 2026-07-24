import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { SortBar } from '@/components/catalog/SortBar';
import { ProductCard, ProductCardData } from '@/components/product/ProductCard';
import { Pagination } from '@/components/ui/Pagination';
import { Loader } from '@/components/ui/Loader';
import { ProductService } from '@/services/productService';

const FALLBACK_PRODUCTS: ProductCardData[] = [
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
];

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const breadcrumbItems = [{ label: 'PPE & Safety Catalog' }];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProducts({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          stock: stockFilter !== 'all' ? stockFilter : undefined,
          sort: sortBy,
          search: searchQuery || undefined,
          page: currentPage,
          limit: 12,
        });

        if (response.success && response.data && response.data.length > 0) {
          setProducts(response.data);
          if (response.meta) {
            setTotalPages(response.meta.totalPages || 1);
          }
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err: unknown) {
        console.warn('API error during product catalog fetch, displaying fallback products:', err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, stockFilter, sortBy, searchQuery, currentPage]);

  const handleReset = () => {
    setSelectedCategory('all');
    setStockFilter('all');
    setSortBy('featured');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        badge="WHOLESALE CATALOG"
        title="Industrial PPE & Safety Equipment"
        subtitle="Explore ISO-certified safety gloves, workwear, high-visibility apparel, and industrial protective gear."
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          stockFilter={stockFilter}
          onSelectStockFilter={setStockFilter}
          onReset={handleReset}
        />

        <div className="flex-1 space-y-6">
          <SortBar
            totalItems={products.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={setSearchQuery}
          />

          {loading ? (
            <div className="py-20 flex justify-center items-center">
              <Loader size="lg" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
