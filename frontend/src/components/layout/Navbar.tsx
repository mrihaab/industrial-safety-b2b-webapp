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

  return (
    <>
      <header className="w-full top-0 border-b border-outline-variant bg-surface sticky z-50">
        <nav className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-stack-lg">
            {/* Brand Logo with Shield Emblem */}
            <Link to="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Nav Links (Desktop) matching HTML Mockup */}
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
                PPE Gear
              </Link>
              <Link
                to="/products"
                className="font-body-lg text-body-lg text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                Industrial
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
                Services
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
                Safety Training
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input (Desktop) matching HTML Mockup */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center bg-surface-container-high px-4 py-2 border border-outline-variant rounded focus-within:border-primary">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search gear..."
                className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm w-48 text-on-surface px-2 focus:outline-none placeholder:text-on-surface-variant/60"
              />
            </form>

            <div className="flex items-center gap-3">
              {/* Globe Icon */}
              <button
                type="button"
                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="Global Compliance active"
              >
                public
              </button>

              {/* Cart Icon */}
              <Link to="/rfq" className="relative p-1 text-on-surface-variant hover:text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary-container text-on-primary-container text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Login Button matching HTML Mockup */}
              <Link
                to="/admin/login"
                className="hidden md:block font-label-caps text-label-caps border border-outline-variant px-4 py-2 hover:bg-surface-variant transition-all text-on-surface"
              >
                Login
              </Link>

              {/* Bulk Quote Orange Glow Button matching HTML Mockup */}
              <Link
                to="/rfq"
                className="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-4 py-2 rounded-sm font-bold orange-glow transition-all active:opacity-80 uppercase tracking-wider"
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
