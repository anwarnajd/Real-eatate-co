import React from 'react';
import { motion } from 'motion/react';

interface LuxuryImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  overlayColor?: 'cyan' | 'navy' | 'white';
}

export const LuxuryImageReveal: React.FC<LuxuryImageRevealProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  overlayColor = 'cyan',
}) => {
  const overlayColors = {
    cyan: 'bg-gradient-to-r from-[#088AC3] to-[#38BDF8]',
    navy: 'bg-gradient-to-r from-[#193555] to-[#355D7F]',
    white: 'bg-white',
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Target Image with Scale Entrance */}
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        initial={{ scale: 1.1, filter: 'blur(4px)' }}
        whileInView={{ scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover"
      />

      {/* Sweeping Curtain Mask Reveal Overlay */}
      <motion.div
        initial={{ x: '0%' }}
        whileInView={{ x: '102%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute inset-0 z-10 pointer-events-none ${overlayColors[overlayColor]}`}
      />
    </div>
  );
};
