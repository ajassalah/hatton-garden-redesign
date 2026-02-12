'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import BinModal from '@/components/admin/BinModal';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Shield,
  Mail,
  Calendar,
  Trash,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
}

export default function UsersManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBinOpen, setIsBinOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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

    fetchUsers(token);
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_token');
          router.push('/admin');
        }
        return;
      }

      const result = await response.json();
      setUsers(result.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setFormMode('edit');
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (id === '1') {
      setStatusModal({
        isOpen: true,
        title: 'Action Denied',
        message: 'The main administrator cannot be deleted or moved to the bin.',
        type: 'error'
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Move to Bin?',
      message: 'Are you sure you want to move this user to the recycle bin? They will lose access immediately.',
      variant: 'warning',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const response = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setUsers(users.filter(u => u.id !== id));
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: 'User moved to bin successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to move user to bin.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleFormSubmit = async (data: any) => {
    const token = localStorage.getItem('admin_token');
    const url = formMode === 'create' 
      ? '/api/admin/users'
      : `/api/admin/users/${editingUser?.id}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';

    setConfirmModal({
      isOpen: true,
      title: 'Save Changes?',
      message: `Are you sure you want to ${formMode === 'create' ? 'create' : 'update'} this user?`,
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
              setUsers([...users, result.data]);
            } else {
              setUsers(users.map(u => 
                u.id === editingUser?.id ? result.data : u
              ));
            }
            setIsFormOpen(false);
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: `User ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
              type: 'success'
            });
          } else {
             const errorData = await response.json();
             setStatusModal({
              isOpen: true,
              title: 'Error',
              message: errorData.error || 'Failed to save user.',
              type: 'error'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'An unexpected error occurred.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleRestore = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Restore User?',
      message: 'This will grant the user access to the admin panel again.',
      variant: 'info',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/users/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'restore', id })
          });

          if (response.ok) {
            fetchUsers(localStorage.getItem('admin_token') || '');
            setStatusModal({
              isOpen: true,
              title: 'Restored',
              message: 'User restored successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          console.error('Restore failed:', error);
        }
      }
    });
  };

  const handleDeletePermanent = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Permanently?',
      message: 'This action cannot be undone. All user data will be lost.',
      variant: 'danger',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/users/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', id })
          });

          if (response.ok) {
            setStatusModal({
              isOpen: true,
              title: 'Deleted',
              message: 'User permanently deleted.',
              type: 'success'
            });
          }
        } catch (error) {
          console.error('Permanent delete failed:', error);
        }
      }
    });
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
            <h1 className="text-4xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8">User Management</h1>
            <p className="text-gray-400">Manage admin users and permissions</p>
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
                Add New User
             </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Users className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Users</p>
            <p className="text-3xl font-black text-white">{users.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Active</p>
            <p className="text-3xl font-black text-white">{users.filter(u => u.status === 'Active').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <XCircle className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Inactive</p>
            <p className="text-3xl font-black text-white">{users.filter(u => u.status !== 'Active').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Shield className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Super Admins</p>
            <p className="text-3xl font-black text-white">{users.filter(u => u.role === 'Super Admin').length}</p>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((user) => (
            <div
              key={user.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all group flex flex-col h-full"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                   <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <Users className="w-6 h-6 text-purple-400" />
                   </div>
                   <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl transition-all"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className={`p-2.5 rounded-xl shadow-xl transition-all ${user.id === '1' ? 'bg-gray-500 opacity-50 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                      disabled={user.id === '1'}
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-purple-400 transition-colors">{user.username}</h3>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em]">{user.role}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><Mail className="w-3.5 h-3.5" /></div>
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="p-1.5 bg-white/5 rounded-lg"><Calendar className="w-3.5 h-3.5" /></div>
                    <span>Added: {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={user.status === 'Active' ? 'text-green-400' : 'text-red-400'}>{user.status}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Users className="w-20 h-20 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-xl font-light italic font-serif">No users found in our records...</p>
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

      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        mode={formMode}
      />

      <BinModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        onRestore={handleRestore}
        onDeletePermanent={handleDeletePermanent}
        type="users"
        endpoint="/api/admin/users/trash"
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
