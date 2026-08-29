import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/ui/Loader';
import { Pagination } from '@/components/ui/Pagination';
import { AdminRfqService, AdminRfqItem } from '@/services/adminRfqService';

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<AdminRfqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Selected Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<AdminRfqItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await AdminRfqService.getRfqs({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined,
        page: currentPage,
        limit: 10,
      });

      if (response.success && response.data) {
        setInquiries(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages || 1);
        }
      }
    } catch (err: unknown) {
      console.warn('API error fetching RFQ inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, searchQuery, currentPage]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await AdminRfqService.updateStatus(id, newStatus);
      if (response.success) {
        setInquiries(prev =>
          prev.map(inq => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err: unknown) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const openDetailModal = async (inq: AdminRfqItem) => {
    setSelectedInquiry(inq);
    setIsDetailOpen(true);
    try {
      const fullRes = await AdminRfqService.getRfqById(inq.id);
      if (fullRes.success && fullRes.data) {
        setSelectedInquiry(fullRes.data);
      }
    } catch (err: unknown) {
      console.warn('Error fetching RFQ items:', err);
    }
  };

  const handleDeleteRfq = async (id: number, companyName: string) => {
    if (!window.confirm(`Are you sure you want to delete RFQ Inquiry #${id} from "${companyName}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const response = await AdminRfqService.deleteRfq(id);
      if (response.success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) {
          setIsDetailOpen(false);
          setSelectedInquiry(null);
        }
      }
    } catch (err: unknown) {
      console.error('Failed to delete RFQ inquiry:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">RFQ Inquiries & Quotes</h1>
          <p className="font-body-sm text-on-surface-variant">Review enterprise procurement requests, product quantities, and update quote dispatch statuses.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container industrial-border p-4 rounded-sm">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'pending', 'approved', 'completed', 'rejected'].map(st => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`font-label-caps text-xs px-3 py-1.5 rounded-xs transition-all uppercase ${
                statusFilter === st
                  ? 'bg-primary-container text-on-primary-container font-bold orange-glow'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by company or email..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 bg-surface-container-high border border-outline-variant rounded-xs px-3 py-1.5 text-xs text-on-surface focus:border-primary focus:outline-none"
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="bg-surface-container industrial-border rounded-sm overflow-x-auto shadow-xl">
          <table className="w-full text-left font-body-sm text-sm">
            <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Company / Contact</th>
                <th className="py-4 px-6">Segment</th>
                <th className="py-4 px-6">Volume Est.</th>
                <th className="py-4 px-6">Submitted Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {inquiries.length > 0 ? (
                inquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-on-surface">#{inq.id}</td>
                    <td className="py-4 px-6">
                      <span className="font-bold block text-on-surface">{inq.company_name}</span>
                      <span className="text-xs text-on-surface-variant font-mono">{inq.business_email}</span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant">{inq.industry_segment}</td>
                    <td className="py-4 px-6 font-mono text-xs text-primary">{inq.monthly_volume}</td>
                    <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={inq.status}
                        disabled={updatingId === inq.id}
                        onChange={e => handleStatusChange(inq.id, e.target.value)}
                        className={`text-xs font-label-caps font-bold rounded-xs px-3 py-1.5 border transition-all cursor-pointer bg-[#1e293b] ${
                          inq.status === 'pending'
                            ? 'text-amber-400 border-amber-500/50'
                            : inq.status === 'approved' || inq.status === 'completed'
                            ? 'text-emerald-400 border-emerald-500/50'
                            : 'text-rose-400 border-rose-500/50'
                        }`}
                      >
                        <option value="pending" className="bg-[#1e293b] text-amber-400 font-bold py-2">PENDING</option>
                        <option value="approved" className="bg-[#1e293b] text-emerald-400 font-bold py-2">APPROVED</option>
                        <option value="completed" className="bg-[#1e293b] text-emerald-400 font-bold py-2">COMPLETED</option>
                        <option value="rejected" className="bg-[#1e293b] text-rose-400 font-bold py-2">REJECTED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openDetailModal(inq)}>
                        Inspect RFQ
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:bg-error/10"
                        onClick={() => handleDeleteRfq(inq.id, inq.company_name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                    No RFQ inquiries found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`RFQ Inquiry #${selectedInquiry.id} — ${selectedInquiry.company_name}`}
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-surface-container-high p-4 rounded-xs text-xs">
              <div>
                <span className="text-on-surface-variant block uppercase font-label-caps">Business Email</span>
                <span className="font-mono font-bold text-on-surface">{selectedInquiry.business_email}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block uppercase font-label-caps">Industry Segment</span>
                <span className="font-bold text-on-surface">{selectedInquiry.industry_segment}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block uppercase font-label-caps">Estimated Monthly Volume</span>
                <span className="font-mono text-primary font-bold">{selectedInquiry.monthly_volume}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block uppercase font-label-caps">Current Status</span>
                <Badge variant={selectedInquiry.status === 'pending' ? 'warning' : 'success'}>
                  {selectedInquiry.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                Requested Products & Volumes
              </h4>
              <div className="bg-surface-container industrial-border rounded-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-high border-b border-outline-variant text-primary font-label-caps">
                    <tr>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Size</th>
                      <th className="p-3 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/40">
                    {selectedInquiry.items && selectedInquiry.items.length > 0 ? (
                      selectedInquiry.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-on-surface">{item.product_title || `Product #${item.product_id}`}</td>
                          <td className="p-3 font-mono text-on-surface-variant">{item.sku || 'N/A'}</td>
                          <td className="p-3">{item.size_range}</td>
                          <td className="p-3 text-right font-mono font-bold text-primary">{item.quantity} units</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-on-surface-variant">Default RFQ Line Item (Bulk Custom Order)</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest">
                Custom Requirements & Notes
              </h4>
              <p className="p-3 bg-surface-container-high border border-outline-variant rounded-xs text-xs text-on-surface leading-relaxed">
                {selectedInquiry.detailed_requirements || 'No custom notes provided.'}
              </p>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-outline-variant">
              <Button
                variant="ghost"
                className="text-error hover:bg-error/10"
                onClick={() => handleDeleteRfq(selectedInquiry.id, selectedInquiry.company_name)}
              >
                Delete RFQ
              </Button>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close Window
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminInquiries;
