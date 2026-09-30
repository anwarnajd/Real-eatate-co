import React from 'react';
import { motion } from 'motion/react';

interface ArchitecturalBackgroundProps {
  className?: string;
  variant?: 'grid' | 'blueprint' | 'elevation';
}

export const ArchitecturalBackground: React.FC<ArchitecturalBackgroundProps> = ({
  className = '',
  variant = 'grid',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      {/* 1. Subtle CAD Dimension Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="archGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#193555" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#088AC3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archGrid)" />
      </svg>

      {/* 2. Architectural Floor-Plan Lines (Subtle Elevation Geometry) */}
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 w-full max-w-4xl h-auto opacity-[0.06]"
      >
        {/* Foundation & Structural Column Lines */}
        <line x1="100" y1="520" x2="1100" y2="520" stroke="#088AC3" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="250" y1="180" x2="250" y2="520" stroke="#193555" strokeWidth="1.2" />
        <line x1="600" y1="120" x2="600" y2="520" stroke="#193555" strokeWidth="1.2" />
        <line x1="950" y1="240" x2="950" y2="520" stroke="#193555" strokeWidth="1.2" />

        {/* Cantilever Facade Slits */}
        <path d="M 250 180 L 600 120 L 950 240 L 950 360 L 600 240 L 250 300 Z" stroke="#088AC3" strokeWidth="1.5" />
        <path d="M 320 280 L 530 240 L 530 380 L 320 420 Z" stroke="#355D7F" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 670 220 L 880 300 L 880 440 L 670 360 Z" stroke="#355D7F" strokeWidth="1" strokeDasharray="4 4" />

        {/* Dimension ticks */}
        <circle cx="250" cy="180" r="3" fill="#088AC3" />
        <circle cx="600" cy="120" r="3" fill="#088AC3" />
        <circle cx="950" cy="240" r="3" fill="#088AC3" />
      </svg>

      {/* 3. Slow Drifting Cyan Laser/Beam Line */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/3 left-0 w-72 h-[1px] bg-gradient-to-r from-transparent via-[#088AC3]/30 to-transparent pointer-events-none"
      />
    </div>
  );
};
