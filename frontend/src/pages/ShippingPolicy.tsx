import React from 'react';
import { Link } from 'react-router-dom';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-outline-variant pb-8">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">
          Global Logistics & Fulfillment
        </span>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface mb-4">
          International Shipping & Freight Policy
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          Direct-from-factory dispatch and international container shipping protocols from Ghulam Safety Hub distribution centers in Dubai, Singapore, and Sialkot.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-on-surface-variant font-body-sm leading-relaxed">
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            1. Dispatch Locations & Global Distribution Hubs
          </h3>
          <p>
            Wholesale shipments are dispatched directly from our primary regional logistics hubs based on order destination, stock availability, and Incoterms:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-on-surface">
            <li><strong>Middle East & Africa Hub:</strong> Dubai Logistics City (DLC), UAE (Air/Sea Express).</li>
            <li><strong>Asia-Pacific Hub:</strong> Singapore Port Terminal Free Zone.</li>
            <li><strong>Manufacturing Origin Hub:</strong> Sialkot Industrial Zone, Pakistan (Direct Container Load).</li>
          </ul>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">schedule</span>
            2. Production Lead Times & Delivery Estimates
          </h3>
          <p>
            Delivery timelines depend on quantity and customization (custom branding/sizing):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold block text-lg">3-5 Days</span>
              <span className="text-xs text-on-surface-variant">Air Cargo Express (Stock Items)</span>
            </div>
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold block text-lg">12-18 Days</span>
              <span className="text-xs text-on-surface-variant">FCL / LCL Ocean Freight</span>
            </div>
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold block text-lg">Custom MOQs</span>
              <span className="text-xs text-on-surface-variant">Schedule provided upon RFQ Approval</span>
            </div>
          </div>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">description</span>
            3. Shipping Terms (Incoterms 2020)
          </h3>
          <p>
            Ghulam Safety Hub supports all standard B2B international commercial shipping terms:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-on-surface">
            <li><strong>FOB (Free on Board):</strong> Origin port (Sialkot / Dubai Port).</li>
            <li><strong>CIF (Cost, Insurance, Freight):</strong> Destination port worldwide.</li>
            <li><strong>DDP (Delivered Duty Paid):</strong> Available for GCC & EU enterprise buyers.</li>
          </ul>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified</span>
            4. Customs Clearance & CE Technical Documentation
          </h3>
          <p>
            Every container shipment includes full commercial invoice sets, Packing Lists, Certificate of Origin (COO), Bill of Lading (B/L), and CE EN 388 test compliance certification to ensure seamless clearance at destination customs ports.
          </p>
        </section>
      </div>

      {/* Footer Navigation CTA */}
      <div className="pt-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-on-surface-variant font-mono">
          Last revised: January 2026 • Logistics & Supply Policy
        </span>
        <Link to="/rfq" className="bg-primary-container text-on-primary-container px-6 py-3 font-bold text-xs uppercase tracking-wider orange-glow rounded-xs">
          Request Container Freight Quote
        </Link>
      </div>
    </div>
  );
};

export default ShippingPolicy;
