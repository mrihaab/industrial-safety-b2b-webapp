import React from 'react';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 mb-8',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant px-3 py-1 w-fit rounded-xs">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            {badge}
          </span>
        </div>
      )}
      <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className="w-12 h-[2px] bg-primary flex-shrink-0" />
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-1">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
