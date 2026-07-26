import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const About: React.FC = () => {
  const breadcrumbItems = [{ label: 'About Us' }];

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 1. HERO BANNER - Clean Top Alignment matching Contact Page */}
      <section className="relative overflow-hidden industrial-grid border-b border-outline-variant/60 -mx-gutter px-gutter py-6 md:py-8 rounded-b-lg">
        <div className="max-w-container-max mx-auto space-y-2">
          <SectionHeader
            badge="COMPANY BACKGROUND"
            title="About Ghulam Safety Hub"
            subtitle="Built for durability, comfort, and performance across high-consequence industries."
          />
        </div>
      </section>

      {/* 2. COMPANY STORY (VERBATIM COPY) */}
      <section className="max-w-container-max mx-auto">
        <GlassCard className="p-10 space-y-6 border-l-4 border-l-primary-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">verified</span>
            <h3 className="font-headline-lg text-2xl text-on-surface font-bold">Our Journey & Foundation</h3>
          </div>
          
          {/* VERBATIM CLIENT COPY */}
          <blockquote className="font-body-lg text-lg text-on-surface leading-relaxed italic border-l-2 border-outline-variant pl-6 py-2">
            "Ghulam Safety Hub was founded with a simple mission: to provide reliable, high-quality safety products that protect hardworking people every day. What started as a local business is now growing into a trusted brand serving customers across Pakistan and international markets. We specialize in safety gloves, workwear, safety vests, coveralls, and protective equipment built for durability, comfort, and performance. Our purpose is to help businesses create safer workplaces without compromising on quality. Every product reflects our commitment to excellence, reliability, and customer satisfaction. We focus on building long-term partnerships through honest service, competitive pricing, and consistent quality. Choose Ghulam Safety Hub for safety solutions you can trust and a partner dedicated to your success."
          </blockquote>
        </GlassCard>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card hoverable className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">flag</span>
            <h3 className="font-title-md text-2xl text-on-surface font-bold">Our Mission</h3>
          </div>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            To help businesses create safer workplaces without compromising on quality, delivering engineered protective gear built for durability, comfort, and performance in every working environment.
          </p>
        </Card>

        <Card hoverable className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">visibility</span>
            <h3 className="font-title-md text-2xl text-on-surface font-bold">Our Vision</h3>
          </div>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            To establish long-term enterprise partnerships across Pakistan and international markets through honest service, competitive pricing, and consistent ISO-certified manufacturing quality.
          </p>
        </Card>
      </section>

      {/* 4. KEY ACHIEVEMENTS */}
      <section className="max-w-container-max mx-auto space-y-8">
        <SectionHeader
          badge="MILESTONES"
          title="Company Milestones & Capabilities"
          subtitle="Why industrial enterprises choose Ghulam Safety Hub for workforce safety."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-2">
            <span className="material-symbols-outlined text-primary text-3xl">public</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Local to Global</h4>
            <p className="font-body-sm text-on-surface-variant">Growing from Pakistan roots into an exporter serving 45+ international markets.</p>
          </div>

          <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-2">
            <span className="material-symbols-outlined text-primary text-3xl">category</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">20 Product Lines</h4>
            <p className="font-body-sm text-on-surface-variant">Full PPE spectrum across Working Gloves, Sports Gloves, and Workwear.</p>
          </div>

          <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-2">
            <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">ISO & CE Certified</h4>
            <p className="font-body-sm text-on-surface-variant">Rigorously tested to international ANSI, CE, and OSHA safety standards.</p>
          </div>

          <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-2">
            <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Honest Service</h4>
            <p className="font-body-sm text-on-surface-variant">Long-term B2B relationships built on competitive pricing and consistent delivery.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="max-w-container-max mx-auto bg-primary-container text-on-primary-container p-12 rounded-sm orange-glow flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display-lg text-3xl font-extrabold">Partner with Ghulam Safety Hub</h3>
          <p className="font-body-lg text-on-primary-container/90">
            Request sample kits or consult our industrial safety engineering team today.
          </p>
        </div>
        <Link to="/rfq">
          <Button variant="secondary" size="lg" className="whitespace-nowrap">
            REQUEST WHOLESALE QUOTE
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default About;
