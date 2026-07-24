import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import Home from '@/pages/Home';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Application Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div className="font-headline-lg text-primary">About Us Page Placeholder</div>} />
          <Route path="products" element={<div className="font-headline-lg text-primary">Product Catalog Page Placeholder</div>} />
          <Route path="products/:slug" element={<div className="font-headline-lg text-primary">Product Detail Page Placeholder</div>} />
          <Route path="contact" element={<div className="font-headline-lg text-primary">Contact Us Page Placeholder</div>} />
          <Route path="rfq" element={<div className="font-headline-lg text-primary">Global RFQ Page Placeholder</div>} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<div className="min-h-screen bg-background flex items-center justify-center font-headline-lg text-primary">Admin Login Placeholder</div>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<div className="font-headline-lg text-primary">Admin Dashboard Placeholder</div>} />
          <Route path="products" element={<div className="font-headline-lg text-primary">Admin Products CRUD Placeholder</div>} />
          <Route path="inquiries" element={<div className="font-headline-lg text-primary">Admin Inquiries Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
