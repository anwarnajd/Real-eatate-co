import React, { useState, useEffect } from 'react';
import { Property, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { DailyRentalBookingSection } from '../components/DailyRentalBookingSection';
import { RizeAnnualRentSection } from '../components/RizeAnnualRentSection';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyDetailsPageProps {
  property: Property;
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  language,
  setCurrentPage,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/images/property-fallback.jpg'];

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

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
      if (e.key === 'ArrowRight') {
        if (isAr) prevImage();
        else nextImage();
      }
      if (e.key === 'ArrowLeft') {
        if (isAr) nextImage();
        else prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isAr, images.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      if (isAr) prevImage();
      else nextImage();
    } else if (diff < -40) {
      if (isAr) nextImage();
      else prevImage();
    }
    setTouchStartX(null);
  };

  const isDailyRent = property.purpose === 'rent' && property.rentalPeriod === 'daily';
  const isAnnualRent = property.purpose === 'rent' && property.rentalPeriod === 'annual';
  const dailyPriceVal = property.dailyPrice ?? (isDailyRent ? property.price : undefined);

  const displayPrice = isDailyRent && dailyPriceVal !== undefined
    ? (isAr ? `سعر الإيجار اليومي: ${dailyPriceVal} ريال` : `Daily rental price: ${dailyPriceVal} SAR`)
    : (isAr ? property.priceFormatted.ar : property.priceFormatted.en);

  const handleWhatsAppInquiry = () => {
    const propTitle = isAr ? property.title.ar : property.title.en;
    const priceNote = isDailyRent && dailyPriceVal !== undefined
      ? (isAr ? ` (سعر الإيجار اليومي: ${dailyPriceVal} ريال)` : ` (Daily Rental Price: ${dailyPriceVal} SAR)`)
      : '';
    const text = isAr
      ? `السلام عليكم، أود الاستفسار عن عقار [${propTitle}] (المرجع: ${property.refNumber}${priceNote}) لدى شركة انوار نجد العقارية.`
      : `Hello, I would like more information about [${propTitle}] (Ref: ${property.refNumber}${priceNote}) at Anwar Najd Real Estate Company.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const similarProps = propertiesData
    .filter((p) => p.id !== property.id && (p.type === property.type || p.purpose === property.purpose))
    .slice(0, 3);

  return (
    <div className="w-full bg-white text-[#193555] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage('properties')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#193555] hover:text-[#088AC3] transition-colors py-2 px-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.propertyDetails.backBtn}</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B] font-mono">
              {t.propertyDetails.refNum}: <strong className="text-[#193555]">{property.refNumber}</strong>
            </span>
            <button
              onClick={handleShare}
              className="p-2 text-[#64748B] hover:text-[#193555] rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Share Property"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 1. Large Immersive Gallery with Click to Enlarge / Lightbox */}
        <div className="mb-10 space-y-4">
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group cursor-zoom-in"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={isAr ? property.title.ar : property.title.en}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.07 : 1.02 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </AnimatePresence>

            {/* Subtle Gradient Scrim on Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Slider Controls */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute start-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/85 hover:bg-white text-[#193555] shadow-md transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronRight className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute end-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/85 hover:bg-white text-[#193555] shadow-md transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronLeft className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} />
                </button>
              </>
            )}

            {/* Floating Tags on Hero */}
            <div className="absolute top-4 start-4 flex items-center gap-2 z-10">
              <span className="px-3.5 py-1 rounded-lg bg-[#088AC3] text-white font-bold text-xs shadow-md">
                {isAr ? purposeLabels[property.purpose]?.ar : purposeLabels[property.purpose]?.en}
              </span>
              {property.purpose === 'rent' && property.rentalPeriod && (
                <span className="px-3.5 py-1 rounded-lg bg-[#193555] text-white font-bold text-xs shadow-md">
                  {property.rentalPeriod === 'daily'
                    ? (isAr ? 'إيجار يومي' : 'Daily Rental')
                    : property.rentalPeriod === 'monthly'
                    ? (isAr ? 'إيجار شهري' : 'Monthly Rental')
                    : (isAr ? 'إيجار سنوي' : 'Annual Rental')}
                </span>
              )}
              <span className="px-3.5 py-1 rounded-lg bg-white/95 text-[#193555] font-bold text-xs shadow-md">
                {isAr ? typeLabels[property.type]?.ar : typeLabels[property.type]?.en}
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md">
                {isAr ? 'متاح' : 'AVAILABLE'}
              </span>
            </div>

            {/* Enlarge Button Hint */}
            <div className="absolute top-4 end-4 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'تكبير المعرض' : 'Click to Enlarge'}</span>
              </button>
            </div>

            {/* Price Badge on Hero */}
            <div className="absolute bottom-4 start-4 sm:bottom-6 sm:start-6 text-white z-10">
              <span className="text-xs uppercase tracking-wider text-[#38BDF8] font-bold block mb-1">
                {isDailyRent
                  ? (isAr ? 'سعر الإيجار اليومي' : 'Daily Rental Price')
                  : (isAr ? 'القيمة الاستثمارية / السعر' : 'Listing Price')}
              </span>
              <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight drop-shadow-md">
                {displayPrice}
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 end-4 z-10 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-xs font-mono">
              {activeImageIndex + 1} / {images.length}
            </div>

            {/* Mobile Dots Indicator */}
            {images.length > 1 && (
              <div className="sm:hidden absolute bottom-4 start-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeImageIndex === i ? 'bg-cyan-400 w-4' : 'bg-white/60 w-1.5'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#088AC3] shadow-md ring-2 ring-[#088AC3]/20'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Main Content Grid (8 cols Details + 4 cols Sticky Inquiry Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Details Column (8 cols) on Clean White */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Address */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#088AC3] font-bold mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isAr ? property.location.districtAr : property.location.districtEn}
                  {' · '}
                  {isAr ? property.location.cityAr : property.location.cityEn}
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-slate-500 font-semibold">{property.refNumber}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight leading-tight">
                {isAr ? property.title.ar : property.title.en}
              </h1>

              {/* Prominent Price Banner */}
              <div className={`mt-4 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                isDailyRent
                  ? 'bg-gradient-to-r from-[#EBF6FC] to-[#F8FAFC] border-[#088AC3]/30'
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#088AC3] font-bold block mb-0.5">
                    {isDailyRent
                      ? (isAr ? 'نظام الإيجار اليومي' : 'Daily Rental Plan')
                      : (isAr ? 'القيمة / السعر' : 'Price / Value')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#193555]">
                    {isDailyRent && dailyPriceVal !== undefined
                      ? (isAr ? `سعر الإيجار اليومي: ${dailyPriceVal} ريال` : `Daily rental price: ${dailyPriceVal} SAR`)
                      : (isAr ? property.priceFormatted.ar : property.priceFormatted.en)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isDailyRent && (
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      {isAr ? 'احجز الآن / خيارات الدفع' : 'Book Now / Payment'}
                    </button>
                  )}
                  {isAnnualRent && (
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('rize-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      {isAr ? 'قسّم الإيجار مع رايز' : 'Pay Monthly with Rize'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Metrics Bar with Verified Details Only */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white text-[#088AC3] border border-slate-200 shadow-xs">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.area}</span>
                  <span className="text-sm font-bold text-[#193555] font-mono">
                    {property.area} {t.featured.areaUnit}
                  </span>
                </div>
              </div>

              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-[#088AC3] border border-slate-200 shadow-xs">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.beds}</span>
                    <span className="text-sm font-bold text-[#193555] font-mono">{property.bedrooms}</span>
                  </div>
                </div>
              )}

              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-[#088AC3] border border-slate-200 shadow-xs">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.baths}</span>
                    <span className="text-sm font-bold text-[#193555] font-mono">{property.bathrooms}</span>
                  </div>
                </div>
              )}

              {property.yearBuilt && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-[#088AC3] border border-slate-200 shadow-xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">{t.propertyDetails.yearBuilt}</span>
                    <span className="text-sm font-bold text-[#193555] font-mono">{property.yearBuilt}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Overview / Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
            >
              <h3 className="text-lg font-bold text-[#193555] mb-4 pb-2 border-b border-slate-100">
                {t.propertyDetails.description}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed whitespace-pre-line font-normal">
                {isAr ? property.description.ar : property.description.en}
              </p>
            </motion.div>

            {/* Detailed Key Specs (Only Verified Details) */}
            {property.specs && property.specs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
              >
                <h3 className="text-lg font-bold text-[#193555] mb-4 pb-2 border-b border-slate-100">
                  {t.propertyDetails.propertySpecs}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-[#64748B]">{isAr ? spec.labelAr : spec.labelEn}</span>
                      <span className="text-xs font-bold text-[#193555] font-mono">{isAr ? spec.valueAr : spec.valueEn}</span>
                    </div>
                  ))}
                  {property.facade && (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-[#64748B]">{t.propertyDetails.facade}</span>
                      <span className="text-xs font-bold text-[#193555]">{isAr ? property.facade.ar : property.facade.en}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Features & Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
            >
              <h3 className="text-lg font-bold text-[#193555] mb-4 pb-2 border-b border-slate-100">
                {t.propertyDetails.featuresTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isAr ? property.features.ar : property.features.en).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                    <CheckCircle2 className="w-4 h-4 text-[#088AC3] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location Area & Map Simulation */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-[#193555]">
                  {t.propertyDetails.locationTitle}
                </h3>
                <span className="text-xs text-[#088AC3] font-bold">
                  {isAr ? property.location.districtAr : property.location.districtEn} - {isAr ? property.location.cityAr : property.location.cityEn}
                </span>
              </div>

              {/* Styled architectural map view */}
              <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden bg-[#F0F6FA] border border-slate-200 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #088AC3 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center text-center p-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 rounded-full bg-[#088AC3] text-white flex items-center justify-center mb-2 shadow-lg shadow-[#088AC3]/30"
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>
                  <span className="text-sm font-bold text-[#193555]">
                    {isAr ? property.location.districtAr : property.location.districtEn}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Inquiry Column (4 cols) with 3D Depth Lift */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            {/* 1. DAILY RENTAL: Direct Booking & Payment Options (Tabby & Tamara) */}
            {isDailyRent && (
              <div id="booking-section">
                <DailyRentalBookingSection property={property} language={language} />
              </div>
            )}

            {/* 2. ANNUAL RENTAL: Rize Monthly Rent Installments */}
            {isAnnualRent && (
              <div id="rize-section">
                <RizeAnnualRentSection property={property} language={language} />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#088AC3]/40 shadow-xl"
            >
              <span className="text-[11px] uppercase tracking-wider text-[#088AC3] font-bold block mb-1">
                {isAr ? 'شركة انوار نجد العقارية' : 'Anwar Najd Real Estate Co.'}
              </span>
              <h3 className="text-xl font-black text-[#193555]">
                {t.propertyDetails.enquireBtn}
              </h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                {isAr
                  ? 'تواصل مباشرة مع مستشارينا لمعاينة العقار، الحصول على ملف المواصفات الكامل، أو حجز موعد المعاينة.'
                  : 'Contact our senior property specialists for scheduling a private tour or receiving full documentation.'}
              </p>

              {/* Dedicated Daily Rental Price Badge */}
              {isDailyRent && dailyPriceVal !== undefined && (
                <div className="mt-4 p-4 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/30">
                  <span className="text-[11px] font-bold text-[#088AC3] block mb-1">
                    {isAr ? 'نظام التسعير اليومي' : 'Daily Rental Pricing'}
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#193555]">
                    {isAr ? `سعر الإيجار اليومي: ${dailyPriceVal} ريال` : `Daily rental price: ${dailyPriceVal} SAR`}
                  </div>
                  <span className="text-[11px] text-[#64748B] mt-1 block">
                    {isAr ? 'حجز يومي مرن يشمل التجهيزات الفندقية والخدمات' : 'Flexible daily booking inclusive of all amenities'}
                  </span>
                </div>
              )}

              {/* Action Buttons with Motion */}
              <div className="mt-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenInquiry(property)}
                  className="w-full py-3.5 px-4 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm transition-shadow duration-300 shadow-md shadow-[#088AC3]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.propertyDetails.enquireBtn}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.propertyDetails.whatsAppBtn}</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${t.companyPhone}`}
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-[#193555] border border-slate-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#088AC3]" />
                  <span>{t.propertyDetails.callBtn}: {t.companyPhoneDisplay}</span>
                </motion.a>
              </div>

              {/* Compliance Markers */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#088AC3] flex-shrink-0" />
                  <span>{isAr ? 'عقود موثقة ومعتمدة من الهيئة العامة للعقار' : 'Official accredited transaction framework'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#088AC3] flex-shrink-0" />
                  <span>{isAr ? 'فحص ومطابقة الصكوك الإلكترونية رسمياً' : 'Verified electronic deed verification'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Similar Properties Section */}
        {similarProps.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-[#088AC3]">
                {isAr ? 'خيارات إضافية' : 'Curated Options'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#193555] mt-1">
                {t.propertyDetails.similarProperties}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProps.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  language={language}
                  onSelect={(p) => {
                    onSelectProperty(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 8. FULLSCREEN GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-white z-20 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white/10 border border-white/20">
                  {activeImageIndex + 1} / {images.length}
                </span>
                <span className="text-sm font-bold hidden sm:inline text-slate-200">
                  {isAr ? property.title.ar : property.title.en}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAr ? 'استفسر عبر واتساب' : 'Inquire on WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Center Large Image with Slide Animation */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={images[activeImageIndex]}
                  alt={`${isAr ? property.title.ar : property.title.en} - ${activeImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>

              {/* Prev / Next Buttons in Lightbox */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronRight className={`w-6 h-6 ${isAr ? '' : 'rotate-180'}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronLeft className={`w-6 h-6 ${isAr ? '' : 'rotate-180'}`} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnails Strip in Lightbox */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2 overflow-x-auto max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#38BDF8] scale-105'
                        : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
