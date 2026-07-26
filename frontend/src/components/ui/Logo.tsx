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
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 overflow-hidden flex items-center justify-center rounded-xs">
          <img
            src={logoImg}
            alt="Ghulam Safety Hub Emblem"
            onError={() => setImgError(true)}
            style={{ mixBlendMode: 'lighten' }}
            className="w-full h-full object-cover object-top flex-shrink-0 scale-125 filter contrast-125 brightness-110"
          />
        </div>
      ) : (
        <svg width="38" height="38" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M100 30 L160 55 V100 C160 145 100 175 100 175 C100 175 40 145 40 100 V55 L100 30 Z" fill="#1A1A1A" stroke="#333333" strokeWidth="4" />
          <path d="M100 60 L140 78 V100 C140 125 100 145 100 145 C100 145 60 125 60 100 V78 L100 60 Z" fill="#FF8D6B" opacity="0.95" />
        </svg>
      )}

      {showText && (
        <span className="font-headline-lg text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#ff8d6b] tracking-tight whitespace-nowrap">
          Ghulam Safety Hub
        </span>
      )}
    </div>
  );
};

export default Logo;
