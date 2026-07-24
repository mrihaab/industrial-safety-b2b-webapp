import React from 'react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className={cn('flex items-center gap-2 justify-center py-6', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-surface-container industrial-border text-on-surface hover:text-primary disabled:opacity-40 disabled:pointer-events-none rounded-sm font-label-caps transition-colors"
      >
        Prev
      </button>

      {pages.map((p, idx) => (
        <React.Fragment key={idx}>
          {typeof p === 'number' ? (
            <button
              onClick={() => onPageChange(p)}
              className={cn(
                'w-10 h-10 flex items-center justify-center font-label-caps rounded-sm transition-all border',
                p === currentPage
                  ? 'bg-primary-container text-on-primary-container border-primary-container font-bold orange-glow'
                  : 'bg-surface-container industrial-border text-on-surface hover:border-primary/50'
              )}
            >
              {p}
            </button>
          ) : (
            <span className="px-2 text-on-surface-variant font-label-caps">...</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-surface-container industrial-border text-on-surface hover:text-primary disabled:opacity-40 disabled:pointer-events-none rounded-sm font-label-caps transition-colors"
      >
        Next
      </button>
    </div>
  );
};
