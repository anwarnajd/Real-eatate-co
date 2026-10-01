import React from 'react';

interface RegaLogoProps {
  className?: string;
  isAr?: boolean;
}

export const RegaLogo: React.FC<RegaLogoProps> = ({ className = 'h-11', isAr = true }) => {
  return (
    <div
      className={`inline-flex items-center gap-3.5 px-4 py-2 rounded-xl bg-[#0F2338]/80 border border-slate-700/70 select-none ${className}`}
      aria-label={isAr ? 'شعار الهيئة العامة للعقار' : 'Real Estate General Authority Logo'}
      title={isAr ? 'الهيئة العامة للعقار - Real Estate General Authority' : 'Real Estate General Authority'}
    >
      {/* Official Stylized REGA Emblem (Geometric Architecture & Portal) */}
      <svg
        viewBox="0 0 72 72"
        className="w-9 h-9 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="regaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#088AC3" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="regaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Outer stylized protective shield / arch */}
        <rect
          x="3"
          y="3"
          width="66"
          height="66"
          rx="14"
          fill="#132A45"
          stroke="#1E476F"
          strokeWidth="1.5"
        />

        {/* Modern architectural geometry depicting property layers & growth */}
        {/* Layer 1: Left tower/portal */}
        <path
          d="M18 52V26C18 21.5817 21.5817 18 26 18H28V52H18Z"
          fill="url(#regaGreenGrad)"
          opacity="0.95"
        />

        {/* Layer 2: Right stepped tower */}
        <path
          d="M44 52V28C44 23.5817 47.5817 20 52 20H54V52H44Z"
          fill="#38BDF8"
          opacity="0.85"
        />

        {/* Layer 3: Central archway / portal (Key of Real Estate) */}
        <path
          d="M31 52V30C31 27.2386 33.2386 25 36 25C38.7614 25 41 27.2386 41 30V52H31Z"
          fill="#FFFFFF"
        />

        {/* Gold accent line signifying authoritative governance */}
        <path
          d="M20 52H52"
          stroke="url(#regaGoldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="36" cy="18" r="3" fill="#F59E0B" />
      </svg>

      {/* Official Typography: Arabic & English */}
      <div className="flex flex-col text-start justify-center">
        <span className="text-[13px] sm:text-[14px] font-black tracking-tight text-white leading-tight font-sans">
          الهيئة العامة للعقار
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-slate-300 leading-tight">
          Real Estate General Authority
        </span>
      </div>
    </div>
  );
};
