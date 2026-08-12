import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/utils/cn';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get('search') || '';
    setSearchQuery(searchParam);
  }, [location.search]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      if (location.pathname === '/products') {
        navigate('/products', { replace: true });
      }
    } else {
      navigate(`/products?search=${encodeURIComponent(val.trim())}`, { replace: true });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate('/products', { replace: true });
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (location.pathname === '/products') {
      navigate('/products', { replace: true });
    }
  };

  const isNavActive = (path: string) => {
    if (path === '/products') {
      return location.pathname === '/products' || location.pathname.startsWith('/products/');
    }
    return location.pathname === path;
  };

  // Show Search Bar ONLY on Products Catalog page (/products) and Product Detail page (/products/:slug)
  const isSearchPage = location.pathname === '/products' || location.pathname.startsWith('/products/');

  return (
    <>
      <header className="w-full top-0 border-b border-outline-variant bg-surface sticky z-50">
        <nav className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-20 gap-2 sm:gap-4">
          {/* Left: Brand Logo & Navigation Links Container */}
          <div className="flex items-center gap-4 lg:gap-10 min-w-0 flex-shrink-0">
            {/* Brand Logo */}
            <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap cursor-default">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0 whitespace-nowrap font-body-lg">
              <Link
                to="/products"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base py-2',
                  isNavActive('/products')
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                PPE & Safety Gear
              </Link>
              <Link
                to="/about"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base py-2',
                  isNavActive('/about')
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base py-2',
                  isNavActive('/contact')
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Center / Right Controls Container */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 whitespace-nowrap">
            {/* Desktop Search Bar */}
            {isSearchPage && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center bg-surface-container-high px-3.5 py-1.5 border border-outline-variant rounded-xs focus-within:border-primary transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder="Search safety products..."
                  className="bg-transparent border-none focus:ring-0 text-xs font-body-sm w-36 xl:w-56 text-on-surface px-2 focus:outline-none placeholder:text-on-surface-variant/60 whitespace-nowrap"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-on-surface-variant hover:text-primary text-xs ml-1 cursor-pointer p-1"
                  >
                    ✕
                  </button>
                )}
              </form>
            )}

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 min-h-[44px] min-w-[44px] text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
              title="View Wholesale Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary-container text-on-primary-container text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Bulk Quote CTA Button (Responsive Sizing) */}
            <Link
              to="/rfq"
              className="bg-primary-container text-on-primary-container font-label-caps text-[11px] sm:text-xs px-3 sm:px-5 py-2 sm:py-2.5 rounded-xs font-bold orange-glow transition-all active:opacity-80 uppercase tracking-wider whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
            >
              Bulk Quote
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu Navigation"
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
