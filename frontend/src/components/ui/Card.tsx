import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverable = false }) => {
  return (
    <div
      className={cn(
        'bg-surface-container industrial-border rounded-sm p-6 transition-all duration-300',
        hoverable && 'hover:border-primary/50 hover:bg-surface-container-high',
        className
      )}
    >
      {children}
    </div>
  );
};
