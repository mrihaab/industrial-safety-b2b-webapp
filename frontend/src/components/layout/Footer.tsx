import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant pt-16 pb-8 text-on-surface-variant font-body-sm">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <Logo />
          <p className="text-body-sm text-on-surface-variant/80 max-w-sm">
            Providing Tier-1 industrial protective equipment and global safety logistics for enterprise clients across six continents. ISO-certified reliability in every fiber.
          </p>
          <div className="flex items-center gap-4 text-on-surface-variant pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">movie</span>
            </a>
          </div>
        </div>

        {/* Column 2: Product Lines */}
        <div>
          <h4 className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4">
            Product Lines
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/products?category=working-gloves" className="hover:text-primary transition-colors">Working Gloves</Link></li>
            <li><Link to="/products?category=assembly-gloves" className="hover:text-primary transition-colors">Assembly Gloves</Link></li>
            <li><Link to="/products?category=welding-gloves" className="hover:text-primary transition-colors">Welding Gloves</Link></li>
            <li><Link to="/products?category=sports-gloves" className="hover:text-primary transition-colors">Sports & Athletic Gloves</Link></li>
            <li><Link to="/products?category=workwear-safety-wear" className="hover:text-primary transition-colors">Workwear & Safety Suits</Link></li>
          </ul>
        </div>

        {/* Column 3: Corporate Links */}
        <div>
          <h4 className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4">
            Company
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/rfq" className="hover:text-primary transition-colors">Global Logistics RFQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support Desk</Link></li>
            <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Column 4: Global HQ */}
        <div className="space-y-3">
          <h4 className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4">
            Global Headquarters
          </h4>
          <p className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span>Pakistan & Dubai Logistics Hubs</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">call</span>
            <a href="tel:+97145550192" className="hover:text-primary transition-colors">+971 4 555 0192</a>
          </p>
          <p className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">mail</span>
            <a href="mailto:bulk@ghulamsafety.com" className="hover:text-primary transition-colors">bulk@ghulamsafety.com</a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto px-gutter pt-8 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant/60">
        <p>© {new Date().getFullYear()} Ghulam Safety Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Supply</a>
          <a href="#" className="hover:text-primary transition-colors">CE Certifications</a>
        </div>
      </div>
    </footer>
  );
};
