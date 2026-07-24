import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface ProductItem {
  id: number;
  sku: string;
  title: string;
  slug: string;
  categoryId: number;
  price: number;
  moq: number;
  stockStatus: string;
}

const MOCK_ADMIN_PRODUCTS: ProductItem[] = [
  { id: 1, sku: 'GSH-WG-001', title: 'GSH Elite Industrial Working Gloves', slug: 'gsh-elite-industrial-gloves', categoryId: 1, price: 45.00, moq: 50, stockStatus: 'IN STOCK' },
  { id: 2, sku: 'GSH-AG-002', title: 'TitanShield Precision Assembly Gloves', slug: 'titanshield-assembly-gloves', categoryId: 2, price: 32.50, moq: 100, stockStatus: 'IN STOCK' },
  { id: 3, sku: 'GSH-WG-003', title: 'Vulcan Heat-Resistant Heavy Welding Gloves', slug: 'vulcan-welding-gloves', categoryId: 3, price: 58.00, moq: 50, stockStatus: 'IN STOCK' },
  { id: 4, sku: 'GSH-SV-004', title: 'Pro-Vis Class 2 High-Visibility Safety Vest', slug: 'pro-vis-safety-vest-class2', categoryId: 4, price: 24.00, moq: 50, stockStatus: 'IN STOCK' },
  { id: 5, sku: 'GSH-FW-005', title: 'IronStride Anti-Puncture Steel Toe Boots', slug: 'ironstride-steel-toe-boots', categoryId: 5, price: 68.00, moq: 20, stockStatus: 'LIMITED STOCK' },
];

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(MOCK_ADMIN_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form Fields
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [price, setPrice] = useState('45.00');
  const [moq, setMoq] = useState('50');
  const [description, setDescription] = useState('');

  const openCreateModal = () => {
    setEditingProduct(null);
    setSku('');
    setTitle('');
    setSlug('');
    setCategoryId('1');
    setPrice('45.00');
    setMoq('50');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setSku(product.sku);
    setTitle(product.title);
    setSlug(product.slug);
    setCategoryId(String(product.categoryId));
    setPrice(String(product.price));
    setMoq(String(product.moq));
    setDescription('Existing product details...');
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProduct.id
            ? { ...p, sku, title, slug, price: parseFloat(price), moq: parseInt(moq) }
            : p
        )
      );
    } else {
      const newId = Date.now();
      setProducts(prev => [
        ...prev,
        {
          id: newId,
          sku,
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          categoryId: parseInt(categoryId),
          price: parseFloat(price),
          moq: parseInt(moq),
          stockStatus: 'IN STOCK',
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">Products Inventory CRUD</h1>
          <p className="font-body-sm text-on-surface-variant">Manage product listings, specifications, and media uploads.</p>
        </div>
        <Button variant="primary" size="md" onClick={openCreateModal}>
          + Create Product
        </Button>
      </div>

      {/* Products Data Table */}
      <div className="bg-surface-container industrial-border rounded-sm overflow-hidden shadow-xl">
        <table className="w-full text-left font-body-sm text-sm">
          <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
            <tr>
              <th className="py-4 px-6">SKU</th>
              <th className="py-4 px-6">Product Title</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">MOQ</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {products.map(prod => (
              <tr key={prod.id} className="hover:bg-surface-container-high transition-colors">
                <td className="py-4 px-6 font-mono text-xs font-bold text-on-surface">{prod.sku}</td>
                <td className="py-4 px-6 font-bold text-on-surface">{prod.title}</td>
                <td className="py-4 px-6 font-mono font-bold text-primary">${prod.price.toFixed(2)}</td>
                <td className="py-4 px-6">{prod.moq} units</td>
                <td className="py-4 px-6">
                  <Badge variant={prod.stockStatus === 'IN STOCK' ? 'success' : 'warning'}>
                    {prod.stockStatus}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(prod)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error hover:bg-error/10" onClick={() => handleDeleteProduct(prod.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PRODUCT FORM MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="SKU *" value={sku} onChange={e => setSku(e.target.value)} required />
            <Select
              label="Category"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              options={[
                { value: '1', label: 'Working Gloves' },
                { value: '2', label: 'Assembly Gloves' },
                { value: '3', label: 'Welding Gloves' },
                { value: '4', label: 'Workwear & Safety Wear' },
              ]}
            />
          </div>

          <Input label="Product Title *" value={title} onChange={e => setTitle(e.target.value)} required />
          <Input label="URL Slug *" value={slug} onChange={e => setSlug(e.target.value)} required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Wholesale Price ($) *" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
            <Input label="MOQ (Units) *" type="number" value={moq} onChange={e => setMoq(e.target.value)} required />
          </div>

          <Textarea label="Description *" value={description} onChange={e => setDescription(e.target.value)} rows={3} />

          <div className="space-y-1">
            <label className="font-label-caps text-xs text-on-surface-variant uppercase">
              Product Image Upload (Multer)
            </label>
            <input type="file" multiple className="w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:bg-surface-container-high file:text-primary hover:file:bg-surface-variant" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProducts;
