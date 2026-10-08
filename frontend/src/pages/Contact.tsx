import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { GlassCard } from '@/components/ui/GlassCard';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbItems = [{ label: 'Contact Us' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Banner */}
      <SectionHeader
        badge="GET IN TOUCH"
        title="Contact Sales & Engineering Support"
        subtitle="Our dedicated technical representatives are available 24/7 for volume procurement inquiries, factory audits, and product technical specifications."
      />

      {/* 1. OFFICE DETAILS & CONTACT CARDS (3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Global Headquarters</h4>
          </div>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            Sialkot Industrial Zone, Punjab, Pakistan
          </p>
          <div className="pt-2 text-xs text-on-surface-variant font-mono">
            Mon - Sat: 8:00 AM - 6:00 PM PKT
          </div>
        </Card>

        <Card hoverable className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Sales & Quotations</h4>
          </div>
          <p className="font-body-sm text-on-surface-variant">
            Direct wholesale quotes and enterprise contract inquiries:
          </p>
          <a href="mailto:ghulamsafehub@gmail.com" className="font-mono text-primary text-sm font-bold block hover:underline break-all">
            ghulamsafehub@gmail.com
          </a>
          <span className="text-xs text-on-surface-variant block">Response within 4 business hours</span>
        </Card>

        <Card hoverable className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">call</span>
            <h4 className="font-title-md text-xl text-on-surface font-bold">Phone & WhatsApp</h4>
          </div>
          <p className="font-body-sm text-on-surface-variant">
            Direct helpline for urgent dispatch and order status tracking:
          </p>
          <a href="tel:+923267249998" className="font-mono text-primary text-sm font-bold block hover:underline">
            +92 326 7249998
          </a>
          <span className="text-xs text-on-surface-variant block">24/7 International Customer Line</span>
        </Card>
      </div>

      {/* 2. CONTACT FORM & GOOGLE MAPS EMBED (2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form (7-Columns) */}
        <div className="lg:col-span-7 bg-surface-container industrial-border p-8 rounded-sm space-y-6">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="font-headline-lg text-2xl text-on-surface font-bold">Send Us a Direct Message</h3>
            <p className="font-body-sm text-on-surface-variant">Have a general question or partnership proposal? Fill out the form below.</p>
          </div>

          {isSent ? (
            <div className="p-8 bg-surface-container-high border border-primary-container/50 text-center space-y-4 rounded-xs">
              <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
              <h4 className="font-title-md text-2xl text-on-surface font-bold">Message Sent Successfully!</h4>
              <p className="font-body-sm text-on-surface-variant">
                Thank you for contacting Ghulam Safety Hub. Our customer service representative will respond to your email shortly.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSent(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name *"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Subject / Inquired Product"
                placeholder="e.g. Custom Logo Printing on Welding Gloves"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />

              <Textarea
                label="Your Message *"
                placeholder="Type your message, inquiry, or requirements here..."
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                SEND MESSAGE
              </Button>
            </form>
          )}
        </div>

        {/* Right Google Maps & Social Links (5-Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Responsive Google Maps Embed (Sialkot, Pakistan) */}
          <div className="bg-surface-container industrial-border p-2 rounded-sm overflow-hidden h-72 relative">
            <iframe
              title="Ghulam Safety Hub Manufacturing & Headquarters - Sialkot, Pakistan"
              src="https://maps.google.com/maps?q=Sialkot+Industrial+Estate,+Sialkot,+Punjab,+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 rounded-xs transition-all duration-500"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Official Social Channels & Corporate Network */}
          <GlassCard className="space-y-4">
            <div className="border-b border-outline-variant/60 pb-2">
              <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                Official Factory & Social Channels
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Follow factory production runs, PPE testing, and live batch dispatches
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-sm">
              <a
                href="https://www.facebook.com/share/1EShuQdoyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-[#1877F2] hover:bg-surface-container transition-all group text-on-surface"
              >
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs block text-on-surface">Facebook</span>
                  <span className="text-[11px] text-on-surface-variant truncate block">Ghulam Safety Hub</span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/ghulamsafehub/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-[#E1306C] hover:bg-surface-container transition-all group text-on-surface"
              >
                <div className="w-8 h-8 rounded-full bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs block text-on-surface">Instagram</span>
                  <span className="text-[11px] text-on-surface-variant truncate block">@ghulamsafehub</span>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@ghulam.safe.hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-black hover:bg-surface-container transition-all group text-on-surface"
              >
                <div className="w-8 h-8 rounded-full bg-black/10 text-on-surface flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.81a8.27 8.27 0 0 0 4.84 1.54V6.9a4.85 4.85 0 0 1-.95-.21z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs block text-on-surface">TikTok</span>
                  <span className="text-[11px] text-on-surface-variant truncate block">@ghulam.safe.hub</span>
                </div>
              </a>

              <a
                href="https://wa.me/923267249998"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/40 rounded-xs hover:border-[#25D366] hover:bg-[#25D366]/15 transition-all group text-[#25D366]"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs block text-[#25D366]">WhatsApp Direct</span>
                  <span className="text-[11px] text-[#25D366]/80 truncate block">+92 326 7249998</span>
                </div>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Contact;
