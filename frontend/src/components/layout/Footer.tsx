import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/60 py-8 text-on-surface-variant font-body-sm relative z-10">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        {/* Left: Brand Name & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left flex-shrink-0">
          <span className="font-headline-lg text-lg font-bold text-on-surface whitespace-nowrap cursor-default">
            Ghulam Safety Hub
          </span>
          <span className="text-on-surface-variant/70 font-mono text-[11px] whitespace-nowrap">
            © {new Date().getFullYear()} Ghulam Safety Hub. Enterprise PPE Equipment.
          </span>
        </div>

        {/* Right: Horizontal Link Bar with Safe Right Margin for Floating Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 lg:gap-8 text-xs text-on-surface-variant font-body-sm pr-12 sm:pr-16 md:pr-24 lg:pr-28">
          <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap py-1">
            About & Certifications
          </Link>
          <Link to="/ce-standards" className="hover:text-primary transition-colors whitespace-nowrap py-1">
            CE Standards
          </Link>
          <Link to="/shipping-policy" className="hover:text-primary transition-colors whitespace-nowrap py-1">
            Shipping Policy
          </Link>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors whitespace-nowrap py-1">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors whitespace-nowrap py-1">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
