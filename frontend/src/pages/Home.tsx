import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/layout/SectionHeader';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden industrial-grid border-b border-outline-variant -mt-stack-lg -mx-gutter px-gutter rounded-b-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent z-10" />
        
        {/* Background Industrial Image */}
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
          alt="Industrial Safety Workspace"
          className="absolute right-0 top-0 h-full w-full lg:w-2/3 object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-60 lg:opacity-100"
        />

        <div className="relative z-20 max-w-container-max mx-auto w-full py-16">
          <div className="max-w-2xl space-y-6">
            {/* Active Compliance Tag */}
            <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant px-3 py-1 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                GLOBAL COMPLIANCE ACTIVE
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight font-extrabold">
              Industrial Safety, <br />
              <span className="text-primary-container">Engineered</span> for the <br />
              Global Standard.
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Providing Tier-1 protective equipment and safety logistics for manufacturing giants across six continents. ISO-certified reliability in every fiber.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/products">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<span className="material-symbols-outlined">arrow_forward</span>}
                >
                  Explore Catalog
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  View Certifications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRO & STATISTICS BAR */}
      <section className="max-w-container-max mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-surface-container industrial-border p-8 rounded-sm">
          <div className="border-l-2 border-primary-container pl-6 space-y-1">
            <span className="font-label-caps text-3xl font-bold text-primary tracking-wider">45+</span>
            <p className="font-body-sm text-on-surface-variant uppercase tracking-wider">Countries Reached</p>
          </div>
          <div className="border-l-2 border-primary-container pl-6 space-y-1">
            <span className="font-label-caps text-3xl font-bold text-primary tracking-wider">12M+</span>
            <p className="font-body-sm text-on-surface-variant uppercase tracking-wider">Units Shipped</p>
          </div>
          <div className="border-l-2 border-primary-container pl-6 space-y-1">
            <span className="font-label-caps text-3xl font-bold text-primary tracking-wider">100%</span>
            <p className="font-body-sm text-on-surface-variant uppercase tracking-wider">CE Compliance</p>
          </div>
          <div className="border-l-2 border-primary-container pl-6 space-y-1">
            <span className="font-label-caps text-3xl font-bold text-primary tracking-wider">24/7</span>
            <p className="font-body-sm text-on-surface-variant uppercase tracking-wider">Safety Monitoring</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS BENTO GRID */}
      <section className="max-w-container-max mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeader
            badge="PREMIUM SELECTION"
            title="Featured PPE Gear"
            subtitle="Heavy-duty equipment engineered for extreme industrial environments."
          />
          <Link to="/products" className="font-label-caps text-primary hover:underline flex items-center gap-1">
            View Full Inventory <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Titan-X Safety System (Main 6-col Hero Card) */}
          <div className="md:col-span-6 bg-surface-container industrial-border p-8 rounded-sm flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="space-y-4 z-10">
              <Badge variant="led">NEW RELEASE</Badge>
              <h3 className="font-display-lg text-2xl text-on-surface font-bold">Titan-X Safety System</h3>
              <p className="font-body-lg text-on-surface-variant max-w-md">
                Multi-layered Kevlar weave gloves engineered with Nitri-Flex impact armor for high-consequence energy sector operations.
              </p>
              <div className="flex gap-2">
                <Badge variant="neutral">Level 5 Cut</Badge>
                <Badge variant="neutral">CE EN 388</Badge>
              </div>
            </div>
            <div className="pt-8 z-10">
              <Link to="/products/gsh-elite-industrial-gloves">
                <Button variant="primary" size="md">View Specs & Pricing</Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Pro-Vis Series Apparel (6-col Card) */}
          <div className="md:col-span-6 bg-surface-container industrial-border p-8 rounded-sm flex flex-col justify-between relative overflow-hidden hover:border-primary/50 transition-all">
            <div className="space-y-4 z-10">
              <Badge variant="primary">HIGH-VIS SERIES</Badge>
              <h3 className="font-display-lg text-2xl text-on-surface font-bold">Pro-Vis Reflective Apparel</h3>
              <p className="font-body-lg text-on-surface-variant">
                ISO 20471 Class 2 compliant high-visibility vests and work suits for high-traffic construction zones.
              </p>
              <div className="flex gap-2">
                <Badge variant="neutral">Class 2 Reflective</Badge>
                <Badge variant="neutral">Weather Shield</Badge>
              </div>
            </div>
            <div className="pt-8 z-10">
              <Link to="/products">
                <Button variant="outline" size="md">Explore Workwear</Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Steel-Toe Footwear (6-col Card) */}
          <div className="md:col-span-6 bg-surface-container industrial-border p-6 rounded-sm space-y-4 hover:border-primary/50 transition-all">
            <div className="flex justify-between items-start">
              <Badge variant="success">IN STOCK</Badge>
              <span className="font-label-caps text-primary text-xl font-bold">$68.00</span>
            </div>
            <h4 className="font-title-md text-xl text-on-surface font-bold">IronStride Boots</h4>
            <p className="font-body-sm text-on-surface-variant">
              Steel-toe industrial work boots with anti-puncture sole and oil-resistant grip.
            </p>
            <Link to="/products" className="font-label-caps text-primary text-sm flex items-center gap-1">
              Details <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>

          {/* Card 4: Custom Fitting Solution (6-col Card) */}
          <div className="md:col-span-6 bg-surface-container industrial-border p-6 rounded-sm space-y-4 hover:border-primary/50 transition-all">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-3xl">settings_input_component</span>
              <Badge variant="neutral">CUSTOM SOLUTIONS</Badge>
            </div>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Enterprise Custom Fitting</h4>
            <p className="font-body-sm text-on-surface-variant">
              Custom size grading, private label branding, and bulk packaging for multinational fleets.
            </p>
            <Link to="/rfq" className="font-label-caps text-primary text-sm flex items-center gap-1">
              Consult Engineering Team <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES PREVIEW */}
      <section className="max-w-container-max mx-auto space-y-8">
        <SectionHeader
          badge="CATEGORIES"
          title="Product Line Divisions"
          subtitle="Explore specialized protection categories across our 20 product lines."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverable className="space-y-4">
            <span className="material-symbols-outlined text-primary text-4xl">front_hand</span>
            <Badge variant="neutral">Precision Handling</Badge>
            <h3 className="font-title-md text-2xl text-on-surface font-bold">Working Gloves</h3>
            <p className="font-body-sm text-on-surface-variant">
              Assembly, welding, driving, oil & gas, and cold weather hazard protection.
            </p>
            <Link to="/products?category=working-gloves">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View 11 Subcategories
              </Button>
            </Link>
          </Card>

          <Card hoverable className="space-y-4">
            <span className="material-symbols-outlined text-primary text-4xl">sports_soccer</span>
            <Badge variant="neutral">Athletic Performance</Badge>
            <h3 className="font-title-md text-2xl text-on-surface font-bold">Sports Gloves</h3>
            <p className="font-body-sm text-on-surface-variant">
              Cycling, goalkeeper, weight lifting, and ski sports performance gloves.
            </p>
            <Link to="/products?category=sports-gloves">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View 4 Subcategories
              </Button>
            </Link>
          </Card>

          <Card hoverable className="space-y-4">
            <span className="material-symbols-outlined text-primary text-4xl">checkroom</span>
            <Badge variant="neutral">Industrial Apparel</Badge>
            <h3 className="font-title-md text-2xl text-on-surface font-bold">Workwear & Safety Wear</h3>
            <p className="font-body-sm text-on-surface-variant">
              Working suits, safety vests, jackets, shirts, and high-visibility trousers.
            </p>
            <Link to="/products?category=workwear-safety-wear">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View 5 Subcategories
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* 5. CERTIFICATIONS SECTION */}
      <section className="max-w-container-max mx-auto bg-surface-container industrial-border p-8 rounded-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="font-label-caps text-primary tracking-widest uppercase">LAB TESTED & COMPLIANT</span>
          <h3 className="font-headline-lg text-xl text-on-surface font-bold">Global Safety Standard Certifications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            ISO 9001:2015
          </div>
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            CE EN 388
          </div>
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            ANSI / ISEA
          </div>
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            OSHA READY
          </div>
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            REACH
          </div>
          <div className="p-4 industrial-border bg-surface-container-high rounded-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors">
            UKCA MARKED
          </div>
        </div>
      </section>

      {/* 6. EXPORT / DISTRIBUTION MAP SECTION */}
      <section className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <GlassCard className="space-y-6">
          <SectionHeader
            badge="EXPORT EXPERTISE"
            title="Global Supply Chain & Logistics"
            subtitle="Rapid dispatch from Dubai Logistics City HQ and Singapore Maritime Hub to 45+ countries."
          />
          <ul className="space-y-4 font-body-lg">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span>Verified ISO-certified manufacturing facilities in Pakistan.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">speed</span>
              <span>Rapid 24-48h dispatch for urgent enterprise quote requests.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">support_agent</span>
              <span>Dedicated key account managers for volume procurement.</span>
            </li>
          </ul>
          <Link to="/rfq">
            <Button variant="primary" size="md" className="mt-4">
              Initialize Logistics RFQ
            </Button>
          </Link>
        </GlassCard>

        {/* 3D Global Routes Graphic Representation */}
        <div className="relative bg-surface-container industrial-border p-8 rounded-lg flex items-center justify-center min-h-[320px] overflow-hidden">
          <div className="absolute w-48 h-48 bg-primary-container/10 rounded-full blur-3xl" />
          <div className="text-center space-y-4 z-10">
            <span className="material-symbols-outlined text-primary text-6xl animate-pulse">public</span>
            <h4 className="font-headline-lg text-xl text-on-surface font-bold">45+ Active Supply Corridors</h4>
            <p className="font-body-sm text-on-surface-variant max-w-sm">
              Connecting Pakistan manufacturing plants with Middle East, European, and American industrial hubs.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CORPORATE SALES CTA BANNER */}
      <section className="max-w-container-max mx-auto bg-primary-container text-on-primary-container p-12 rounded-sm orange-glow flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display-lg text-3xl font-extrabold">Ready to Outfit Your Enterprise Workforce?</h3>
          <p className="font-body-lg text-on-primary-container/90">
            Get customized volume pricing, factory direct lead times, and sample kits.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link to="/rfq">
            <Button variant="secondary" size="lg" className="w-full whitespace-nowrap">
              REQUEST WHOLESALE QUOTE
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
