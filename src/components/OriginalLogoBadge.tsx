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
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="badgeHorizonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#193555" />
            <stop offset="50%" stopColor="#355D7F" />
            <stop offset="100%" stopColor="#193555" />
          </linearGradient>
        </defs>

        {/* Chimney */}
        <path d="M 185 246 L 185 227 L 195 227 L 195 237" stroke="#193555" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Roof slope */}
        <path d="M 138 270 L 212 228 L 282 272" stroke="#193555" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* 4-Pane Cyan Window */}
        <g transform="translate(202, 246)">
          <rect x="0" y="0" width="8.5" height="8.5" rx="0.5" fill="#088AC3" />
          <rect x="10.5" y="0" width="8.5" height="8.5" rx="0.5" fill="#088AC3" />
          <rect x="0" y="10.5" width="8.5" height="8.5" rx="0.5" fill="#088AC3" />
          <rect x="10.5" y="10.5" width="8.5" height="8.5" rx="0.5" fill="#088AC3" />
        </g>

        {/* Skyscraper 1 */}
        <path d="M 260 258 L 260 226 L 274 216 L 274 268" stroke="#355D7F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Skyscraper 2 */}
        <path d="M 281 268 L 281 120 L 316 120 L 316 268" stroke="#193555" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Skyscraper 3 */}
        <path d="M 300 268 L 300 156 L 343 156 L 343 268" stroke="#088AC3" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Skyscraper 4 */}
        <path d="M 348 268 L 348 212 L 368 212 L 368 276" stroke="#088AC3" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Curved Horizon Swoosh Base */}
        <path d="M 98 301 C 180 278 320 278 402 301 C 320 286 180 286 98 301 Z" fill="url(#badgeHorizonGrad)" />

        {/* Typography from client logo */}
        <text x="250" y="342" fontFamily="'Cairo', sans-serif" fontWeight="800" fill="#193555" fontSize="36" textAnchor="middle">
          مكتب انوار نجد
        </text>
        <text x="250" y="380" fontFamily="'Cairo', sans-serif" fontWeight="700" fill="#088AC3" fontSize="24" textAnchor="middle">
          للخدمات العقارية
        </text>
      </svg>
    </div>
  );
};
