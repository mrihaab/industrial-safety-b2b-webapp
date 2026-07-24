import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-outline-variant bg-surface p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-title-md text-primary font-bold mb-8">GSH Control Center</h2>
          <nav className="space-y-4">
            <a href="/admin/dashboard" className="block text-body-lg text-on-surface hover:text-primary">
              Dashboard
            </a>
            <a href="/admin/products" className="block text-body-lg text-on-surface hover:text-primary">
              Products Inventory
            </a>
            <a href="/admin/inquiries" className="block text-body-lg text-on-surface hover:text-primary">
              RFQ Inquiries
            </a>
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
