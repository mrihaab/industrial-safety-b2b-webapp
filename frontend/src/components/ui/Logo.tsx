import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center flex-shrink-0 whitespace-nowrap', className)}>
      {/* Official 3D Metallic Shield Logo Image (Contains Emblem & Brand Title) */}
      <img
        src="/logo.png"
        alt="Ghulam Safety Hub Official Logo"
        className="h-10 sm:h-12 lg:h-14 w-auto object-contain flex-shrink-0 hover:scale-105 transition-transform duration-300 py-0.5"
      />
    </div>
  );
};

export default Logo;
