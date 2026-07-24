import React from 'react';
import { cn } from '@/utils/cn';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className, fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div
      className={cn(
        'rounded-full border-primary-container border-t-transparent animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center flex-col gap-4">
        {spinner}
        <span className="font-label-caps text-primary tracking-widest animate-pulse">
          LOADING SAFETY DATA...
        </span>
      </div>
    );
  }

  return spinner;
};
