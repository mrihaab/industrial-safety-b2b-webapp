import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/utils/cn';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const isNavActive = (path: string) => {
    if (path === '/products') {
      return location.pathname === '/products' || location.pathname.startsWith('/products/');
    }
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-xs">
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
                Product Catalog
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
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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
              <svg className="w-7 h-7 text-on-surface hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
