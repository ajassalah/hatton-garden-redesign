import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
  autoClose?: number;
}

export default function StatusModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  autoClose = 3000
}: StatusModalProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-sm max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex-1 overflow-y-auto p-8 md:p-10 text-center custom-scrollbar">
          <div className="flex justify-center mb-6">
            {type === 'success' ? (
              <div className="p-5 bg-emerald-500/10 rounded-3xl shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
            ) : (
              <div className="p-5 bg-red-500/10 rounded-3xl shadow-xl shadow-red-500/10">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            )}
          </div>
          
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">{title}</h3>
          <p className="text-gray-400 font-light italic leading-relaxed">{message}</p>
          
          <button
            onClick={onClose}
            className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 uppercase tracking-widest text-[10px]"
          >
            Dismiss Notification
          </button>
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose > 0 && (
          <div className="h-1 bg-white/5 w-full overflow-hidden">
            <div 
              className={`h-full ${type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-red-500 to-pink-500'} animate-status-progress`}
              style={{ animationDuration: `${autoClose}ms` }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-status-progress {
          animation-name: progress;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}
