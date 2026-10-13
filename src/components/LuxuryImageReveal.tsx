import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageOff } from 'lucide-react';

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
  const [hasError, setHasError] = useState(false);
  const isRtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

  const overlayColors = {
    cyan: 'bg-gradient-to-r from-[#088AC3] to-[#38BDF8]',
    navy: 'bg-gradient-to-r from-[#193555] to-[#355D7F]',
    white: 'bg-white',
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className} bg-slate-100 flex items-center justify-center`}>
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 p-4 text-center select-none">
          <ImageOff className="w-10 h-10 text-slate-400 mb-2 stroke-[1.5]" />
          <span className="text-xs font-semibold text-slate-600">
            {isRtl ? 'الصورة غير متوفرة' : 'Image Not Found'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 font-mono break-all max-w-[90%]">
            {src}
          </span>
        </div>
      ) : (
        /* Target Image with Scale Entrance */
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          initial={{ scale: 1.08, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
        />
      )}

      {/* Sweeping Curtain Mask Reveal Overlay adapting to RTL/LTR */}
      <motion.div
        initial={{ x: '0%' }}
        whileInView={{ x: isRtl ? '-102%' : '102%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute inset-0 z-10 pointer-events-none ${overlayColors[overlayColor]}`}
      />
    </div>
  );
};
