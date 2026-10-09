import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OriginalLogoBadge } from './OriginalLogoBadge';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 1-second display timer as requested: "about 1 second. Then smoothly transition"
    const timer = setTimeout(() => {
      setShow(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="intro-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[450px] h-[450px] bg-[#088AC3]/12 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

          {/* Logo Center Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center p-6"
          >
            {/* Logo Emblem */}
            <div className="relative">
              <OriginalLogoBadge size="md" className="border-none shadow-none" />

              {/* Animated Light Shimmer Ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.9, 1.25], opacity: [0.6, 0] }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-0 rounded-3xl border-2 border-[#088AC3]/50 pointer-events-none"
              />
            </div>

            {/* Quick Loading Progress Line */}
            <div className="mt-4 w-40 h-[2.5px] bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#088AC3] to-[#38BDF8]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
