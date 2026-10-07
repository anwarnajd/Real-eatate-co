import React from 'react';
import regaLogoImg from '../assets/images/rega-logo.png';
import regaLogoSvg from '../assets/images/rega-logo.svg';

interface RegaLogoProps {
  className?: string;
  isAr?: boolean;
}

export const RegaLogo: React.FC<RegaLogoProps> = ({ className = '', isAr = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Clean Subtitle / Header: Real Estate General Authority */}
      <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-400 mb-3 select-none">
        {isAr ? 'الهيئة العامة للعقار' : 'Real Estate General Authority'}
      </span>

      {/* Official Uploaded REGA Logo Image */}
      <div className="relative inline-flex items-center justify-center p-0.5 rounded-2xl bg-[#022B42] border border-slate-700/60 shadow-lg shadow-black/25">
        <img
          src={regaLogoImg || '/images/rega-logo.png'}
          alt={isAr ? 'الهيئة العامة للعقار - REGA' : 'Real Estate General Authority - REGA'}
          title={isAr ? 'الهيئة العامة للعقار' : 'Real Estate General Authority'}
          className="w-[190px] sm:w-[260px] max-w-full h-auto object-contain rounded-xl select-none"
          width={260}
          height={162}
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== regaLogoSvg && !target.src.endsWith('.svg')) {
              target.src = regaLogoSvg || '/images/rega-logo.svg';
            }
          }}
        />
      </div>
    </div>
  );
};

