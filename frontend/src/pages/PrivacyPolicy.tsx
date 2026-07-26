import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-outline-variant pb-8">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">
          Enterprise Data Protection
        </span>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface mb-4">
          Privacy & Data Security Policy
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          Ghulam Safety Hub is committed to safeguarding corporate procurement information, RFQ specifications, and international distribution data with ISO-certified security protocols.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-on-surface-variant font-body-sm leading-relaxed">
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">security</span>
            1. B2B Corporate Information Collection
          </h3>
          <p>
            When submitted through our Bulk RFQ Inquiry portal, Ghulam Safety Hub collects essential business information including company registration name, professional business email address, industry segment, estimated monthly volume, and technical glove/safety specifications.
          </p>
          <p>
            We strictly do not collect individual consumer personal credit card details or unencrypted financial data on public pages.
          </p>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            2. Use of RFQ & Procurement Data
          </h3>
          <p>
            Corporate data gathered during the wholesale quotation process is exclusively utilized to:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-on-surface">
            <li>Generate customized B2B volume pricing and official commercial invoices.</li>
            <li>Coordinate international freight logistics from our Dubai DLC & Sialkot manufacturing hubs.</li>
            <li>Provide technical compliance documentation (CE EN 388, ISO 9001:2015 test reports).</li>
            <li>Maintain administrative audit records in compliance with global trade regulations.</li>
          </ul>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">lock</span>
            3. Data Encryption & ISO Standard Protection
          </h3>
          <p>
            All electronic communications and quotation submissions are encrypted in transit using 256-bit SSL protocols. Database records are stored within protected enterprise servers conforming to ISO 27001 data governance standards. Access is strictly limited to authorized procurement directors and logistics managers.
          </p>
        </section>

        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">gavel</span>
            4. Third-Party Confidentiality Non-Disclosure
          </h3>
          <p>
            Ghulam Safety Hub will never sell, rent, or lease your corporate procurement records to third-party marketing entities. Data is only shared with verified international shipping carriers (DHL Express, Maersk, FedEx Logistics) strictly for order fulfillment purposes.
          </p>
        </section>
      </div>

      {/* Footer Navigation CTA */}
      <div className="pt-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-on-surface-variant font-mono">
          Last revised: January 2026 • Policy Version 2.4 (ISO Compliant)
        </span>
        <Link to="/rfq" className="bg-primary-container text-on-primary-container px-6 py-3 font-bold text-xs uppercase tracking-wider orange-glow rounded-xs">
          Proceed to Bulk RFQ Inquiry
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
