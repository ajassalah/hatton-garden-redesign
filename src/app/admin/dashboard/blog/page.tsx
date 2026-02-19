'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusModal from '@/components/admin/StatusModal';
import BinModal from '@/components/admin/BinModal';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Calendar,
  Eye,
  Trash
} from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  hasFullArticle: boolean;
  views: number;
  status: 'published' | 'draft';
}

export default function BlogManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBinOpen, setIsBinOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
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
      fetchPosts(token);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchPosts = async (token: string) => {
    try {
      const response = await fetch('/api/admin/blog', {
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
      setPosts(result.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentItems = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    setFormMode('create');
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setFormMode('edit');
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move to Bin?',
      message: 'Are you sure you want to move this blog post to the recycle bin? You can restore it later.',
      variant: 'warning',
      onConfirm: async () => {
        const token = localStorage.getItem('admin_token');
        try {
          const response = await fetch(`/api/admin/blog/${slug}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setPosts(posts.filter(p => p.slug !== slug));
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: 'Blog post moved to bin successfully.',
              type: 'success'
            });
          }
        } catch (error) {
          setStatusModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete blog post.',
            type: 'error'
          });
        }
      }
    });
  };

  const handleFormSubmit = async (data: any) => {
    const token = localStorage.getItem('admin_token');
    const url = formMode === 'create' 
      ? '/api/admin/blog'
      : `/api/admin/blog/${editingPost?.slug}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';

    setConfirmModal({
      isOpen: true,
      title: 'Save Changes?',
      message: `Are you sure you want to ${formMode === 'create' ? 'create' : 'update'} this blog post?`,
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
              setPosts([...posts, result.data]);
            } else {
              setPosts(posts.map(p => 
                p.slug === editingPost?.slug ? result.data : p
              ));
            }
            setIsFormOpen(false);
            setStatusModal({
              isOpen: true,
              title: 'Success',
              message: `Blog post ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
              type: 'success'
            });
          } else {
             const errorData = await response.json();
             setStatusModal({
              isOpen: true,
              title: 'Error',
              message: errorData.error || 'Failed to save blog post.',
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

  const handleRestore = async (slug: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Restore Post?',
      message: 'This will bring the blog post back to your active listings.',
      variant: 'info',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/admin/blog/trash', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'restore', slug })
          });

          if (response.ok) {
            fetchPosts(localStorage.getItem('admin_token') || '');
            setStatusModal({
              isOpen: true,
              title: 'Restored',
              message: 'Blog post restored successfully.',
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
          const response = await fetch('/api/admin/blog/trash', {
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
              message: 'Blog post permanently deleted.',
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
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-8 uppercase tracking-tight">Blog Posts</h1>
            <p className="text-gray-400 text-sm mt-4">Create and manage blog content</p>
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
                Create New Post
             </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
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
               <FileText className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Posts</p>
            <p className="text-3xl font-black text-white">{posts.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Published</p>
            <p className="text-3xl font-black text-white">{posts.filter(p => p.status === 'published').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Drafts</p>
            <p className="text-3xl font-black text-white">{posts.filter(p => p.status === 'draft').length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Eye className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Views</p>
            <p className="text-3xl font-black text-white">{posts.reduce((sum, p) => sum + (p.views || 0), 0)}</p>
          </div>
        </div>

        {/* Posts List */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {currentItems.map((post) => (
            <div
              key={post.slug}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all group flex flex-col md:flex-row h-full"
            >
              <div className="relative w-full md:w-64 h-48 md:h-auto bg-slate-800 overflow-hidden flex-shrink-0">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <FileText className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${post.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-black'}`}>
                    {post.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors leading-tight">{post.title}</h3>
                    <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em]">{post.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="p-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl transition-all"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.slug)}
                      className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl shadow-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>

                <div className="flex items-center gap-6 text-sm pt-4 border-t border-white/5 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FileText className="w-20 h-20 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-xl font-light italic font-serif">No blog posts found in our records...</p>
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

      <BlogForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingPost}
        mode={formMode}
      />

      <BinModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        onRestore={handleRestore}
        onDeletePermanent={handleDeletePermanent}
        type="posts"
        endpoint="/api/admin/blog/trash"
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
