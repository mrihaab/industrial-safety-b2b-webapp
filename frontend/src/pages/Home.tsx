import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductService } from '@/services/productService';
import { ProductCardData } from '@/components/product/ProductCard';

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8GK08yQJcOjxafEsZTZrH9RUknWBXayS4Hb4lJv06QTs5HAR_BfsWNs1pxSmUyUXouN3hv3UXoyTcSJ1FCfaKqr6YOgLa9iaEWeiP8m77pQ_ea3-QFAQ6z66GnhmViZVE6K7Wfk8yFOGBqj5YSh7yRRB1Wgyj1dQbcDllZi2PMeLJ4tHSiXl7YXabCKwvsU8qN2WXFXYUGqc6QgvBkPyTnooiOCCEryPxJ9yd3Nw1D6zy9apNtAf9XMrWolUS0IzwaGaSkK-cRD4";
const FALLBACK_TITAN_X = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8GK08yQJcOjxafEsZTZrH9RUknWBXayS4Hb4lJv06QTs5HAR_BfsWNs1pxSmUyUXouN3hv3UXoyTcSJ1FCfaKqr6YOgLa9iaEWeiP8m77pQ_ea3-QFAQ6z66GnhmViZVE6K7Wfk8yFOGBqj5YSh7yRRB1Wgyj1dQbcDllZi2PMeLJ4tHSiXl7YXabCKwvsU8qN2WXFXYUGqc6QgvBkPyTnooiOCCEryPxJ9yd3Nw1D6zy9apNtAf9XMrWolUS0IzwaGaSkK-cRD4";
const MAP_IMG = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80";

const getImageUrl = (url?: string) => {
  if (!url) return FALLBACK_TITAN_X;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardData[]>([]);
  const [featuredGallery, setFeaturedGallery] = useState<string[]>([]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await ProductService.getProducts({ limit: 50 });
        if (res.success && res.data) {
          // Strictly filter the 1 single product that Admin explicitly set as featured (is_featured = 1, max 1)
          const featuredOnly = res.data.filter(p => p.isFeatured || (p as any).is_featured).slice(0, 1);
          setFeaturedProducts(featuredOnly);

          // If featured products exist, fetch full gallery images for the primary featured product
          if (featuredOnly.length > 0) {
            const primarySlug = featuredOnly[0].slug;
            const detailRes = await ProductService.getProductBySlug(primarySlug);
            if (detailRes.success && detailRes.data) {
              const rawGallery = detailRes.data.gallery || [];
              const galleryUrls = rawGallery
                .map((g: any) => getImageUrl(g.url || g.image_url || (typeof g === 'string' ? g : '')))
                .filter((url: string) => Boolean(url));

              if (galleryUrls.length > 0) {
                setFeaturedGallery(galleryUrls);
              } else if (detailRes.data.primaryImage) {
                setFeaturedGallery([getImageUrl(detailRes.data.primaryImage)]);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load featured products for home page:', err);
      }
    };

    fetchFeatured();
  }, []);

  const handleContactSales = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rfq');
  };

  const mainFeatured = featuredProducts.length > 0 ? featuredProducts[0] : null;
  const cleanMainSlug = (mainFeatured?.slug || mainFeatured?.title || 'gsh-elite-industrial-gloves')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'gsh-elite-industrial-gloves';
  const mainImageToShow = featuredGallery.length > 0 && activeGalleryIndex < featuredGallery.length
    ? featuredGallery[activeGalleryIndex]
    : getImageUrl(mainFeatured?.primaryImage);

  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Section matching HTML Mockup */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] w-full flex items-center overflow-hidden industrial-grid border-b border-outline-variant py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10" />
        <img
          src={HERO_IMG}
          alt="A high-contrast cinematic photograph of professional heavy-duty safety gloves resting on a brushed steel industrial workbench."
          fetchPriority="high"
          decoding="async"
          className="absolute right-0 top-0 h-full w-full lg:w-2/3 object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-50 lg:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80';
          }}
        />

        <div className="relative z-20 max-w-container-max mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-caps text-primary tracking-widest uppercase">
                GLOBAL COMPLIANCE ACTIVE
              </span>
            </div>

            <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface mb-6 leading-tight font-extrabold tracking-tight">
              Industrial Safety, <br />
              <span className="text-primary-container">Engineered</span> for the <br />
              Global Standard.
            </h1>

            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Providing Tier-1 protective equipment and safety logistics for manufacturing giants across six continents. ISO-certified reliability in every fiber.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-primary-container text-on-primary-container px-6 sm:px-8 py-3.5 sm:py-4 font-title-md text-sm sm:text-base rounded-sm orange-glow-hover flex items-center justify-center gap-2 font-bold transition-all min-h-[48px]"
              >
                Explore Catalog
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>

              <Link
                to="/about"
                className="border border-outline px-6 sm:px-8 py-3.5 sm:py-4 font-title-md text-sm sm:text-base text-on-surface hover:bg-surface-variant transition-colors font-bold flex items-center justify-center min-h-[48px]"
              >
                View Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats / Export Expertise Bar matching HTML Mockup */}
      <section className="py-12 sm:py-16 bg-surface-container-low border-b border-outline-variant w-full">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="border-l-2 border-primary-container pl-4 sm:pl-6">
              <div className="font-display-lg text-2xl sm:text-4xl text-on-surface font-bold mb-1">45+</div>
              <div className="font-label-caps text-xs text-on-surface-variant uppercase tracking-tighter">
                Countries Reached
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-4 sm:pl-6">
              <div className="font-display-lg text-2xl sm:text-4xl text-on-surface font-bold mb-1">12M</div>
              <div className="font-label-caps text-xs text-on-surface-variant uppercase tracking-tighter">
                Units Shipped
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-4 sm:pl-6">
              <div className="font-display-lg text-2xl sm:text-4xl text-on-surface font-bold mb-1">100%</div>
              <div className="font-label-caps text-xs text-on-surface-variant uppercase tracking-tighter">
                CE Compliance
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-4 sm:pl-6">
              <div className="font-display-lg text-2xl sm:text-4xl text-on-surface font-bold mb-1">24/7</div>
              <div className="font-label-caps text-xs text-on-surface-variant uppercase tracking-tighter">
                Safety Monitoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured PPE Gear Section (STRICTLY Admin Featured Products Only) */}
      <section className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label-caps text-primary mb-4 block">PREMIUM SELECTION</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Featured PPE Gear</h2>
            </div>
            <Link
              to="/products"
              className="text-on-surface-variant hover:text-primary-container flex items-center gap-2 transition-colors font-label-caps"
            >
              View Full Inventory <span className="material-symbols-outlined">north_east</span>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[520px]">
              {/* Box 1: Left Tall Hero Card (50% Width / col-span-6) */}
              <div className="md:col-span-6 group relative overflow-hidden bg-surface-container border border-outline-variant min-h-[500px] flex flex-col justify-end p-8 shadow-2xl rounded-sm">
                <img
                  src={featuredGallery[0] || getImageUrl(mainFeatured?.primaryImage)}
                  alt={mainFeatured?.title || 'Featured PPE Product'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_TITAN_X;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="inline-block bg-primary-container text-on-primary-container px-3 py-1 font-label-caps text-xs font-bold uppercase tracking-wider rounded-xs orange-glow">
                    {mainFeatured?.statusTag || 'NEW RELEASE'}
                  </div>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold leading-tight">
                    {mainFeatured?.title || 'Titan-X Safety System'}
                  </h3>
                  <p className="text-on-surface-variant font-body-sm text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {mainFeatured?.description || 'Impact resistant carbon composite shells for extreme environments.'}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/products/${cleanMainSlug}`}
                      className="bg-white text-surface px-6 py-3 font-title-md inline-flex items-center gap-2 font-bold hover:bg-primary hover:text-on-primary transition-all rounded-xs cursor-pointer orange-glow text-xs sm:text-sm"
                    >
                      View Specs <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side Container (50% Width / col-span-6 - 3-Item Sub-Grid) */}
              <div className="md:col-span-6 flex flex-col gap-6">
                
                {/* Box 2: Right Top Wide Card */}
                <div className="group relative overflow-hidden bg-surface-container border border-outline-variant h-[240px] flex flex-col justify-between p-6 shadow-xl rounded-sm">
                  <img
                    src={
                      featuredGallery[1] ||
                      (featuredProducts[1] ? getImageUrl(featuredProducts[1].primaryImage) : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80')
                    }
                    alt={featuredProducts[1]?.title || 'Pro-Utility Series'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_TITAN_X;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  <div className="relative z-10">
                    <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider block mb-1">
                      {featuredProducts[1]?.seriesName || 'Pro-Utility Series'}
                    </span>
                    <h4 className="font-title-md text-on-surface font-bold text-base truncate">
                      {featuredProducts[1]?.title || 'EN ISO 20471 Certified High-Vis'}
                    </h4>
                  </div>
                </div>

                {/* Bottom Row: 2 Equal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                  
                  {/* Box 3: Bottom-Left Card */}
                  <div className="group relative overflow-hidden bg-surface-container border border-outline-variant h-[235px] flex flex-col justify-end p-5 shadow-xl rounded-sm">
                    <img
                      src={
                        featuredGallery[2] ||
                        (featuredProducts[2] ? getImageUrl(featuredProducts[2].primaryImage) : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80')
                      }
                      alt={featuredProducts[2]?.title || 'Safety Footwear'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_TITAN_X;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    <div className="relative z-10">
                      <h4 className="font-title-md text-on-surface font-bold text-sm truncate">
                        {featuredProducts[2]?.title || 'Heavy-Duty Safety Boots'}
                      </h4>
                    </div>
                  </div>

                  {/* Box 4: Bottom-Right Card (Photo 4 or Custom Fitting CTA Box) */}
                  {featuredGallery[3] ? (
                    <div className="group relative overflow-hidden bg-surface-container border border-outline-variant h-[235px] flex flex-col justify-end p-5 shadow-xl rounded-sm">
                      <img
                        src={featuredGallery[3]}
                        alt="Featured Photo 4"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_TITAN_X;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="bg-surface-container-high border border-outline-variant/80 h-[235px] flex flex-col justify-center items-center text-center p-6 rounded-sm space-y-3 hover:border-primary/60 transition-colors">
                      <span className="material-symbols-outlined text-primary text-3xl">tune</span>
                      <h4 className="font-title-md text-on-surface font-bold text-sm">Custom Fitting</h4>
                      <p className="text-on-surface-variant text-[11px] leading-relaxed">
                        Tailored safety solutions for your entire workforce.
                      </p>
                      <Link
                        to="/rfq"
                        className="text-primary font-label-caps text-xs font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Get Started →
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container border border-outline-variant p-10 text-center rounded-xs space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">inventory_2</span>
              <h3 className="font-headline-lg text-xl text-on-surface font-bold">Industrial PPE & Safety Solutions</h3>
              <p className="font-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Explore our comprehensive wholesale catalog featuring high-grade protective gloves, workwear, and ISO/CE certified equipment for enterprise procurement.
              </p>
              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 font-label-caps text-xs font-bold uppercase tracking-wider rounded-xs orange-glow hover:scale-105 transition-all cursor-pointer"
                >
                  Browse Full Catalog →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Export Expertise Section matching HTML Mockup */}
      <section className="py-16 sm:py-24 bg-surface-container-lowest overflow-hidden w-full">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group overflow-hidden border border-outline-variant hover:border-primary transition-all duration-500 rounded-sm shadow-2xl cursor-pointer">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/10 rounded-full blur-3xl group-hover:bg-primary-container/30 transition-all duration-500" />
            <img
              src={MAP_IMG}
              alt="A stylized 3D digital map of the world rendered in a dark, tech-inspired aesthetic."
              className="relative z-10 w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-surface via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500" />
          </div>
          <div>
            <span className="font-label-caps text-primary mb-4 block">GLOBAL LOGISTICS</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-on-surface mb-6 font-extrabold">
              Our Export Expertise
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mb-8 leading-relaxed">
              Ghulam Safety Hub manages the end-to-end supply chain for high-consequence industries. From regional factory floors to international refineries, we ensure your safety gear arrives compliant, tested, and ready for action.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">verified</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Standardized Export Controls</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Rigorous documentation and compliance checks for every jurisdiction.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">speed</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Rapid Transit Protocols</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Strategic hub positioning reduces lead times by 35% globally.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">support_agent</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Regional Compliance Advisors</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Dedicated experts for ANSI, CE, and OSHA standards in your region.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Global Compliance Section matching HTML Mockup */}
      <section className="py-16 sm:py-24 border-t border-outline-variant w-full">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-on-surface mb-4 font-bold">
              Certified for Excellence
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-body-sm text-sm sm:text-base leading-relaxed">
              We don't just meet standards; we define them. Our products undergo rigorous testing in independent laboratories to ensure maximum human protection.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 opacity-70">
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">award_star</span>
              <span className="font-label-caps text-xs">ISO 9001</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">shield_with_heart</span>
              <span className="font-label-caps text-xs">CE MARKED</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">security</span>
              <span className="font-label-caps text-xs">ANSI / ISEA</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">factory</span>
              <span className="font-label-caps text-xs">OSHA READY</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">eco</span>
              <span className="font-label-caps text-xs">REACH COMPLIANT</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">workspace_premium</span>
              <span className="font-label-caps text-xs">UKCA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter / Contact Sales CTA matching HTML Mockup */}
      <section className="py-16 sm:py-20 bg-primary-container rounded-sm shadow-2xl w-full">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="text-on-primary-container text-center lg:text-left">
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">
              Ready to Secure Your Workforce?
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-on-primary-container/90">
              Get a custom quote for industrial-scale safety equipment.
            </p>
          </div>
          <form onSubmit={handleContactSales} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="bg-surface/10 border border-on-primary-container/30 text-on-primary-container placeholder:text-on-primary-container/60 px-6 py-4 rounded-sm w-full lg:w-80 focus:ring-on-primary-container focus:border-on-primary-container font-mono text-sm"
              placeholder="Corporate Email Address"
            />
            <button
              type="submit"
              className="bg-on-primary-container text-primary-container px-8 py-4 font-bold rounded-sm uppercase tracking-wider hover:bg-on-primary transition-colors whitespace-nowrap font-mono text-xs cursor-pointer min-h-[48px]"
            >
              Contact Sales
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
