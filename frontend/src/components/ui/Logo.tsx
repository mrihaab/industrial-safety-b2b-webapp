import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn('flex items-center gap-3 flex-shrink-0 whitespace-nowrap', className)}>
      {/* Official 3D Metallic Shield Logo Image */}
      <img
        src="/logo.png"
        alt="Ghulam Safety Hub Logo"
        className="h-10 sm:h-11 lg:h-12 w-auto object-contain flex-shrink-0 rounded-xs shadow-sm hover:scale-105 transition-transform duration-300"
      />
      {showText && (
        <span className="font-headline-lg text-lg sm:text-xl lg:text-2xl font-extrabold text-primary tracking-tight whitespace-nowrap">
          Ghulam Safety Hub
        </span>
      )}
    </div>
  );
};
