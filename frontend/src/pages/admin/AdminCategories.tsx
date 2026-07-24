import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { AdminCategoryService, AdminCategoryItem } from '@/services/adminCategoryService';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<AdminCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategoryItem | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagName, setTagName] = useState('Standard Equipment');
  const [parentId, setParentId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await AdminCategoryService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (err: unknown) {
      console.warn('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setTagName('Standard Equipment');
    setParentId('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setTagName(cat.tag_name);
    setParentId(cat.parent_id ? String(cat.parent_id) : '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg('Category Name is required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const payload = {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tag_name: tagName,
        parent_id: parentId ? parseInt(parentId) : null,
      };

      if (editingCategory) {
        const res = await AdminCategoryService.updateCategory(editingCategory.id, payload);
        if (res.success) {
          fetchCategories();
          setIsModalOpen(false);
        } else {
          setErrorMsg(res.message || 'Failed to update category.');
        }
      } else {
        const res = await AdminCategoryService.createCategory(payload);
        if (res.success) {
          fetchCategories();
          setIsModalOpen(false);
        } else {
          setErrorMsg(res.message || 'Failed to create category.');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Category operation failed.';
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await AdminCategoryService.deleteCategory(id);
      if (res.success) {
        fetchCategories();
      } else {
        alert(res.message || 'Failed to delete category.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed.';
      alert(msg);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-display-lg text-3xl font-extrabold text-on-surface">Category Divisions Management</h1>
          <p className="font-body-sm text-on-surface-variant">Create and organize product categories. Changes apply dynamically across the catalog.</p>
        </div>
        <Button variant="primary" size="md" onClick={openCreateModal}>
          + Create New Category
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
                <th className="py-4 px-6">Category Name</th>
                <th className="py-4 px-6">URL Slug</th>
                <th className="py-4 px-6">Tag Name</th>
                <th className="py-4 px-6">Parent Category</th>
                <th className="py-4 px-6">Assigned Products</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {categories.length > 0 ? (
                categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-4 px-6 font-bold text-on-surface">{cat.name}</td>
                    <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">{cat.slug}</td>
                    <td className="py-4 px-6 font-label-caps text-xs text-primary">{cat.tag_name}</td>
                    <td className="py-4 px-6 text-on-surface-variant">{cat.parent_name || 'None (Top Level)'}</td>
                    <td className="py-4 px-6">
                      <Badge variant="neutral">{cat.product_count || 0} Products</Badge>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(cat)}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:bg-error/10"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    No categories found. Click "+ Create New Category" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Category Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category Division' : 'Create New Category Division'}
        className="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-error/10 border border-error/40 text-error rounded-xs text-xs">
              {errorMsg}
            </div>
          )}

          <Input
            label="Category Name *"
            placeholder="e.g. Industrial Helmets"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <Input
            label="URL Slug"
            placeholder="e.g. industrial-helmets (auto-generated if empty)"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />

          <Input
            label="Tag Name / Badge"
            placeholder="e.g. Head Protection System"
            value={tagName}
            onChange={e => setTagName(e.target.value)}
          />

          <div className="space-y-1">
            <label className="font-label-caps text-xs text-on-surface-variant uppercase">
              Parent Category (Optional)
            </label>
            <select
              value={parentId}
              onChange={e => setParentId(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xs px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
            >
              <option value="">None (Top-Level Category)</option>
              {categories
                .filter(c => !editingCategory || c.id !== editingCategory.id)
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSaving}>
              {editingCategory ? 'Save Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
