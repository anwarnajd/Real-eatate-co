import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import { TrustCounter } from '../components/TrustCounter';
import { OriginalLogoBadge } from '../components/OriginalLogoBadge';
import {
  Compass,
  Target,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  setCurrentPage,
  onOpenInquiry,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  return (
    <div className="w-full bg-white text-[#193555] overflow-x-hidden">
      {/* 1. Page Header Banner on Light Subtle Blue/Gray */}
      <section className="py-24 bg-[#F4F8FB] border-b border-[#E1EBF2] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#088AC3]/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-widest font-bold text-[#088AC3]"
          >
            {t.aboutPage.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-3xl sm:text-5xl font-black text-[#193555] tracking-tight"
          >
            {t.aboutPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto"
          >
            {t.aboutPage.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Detailed Company Introduction with High-End Architectural Photo & Brand Badge */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'عراقة واحترافية عقارية' : 'Established Real Estate Leadership'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] leading-tight">
              {isAr
                ? 'حلول عقارية متكاملة تعزز موثوقية الاستثمار والعيش الراقي'
                : 'Integrated Property Solutions Built on Trust and Strategic Reach'}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              <p>{t.aboutPage.introP1}</p>
              <p className="p-4 rounded-xl bg-[#F0F7FB] border-s-4 border-[#088AC3] text-[#193555] font-semibold">
                {t.aboutPage.introP2}
              </p>
              <p>{t.aboutPage.introP3}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'تصفح قائمة العقارات' : 'Browse Properties'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenInquiry}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-[#193555] text-xs font-bold rounded-xl border border-slate-300 transition-all cursor-pointer shadow-xs"
              >
                <span>{isAr ? 'طلب استشارة' : 'Inquire With Us'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase + Brand Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-100">
              <motion.img
                src="/images/about-corporate-lounge.jpg"
                alt="Anwar Najd Real Estate Corporate Advisory Suite"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243B]/80 via-transparent to-transparent pointer-events-none" />

              {/* Overlaid Accreditation Callout */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F7FB] text-[#088AC3] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#193555]">
                      {isAr ? 'اعتماد نظامي وترخيص رسمي' : 'Fully Licensed Enterprise'}
                    </h4>
                    <p className="text-[11px] text-[#64748B]">
                      {isAr
                        ? 'مرخصة ومصرحة وفق ضوابط الهيئة العامة للعقار'
                        : 'Accredited per Saudi Real Estate General Authority standards'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Brand Identity Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/40 flex flex-col sm:flex-row items-center gap-6"
            >
              <OriginalLogoBadge size="sm" className="flex-shrink-0" />
              <div className="text-start">
                <span className="text-[11px] font-bold text-[#088AC3] uppercase tracking-wider block">
                  {isAr ? 'الهوية الرسمية المعتمدة' : 'Official Brand Identity'}
                </span>
                <h4 className="text-sm font-bold text-[#193555] mt-1">
                  {t.companyName}
                </h4>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {isAr
                    ? 'رمز الثقة والخبرة العقارية المتوارثة في منطقة نجد والمملكة العربية السعودية.'
                    : 'A trusted symbol of real estate advisory across the Najd region and Saudi Arabia.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Vision & Mission Section on Soft Light Background with Staggered Entrance */}
      <section className="py-20 bg-[#F4F8FB] border-y border-[#E1EBF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/50 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#193555] mb-3 group-hover:text-[#088AC3] transition-colors">
                {t.aboutPage.visionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {t.aboutPage.visionDesc}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#088AC3]/50 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#193555] mb-3 group-hover:text-[#088AC3] transition-colors">
                {t.aboutPage.missionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {t.aboutPage.missionDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section with Staggered Entrance */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-bold text-[#088AC3]">
            {isAr ? 'مبادئنا الراسخة' : 'Core Principles'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-black text-[#193555] tracking-tight">
            {t.aboutPage.valuesTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.aboutPage.values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#088AC3] group-hover:scale-110 transition-transform" />
                <h4 className="text-base font-bold text-[#193555]">{val.title}</h4>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. 30,000+ Clients Trust Highlight */}
      <TrustCounter language={language} />
    </div>
  );
};
