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
  const getImageUrl = (url?: string) => {
    if (!url) return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxW-JBzpn977rn1IhHg-x0oBELAiNoAQKlnPpgVkxlgienmXVezWj3pQkOWmkBKY2auB7H1l0QFCDRYORkbrB6OnEuUIfEQeb4lpbuQBB7ZqDZVixsCw9GHM3T7GP214LnQt7fW-rkR3R5Ewa8_Tp3OQMHBzJs3LBkasF2q5YKeNzyk5yXbJxPvrrHeRjkiCqwJSXbpcods-hxbvleRjHNMAEJe3-yKbXITx0cDCnOEpU17RBA2odRQ5_xKw_aykL4Lol2mN4CTQ';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
    return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const imageUrl = getImageUrl(product.primaryImage);
  const statusBadge = product.statusTag || 'Safety-System-Active';
  const displayPrice = formatPrice(product.price);
  const descText = product.description || 'Reinforced Kevlar stitching with anti-vibration padding for high-impact industrial operations.';

  return (
    <div className="group bg-surface-container border border-outline-variant relative overflow-hidden transition-all hover:border-primary flex flex-col justify-between">
      {/* LED Active Status Tag Top Right */}
      <div className="absolute top-2 right-2 z-10">
        <span className="bg-primary-container text-on-primary-container font-label-caps text-[10px] px-2 py-1 uppercase font-bold led-active">
          {statusBadge}
        </span>
      </div>

      {/* Top Image Container */}
      <div className="aspect-square bg-surface-container-highest overflow-hidden relative">
        <Link to={`/products/${product.slug}`} className="w-full h-full block">
          <img
            src={imageUrl}
            alt={product.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxW-JBzpn977rn1IhHg-x0oBELAiNoAQKlnPpgVkxlgienmXVezWj3pQkOWmkBKY2auB7H1l0QFCDRYORkbrB6OnEuUIfEQeb4lpbuQBB7ZqDZVixsCw9GHM3T7GP214LnQt7fW-rkR3R5Ewa8_Tp3OQMHBzJs3LBkasF2q5YKeNzyk5yXbJxPvrrHeRjkiCqwJSXbpcods-hxbvleRjHNMAEJe3-yKbXITx0cDCnOEpU17RBA2odRQ5_xKw_aykL4Lol2mN4CTQ';
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
      </div>

      {/* Card Content Body */}
      <div className="p-stack-md flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <Link to={`/products/${product.slug}`}>
              <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <span className="font-label-caps text-label-caps text-primary font-bold whitespace-nowrap">
              {displayPrice}
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">
            {descText}
          </p>
        </div>

        <div className="space-y-3">
          {/* Dynamic Certification Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-stack-lg min-h-[24px]">
            {(product.certifications && product.certifications.length > 0
              ? product.certifications
              : ['CE Marked', 'ISO 9001:2015']
            ).map((cert, idx) => (
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
            ))}
          </div>

          {/* Add to Order Button */}
          <Link to={`/products/${product.slug}`} className="block w-full">
            <button className="w-full bg-primary-container text-on-primary-container py-3 font-label-caps text-label-caps font-bold orange-glow uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:opacity-80">
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
