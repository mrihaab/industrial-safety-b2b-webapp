import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn('flex items-center gap-3 flex-shrink-0 whitespace-nowrap select-none', className)}>
      {/* Vector Shield Icon matching Brand Design */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-50 border border-orange-200 rounded-md flex items-center justify-center shadow-xs flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M12 6L6 9V12C6 15.7 8.55 19.16 12 20C15.45 19.16 18 15.7 18 12V9L12 6Z" fill="#ea580c" />
          <path d="M11 9H13V11H15V13H13V15H11V13H9V11H11V9Z" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <span className="font-headline-lg text-base xs:text-lg sm:text-2xl lg:text-[26px] font-extrabold text-on-surface tracking-tight whitespace-nowrap">
          Ghulam <span className="text-primary-container">Safety</span> Hub
        </span>
      )}
    </div>
  );
};

export default Logo;
