import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Users, Award, Building2, ThumbsUp, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { ArchitecturalBackground } from './ArchitecturalBackground';

interface TrustCounterProps {
  language: Language;
}

export const TrustCounter: React.FC<TrustCounterProps> = ({ language }) => {
  const t = translations[language];
  const [count, setCount] = useState(0);
  const [expCount, setExpCount] = useState(0);
  const [propCount, setPropCount] = useState(0);
  const [satCount, setSatCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let start30k = 0;
    const end30k = 30000;
    const duration = 2200;
    const steps = 60;
    const interval = duration / steps;
    const increment30k = Math.ceil(end30k / steps);

    let startExp = 0;
    const endExp = 15;
    const incExp = endExp / steps;

    let startProp = 0;
    const endProp = 500;
    const incProp = endProp / steps;

    let startSat = 0;
    const endSat = 98;
    const incSat = endSat / steps;

    const timer = setInterval(() => {
      start30k += increment30k;
      startExp += incExp;
      startProp += incProp;
      startSat += incSat;

      if (start30k >= end30k) {
        setCount(end30k);
        setExpCount(endExp);
        setPropCount(endProp);
        setSatCount(endSat);
        clearInterval(timer);
      } else {
        setCount(start30k);
        setExpCount(Math.min(endExp, Math.floor(startExp)));
        setPropCount(Math.min(endProp, Math.floor(startProp)));
        setSatCount(Math.min(endSat, Math.floor(startSat)));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  const formattedCount = count.toLocaleString('en-US');

  return (
    <section ref={containerRef} className="relative py-20 lg:py-28 bg-[#F4F8FB] border-y border-[#E1EBF2] overflow-hidden">
      {/* Architectural Background Lines */}
      <ArchitecturalBackground />

      {/* Floating Ambient Cyan Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#088AC3]/08 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#355D7F]/08 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header with Fade & Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
            {t.trustSection.badge}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-black text-[#193555] tracking-tight">
            {t.trustSection.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.trustSection.subtitle}
          </p>
        </motion.div>

        {/* 6. GIANT 30,000+ CLIENTS TRUST MONUMENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="mb-12 p-8 sm:p-14 rounded-3xl bg-[#193555] text-white shadow-2xl relative overflow-hidden group border border-[#355D7F]/40"
        >
          {/* Subtle Ambient Glow inside Card */}
          <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-[#088AC3]/25 blur-[90px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-28 -left-28 w-[380px] h-[380px] bg-[#38BDF8]/15 blur-[80px] pointer-events-none" />

          {/* Architectural CAD lines inside card */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" />
          </svg>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-start relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.12 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#088AC3]/20 border border-[#088AC3]/50 flex items-center justify-center flex-shrink-0 text-[#38BDF8] shadow-xl shadow-[#088AC3]/20"
              >
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-[#38BDF8]" />
              </motion.div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black text-white font-mono tracking-tight tabular-nums drop-shadow-md">
                    +{formattedCount}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8]">
                    {language === 'ar' ? 'أكثر من 30,000 عميل' : '30,000+ Clients'}
                  </span>
                </div>
                <p className="mt-3 text-sm sm:text-lg text-slate-200 font-medium max-w-xl leading-relaxed">
                  {language === 'ar'
                    ? 'أكثر من 30,000 عميل يضعون ثقتهم المستمرة في خبرات شركة أنوار نجد العقارية واستشاراتها الموثوقة.'
                    : 'Over thirty thousand valued clients rely on Anwar Najd Real Estate Company for premier real estate transactions.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <div className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#38BDF8] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'ar' ? 'ثقة مستمرة وشراكة استراتيجية' : 'Enduring Client Trust'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Secondary Metric Indicators: 3 Clean White Cards with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 2: 15+ Years Experience */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/60 transition-all hover:shadow-xl hover:shadow-[#193555]/08 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 flex items-center justify-center text-[#088AC3] group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#193555] font-mono tabular-nums">
                  {expCount}+
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#088AC3]">
                  {t.trustSection.stat2Label}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {t.trustSection.stat2Sub}
            </p>
          </motion.div>

          {/* Stat 3: 500+ Curated Properties */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/60 transition-all hover:shadow-xl hover:shadow-[#193555]/08 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 flex items-center justify-center text-[#088AC3] group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#193555] font-mono tabular-nums">
                  {propCount}+
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#088AC3]">
                  {t.trustSection.stat3Label}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {t.trustSection.stat3Sub}
            </p>
          </motion.div>

          {/* Stat 4: 98% Satisfaction */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/60 transition-all hover:shadow-xl hover:shadow-[#193555]/08 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 flex items-center justify-center text-[#088AC3] group-hover:scale-110 transition-transform">
                <ThumbsUp className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#193555] font-mono tabular-nums">
                  %{satCount}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#088AC3]">
                  {t.trustSection.stat4Label}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {t.trustSection.stat4Sub}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
