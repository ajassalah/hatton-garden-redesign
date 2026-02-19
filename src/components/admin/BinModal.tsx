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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-red-500/10 rounded-2xl shadow-xl shadow-red-500/5">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">{getTitle()}</h2>
              <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{getSubTitle()}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-all border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {loading ? (
            <div className="py-24 text-center">
               <div className="inline-block w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
               <p className="text-gray-500 text-sm font-light italic">Accessing archive...</p>
            </div>
          ) : deletedItems.length === 0 ? (
            <div className="py-24 text-center">
              <div className="p-8 bg-white/5 rounded-full inline-block mb-6">
                <Trash className="w-16 h-16 text-gray-700 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 italic">Archive is Empty</h3>
              <p className="text-gray-500 font-light italic">No items currently in the recycle bin.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5 border-b border-white/5">{type === 'users' ? 'Username' : 'Archive Name'}</th>
                    <th className="px-8 py-5 border-b border-white/5">{type === 'users' ? 'Role' : 'Category'}</th>
                    <th className="px-8 py-5 border-b border-white/5 text-center">{type === 'users' ? 'Security' : 'Metadata'}</th>
                    <th className="px-8 py-5 border-b border-white/5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02] text-gray-400">
                  {deletedItems.map((item) => (
                    <tr key={item.slug || item.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                        <span className="font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">
                          {item.name || item.title || item.username}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-purple-500/10 text-purple-400/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/10">
                          {item.category || item.role}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        {item.email ? (
                           <span className="text-gray-500 text-xs font-mono">{item.email}</span>
                        ) : item.rating ? (
                          <div className="inline-flex items-center gap-1.5 bg-yellow-500/5 px-3 py-1 rounded-lg text-yellow-500 text-xs font-bold border border-yellow-500/10">
                            ★ {item.rating}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs italic">{item.date}</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right relative overflow-visible">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === (item.slug || item.id) ? null : (item.slug || item.id))}
                          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeMenu === (item.slug || item.id) && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-8 top-12 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl py-2 w-56 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                              <button
                                onClick={() => {
                                  onRestore(item.slug || item.id);
                                  setActiveMenu(null);
                                  setDeletedItems(prev => prev.filter(i => (i.slug || i.id) !== (item.slug || item.id)));
                                }}
                                className="w-full px-5 py-3 text-left hover:bg-emerald-500/10 text-emerald-400 flex items-center gap-4 transition-colors font-bold text-xs uppercase tracking-widest"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>Restore Entity</span>
                              </button>
                              <div className="h-px bg-white/5 mx-2 my-1" />
                              <button
                                onClick={() => {
                                  onDeletePermanent(item.slug || item.id);
                                  setActiveMenu(null);
                                  setDeletedItems(prev => prev.filter(i => (i.slug || i.id) !== (item.slug || item.id)));
                                }}
                                className="w-full px-5 py-3 text-left hover:bg-red-500/10 text-red-500 flex items-center gap-4 transition-colors font-bold text-xs uppercase tracking-widest"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Final Deletion</span>
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Spacer to ensure the last row's dropdown isn't clipped */}
                  <tr className="h-32 pointer-events-none">
                    <td colSpan={4}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 bg-slate-900/50 backdrop-blur-md border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
          >
            Close Archive
          </button>
        </div>
      </div>
    </div>
  );
}
