'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShopCategoryForm from '@/components/ShopCategoryForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import BinModal from '@/components/admin/BinModal';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Gem, 
  Watch, 
  Crown, 
  Gift, 
  Star, 
  Zap, 
  Award, 
  Diamond,
  Filter,
  Package,
  ArrowRight,
  Trash,
  X
} from 'lucide-react';
import Image from 'next/image';

const iconMap: any = {
  Heart, Sparkles, Gem, Watch, Crown, Gift, Star, Zap, Award, Diamond
};

interface ShopCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  count: string;
}

export default function ShopCategoriesManagement() {
  const router = useRouter();
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ShopCategory | null>(null);
  const [viewingCategory, setViewingCategory] = useState<ShopCategory | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  
  // Custom Alert/Confirm States
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'danger'
  });

  const [isBinOpen, setIsBinOpen] = useState(false);

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetchCategories(token);
    }
  }, []);

  useEffect(() => {
    const filtered = categories.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, categories]);

  const fetchCategories = async (token: string) => {
    try {
      const response = await fetch('/api/admin/shop-categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();
      setCategories(result.data || []);
      setFilteredCategories(result.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: ShopCategory) => {
    setFormMode('edit');
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleView = (category: ShopCategory) => {
    setViewingCategory(category);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move to Bin?',
      message: 'Are you sure you want to move this category to the recycle bin?',
      variant: 'warning',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token') || '';
        try {
          const response = await fetch(`/api/admin/shop-categories/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setCategories(categories.filter(c => c.id !== id));
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: 'Category moved to bin.',
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete category.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleFormSubmit = async (data: any) => {
    const token = localStorage.getItem('admin_token') || '';
    const url = formMode === 'create' 
      ? '/api/admin/shop-categories'
      : `/api/admin/shop-categories/${editingCategory?.id}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';

    setConfirmModal({
      isOpen: true,
      title: 'Save Changes?',
      message: `Are you sure you want to ${formMode === 'create' ? 'create' : 'update'} this category?`,
      variant: 'info',
      onConfirm: async () => {
        try {
          const response = await fetch(url, {
            method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            const result = await response.json();
            if (formMode === 'create') {
              setCategories([...categories, result.data]);
            } else {
              setCategories(categories.map(c => 
                c.id === editingCategory?.id ? result.data : c
              ));
            }
            setIsFormOpen(false);
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: `Category ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to save category.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleRestore = async (id: string) => {
    const token = localStorage.getItem('admin_token') || '';
    try {
      const response = await fetch('/api/admin/shop-categories/trash', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'restore', id })
      });

      if (response.ok) {
        fetchCategories(token);
        setStatusModal({
          isOpen: true,
          title: 'Success',
          message: 'Category restored successfully.',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error restoring category:', error);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const token = localStorage.getItem('admin_token') || '';
    try {
      const response = await fetch('/api/admin/shop-categories/trash', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'delete', id })
      });

      if (response.ok) {
        setStatusModal({
          isOpen: true,
          title: 'Deleted',
          message: 'Category permanently removed.',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error deleting category permanently:', error);
    }
  };

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentItems = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8 italic font-serif tracking-tight">
              Shop By Categories
            </h1>
            <p className="text-gray-400 font-light mt-4 text-sm">Manage categories shown on the public "Shop by Category" page</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
             <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
             </button>

             <button
                onClick={() => setIsBinOpen(true)}
                className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2 text-sm"
              >
                <Trash className="w-4 h-4" />
                <span>Bin</span>
             </button>

             <button 
                onClick={handleCreateNew}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-xl shadow-purple-500/20 transform hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                <Plus className="w-5 h-5" />
                Add Category
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex p-3 bg-purple-500/20 rounded-xl mb-4">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Categories</p>
              <p className="text-3xl font-black text-white">{categories.length}</p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex p-3 bg-emerald-500/20 rounded-xl mb-4">
                <ShoppingBag className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Active in Shop</p>
              <p className="text-3xl font-black text-white">{categories.length}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex p-3 bg-blue-500/20 rounded-xl mb-4">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">High Specialist Count</p>
              <p className="text-3xl font-black text-white">{categories.filter(c => c.count.includes('50+') || c.count.includes('60+')).length}</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
              >
                <option value="all" className="bg-slate-900">All Items</option>
                <option value="jeweller" className="bg-slate-900">Jeweller Shop</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentItems.map((cat) => {
              const Icon = iconMap[cat.icon] || ShoppingBag;
              return (
                <div 
                  key={cat.id} 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group shadow-lg hover:shadow-purple-500/10 transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 p-3 bg-purple-500/90 backdrop-blur-md rounded-xl text-white shadow-xl transform group-hover:rotate-12 transition-transform">
                      <Icon size={20} />
                    </div>

                    {/* Count Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {cat.count}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-purple-400 transition-colors leading-none">
                        {cat.name}
                      </h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(cat)} 
                          className="p-2.5 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl transition-all shadow-lg"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)} 
                          className="p-2.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all shadow-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2 mb-6 h-10">
                      {cat.description}
                    </p>
                    <button 
                      onClick={() => handleView(cat)}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 backdrop-blur-xl rounded-3xl border border-dashed border-white/10">
            <Package className="w-20 h-20 text-white/10 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2 italic font-serif">No categories found</h3>
            <p className="text-gray-500 font-light italic">Try adjusting your search terms...</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 mb-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-white/10 rounded-xl disabled:opacity-30 hover:bg-white/20 transition-all font-bold"
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${
                    currentPage === page 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-white/10 rounded-xl disabled:opacity-30 hover:bg-white/20 transition-all font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ShopCategoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
        mode={formMode}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
      />

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
        title={statusModal.title}
        message={statusModal.message}
        type={statusModal.type}
      />

      <BinModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        onRestore={handleRestore}
        onDeletePermanent={handlePermanentDelete}
        type="shop-categories"
        endpoint="/api/admin/shop-categories/trash"
      />

      {/* View Details Modal (Read-only) */}
      {isViewOpen && viewingCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-[10px] text-purple-400 font-bold tracking-[0.2em] mb-2 uppercase">Category Details</h3>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{viewingCategory.name}</h2>
                </div>
                <button 
                  onClick={() => setIsViewOpen(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3 block">Description</label>
                  <p className="text-gray-300 text-lg font-light leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                    "{viewingCategory.description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 block">Badge Count</label>
                    <p className="text-white font-bold">{viewingCategory.count}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 block">Icon Used</label>
                    <p className="text-white font-bold">{viewingCategory.icon}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
