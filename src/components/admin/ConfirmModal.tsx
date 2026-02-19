import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-500 hover:bg-red-600 border-red-400/50 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-400/50 text-black',
    info: 'bg-blue-500 hover:bg-blue-600 border-blue-400/50 text-white'
  };

  const iconColors = {
    danger: 'text-red-400 bg-red-400/10',
    warning: 'text-yellow-400 bg-yellow-400/10',
    info: 'text-blue-400 bg-blue-400/10'
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 rounded-2xl shadow-xl ${iconColors[variant]}`}>
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">{title}</h3>
              <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">System Verification Required</p>
            </div>
          </div>
          
          <p className="text-gray-400 leading-relaxed font-light italic border-l-2 border-white/10 pl-6">{message}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 p-6 md:p-8 bg-white/5 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full md:flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 uppercase tracking-widest text-[10px]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full md:flex-1 px-8 py-4 font-black rounded-2xl transition-all shadow-xl uppercase tracking-widest text-[10px] transform hover:scale-[1.02] active:scale-95 ${colors[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
