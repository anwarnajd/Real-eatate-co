import React from 'react';

interface OriginalLogoBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OriginalLogoBadge: React.FC<OriginalLogoBadgeProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-44 p-2',
    md: 'w-64 sm:w-72 p-3 sm:p-4',
    lg: 'w-72 sm:w-84 p-4 sm:p-5',
  };

  const imgHeightMap = {
    sm: 'max-h-48',
    md: 'max-h-64 sm:max-h-80',
    lg: 'max-h-80 sm:max-h-96',
  };

  return (
    <div
      dir="ltr"
      style={{ transform: 'none', WebkitTransform: 'none' }}
      className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200 ${sizeMap[size]} ${className}`}
    >
      {/* Official Client Anwar Najd Logo: exact file public/images/anwar-najd-logo.png */}
      <div
        dir="ltr"
        style={{ transform: 'none', WebkitTransform: 'none' }}
        className="w-full flex items-center justify-center overflow-hidden"
      >
        <img
          src="/images/anwar-najd-logo.png"
          alt="شركة انوار نجد العقارية"
          className={`w-auto h-auto max-w-full ${imgHeightMap[size]} object-contain select-none pointer-events-none rounded-xl`}
          style={{ transform: 'none', WebkitTransform: 'none' }}
          loading="eager"
        />
      </div>
    </div>
  );
};
