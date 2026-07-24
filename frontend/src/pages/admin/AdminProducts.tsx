import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Loader } from '@/components/ui/Loader';
import { ProductService } from '@/services/productService';
import { AdminProductService } from '@/services/adminProductService';
import { AdminCategoryService, AdminCategoryItem } from '@/services/adminCategoryService';
import { ProductCardData } from '@/components/product/ProductCard';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [categories, setCategories] = useState<AdminCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductCardData | null>(null);

  // Form Fields
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('45.00');
  const [moq, setMoq] = useState('50');
  const [stockStatus, setStockStatus] = useState('IN STOCK');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        ProductService.getProducts(),
        AdminCategoryService.getCategories(),
      ]);

      if (catRes && catRes.success && catRes.data) {
        setCategories(catRes.data);
        if (catRes.data.length > 0 && !categoryId) {
          setCategoryId(String(catRes.data[0].id));
        }
      }

      if (prodRes && prodRes.success && prodRes.data) {
        setProducts(prodRes.data);
      }
    } catch (err: unknown) {
      console.warn('API error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setSku('');
    setTitle('');
    setSlug('');
    setPrice('45.00');
    setMoq('50');
    setStockStatus('IN STOCK');
    setDescription('');
    setSelectedFiles(null);
    setErrorMsg('');
    if (categories.length > 0) {
      setCategoryId(String(categories[0].id));
    }
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductCardData) => {
    setEditingProduct(product);
    setSku(product.sku);
    setTitle(product.title);
    setSlug(product.slug);
    setPrice(String(product.price));
    setMoq(String(product.moq));
    setStockStatus(product.stockStatus || 'IN STOCK');
    setDescription(product.description || 'Product specification & engineering notes.');
    setSelectedFiles(null);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sku) {
      setErrorMsg('Product Title and SKU are required.');
      return;
    }
    if (parseInt(moq) < 50) {
      setErrorMsg('Minimum Order Quantity (MOQ) must be at least 50 units.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('sku', sku);
      formData.append('title', title);
      formData.append('slug', slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      formData.append('category_id', categoryId || '1');
      formData.append('price', price);
      formData.append('moq', moq);
      formData.append('stock_status', stockStatus);
      formData.append('description', description || title);

      // Append selected files if uploaded by admin
      if (selectedFiles && selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      }

      if (editingProduct) {
        await AdminProductService.updateProduct(editingProduct.id, formData);
      } else {
        await AdminProductService.createProduct(formData);
      }

      fetchData();
      setIsModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save failed.';
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await AdminProductService.deleteProduct(id);
      fetchData();
    } catch (err: unknown) {
      console.warn('API delete error:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">Products Inventory Management</h1>
          <p className="font-body-sm text-on-surface-variant">Create, update, and manage product SKUs, stock levels, and category assignments.</p>
        </div>
        <Button variant="primary" size="md" onClick={openCreateModal}>
          + Create Product
        </Button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="bg-surface-container industrial-border rounded-sm overflow-hidden shadow-xl">
          <table className="w-full text-left font-body-sm text-sm">
            <thead className="bg-surface-container-high border-b border-outline-variant font-label-caps text-xs text-primary uppercase">
              <tr>
                <th className="py-4 px-6">SKU</th>
                <th className="py-4 px-6">Product Title</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">MOQ</th>
                <th className="py-4 px-6">Stock Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {products.length > 0 ? (
                products.map(prod => (
                  <tr key={prod.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-on-surface">{prod.sku}</td>
                    <td className="py-4 px-6 font-bold text-on-surface">{prod.title}</td>
                    <td className="py-4 px-6 font-mono font-bold text-primary">${Number(prod.price).toFixed(2)}</td>
                    <td className="py-4 px-6 font-mono text-xs">{prod.moq} units</td>
                    <td className="py-4 px-6">
                      <Badge variant={prod.stockStatus === 'IN STOCK' ? 'success' : 'warning'}>
                        {prod.stockStatus || 'IN STOCK'}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(prod)}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:bg-error/10"
                        onClick={() => handleDeleteProduct(prod.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    No products found in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-error/10 border border-error/40 text-error rounded-xs text-xs">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="SKU *" value={sku} onChange={e => setSku(e.target.value)} required />
            <div className="space-y-1">
              <label className="font-label-caps text-xs text-on-surface-variant uppercase">
                Category Division *
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xs px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input label="Product Title *" value={title} onChange={e => setTitle(e.target.value)} required />
          <Input label="URL Slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Auto-generated from title if blank" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Wholesale Price ($) *" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
            <Input label="MOQ (Min 50) *" type="number" min={50} value={moq} onChange={e => setMoq(e.target.value)} required />
            <Select
              label="Stock Status *"
              value={stockStatus}
              onChange={e => setStockStatus(e.target.value)}
              options={[
                { value: 'IN STOCK', label: 'IN STOCK' },
                { value: 'LIMITED STOCK', label: 'LIMITED STOCK' },
                { value: 'OUT OF STOCK', label: 'OUT OF STOCK' },
              ]}
            />
          </div>

          <Textarea label="Description *" value={description} onChange={e => setDescription(e.target.value)} rows={3} />

          <div className="space-y-1">
            <label className="font-label-caps text-xs text-on-surface-variant uppercase">
              Upload Product Images (Multer Upload)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => setSelectedFiles(e.target.files)}
              className="w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:bg-surface-container-high file:text-primary hover:file:bg-surface-variant cursor-pointer"
            />
            {selectedFiles && selectedFiles.length > 0 && (
              <span className="text-[11px] text-emerald-400 font-mono block pt-1">
                ✓ {selectedFiles.length} file(s) selected for upload
              </span>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSaving}>
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProducts;
