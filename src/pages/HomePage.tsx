import React, { useState, useRef, useMemo } from 'react';
import { translations } from '../data/translations';
import { propertiesData } from '../data/properties';
import { TrustCounter } from '../components/TrustCounter';
import { PropertyCard } from '../components/PropertyCard';
import { FullWidthFeaturedProperty } from '../components/FullWidthFeaturedProperty';
import { MagneticButton } from '../components/MagneticButton';
import { ArchitecturalBackground } from '../components/ArchitecturalBackground';
import { CustomerReviews } from '../components/CustomerReviews';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Shield,
  Building,
  CheckCircle,
  TrendingUp,
  Headphones,
  Sparkles,
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  RIYADH_DISTRICTS,
  EXACT_PRICE_RANGES,
  RENT_PRICE_RANGES,
  RENTAL_PERIOD_OPTIONS,
  OWNER_PROPERTY_TYPES,
} from '../data/riyadhNeighborhoods';
import { Property, Language, PropertyPurpose, PropertyType, RentalPeriod, PageId } from '../types';

interface HomePageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property?: Property | null, serviceTitle?: string) => void;
  onApplySearchFilter: (filter: {
    purpose: PropertyPurpose | 'all';
    type: PropertyType | 'all';
    district: string;
    minPrice: number;
    maxPrice: number;
    priceRangeId?: string;
    rentalPeriod?: RentalPeriod | 'all';
  }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  setCurrentPage,
  onSelectProperty,
  onOpenInquiry,
  onApplySearchFilter,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  // Search Bar State
  const [purpose, setPurpose] = useState<PropertyPurpose>('buy');
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod | 'all'>('all');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [district, setDistrict] = useState<string>('all');
  const [priceRangeId, setPriceRangeId] = useState<string>('all');

  const handlePurposeChange = (newPurpose: PropertyPurpose) => {
    setPurpose(newPurpose);
    setPriceRangeId('all');
    if (newPurpose === 'buy') {
      setRentalPeriod('all');
    }
  };

  // Mouse Parallax for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll-based parallax for Hero layers
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -60]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 22, y: y * 18 });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Featured Properties Filter State
  const [featuredCategory, setFeaturedCategory] = useState<'all' | 'residential' | 'commercial' | 'investment' | 'projects'>('all');

  const displayedProperties = useMemo<Property[]>(() => {
    return propertiesData.filter((p: Property) => {
      if (featuredCategory === 'all') return true;
      if (featuredCategory === 'residential') return ['villa', 'penthouse', 'apartment'].includes(p.type);
      if (featuredCategory === 'commercial') return p.type === 'commercial';
      if (featuredCategory === 'investment') return p.type === 'land' || p.type === 'commercial';
      if (featuredCategory === 'projects') return p.featured;
      return true;
    });
  }, [featuredCategory]);

  const featuredProperties = propertiesData.filter((p) => p.featured);
  const headlineWords = t.hero.headline.split(' ');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeRanges = purpose === 'rent' ? RENT_PRICE_RANGES : EXACT_PRICE_RANGES;
    const selectedRange = activeRanges.find((r) => r.id === priceRangeId);
    onApplySearchFilter({
      purpose,
      type: propertyType,
      district: district === 'all' ? '' : district,
      minPrice: selectedRange ? selectedRange.min : 0,
      maxPrice: selectedRange ? selectedRange.max : 0,
      priceRangeId,
      rentalPeriod: purpose === 'rent' ? rentalPeriod : undefined,
    });
    setCurrentPage('properties');
  };

  return (
    <div className="w-full bg-white text-[#193555] overflow-x-hidden">
      {/* 1. Cinematic Luxury Hero Section with Multi-Layer Parallax & Cinematic Reveal Sequence */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center items-center overflow-hidden border-b border-slate-200 w-full max-w-full"
      >
        {/* Layer 1: Background Property Image with Very Subtle Cinematic Zoom & Parallax */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <motion.img
            src="/images/hero-skyline.jpg"
            alt="Riyadh Luxury Architecture & Skyline"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
            }}
            animate={{
              scale: [1.00, 1.05, 1.00],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full object-cover object-center will-change-transform"
          />

          {/* Layer 2: Subtle Dark/Brand Scrim Gradient for Crisp Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243B]/95 via-[#10243B]/70 to-[#193555]/65" />
        </motion.div>

        {/* Layer 3: Subtle Architectural Grid Lines & Blueprint Accents */}
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-20 overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroArchGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="1.5" fill="#38BDF8" fillOpacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroArchGrid)" />
          </svg>
        </div>

        {/* Layer 4: Floating Ambient Light Orbs - Desktop fine pointer only */}
        <motion.div
          animate={{
            x: mouseOffset.x * 0.5,
            y: mouseOffset.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 30 }}
          className="hidden md:block absolute top-1/4 start-0 w-80 h-80 bg-[#088AC3]/20 rounded-full blur-[120px] pointer-events-none z-[3]"
        />
        <motion.div
          animate={{
            x: mouseOffset.x * -0.4,
            y: mouseOffset.y * -0.4,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 30 }}
          className="hidden md:block absolute bottom-1/4 end-0 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-[130px] pointer-events-none z-[3]"
        />

        {/* Layer 5: Staggered Cinematic Content Entrance */}
        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 w-full max-w-5xl mx-0 sm:mx-auto px-[18px] sm:px-6 lg:px-8 text-center pt-14 sm:pt-24 pb-12 sm:pb-16 flex flex-col items-center"
        >
          {/* 1. Anwar Najd Logo Icon Mark (0.1s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 sm:mb-4 flex justify-center"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-[#38BDF8]" />
            </div>
          </motion.div>

          {/* 2. Introductory Tag Text (0.25s) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38BDF8] text-xs sm:text-sm font-bold mb-4 sm:mb-6 backdrop-blur-md shadow-xs max-w-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
            <span className="truncate">{t.hero.tag}</span>
          </motion.div>

          {/* 3. Cinematic Headline Reveal via overflow: hidden (0.4s) */}
          <div className="overflow-hidden py-1 w-full max-w-full">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(1.75rem, 8.5vw, 3.5rem)',
                lineHeight: 1.12,
                overflowWrap: 'break-word',
              }}
              className="font-black text-white tracking-tight max-w-4xl mx-auto drop-shadow-md break-words w-full"
            >
              {t.hero.headline}
            </motion.h1>
          </div>

          {/* 4. Supporting Text (0.6s) */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              lineHeight: 1.6,
              overflowWrap: 'break-word',
            }}
            className="mt-4 sm:mt-6 text-[16px] sm:text-[18px] text-slate-100 w-full max-w-2xl mx-auto drop-shadow font-medium px-1 break-words"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* 5. CTA Buttons: Stack vertically on mobile, row on tablet/desktop (0.8s) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-full sm:max-w-none mx-auto"
          >
            <MagneticButton
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[52px] px-6 sm:px-8 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl shadow-lg shadow-[#088AC3]/30 transition-all flex items-center justify-center gap-2 group cursor-pointer text-center text-sm sm:text-base"
            >
              <span>{t.hero.exploreBtn}</span>
              <motion.span
                animate={{ x: isAr ? [0, -3, 0] : [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.span>
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto min-h-[52px] px-6 sm:px-8 py-3.5 bg-white/95 hover:bg-white text-[#193555] font-bold rounded-xl shadow-md transition-all cursor-pointer text-center text-sm sm:text-base flex items-center justify-center"
            >
              <span>{t.hero.contactBtn}</span>
            </MagneticButton>
          </motion.div>

          {/* 6. Floating Luxury Search Bar (0.95s) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-12 w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_20px_50px_rgba(25,53,85,0.25)] border border-slate-100 text-start text-[#193555]"
          >
            {/* Segmented Purpose Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => handlePurposeChange('buy')}
                className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  purpose === 'buy'
                    ? 'bg-[#088AC3] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#193555] bg-slate-100'
                }`}
              >
                {t.hero.searchCard.buy}
              </button>
              <button
                type="button"
                onClick={() => handlePurposeChange('rent')}
                className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-[#088AC3] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#193555] bg-slate-100'
                }`}
              >
                {t.hero.searchCard.rent}
              </button>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className={`grid grid-cols-1 sm:grid-cols-2 ${purpose === 'rent' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3`}
            >
              {/* Type Select */}
              <div>
                <label className="block text-[11px] font-bold text-[#193555] mb-1">
                  {t.hero.searchCard.propertyType}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType | 'all')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                >
                  {OWNER_PROPERTY_TYPES.map((pt) => (
                    <option key={pt.id} value={pt.id}>
                      {isAr ? pt.nameAr : pt.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Select with All Riyadh Neighborhoods */}
              <div>
                <label className="block text-[11px] font-bold text-[#193555] mb-1">
                  {t.hero.searchCard.location}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                >
                  <option value="all">{isAr ? 'كافة أحياء الرياض' : 'All Riyadh Districts'}</option>
                  {RIYADH_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.nameAr}>
                      {isAr ? `حي ${d.nameAr}` : `${d.nameEn} District`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rental Period Filter - Only visible when Rent is selected */}
              {purpose === 'rent' && (
                <div>
                  <label className="block text-[11px] font-bold text-[#193555] mb-1">
                    {t.hero.searchCard.rentalPeriod || (isAr ? 'فترة الإيجار' : 'Rental Period')}
                  </label>
                  <select
                    value={rentalPeriod}
                    onChange={(e) => setRentalPeriod(e.target.value as RentalPeriod | 'all')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                  >
                    {RENTAL_PERIOD_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {isAr ? opt.nameAr : opt.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Ranges: Rent vs Sale */}
              <div>
                <label className="block text-[11px] font-bold text-[#193555] mb-1">
                  {t.hero.searchCard.priceRange}
                </label>
                <select
                  value={priceRangeId}
                  onChange={(e) => setPriceRangeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                >
                  {(purpose === 'rent' ? RENT_PRICE_RANGES : EXACT_PRICE_RANGES).map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {isAr ? pr.labelAr : pr.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Search */}
              <div className="flex items-end">
                <MagneticButton
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.hero.searchCard.searchBtn}</span>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. FULL-WIDTH FEATURED LUXURY PROPERTY OF THE MONTH */}
      {featuredProperties.length > 0 && (
        <FullWidthFeaturedProperty
          property={featuredProperties[0]}
          language={language}
          onSelectProperty={onSelectProperty}
        />
      )}

      {/* 6. TRUST STATISTIC EXPERIENCE (+30,000 CLIENTS MONUMENT) */}
      <TrustCounter language={language} />

      {/* 4. INTERACTIVE PROPERTY SHOWCASE: FEATURED PROPERTIES & PROJECTS */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
              {t.featured.badge}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
              {t.featured.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed">
              {t.featured.subtitle}
            </p>
          </div>

          <MagneticButton
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#088AC3] hover:text-[#0779AB] transition-colors cursor-pointer"
          >
            <span>{t.featured.viewAll}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </MagneticButton>
        </motion.div>

        {/* 6. Simple Interactive Filter Tabs (Compact and horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {(
            [
              { id: 'all', label: t.featured.filters.all },
              { id: 'residential', label: t.featured.filters.residential },
              { id: 'commercial', label: t.featured.filters.commercial },
              { id: 'investment', label: t.featured.filters.investment },
              { id: 'projects', label: t.featured.filters.projects },
            ] as const
          ).map((tab) => {
            const isActive = featuredCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFeaturedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#088AC3] text-white shadow-md shadow-[#088AC3]/20'
                    : 'bg-slate-100 text-[#475569] hover:text-[#193555] hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Property Cards Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProperties.map((prop, idx) => (
              <motion.div
                layout
                key={prop.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard
                  property={prop}
                  language={language}
                  onSelect={onSelectProperty}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 12. INVESTMENT SECTION (فرص عقارية واستثمارية) */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#10243B] via-[#193555] to-[#10243B] text-white border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#088AC3]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-md"
          >
            <div className="max-w-2xl text-center lg:text-start">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#38BDF8] inline-flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.investment.badge}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {t.investment.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                {t.investment.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <MagneticButton
                onClick={() => onOpenInquiry(null, isAr ? 'فرص عقارية واستثمارية' : 'Real Estate & Investment Opportunities')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl shadow-lg shadow-[#088AC3]/30 transition-all cursor-pointer text-center text-xs sm:text-sm"
              >
                <span>{t.investment.cta}</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us (لماذا انوار نجد العقارية؟) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
        <ArchitecturalBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
              {t.whyUs.badge}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
              {t.whyUs.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475569]">
              {t.whyUs.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-xl hover:shadow-[#193555]/08 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#193555] mb-2">
                {t.whyUs.item1.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {t.whyUs.item1.desc}
              </p>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-xl hover:shadow-[#193555]/08 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#193555] mb-2">
                {t.whyUs.item2.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {t.whyUs.item2.desc}
              </p>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-xl hover:shadow-[#193555]/08 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#193555] mb-2">
                {t.whyUs.item3.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {t.whyUs.item3.desc}
              </p>
            </motion.div>

            {/* Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-xl hover:shadow-[#193555]/08 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#193555] mb-2">
                {t.whyUs.item4.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {t.whyUs.item4.desc}
              </p>
            </motion.div>

            {/* Item 5 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-xl hover:shadow-[#193555]/08 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#193555] mb-2">
                {t.whyUs.item5.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {t.whyUs.item5.desc}
              </p>
            </motion.div>

            {/* Direct Consultation Box in Navy Accent with Magnetic Button */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 rounded-2xl bg-[#193555] text-white shadow-xl flex flex-col justify-between border border-[#355D7F]/40"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  {isAr ? 'استشارة عقارية متخصصة' : 'Executive Consultation'}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  {isAr ? 'تواصل مع مستشارنا الآن' : 'Speak With Our Senior Advisor'}
                </h3>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  {isAr
                    ? 'فريق شركة انوار نجد العقارية على استعداد للإجابة على استفساراتكم ومرافقتكم في كل خطوة.'
                    : 'Our team is ready to evaluate your requirements and offer dedicated advisory.'}
                </p>
              </div>

              <div className="mt-6">
                <MagneticButton
                  onClick={() => onOpenInquiry(null)}
                  className="w-full py-2.5 px-4 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md"
                >
                  {isAr ? 'طلب استشارة عقارية' : 'Request Consultation'}
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews Section (آراء العملاء) */}
      <CustomerReviews language={language} onOpenInquiry={onOpenInquiry} />

      {/* 6. Listing CTA Banner in Deep Navy Accent */}
      <section className="py-16 relative overflow-hidden bg-[#10243B] text-white border-t border-slate-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.ctaBanner.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            {t.ctaBanner.desc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl shadow-lg shadow-[#088AC3]/20 transition-colors cursor-pointer text-sm"
            >
              {t.ctaBanner.btn}
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
