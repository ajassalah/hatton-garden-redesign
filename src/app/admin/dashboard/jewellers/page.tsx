'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JewellerForm from '@/components/JewellerForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import BinModal from '@/components/admin/BinModal';
import { 
  Gem, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Trash
} from 'lucide-react';

interface Jeweller {
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
  gallery?: string[];
}

export default function JewellersManagement() {
  const router = useRouter();
  const [jewellers, setJewellers] = useState<Jeweller[]>([]);
  const [filteredJewellers, setFilteredJewellers] = useState<Jeweller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBinOpen, setIsBinOpen] = useState(false);
  const [editingJeweller, setEditingJeweller] = useState<Jeweller | null>(null);
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

    fetchJewellers(token);
  }, [router]);

  useEffect(() => {
    filterJewellers();
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, jewellers]);

  const fetchJewellers = async (token: string) => {
    try {
      const response = await fetch('/api/admin/jewellers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        router.push('/admin');
        return;
      }

      const data = await response.json();
      setJewellers(data.data || []);
      setFilteredJewellers(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jewellers:', error);
      setLoading(false);
    }
  };

  const filterJewellers = () => {
    let filtered = [...jewellers];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(j => 
        j.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(j =>
        j.name.toLowerCase().includes(search) ||
        j.description.toLowerCase().includes(search) ||
        j.category.toLowerCase().includes(search)
      );
    }

    setFilteredJewellers(filtered);
  };

  const totalPages = Math.ceil(filteredJewellers.length / itemsPerPage);
  const currentItems = filteredJewellers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingJeweller(null);
    setIsFormOpen(true);
  };

  const handleEdit = (jeweller: Jeweller) => {
    setFormMode('edit');
    setEditingJeweller(jeweller);
    setIsFormOpen(true);
  };

  const handleDelete = (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move to Bin?',
      message: 'Are you sure you want to move this jeweller to the recycle bin? You can restore it later.',
      variant: 'warning',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const response = await fetch(`/api/admin/jewellers/${slug}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setJewellers(jewellers.filter(j => j.slug !== slug));
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: 'Jeweller moved to bin successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete jeweller.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleFormSubmit = async (data: any) => {
    const token = localStorage.getItem('admin_token');
    const url = formMode === 'create' 
      ? '/api/admin/jewellers'
      : `/api/admin/jewellers/${editingJeweller?.slug}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';

    setConfirmModal({
      isOpen: true,
      title: 'Save Changes?',
      message: `Are you sure you want to ${formMode === 'create' ? 'create' : 'update'} this jeweller?`,
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
              setJewellers([...jewellers, result.data]);
            } else {
              setJewellers(jewellers.map(j => 
                j.slug === editingJeweller?.slug ? result.data : j
              ));
            }
            setIsFormOpen(false);
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: `Jeweller ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to save jeweller.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleRestore = async (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Restore Jeweller?',
      message: 'This will bring the jeweller back to your active listings.',
      variant: 'info',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/jewellers/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'restore', slug })
          });

          if (response.ok) {
            fetchJewellers(localStorage.getItem('admin_token') || '');
            setStatusModal({
              isOpen: true,
              title: 'Restored',
              message: 'Jeweller restored successfully.',
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
          const response = await fetch('/api/admin/jewellers/trash', {
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
              message: 'Jeweller permanently deleted.',
              type: 'success'
            });
          }
        } catch (error) {
          console.error('Permanent delete failed:', error);
        }
      }
    });
  };

  const categories = ['all', 'diamonds', 'bespoke', 'fine jewellery', 'ethical', 'traditional'];

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
            <h1 className="text-4xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8">Manage Jewellers</h1>
            <p className="text-gray-400">View and manage all jeweller listings</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10 flex items-center justify-center min-w-[100px]"
              >
                Back
             </button>
             
             <button 
                onClick={() => setIsBinOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl border border-red-500/20 transition-all group"
              >
                <Trash className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Recycle Bin
             </button>

             <button 
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add New Jeweller
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
                placeholder="Search jewellers..."
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
               <Gem className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Jewellers</p>
            <p className="text-4xl font-black text-white">{jewellers.length}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Star className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Average Rating</p>
            <p className="text-4xl font-black text-white">4.7</p>
          </div>
        </div>

        {/* Jewellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((jeweller) => (
            <div
              key={jeweller.slug}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all group flex flex-col h-full"
            >
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                {jeweller.image ? (
                  <img
                    src={jeweller.image}
                    alt={jeweller.name}
                    className="w-full h-full object-contain p-4 bg-white transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <Gem className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button 
                    onClick={() => handleEdit(jeweller)}
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl transition-all"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={() => handleDelete(jeweller.slug)}
                    className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl shadow-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <div className="flex items-center gap-1 bg-yellow-500 px-2 py-0.5 rounded text-black text-[10px] font-black w-fit">
                    <Star className="w-3 h-3 fill-black" />
                    <span>{jeweller.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-purple-400 transition-colors">{jeweller.name}</h3>
                  <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em]">{jeweller.category}</p>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic font-serif leading-relaxed flex-1">"{jeweller.description}"</p>

                <div className="space-y-3 text-sm pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><MapPin className="w-3.5 h-3.5" /></div>
                    <span className="line-clamp-1">{jeweller.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><Phone className="w-3.5 h-3.5" /></div>
                    <span>{jeweller.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{jeweller.reviewsCount} reviews</span>
                  <a
                    href={`/jewellers/${jeweller.slug}`}
                    target="_blank"
                    className="text-white hover:text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group/link"
                  >
                    View Page <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJewellers.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Gem className="w-20 h-20 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-xl font-light italic font-serif">No jewellers found in our records...</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-white bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
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
              className="p-2 text-white bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        )}
      </div>

      <JewellerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingJeweller}
        mode={formMode}
      />

      <BinModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        onRestore={handleRestore}
        onDeletePermanent={handleDeletePermanent}
        type="jewellers"
        endpoint="/api/admin/jewellers/trash"
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



