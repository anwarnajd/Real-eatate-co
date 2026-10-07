import React, { useState, useMemo } from 'react';
import { Property, Language, PropertyPurpose, PropertyType, RentalPeriod, PropertyFilterState } from '../types';
import { translations } from '../data/translations';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { motion, AnimatePresence } from 'motion/react';
import {
  RIYADH_DISTRICTS,
  EXACT_PRICE_RANGES,
  RENT_PRICE_RANGES,
  RENTAL_PERIOD_OPTIONS,
  OWNER_PROPERTY_TYPES,
} from '../data/riyadhNeighborhoods';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Building,
} from 'lucide-react';

interface PropertiesPageProps {
  language: Language;
  initialFilters?: Partial<PropertyFilterState>;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property?: Property | null) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  language,
  initialFilters,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [purpose, setPurpose] = useState<PropertyPurpose | 'all'>(
    initialFilters?.purpose || 'all'
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod | 'all'>(
    initialFilters?.rentalPeriod || 'all'
  );
  const [category, setCategory] = useState<'all' | 'residential' | 'commercial' | 'investment' | 'projects'>('all');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>(initialFilters?.type || 'all');
  const [district, setDistrict] = useState<string>(initialFilters?.district || 'all');
  const [priceRangeId, setPriceRangeId] = useState<string>(initialFilters?.priceRangeId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handlePurposeChange = (newPurpose: PropertyPurpose | 'all') => {
    setPurpose(newPurpose);
    setPriceRangeId('all');
    if (newPurpose === 'buy' || newPurpose === 'all') {
      setRentalPeriod('all');
    }
  };

  // Filter computation
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((prop) => {
      // Purpose match
      if (purpose !== 'all' && prop.purpose !== purpose) return false;

      // Rental Period match (only relevant when purpose is rent)
      if (purpose === 'rent' && rentalPeriod !== 'all') {
        if (prop.rentalPeriod !== rentalPeriod) return false;
      }

      // Category match
      if (category === 'residential') {
        if (!['villa', 'penthouse', 'apartment', 'ground_floor', 'upper_floor', 'roof_apartment'].includes(prop.type)) return false;
      } else if (category === 'commercial') {
        if (!['commercial', 'commercial_land', 'commercial_building', 'retail_shop', 'warehouse'].includes(prop.type)) return false;
      } else if (category === 'investment') {
        if (!['land', 'commercial', 'commercial_land', 'residential_land', 'commercial_building'].includes(prop.type)) return false;
      } else if (category === 'projects') {
        if (!prop.featured) return false;
      }

      // Property Type dropdown match
      if (propertyType !== 'all') {
        if (prop.type !== propertyType) {
          // If specific type not directly matching, check fallback group
          const matchesVilla = propertyType === 'villa' && prop.type === 'villa';
          const matchesApt = propertyType === 'apartment' && ['apartment', 'roof_apartment', 'ground_floor', 'upper_floor'].includes(prop.type);
          const matchesPent = propertyType === 'penthouse' && prop.type === 'penthouse';
          const matchesComm = ['commercial', 'commercial_building', 'retail_shop', 'warehouse'].includes(propertyType) && prop.type === 'commercial';
          const matchesLand = ['land', 'residential_land', 'commercial_land'].includes(propertyType) && prop.type === 'land';

          if (!matchesVilla && !matchesApt && !matchesPent && !matchesComm && !matchesLand) {
            return false;
          }
        }
      }

      // District match
      if (district !== 'all' && district !== '') {
        const dLower = district.toLowerCase();
        const matchesAr = prop.location.districtAr.includes(district) || district.includes(prop.location.districtAr);
        const matchesEn = prop.location.districtEn.toLowerCase().includes(dLower) || dLower.includes(prop.location.districtEn.toLowerCase());

        const matchedItem = RIYADH_DISTRICTS.find(
          (rd) => rd.nameAr === district || rd.nameEn.toLowerCase() === dLower || rd.id === dLower
        );
        const matchesViaItem = matchedItem
          ? prop.location.districtAr.includes(matchedItem.nameAr) ||
            prop.location.districtEn.toLowerCase().includes(matchedItem.nameEn.toLowerCase())
          : false;

        if (!matchesAr && !matchesEn && !matchesViaItem) return false;
      }

      // Exact Owner-Specified Price Range Match (Separate Rent and Sale)
      if (priceRangeId !== 'all') {
        const activeRanges = purpose === 'rent' ? RENT_PRICE_RANGES : EXACT_PRICE_RANGES;
        const selectedRange = activeRanges.find((r) => r.id === priceRangeId);
        if (selectedRange && selectedRange.min > 0 && prop.price < selectedRange.min) return false;
        if (selectedRange && selectedRange.max > 0 && prop.price > selectedRange.max) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleAr = prop.title.ar.toLowerCase();
        const titleEn = prop.title.en.toLowerCase();
        const distAr = prop.location.districtAr.toLowerCase();
        const distEn = prop.location.districtEn.toLowerCase();
        const ref = prop.refNumber.toLowerCase();

        if (
          !titleAr.includes(q) &&
          !titleEn.includes(q) &&
          !distAr.includes(q) &&
          !distEn.includes(q) &&
          !ref.includes(q)
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.area - a.area;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [purpose, rentalPeriod, category, propertyType, district, priceRangeId, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setPurpose('all');
    setRentalPeriod('all');
    setCategory('all');
    setPropertyType('all');
    setDistrict('all');
    setPriceRangeId('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-white text-[#193555] min-h-screen">
      {/* 1. Header Banner on Light Subtle Blue/Gray */}
      <section className="py-16 bg-[#F4F8FB] border-b border-[#E1EBF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-[#088AC3]">
            {t.propertiesPage.badge}
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black text-[#193555] tracking-tight">
            {t.propertiesPage.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
            {t.propertiesPage.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Main Content & Live Filters on Crisp White */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar Card in White with Soft Shadow */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-5 mb-8 space-y-4">
          {/* Top row: Purpose segmented buttons & Category segmented buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            {/* Purpose tabs (All / Buy / Rent) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handlePurposeChange('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  purpose === 'all'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.propertiesPage.all}
              </button>
              <button
                type="button"
                onClick={() => handlePurposeChange('buy')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  purpose === 'buy'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.hero.searchCard.buy}
              </button>
              <button
                type="button"
                onClick={() => handlePurposeChange('rent')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.hero.searchCard.rent}
              </button>
            </div>

            {/* Category tabs: ALL, RESIDENTIAL, COMMERCIAL, INVESTMENT, PROJECTS */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'all', label: t.featured.filters.all },
                  { id: 'residential', label: t.featured.filters.residential },
                  { id: 'commercial', label: t.featured.filters.commercial },
                  { id: 'investment', label: t.featured.filters.investment },
                  { id: 'projects', label: t.featured.filters.projects },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    category === tab.id
                      ? 'bg-white text-[#088AC3] shadow-xs'
                      : 'text-[#475569] hover:text-[#193555]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Reset Filters */}
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#088AC3] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.propertiesPage.resetFilters}</span>
            </button>
          </div>

          {/* Bottom row: Search input, Property Type, District, Rental Period (if rent), Price Range */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${purpose === 'rent' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3`}>
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute top-3 start-3 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.propertiesPage.searchPlaceholder}
                className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
              />
            </div>

            {/* Property Type Dropdown */}
            <div>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType | 'all')}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
              >
                {OWNER_PROPERTY_TYPES.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {isAr ? pt.nameAr : pt.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* District select with All Riyadh Neighborhoods */}
            <div>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
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
                <select
                  value={rentalPeriod}
                  onChange={(e) => setRentalPeriod(e.target.value as RentalPeriod | 'all')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
                >
                  {RENTAL_PERIOD_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {isAr ? opt.nameAr : opt.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Price Range: Rent vs Sale */}
            <div>
              <select
                value={priceRangeId}
                onChange={(e) => setPriceRangeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
              >
                {(purpose === 'rent' ? RENT_PRICE_RANGES : EXACT_PRICE_RANGES).map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {isAr ? pr.labelAr : pr.labelEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* View Mode & Sorting Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#193555]">
              {filteredProperties.length} {t.propertiesPage.resultsCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64748B] hidden sm:inline font-semibold">{t.propertiesPage.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#193555] focus:outline-none focus:border-[#088AC3]"
              >
                <option value="featured">{t.propertiesPage.sortOptions.featured}</option>
                <option value="price-asc">{t.propertiesPage.sortOptions.priceAsc}</option>
                <option value="price-desc">{t.propertiesPage.sortOptions.priceDesc}</option>
                <option value="area-desc">{t.propertiesPage.sortOptions.areaDesc}</option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#088AC3] text-white' : 'text-[#64748B] hover:text-[#193555]'
                }`}
                title={t.propertiesPage.viewGrid}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#088AC3] text-white' : 'text-[#64748B] hover:text-[#193555]'
                }`}
                title={t.propertiesPage.viewList}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Rendering */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <SlidersHorizontal className="w-12 h-12 mx-auto text-[#64748B] mb-4" />
            <h3 className="text-lg font-bold text-[#193555] mb-2">
              {t.propertiesPage.noResultsTitle}
            </h3>
            <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
              {t.propertiesPage.noResultsDesc}
            </p>
            <button
              onClick={() => onOpenInquiry(null)}
              className="px-6 py-2.5 bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {t.propertiesPage.contactAdvisor}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.map((prop) => (
                <motion.div
                  layout
                  key={prop.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
        ) : (
          /* List View on Crisp White Cards */
          <div className="space-y-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="group bg-white border border-[#E2E8F0] hover:border-[#088AC3]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col md:flex-row cursor-pointer"
              >
                <div className="relative md:w-80 h-56 md:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
                  <img
                    src={prop.images[0] || '/images/property-fallback.jpg'}
                    alt={isAr ? prop.title.ar : prop.title.en}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 start-3.5 px-3 py-1 rounded-lg bg-white/95 text-[#193555] text-xs font-bold shadow-xs">
                    {prop.purpose === 'buy' ? (isAr ? 'للبيع' : 'For Sale') : (isAr ? 'للإيجار' : 'For Rent')}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#088AC3] font-bold mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {isAr ? prop.location.districtAr : prop.location.districtEn} · {isAr ? prop.location.cityAr : prop.location.cityEn}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#193555] group-hover:text-[#088AC3] transition-colors">
                      {isAr ? prop.title.ar : prop.title.en}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed">
                      {isAr ? prop.description.ar : prop.description.en}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-[#475569]">
                      {prop.bedrooms && (
                        <div className="flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-[#355D7F]" />
                          <span className="font-mono font-bold text-[#193555]">{prop.bedrooms}</span>
                          <span>{t.featured.beds}</span>
                        </div>
                      )}
                      {prop.bathrooms && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-[#355D7F]" />
                          <span className="font-mono font-bold text-[#193555]">{prop.bathrooms}</span>
                          <span>{t.featured.baths}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#355D7F]" />
                        <span className="font-mono font-bold text-[#193555]">{prop.area}</span>
                        <span>{t.featured.areaUnit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black text-[#193555] font-mono">
                        {isAr ? prop.priceFormatted.ar : prop.priceFormatted.en}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className="px-4 py-2 bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {t.featured.viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
