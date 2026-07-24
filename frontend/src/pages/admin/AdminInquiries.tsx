import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface InquiryItem {
  id: number;
  companyName: string;
  businessEmail: string;
  industrySegment: string;
  monthlyVolume: string;
  productLine: string;
  quantity: number;
  detailedRequirements: string;
  status: 'PENDING' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
}

const MOCK_INQUIRIES: InquiryItem[] = [
  {
    id: 101,
    companyName: 'Apex Construction LLC',
    businessEmail: 'procurement@apex.com',
    industrySegment: 'Construction & Engineering',
    monthlyVolume: '1,000 - 5,000 units',
    productLine: 'GSH Elite Industrial Working Gloves',
    quantity: 500,
    detailedRequirements: 'Requires custom high-visibility logo printing on cuff. Delivery targeted for Dubai Logistics Park within 14 days.',
    status: 'PENDING',
    createdAt: '2026-07-24 08:30',
  },
  {
    id: 100,
    companyName: 'Gulf Maritime Energy',
    businessEmail: 'orders@gulfmaritime.ae',
    industrySegment: 'Oil & Gas Sector',
    monthlyVolume: '5,000+ units',
    productLine: 'Pro-Vis Class 2 High-Visibility Safety Vest',
    quantity: 1200,
    detailedRequirements: 'Needs CE EN 388 Level 5 certification documentation attached to invoice.',
    status: 'CONTACTED',
    createdAt: '2026-07-23 14:15',
  },
];

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(MOCK_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const handleStatusToggle = (id: number) => {
    setInquiries(prev =>
      prev.map(inq =>
        inq.id === id
          ? { ...inq, status: inq.status === 'PENDING' ? 'CONTACTED' : 'CLOSED' }
          : inq
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-outline-variant pb-6">
        <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">RFQ Inquiries Management</h1>
        <p className="font-body-sm text-on-surface-variant">Review submitted enterprise wholesale quotes and customer contact details.</p>
      </div>

      {/* RFQ Inquiries Table */}
      <div className="bg-surface-container industrial-border rounded-sm overflow-hidden shadow-xl">
        <table className="w-full text-left font-body-sm text-sm">
          <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
            <tr>
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Company Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Qty</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {inquiries.map(inq => (
              <tr key={inq.id} className="hover:bg-surface-container-high transition-colors">
                <td className="py-4 px-6 font-mono text-xs font-bold text-on-surface">#{inq.id}</td>
                <td className="py-4 px-6 font-bold text-on-surface">{inq.companyName}</td>
                <td className="py-4 px-6 font-mono text-xs">{inq.businessEmail}</td>
                <td className="py-4 px-6 max-w-xs truncate">{inq.productLine}</td>
                <td className="py-4 px-6 font-bold">{inq.quantity} units</td>
                <td className="py-4 px-6">
                  <Badge variant={inq.status === 'PENDING' ? 'led' : inq.status === 'CONTACTED' ? 'success' : 'neutral'}>
                    {inq.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(inq)}>
                    View Details
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleStatusToggle(inq.id)}>
                    {inq.status === 'PENDING' ? 'Mark Contacted' : 'Close Quote'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INQUIRY DETAIL MODAL */}
      <Modal
        isOpen={Boolean(selectedInquiry)}
        onClose={() => setSelectedInquiry(null)}
        title={`Inquiry #${selectedInquiry?.id} - ${selectedInquiry?.companyName}`}
      >
        {selectedInquiry && (
          <div className="space-y-4 text-sm font-body-lg">
            <div className="grid grid-cols-2 gap-4 bg-surface-container-high p-4 rounded-xs border border-outline-variant">
              <div>
                <span className="font-label-caps text-xs text-on-surface-variant block">Business Email</span>
                <span className="font-mono text-primary font-bold">{selectedInquiry.businessEmail}</span>
              </div>
              <div>
                <span className="font-label-caps text-xs text-on-surface-variant block">Industry Segment</span>
                <span className="font-bold">{selectedInquiry.industrySegment}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase">Requested Order</span>
              <p className="font-bold text-on-surface">{selectedInquiry.productLine} ({selectedInquiry.quantity} units)</p>
            </div>

            <div className="space-y-2">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase">Technical Specs & Requirements</span>
              <p className="p-4 bg-surface-container-high border border-outline-variant rounded-xs italic text-on-surface-variant">
                "{selectedInquiry.detailedRequirements}"
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                Close Window
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminInquiries;
