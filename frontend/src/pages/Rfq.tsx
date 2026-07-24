import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCart } from '@/contexts/CartContext';
import { RfqService } from '@/services/rfqService';

export const Rfq: React.FC = () => {
  const { cartItems, clearCart } = useCart();

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [industrySegment, setIndustrySegment] = useState('Construction & Engineering');
  const [monthlyVolume, setMonthlyVolume] = useState('1,000 - 5,000 units');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [sizeRange, setSizeRange] = useState('L');
  const [quantity, setQuantity] = useState(50);
  const [detailedRequirements, setDetailedRequirements] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const breadcrumbItems = [{ label: 'Global RFQ & Logistics' }];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !businessEmail) {
      setFormError('Please enter your Company Name and Business Email.');
      return;
    }
    if (quantity < 50) {
      setFormError('Minimum Order Quantity (MOQ) is 50 units.');
      return;
    }

    setFormError('');
    setIsLoading(true);

    try {
      const itemsToSubmit = cartItems.length > 0
        ? cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            sizeRange: item.sizeRange,
          }))
        : [{ productId: selectedProductId, quantity, sizeRange }];

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
        setFormError(response.message || 'RFQ submission failed.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect to RFQ service.';
      setFormError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        badge="ENTERPRISE PROCUREMENT"
        title="Global Logistics & Bulk RFQ"
        subtitle="Submit your high-volume safety equipment request for factory-direct quotes and maritime dispatch schedules."
      />

      {isSubmitted ? (
        <div className="max-w-2xl mx-auto bg-surface-container industrial-border p-10 rounded-sm text-center space-y-6">
          <span className="material-symbols-outlined text-primary text-6xl animate-bounce">verified</span>
          <h2 className="font-headline-lg text-3xl text-on-surface font-extrabold">RFQ Submitted Successfully!</h2>
          <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">
            Your inquiry has been assigned to our Key Account Engineering Desk. A formal quotation will be sent to <strong className="text-primary">{businessEmail}</strong> within 4 business hours.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button variant="primary" onClick={() => setIsSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 bg-surface-container industrial-border p-8 rounded-sm space-y-8">
            <div className="border-b border-outline-variant pb-4">
              <h3 className="font-headline-lg text-2xl text-on-surface font-bold">Wholesale Inquiry Form</h3>
              <p className="font-body-sm text-on-surface-variant">Fill in your enterprise details below for custom pricing.</p>
            </div>

            {formError && (
              <div className="p-4 bg-error/10 border border-error/40 text-error rounded-xs font-body-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                  1. Company & Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Company Name *"
                    placeholder="e.g. Apex Construction LLC"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    required
                  />
                  <Input
                    label="Business Email *"
                    type="email"
                    placeholder="procurement@apex.com"
                    value={businessEmail}
                    onChange={e => setBusinessEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Industry Segment"
                    value={industrySegment}
                    onChange={e => setIndustrySegment(e.target.value)}
                    options={[
                      { value: 'Construction & Engineering', label: 'Construction & Engineering' },
                      { value: 'Oil & Gas Sector', label: 'Oil & Gas Sector' },
                      { value: 'Manufacturing & Fab', label: 'Manufacturing & Fabrication' },
                      { value: 'Maritime & Logistics', label: 'Maritime & Logistics' },
                      { value: 'Mining & Energy', label: 'Mining & Heavy Energy' },
                    ]}
                  />
                  <Select
                    label="Monthly Volume Estimate"
                    value={monthlyVolume}
                    onChange={e => setMonthlyVolume(e.target.value)}
                    options={[
                      { value: '50 - 500 units', label: '50 - 500 units' },
                      { value: '500 - 1,000 units', label: '500 - 1,000 units' },
                      { value: '1,000 - 5,000 units', label: '1,000 - 5,000 units' },
                      { value: '5,000+ units', label: '5,000+ units (Container)' },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                  2. Product & Quantity Selection
                </h4>

                <Select
                  label="Selected Product Line"
                  value={String(selectedProductId)}
                  onChange={e => setSelectedProductId(Number(e.target.value))}
                  options={[
                    { value: '1', label: 'GSH Elite Industrial Working Gloves' },
                    { value: '2', label: 'TitanShield Precision Assembly Gloves' },
                    { value: '3', label: 'Vulcan Heat-Resistant Heavy Welding Gloves' },
                    { value: '4', label: 'Pro-Vis Class 2 High-Visibility Safety Vest' },
                    { value: '5', label: 'IronStride Anti-Puncture Steel Toe Boots' },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Size Range"
                    value={sizeRange}
                    onChange={e => setSizeRange(e.target.value)}
                    options={[
                      { value: 'S', label: 'Small (S)' },
                      { value: 'M', label: 'Medium (M)' },
                      { value: 'L', label: 'Large (L)' },
                      { value: 'XL', label: 'Extra Large (XL)' },
                      { value: 'XXL', label: 'Double Extra Large (XXL)' },
                      { value: 'Mixed', label: 'Mixed Assortment' },
                    ]}
                  />
                  <Input
                    label="Quantity (MOQ 50 Units) *"
                    type="number"
                    min={50}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value) || 50)}
                    error={quantity < 50 ? 'MOQ is 50 units.' : undefined}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                  3. Technical Specs & Private Labeling
                </h4>
                <Textarea
                  label="Detailed Requirements / Custom Branding Notes"
                  placeholder="Specify custom logo printing, packaging preferences, delivery deadlines, or target certification standards..."
                  rows={4}
                  value={detailedRequirements}
                  onChange={e => setDetailedRequirements(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                SUBMIT GLOBAL RFQ INQUIRY
              </Button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {cartItems.length > 0 && (
              <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                  <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                    Selected Cart Items ({cartItems.length})
                  </h4>
                  <button onClick={clearCart} className="text-xs text-on-surface-variant hover:text-primary">Clear</button>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-on-surface">
                      <div>
                        <span className="font-bold block">{item.title}</span>
                        <span className="text-on-surface-variant">Size: {item.sizeRange} | Qty: {item.quantity}</span>
                      </div>
                      <span className="font-mono font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <GlassCard className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">flight_takeoff</span>
                <h4 className="font-title-md text-xl text-on-surface font-bold">Global Shipping Corridors</h4>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Direct export dispatch from our Dubai Logistics City distribution hub and Singapore Maritime Corridor. Accelerated air-freight options available for urgent plant shutdowns.
              </p>
            </GlassCard>

            <GlassCard className="space-y-4 border-l-4 border-l-primary-container">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
                <h4 className="font-title-md text-xl text-on-surface font-bold">Direct Key Account Support</h4>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                Need immediate engineering consultation or custom sample kits dispatched to your facility?
              </p>
              <div className="space-y-2 pt-2 text-sm text-on-surface font-mono">
                <p>Email: <a href="mailto:bulk@ghulamsafety.com" className="text-primary hover:underline">bulk@ghulamsafety.com</a></p>
                <p>Phone: <a href="tel:+97145550192" className="text-primary hover:underline">+971 4 555 0192</a></p>
              </div>
              <a
                href="https://wa.me/97145550192?text=Inquiry%20from%20RFQ%20Page"
                target="_blank"
                rel="noreferrer"
                className="block pt-2"
              >
                <Button variant="outline" size="sm" className="w-full">
                  WhatsApp Support Desk
                </Button>
              </a>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rfq;
