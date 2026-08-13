import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Loader } from '@/components/ui/Loader';
import Home from '@/pages/Home';

// Lazy-loaded public & policy routes
const About = lazy(() => import('@/pages/About'));
const Catalog = lazy(() => import('@/pages/Catalog'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Rfq = lazy(() => import('@/pages/Rfq'));
const Contact = lazy(() => import('@/pages/Contact'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const ShippingPolicy = lazy(() => import('@/pages/ShippingPolicy'));
const CeStandards = lazy(() => import('@/pages/CeStandards'));

// Lazy-loaded protected admin routes
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('@/pages/admin/AdminCategories'));
const AdminInquiries = lazy(() => import('@/pages/admin/AdminInquiries'));

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <Loader size="lg" fullScreen={false} />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Application Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Catalog />} />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="rfq" element={<Rfq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="ce-standards" element={<CeStandards />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
