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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
        <nav className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-20 gap-4">
          {/* Left: Brand Logo & Navigation Links Container */}
          <div className="flex items-center gap-6 lg:gap-10 min-w-0 flex-shrink-0">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
              <Logo />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0 whitespace-nowrap font-body-lg">
              <Link
                to="/products"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base',
                  isNavActive('/products')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                PPE & Safety Gear
              </Link>
              <Link
                to="/about"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base',
                  isNavActive('/about')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={cn(
                  'whitespace-nowrap transition-colors duration-200 pb-1 font-semibold text-sm lg:text-base',
                  isNavActive('/contact')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Center / Right Controls Container */}
          <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0 whitespace-nowrap">
            {/* Search Input (Displayed ONLY on Products Catalog & Detail Pages) */}
            {isSearchPage && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center bg-surface-container-high px-3.5 py-1.5 border border-outline-variant rounded-xs focus-within:border-primary transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search safety products..."
                  className="bg-transparent border-none focus:ring-0 text-xs font-body-sm w-36 xl:w-56 text-on-surface px-2 focus:outline-none placeholder:text-on-surface-variant/60 whitespace-nowrap"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-on-surface-variant hover:text-primary text-xs ml-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </form>
            )}

            {/* Shopping Cart Icon Link -> Opens Dedicated /cart Page */}
            <Link
              to="/cart"
              className="relative p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center flex-shrink-0"
              title="View Wholesale Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Login Button */}
            <Link
              to="/admin/login"
              className="hidden md:inline-flex items-center justify-center font-label-caps text-xs border border-outline-variant px-4 py-2 hover:bg-surface-variant transition-all text-on-surface rounded-xs whitespace-nowrap flex-shrink-0 font-bold"
            >
              Login
            </Link>

            {/* Bulk Quote Button -> Opens Official Wholesale RFQ Page (/rfq) */}
            <Link
              to="/rfq"
              className="bg-primary-container text-on-primary-container font-label-caps text-xs px-5 py-2.5 rounded-xs font-bold orange-glow transition-all active:opacity-80 uppercase tracking-wider whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center"
            >
              Bulk Quote
            </Link>

            {/* Mobile Menu Burger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex-shrink-0"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
