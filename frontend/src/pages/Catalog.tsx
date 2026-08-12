import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ProductCard, ProductCardData } from '@/components/product/ProductCard';
import { Loader } from '@/components/ui/Loader';
import { ProductService } from '@/services/productService';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Performance Tier');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Mobile Filter Drawer Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(urlSearch);
    setCurrentPage(1);
  }, [urlSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryQuery = selectedCategories.length > 0 ? selectedCategories.join(',') : undefined;
        const certQuery = selectedCertifications.length > 0 ? selectedCertifications.join(',') : undefined;

        const response = await ProductService.getProducts({
          category: categoryQuery,
          stock: stockFilter !== 'all' ? stockFilter : undefined,
          certification: certQuery,
          sort: sortBy,
          search: searchQuery.trim() || undefined,
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
        } else {
          setProducts([]);
          setTotalCount(0);
        }
      } catch (err: unknown) {
        console.warn('API error during product catalog fetch:', err);
        setProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, stockFilter, selectedCertifications, sortBy, searchQuery, currentPage]);

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

  const handleToggleCertification = (cert: string) => {
    setSelectedCertifications(prev => {
      if (prev.includes(cert)) {
        return prev.filter(c => c !== cert);
      } else {
        return [...prev, cert];
      }
    });
    setCurrentPage(1);
  };

  const handleSelectAllCertifications = () => {
    setSelectedCertifications([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setStockFilter('all');
    setSelectedCertifications([]);
    setSortBy('Performance Tier');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  const activeFiltersCount =
    selectedCategories.length +
    (stockFilter !== 'all' ? 1 : 0) +
    selectedCertifications.length;

  return (
    <div className="w-full">
      {/* Catalog Main Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-lg gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
            PPE & Safety Gear
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            {searchQuery ? (
              <span>
                Search results for <strong className="text-primary font-mono font-bold">"{searchQuery}"</strong> ({products.length} found)
              </span>
            ) : selectedCertifications.length > 0 ? (
              <span>
                Filtered by certifications <strong className="text-primary font-mono font-bold">"{selectedCertifications.join(', ')}"</strong> ({products.length} found)
              </span>
            ) : (
              <span>Showing {products.length > 0 ? 1 : 0}-{products.length} of {totalCount > 0 ? totalCount : products.length} industrial-grade solutions</span>
            )}
          </p>
        </div>

        {/* Desktop Sort Control */}
        <div className="hidden md:flex items-center gap-3 bg-surface-container-low border border-outline-variant px-3 py-2 rounded-xs">
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

      {/* Compact Mobile Catalog Toolbar (ONLY displayed on mobile < 768px) */}
      <div className="md:hidden flex items-center gap-3 mb-stack-md bg-surface-container industrial-border p-3 rounded-xs">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 bg-primary-container text-on-primary-container font-label-caps text-xs py-3 px-4 rounded-xs font-bold flex items-center justify-center gap-2 orange-glow uppercase min-h-[44px]"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>

        <div className="flex-1 bg-surface-container-high border border-outline-variant rounded-xs px-3 py-2 flex items-center justify-between min-h-[44px]">
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-xs font-label-caps text-primary pr-6 py-0 focus:outline-none cursor-pointer"
          >
            <option value="Performance Tier" className="bg-surface text-on-surface">Performance</option>
            <option value="Newest Arrivals" className="bg-surface text-on-surface">Newest</option>
            <option value="Price: High to Low" className="bg-surface text-on-surface">Price ↓</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges / Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-stack-md bg-surface-container/40 p-3 industrial-border rounded-xs">
          <span className="font-label-caps text-[10px] text-primary uppercase font-bold mr-1">Active Filters:</span>

          {selectedCategories.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-container text-on-primary-container font-mono text-[11px] font-bold rounded-xs">
              {cat}
              <button onClick={() => handleToggleCategory(cat)} className="hover:text-error cursor-pointer">✕</button>
            </span>
          ))}

          {stockFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/40 font-mono text-[11px] font-bold rounded-xs">
              Stock: {stockFilter}
              <button onClick={() => setStockFilter('all')} className="hover:text-error cursor-pointer">✕</button>
            </span>
          )}

          {selectedCertifications.map(cert => (
            <span key={cert} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high text-primary border border-outline-variant font-mono text-[11px] font-bold rounded-xs">
              {cert}
              <button onClick={() => handleToggleCertification(cert)} className="hover:text-error cursor-pointer">✕</button>
            </span>
          ))}

          <button
            onClick={handleReset}
            className="font-label-caps text-[10px] text-primary underline uppercase font-bold ml-auto cursor-pointer py-1"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Layout Split: Desktop Sidebar vs Product Grid */}
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Desktop Sidebar Filter (Hidden on Mobile) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onSelectAllCategories={handleSelectAllCategories}
            stockFilter={stockFilter}
            onSelectStockFilter={setStockFilter}
            selectedCertifications={selectedCertifications}
            onToggleCertification={handleToggleCertification}
            onSelectAllCertifications={handleSelectAllCertifications}
            onReset={handleReset}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
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
            <div className="bg-surface-container border border-outline-variant p-12 text-center rounded-xs space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">inventory_2</span>
              <h3 className="font-headline-lg text-xl text-on-surface font-bold">
                {selectedCategories.length > 0
                  ? 'No Products Currently in This Category'
                  : searchQuery
                    ? `No Products Found for "${searchQuery}"`
                    : 'No Products Available'}
              </h3>
              <p className="font-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                {selectedCategories.length > 0
                  ? 'Currently, there are no active safety products listed in this specific category. New industrial-grade inventory will be added soon!'
                  : searchQuery
                    ? `We couldn't find any products matching "${searchQuery}". New stock is arriving soon!`
                    : 'No items match your selected filters. Explore our full catalog by resetting filters.'}
              </p>
              <button
                onClick={handleReset}
                className="font-label-caps text-primary underline text-sm cursor-pointer font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Explore All Products & Clear Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-stack-lg flex justify-center items-center gap-4 pt-6">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                chevron_left
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer rounded-xs ${
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
                className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                chevron_right
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <div className="relative ml-auto w-full max-w-xs bg-surface-container border-l border-outline-variant h-full flex flex-col p-6 overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">tune</span>
                <h3 className="font-title-md text-title-md font-bold uppercase tracking-wider text-on-surface">Filter Catalog</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-on-surface-variant hover:text-primary font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Embedded Filter Sidebar inside Mobile Drawer */}
            <FilterSidebar
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              onSelectAllCategories={handleSelectAllCategories}
              stockFilter={stockFilter}
              onSelectStockFilter={setStockFilter}
              selectedCertifications={selectedCertifications}
              onToggleCertification={handleToggleCertification}
              onSelectAllCertifications={handleSelectAllCertifications}
              onReset={handleReset}
              onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
