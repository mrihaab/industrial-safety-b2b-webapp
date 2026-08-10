import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-surface/98 backdrop-blur-xl p-6 transition-all duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <Logo />
        <button onClick={onClose} className="text-on-surface-variant hover:text-primary p-2 text-2xl font-bold">
          ✕
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6 my-8 font-title-md text-title-md">
        <Link to="/" onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
          Home
        </Link>
        <Link to="/products" onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
          PPE & Safety Gear
        </Link>
        <Link to="/about" onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
          About Us
        </Link>
        <Link to="/contact" onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
          Contact Us
        </Link>
        <Link to="/rfq" onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
          Global Logistics & RFQ
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="mt-auto space-y-4 pt-6 border-t border-outline-variant">
        <Link to="/rfq" onClick={onClose} className="block w-full text-center">
          <Button variant="primary" className="w-full">
            Request Bulk Quote
          </Button>
        </Link>
      </div>
    </div>
  );
};
