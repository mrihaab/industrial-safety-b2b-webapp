import React from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverEffect = false }) => {
  return (
    <div
      className={cn(
        'industrial-glass rounded-lg p-6 transition-all duration-300',
        hoverEffect && 'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
        className
      )}
    >
      {children}
    </div>
  );
};
