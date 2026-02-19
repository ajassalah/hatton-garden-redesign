'use client';

import { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface BlogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: 'create' | 'edit';
}

export default function BlogForm({ isOpen, onClose, onSubmit, initialData, mode }: BlogFormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
    image: '',
    category: '',
    status: 'published',
    hasFullArticle: true,
    views: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: '',
        status: 'published',
        hasFullArticle: true,
        views: 0
      });
    }
  }, [initialData, isOpen]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 rounded-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-8 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
              {mode === 'create' ? 'Create New Post' : 'Edit Post'}
            </h2>
            <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Editorial Content Management</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Title Section */}
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-lg font-bold placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="e.g. The Hidden Gems of Hatton Garden"
                />
              </div>

              {/* Meta Info Group */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Published Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                  >
                    <option value="" className="bg-slate-800">Select category...</option>
                    <option value="Jewelry" className="bg-slate-800">Jewelry</option>
                    <option value="Lifestyle" className="bg-slate-800">Lifestyle</option>
                    <option value="Dining" className="bg-slate-800">Dining</option>
                    <option value="Events" className="bg-slate-800">Events</option>
                    <option value="Guides" className="bg-slate-800">Guides</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Publishing Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Publication Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'published'})}
                      className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.status === 'published'
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                        : 'bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: 'draft'})}
                      className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.status === 'draft'
                        ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                        : 'bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Visibility Options */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.hasFullArticle}
                    onChange={(e) => setFormData({...formData, hasFullArticle: e.target.checked})}
                    className="w-6 h-6 rounded-lg border-white/10 bg-black/20 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Enable Article Page</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Allow users to view the full story</p>
                  </div>
                </label>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Hero Image Source URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="/blog/image.webp"
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Executive Summary</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-light italic"
                  placeholder="A brief teaser for the article card..."
                />
              </div>

              {/* Content Body */}
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Editorial Body (HTML Supported)</label>
                <textarea
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-xs leading-relaxed"
                  placeholder="Begin writing your masterpiece here..."
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer for Form */}
          <div className="flex-none flex flex-col md:flex-row items-center justify-end gap-3 p-4 md:p-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
            >
              Cancel Edit
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl hover:shadow-2xl shadow-purple-500/20 transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
            >
              {loading ? 'Submitting...' : mode === 'create' ? 'Publish Article' : 'Update Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
