import React, { useState, useRef, useEffect } from 'react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';

interface FeaturedProperties3DShowcaseProps {
  featuredProperties: Property[];
  language: Language;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry?: (property?: Property | null, serviceTitle?: string) => void;
  onViewAll?: () => void;
}

export const FeaturedProperties3DShowcase: React.FC<FeaturedProperties3DShowcaseProps> = ({
  featuredProperties,
  language,
  onSelectProperty,
  onOpenInquiry,
  onViewAll,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const activeProperty = featuredProperties[activeIndex] || featuredProperties[0];

  const typeLabels: Record<string, { ar: string; en: string }> = {
    villa: { ar: 'فيلا فاخرة', en: 'Luxury Villa' },
    penthouse: { ar: 'بنتهاوس', en: 'Penthouse' },
    apartment: { ar: 'شقة سكنية', en: 'Apartment' },
    commercial: { ar: 'تجاري ومكاتب', en: 'Commercial' },
    land: { ar: 'أرض استثمارية', en: 'Investment Land' },
  };

  const purposeLabels: Record<string, { ar: string; en: string }> = {
    buy: { ar: 'للبيع', en: 'FOR SALE' },
    rent: { ar: 'للإيجار', en: 'FOR RENT' },
  };

  // 3D Parallax Tilt effect on mouse move (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Controlled subtle tilt (max 3 degrees) for high-end luxury feel
    setRotate({ x: y * -4, y: x * 5 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Auto-slide every 7 seconds, paused when hovering
  useEffect(() => {
    if (isHovered || featuredProperties.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProperties.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered, featuredProperties.length]);

  const nextProperty = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProperties.length);
  };

  const prevProperty = () => {
    setActiveIndex((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
  };

  // Mobile Touch Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      if (isAr) prevProperty();
      else nextProperty();
    } else if (diff < -45) {
      if (isAr) nextProperty();
      else prevProperty();
    }
    setTouchStartX(null);
  };

  const handleWhatsApp = (property: Property, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const propTitle = isAr ? property.title.ar : property.title.en;
    const isDaily = property.purpose === 'rent' && property.rentalPeriod === 'daily';
    const dPrice = property.dailyPrice ?? (isDaily ? property.price : undefined);
    const priceNote = isDaily && dPrice !== undefined
      ? (isAr ? ` - سعر الإيجار اليومي: ${dPrice} ريال / يوم` : ` - Daily Price: ${dPrice} SAR / day`)
      : '';
    const text = isAr
      ? `السلام عليكم، أود الاستفسار عن عقار [${propTitle}] (المرجع: ${property.refNumber}${priceNote}) لدى شركة انوار نجد العقارية.`
      : `Hello, I would like more information about [${propTitle}] (Ref: ${property.refNumber}${priceNote}) at Anwar Najd Real Estate Company.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!activeProperty) return null;

  const isActiveDailyRent = activeProperty.purpose === 'rent' && activeProperty.rentalPeriod === 'daily';
  const activeDailyPrice = activeProperty.dailyPrice ?? (isActiveDailyRent ? activeProperty.price : undefined);
  const activeDisplayPrice = isActiveDailyRent && activeDailyPrice !== undefined
    ? (isAr ? `${activeDailyPrice} ريال / يوم` : `${activeDailyPrice} SAR / day`)
    : (isAr ? activeProperty.priceFormatted.ar : activeProperty.priceFormatted.en);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F4F8FB] border-b border-[#E2E8F0] relative overflow-hidden">
      {/* Background Architectural Ambience */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#088AC3]/05 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-[#38BDF8]/05 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#088AC3]/10 border border-[#088AC3]/20 text-[#088AC3] text-xs font-extrabold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'عقارات مميزة' : 'Featured Properties'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
              {isAr ? 'عقارات مميزة' : 'Featured Properties'}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
              {isAr
                ? 'استكشف نخبة العروض العقارية الحصرية والمختارة بعناية في أرقى أحياء الرياض'
                : 'Explore our curated portfolio of premier properties in Riyadh’s most prestigious neighborhoods.'}
            </p>
          </motion.div>

          {onViewAll && (
            <motion.div
              initial={{ opacity: 0, x: isAr ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button
                type="button"
                onClick={onViewAll}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#088AC3] hover:text-[#0779AB] transition-colors cursor-pointer group"
              >
                <span>{isAr ? 'عرض كافة العقارات' : 'View All Properties'}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </motion.div>
          )}
        </div>

        {/* 1. 3D / MOTION STAGE SHOWCASE */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative perspective-1200 mb-14 lg:mb-20"
        >
          <motion.div
            animate={{
              rotateX: rotate.x,
              rotateY: rotate.y,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            className="relative rounded-3xl overflow-hidden bg-[#10243B] text-white border border-[#274567] shadow-[0_30px_70px_-15px_rgba(16,36,59,0.35)] transform-style-3d min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-end"
          >
            {/* Background 3D Property Image with Slow Ken-Burns Zoom & Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProperty.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0 overflow-hidden"
              >
                <motion.img
                  src={activeProperty.images[0] || '/images/property-fallback.jpg'}
                  alt={isAr ? activeProperty.title.ar : activeProperty.title.en}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                  }}
                  animate={{
                    scale: [1.0, 1.05],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full object-cover object-center will-change-transform"
                />

                {/* Multi-layered Cinematic Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10243B] via-[#10243B]/60 to-black/35 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#10243B]/40 to-[#10243B]/80 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Bar Floating Badges (Layer with 3D Pop translateZ) */}
            <div className="absolute top-5 sm:top-8 inset-x-5 sm:inset-x-8 z-20 flex items-center justify-between gap-3 pointer-events-none transform-translate-z-30">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-[#193555] font-black text-xs shadow-lg backdrop-blur-md">
                  {isAr ? purposeLabels[activeProperty.purpose]?.ar : purposeLabels[activeProperty.purpose]?.en}
                </span>

                <span className="px-3.5 py-1.5 rounded-xl bg-[#088AC3]/95 text-white font-bold text-xs shadow-lg backdrop-blur-md">
                  {isAr ? typeLabels[activeProperty.type]?.ar : typeLabels[activeProperty.type]?.en}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'عقار معتمد' : 'Verified'}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#193555]/85 text-cyan-200 font-mono text-xs font-bold border border-white/10 shadow-lg backdrop-blur-md">
                  {activeProperty.refNumber}
                </span>
              </div>
            </div>

            {/* Carousel Navigation Arrows */}
            {featuredProperties.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-3 sm:inset-x-5 z-20 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={prevProperty}
                  className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all pointer-events-auto cursor-pointer group hover:scale-105"
                  aria-label="Previous Property"
                >
                  {isAr ? (
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={nextProperty}
                  className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all pointer-events-auto cursor-pointer group hover:scale-105"
                  aria-label="Next Property"
                >
                  {isAr ? (
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </div>
            )}

            {/* Main Information Panel with Depth Elevation */}
            <div className="relative z-20 p-6 sm:p-10 lg:p-12 transform-translate-z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProperty.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-4xl"
                >
                  {/* Location & Tagline */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#38BDF8] font-bold mb-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {isAr ? activeProperty.location.districtAr : activeProperty.location.districtEn}
                      {' · '}
                      {isAr ? activeProperty.location.cityAr : activeProperty.location.cityEn}
                    </span>
                    <span className="text-white/30">|</span>
                    <span className="text-slate-300 font-normal">
                      {isAr ? 'الرياض — المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                    </span>
                  </div>

                  {/* Property Headline Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md leading-tight mb-3">
                    {isAr ? activeProperty.title.ar : activeProperty.title.en}
                  </h3>

                  {/* Description preview */}
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed mb-6 max-w-3xl drop-shadow">
                    {isAr ? activeProperty.description.ar : activeProperty.description.en}
                  </p>

                  {/* Specifications Grid Bar */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3.5 px-4 sm:px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-6 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-100">
                      <Maximize2 className="w-4 h-4 text-[#38BDF8]" />
                      <span className="font-mono font-bold text-white text-base">{activeProperty.area}</span>
                      <span className="text-slate-300">{t.featured.areaUnit}</span>
                    </div>

                    {activeProperty.bedrooms !== undefined && (
                      <div className="flex items-center gap-2 text-slate-100">
                        <BedDouble className="w-4 h-4 text-[#38BDF8]" />
                        <span className="font-mono font-bold text-white text-base">{activeProperty.bedrooms}</span>
                        <span className="text-slate-300">{t.featured.beds}</span>
                      </div>
                    )}

                    {activeProperty.bathrooms !== undefined && (
                      <div className="flex items-center gap-2 text-slate-100">
                        <Bath className="w-4 h-4 text-[#38BDF8]" />
                        <span className="font-mono font-bold text-white text-base">{activeProperty.bathrooms}</span>
                        <span className="text-slate-300">{t.featured.baths}</span>
                      </div>
                    )}

                    {activeProperty.yearBuilt && (
                      <div className="hidden sm:flex items-center gap-2 text-slate-100">
                        <Calendar className="w-4 h-4 text-[#38BDF8]" />
                        <span className="font-mono font-bold text-white text-base">{activeProperty.yearBuilt}</span>
                        <span className="text-slate-300">{isAr ? 'سنة البناء' : 'Built'}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Bar: Price & CTA buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/15">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-cyan-200 font-bold block mb-0.5">
                        {isActiveDailyRent
                          ? (isAr ? 'سعر الإيجار اليومي' : 'Daily Rental Price')
                          : (isAr ? 'القيمة الاستثمارية / السعر' : 'Offering Price')}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight drop-shadow-md">
                        {activeDisplayPrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => onSelectProperty(activeProperty)}
                        className="flex-1 sm:flex-none px-6 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-[#088AC3]/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleWhatsApp(activeProperty, e)}
                        className="px-4 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        title={isAr ? 'واتساب' : 'WhatsApp'}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">{isAr ? 'استفسر عبر واتساب' : 'WhatsApp'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick-Jump Thumbnails & Progress bar */}
            <div className="relative z-20 px-6 sm:px-10 lg:px-12 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2">
                {featuredProperties.map((prop, idx) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group/thumb relative rounded-xl overflow-hidden transition-all cursor-pointer flex items-center gap-2 px-2.5 py-1.5 ${
                      activeIndex === idx
                        ? 'bg-white/20 border border-white/40 ring-1 ring-cyan-400'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={prop.images[0] || '/images/property-fallback.jpg'}
                      alt={isAr ? prop.title.ar : prop.title.en}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="text-start hidden md:block max-w-[130px]">
                      <span className="block text-[11px] font-bold text-white truncate">
                        {isAr ? prop.title.ar : prop.title.en}
                      </span>
                      <span className="block text-[10px] text-cyan-200 font-mono">
                        {isAr ? prop.location.districtAr : prop.location.districtEn}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress counter */}
              <div className="text-xs font-mono font-bold text-slate-300 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-xs flex-shrink-0">
                {activeIndex + 1} / {featuredProperties.length}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. FEATURED PROPERTIES GRID (LARGER PREMIUM CARDS) */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-[#193555] tracking-tight">
              {isAr ? 'مختارات مميزة أخرى' : 'More Featured Selections'}
            </h3>
            <span className="text-xs font-bold text-[#64748B]">
              {featuredProperties.length} {isAr ? 'عقارات معتمدة' : 'Verified Properties'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProperty(prop)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] hover:border-[#088AC3]/40 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Large Premium Image with Hover Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <motion.img
                    src={prop.images[0] || '/images/property-fallback.jpg'}
                    alt={isAr ? prop.title.ar : prop.title.en}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs font-bold z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-xl bg-white/95 text-[#193555] shadow-sm backdrop-blur-md">
                        {isAr ? purposeLabels[prop.purpose]?.ar : purposeLabels[prop.purpose]?.en}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-[#088AC3] text-white shadow-sm backdrop-blur-md">
                        {isAr ? typeLabels[prop.type]?.ar : typeLabels[prop.type]?.en}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[11px] shadow-sm backdrop-blur-md">
                      {isAr ? 'متاح' : 'Available'}
                    </span>
                  </div>

                  {/* Price Tag in Image */}
                  <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white z-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold block mb-0.5">
                        {prop.purpose === 'rent' && prop.rentalPeriod === 'daily'
                          ? (isAr ? 'سعر الإيجار اليومي' : 'Daily Price')
                          : (isAr ? 'السعر' : 'Price')}
                      </span>
                      <span className="text-xl font-black font-mono drop-shadow-md">
                        {prop.purpose === 'rent' && prop.rentalPeriod === 'daily'
                          ? (isAr
                              ? `${prop.dailyPrice ?? prop.price} ريال / يوم`
                              : `${prop.dailyPrice ?? prop.price} SAR / day`)
                          : (isAr ? prop.priceFormatted.ar : prop.priceFormatted.en)}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-300">
                      {prop.refNumber}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#088AC3] font-bold mb-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {isAr ? prop.location.districtAr : prop.location.districtEn}
                        {' · '}
                        {isAr ? prop.location.cityAr : prop.location.cityEn}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold text-[#193555] group-hover:text-[#088AC3] transition-colors line-clamp-1 leading-snug">
                      {isAr ? prop.title.ar : prop.title.en}
                    </h4>

                    {/* Description */}
                    <p className="mt-2 text-xs text-[#475569] line-clamp-2 leading-relaxed font-normal">
                      {isAr ? prop.description.ar : prop.description.en}
                    </p>
                  </div>

                  {/* Specs & Actions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[#355D7F]" />
                        <span className="font-mono font-bold text-[#193555]">{prop.area}</span>
                        <span className="text-[#64748B]">{t.featured.areaUnit}</span>
                      </div>

                      {prop.bedrooms !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <BedDouble className="w-4 h-4 text-[#355D7F]" />
                          <span className="font-mono font-bold text-[#193555]">{prop.bedrooms}</span>
                          <span className="text-[#64748B]">{t.featured.beds}</span>
                        </div>
                      )}

                      {prop.bathrooms !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-[#355D7F]" />
                          <span className="font-mono font-bold text-[#193555]">{prop.bathrooms}</span>
                          <span className="text-[#64748B]">{t.featured.baths}</span>
                        </div>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className="w-full py-2.5 px-3 bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                        {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleWhatsApp(prop, e)}
                        className="w-full py-2.5 px-3 bg-slate-50 hover:bg-emerald-50 text-[#193555] hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{isAr ? 'واتساب' : 'WhatsApp'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
