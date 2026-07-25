import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-surface/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className={cn('relative w-full max-w-lg bg-surface-container industrial-border rounded-sm shadow-2xl z-10 p-6 sm:p-8 flex flex-col gap-4 my-auto', className)}>
        <div className="flex items-center justify-between border-b border-outline-variant pb-3 shrink-0">
          {title && <h3 className="font-title-md text-title-md text-primary font-bold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[72vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
};
