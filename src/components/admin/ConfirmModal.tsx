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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-xl ${iconColors[variant]}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center gap-3 p-6 bg-white/5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-3 font-semibold rounded-xl transition-all border shadow-lg ${colors[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
