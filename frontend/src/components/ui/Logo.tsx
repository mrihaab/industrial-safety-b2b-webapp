import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import logoImg from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={cn('flex items-center gap-3 flex-shrink-0 whitespace-nowrap', className)}>
      {!imgError ? (
        <img
          src={logoImg}
          alt="Ghulam Safety Hub"
          onError={() => setImgError(true)}
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain flex-shrink-0 py-0.5"
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M100 30 L160 55 V100 C160 145 100 175 100 175 C100 175 40 145 40 100 V55 L100 30 Z" fill="#1A1A1A" stroke="#333333" strokeWidth="4" />
            <path d="M100 60 L140 78 V100 C140 125 100 145 100 145 C100 145 60 125 60 100 V78 L100 60 Z" fill="#FF6B00" opacity="0.9" />
          </svg>
          {showText && (
            <span className="font-headline-lg text-lg sm:text-xl lg:text-2xl font-extrabold text-primary tracking-tight whitespace-nowrap">
              Ghulam Safety Hub
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
