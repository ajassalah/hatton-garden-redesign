'use client';

import { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface CafeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: 'create' | 'edit';
}

export default function CafeForm({ isOpen, onClose, onSubmit, initialData, mode }: CafeFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    rating: 4.5,
    reviewsCount: 0,
    openingTimes: '',
    image: '',
    socials: {
      twitter: '',
      facebook: '',
      instagram: ''
    },
    longDescription: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        socials: {
          twitter: initialData.socials?.twitter || '',
          facebook: initialData.socials?.facebook || '',
          instagram: initialData.socials?.instagram || ''
        }
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        rating: 4.5,
        reviewsCount: 0,
        openingTimes: '',
        image: '',
        socials: { twitter: '', facebook: '', instagram: '' },
        longDescription: ''
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
              {mode === 'create' ? 'Add New Venue' : 'Edit Venue'}
            </h2>
            <p className="text-orange-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Cafes & Dining Management</p>
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
              {/* Basic Info Group */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Venue Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="e.g. Prufrock Coffee"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                  >
                    <option value="" className="bg-slate-800">Select category...</option>
                    <option value="Café" className="bg-slate-800">Café</option>
                    <option value="Pub" className="bg-slate-800">Pub</option>
                    <option value="Restaurant" className="bg-slate-800">Restaurant</option>
                    <option value="French Bistro" className="bg-slate-800">French Bistro</option>
                    <option value="Wine Bar" className="bg-slate-800">Wine Bar</option>
                    <option value="Pan-Asian" className="bg-slate-800">Pan-Asian</option>
                    <option value="Street Food Market" className="bg-slate-800">Street Food Market</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating || 0}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Reviews</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.reviewsCount || 0}
                      onChange={(e) => setFormData({...formData, reviewsCount: parseInt(e.target.value)})}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info Group */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="+44 ..."
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="contact@venue.com"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Website URL</label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Physical Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Opening Times <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.openingTimes || ''}
                    onChange={(e) => setFormData({...formData, openingTimes: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                    placeholder="Mon-Fri: 07:30-16:30, Sat-Sun: 08:00-17:00"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Interior/Exterior Image URL</label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-light"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">
                    Short Introduction <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-light italic"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 block">Detailed Description</label>
                  <textarea
                    rows={4}
                    value={formData.longDescription || ''}
                    onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-light"
                  />
                </div>

                {/* Socials Section */}
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Social Networks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-4">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Twitter</label>
                      <input
                        type="url"
                        value={formData.socials?.twitter || ''}
                        onChange={(e) => setFormData({
                          ...formData, 
                          socials: {...(formData.socials || {}), twitter: e.target.value}
                        })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-white text-xs"
                        placeholder="URL"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Facebook</label>
                      <input
                        type="url"
                        value={formData.socials?.facebook || ''}
                        onChange={(e) => setFormData({
                          ...formData, 
                          socials: {...(formData.socials || {}), facebook: e.target.value}
                        })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-white text-xs"
                        placeholder="URL"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Instagram</label>
                      <input
                        type="url"
                        value={formData.socials?.instagram || ''}
                        onChange={(e) => setFormData({
                          ...formData, 
                          socials: {...(formData.socials || {}), instagram: e.target.value}
                        })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-white text-xs"
                        placeholder="URL"
                      />
                    </div>
                  </div>
                </div>
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
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl hover:shadow-2xl shadow-orange-500/20 transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
            >
              {loading ? 'Processing...' : mode === 'create' ? 'Confirm Addition' : 'Save Modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
