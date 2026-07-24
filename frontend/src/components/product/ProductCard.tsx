import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatMoq } from '@/utils/formatters';

export interface ProductCardData {
  id: number;
  slug: string;
  sku: string;
  title: string;
  seriesName: string;
  price: number;
  moq: number;
  stockStatus: string;
  statusTag: string;
  ratingScore: number;
  reviewCount: number;
  primaryImage: string;
}

interface ProductCardProps {
  product: ProductCardData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-surface-container industrial-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 bg-surface-container-high overflow-hidden flex items-center justify-center p-4">
        <Badge variant="led" className="absolute top-3 left-3 z-10">
          {product.statusTag || 'Safety-System-Active'}
        </Badge>
        <span className="absolute bottom-3 right-3 z-10 font-label-caps text-xs bg-surface/80 border border-outline-variant px-2 py-1 rounded-xs text-on-surface-variant">
          {formatMoq(product.moq)}
        </span>
        <img
          src={product.primaryImage || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'}
          alt={product.title}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="font-label-caps text-xs text-primary font-semibold uppercase tracking-widest">
            {product.seriesName}
          </span>
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-title-md text-lg text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="text-[#FFD700]">★</span>
            <span className="font-semibold text-on-surface">{product.ratingScore}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price & Action CTAs */}
        <div className="pt-3 border-t border-outline-variant/50 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-body-sm text-xs text-on-surface-variant">Wholesale Price</span>
            <span className="font-label-caps text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/products/${product.slug}`}>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Details
              </Button>
            </Link>
            <Link to="/rfq">
              <Button variant="primary" size="sm" className="w-full text-xs">
                Add to Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
