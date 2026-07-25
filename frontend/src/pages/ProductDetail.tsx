import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  seriesName: 'Heavy Duty Series',
  price: 45.00,
  moq: 50,
  stockStatus: 'IN STOCK',
  statusTag: 'NEW ARRIVAL',
  description: 'Designed for high-precision industrial environments. The GSH Elite features reinforced synthetic fiber construction with Grade-A abrasion resistance and impact-shielding knuckles. Engineered for the most demanding logistics and manufacturing workflows.',
  ratingScore: 4.80,
  reviewCount: 124,
  size_options: 'Small (S), Medium (M), Large (L), Extra Large (XL)',
  sizeOptions: 'Small (S), Medium (M), Large (L), Extra Large (XL)',
  primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  ],
  gallery: [
    { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', is_primary: true, size_code: 'S' },
    { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', is_primary: false, size_code: 'M' },
    { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', is_primary: false, size_code: 'L' },
  ],
  specs: [
    { key: 'Impact Protection', value: 'Level 3 (EN 388)' },
    { key: 'Abrasion Rating', value: '4X (High Intensity)' },
    { key: 'Thermal Resistance', value: 'Up to 250°C' },
    { key: 'Material Composition', value: 'Nitri-Flex / Kevlar' },
  ],
  features: [
    { title: 'Anatomical Fit', description: 'Contoured design reduces hand fatigue during long shifts. Curved finger construction mimics natural rest position for improved dexterity in high-precision tasks.', icon: 'construction' },
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
  const [selectedSizeRange, setSelectedSizeRange] = useState('Small (S)');
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
          const rawOptions = response.data.size_options || response.data.sizeOptions || 'Small (S), Medium (M), Large (L)';
          const firstOpt = rawOptions.split(',')[0].trim();
          setSelectedSizeRange(firstOpt);
        }
      } catch (err: unknown) {
        console.warn('API detail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

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

    let targetCode = size.toUpperCase();
    if (size.includes('(S)') || size.includes('Small')) targetCode = 'S';
    if (size.includes('(M)') || size.includes('Medium')) targetCode = 'M';
    if (size.includes('(L)') || size.includes('Large')) targetCode = 'L';
    if (size.includes('(XL)') || size.includes('Extra Large') || size.includes('XL Only')) targetCode = 'XL';
    if (size.includes('(XXL)') || size.includes('Double XL') || size.includes('XXL Only')) targetCode = 'XXL';

    const matchingIdx = galleryItems.findIndex(item => item.sizeCode && item.sizeCode.toUpperCase() === targetCode);
    if (matchingIdx !== -1) {
      setActiveMediaIndex(matchingIdx);
    }
  };

  const handleAddToCart = () => {
    const validQty = Math.max(product.moq || 50, quantity);
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
  const sizeOptionsList = (product.size_options || product.sizeOptions || 'Small (S), Medium (M), Large (L), Extra Large (XL)')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const displaySpecs = product.specs && product.specs.length > 0 ? product.specs : [
    { key: 'Impact Protection', value: 'Level 3 (EN 388)' },
    { key: 'Abrasion Rating', value: '4X (High Intensity)' },
    { key: 'Thermal Resistance', value: 'Up to 250°C' },
    { key: 'Material Composition', value: 'Nitri-Flex / Kevlar' },
  ];

  const displayFeatures = product.features && product.features.length > 0 ? product.features : [
    { title: 'Anatomical Fit', description: 'Contoured design reduces hand fatigue during long shifts. Curved finger construction mimics natural rest position for improved dexterity in high-precision tasks.', icon: 'construction' },
    { title: 'Fluid Resistance', description: 'Dual-layer coating provides superior grip even when saturated with hydraulic fluids or lubricants. ISO certified for chemical splash protection.', icon: 'water_drop' },
    { title: 'Reinforced Core', description: 'Proprietary HPPE blend provides ANSI level A4 cut protection without sacrificing tactile sensitivity. 13-gauge seamless knit liner for comfort.', icon: 'shield' },
  ];

  return (
    <div className="w-full">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-primary text-primary px-6 py-3 rounded-lg shadow-2xl font-label-caps text-xs uppercase tracking-widest animate-bounce">
          ✓ Added {quantity} pairs ({selectedSizeRange}) to Bulk RFQ Cart!
        </div>
      )}

      {/* Breadcrumbs matching HTML Mockup */}
      <nav className="flex items-center gap-2 mb-stack-lg text-on-surface-variant font-body-sm">
        <Link to="/products" className="hover:text-primary">Products</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/products" className="hover:text-primary">PPE Gear</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface">{product.title}</span>
      </nav>

      {/* Top Main Section matching HTML Mockup (Flex Layout lg:flex-row) */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Product Image Gallery */}
        <div className="w-full lg:w-1/2 space-y-gutter">
          <div className="aspect-square bg-surface-container industrial-border overflow-hidden group cursor-zoom-in relative">
            <img
              src={currentMedia.url}
              alt={product.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 font-label-caps text-label-caps rounded">
              {product.statusTag || 'NEW ARRIVAL'}
            </div>
          </div>

          {/* 4 Thumbnails Grid */}
          {galleryItems.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {galleryItems.slice(0, 4).map((item, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`aspect-square bg-surface-container-high industrial-border cursor-pointer hover:border-primary transition-all relative ${
                    activeMediaIndex === idx ? 'border-primary border-2' : ''
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  {item.sizeCode && (
                    <span className="absolute bottom-1 right-1 bg-surface-container-lowest/90 text-primary font-mono text-[9px] px-1 font-bold rounded-xs border border-outline-variant">
                      {item.sizeCode}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Technical Details & Ordering */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-stack-md">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              {product.seriesName || 'Heavy Duty Series'}
            </span>
            <h1 className="font-display-lg text-display-lg mt-2 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <span className="text-body-sm text-on-surface-variant">
                ({product.reviewCount || 124} Global Reviews)
              </span>
              <div className="h-4 w-[1px] bg-outline-variant"></div>
              <span className="font-label-caps text-label-caps text-[#4ade80]">
                {product.stockStatus || 'IN STOCK'}
              </span>
            </div>
          </div>

          <p className="text-on-surface-variant font-body-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Technical Specifications Grid matching HTML Mockup */}
          <div className="grid grid-cols-2 gap-px bg-outline-variant industrial-border mb-8 overflow-hidden">
            {displaySpecs.map((s, idx) => (
              <div key={idx} className="bg-surface-container p-4">
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase block mb-1">
                  {s.key}
                </span>
                <span className="font-title-md text-title-md">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Certification Badges matching HTML Mockup */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-high industrial-border rounded">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="font-label-caps text-label-caps">CE EN388:2016</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-high industrial-border rounded">
              <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
              <span className="font-label-caps text-label-caps">ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-high industrial-border rounded">
              <span className="material-symbols-outlined text-primary text-[20px]">security</span>
              <span className="font-label-caps text-label-caps">ANSI CUT A4</span>
            </div>
          </div>

          {/* Bulk Ordering Section matching HTML Mockup */}
          <div className="bg-surface-container-highest p-6 rounded-lg industrial-border border-primary/20">
            <h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Bulk Distributor Orders
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
                <span>MOQ: {product.moq || 50} Units</span>
                <span className="text-primary font-bold">Volume Discounts Available</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">Quantity (Pairs)</label>
                  <input
                    type="number"
                    min={50}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value) || 50)}
                    className="w-full bg-surface industrial-border rounded px-4 py-3 focus:border-primary outline-none text-on-surface"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant mb-1 block">Size Range</label>
                  <select
                    value={selectedSizeRange}
                    onChange={e => handleSelectSize(e.target.value)}
                    className="w-full bg-surface industrial-border rounded px-4 py-3 focus:border-primary outline-none text-on-surface appearance-none cursor-pointer"
                  >
                    {sizeOptionsList.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-container text-on-primary-container font-bold py-4 rounded glow-button text-center uppercase tracking-wider"
              >
                Request Wholesale Quote
              </button>
              <button
                onClick={() => alert(`Technical Specs PDF for ${product.title} (SKU: ${product.sku}) generated.`)}
                className="px-8 py-4 border border-outline-variant hover:border-primary transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined">download</span>
                <span className="ml-2 font-label-caps">Technical Specs PDF</span>
              </button>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-4 text-center">Standard international shipping: 5-7 business days via GSH Logistics.</p>
          </div>
        </div>
      </div>

      {/* Engineering Specifications Section (Asymmetric Layout matching HTML Mockup) */}
      <section className="mt-24">
        <h2 className="font-headline-lg text-headline-lg mb-12 flex items-center gap-3">
          <span className="w-12 h-[2px] bg-primary"></span>
          Engineering Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayFeatures.map((f, idx) => (
            <div key={idx} className="p-8 bg-surface-container industrial-border hover:bg-surface-container-high transition-colors group">
              <span className="material-symbols-outlined text-[48px] text-primary mb-6 group-hover:scale-110 transition-transform inline-block">
                {f.icon || 'construction'}
              </span>
              <h4 className="font-title-md text-title-md mb-4">{f.title}</h4>
              <p className="text-on-surface-variant text-body-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Compliance matching HTML Mockup */}
      <section className="mt-24 py-16 border-y border-outline-variant">
        <div className="text-center mb-12">
          <h3 className="font-headline-lg text-headline-lg mb-4">Compliance & Safety Standards</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Ghulam Safety Hub ensures all Elite series products undergo rigorous stress testing in third-party laboratories to meet and exceed global safety mandates.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-12 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full industrial-border flex items-center justify-center font-bold text-lg">CE</div>
            <span className="font-label-caps text-[10px]">EUROPEAN COMPLIANT</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full industrial-border flex items-center justify-center font-bold text-lg">ISO</div>
            <span className="font-label-caps text-[10px]">QUALITY MGMT</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full industrial-border flex items-center justify-center font-bold text-lg">ANSI</div>
            <span className="font-label-caps text-[10px]">US SAFETY STD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full industrial-border flex items-center justify-center font-bold text-lg">UKCA</div>
            <span className="font-label-caps text-[10px]">UK CONFORMITY</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
