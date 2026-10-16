import React from 'react';
import { Language } from '../types';
import officialLogoImg from '../assets/images/anwar-najd-logo.png';

interface LogoProps {
  language?: Language;
  variant?: 'light' | 'dark' | 'header' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  language = 'ar',
  variant = 'light',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const isAr = language === 'ar';

  // Sizing definitions
  const iconDimensions = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-16 sm:h-16',
    xl: 'w-16 h-16 sm:w-24 sm:h-24',
  };

  const isDarkBg = variant === 'dark' || variant === 'footer';

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3.5 select-none max-w-full overflow-hidden ${className}`}>
      {/* 
        Exact Official Anwar Najd Logo PNG:
        House on Left, Skyscrapers on Right, Curved Base
        Explicit dir="ltr" and transform:none to prevent any RTL mirroring
      */}
      <div
        dir="ltr"
        style={{ transform: 'none', WebkitTransform: 'none' }}
        className={`relative flex-shrink-0 ${iconDimensions[size]} ${
          isDarkBg ? 'bg-white rounded-xl p-1 shadow-sm' : ''
        } flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
      >
        <img
          src="/images/anwar-najd-logo.png"
          alt="شركة انوار نجد العقارية"
          className="w-full h-full object-contain select-none pointer-events-none"
          style={{ transform: 'none', WebkitTransform: 'none' }}
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="flex flex-col justify-center text-start min-w-0 select-none"
        >
          <span
            className={`font-black tracking-tight leading-tight text-xs sm:text-base lg:text-lg whitespace-nowrap ${
              isDarkBg ? 'text-white' : 'text-[#193555]'
            }`}
          >
            {isAr ? 'شركة انوار نجد العقارية' : 'Anwar Najd Real Estate Co.'}
          </span>
          <span
            className={`hidden min-[420px]:block font-bold text-[9px] sm:text-xs tracking-normal uppercase mt-0.5 whitespace-nowrap ${
              isDarkBg ? 'text-cyan-300' : 'text-[#088AC3]'
            }`}
          >
            {isAr ? 'للخدمات العقارية والاستثمار' : 'Real Estate & Investment'}
          </span>
        </div>
      )}
    </div>
  );
};
