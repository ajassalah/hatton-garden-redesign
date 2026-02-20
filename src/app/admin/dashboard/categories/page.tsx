'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/CategoryForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Tags,
  Gem,
  Coffee,
  FileText,
  Filter
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: 'jeweller' | 'cafe' | 'blog';
}

export default function CategoriesManagement() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
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
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchCategories(token);
  }, [router]);

  const fetchCategories = async (token: string) => {
    try {
      const response = await fetch('/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();
      setCategories(result.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || category.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentItems = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setFormMode('edit');
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Category?',
      message: 'Are you sure you want to delete this category? This will not affect existing items but they will no longer be grouped under this category.',
      variant: 'danger',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token') || '';
        try {
          const response = await fetch(`/api/admin/categories/${id}`, {
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
              message: 'Category deleted successfully.',
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
      ? '/api/admin/categories'
      : `/api/admin/categories/${editingCategory?.id}`;
    
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jeweller': return <Gem className="w-4 h-4 text-purple-400" />;
      case 'cafe': return <Coffee className="w-4 h-4 text-orange-400" />;
      case 'blog': return <FileText className="w-4 h-4 text-blue-400" />;
      default: return <Tags className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'jeweller': return 'Jewellers';
      case 'cafe': return 'Cafes & Dining';
      case 'blog': return 'Blog Posts';
      default: return 'Other';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8">Category Management</h1>
            <p className="text-gray-400">Manage categories for different sections of the platform</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 flex items-center justify-center min-w-[100px]"
              >
                Back
             </button>

             <button 
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add New Category
             </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-slate-800">All Sections</option>
                <option value="jeweller" className="bg-slate-800">Jewellers</option>
                <option value="cafe" className="bg-slate-800">Cafes & Dining</option>
                <option value="blog" className="bg-slate-800">Blog Posts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total</p>
            <p className="text-3xl font-black text-white">{categories.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Jeweller</p>
            <p className="text-3xl font-black text-white">{categories.filter(c => c.type === 'jeweller').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Cafe</p>
            <p className="text-3xl font-black text-white">{categories.filter(c => c.type === 'cafe').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Blog</p>
            <p className="text-3xl font-black text-white">{categories.filter(c => c.type === 'blog').length}</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {currentItems.map((category) => (
            <div
              key={category.id}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(category.type)}
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {getTypeLabel(category.type)}
                  </span>
                </div>
                <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="p-1.5 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Tags className="w-20 h-20 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-xl font-light italic font-serif">No categories found...</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-white bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all font-bold"
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-bold transition-all ${
                    currentPage === page 
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
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
              className="p-2 text-white bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <CategoryForm
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
    </div>
  );
}
