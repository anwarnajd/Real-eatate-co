import React, { useState } from 'react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, BedDouble, Bath, Maximize2, Sparkles, ArrowRight, ArrowLeft, MessageCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { LuxuryImageReveal } from './LuxuryImageReveal';

interface FullWidthFeaturedPropertyProps {
  property: Property;
  language: Language;
  onSelectProperty: (property: Property) => void;
}

export const FullWidthFeaturedProperty: React.FC<FullWidthFeaturedPropertyProps> = ({
  property,
  language,
  onSelectProperty,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: y * 15 });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = isAr
      ? `السلام عليكم، أود الاستفسار عن القصر المميز: ${property.title.ar} (المرجع: ${property.refNumber}) لدى شركة أنوار نجد العقارية.`
      : `Hello, I would like to inquire about the featured luxury residence: ${property.title.en} (Ref: ${property.refNumber}) at Anwar Najd Real Estate Company.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden">
      {/* Background Architectural Glow - Desktop only */}
      <div className="hidden sm:block absolute top-1/2 start-0 w-[500px] h-[500px] bg-[#088AC3]/08 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-8 h-[2px] bg-[#088AC3]" />
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
            {isAr ? 'عقار الشهر الاستثنائي — فرصة نادرة' : 'Spotlight Luxury Property of the Month'}
          </span>
        </div>

        {/* Cinematic Full-Width Split Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center bg-white rounded-3xl p-4 sm:p-10 lg:p-12 border border-[#E2E8F0] shadow-xl hover:shadow-2xl transition-shadow duration-500"
        >
          {/* Column 1: Massive Cinematic Image with Parallax (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <motion.div
                animate={{
                  x: mousePos.x * 0.4,
                  y: mousePos.y * 0.4,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                <LuxuryImageReveal
                  src={property.images[0]}
                  alt={isAr ? property.title.ar : property.title.en}
                  aspectRatio="aspect-[16/10]"
                  overlayColor="cyan"
                />
              </motion.div>

              {/* Floating Marquee Badge */}
              <div className="absolute top-4 start-4 flex items-center gap-2 z-20">
                <span className="px-4 py-1.5 rounded-xl bg-[#193555]/95 text-white font-black text-xs shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{isAr ? 'عرض استثنائي موثق' : 'Exclusive Verified Asset'}</span>
                </span>
              </div>

              {/* Floating Price Tag */}
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between z-20">
                <div className="px-5 py-2.5 rounded-2xl bg-[#088AC3]/95 text-white shadow-xl backdrop-blur-md">
                  <span className="text-[10px] uppercase font-bold text-cyan-100 block">
                    {isAr ? 'القيمة الاستثمارية' : 'Listing Value'}
                  </span>
                  <span className="text-xl sm:text-2xl font-black font-mono">
                    {isAr ? property.priceFormatted.ar : property.priceFormatted.en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Architectural Details & Magnetic Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#088AC3] mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isAr ? property.location.districtAr : property.location.districtEn}
                  {' · '}
                  {isAr ? property.location.cityAr : property.location.cityEn}
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-slate-500 font-semibold">{property.refNumber}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight leading-tight">
                {isAr ? property.title.ar : property.title.en}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                {isAr ? property.description.ar : property.description.en}
              </p>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-center">
                <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.area}</span>
                <span className="text-sm font-black text-[#193555] font-mono">
                  {property.area} {t.featured.areaUnit}
                </span>
              </div>
              {property.bedrooms && (
                <div className="text-center border-s border-slate-200">
                  <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.beds}</span>
                  <span className="text-sm font-black text-[#193555] font-mono">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center border-s border-slate-200">
                  <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.baths}</span>
                  <span className="text-sm font-black text-[#193555] font-mono">{property.bathrooms}</span>
                </div>
              )}
            </div>

            {/* Key Features Bullets */}
            <div className="space-y-2 pt-1">
              {(isAr ? property.features.ar : property.features.en).slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#334155] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#088AC3]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons with Magnetic Pull */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <MagneticButton
                onClick={() => onSelectProperty(property)}
                className="flex-1 py-3.5 px-6 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-[#088AC3]/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{isAr ? 'استكشف تفاصيل هذا العقار' : 'Explore Full Property'}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={handleWhatsApp}
                className="py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.propertyDetails.whatsAppBtn}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
