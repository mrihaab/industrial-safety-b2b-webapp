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
            Sialkot Industrial Zone, Punjab, Pakistan<br />
            Dubai Logistics City Hub, UAE
          </p>
          <div className="pt-2 text-xs text-on-surface-variant font-mono">
            Mon - Sat: 8:00 AM - 6:00 PM PST
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
          <a href="mailto:bulk@ghulamsafety.com" className="font-mono text-primary text-sm font-bold block hover:underline">
            bulk@ghulamsafety.com
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
          <a href="tel:+97145550192" className="font-mono text-primary text-sm font-bold block hover:underline">
            +971 4 555 0192
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
          {/* Responsive Google Maps Embed */}
          <div className="bg-surface-container industrial-border p-2 rounded-sm overflow-hidden h-72 relative">
            <iframe
              title="Ghulam Safety Hub Global Logistics Park"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115682.49386343516!2d55.150000!3d25.050000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sDubai%20Logistics%20City!5e0!3m2!1sen!2sae!4v1600000000000!5m2!1sen!2sae"
              className="w-full h-full border-0 rounded-xs grayscale hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Social Links & Corporate Network */}
          <GlassCard className="space-y-4">
            <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
              Connect Across Social Channels
            </h4>
            <div className="grid grid-cols-2 gap-3 font-body-sm text-sm">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-primary transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined text-primary">share</span>
                <span>LinkedIn Corporate</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-primary transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined text-primary">public</span>
                <span>Facebook Page</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3 bg-surface-container-high border border-outline-variant rounded-xs hover:border-primary transition-colors text-on-surface"
              >
                <span className="material-symbols-outlined text-primary">movie</span>
                <span>YouTube Demos</span>
              </a>
              <a
                href="https://wa.me/97145550192"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-3 bg-[#25D366]/10 border border-[#25D366]/40 rounded-xs hover:border-[#25D366] transition-colors text-[#25D366] font-semibold"
              >
                <span className="material-symbols-outlined">chat</span>
                <span>WhatsApp Business</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Contact;
