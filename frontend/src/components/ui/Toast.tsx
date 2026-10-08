import React from 'react';
import { cn } from '@/utils/cn';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, className }) => {
  const typeStyles = {
    success: 'bg-white border-emerald-500 text-emerald-800 shadow-xl',
    error: 'bg-white border-red-500 text-red-800 shadow-xl',
    info: 'bg-white border-primary-container text-slate-900 shadow-xl',
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-50 flex items-center gap-4 px-5 py-3 rounded-sm border industrial-border shadow-xl font-body-sm transition-all animate-bounce', typeStyles[type], className)}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface font-bold ml-2">
          ✕
        </button>
      )}
    </div>
  );
};
