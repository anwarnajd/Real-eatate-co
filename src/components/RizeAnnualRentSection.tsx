import React from 'react';
import { Property, Language } from '../types';
import { PAYMENT_CONFIG } from '../config/paymentConfig';
import { motion } from 'motion/react';
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface RizeAnnualRentSectionProps {
  property: Property;
  language: Language;
}

export const RizeAnnualRentSection: React.FC<RizeAnnualRentSectionProps> = ({
  property,
  language,
}) => {
  const isAr = language === 'ar';
  const annualPrice = property.price;
  const approxMonthly = Math.round(annualPrice / 12);
  const propertyTitle = isAr ? property.title.ar : property.title.en;

  const partnerUrl = PAYMENT_CONFIG.rize.partnerUrl;
  const hasPartnerUrl = Boolean(partnerUrl && partnerUrl.trim().length > 0);

  const handleApplyClick = () => {
    if (hasPartnerUrl) {
      window.open(partnerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsAppConsultation = () => {
    const text = isAr
      ? `السلام عليكم، أود الاستفسار عن تقسيط الإيجار السنوي عبر رايز (Rize) لعقار:
- العقار: ${propertyTitle} (المرجع: ${property.refNumber})
- الإيجار السنوي: ${annualPrice.toLocaleString()} ريال
- القسط الشهري التقريبي: ~${approxMonthly.toLocaleString()} ريال / شهرياً
يرجى تزويدي برابط التقديم وشروط الأهلية والاعتماد.`
      : `Hello, I would like to inquire about splitting annual rent monthly through Rize for:
- Property: ${propertyTitle} (Ref: ${property.refNumber})
- Annual Rent: ${annualPrice.toLocaleString()} SAR
- Approx. Monthly: ~${approxMonthly.toLocaleString()} SAR / month
Please provide the application process and eligibility guidelines.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FB] border border-[#088AC3]/30 shadow-lg space-y-5"
    >
      {/* 1. Brand & Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#088AC3]/10 text-[#088AC3] text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'تمويل الإيجار السكني والتجاري' : 'Rent Financing & Installments'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#193555]">
            {isAr ? PAYMENT_CONFIG.rize.titleAr : PAYMENT_CONFIG.rize.titleEn}
          </h3>
          <p className="mt-1 text-xs text-[#475569] leading-relaxed">
            {isAr ? PAYMENT_CONFIG.rize.subtitleAr : PAYMENT_CONFIG.rize.subtitleEn}
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[#193555] text-white flex items-center justify-center font-bold text-xs shadow-md flex-shrink-0">
          Rize
        </div>
      </div>

      {/* 2. Rent Breakdown Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white border border-slate-200">
        <div>
          <span className="text-[11px] text-[#64748B] block font-medium">
            {isAr ? 'الإيجار السنوي للعقار:' : 'Annual Rental Price:'}
          </span>
          <span className="text-lg font-black font-mono text-[#193555]">
            {annualPrice.toLocaleString()} {isAr ? 'ريال / سنوياً' : 'SAR / year'}
          </span>
        </div>

        <div className="border-t sm:border-t-0 sm:border-s border-slate-100 sm:ps-4 pt-2 sm:pt-0">
          <span className="text-[11px] text-[#088AC3] block font-bold">
            {isAr ? 'القسط الشهري التقريبي مع رايز:' : 'Approx. Monthly via Rize:'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono text-[#088AC3]">
              ~{approxMonthly.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#088AC3]">
              {isAr ? 'ريال / شهر' : 'SAR / month'}
            </span>
          </div>
          <span className="text-[10px] text-[#64748B] block">
            {isAr ? '* خاضع لدراسة الائتمان والأهلية' : '* Subject to credit eligibility & approval'}
          </span>
        </div>
      </div>

      {/* 3. Features of Rize Program */}
      <div className="space-y-2 text-xs text-[#334155]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#088AC3] flex-shrink-0" />
          <span>{isAr ? 'تحويل دفعة المالك السنوية إلى أقساط شهرية ميسرة' : 'Converts annual lump-sum rent into manageable monthly installments'}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#088AC3] flex-shrink-0" />
          <span>{isAr ? 'معتمد ومتوافق مع الضوابط التمويلية والتنظيمية' : 'Accredited financing framework with regulatory compliance'}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#088AC3] flex-shrink-0" />
          <span>{isAr ? 'لا يشترط دفعة أولى ضخمة عند توقيع العقد' : 'Minimizes upfront capital barrier when signing residential leases'}</span>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="space-y-3 pt-1">
        {hasPartnerUrl ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleApplyClick}
            className="w-full py-3 px-4 rounded-xl bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isAr ? PAYMENT_CONFIG.rize.buttonAr : PAYMENT_CONFIG.rize.buttonEn}</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        ) : (
          <div className="space-y-2.5">
            {/* Status notice when link is awaiting configuration */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="font-bold">
                  {isAr ? PAYMENT_CONFIG.rize.pendingNoticeAr : PAYMENT_CONFIG.rize.pendingNoticeEn}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-200/60 font-semibold">
                {isAr ? 'بانتظار الرابط' : 'Pending Link'}
              </span>
            </div>

            <button
              type="button"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-2 opacity-80"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? `${PAYMENT_CONFIG.rize.buttonAr} (بانتظار تفعيل الرابط)`
                  : `${PAYMENT_CONFIG.rize.buttonEn} (Awaiting Link)`}
              </span>
            </button>
          </div>
        )}

        {/* Coordination with Anwar Najd team via WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleWhatsAppConsultation}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#193555] border border-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>
            {isAr
              ? 'طلب استشارة وإجراءات رايز عبر واتساب'
              : 'Consult with Anwar Najd Specialists regarding Rize'}
          </span>
        </motion.button>
      </div>

      {/* 5. Advisory Notice */}
      <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[10px] text-[#64748B] leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-[#088AC3] flex-shrink-0 mt-0.5" />
        <span>
          {isAr
            ? 'خدمة تقسيط الإيجار عبر رايز تقدمها منصة رايز كشريك تمويلي، وتخضع للشروط والأحكام والتقييم الائتماني المعتمد.'
            : 'Rental installments via Rize are provided directly through Rize as financing partner, subject to partner terms and credit assessment.'}
        </span>
      </div>
    </motion.div>
  );
};
