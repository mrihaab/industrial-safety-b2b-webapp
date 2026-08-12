import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatters';

export interface ProductCardData {
  id: number;
  slug: string;
  sku: string;
  title: string;
  seriesName?: string;
  price: number;
  moq: number;
  stockStatus?: string;
  statusTag?: string;
  ratingScore?: number;
  reviewCount?: number;
  primaryImage?: string;
  description?: string;
  isFeatured?: boolean;
  is_featured?: boolean;
  certifications?: string[];
}

interface ProductCardProps {
  product: ProductCardData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const DEFAULT_SAFETY_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8GK08yQJcOjxafEsZTZrH9RUknWBXayS4Hb4lJv06QTs5HAR_BfsWNs1pxSmUyUXouN3hv3UXoyTcSJ1FCfaKqr6YOgLa9iaEWeiP8m77pQ_ea3-QFAQ6z66GnhmViZVE6K7Wfk8yFOGBqj5YSh7yRRB1Wgyj1dQbcDllZi2PMeLJ4tHSiXl7YXabCKwvsU8qN2WXFXYUGqc6QgvBkPyTnooiOCCEryPxJ9yd3Nw1D6zy9apNtAf9XMrWolUS0IzwaGaSkK-cRD4';

  const getImageUrl = (url?: string) => {
    if (!url) return DEFAULT_SAFETY_IMAGE;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
    return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const getCleanSlug = (slug?: string, title?: string): string => {
    const raw = (slug || title || 'gsh-elite-industrial-gloves')
      .toLowerCase()
      .trim()
      .replace(/^https?:\/*/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return raw || 'gsh-elite-industrial-gloves';
  };

  const cleanSlug = getCleanSlug(product.slug, product.title);
  const imageUrl = getImageUrl(product.primaryImage);
  const statusBadge = product.statusTag || 'Safety-System-Active';
  const displayPrice = formatPrice(product.price);
  const descText = product.description || 'Reinforced Kevlar stitching with anti-vibration padding for high-impact industrial operations.';

  return (
    <div className="group bg-surface-container border border-outline-variant relative overflow-hidden transition-all duration-300 hover:border-primary flex flex-col justify-between h-full rounded-xs">
      {/* LED Active Status Tag Top Right */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <span className="bg-primary-container text-on-primary-container font-label-caps text-[10px] px-2 py-1 uppercase font-bold led-active tracking-wider rounded-xs shadow-md">
          {statusBadge}
        </span>
      </div>

      {/* Top Image Container */}
      <div className="aspect-square bg-surface-container-highest overflow-hidden relative">
        <Link to={`/products/${cleanSlug}`} className="w-full h-full block">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_SAFETY_IMAGE;
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Card Content Body */}
      <div className="p-stack-md flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <Link to={`/products/${cleanSlug}`} className="flex-1 min-w-0">
              <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-2 min-h-[2.5rem]">
                {product.title}
              </h3>
            </Link>
            <span className="font-label-caps text-label-caps text-primary font-bold whitespace-nowrap pt-0.5">
              {displayPrice}
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 line-clamp-2 min-h-[2.25rem]">
            {descText}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Strict Dynamic Certifications (Rendered ONLY if selected by Admin) */}
          <div className="min-h-[26px] flex flex-wrap items-center gap-1.5">
            {product.certifications && product.certifications.length > 0 ? (
              product.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 border text-[10px] font-mono uppercase font-bold rounded-xs ${
                    idx === 0
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                      : 'border-outline-variant text-on-surface-variant'
                  }`}
                >
                  {cert}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-mono text-on-surface-variant/40 uppercase">
                ISO 9001 • CE Standard
              </span>
            )}
          </div>

          {/* Add to Order Button */}
          <Link to={`/products/${cleanSlug}`} className="block w-full">
            <button className="w-full bg-primary-container text-on-primary-container py-3.5 px-4 font-label-caps text-label-caps font-bold orange-glow uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:opacity-80 rounded-xs min-h-[44px]">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              Add to Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
