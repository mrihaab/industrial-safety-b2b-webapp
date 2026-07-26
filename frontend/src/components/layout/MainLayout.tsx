import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Sticky Main Navbar */}
      <Navbar />

      {/* Main Page Body matching HTML Mockup Design */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-gutter py-stack-lg">
        <Outlet />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Site-wide Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
