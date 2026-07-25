import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn('flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap', className)}>
      {/* Animated Brand Shield Logo Icon */}
      <svg width="36" height="36" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path d="M100 30 L160 55 V100 C160 145 100 175 100 175 C100 175 40 145 40 100 V55 L100 30 Z" fill="#1A1A1A" stroke="#333333" strokeWidth="4" />
        <path d="M100 60 L140 78 V100 C140 125 100 145 100 145 C100 145 60 125 60 100 V78 L100 60 Z" fill="#FF6B00" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </path>
        <rect x="95" y="80" width="10" height="40" fill="#1A1A1A" rx="2" />
        <rect x="80" y="95" width="40" height="10" fill="#1A1A1A" rx="2" />
      </svg>
      {showText && (
        <span className="font-headline-lg text-xl sm:text-2xl lg:text-[26px] font-extrabold text-primary tracking-tight whitespace-nowrap">
          Ghulam Safety Hub
        </span>
      )}
    </div>
  );
};
