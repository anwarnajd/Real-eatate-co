import React from 'react';
import { Language, CustomerReview, Property } from '../types';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { Star, MessageSquareHeart, Quote, Calendar, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomerReviewsProps {
  language: Language;
  onOpenInquiry?: (property?: Property | null, customSubject?: string) => void;
  reviews?: CustomerReview[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  language,
  onOpenInquiry,
  reviews = CUSTOMER_REVIEWS,
}) => {
  const isAr = language === 'ar';

  return (
    <section className="py-20 lg:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#088AC3]/05 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#088AC3]">
            {isAr ? 'تجارب عملائنا' : 'Client Testimonials'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-[#193555] tracking-tight">
            {isAr ? 'آراء العملاء' : 'Customer Reviews'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
            {isAr
              ? 'نعتز بثقة عملائنا وشركائنا، ونعمل باستمرار لتقديم خدمات عقارية متكاملة ترتقي لأعلى معايير الجودة والاحترافية.'
              : 'We value the trust of our clients and partners, constantly striving to deliver exceptional real estate experiences.'}
          </p>
        </motion.div>

        {/* Content Area */}
        {reviews.length === 0 ? (
          /* Premium Neutral State (No fake reviews or ratings) */
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm text-center relative overflow-hidden"
          >
            {/* Decorative Top Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#088AC3] via-[#38BDF8] to-[#088AC3]" />

            {/* Icon & Gold Star Badges */}
            <div className="w-16 h-16 rounded-2xl bg-[#F0F7FB] border border-[#088AC3]/20 text-[#088AC3] flex items-center justify-center mx-auto mb-5 shadow-xs">
              <MessageSquareHeart className="w-8 h-8" />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-4 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400/20 text-amber-400" />
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#193555] mb-2 tracking-tight">
              {isAr ? 'سيتم إضافة تقييمات عملائنا قريباً' : 'Customer reviews will be added soon.'}
            </h3>

            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mb-6">
              {isAr
                ? 'نعمل حالياً على توثيق ونشر أحدث تجارب وتقييمات عملائنا الكرام في كافة خدمات البيع، الشراء، والتأجير والاستشارات.'
                : 'We are currently gathering and validating verified testimonials from our clients across property sales, acquisitions, and advisory.'}
            </p>

            {onOpenInquiry && (
              <button
                type="button"
                onClick={() => onOpenInquiry(null, isAr ? 'مشاركة تجربة أو رأي عميل' : 'Client Review / Feedback')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#088AC3] hover:bg-[#0779AB] text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isAr ? 'شاركنا تجربتك معنا' : 'Share Your Experience'}</span>
              </button>
            )}
          </motion.div>
        ) : (
          /* Reusable Real Review Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#088AC3]/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#088AC3]/30" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    {review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#F0F7FB] text-[#088AC3] font-bold flex items-center justify-center border border-[#088AC3]/20 flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#193555] truncate text-xs sm:text-sm">
                        {review.name}
                      </h4>
                      {review.roleOrCity && (
                        <p className="text-[11px] text-[#64748B] truncate">
                          {review.roleOrCity}
                        </p>
                      )}
                    </div>
                  </div>

                  {review.date && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{review.date}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
