import React from 'react';
import officialLogoImg from '../assets/images/anwar-najd-logo.png';

interface OriginalLogoBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OriginalLogoBadge: React.FC<OriginalLogoBadgeProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-44 p-3',
    md: 'w-60 sm:w-72 p-4 sm:p-5',
    lg: 'w-72 sm:w-84 p-5 sm:p-6',
  };

  const imgHeightMap = {
    sm: 'h-20 sm:h-24',
    md: 'h-28 sm:h-32',
    lg: 'h-36 sm:h-44',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200 ${sizeMap[size]} ${className}`}
    >
      {/* Official Emblem: Exact Anwar Najd PNG, isolated with dir="ltr" and transform:none to prevent any RTL mirroring */}
      <div
        dir="ltr"
        style={{ transform: 'none', WebkitTransform: 'none' }}
        className={`w-full ${imgHeightMap[size]} flex items-center justify-center overflow-hidden`}
      >
        <img
          src={officialLogoImg || '/anwar-najd-logo.png'}
          alt="شركة انوار نجد العقارية"
          className="w-full h-full object-contain select-none pointer-events-none"
          style={{ transform: 'none', WebkitTransform: 'none' }}
          loading="eager"
        />
      </div>

      {/* Official Arabic Typography rendered in native HTML - 100% correct RTL shaping, never reversed */}
      <div className="mt-3 text-center w-full select-none" dir="rtl">
        <h2 className="text-[#193555] font-black text-sm sm:text-base md:text-lg leading-tight tracking-normal font-sans" dir="rtl">
          شركة انوار نجد العقارية
        </h2>
        <p className="text-[#088AC3] font-bold text-[10px] sm:text-xs mt-1 tracking-normal font-sans" dir="rtl">
          للخدمات العقارية والاستثمار
        </p>
      </div>
    </div>
  );
};
