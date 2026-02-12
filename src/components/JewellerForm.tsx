'use client';

import { useState, FormEvent, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface JewellerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: 'create' | 'edit';
}

export default function JewellerForm({ isOpen, onClose, onSubmit, initialData, mode }: JewellerFormProps) {
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
    longDescription: '',
    gallery: []
  });

  const handleAddGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), '']
    });
  };

  const handleGalleryImageChange = (index: number, value: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[index] = value;
    setFormData({
      ...formData,
      gallery: newGallery
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = (formData.gallery || []).filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      gallery: newGallery
    });
  };

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
        longDescription: '',
        gallery: []
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
            {mode === 'create' ? 'Add New Jeweller' : 'Edit Jeweller'}
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
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Harper Tait Fine Jewellery"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Retail / Fine Jewellery"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="+44 7566 7564 99"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="info@jeweller.com"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://www.jeweller.com"
              />
            </div>

            {/* Opening Times */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Opening Times
              </label>
              <input
                type="text"
                value={formData.openingTimes}
                onChange={(e) => setFormData({...formData, openingTimes: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Monday to Saturday 10am - 7pm"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Reviews Count */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reviews Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviewsCount}
                onChange={(e) => setFormData({...formData, reviewsCount: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="/jewellers/image.jpg"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Suite 26, New House, 67-68 Hatton Garden, London, EC1N 8JY"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description..."
              />
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Long Description
              </label>
              <textarea
                rows={4}
                value={formData.longDescription}
                onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Detailed description..."
              />
            </div>

            {/* Gallery Images */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Gallery Images</h3>
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
              </div>
              <div className="space-y-3">
                {(formData.gallery || []).map((url: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="Gallery image URL..."
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.socials.twitter}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socials: {...formData.socials, twitter: e.target.value}
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socials.facebook}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socials: {...formData.socials, facebook: e.target.value}
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socials.instagram}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socials: {...formData.socials, instagram: e.target.value}
                    })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
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
              {loading ? 'Saving...' : mode === 'create' ? 'Create Jeweller' : 'Update Jeweller'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
