import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'motion/react';
import { Video, Film, MapPin, Sparkles, MessageCircle, Play } from 'lucide-react';

interface PropertyVideoToursProps {
  language: Language;
  onOpenInquiry?: (property?: any, serviceTitle?: string) => void;
}

export const PropertyVideoTours: React.FC<PropertyVideoToursProps> = ({
  language,
  onOpenInquiry,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const tours = [
    {
      id: 'tour-1',
      tag: t.videoTours.video1.tag,
      title: t.videoTours.video1.title,
      location: t.videoTours.video1.location,
      specs: t.videoTours.video1.specs,
      inquireBtn: t.videoTours.video1.inquireBtn,
      videoSrc: '/videos/anwar-najd-video-tour-1.mp4',
      posterSrc: '/videos/property-tour-1-poster.jpg',
      inquiryTitle: isAr ? 'استفسار عن جولة شقة حي اليرموك' : 'Inquiry about Al Yarmouk Tour',
      refCode: 'ANW-V1',
    },
    {
      id: 'tour-2',
      tag: t.videoTours.video2.tag,
      title: t.videoTours.video2.title,
      location: t.videoTours.video2.location,
      specs: t.videoTours.video2.specs,
      inquireBtn: t.videoTours.video2.inquireBtn,
      videoSrc: '/videos/anwar-najd-video-tour-2.mp4',
      posterSrc: '/videos/property-tour-2-poster.jpg',
      inquiryTitle: isAr ? 'استفسار عن عرض شقة حي القادسية' : 'Inquiry about Al Qadisiyah Showcase',
      refCode: 'ANW-V2',
    },
  ];

  const handleWhatsApp = (tour: typeof tours[0]) => {
    const text = isAr
      ? `السلام عليكم، أود الاستفسار عن ${tour.title} (المرجع: ${tour.refCode}) المعروض في جولات الفيديو لدى شركة انوار نجد العقارية.`
      : `Hello, I would like to inquire about ${tour.title} (Ref: ${tour.refCode}) from the video tours at Anwar Najd Real Estate Company.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F4F8FB] border-y border-[#E1EBF2] relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#088AC3]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#088AC3]/20 shadow-xs mb-3">
            <Film className="w-3.5 h-3.5 text-[#088AC3]" />
            <span>{t.videoTours.badge}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
            {t.videoTours.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.videoTours.subtitle}
          </p>
        </motion.div>

        {/* Video Cards Grid: Side-by-side on desktop, stacked on mobile/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {tours.map((tour, idx) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Card Header Info */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F0F7FB] text-[#088AC3] border border-[#088AC3]/20">
                      <span className="w-2 h-2 rounded-full bg-[#088AC3] animate-pulse" />
                      <span>{tour.tag}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {tour.refCode}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#193555] truncate pt-1">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-[#088AC3] flex-shrink-0" />
                    <span className="truncate">{tour.location}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60 flex-shrink-0">
                  {isAr ? 'عقار معتمد' : 'Verified'}
                </span>
              </div>

              {/* 9:16 Vertical Video Container */}
              <div className="p-4 sm:p-6 bg-slate-50 flex items-center justify-center">
                <div className="relative aspect-[9/16] w-full max-w-[320px] sm:max-w-[360px] mx-auto rounded-2xl overflow-hidden bg-[#10243B] shadow-lg border border-slate-800">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster={tour.posterSrc}
                    className="w-full h-full object-contain bg-[#10243B]"
                    title={`${tour.tag} - ${tour.title}`}
                  >
                    <source src={tour.videoSrc} type="video/mp4" />
                    {isAr
                      ? 'متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.'
                      : 'Your browser does not support playing this video.'}
                  </video>
                </div>
              </div>

              {/* Card Footer Actions & Specs */}
              <div className="p-5 sm:p-6 pt-4 mt-auto border-t border-slate-100 bg-white space-y-3.5">
                <div className="text-xs font-semibold text-[#193555] bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span>{tour.specs}</span>
                  <span className="text-[11px] text-[#088AC3] font-bold">{isAr ? 'شركة انوار نجد' : 'Anwar Najd'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenInquiry) {
                        onOpenInquiry(null, tour.inquiryTitle);
                      } else {
                        handleWhatsApp(tour);
                      }
                    }}
                    className="w-full py-2.5 px-3 bg-[#088AC3] hover:bg-[#0779AB] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="truncate">{tour.inquireBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsApp(tour)}
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="truncate">{isAr ? 'واتساب' : 'WhatsApp'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
