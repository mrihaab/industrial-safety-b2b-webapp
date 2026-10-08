import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'led' | 'success' | 'warning' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 font-label-caps text-label-caps rounded-xs tracking-wider uppercase font-semibold';

  const variants = {
    primary: 'bg-primary-container text-on-primary-container',
    led: 'led-active bg-orange-50 border border-primary text-primary font-bold',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-300',
    warning: 'bg-amber-50 text-amber-700 border border-amber-300',
    neutral: 'bg-surface-variant text-on-surface-variant border border-outline-variant',
  };

  return <span className={cn(baseStyles, variants[variant], className)}>{children}</span>;
};
