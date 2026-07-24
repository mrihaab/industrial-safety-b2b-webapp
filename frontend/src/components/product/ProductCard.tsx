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
  certifications?: string[];
}

interface ProductCardProps {
  product: ProductCardData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getImageUrl = (url?: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
    return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const imageUrl = getImageUrl(product.primaryImage);
  const statusBadge = product.statusTag || 'SAFETY-SYSTEM-ACTIVE';
  const displayPrice = formatPrice(product.price);
  const descText = product.description || 'Reinforced Kevlar stitching with anti-vibration padding for high-impact protection.';

  return (
    <div className="group bg-[#051424] border border-[#ff6b00]/30 hover:border-[#ff6b00] p-3 rounded-xs shadow-2xl flex flex-col justify-between space-y-4 transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 bg-[#0a1f33] overflow-hidden flex items-center justify-center rounded-xs border border-outline-variant/30">
        {/* Top Right Orange Badge */}
        <span className="absolute top-2 right-2 z-10 bg-[#ff6b00] text-black font-mono font-extrabold text-[10px] px-2.5 py-1 tracking-wider uppercase rounded-none shadow-md">
          {statusBadge}
        </span>

        {/* Product Image Link */}
        <Link to={`/products/${product.slug}`} className="w-full h-full block">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
            }}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Content Body */}
      <div className="space-y-3 px-1 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Title & Price Line */}
          <div className="flex items-start justify-between gap-2">
            <Link to={`/products/${product.slug}`} className="flex-1">
              <h3 className="font-headline-lg text-lg text-[#d4e4fa] font-extrabold group-hover:text-[#ff6b00] transition-colors leading-tight line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <span className="font-mono text-base font-extrabold text-[#ff6b00] whitespace-nowrap">
              {displayPrice}
            </span>
          </div>

          {/* Description Line */}
          <p className="font-body-sm text-xs text-on-surface-variant/90 line-clamp-2 leading-relaxed">
            {descText}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Rectangular Certification Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="border border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-emerald-950/20">
              CE EN 388
            </span>
            <span className="border border-[#ff6b00]/60 text-[#ff6b00] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-orange-950/20">
              LEVEL 5 CUT
            </span>
          </div>

          {/* Full Width Orange Button - Navigates directly to Product Detail Page */}
          <Link to={`/products/${product.slug}`} className="block w-full">
            <button className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-black font-mono font-extrabold text-xs py-2.5 px-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest transition-all orange-glow">
              <span className="material-symbols-outlined text-sm font-bold">add_shopping_cart</span>
              ADD TO ORDER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
