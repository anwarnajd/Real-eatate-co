import React from 'react';
import { Language } from '../types';

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
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const isDarkBg = variant === 'dark' || variant === 'footer';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* 
        Exact Emblem from the client's uploaded logo:
        - House outline with chimney
        - 4-pane cyan window
        - Skyscraper cluster (navy and bright cyan strokes)
        - Curved horizon swoosh base
      */}
      <div className={`relative flex-shrink-0 ${iconDimensions[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 450 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* House Left: Chimney */}
          <path
            d="M 160 216 L 160 192 L 172 192 L 172 204"
            stroke={isDarkBg ? "#FFFFFF" : "#193555"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* House Left: Sloping Gable Roof */}
          <path
            d="M 104 246 L 190 195 L 278 250"
            stroke={isDarkBg ? "#FFFFFF" : "#193555"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4-Pane Cyan Window centered beneath gable peak */}
          <g transform="translate(181, 218)">
            <rect x="0" y="0" width="8.5" height="8.5" rx="1" fill="#088AC3" />
            <rect x="11.5" y="0" width="8.5" height="8.5" rx="1" fill="#088AC3" />
            <rect x="0" y="11.5" width="8.5" height="8.5" rx="1" fill="#088AC3" />
            <rect x="11.5" y="11.5" width="8.5" height="8.5" rx="1" fill="#088AC3" />
          </g>

          {/* Skyscraper 1: Leftmost slender angled tower */}
          <path
            d="M 250 236 L 250 192 L 268 180 L 268 246"
            stroke={isDarkBg ? "#CBD5E1" : "#355D7F"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Skyscraper 2: Tallest rear rectangular navy skyscraper */}
          <path
            d="M 276 246 L 276 68 L 322 68 L 322 246"
            stroke={isDarkBg ? "#FFFFFF" : "#193555"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Skyscraper 3: Prominent main bright cyan tower */}
          <path
            d="M 302 246 L 302 114 L 358 114 L 358 246"
            stroke="#088AC3"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Skyscraper 4: Lower stepped right cyan tower */}
          <path
            d="M 364 246 L 364 186 L 390 186 L 390 264"
            stroke="#088AC3"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Curved Horizon Swoosh Base beneath house & skyscrapers */}
          <path
            d="M 52 290 C 150 262 320 262 422 290 C 320 271 150 271 52 290 Z"
            fill={isDarkBg ? "#38BDF8" : "url(#horizonGradient)"}
          />

          <defs>
            <linearGradient id="horizonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#193555" />
              <stop offset="50%" stopColor="#355D7F" />
              <stop offset="100%" stopColor="#193555" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center text-start">
          <span
            className={`font-black tracking-tight leading-none text-base sm:text-lg ${
              isDarkBg ? 'text-white' : 'text-[#193555]'
            }`}
          >
            {isAr ? 'شركة أنوار نجد العقارية' : 'Anwar Najd Real Estate Company'}
          </span>
          <span
            className={`font-bold text-[10px] sm:text-xs tracking-wider uppercase mt-1 ${
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
