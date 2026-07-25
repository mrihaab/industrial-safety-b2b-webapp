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
        <nav className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-stack-lg">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex gap-6 items-center ml-8">
              <Link
                to="/products"
                className={cn(
                  'font-body-lg text-body-lg transition-colors duration-200 pb-1',
                  isNavActive('/products')
                    ? 'text-primary border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                PPE & Safety Gear
              </Link>
              <Link
                to="/about"
                className={cn(
                  'font-body-lg text-body-lg transition-colors duration-200 pb-1',
                  isNavActive('/about')
                    ? 'text-primary border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={cn(
                  'font-body-lg text-body-lg transition-colors duration-200 pb-1',
                  isNavActive('/contact')
                    ? 'text-primary border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                )}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input (Displayed ONLY on Products Catalog & Detail Pages) */}
            {isSearchPage && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden sm:flex items-center bg-surface-container-high px-4 py-2 border border-outline-variant rounded-xs focus-within:border-primary transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search safety products..."
                  className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm w-48 lg:w-60 text-on-surface px-2 focus:outline-none placeholder:text-on-surface-variant/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-on-surface-variant hover:text-primary text-xs"
                  >
                    ✕
                  </button>
                )}
              </form>
            )}

            <div className="flex items-center gap-3">
              {/* Shopping Cart Icon Link -> Opens Dedicated /cart Page */}
              <Link
                to="/cart"
                className="relative p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center"
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
                className="hidden md:block font-label-caps text-label-caps border border-outline-variant px-4 py-2 hover:bg-surface-variant transition-all text-on-surface rounded-xs"
              >
                Login
              </Link>

              {/* Bulk Quote Button -> Opens Official Wholesale RFQ Page (/rfq) */}
              <Link
                to="/rfq"
                className="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-5 py-2.5 rounded-xs font-bold orange-glow transition-all active:opacity-80 uppercase tracking-wider"
              >
                Bulk Quote
              </Link>

              {/* Mobile Menu Burger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-3xl">menu</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
