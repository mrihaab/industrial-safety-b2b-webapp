import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { AdminDashboardService, DashboardStats } from '@/services/adminDashboardService';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await AdminDashboardService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err: unknown) {
      console.warn('API error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">Executive Control Center</h1>
          <p className="font-body-sm text-on-surface-variant">Real-time inventory metrics, RFQ requests, and catalog management from MySQL database.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products">
            <button className="bg-primary hover:bg-primary/90 text-on-primary font-label-caps text-xs px-4 py-2 rounded-xs font-bold transition-all orange-glow">
              + New Product
            </button>
          </Link>
          <Link to="/admin/categories">
            <button className="bg-surface-container-high border border-outline-variant text-on-surface hover:text-primary font-label-caps text-xs px-4 py-2 rounded-xs font-bold transition-all">
              Manage Categories
            </button>
          </Link>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-y-2 border-l-4 border-l-primary">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-caps text-xs uppercase">Total Products</span>
            <span className="material-symbols-outlined text-primary">inventory_2</span>
          </div>
          <div className="font-display-lg text-3xl font-extrabold text-on-surface">
            {stats?.totalProducts || 0}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">Active catalog SKUs</p>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-secondary">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-caps text-xs uppercase">Active Categories</span>
            <span className="material-symbols-outlined text-primary">category</span>
          </div>
          <div className="font-display-lg text-3xl font-extrabold text-on-surface">
            {stats?.totalCategories || 0}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">Product line divisions</p>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-warning">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-caps text-xs uppercase">Pending RFQs</span>
            <span className="material-symbols-outlined text-primary">pending_actions</span>
          </div>
          <div className="font-display-lg text-3xl font-extrabold text-primary">
            {stats?.pendingRfqs || 0}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">Awaiting key account review</p>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-success">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-caps text-xs uppercase">Completed Quotes</span>
            <span className="material-symbols-outlined text-primary">task_alt</span>
          </div>
          <div className="font-display-lg text-3xl font-extrabold text-on-surface">
            {stats?.completedRfqs || 0}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">Dispatched quotations</p>
        </Card>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-surface-container industrial-border p-6 rounded-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">today</span>
          <div>
            <span className="font-label-caps text-xs text-on-surface-variant uppercase block">Today's Inquiries</span>
            <span className="font-mono text-xl font-bold text-on-surface">{stats?.todayRfqs || 0} RFQs</span>
          </div>
        </div>
        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-outline-variant pt-4 sm:pt-0 sm:pl-6">
          <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
          <div>
            <span className="font-label-caps text-xs text-on-surface-variant uppercase block">Monthly Volume</span>
            <span className="font-mono text-xl font-bold text-on-surface">{stats?.monthlyRfqs || 0} RFQs</span>
          </div>
        </div>
        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-outline-variant pt-4 sm:pt-0 sm:pl-6">
          <span className="material-symbols-outlined text-warning text-3xl">warning</span>
          <div>
            <span className="font-label-caps text-xs text-on-surface-variant uppercase block">Low Stock Items</span>
            <span className="font-mono text-xl font-bold text-warning">{stats?.lowStockProducts || 0} SKUs</span>
          </div>
        </div>
      </div>

      {/* Dynamic Real-Time Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inventory Additions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-lg text-xl font-bold text-on-surface">Recent Inventory Additions</h3>
            <Link to="/admin/products" className="font-label-caps text-xs text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-surface-container industrial-border rounded-sm overflow-hidden shadow-xl">
            <table className="w-full text-left font-body-sm text-sm">
              <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
                <tr>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {stats?.latestProducts && stats.latestProducts.length > 0 ? (
                  stats.latestProducts.map(p => (
                    <tr key={p.id} className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 px-4 font-mono text-xs font-bold text-on-surface">{p.sku}</td>
                      <td className="py-3 px-4 font-semibold text-on-surface truncate max-w-[140px]">{p.title}</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">${Number(p.price).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={p.stock_status === 'IN STOCK' ? 'success' : 'warning'}>
                          {p.stock_status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant font-body-sm">
                      No products found in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Wholesale Inquiries */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-lg text-xl font-bold text-on-surface">Latest Wholesale RFQs</h3>
            <Link to="/admin/inquiries" className="font-label-caps text-xs text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-surface-container industrial-border rounded-sm overflow-hidden shadow-xl">
            <table className="w-full text-left font-body-sm text-sm">
              <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Segment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {stats?.latestInquiries && stats.latestInquiries.length > 0 ? (
                  stats.latestInquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 px-4 font-bold text-on-surface">{inq.company_name}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{inq.industry_segment || 'Industrial Safety'}</td>
                      <td className="py-3 px-4">
                        <Badge variant={inq.status === 'pending' ? 'warning' : 'success'}>
                          {(inq.status || 'pending').toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link to="/admin/inquiries" className="font-label-caps text-xs text-primary hover:underline">
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant font-body-sm">
                      No RFQ inquiries submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
