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
    success: 'bg-surface-container border-[#4ade80]/50 text-[#4ade80] led-active',
    error: 'bg-surface-container border-error/50 text-error',
    info: 'bg-surface-container border-primary-container/50 text-primary',
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
