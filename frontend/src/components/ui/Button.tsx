import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-title-md inline-flex items-center justify-center rounded-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-primary-container text-on-primary-container orange-glow-hover',
    secondary: 'bg-primary text-on-primary hover:brightness-110',
    outline: 'border border-outline text-on-surface hover:bg-surface-variant',
    ghost: 'text-on-surface hover:bg-surface-variant',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-body-sm font-semibold',
    md: 'px-6 py-2 text-title-md font-semibold',
    lg: 'px-8 py-4 text-title-md font-bold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2 inline-flex items-center">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon ? (
        <span className="ml-2 inline-flex items-center">{rightIcon}</span>
      ) : null}
    </button>
  );
};
