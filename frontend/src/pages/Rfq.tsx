import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { RfqService } from '@/services/rfqService';

const HERO_WAREHOUSE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBSJRBhWGq1FU2kQOXbieNl8wVcN1lglb20ymJwDq2ehh0OwMHHMDa6mFV6chzqCY4pFoSbzXJX2XO9vABWIINFYhTQLQdCohf_sA21KIh28DNbA13OCpoSmx-1h-a0gBWnAMDRP_2GpQwQYjd-rgeG282oPioJwhGTlEUTUjdrvsTfG5XgEizfyJEmqPSEZ1NqVAhfIcPZGPDYSJpMU7buk4_wApw78HxkwqZqe0pNLOfDb97_TsbRZ9e-3VD_F-OFYuh6J8z0nBY";
const MAP_HUBS_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCDVWkxOYfzHFzhGZyXa45bFhaHTDXWXNcdpwyYJaWCwVsdTgw-_gtPpEK3Qicff0NwBU0k3yvBWDka1lE5i4n6p2wegSLFsNsVNPzItW2-_NbmZbLEjHnMjrWSLltho6Z3s_-azASJxCvErTML-cnWfzCUPuzNNEkuo40r7UUi_5_MlLqHrZ6JyaTOmchVhlMnlANqNWM1DuA-BXKMh59OBZEDJJFscyPA2uiKR0i5_3hyDitVmBsE2SQzqwNjGeSYGDf9ZkwGrnw";

export const Rfq: React.FC = () => {
  const { cartItems, clearCart } = useCart();

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [industrySegment, setIndustrySegment] = useState('Oil & Gas');
  const [monthlyVolume, setMonthlyVolume] = useState('$50k - $250k');
  const [detailedRequirements, setDetailedRequirements] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setFormError('First select the product from catalog');
      return;
    }
    if (!companyName || !businessEmail) {
      setFormError('Please fill in your Company Name and Business Email.');
      return;
    }

    setFormError('');
    setIsLoading(true);

    try {
      const itemsToSubmit = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        sizeRange: item.sizeRange,
      }));

      const response = await RfqService.submitRfq({
        companyName,
        businessEmail,
        industrySegment,
        monthlyVolume,
        detailedRequirements,
        items: itemsToSubmit,
      });

      if (response.success) {
        setIsSubmitted(true);
        clearCart();
      } else {
        setFormError(response.message || 'RFQ submission failed. Please check details.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect to RFQ service.';
      setFormError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section matching HTML Mockup */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 block">
              International Logistics
            </span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
              Global Procurement, <br />
              <span className="text-primary">Precision Engineered.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
              Ghulam Safety Hub streamlines industrial safety procurement for multinational corporations. Direct-from-factory pricing combined with ISO-certified logistics management.
            </p>
            <div className="flex gap-8">
              <div className="flex flex-col border-l-2 border-primary pl-4">
                <span className="font-headline-lg text-headline-lg font-bold">24h</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Quote Turnaround</span>
              </div>
              <div className="flex flex-col border-l-2 border-primary pl-4">
                <span className="font-headline-lg text-headline-lg font-bold">140+</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Global Hubs</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden border border-outline-variant group">
            <img
              src={HERO_WAREHOUSE_IMG}
              alt="A high-angle architectural shot of a massive, technologically advanced distribution warehouse for industrial safety gear."
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Benefits Section matching HTML Mockup */}
      <section className="mb-20">
        <h2 className="font-headline-lg text-headline-lg mb-8 font-extrabold">Factory Direct Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-auto">
          {/* Bento Item 1 */}
          <div className="md:col-span-2 md:row-span-2 bg-surface-container/70 backdrop-blur-md p-8 flex flex-col justify-end border border-outline-variant/60 rounded-sm">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '48px' }}>
              factory
            </span>
            <h3 className="font-title-md text-title-md font-bold mb-2">Eliminate Middlemen</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Direct sourcing from our manufacturing lines in South Asia and Europe reduces procurement costs by up to 35% for bulk safety equipment orders.
            </p>
          </div>

          {/* Bento Item 2 */}
          <div className="md:col-span-2 bg-surface-container/70 backdrop-blur-md p-8 flex items-center gap-6 border border-outline-variant/60 rounded-sm">
            <div className="p-4 bg-surface-container-highest rounded-lg">
              <span className="material-symbols-outlined text-primary text-3xl">verified</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md font-bold mb-1">ISO 9001:2015 Certified</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Every shipment undergoes triple-point inspection protocols before clearing the factory floor.
              </p>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-surface-container/70 backdrop-blur-md p-6 border border-outline-variant/60 rounded-sm flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary mb-3 text-3xl">speed</span>
            <h3 className="font-body-lg font-bold mb-1">Rapid Transit</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Priority air-freight lanes for critical safety outages.
            </p>
          </div>

          {/* Bento Item 4 */}
          <div className="bg-surface-container/70 backdrop-blur-md p-6 border border-outline-variant/60 rounded-sm flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary mb-3 text-3xl">inventory</span>
            <h3 className="font-body-lg font-bold mb-1">Reserve Stock</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Client-specific inventory holding for contract holders.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Form & Distribution Section matching HTML Mockup */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Professional Form */}
        <div className="lg:col-span-7 bg-surface-container/70 backdrop-blur-md p-10 border border-outline-variant/60 rounded-sm">
          <h2 className="font-headline-lg text-headline-lg mb-2 font-extrabold">Request Bulk Quote</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-10">
            Our enterprise team responds within 24 business hours. Professional inquiries only.
          </p>

          {isSubmitted ? (
            <div className="bg-surface-container-high border border-primary/40 p-8 rounded-sm text-center space-y-4">
              <span className="material-symbols-outlined text-primary text-6xl animate-bounce">verified</span>
              <h3 className="font-headline-lg text-2xl text-on-surface font-extrabold">RFQ Initialized Successfully!</h3>
              <p className="font-body-sm text-on-surface-variant max-w-md mx-auto">
                Your enterprise inquiry has been received. Our Dubai & European desk will send formal quotation documents to <strong className="text-primary">{businessEmail}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-primary-container text-on-primary-container px-6 py-2 font-bold text-sm orange-glow transition-all rounded-xs uppercase tracking-wider cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="p-4 bg-error/10 border border-error/40 text-error rounded-xs font-body-sm">
                  {formError}
                </div>
              )}

              {/* Cart Empty Warning Notice (Procurement Flow Enforcement) */}
              {cartItems.length === 0 && (
                <div className="p-5 bg-amber-500/10 border-2 border-amber-500/40 rounded-xs mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-3xl shrink-0">shopping_cart_checkout</span>
                    <div>
                      <h4 className="font-title-md text-amber-300 font-bold text-base">First select the product from catalog</h4>
                      <p className="text-body-sm text-on-surface-variant text-xs mt-0.5">
                        Please select your required safety products from our catalog first, view product details, add them to your Quote Cart, and then initialize your RFQ.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="bg-primary-container text-on-primary-container px-5 py-2.5 font-bold text-xs orange-glow hover:scale-105 transition-all whitespace-nowrap rounded-xs shrink-0 uppercase tracking-wider"
                  >
                    Go to Catalog →
                  </Link>
                </div>
              )}

              {/* Cart Items Summary Banner (if items exist in Cart) */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-surface-container-high border border-primary/40 rounded-xs mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">
                      📋 Selected Quote Cart Items ({cartItems.length}):
                    </span>
                    <span className="text-xs text-on-surface font-mono font-bold">
                      {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Units Total
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant space-y-1 max-h-24 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>• {item.title} (Size: {item.sizeRange || 'L'})</span>
                        <span className="font-mono">{item.quantity} units</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Global Logistics Corp"
                    className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim rounded-xs font-body-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    value={businessEmail}
                    onChange={e => setBusinessEmail(e.target.value)}
                    placeholder="procurement@corp.com"
                    className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim rounded-xs font-body-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                    Industry Segment
                  </label>
                  <select
                    value={industrySegment}
                    onChange={e => setIndustrySegment(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim rounded-xs font-body-sm cursor-pointer"
                  >
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Construction">Construction</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Mining & Heavy Energy">Mining & Heavy Energy</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                    Estimated Monthly Volume
                  </label>
                  <select
                    value={monthlyVolume}
                    onChange={e => setMonthlyVolume(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim rounded-xs font-body-sm cursor-pointer"
                  >
                    <option value="$10k - $50k">$10k - $50k</option>
                    <option value="$50k - $250k">$50k - $250k</option>
                    <option value="$250k+">$250k+ (Container Vessel)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                  Detailed Requirements
                </label>
                <textarea
                  rows={4}
                  value={detailedRequirements}
                  onChange={e => setDetailedRequirements(e.target.value)}
                  placeholder="List specific PPE standards (e.g. ANSI/ISEA 107-2020) and required SKU quantities..."
                  className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim rounded-xs font-body-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-container text-on-primary-container px-10 py-4 font-bold text-lg orange-glow transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50 uppercase tracking-wider rounded-xs"
                >
                  {isLoading ? 'INITIALIZING...' : 'Initialize RFQ'}
                </button>
                <div className="flex items-center gap-2 text-on-surface-variant text-body-sm">
                  <span className="material-symbols-outlined text-green-400">encrypted</span>
                  SSL Secure Transmission
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Hub Maps & Direct Support */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container border border-outline-variant overflow-hidden group rounded-sm">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-high gap-2">
              <h3 className="font-title-md text-title-md font-bold truncate">Primary Distribution Hubs</h3>
              <span className="font-label-caps text-label-caps text-primary font-bold whitespace-nowrap flex-shrink-0">Live Status</span>
            </div>
            <div className="relative h-64 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
              <img
                src={MAP_HUBS_IMG}
                alt="A dark, stylized map of the world shown on a high-tech digital display highlighting Dubai and Singapore hubs."
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                <div>
                  <p className="font-bold">Dubai Logistics City (HQ)</p>
                  <p className="text-body-sm text-on-surface-variant">Plot B-24, Free Zone Area, UAE</p>
                  <p className="text-body-sm font-label-caps text-primary mt-1 font-bold">Status: Operational</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                <div>
                  <p className="font-bold">Singapore Maritime Hub</p>
                  <p className="text-body-sm text-on-surface-variant">Jurong West, Gateway Drive</p>
                  <p className="text-body-sm font-label-caps text-primary mt-1 font-bold">Status: High Volume</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container/70 backdrop-blur-md p-8 border border-outline-variant/60 flex flex-col gap-4 rounded-sm">
            <h4 className="font-title-md text-title-md font-bold">Direct Support</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">support_agent</span>
              </div>
              <div>
                <p className="font-bold">Global Sales Hotline</p>
                <p className="text-body-sm text-on-surface-variant font-mono">03267249998</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <p className="font-bold">Enterprise Desk</p>
                <p className="text-body-sm text-on-surface-variant font-mono">ghulamsafehub@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rfq;
