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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {type === 'success' ? (
              <div className="p-4 bg-emerald-500/20 rounded-full">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
            ) : (
              <div className="p-4 bg-red-500/20 rounded-full">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{message}</p>
          
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
          >
            Dismiss
          </button>
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose > 0 && (
          <div className="h-1 bg-white/10 w-full overflow-hidden">
            <div 
              className={`h-full ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-status-progress`}
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
