import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full bg-surface-container-high border border-outline-variant text-on-surface font-body-lg px-4 py-2.5 rounded-sm transition-all duration-200 cursor-pointer',
            error && 'border-error focus:border-error focus:ring-1 focus:ring-error',
            className
          )}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-surface-container-high text-on-surface py-1">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="font-body-sm text-body-sm text-error mt-0.5">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
