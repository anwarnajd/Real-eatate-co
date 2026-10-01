import React, { useState, useRef } from 'react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, BedDouble, Bath, Maximize2, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
  language: Language;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  language,
  onSelect,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Micro cursor tilt strictly on desktop (max 1.5 degrees, no large rotation)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Subtle 1.5 degrees max
    const rX = ((mouseY / height) - 0.5) * -2.5;
    const rY = ((mouseX / width) - 0.5) * 2.5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const typeLabels: Record<string, { ar: string; en: string }> = {
    villa: { ar: 'فيلا فاخرة', en: 'Luxury Villa' },
    penthouse: { ar: 'بنتهاوس', en: 'Penthouse' },
    apartment: { ar: 'شقة سكنية', en: 'Apartment' },
    commercial: { ar: 'تجاري ومكاتب', en: 'Commercial' },
    land: { ar: 'أرض استثمارية', en: 'Investment Land' },
  };

  const purposeLabels: Record<string, { ar: string; en: string }> = {
    buy: { ar: 'للبيع', en: 'For Sale' },
    rent: { ar: 'للإيجار', en: 'For Rent' },
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(property)}
      className="cursor-pointer select-none h-full"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          y: isHovered ? -6 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col h-full ${
          isHovered
            ? 'border-[#088AC3]/40 shadow-[0_20px_35px_-10px_rgba(25,53,85,0.14)]'
            : 'border-[#E2E8F0] shadow-sm'
        }`}
      >
        {/* Layer 1: Property Image with Slow Luxury Zoom & Hover Overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <motion.img
            src={property.images[0] || '/images/property-fallback.jpg'}
            alt={isAr ? property.title.ar : property.title.en}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/property-fallback.jpg';
            }}
            animate={{
              scale: isHovered ? 1.045 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />

          {/* Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#10243B]/80 via-transparent to-transparent pointer-events-none" />

          {/* Hover Overlay with VIEW PROPERTY Callout */}
          <div
            className={`absolute inset-0 bg-[#10243B]/30 backdrop-blur-[1px] transition-opacity duration-400 flex items-center justify-center pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.span
              animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-4 py-2 rounded-xl bg-white/95 text-[#193555] font-black text-xs shadow-lg flex items-center gap-1.5"
            >
              <span>{isAr ? 'عرض تفاصيل العقار' : 'VIEW PROPERTY'}</span>
            </motion.span>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-xs font-bold pointer-events-none">
            <span className="px-3 py-1 rounded-lg bg-white/95 text-[#193555] shadow-sm backdrop-blur-xs">
              {isAr ? purposeLabels[property.purpose].ar : purposeLabels[property.purpose].en}
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#193555]/95 text-white shadow-sm backdrop-blur-xs">
              {isAr ? typeLabels[property.type].ar : typeLabels[property.type].en}
            </span>
          </div>

          {/* Floating Price Tag */}
          <div className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between text-white pointer-events-none">
            <div className="text-xl font-black font-mono tracking-tight drop-shadow-md">
              {isAr ? property.priceFormatted.ar : property.priceFormatted.en}
            </div>
          </div>
        </div>

        {/* Layer 2: Card Content Area */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Location Line */}
            <div className="flex items-center gap-1.5 text-xs text-[#088AC3] font-bold mb-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {isAr ? property.location.districtAr : property.location.districtEn}
                {' · '}
                {isAr ? property.location.cityAr : property.location.cityEn}
              </span>
            </div>

            {/* Property Title */}
            <h3 className="text-base sm:text-lg font-bold text-[#193555] group-hover:text-[#088AC3] transition-colors line-clamp-2 leading-snug">
              {isAr ? property.title.ar : property.title.en}
            </h3>
          </div>

          {/* Layer 3: Specifications & Interactive Animated CTA */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-[#475569]">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-[#355D7F]" />
                  <span className="font-mono font-bold text-[#193555]">{property.bedrooms}</span>
                  <span className="text-[#64748B]">{t.featured.beds}</span>
                </div>
              )}

              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#355D7F]" />
                  <span className="font-mono font-bold text-[#193555]">{property.bathrooms}</span>
                  <span className="text-[#64748B]">{t.featured.baths}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#355D7F]" />
                <span className="font-mono font-bold text-[#193555]">{property.area}</span>
                <span className="text-[#64748B]">{t.featured.areaUnit}</span>
              </div>
            </div>

            {/* Action CTA with Animated Smooth Arrow */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#088AC3] group-hover:text-[#0779AB]">
              <span className="group-hover:underline">{t.featured.viewDetails}</span>
              <motion.div
                animate={{
                  x: isHovered ? (isAr ? -4 : 4) : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 text-[#088AC3]" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#088AC3]" />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
