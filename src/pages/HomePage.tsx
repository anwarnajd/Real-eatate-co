import React, { useState, useRef } from 'react';
import { Property, Language, PageId, PropertyPurpose, PropertyType } from '../types';
import { translations } from '../data/translations';
import { propertiesData } from '../data/properties';
import { TrustCounter } from '../components/TrustCounter';
import { PropertyCard } from '../components/PropertyCard';
import { FullWidthFeaturedProperty } from '../components/FullWidthFeaturedProperty';
import { MagneticButton } from '../components/MagneticButton';
import { ArchitecturalBackground } from '../components/ArchitecturalBackground';
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
import { motion, useScroll, useTransform } from 'motion/react';

interface HomePageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property?: Property | null) => void;
  onApplySearchFilter: (filter: {
    purpose: PropertyPurpose | 'all';
    type: PropertyType | 'all';
    district: string;
    maxPrice: number;
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
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [district, setDistrict] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(0);

  // Mouse Parallax for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll-based parallax for Hero layers
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -60]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 22, y: y * 18 });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const featuredProperties = propertiesData.filter((p) => p.featured);
  const headlineWords = t.hero.headline.split(' ');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySearchFilter({
      purpose,
      type: propertyType,
      district: district === 'all' ? '' : district,
      maxPrice: priceRange,
    });
    setCurrentPage('properties');
  };

  return (
    <div className="w-full bg-white text-[#193555] overflow-x-hidden">
      {/* 1. Cinematic Luxury Hero Section with Multi-Layer Parallax & Word-by-Word Reveal */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden border-b border-slate-200"
      >
        {/* Layer 1: Background Property Image with Slow Zoom & Scroll Parallax */}
        <motion.div
          style={{ y: heroBgY }}
          animate={{
            x: mouseOffset.x * -0.5,
            y: mouseOffset.y * -0.5,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 25 }}
          className="absolute inset-0 z-0 scale-110 pointer-events-none"
        >
          <motion.img
            src="/src/assets/images/hero_riyadh_luxury_skyline_1790743838940.jpg"
            alt="Riyadh Luxury Architecture & Skyline"
            referrerPolicy="no-referrer"
            initial={{ scale: 1.18, opacity: 0.8 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />

          {/* Layer 2: Soft Blue & Navy Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243B]/95 via-[#10243B]/70 to-[#193555]/65" />
        </motion.div>

        {/* Layer 3: Subtle Architectural Grid Lines & Blueprint Accents */}
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-25">
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

        {/* Layer 4: Floating Ambient Light Orbs with Parallax Drift */}
        <motion.div
          animate={{
            x: mouseOffset.x * 0.9,
            y: mouseOffset.y * 0.9,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 25 }}
          className="absolute top-1/4 -start-24 w-96 h-96 bg-[#088AC3]/25 rounded-full blur-[110px] pointer-events-none animate-pulse-glow z-[3]"
        />
        <motion.div
          animate={{
            x: mouseOffset.x * -0.6,
            y: mouseOffset.y * -0.6,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 25 }}
          className="absolute bottom-1/4 -end-24 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[120px] pointer-events-none animate-float-subtle z-[3]"
        />

        {/* Layer 5: Foreground Headline & Content with Word-by-Word Motion */}
        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
        >
          {/* Subtle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-[#38BDF8] text-xs sm:text-sm font-bold mb-6 backdrop-blur-md shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{t.hero.tag}</span>
          </motion.div>

          {/* Word-by-Word Animated Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-snug max-w-4xl mx-auto drop-shadow-md flex flex-wrap justify-center gap-x-2 sm:gap-x-3">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow font-medium"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* Action Buttons: Magnetic Cyan Primary & Navy/White Secondary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl shadow-lg shadow-[#088AC3]/30 transition-all flex items-center justify-center gap-2 group"
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
              className="w-full sm:w-auto px-8 py-3.5 bg-white/95 hover:bg-white text-[#193555] font-bold rounded-xl shadow-md transition-all"
            >
              <span>{t.hero.contactBtn}</span>
            </MagneticButton>
          </motion.div>

          {/* 14. Floating Luxury Search Bar on Crisp White with Depth */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 w-full max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(25,53,85,0.25)] border border-slate-100 text-start text-[#193555]"
          >
            {/* Segmented Purpose Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setPurpose('buy')}
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
                onClick={() => setPurpose('rent')}
                className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-[#088AC3] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#193555] bg-slate-100'
                }`}
              >
                {t.hero.searchCard.rent}
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <option value="all">{t.hero.searchCard.allTypes}</option>
                  <option value="villa">{t.hero.searchCard.villa}</option>
                  <option value="penthouse">{t.hero.searchCard.penthouse}</option>
                  <option value="apartment">{t.hero.searchCard.apartment}</option>
                  <option value="commercial">{t.hero.searchCard.commercial}</option>
                  <option value="land">{t.hero.searchCard.land}</option>
                </select>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-[11px] font-bold text-[#193555] mb-1">
                  {t.hero.searchCard.location}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                >
                  <option value="all">{t.hero.searchCard.allLocations}</option>
                  <option value="حطين">{isAr ? 'حي حطين' : 'Hittin'}</option>
                  <option value="الملقا">{isAr ? 'حي الملقا' : 'Al Malqa'}</option>
                  <option value="النرجس">{isAr ? 'حي النرجس' : 'Al Narjis'}</option>
                  <option value="الياسمين">{isAr ? 'حي الياسمين' : 'Al Yasmin'}</option>
                  <option value="العليا">{isAr ? 'العليا - طريق الملك فهد' : 'Al Olaya'}</option>
                  <option value="الخير">{isAr ? 'حي الخير شمال الرياض' : 'Al Khair'}</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-bold text-[#193555] mb-1">
                  {t.hero.searchCard.priceRange}
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
                >
                  <option value="0">{t.hero.searchCard.allPrices}</option>
                  <option value="500000">{isAr ? 'حتى 500,000 ر.س' : 'Up to 500,000 SAR'}</option>
                  <option value="2000000">{isAr ? 'حتى 2,000,000 ر.س' : 'Up to 2,000,000 SAR'}</option>
                  <option value="5000000">{isAr ? 'حتى 5,000,000 ر.س' : 'Up to 5,000,000 SAR'}</option>
                  <option value="10000000">{isAr ? 'حتى 10,000,000 ر.س' : 'Up to 10,000,000 SAR'}</option>
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

      {/* 4. INTERACTIVE PROPERTY SHOWCASE (عقارات مختارة) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
              {t.featured.badge}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
              {t.featured.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl">
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

        {/* Magazine-Style Interactive 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <PropertyCard
                property={prop}
                language={language}
                onSelect={onSelectProperty}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us (لماذا أنوار نجد العقارية؟) */}
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
                    ? 'فريق شركة أنوار نجد العقارية على استعداد للإجابة على استفساراتكم ومرافقتكم في كل خطوة.'
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

      {/* 5. Listing CTA Banner in Deep Navy Accent */}
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
