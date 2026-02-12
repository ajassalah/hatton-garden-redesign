import React, { useState, useEffect } from 'react';
import { Trash2, RotateCcw, X, MoreVertical, Trash } from 'lucide-react';
import type { Jeweller } from '@/data/jewellers';

interface BinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (slug: string) => void;
  onDeletePermanent: (slug: string) => void;
  type: 'jewellers' | 'cafes' | 'posts' | 'users' | 'shop-categories';
  endpoint: string;
}

export default function BinModal({
  isOpen,
  onClose,
  onRestore,
  onDeletePermanent,
  type,
  endpoint
}: BinModalProps) {
  const [deletedItems, setDeletedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchTrash();
    }
  }, [isOpen, endpoint]);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setDeletedItems(result.data);
      }
    } catch (error) {
      console.error('Error fetching trash:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getTitle = () => {
    switch(type) {
      case 'jewellers': return 'Jewellers Recycle Bin';
      case 'cafes': return 'Cafes Recycle Bin';
      case 'posts': return 'Blog Posts Recycle Bin';
      case 'users': return 'Users Recycle Bin';
      case 'shop-categories': return 'Shop Categories Recycle Bin';
      default: return 'Recycle Bin';
    }
  };

  const getSubTitle = () => `Restore or permanently delete ${type}`;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
              <p className="text-gray-400 text-sm">{getSubTitle()}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {loading ? (
            <div className="py-20 text-center text-gray-400">Loading trash...</div>
          ) : deletedItems.length === 0 ? (
            <div className="py-20 text-center">
              <Trash className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your recycle bin is empty</p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/5">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{type === 'users' ? 'Username' : 'Name'}</th>
                    <th className="px-6 py-4 font-semibold">{type === 'users' ? 'Role' : 'Category'}</th>
                    <th className="px-6 py-4 font-semibold text-center">{type === 'users' ? 'Email' : 'Details'}</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {deletedItems.map((item) => (
                    <tr key={item.slug || item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{item.name || item.title || item.username}</td>
                      <td className="px-6 py-4 text-purple-400">{item.category || item.role}</td>
                      <td className="px-6 py-4 text-center">
                        {item.email ? (
                           <span className="text-gray-400 text-xs">{item.email}</span>
                        ) : item.rating ? (
                          <div className="inline-flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded text-yellow-400 text-xs">
                            ★ {item.rating}
                          </div>
                        ) : item.date}
                      </td>
                      <td className="px-6 py-4 text-right relative overflow-visible">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === (item.slug || item.id) ? null : (item.slug || item.id))}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeMenu === (item.slug || item.id) && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-6 top-10 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 w-48 z-[100] animate-in fade-in zoom-in-95 duration-200">
                              <button
                                onClick={() => {
                                  onRestore(item.slug || item.id);
                                  setActiveMenu(null);
                                  setDeletedItems(prev => prev.filter(i => (i.slug || i.id) !== (item.slug || item.id)));
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-emerald-500/20 text-emerald-400 flex items-center gap-3 transition-colors"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>Restore</span>
                              </button>
                              <button
                                onClick={() => {
                                  onDeletePermanent(item.slug || item.id);
                                  setActiveMenu(null);
                                  setDeletedItems(prev => prev.filter(i => (i.slug || i.id) !== (item.slug || item.id)));
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-red-500/20 text-red-400 flex items-center gap-3 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete Permanently</span>
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Spacer to ensure the last row's dropdown isn't clipped */}
                  <tr className="h-32">
                    <td colSpan={4}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/5 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
