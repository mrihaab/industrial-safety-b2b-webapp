import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/layout/SearchBar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/utils/cn';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={cn(
          'w-full sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant transition-all duration-300',
          isScrolled && 'shadow-2xl shadow-black/40 border-primary/20'
        )}
      >
        <div className="max-w-container-max mx-auto px-gutter h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-body-lg">
            <Link
              to="/products"
              className={cn(
                'text-on-surface-variant hover:text-primary transition-colors pb-1',
                isActive('/products') && 'text-primary border-b-2 border-primary font-semibold'
              )}
            >
              PPE & Safety Gear
            </Link>
            <Link
              to="/about"
              className={cn(
                'text-on-surface-variant hover:text-primary transition-colors pb-1',
                isActive('/about') && 'text-primary border-b-2 border-primary font-semibold'
              )}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={cn(
                'text-on-surface-variant hover:text-primary transition-colors pb-1',
                isActive('/contact') && 'text-primary border-b-2 border-primary font-semibold'
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-4">
            {/* Cart Icon Link */}
            <Link to="/rfq" className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Admin Login Link */}
            <Link to="/admin/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="font-label-caps">
                Login
              </Button>
            </Link>

            {/* Bulk Quote CTA */}
            <Link to="/rfq" className="hidden sm:block">
              <Button variant="primary" size="md">
                Bulk Quote
              </Button>
            </Link>

            {/* Mobile Menu Burger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
