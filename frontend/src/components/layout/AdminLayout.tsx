import React from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-outline-variant bg-surface p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-8">
          <Logo showText={false} />
          <div>
            <h2 className="font-label-caps text-xs text-primary font-bold tracking-widest uppercase mb-1">
              GSH CONTROL CENTER
            </h2>
            <span className="font-mono text-xs text-on-surface-variant">Logged as: {user?.email}</span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2 font-body-lg">
            <Link
              to="/admin/dashboard"
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors',
                isActive('/admin/dashboard') ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              )}
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/products"
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors',
                isActive('/admin/products') ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              )}
            >
              <span className="material-symbols-outlined text-lg">inventory_2</span>
              <span>Products CRUD</span>
            </Link>

            <Link
              to="/admin/categories"
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors',
                isActive('/admin/categories') ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              )}
            >
              <span className="material-symbols-outlined text-lg">category</span>
              <span>Categories</span>
            </Link>

            <Link
              to="/admin/inquiries"
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors',
                isActive('/admin/inquiries') ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              )}
            >
              <span className="material-symbols-outlined text-lg">description</span>
              <span>RFQ Inquiries</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-outline-variant">
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            Sign Out Admin
          </Button>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
