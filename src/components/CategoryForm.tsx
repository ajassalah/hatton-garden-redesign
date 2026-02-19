'use client';

import { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: 'create' | 'edit';
}

export default function CategoryForm({ isOpen, onClose, onSubmit, initialData, mode }: CategoryFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    type: 'jeweller'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        type: 'jeweller'
      });
    }
  }, [initialData, isOpen]);

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
      <div className="bg-slate-900 rounded-3xl border border-white/10 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
              {mode === 'create' ? 'Add New Category' : 'Edit Category'}
            </h2>
            <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Classification Engine</p>
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
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                  placeholder="e.g. Fine Jewellery"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                  Category Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                >
                  <option value="jeweller" className="bg-slate-800">Jeweller</option>
                  <option value="cafe" className="bg-slate-800">Cafe & Dining</option>
                  <option value="blog" className="bg-slate-800">Blog Post</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fixed Footer for Form */}
          <div className="flex-none flex flex-col md:flex-row items-center justify-end gap-3 p-4 md:p-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl hover:shadow-2xl shadow-purple-500/20 transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
            >
              {loading ? 'Processing...' : mode === 'create' ? 'Create Category' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
