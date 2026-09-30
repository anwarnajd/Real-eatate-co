import React, { useState, useRef } from 'react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import {
  Building2,
  Key,
  Megaphone,
  Search,
  TrendingUp,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesPageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onOpenInquiry: (serviceTitle?: string) => void;
}

// 3D Tilt Service Card Component
const ServiceCardItem: React.FC<{
  service: { id: string; title: string; desc: string; points: string[] };
  icon: React.ReactNode;
  requestLabel: string;
  isAr: boolean;
  onRequest: () => void;
  index: number;
}> = ({ service, icon, requestLabel, isAr, onRequest, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(y * -10);
    setRotateY(x * 10);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="h-full"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`p-8 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between h-full group ${
          isHovered
            ? 'border-[#088AC3] shadow-[0_20px_40px_-15px_rgba(8,138,195,0.22)]'
            : 'border-[#E2E8F0] shadow-sm'
        }`}
      >
        <div style={{ transform: 'translateZ(20px)' }}>
          {/* Animated Icon with subtle rotation and glow on hover */}
          <motion.div
            animate={{
              rotate: isHovered ? 6 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="w-14 h-14 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 flex items-center justify-center mb-6 shadow-xs group-hover:border-[#088AC3]/50 group-hover:bg-[#E6F4FA]"
          >
            {icon}
          </motion.div>

          <h3 className="text-xl font-bold text-[#193555] mb-3 group-hover:text-[#088AC3] transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
            {service.desc}
          </p>

          <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
            {service.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#088AC3] flex-shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ transform: 'translateZ(15px)' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequest}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-[#088AC3] text-[#193555] hover:text-white border border-slate-200 hover:border-[#088AC3] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:shadow-md"
          >
            <span>{requestLabel}</span>
            <motion.span
              animate={{ x: isHovered ? (isAr ? -3 : 3) : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  language,
  setCurrentPage,
  onOpenInquiry,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const iconsMap: Record<string, React.ReactNode> = {
    sales: <Building2 className="w-6 h-6 text-[#088AC3]" />,
    leasing: <Key className="w-6 h-6 text-[#088AC3]" />,
    marketing: <Megaphone className="w-6 h-6 text-[#088AC3]" />,
    search: <Search className="w-6 h-6 text-[#088AC3]" />,
    investment: <TrendingUp className="w-6 h-6 text-[#088AC3]" />,
    consultation: <Headphones className="w-6 h-6 text-[#088AC3]" />,
  };

  return (
    <div className="w-full bg-white text-[#193555] min-h-screen">
      {/* 1. Page Header */}
      <section className="py-20 bg-[#F4F8FB] border-b border-[#E1EBF2] relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#088AC3]/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest font-bold text-[#088AC3]"
          >
            {t.servicesPage.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-5xl font-black text-[#193555] tracking-tight"
          >
            {t.servicesPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto"
          >
            {t.servicesPage.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Services Grid with 3D Tilt Cards and Animated Icons */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.servicesPage.servicesList.map((service, idx) => (
            <ServiceCardItem
              key={service.id}
              service={service}
              icon={iconsMap[service.id]}
              requestLabel={t.servicesPage.requestService}
              isAr={isAr}
              onRequest={() => onOpenInquiry(service.title)}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 3. Advisory Callout Strip */}
      <section className="py-16 bg-[#10243B] text-white border-t border-slate-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-[#38BDF8] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'حلول مخصصة للشركات والأفراد' : 'Custom Corporate & Individual Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isAr ? 'هل لديك متطلب عقاري خاص أو مشروع تطويري؟' : 'Have a Specific Property Mandate or Development Project?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            {isAr
              ? 'خبراء شركة أنوار نجد العقارية على أتم الاستعداد لتقديم حلول واستشارات مصممة وفق أهدافك الاستثمارية.'
              : 'Our executive advisors are at your service to craft bespoke investment and disposition strategies.'}
          </p>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-md shadow-[#088AC3]/20"
            >
              {isAr ? 'تواصل معنا الآن' : 'Contact Us Today'}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
