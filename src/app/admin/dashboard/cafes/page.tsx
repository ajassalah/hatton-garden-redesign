'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CafeForm from '@/components/CafeForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import BinModal from '@/components/admin/BinModal';
import { 
  Coffee, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Trash
} from 'lucide-react';

interface Cafe {
  slug: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  rating: number;
  reviewsCount: number;
  openingTimes: string;
  image: string;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  longDescription: string;
}

export default function CafesManagement() {
  const router = useRouter();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBinOpen, setIsBinOpen] = useState(false);
  const [editingCafe, setEditingCafe] = useState<Cafe | null>(null);
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
    if (token) {
      fetchCafes(token);
    }
  }, []);

  useEffect(() => {
    filterCafes();
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, cafes]);

  const fetchCafes = async (token: string) => {
    try {
      const response = await fetch('/api/admin/cafes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setCafes(data.data || []);
      setFilteredCafes(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cafes:', error);
      setLoading(false);
    }
  };

  const filterCafes = () => {
    let filtered = [...cafes];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => 
        c.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.category.toLowerCase().includes(search)
      );
    }

    setFilteredCafes(filtered);
  };

  const totalPages = Math.ceil(filteredCafes.length / itemsPerPage);
  const currentItems = filteredCafes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingCafe(null);
    setIsFormOpen(true);
  };

  const handleEdit = (cafe: Cafe) => {
    setFormMode('edit');
    setEditingCafe(cafe);
    setIsFormOpen(true);
  };

  const handleDelete = (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move to Bin?',
      message: 'Are you sure you want to move this venue to the recycle bin? You can restore it later.',
      variant: 'warning',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const response = await fetch(`/api/admin/cafes/${slug}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setCafes(cafes.filter(c => c.slug !== slug));
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: 'Venue moved to bin successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete venue.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleFormSubmit = async (data: any) => {
    const token = localStorage.getItem('admin_token');
    const url = formMode === 'create' 
      ? '/api/admin/cafes'
      : `/api/admin/cafes/${editingCafe?.slug}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';

    setConfirmModal({
      isOpen: true,
      title: 'Save Changes?',
      message: `Are you sure you want to ${formMode === 'create' ? 'create' : 'update'} this venue?`,
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
              setCafes([...cafes, result.data]);
            } else {
              setCafes(cafes.map(c => 
                c.slug === editingCafe?.slug ? result.data : c
              ));
            }
            setIsFormOpen(false);
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: `Venue ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to save venue.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleRestore = async (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Restore Venue?',
      message: 'This will bring the venue back to your active listings.',
      variant: 'info',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/cafes/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'restore', slug })
          });

          if (response.ok) {
            fetchCafes(localStorage.getItem('admin_token') || '');
            setStatusModal({
              isOpen: true,
              title: 'Restored',
              message: 'Venue restored successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          console.error('Restore failed:', error);
        }
      }
    });
  };

  const handleDeletePermanent = async (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Permanently?',
      message: 'This action cannot be undone. Are you sure?',
      variant: 'danger',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/cafes/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', slug })
          });

          if (response.ok) {
            setStatusModal({
              isOpen: true,
              title: 'Deleted',
              message: 'Venue permanently deleted.',
              type: 'success'
            });
          }
        } catch (error) {
          console.error('Permanent delete failed:', error);
        }
      }
    });
  };

  const categories = ['all', 'café', 'pub', 'restaurant', 'bistro', 'wine bar'];

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8 uppercase tracking-tight">Manage Cafes & Dining</h1>
            <p className="text-gray-400 text-sm mt-4">View and manage all cafe and restaurant listings</p>
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
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl border border-red-500/20 transition-all group text-sm"
              >
                <Trash className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Bin</span>
             </button>

             <button 
                onClick={handleCreateNew}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-xl shadow-purple-500/20 transform hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                <Plus className="w-5 h-5" />
                Add New Venue
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
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Coffee className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Venues</p>
            <p className="text-4xl font-black text-white">{cafes.length}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Star className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Average Rating</p>
            <p className="text-4xl font-black text-white">4.6</p>
          </div>
        </div>

        {/* Cafes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((cafe) => (
            <div
              key={cafe.slug}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all group flex flex-col h-full"
            >
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                {cafe.image ? (
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    className="w-full h-full object-contain p-4 bg-white transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <Coffee className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300 z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(cafe);
                    }}
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl transition-all"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cafe.slug);
                    }}
                    className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl shadow-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <div className="flex items-center gap-1 bg-yellow-500 px-2 py-0.5 rounded text-black text-[10px] font-black w-fit">
                    <Star className="w-3 h-3 fill-black" />
                    <span>{cafe.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-purple-400 transition-colors">{cafe.name}</h3>
                  <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em]">{cafe.category}</p>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic font-serif leading-relaxed flex-1">"{cafe.description}"</p>

                <div className="space-y-3 text-sm pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><MapPin className="w-3.5 h-3.5" /></div>
                    <span className="line-clamp-1">{cafe.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><Phone className="w-3.5 h-3.5" /></div>
                    <span>{cafe.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><Clock className="w-3.5 h-3.5" /></div>
                    <span>{cafe.openingTimes}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{cafe.reviewsCount} reviews</span>
                  <a
                    href={cafe.website}
                    target="_blank"
                    className="text-white hover:text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group/link"
                  >
                    Visit Website <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCafes.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Coffee className="w-20 h-20 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-xl font-light italic font-serif">No venues found in our records...</p>
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

      <CafeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCafe}
        mode={formMode}
      />

      <BinModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        onRestore={handleRestore}
        onDeletePermanent={handleDeletePermanent}
        type="cafes"
        endpoint="/api/admin/cafes/trash"
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



