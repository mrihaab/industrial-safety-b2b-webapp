import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn('flex items-center gap-3 flex-shrink-0 whitespace-nowrap select-none', className)}>
      {/* Original HTML Mockup Vector Shield Icon matching Screenshot */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#121b28] border border-[#2a3647] rounded-md flex items-center justify-center shadow-md flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" fill="#1e293b" stroke="#ff8d6b" strokeWidth="1.5" />
          <path d="M12 6L6 9V12C6 15.7 8.55 19.16 12 20C15.45 19.16 18 15.7 18 12V9L12 6Z" fill="#ff6b00" opacity="0.9" />
          <path d="M11 9H13V11H15V13H13V15H11V13H9V11H11V9Z" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <span className="font-headline-lg text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#ff8d6b] tracking-tight whitespace-nowrap">
          Ghulam Safety Hub
        </span>
      )}
    </div>
  );
};

export default Logo;
