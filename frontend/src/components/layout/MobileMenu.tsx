import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { SocialLinksRow } from '@/components/ui/SocialLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isNavActive = (path: string) => {
    if (path === '/products') {
      return location.pathname === '/products' || location.pathname.startsWith('/products/');
    }
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
    >
      {/* 1. Backdrop Blur Overlay (Fades In / Out) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. Slide-in Drawer Container (Slides from Right with smooth easing) */}
      <div
        className={`relative ml-auto w-full max-w-[340px] h-full bg-surface shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-out overflow-y-auto pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] border-l border-outline-variant ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header Bar inside Mobile Drawer */}
        <div className="flex items-center justify-between border-b border-outline-variant/80 pb-4 shrink-0">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close Mobile Navigation"
            className="text-on-surface-variant hover:text-primary p-2 text-2xl font-bold min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Main Navigation Links List */}
        <nav className="flex flex-col gap-2 my-6 font-title-md text-title-md shrink-0">
          <Link
            to="/"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span>Home</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>

          <Link
            to="/products"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/products')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <div className="flex flex-col">
              <span>Product Catalog</span>
              <span className="text-[11px] font-normal text-on-surface-variant">Browse Wholesale Gear</span>
            </div>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>

          <Link
            to="/about"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/about')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span>About Us & Certifications</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>

          <Link
            to="/contact"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/contact')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span>Contact Us</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>

          <Link
            to="/ce-standards"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/ce-standards')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span>CE & ISO Compliance</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>

          <Link
            to="/rfq"
            onClick={onClose}
            className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xs font-bold transition-all ${
              isNavActive('/rfq')
                ? 'bg-primary-container/15 text-primary border-l-4 border-primary'
                : 'text-on-surface hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span>Global Logistics & RFQ</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </nav>

        {/* Prominent Action Button Section & Social Channels */}
        <div className="mt-auto space-y-4 pt-6 border-t border-outline-variant/80 shrink-0">
          <Link to="/rfq" onClick={onClose} className="block w-full">
            <Button variant="primary" className="w-full min-h-[48px] uppercase tracking-wider font-bold orange-glow">
              Request Bulk Quote
            </Button>
          </Link>

          {/* Official Social Links in Mobile Drawer */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant/70">
              Connect With Us
            </span>
            <SocialLinksRow />
          </div>

          <p className="text-center font-mono text-[11px] text-on-surface-variant/70">
            Ghulam Safety Hub • Sialkot Industrial Zone, Pakistan
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
