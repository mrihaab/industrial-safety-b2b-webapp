import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={textareaId} className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full bg-surface-container-high border border-outline-variant text-on-surface font-body-lg p-3 rounded-sm transition-all duration-200 placeholder:text-on-surface-variant/50 resize-y',
            error && 'border-error focus:border-error focus:ring-1 focus:ring-error',
            className
          )}
          {...props}
        />
        {error && <span className="font-body-sm text-body-sm text-error mt-0.5">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
