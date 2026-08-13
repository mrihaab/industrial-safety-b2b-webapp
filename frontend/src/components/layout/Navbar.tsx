import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/utils/cn';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
    setMobileSearchOpen(false);
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#051424] border-b border-[#2a3647]">
        <nav className="flex justify-between items-center px-4 sm:px-gutter w-full max-w-container-max mx-auto h-16 sm:h-20 gap-2">
          {/* Left: Brand Logo & Desktop Nav */}
          <div className="flex items-center gap-4 lg:gap-10 shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0 whitespace-nowrap font-body-lg">
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

          {/* Right Actions Container */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center bg-surface-container-high px-3 py-1.5 border border-outline-variant rounded-xs focus-within:border-primary transition-colors"
            >
              <svg className="w-4 h-4 text-on-surface-variant shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Search safety gear..."
                className="bg-transparent border-none text-xs text-on-surface px-2 w-32 lg:w-48 focus:outline-none placeholder:text-on-surface-variant/60"
              />
              {searchQuery && (
                <button type="button" onClick={handleClearSearch} className="text-on-surface-variant hover:text-primary text-xs cursor-pointer px-1">
                  ✕
                </button>
              )}
            </form>

            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer rounded-xs transition-colors"
              title="Search Catalog"
            >
              <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shopping Cart Icon Link */}
            <Link
              to="/cart"
              className="relative p-2 text-on-surface-variant hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              title="View Wholesale Cart"
            >
              <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-primary-container text-on-primary-container text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Desktop / Tablet Bulk Quote CTA Button */}
            <Link
              to="/rfq"
              className="hidden sm:inline-flex bg-primary-container text-on-primary-container font-label-caps text-xs px-4 py-2.5 rounded-xs font-bold orange-glow uppercase tracking-wider shrink-0 items-center justify-center min-h-[40px]"
            >
              Bulk Quote
            </Link>

            {/* Seamless Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden p-2 text-on-surface hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
            >
              <svg className="w-6.5 h-6.5 text-on-surface hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden border-t border-outline-variant bg-surface-container-high p-3 transition-all">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-lowest px-3 py-2 border border-primary/60 rounded-xs">
              <svg className="w-5 h-5 text-primary shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Search PPE & safety equipment..."
                className="bg-transparent border-none text-sm text-on-surface w-full focus:outline-none placeholder:text-on-surface-variant/60"
                autoFocus
              />
              {searchQuery && (
                <button type="button" onClick={handleClearSearch} className="text-on-surface-variant hover:text-primary text-xs px-2">
                  ✕
                </button>
              )}
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
