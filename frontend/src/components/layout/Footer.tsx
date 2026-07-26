import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/60 py-6 text-on-surface-variant font-body-sm">
      <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left: Brand Name & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <Link to="/" className="font-headline-lg text-lg font-bold text-on-surface hover:text-primary transition-colors whitespace-nowrap">
            Ghulam Safety Hub
          </Link>
          <span className="text-on-surface-variant/70 font-mono text-[11px] whitespace-nowrap">
            © {new Date().getFullYear()} Ghulam Safety Hub. Industrial Precision Engineering.
          </span>
        </div>

        {/* Right: Horizontal Link Bar matching Screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-xs text-on-surface-variant font-body-sm">
          <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap">
            Certifications
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap">
            ISO Compliance
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors whitespace-nowrap">
            CE Standards
          </Link>
          <Link to="/shipping-policy" className="hover:text-primary transition-colors whitespace-nowrap">
            Shipping Policy
          </Link>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors whitespace-nowrap">
            Privacy
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors whitespace-nowrap">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
