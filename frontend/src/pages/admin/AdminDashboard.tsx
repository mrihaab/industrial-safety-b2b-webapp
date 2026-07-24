import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">Dashboard Overview</h1>
          <p className="font-body-sm text-on-surface-variant">Real-time inventory and B2B wholesale inquiry monitoring.</p>
        </div>
        <Link to="/admin/products">
          <Button variant="primary" size="md">
            + Add New Product
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-y-2 border-l-4 border-l-primary-container">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase">Total Products</span>
          <span className="font-display-lg text-3xl font-bold text-primary block">24 Items</span>
          <span className="text-xs text-on-surface-variant">Active in catalog</span>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-primary-container">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase">RFQ Inquiries</span>
          <span className="font-display-lg text-3xl font-bold text-on-surface block">18 Quotes</span>
          <Badge variant="led">2 NEW TODAY</Badge>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-primary-container">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase">Low Stock Alerts</span>
          <span className="font-display-lg text-3xl font-bold text-error block">2 Items</span>
          <span className="text-xs text-error">Requires re-order</span>
        </Card>

        <Card className="space-y-2 border-l-4 border-l-primary-container">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase">Database Connection</span>
          <span className="font-display-lg text-xl font-bold text-[#4ade80] block">ONLINE</span>
          <span className="text-xs text-on-surface-variant">MySQL XAMPP Active</span>
        </Card>
      </div>

      {/* Recent RFQs Table Preview */}
      <div className="bg-surface-container industrial-border p-6 rounded-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-lg text-xl font-bold text-on-surface">Recent B2B Inquiries</h3>
          <Link to="/admin/inquiries" className="font-label-caps text-xs text-primary underline">
            View All Inquiries
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-sm">
            <thead className="border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Business Email</th>
                <th className="py-3 px-4">Product Line</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              <tr className="hover:bg-surface-container-high">
                <td className="py-3 px-4 font-mono">#101</td>
                <td className="py-3 px-4 font-bold text-on-surface">Apex Construction LLC</td>
                <td className="py-3 px-4">procurement@apex.com</td>
                <td className="py-3 px-4">GSH Elite Industrial Gloves</td>
                <td className="py-3 px-4 font-bold">500 units</td>
                <td className="py-3 px-4"><Badge variant="led">NEW</Badge></td>
              </tr>
              <tr className="hover:bg-surface-container-high">
                <td className="py-3 px-4 font-mono">#100</td>
                <td className="py-3 px-4 font-bold text-on-surface">Gulf Maritime Energy</td>
                <td className="py-3 px-4">orders@gulfmaritime.ae</td>
                <td className="py-3 px-4">Pro-Vis Safety Vests</td>
                <td className="py-3 px-4 font-bold">1,200 units</td>
                <td className="py-3 px-4"><Badge variant="success">PROCESSED</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
