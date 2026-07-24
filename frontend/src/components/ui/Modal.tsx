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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-surface/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className={cn('relative w-full max-w-lg bg-surface-container industrial-border rounded-lg shadow-2xl z-10 p-6 flex flex-col gap-4', className)}>
        <div className="flex items-center justify-between border-b border-outline-variant pb-3">
          {title && <h3 className="font-title-md text-title-md text-primary font-bold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-lg p-1"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
};
