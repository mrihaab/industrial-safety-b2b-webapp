import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/formatters';
import { ProductService, ProductDetailDto } from '@/services/productService';

const getImageUrl = (url?: string) => {
  if (!url) return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

const FALLBACK_PRODUCT: ProductDetailDto = {
  id: 1,
  slug: 'gsh-elite-industrial-gloves',
  sku: 'GSH-WG-001',
  title: 'GSH Elite Industrial Working Gloves',
  seriesName: 'HEAVY DUTY SERIES',
  price: 45.00,
  moq: 50,
  stockStatus: 'IN STOCK',
  statusTag: 'Safety-System-Active',
  description: 'Tier-1 cut-resistant industrial gloves engineered with Kevlar weave and Nitri-Flex impact armor. Built for energy sector, heavy construction, and metal fabrication workers.',
  ratingScore: 4.9,
  reviewCount: 128,
  primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  ],
  gallery: [
    { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', is_primary: true, is_video: false },
    { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', is_primary: false, is_video: false },
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', is_primary: false, is_video: false },
  ],
  specs: [
    { key: 'Cut Level', value: 'ANSI Cut Level 5 / EN 388 4X43E' },
    { key: 'Material Composition', value: 'Kevlar® Weave & Synthetic Leather' },
    { key: 'Thermal Resistance', value: 'Up to 250°C (Contact Heat)' },
    { key: 'Coating Type', value: 'Nitri-Flex Micro-Foam Palm' },
  ],
  features: [
    { title: 'Impact Shielding', description: 'Nitri-Flex TPR armor on knuckles protects against crushing energy.', icon: 'shield' },
    { title: 'Ergonomic Fit', description: '3D pre-curved pattern reduces hand fatigue during 12-hour shifts.', icon: 'back_hand' },
    { title: 'Oil & Wet Grip', description: 'Micro-foam coating repels industrial lubricants and fluids.', icon: 'water_drop' },
  ],
};

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetailDto>(FALLBACK_PRODUCT);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(50);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await ProductService.getProductBySlug(slug);
        if (response.success && response.data) {
          setProduct(response.data);
        }
      } catch (err: unknown) {
        console.warn('API detail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const breadcrumbItems = [
    { label: 'PPE & Safety Catalog', path: '/products' },
    { label: product.title },
  ];

  const handleAddToCart = () => {
    const validQty = Math.max(50, quantity);
    addToCart({
      productId: product.id,
      title: product.title,
      sku: product.sku,
      quantity: validQty,
      sizeRange: selectedSize,
      price: product.price,
      imageUrl: getImageUrl(product.primaryImage || (product.images && product.images[0])),
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader size="lg" fullScreen={false} />
      </div>
    );
  }

  // Combine gallery items from API (Photos + Video)
  const rawGallery: Array<{ url: string; is_primary?: boolean; is_video?: boolean }> =
    (product.gallery && product.gallery.length > 0)
      ? product.gallery
      : (product.images && product.images.length > 0)
        ? product.images.map((img, idx) => ({ url: img, is_primary: idx === 0, is_video: false }))
        : [{ url: product.primaryImage || '', is_primary: true, is_video: false }];

  const galleryItems = rawGallery.map((item: { url: string; is_primary?: boolean; is_video?: boolean }) => ({
    url: getImageUrl(item.url),
    isPrimary: Boolean(item.is_primary),
    isVideo: Boolean(item.is_video) || item.url.includes('.mp4') || item.url.includes('.webm'),
  }));

  const currentMedia = galleryItems[activeMediaIndex] || galleryItems[0];

  return (
    <div className="space-y-12">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container border border-primary-container text-primary px-6 py-3 rounded-sm shadow-2xl font-label-caps animate-bounce">
          ✓ Added {quantity} units ({selectedSize}) to Bulk RFQ Cart!
        </div>
      )}

      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Main Media Frame & Thumbnail List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 bg-[#0a1f33] border border-[#ff6b00]/30 rounded-xs overflow-hidden flex items-center justify-center p-4 shadow-2xl">
            <span className="absolute top-3 left-3 z-10 bg-[#ff6b00] text-black font-mono font-extrabold text-[10px] px-3 py-1 tracking-wider uppercase">
              {product.statusTag || 'SAFETY-SYSTEM-ACTIVE'}
            </span>

            {currentMedia.isVideo ? (
              <video
                src={currentMedia.url}
                controls
                autoPlay
                muted
                className="w-full h-full object-contain rounded-xs"
              />
            ) : (
              <img
                src={currentMedia.url}
                alt={product.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                }}
                className="object-cover h-full w-full rounded-xs transition-all duration-300"
              />
            )}
          </div>

          {/* Thumbnails list below main display (Photos + Video) */}
          {galleryItems.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {galleryItems.map((item: { url: string; isPrimary: boolean; isVideo: boolean }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative aspect-square bg-[#0a1f33] border rounded-xs overflow-hidden p-1 transition-all ${
                    activeMediaIndex === idx
                      ? 'border-[#ff6b00] ring-2 ring-[#ff6b00]/50'
                      : 'border-outline-variant hover:border-[#ff6b00]/50'
                  }`}
                >
                  {item.isVideo ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 text-[#ff6b00]">
                      <span className="material-symbols-outlined text-2xl font-bold">play_circle</span>
                      <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-white">VIDEO</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="object-cover h-full w-full rounded-xs"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Configuration & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="font-label-caps text-xs text-[#ff6b00] font-extrabold uppercase tracking-widest">
              {product.seriesName}
            </span>
            <h1 className="font-display-lg text-3xl font-extrabold text-[#d4e4fa] leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-on-surface-variant pt-1">
              <span className="font-mono text-xs text-[#ff6b00] font-bold">SKU: {product.sku}</span>
              <div className="flex items-center gap-1 text-[#FFD700]">
                <span>★</span>
                <span className="font-bold text-on-surface">{product.ratingScore}</span>
                <span className="text-on-surface-variant text-xs">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between py-4 border-y border-outline-variant/60">
            <div>
              <span className="font-body-sm text-xs text-on-surface-variant block">Wholesale Price</span>
              <span className="font-mono text-3xl font-extrabold text-[#ff6b00]">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-on-surface-variant ml-1">/ unit</span>
            </div>
            <Badge variant="success">{product.stockStatus || 'IN STOCK'}</Badge>
          </div>

          <p className="font-body-lg text-on-surface-variant/90 leading-relaxed text-sm">
            {product.description}
          </p>

          <div className="bg-[#051424] border border-[#ff6b00]/30 p-6 rounded-xs space-y-6 shadow-xl">
            <h3 className="font-label-caps text-label-caps text-[#ff6b00] tracking-widest uppercase font-extrabold">
              Bulk Order Configuration
            </h3>

            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                Select Size Range:
              </label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-10 font-label-caps text-xs rounded-none border transition-all ${
                      selectedSize === size
                        ? 'bg-[#ff6b00] text-black border-[#ff6b00] font-extrabold orange-glow'
                        : 'bg-surface-container-high border-outline-variant text-on-surface hover:border-[#ff6b00]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                  Order Quantity:
                </label>
                <span className="font-label-caps text-xs text-[#ff6b00] font-semibold">
                  MOQ: {product.moq} Units
                </span>
              </div>
              <Input
                type="number"
                min={50}
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 50)}
                error={quantity < 50 ? 'Minimum Order Quantity (MOQ) is 50 units.' : undefined}
              />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/60">
              <span className="font-body-sm text-on-surface-variant">Estimated Subtotal:</span>
              <span className="font-mono text-2xl font-extrabold text-[#ff6b00]">
                {formatPrice(product.price * Math.max(50, quantity))}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-black font-mono font-extrabold text-xs py-3.5 px-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest transition-all orange-glow"
              >
                <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                ADD TO BULK QUOTE CART
              </button>

              <a
                href={`https://wa.me/97145550192?text=${encodeURIComponent(`Inquiry for ${product.title} (SKU: ${product.sku}), Quantity: ${quantity}`)}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full"
              >
                <Button variant="outline" size="md" className="w-full font-mono text-xs">
                  Instant WhatsApp Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {product.specs && product.specs.length > 0 && (
        <section className="bg-[#051424] border border-[#ff6b00]/30 p-8 rounded-xs space-y-6">
          <h3 className="font-label-caps text-label-caps text-[#ff6b00] tracking-widest uppercase font-extrabold">
            Technical Specifications Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-surface-container-high border border-outline-variant rounded-xs">
                <span className="font-label-caps text-xs text-on-surface-variant uppercase">{spec.key}</span>
                <span className="font-body-lg text-sm text-on-surface font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.features && product.features.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-label-caps text-label-caps text-[#ff6b00] tracking-widest uppercase font-bold">
            Engineering Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feat, idx) => (
              <div key={idx} className="bg-[#051424] border border-[#ff6b00]/30 p-6 rounded-xs space-y-3">
                <span className="material-symbols-outlined text-[#ff6b00] text-3xl">{feat.icon || 'shield'}</span>
                <h4 className="font-title-md text-lg text-on-surface font-bold">{feat.title}</h4>
                <p className="font-body-sm text-on-surface-variant">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
