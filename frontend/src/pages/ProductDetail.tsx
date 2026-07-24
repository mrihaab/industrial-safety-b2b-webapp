import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Loader } from '@/components/ui/Loader';
import { useCart } from '@/contexts/CartContext';
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
  title: 'GSH Elite Industrial Gloves',
  seriesName: 'HEAVY DUTY SERIES',
  price: 45.00,
  moq: 50,
  stockStatus: 'IN STOCK',
  statusTag: 'NEW ARRIVAL',
  description: 'Designed for high-precision industrial environments. The GSH Elite features reinforced synthetic fiber construction with Grade-A abrasion resistance and impact-shielding knuckles. Engineered for the most demanding logistics and manufacturing workflows.',
  ratingScore: 5.0,
  reviewCount: 124,
  size_options: 'Assorted S/M/L/XL',
  sizeOptions: 'Assorted S/M/L/XL',
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
    { key: 'IMPACT PROTECTION', value: 'Level 3 (EN 388)' },
    { key: 'ABRASION RATING', value: '4X (High Intensity)' },
    { key: 'THERMAL RESISTANCE', value: 'Up to 250°C' },
    { key: 'MATERIAL COMPOSITION', value: 'Nitri-Flex / Kevlar' },
  ],
  features: [
    { title: 'Anatomical Fit', description: 'Contoured design reduces hand fatigue during long shifts. Curved finger construction mimics natural rest position for improved dexterity in high-precision tasks.', icon: 'build' },
    { title: 'Fluid Resistance', description: 'Dual-layer coating provides superior grip even when saturated with hydraulic fluids or lubricants. ISO certified for chemical splash protection.', icon: 'water_drop' },
    { title: 'Reinforced Core', description: 'Proprietary HPPE blend provides ANSI level A4 cut protection without sacrificing tactile sensitivity. 13-gauge seamless knit liner for comfort.', icon: 'shield' },
  ],
};

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetailDto>(FALLBACK_PRODUCT);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [selectedSizeRange, setSelectedSizeRange] = useState('Assorted S/M/L/XL');
  const [quantity, setQuantity] = useState(100);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await ProductService.getProductBySlug(slug);
        if (response.success && response.data) {
          setProduct(response.data);
          const defaultSize = response.data.size_options || response.data.sizeOptions || 'Assorted S/M/L/XL';
          setSelectedSizeRange(defaultSize);
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
    { label: 'Products', path: '/products' },
    { label: 'PPE Gear', path: '/products' },
    { label: product.title },
  ];

  // Combine gallery items from API
  const rawGallery: Array<{ url: string; is_primary?: boolean; size_code?: string }> =
    (product.gallery && product.gallery.length > 0)
      ? product.gallery
      : (product.images && product.images.length > 0)
        ? product.images.map((img, idx) => ({ url: img, is_primary: idx === 0 }))
        : [{ url: product.primaryImage || '', is_primary: true }];

  const galleryItems = rawGallery.map((item) => ({
    url: getImageUrl(item.url),
    isPrimary: Boolean(item.is_primary),
    sizeCode: item.size_code,
  }));

  // Handle size selection change & auto-switch main image if size-specific photo exists
  const handleSelectSize = (size: string) => {
    setSelectedSizeRange(size);

    // Extract size code letter (e.g. "Large Only" -> "L", "Medium Only" -> "M", "S" -> "S")
    let targetCode = size.toUpperCase();
    if (size.includes('Large')) targetCode = 'L';
    if (size.includes('Medium')) targetCode = 'M';
    if (size.includes('Small')) targetCode = 'S';
    if (size.includes('XL')) targetCode = 'XL';
    if (size.includes('XXL')) targetCode = 'XXL';

    const matchingIdx = galleryItems.findIndex(item => item.sizeCode && item.sizeCode.toUpperCase() === targetCode);
    if (matchingIdx !== -1) {
      setActiveMediaIndex(matchingIdx);
    }
  };

  const handleAddToCart = () => {
    const validQty = Math.max(50, quantity);
    addToCart({
      productId: product.id,
      title: product.title,
      sku: product.sku,
      quantity: validQty,
      sizeRange: selectedSizeRange,
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

  const currentMedia = galleryItems[activeMediaIndex] || galleryItems[0];
  const sizeOptionsList = (product.size_options || product.sizeOptions || 'Assorted S/M/L/XL')
    .split(',')
    .map(s => s.trim());

  return (
    <div className="space-y-16">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#051424] border border-[#ff6b00] text-[#ff6b00] px-6 py-3 rounded-none shadow-2xl font-mono text-xs uppercase tracking-widest animate-bounce">
          ✓ Added {quantity} pairs ({selectedSizeRange}) to Bulk RFQ Cart!
        </div>
      )}

      <Breadcrumb items={breadcrumbItems} />

      {/* Main Top Grid (2 Columns matching product-detail.html mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Media Container & Gallery Thumbnails */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square bg-[#051424] border border-outline-variant/60 rounded-none overflow-hidden flex items-center justify-center p-2 shadow-2xl">
            <span className="absolute top-3 right-3 z-10 bg-[#ff6b00] text-black font-mono font-extrabold text-[10px] px-3 py-1 tracking-wider uppercase">
              {product.statusTag || 'NEW ARRIVAL'}
            </span>

            <img
              src={currentMedia.url}
              alt={product.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
              }}
              className="object-cover h-full w-full"
            />
          </div>

          {/* 4 Thumbnails list matching mockup */}
          {galleryItems.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {galleryItems.slice(0, 4).map((item, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative aspect-square bg-[#051424] border rounded-none overflow-hidden p-1 transition-all ${
                    activeMediaIndex === idx
                      ? 'border-[#ff6b00] ring-1 ring-[#ff6b00]'
                      : 'border-outline-variant/60 hover:border-[#ff6b00]/50'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="object-cover h-full w-full"
                  />
                  {item.sizeCode && (
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[#ff6b00] font-mono text-[9px] px-1 font-bold rounded-xs">
                      {item.sizeCode}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Specs Matrix & Bulk Orders Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest block font-semibold">
              {product.seriesName || 'HEAVY DUTY SERIES'}
            </span>
            <h1 className="font-display-lg text-4xl font-extrabold text-on-surface leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1 text-[#FFD700]">
                <span>☆☆☆☆☆</span>
                <span className="text-on-surface-variant font-mono">({product.reviewCount || 124} Global Reviews)</span>
              </div>
              <span className="text-outline-variant">|</span>
              <span className="text-emerald-400 font-mono font-bold tracking-wider uppercase">
                {product.stockStatus || 'IN STOCK'}
              </span>
            </div>
          </div>

          <p className="font-body-lg text-sm text-on-surface-variant/90 leading-relaxed">
            {product.description}
          </p>

          {/* 2x2 Tech Specs Grid matching product-detail.html mockup */}
          <div className="grid grid-cols-2 gap-4 bg-[#0d1c2f] border border-outline-variant/60 p-4">
            <div>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">IMPACT PROTECTION</span>
              <span className="font-body-lg text-sm text-on-surface font-bold">Level 3 (EN 388)</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">ABRASION RATING</span>
              <span className="font-body-lg text-sm text-on-surface font-bold">4X (High Intensity)</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">THERMAL RESISTANCE</span>
              <span className="font-body-lg text-sm text-on-surface font-bold">Up to 250°C</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">MATERIAL COMPOSITION</span>
              <span className="font-body-lg text-sm text-on-surface font-bold">Nitri-Flex / Kevlar</span>
            </div>
          </div>

          {/* 3 Rectangular Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="border border-outline-variant/80 bg-[#0d1c2f] text-on-surface-variant font-mono text-[11px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1.5">
              🛡️ CE EN388:2016
            </span>
            <span className="border border-outline-variant/80 bg-[#0d1c2f] text-on-surface-variant font-mono text-[11px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1.5">
              🏆 ISO 9001:2015
            </span>
            <span className="border border-outline-variant/80 bg-[#0d1c2f] text-on-surface-variant font-mono text-[11px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1.5">
              🛡️ ANSI CUT A4
            </span>
          </div>

          {/* Bulk Distributor Orders Box matching product-detail.html mockup */}
          <div className="bg-[#0d1c2f] border border-outline-variant/80 p-6 rounded-none space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6b00]">local_shipping</span>
                <h3 className="font-headline-lg text-base font-extrabold text-on-surface">Bulk Distributor Orders</h3>
              </div>
              <span className="font-mono text-xs text-[#ff6b00] font-semibold">Volume Discounts Available</span>
            </div>

            <div className="text-xs font-mono text-on-surface-variant">
              MOQ: {product.moq || 50} Units
            </div>

            {/* Quantity and Size Range Side-by-Side Inputs matching Screenshot 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                  QUANTITY (PAIRS)
                </label>
                <input
                  type="number"
                  min={50}
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value) || 50)}
                  className="w-full bg-[#051424] border border-outline-variant rounded-none px-3 py-2 text-sm text-on-surface font-mono focus:border-[#ff6b00] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                  SIZE RANGE
                </label>
                <select
                  value={selectedSizeRange}
                  onChange={e => handleSelectSize(e.target.value)}
                  className="w-full bg-[#051424] border border-outline-variant rounded-none px-3 py-2 text-sm text-on-surface font-mono focus:border-[#ff6b00] focus:outline-none"
                >
                  {sizeOptionsList.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                  <option value="Large Only">Large Only</option>
                  <option value="Medium Only">Medium Only</option>
                  <option value="Small Only">Small Only</option>
                  <option value="XL Only">XL Only</option>
                </select>
              </div>
            </div>

            {/* 2 Buttons side-by-side matching product-detail.html mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-black font-mono font-extrabold text-xs py-3.5 px-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest transition-all orange-glow"
              >
                REQUEST WHOLESALE QUOTE
              </button>

              <button
                onClick={() => alert(`Technical Specs PDF for ${product.title} (SKU: ${product.sku}) generated.`)}
                className="w-full border border-outline-variant bg-[#051424] hover:bg-surface-variant text-on-surface font-mono text-xs py-3.5 px-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Technical Specs PDF
              </button>
            </div>

            <p className="font-mono text-[10px] text-on-surface-variant/70 text-center pt-1">
              Standard international shipping: 5-7 business days via GSH Logistics.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Specifications Section matching product-detail.html mockup */}
      <section className="space-y-6 pt-6 border-t border-outline-variant/40">
        <h2 className="font-headline-lg text-2xl font-extrabold text-on-surface flex items-center gap-3">
          <span className="text-[#ff6b00]">—</span> Engineering Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.features && product.features.length > 0 ? (
            product.features.map((feat, idx) => (
              <div key={idx} className="bg-[#0d1c2f] border border-outline-variant/60 p-6 rounded-none space-y-3">
                <span className="material-symbols-outlined text-[#ff6b00] text-3xl">{feat.icon || 'build'}</span>
                <h3 className="font-title-md text-lg text-on-surface font-bold">{feat.title}</h3>
                <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed">{feat.description}</p>
              </div>
            ))
          ) : (
            <>
              <div className="bg-[#0d1c2f] border border-outline-variant/60 p-6 rounded-none space-y-3">
                <span className="material-symbols-outlined text-[#ff6b00] text-3xl">build</span>
                <h3 className="font-title-md text-lg text-on-surface font-bold">Anatomical Fit</h3>
                <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed">
                  Contoured design reduces hand fatigue during long shifts. Curved finger construction mimics natural rest position for improved dexterity in high-precision tasks.
                </p>
              </div>
              <div className="bg-[#0d1c2f] border border-outline-variant/60 p-6 rounded-none space-y-3">
                <span className="material-symbols-outlined text-[#ff6b00] text-3xl">water_drop</span>
                <h3 className="font-title-md text-lg text-on-surface font-bold">Fluid Resistance</h3>
                <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed">
                  Dual-layer coating provides superior grip even when saturated with hydraulic fluids or lubricants. ISO certified for chemical splash protection.
                </p>
              </div>
              <div className="bg-[#0d1c2f] border border-outline-variant/60 p-6 rounded-none space-y-3">
                <span className="material-symbols-outlined text-[#ff6b00] text-3xl">shield</span>
                <h3 className="font-title-md text-lg text-on-surface font-bold">Reinforced Core</h3>
                <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed">
                  Proprietary HPPE blend provides ANSI level A4 cut protection without sacrificing tactile sensitivity. 13-gauge seamless knit liner for comfort.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Compliance & Safety Standards Section matching product-detail.html mockup */}
      <section className="space-y-6 pt-6 border-t border-outline-variant/40 text-center">
        <h2 className="font-headline-lg text-2xl font-extrabold text-on-surface">
          Compliance & Safety Standards
        </h2>
        <p className="font-body-sm text-xs text-on-surface-variant max-w-xl mx-auto">
          Ghulam Safety Hub ensures all Elite series products undergo rigorous stress testing in third-party laboratories to meet and exceed global safety mandates.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <div className="border border-outline-variant/80 bg-[#0d1c2f] px-6 py-4 rounded-none space-y-1">
            <span className="font-mono text-xl font-bold text-on-surface block">CE</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block">EUROPEAN COMPLIANT</span>
          </div>
          <div className="border border-outline-variant/80 bg-[#0d1c2f] px-6 py-4 rounded-none space-y-1">
            <span className="font-mono text-xl font-bold text-on-surface block">ISO</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block">QUALITY MGMT</span>
          </div>
          <div className="border border-outline-variant/80 bg-[#0d1c2f] px-6 py-4 rounded-none space-y-1">
            <span className="font-mono text-xl font-bold text-on-surface block">ANSI</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block">US SAFETY STD</span>
          </div>
          <div className="border border-outline-variant/80 bg-[#0d1c2f] px-6 py-4 rounded-none space-y-1">
            <span className="font-mono text-xl font-bold text-on-surface block">UKCA</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block">UK CONFORMITY</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
