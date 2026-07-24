import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-on-surface-variant pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-surface-container-high border border-outline-variant text-on-surface font-body-lg px-4 py-2.5 rounded-sm transition-all duration-200 placeholder:text-on-surface-variant/50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error focus:border-error focus:ring-1 focus:ring-error',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-on-surface-variant flex items-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span className="font-body-sm text-body-sm text-error mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
