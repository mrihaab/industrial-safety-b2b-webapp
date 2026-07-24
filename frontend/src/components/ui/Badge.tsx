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
    led: 'led-active bg-surface-container border border-primary-container/40 text-primary',
    success: 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30',
    warning: 'bg-error/10 text-error border border-error/30',
    neutral: 'bg-surface-variant text-on-surface-variant border border-outline-variant/40',
  };

  return <span className={cn(baseStyles, variants[variant], className)}>{children}</span>;
};
