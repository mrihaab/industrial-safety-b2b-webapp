import React from 'react';
import { Link } from 'react-router-dom';

export const CeStandards: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-outline-variant pb-8">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block mb-2">
          European & Global Quality Compliance
        </span>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface mb-4">
          CE Certified & EN 388 Safety Standards
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          All industrial protective gear and safety gloves manufactured and distributed by Ghulam Safety Hub strictly comply with EU Regulation 2016/425 and EN ISO 21420 quality directives.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-on-surface-variant font-body-sm leading-relaxed">
        {/* EN 388 Mechanical Risk Matrix */}
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-4">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified</span>
            1. EN 388:2016 + A1:2018 Mechanical Risk Breakdown
          </h3>
          <p>
            The European EN 388 standard evaluates mechanical protection against physical hazards in heavy industrial and manufacturing environments. Our certified gloves are rigorously lab-tested across 5 key performance metrics:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold text-base block mb-1">Abrasion (0-4)</span>
              <p className="text-xs text-on-surface-variant">Resistance to surface wear caused by friction cycles under pressure.</p>
            </div>
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold text-base block mb-1">Cut Coup (0-5)</span>
              <p className="text-xs text-on-surface-variant">Blade cut resistance using rotating circular blade testing methods.</p>
            </div>
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold text-base block mb-1">Tear (0-4)</span>
              <p className="text-xs text-on-surface-variant">Force required to propagate a tear in pre-cut material samples.</p>
            </div>
            <div className="bg-surface-container-high p-4 border border-outline-variant/60 rounded-xs">
              <span className="font-mono text-primary font-bold text-base block mb-1">Puncture (0-4)</span>
              <p className="text-xs text-on-surface-variant">Resistance against penetration by sharp industrial points & needles.</p>
            </div>
          </div>
        </section>

        {/* CE Regulation Framework */}
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
            2. EU Regulation 2016/425 Category & Markings
          </h3>
          <p>
            Ghulam Safety Hub protective equipment is certified under Category II (Intermediate Risks) and Category III (Complex/Irreversible Risks). Every product unit features:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-on-surface">
            <li>Legible CE Marking stamped on cuff label & packaging carton.</li>
            <li>Specific EN pictogram with corresponding performance level numbers.</li>
            <li>Manufacturer identification & batch traceability lot numbers.</li>
            <li>Multilingual User Instruction Information Sheets (UIIS).</li>
          </ul>
        </section>

        {/* Additional Standards: ISO & ANSI */}
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">award_star</span>
            3. ISO 9001:2015 & ANSI / ISEA International Compliance
          </h3>
          <p>
            In addition to European CE certification, our facility operations maintain ISO 9001:2015 Quality Management Systems certification and comply with North American ANSI / ISEA 107 high-visibility standards for global enterprise deployment.
          </p>
        </section>

        {/* Declaration of Conformity Request */}
        <section className="bg-surface-container industrial-border p-6 rounded-xs space-y-3">
          <h3 className="font-title-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">file_download</span>
            4. EU Declaration of Conformity (DoC) Requests
          </h3>
          <p>
            Enterprise buyers and safety auditors can request official lab test certificates and EU Declaration of Conformity documents for any SKU in our catalog by submitting a inquiry through our account management desk.
          </p>
        </section>
      </div>

      {/* Footer Navigation CTA */}
      <div className="pt-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-on-surface-variant font-mono">
          Certification Standards • EU Directive 2016/425 Compliant
        </span>
        <Link to="/products" className="bg-primary-container text-on-primary-container px-6 py-3 font-bold text-xs uppercase tracking-wider orange-glow rounded-xs">
          Explore CE Certified Safety Catalog
        </Link>
      </div>
    </div>
  );
};

export default CeStandards;
