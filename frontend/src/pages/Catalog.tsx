import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ProductCard, ProductCardData } from '@/components/product/ProductCard';
import { Loader } from '@/components/ui/Loader';
import { ProductService } from '@/services/productService';

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState('all');
  const [certificationFilter, setCertificationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('Performance Tier');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setSearchQuery(urlSearch);
    setCurrentPage(1);
  }, [urlSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryQuery = selectedCategories.length > 0 ? selectedCategories.join(',') : undefined;
        const response = await ProductService.getProducts({
          category: categoryQuery,
          stock: stockFilter !== 'all' ? stockFilter : undefined,
          certification: certificationFilter !== 'all' ? certificationFilter : undefined,
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
            setTotalCount(pagination.total || response.data.length);
          } else {
            setTotalCount(response.data.length);
          }
        }
      } catch (err: unknown) {
        console.warn('API error during product catalog fetch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, stockFilter, certificationFilter, sortBy, searchQuery, currentPage]);

  const handleToggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categorySlug)) {
        return prev.filter(c => c !== categorySlug);
      } else {
        return [...prev, categorySlug];
      }
    });
    setCurrentPage(1);
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setStockFilter('all');
    setCertificationFilter('all');
    setSortBy('Performance Tier');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Filter Sidebar */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onSelectAllCategories={handleSelectAllCategories}
          stockFilter={stockFilter}
          onSelectStockFilter={setStockFilter}
          certificationFilter={certificationFilter}
          onSelectCertificationFilter={setCertificationFilter}
          onReset={handleReset}
        />

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Catalog Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-lg gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
                PPE & Safety Gear
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {searchQuery ? (
                  <span>
                    Search results for <strong className="text-primary font-mono font-bold">"{searchQuery}"</strong> ({products.length} found)
                  </span>
                ) : certificationFilter !== 'all' ? (
                  <span>
                    Filtered by certification <strong className="text-primary font-mono font-bold">"{certificationFilter}"</strong> ({products.length} found)
                  </span>
                ) : (
                  <span>Showing 1-{products.length} of {totalCount > 0 ? totalCount : 148} industrial-grade solutions</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-low border border-outline-variant px-3 py-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm text-primary pr-8 py-0 focus:outline-none cursor-pointer"
              >
                <option value="Performance Tier" className="bg-surface text-on-surface">Performance Tier</option>
                <option value="Newest Arrivals" className="bg-surface text-on-surface">Newest Arrivals</option>
                <option value="Price: High to Low" className="bg-surface text-on-surface">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-20 flex justify-center items-center">
              <Loader size="lg" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container border border-outline-variant p-12 text-center rounded-xs space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">search_off</span>
              <h3 className="font-headline-lg text-xl text-on-surface font-bold">No Products Found</h3>
              <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto">
                No safety items match your selected certification or filters. Try clearing your search parameters.
              </p>
              <button onClick={handleReset} className="font-label-caps text-primary underline text-sm">
                Clear Search & Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-stack-lg flex justify-center items-center gap-4 pt-6">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer"
              >
                chevron_left
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'border border-outline-variant text-on-surface-variant hover:border-primary'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer"
              >
                chevron_right
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
