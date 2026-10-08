import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn('flex items-center gap-2.5 sm:gap-3 flex-shrink-0 whitespace-nowrap select-none', className)}>
      {/* Client's Official Custom 3D Shield Logo */}
      <img
        src="/gsh-shield.png"
        alt="Ghulam Safety Hub Logo"
        className="h-9 sm:h-10 w-auto object-contain shrink-0 drop-shadow-xs"
        loading="eager"
      />

      {showText && (
        <span className="font-headline-lg text-base xs:text-lg sm:text-2xl lg:text-[26px] font-extrabold text-on-surface tracking-tight whitespace-nowrap">
          Ghulam <span className="text-primary-container">Safety</span> Hub
        </span>
      )}
    </div>
  );
};

export default Logo;
