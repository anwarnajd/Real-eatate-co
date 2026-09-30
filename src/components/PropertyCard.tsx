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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-6 to +6 degrees for subtle luxury depth)
    const rX = ((mouseY / height) - 0.5) * -10;
    const rY = ((mouseX / width) - 0.5) * 10;

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
      style={{
        perspective: '1000px',
      }}
      className="cursor-pointer select-none"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          mass: 0.8,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`group bg-white rounded-2xl overflow-hidden border transition-shadow duration-500 flex flex-col ${
          isHovered
            ? 'border-[#088AC3]/60 shadow-[0_22px_45px_-12px_rgba(25,53,85,0.18)]'
            : 'border-[#E2E8F0] shadow-sm'
        }`}
      >
        {/* Layer 1: Property Image with 3D Depth Shift */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100"
          style={{ transform: 'translateZ(15px)' }}
        >
          <motion.img
            src={property.images[0]}
            alt={isAr ? property.title.ar : property.title.en}
            referrerPolicy="no-referrer"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
          />

          {/* Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

          {/* Floating Badges with Z-Translation */}
          <div
            className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-xs font-bold"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="px-3 py-1 rounded-lg bg-white/95 text-[#193555] shadow-sm backdrop-blur-xs">
              {isAr ? purposeLabels[property.purpose].ar : purposeLabels[property.purpose].en}
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#193555]/95 text-white shadow-sm backdrop-blur-xs">
              {isAr ? typeLabels[property.type].ar : typeLabels[property.type].en}
            </span>
          </div>

          {/* Floating Price Tag */}
          <div
            className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between text-white"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="text-xl font-black font-mono tracking-tight drop-shadow-md">
              {isAr ? property.priceFormatted.ar : property.priceFormatted.en}
            </div>
          </div>
        </div>

        {/* Layer 2: Card Content Area Rising with 3D Depth */}
        <div
          className="p-5 flex-1 flex flex-col justify-between"
          style={{ transform: 'translateZ(20px)' }}
        >
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
