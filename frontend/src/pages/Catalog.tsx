import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { SortBar } from '@/components/catalog/SortBar';
import { ProductCard, ProductCardData } from '@/components/product/ProductCard';
import { Pagination } from '@/components/ui/Pagination';
import { Loader } from '@/components/ui/Loader';
import { ProductService } from '@/services/productService';

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

        if (response.success && response.data) {
          setProducts(response.data);
          const pagination = response.pagination || response.meta;
          if (pagination) {
            setTotalPages(pagination.totalPages || 1);
          }
        }
      } catch (err: unknown) {
        console.warn('API error during product catalog fetch:', err);
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
                No safety items match your selected filters or database query. Try resetting your parameters.
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
