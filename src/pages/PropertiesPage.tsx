import React, { useState, useMemo } from 'react';
import { Property, Language, PropertyPurpose, PropertyType, PropertyFilterState } from '../types';
import { translations } from '../data/translations';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
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
  const [category, setCategory] = useState<'all' | 'residential' | 'commercial' | 'land'>('all');
  const [district, setDistrict] = useState<string>(initialFilters?.district || 'all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters?.maxPrice || 0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter computation
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((prop) => {
      // Purpose match
      if (purpose !== 'all' && prop.purpose !== purpose) return false;

      // Category match
      if (category === 'residential') {
        if (!['villa', 'penthouse', 'apartment'].includes(prop.type)) return false;
      } else if (category === 'commercial') {
        if (prop.type !== 'commercial') return false;
      } else if (category === 'land') {
        if (prop.type !== 'land') return false;
      }

      // District match
      if (district !== 'all' && district !== '') {
        const matchesAr = prop.location.districtAr.includes(district);
        const matchesEn = prop.location.districtEn.toLowerCase().includes(district.toLowerCase());
        if (!matchesAr && !matchesEn) return false;
      }

      // Min & Max Price
      if (minPrice > 0 && prop.price < minPrice) return false;
      if (maxPrice > 0 && prop.price > maxPrice) return false;

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
  }, [purpose, category, district, minPrice, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setPurpose('all');
    setCategory('all');
    setDistrict('all');
    setMinPrice(0);
    setMaxPrice(0);
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
                onClick={() => setPurpose('all')}
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
                onClick={() => setPurpose('buy')}
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
                onClick={() => setPurpose('rent')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.hero.searchCard.rent}
              </button>
            </div>

            {/* Category tabs: All, Residential, Commercial, Land */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  category === 'all'
                    ? 'bg-white text-[#088AC3] shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.propertiesPage.all}
              </button>
              <button
                type="button"
                onClick={() => setCategory('residential')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  category === 'residential'
                    ? 'bg-white text-[#088AC3] shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.propertiesPage.residential}
              </button>
              <button
                type="button"
                onClick={() => setCategory('commercial')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  category === 'commercial'
                    ? 'bg-white text-[#088AC3] shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.propertiesPage.commercial}
              </button>
              <button
                type="button"
                onClick={() => setCategory('land')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  category === 'land'
                    ? 'bg-white text-[#088AC3] shadow-xs'
                    : 'text-[#475569] hover:text-[#193555]'
                }`}
              >
                {t.propertiesPage.land}
              </button>
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

          {/* Bottom row: Search input, District, Min Price, Max Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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

            {/* District select */}
            <div>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
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

            {/* Min Price */}
            <div>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
              >
                <option value="0">{isAr ? 'السعر الأدنى: الكل' : 'Min Price: Any'}</option>
                <option value="100000">{isAr ? 'من 100,000 ر.س' : 'From 100,000 SAR'}</option>
                <option value="1000000">{isAr ? 'من 1,000,000 ر.س' : 'From 1,000,000 SAR'}</option>
                <option value="3000000">{isAr ? 'من 3,000,000 ر.س' : 'From 3,000,000 SAR'}</option>
                <option value="5000000">{isAr ? 'من 5,000,000 ر.س' : 'From 5,000,000 SAR'}</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3]"
              >
                <option value="0">{isAr ? 'السعر الأعلى: الكل' : 'Max Price: Any'}</option>
                <option value="500000">{isAr ? 'حتى 500,000 ر.س' : 'Up to 500,000 SAR'}</option>
                <option value="2000000">{isAr ? 'حتى 2,000,000 ر.س' : 'Up to 2,000,000 SAR'}</option>
                <option value="5000000">{isAr ? 'حتى 5,000,000 ر.س' : 'Up to 5,000,000 SAR'}</option>
                <option value="10000000">{isAr ? 'حتى 10,000,000 ر.س' : 'Up to 10,000,000 SAR'}</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                language={language}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
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
