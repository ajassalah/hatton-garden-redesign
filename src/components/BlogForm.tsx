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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'create' ? 'Create New Post' : 'Edit Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Post Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="The Ultimate Guide to Hatton Garden..."
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Admin"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" className="bg-slate-800">Select category...</option>
                <option value="Jewelry" className="bg-slate-800">Jewelry</option>
                <option value="Lifestyle" className="bg-slate-800">Lifestyle</option>
                <option value="Dining" className="bg-slate-800">Dining</option>
                <option value="Events" className="bg-slate-800">Events</option>
                <option value="Guides" className="bg-slate-800">Guides</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'published'})}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    formData.status === 'published'
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'draft'})}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    formData.status === 'draft'
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* Has Full Article */}
            <div className="flex items-center gap-3 md:mt-8">
               <input
                 type="checkbox"
                 id="hasFullArticle"
                 checked={formData.hasFullArticle}
                 onChange={(e) => setFormData({...formData, hasFullArticle: e.target.checked})}
                 className="w-5 h-5 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
               />
               <label htmlFor="hasFullArticle" className="text-sm font-medium text-gray-300">
                 This post has a full article page
               </label>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="/Blog/hero-image.jpg"
              />
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt (Brief summary)
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="A short summary for the card display..."
              />
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content (Internal text/HTML)
              </label>
              <textarea
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                placeholder="Full article content goes here..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
