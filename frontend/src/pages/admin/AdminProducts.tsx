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

const ALL_SIZES_LIST = [
  { label: 'Small (S)', code: 'S' },
  { label: 'Medium (M)', code: 'M' },
  { label: 'Large (L)', code: 'L' },
  { label: 'Extra Large (XL)', code: 'XL' },
  { label: 'Double XL (XXL)', code: 'XXL' },
];

const getImageUrl = (url?: string) => {
  if (!url) return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

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
  const [isFeatured, setIsFeatured] = useState(false);

  // Interactive Size Availability Checkboxes
  const [checkedSizeCodes, setCheckedSizeCodes] = useState<string[]>(['S', 'M', 'L', 'XL']);

  // Media State: Existing database images + Newly uploaded files
  const [existingImages, setExistingImages] = useState<Array<{ url: string; is_primary: boolean; size_code: string }>>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileSizeCodes, setFileSizeCodes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        ProductService.getProducts({ limit: 50 }),
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

  const toggleSizeCheckbox = (code: string) => {
    if (checkedSizeCodes.includes(code)) {
      if (checkedSizeCodes.length === 1) {
        alert('At least one size must remain selected.');
        return;
      }
      setCheckedSizeCodes(checkedSizeCodes.filter(c => c !== code));
    } else {
      setCheckedSizeCodes([...checkedSizeCodes, code]);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setSku('');
    setTitle('');
    setSlug('');
    setPrice('45.00');
    setMoq('50');
    setStockStatus('IN STOCK');
    setCheckedSizeCodes(['S', 'M', 'L', 'XL']);
    setDescription('');
    setIsFeatured(false);
    setExistingImages([]);
    setSelectedFiles([]);
    setFileSizeCodes([]);
    setErrorMsg('');
    if (categories.length > 0) {
      setCategoryId(String(categories[0].id));
    }
    setIsModalOpen(true);
  };

  const openEditModal = async (product: ProductCardData) => {
    setEditingProduct(product);
    setSku(product.sku);
    setTitle(product.title);
    setSlug(product.slug);
    setPrice(String(product.price));
    setMoq(String(product.moq));
    setStockStatus(product.stockStatus || 'IN STOCK');
    setCheckedSizeCodes(['S', 'M', 'L', 'XL']);
    setDescription(product.description || '');
    setIsFeatured(Boolean(product.isFeatured || (product as any).is_featured));
    setExistingImages([]);
    setSelectedFiles([]);
    setFileSizeCodes([]);
    setErrorMsg('');
    setIsModalOpen(true);

    // Fetch full details including existing gallery images and size options
    try {
      const res = await ProductService.getProductBySlug(product.slug);
      if (res.success && res.data) {
        const detail = res.data;
        setDescription(detail.description || '');
        setIsFeatured(Boolean(detail.isFeatured || (detail as any).is_featured));

        // Parse checked size codes from size_options
        const sizeOptStr = detail.size_options || detail.sizeOptions || '';
        const codes: string[] = [];
        if (sizeOptStr.includes('(S)') || sizeOptStr.includes('Small')) codes.push('S');
        if (sizeOptStr.includes('(M)') || sizeOptStr.includes('Medium')) codes.push('M');
        if (sizeOptStr.includes('(L)') || sizeOptStr.includes('Large')) codes.push('L');
        if (sizeOptStr.includes('(XL)') || sizeOptStr.includes('Extra Large')) codes.push('XL');
        if (sizeOptStr.includes('(XXL)') || sizeOptStr.includes('Double XL')) codes.push('XXL');
        setCheckedSizeCodes(codes.length > 0 ? codes : ['S', 'M', 'L', 'XL']);

        // Load existing gallery images
        if (detail.gallery && detail.gallery.length > 0) {
          setExistingImages(detail.gallery.map(g => ({
            url: g.url,
            is_primary: g.is_primary || false,
            size_code: g.size_code || 'GENERAL',
          })));
        } else if (detail.primaryImage) {
          setExistingImages([{
            url: detail.primaryImage,
            is_primary: true,
            size_code: 'GENERAL',
          }]);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch product details for edit:', err);
    }
  };

  const totalImageCount = existingImages.length + selectedFiles.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    
    // Strict limit of maximum 4 images total (existing + new)
    const availableSlots = 4 - existingImages.length;
    if (availableSlots <= 0) {
      alert('Maximum 4 product photos reached. Remove existing photos first to add new ones.');
      e.target.value = '';
      return;
    }

    if (newFiles.length > availableSlots) {
      alert(`Only ${availableSlots} more photo(s) can be added (Maximum 4 allowed). Extra images trimmed.`);
    }
    
    const cappedNewFiles = newFiles.slice(0, availableSlots);
    const combinedFiles = [...selectedFiles, ...cappedNewFiles];
    setSelectedFiles(combinedFiles);
    
    const newCodes = cappedNewFiles.map(() => 'GENERAL');
    setFileSizeCodes([...fileSizeCodes, ...newCodes]);
    
    e.target.value = '';
  };

  const removeExistingImage = (indexToRemove: number) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== indexToRemove));
  };

  const updateExistingImageSizeCode = (index: number, newCode: string) => {
    const updated = [...existingImages];
    updated[index].size_code = newCode;
    setExistingImages(updated);
  };

  const removeNewFile = (indexToRemove: number) => {
    setSelectedFiles(selectedFiles.filter((_, idx) => idx !== indexToRemove));
    setFileSizeCodes(fileSizeCodes.filter((_, idx) => idx !== indexToRemove));
  };

  const handleNewSizeCodeChange = (index: number, value: string) => {
    const updated = [...fileSizeCodes];
    updated[index] = value;
    setFileSizeCodes(updated);
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
      formData.append('is_featured', isFeatured ? '1' : '0');

      // Generate human readable size options string from checked checkboxes
      const activeSizeLabels = ALL_SIZES_LIST
        .filter(item => checkedSizeCodes.includes(item.code))
        .map(item => item.label);
      const sizeOptionsString = activeSizeLabels.join(', ');
      formData.append('size_options', sizeOptionsString || 'Assorted S/M/L/XL');

      formData.append('description', description || title);

      // Append kept existing images JSON
      formData.append('existing_images', JSON.stringify(existingImages));

      // Append size mappings for each newly uploaded file index
      const mappingsObj: Record<number, string> = {};
      fileSizeCodes.forEach((code, idx) => {
        if (code && code !== 'GENERAL') {
          mappingsObj[idx] = code;
        }
      });
      formData.append('size_mappings', JSON.stringify(mappingsObj));

      // Append selected new photo files
      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formData.append('images', file);
        });
      }

      if (editingProduct) {
        await AdminProductService.updateProduct(editingProduct.id, formData);
      } else {
        await AdminProductService.createProduct(formData);
      }

      await fetchData();
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
          <p className="font-body-sm text-on-surface-variant">Configure product catalog, toggle featured Home page status, check size availability, and manage inventory.</p>
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
                products.map(prod => {
                  const isProdFeatured = Boolean(prod.isFeatured || (prod as any).is_featured);
                  return (
                    <tr key={prod.id} className="hover:bg-surface-container-high transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-on-surface">{prod.sku}</td>
                      <td className="py-4 px-6 font-bold text-on-surface">
                        <div className="flex items-center gap-2">
                          <span>{prod.title}</span>
                          {isProdFeatured && (
                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold rounded-xs">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </td>
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
                  );
                })
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
        className="max-w-3xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-5">
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

          {/* ⭐ Feature Product Checkbox */}
          <div className="bg-surface-container-high border border-outline-variant p-4 rounded-xs">
            <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-on-surface">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-primary font-bold">
                ⭐ Feature this Product on Home Page (Display in Featured PPE Gear section)
              </span>
            </label>
          </div>

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

          {/* Interactive Size Availability Checkboxes */}
          <div className="bg-surface-container-high border border-outline-variant p-4 rounded-xs space-y-3">
            <label className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider block">
              ☑️ Size Availability Checkboxes (Select Available Product Sizes)
            </label>
            <p className="text-[11px] text-on-surface-variant">
              Check all sizes currently in stock for this product. Uploaded photos below can ONLY be assigned to sizes that are checked here!
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              {ALL_SIZES_LIST.map(item => (
                <label key={item.code} className="flex items-center gap-2 cursor-pointer text-xs font-mono text-on-surface bg-surface-container px-3 py-2 border border-outline-variant/60 rounded-xs hover:border-primary/50">
                  <input
                    type="checkbox"
                    checked={checkedSizeCodes.includes(item.code)}
                    onChange={() => toggleSizeCheckbox(item.code)}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Textarea label="Description *" value={description} onChange={e => setDescription(e.target.value)} rows={3} />

          {/* Multi-Image Gallery Manager */}
          <div className="bg-surface-container-high border border-outline-variant p-4 rounded-xs space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider block">
                  📸 Product Photos Gallery ({totalImageCount} / 4 Max Photos)
                </label>
                {totalImageCount >= 4 ? (
                  <span className="text-[11px] text-amber-400 font-mono font-bold">
                    ⚠️ Maximum 4 Photos Limit Reached
                  </span>
                ) : (
                  totalImageCount > 0 && (
                    <span className="text-[11px] text-emerald-400 font-mono font-bold">
                      ✓ {totalImageCount} Image(s) Attached
                    </span>
                  )
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Manage existing database photos and add new images (max 4 photos total). Assign each photo to a size category or General.
              </p>
            </div>

            {/* Render Existing Database Photos if editing */}
            {existingImages.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-primary block">
                  Current Database Photos ({existingImages.length} Existing):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {existingImages.map((img, idx) => (
                    <div key={`existing-${idx}`} className="bg-surface-container p-3 border border-outline-variant/60 rounded-xs flex items-center justify-between gap-3 text-xs shadow-sm">
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={getImageUrl(img.url)}
                          alt={`Existing ${idx + 1}`}
                          className="w-12 h-12 object-cover rounded-xs border border-outline-variant shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-bold text-on-surface block truncate">
                            {img.is_primary ? '★ Primary Photo' : `Photo ${idx + 1}`}
                          </span>
                          <span className="text-emerald-400 text-[10px] font-mono block">Saved in Database</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <select
                          value={img.size_code || 'GENERAL'}
                          onChange={e => updateExistingImageSizeCode(idx, e.target.value)}
                          className="bg-surface-container-high border border-outline-variant rounded-xs px-2 py-1 text-xs text-on-surface focus:border-primary focus:outline-none"
                        >
                          <option value="GENERAL">General (All Sizes)</option>
                          {ALL_SIZES_LIST.filter(item => checkedSizeCodes.includes(item.code)).map(item => (
                            <option key={item.code} value={item.code}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(idx)}
                          className="text-[10px] text-error hover:underline font-mono"
                        >
                          ✖ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Input for Uploading New Photos */}
            <div className="pt-2">
              <label className="text-xs font-bold text-on-surface block mb-1">
                + Upload Additional / Replacement Photos:
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={totalImageCount >= 4}
                onChange={handleFileChange}
                className="w-full text-xs text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:bg-surface-container file:text-primary hover:file:bg-surface-variant cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Render Newly Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-outline-variant/60">
                <span className="text-xs font-bold text-emerald-400 block">
                  Newly Selected Photos ({selectedFiles.length} Pending Upload):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFiles.map((file, idx) => (
                    <div key={`new-${idx}`} className="bg-surface-container p-3 border border-outline-variant/60 rounded-xs flex items-center justify-between gap-3 text-xs shadow-sm">
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Preview ${idx + 1}`}
                          className="w-12 h-12 object-cover rounded-xs border border-outline-variant shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-bold text-primary block truncate">
                            {existingImages.length === 0 && idx === 0 ? '★ Primary Photo' : `New Photo ${idx + 1}`}
                          </span>
                          <span className="text-on-surface-variant text-[11px] truncate block">{file.name}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <select
                          value={fileSizeCodes[idx] || 'GENERAL'}
                          onChange={e => handleNewSizeCodeChange(idx, e.target.value)}
                          className="bg-surface-container-high border border-outline-variant rounded-xs px-2 py-1 text-xs text-on-surface focus:border-primary focus:outline-none"
                        >
                          <option value="GENERAL">General (All Sizes)</option>
                          {ALL_SIZES_LIST.filter(item => checkedSizeCodes.includes(item.code)).map(item => (
                            <option key={item.code} value={item.code}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeNewFile(idx)}
                          className="text-[10px] text-error hover:underline font-mono"
                        >
                          ✖ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clean Modal Action Buttons Footer */}
          <div className="pt-4 pb-1 flex items-center justify-end gap-3 border-t border-outline-variant/80 mt-6 sticky bottom-0 bg-surface-container">
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
