import React, { useState, useMemo } from 'react';
import { Property, Language } from '../types';
import { PAYMENT_CONFIG } from '../config/paymentConfig';
import { motion } from 'motion/react';
import {
  Calendar,
  CreditCard,
  Lock,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

interface DailyRentalBookingSectionProps {
  property: Property;
  language: Language;
}

export const DailyRentalBookingSection: React.FC<DailyRentalBookingSectionProps> = ({
  property,
  language,
}) => {
  const isAr = language === 'ar';
  const dailyPrice = property.dailyPrice ?? property.price ?? 120;

  // Booking Dates state
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const formatDateForInput = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [checkInDate, setCheckInDate] = useState<string>(formatDateForInput(tomorrow));
  const [daysCount, setDaysCount] = useState<number>(2);

  // Calculate Check-out date based on checkInDate and daysCount
  const calculatedCheckOutDate = useMemo(() => {
    try {
      const parts = checkInDate.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        d.setDate(d.getDate() + daysCount);
        return formatDateForInput(d);
      }
    } catch {}
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 1 + daysCount);
    return formatDateForInput(fallback);
  }, [checkInDate, daysCount]);

  // Total Calculation: Total = Daily Price × Number of Days
  const totalAmount = useMemo(() => {
    return dailyPrice * daysCount;
  }, [dailyPrice, daysCount]);

  // Installment breakdowns for preview
  const tabbyInstallment = (totalAmount / 4).toFixed(2);
  const tamaraInstallment = (totalAmount / 3).toFixed(2);

  const propertyTitle = isAr ? property.title.ar : property.title.en;

  const handleWhatsAppBooking = () => {
    const text = isAr
      ? `السلام عليكم، أود حجز إقامة يومية لدى شركة انوار نجد العقارية:
- العقار: ${propertyTitle} (المرجع: ${property.refNumber})
- سعر اليوم: ${dailyPrice} ريال
- عدد الأيام: ${daysCount} يوم
- تاريخ الدخول: ${checkInDate}
- تاريخ الخروج: ${calculatedCheckOutDate}
- الإجمالي: ${totalAmount} ريال
يرجى تأكيد الحجز وجاهزية الوحدة.`
      : `Hello, I would like to book a daily stay with Anwar Najd Real Estate:
- Property: ${propertyTitle} (Ref: ${property.refNumber})
- Daily Rate: ${dailyPrice} SAR
- Duration: ${daysCount} day(s)
- Check-in: ${checkInDate}
- Check-out: ${calculatedCheckOutDate}
- Total: ${totalAmount} SAR
Please confirm unit availability and booking process.`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-7 rounded-2xl bg-white border border-[#088AC3]/30 shadow-lg space-y-6"
    >
      {/* 1. Header with Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#088AC3] font-bold block mb-1">
            {isAr ? 'نظام الحجز والدفع الإلكتروني' : 'Direct Booking & Payment'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#193555] flex items-center gap-2">
            <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
            <span className="text-slate-300">·</span>
            <span className="text-[#088AC3]">{isAr ? 'خيارات الدفع' : 'Payment Options'}</span>
          </h3>
        </div>
        <div className="p-2.5 rounded-xl bg-[#EBF6FC] text-[#088AC3]">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Interactive Booking Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Check-in Date */}
          <div>
            <label className="block text-xs font-bold text-[#193555] mb-1.5">
              {isAr ? 'تاريخ الدخول' : 'Check-in Date'}
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkInDate}
                min={formatDateForInput(today)}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#193555] focus:outline-none focus:border-[#088AC3] font-medium"
              />
            </div>
          </div>

          {/* Number of Days Selector */}
          <div>
            <label className="block text-xs font-bold text-[#193555] mb-1.5">
              {isAr ? 'عدد الأيام' : 'Number of Days'}
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setDaysCount((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-s-xl bg-slate-100 hover:bg-slate-200 text-[#193555] font-black text-base flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              >
                -
              </button>
              <div className="flex-1 h-10 bg-slate-50 border-y border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-[#193555]">
                {daysCount} {isAr ? (daysCount === 1 ? 'يوم' : 'أيام') : (daysCount === 1 ? 'Day' : 'Days')}
              </div>
              <button
                type="button"
                onClick={() => setDaysCount((prev) => Math.min(30, prev + 1))}
                className="w-10 h-10 rounded-e-xl bg-slate-100 hover:bg-slate-200 text-[#193555] font-black text-base flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Check-out Date Display (Auto-calculated) */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[#64748B] font-medium">
            {isAr ? 'تاريخ الخروج المتوقع:' : 'Calculated Check-out Date:'}
          </span>
          <span className="font-mono font-bold text-[#193555]">{calculatedCheckOutDate}</span>
        </div>
      </div>

      {/* 3. Booking Summary & Total Calculation */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#F0F7FB] to-[#E5F2F9] border border-[#088AC3]/25 space-y-2.5">
        <div className="text-xs font-bold text-[#088AC3] uppercase tracking-wide">
          {isAr ? 'ملخص الحجز والتكلفة' : 'Booking Summary'}
        </div>

        <div className="flex items-center justify-between text-xs text-[#334155] border-b border-[#088AC3]/15 pb-2">
          <span>{isAr ? 'العقار:' : 'Property:'}</span>
          <span className="font-bold text-[#193555] max-w-[210px] truncate" title={propertyTitle}>
            {propertyTitle}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#334155]">
          <span>{isAr ? 'سعر اليوم الواحد:' : 'Daily Price:'}</span>
          <span className="font-mono font-bold text-[#193555]">
            {isAr ? `${dailyPrice} ريال / يوم` : `${dailyPrice} SAR / day`}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#334155]">
          <span>{isAr ? 'عدد الأيام المحجوزة:' : 'Duration:'}</span>
          <span className="font-mono font-bold text-[#193555]">
            {daysCount} {isAr ? 'يوم' : 'Day(s)'}
          </span>
        </div>

        {/* Highlighted Total Amount */}
        <div className="pt-2 border-t border-[#088AC3]/20 flex items-center justify-between">
          <span className="text-sm font-black text-[#193555]">
            {isAr ? 'المبلغ الإجمالي:' : 'Total Amount:'}
          </span>
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#088AC3]">
              {totalAmount.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#088AC3] ms-1">
              {isAr ? 'ريال' : 'SAR'}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-[#64748B]">
          {isAr
            ? `الحساب: ${dailyPrice} ريال × ${daysCount} يوم = ${totalAmount} ريال`
            : `Calculation: ${dailyPrice} SAR × ${daysCount} days = ${totalAmount} SAR`}
        </p>
      </div>

      {/* 4. Payment Choices (Tabby & Tamara) */}
      <div className="space-y-3.5 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#193555] flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#088AC3]" />
            <span>{isAr ? 'خيارات الدفع بالتقسيط' : 'Installment Payment Options'}</span>
          </label>
          <span className="text-[10px] font-semibold text-[#64748B]">
            {isAr ? 'بدون فوائد' : '0% Interest'}
          </span>
        </div>

        {/* Tabby Option Card */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3EEDB4]/20 text-[#0E7052] font-black text-xs flex items-center justify-center font-mono">
                Tabby
              </div>
              <div>
                <span className="text-xs font-bold text-[#193555] block">
                  {isAr ? PAYMENT_CONFIG.tabby.nameAr : PAYMENT_CONFIG.tabby.nameEn}
                </span>
                <span className="text-[11px] text-[#64748B]">
                  {isAr ? PAYMENT_CONFIG.tabby.badgeAr : PAYMENT_CONFIG.tabby.badgeEn}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#193555]">
              4 × {tabbyInstallment} {isAr ? 'ر.س' : 'SAR'}
            </span>
          </div>

          {/* Official Inactive Status Notice */}
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-between text-amber-900 text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="font-bold">
                {isAr ? PAYMENT_CONFIG.tabby.inactiveNoticeAr : PAYMENT_CONFIG.tabby.inactiveNoticeEn}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-200/60 font-semibold">
              {isAr ? PAYMENT_CONFIG.tabby.statusBadgeAr : PAYMENT_CONFIG.tabby.statusBadgeEn}
            </span>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 px-3 rounded-lg bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5 opacity-80"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? `الدفع عبر تابي (${totalAmount} ريال) - غير مفعل حالياً`
                : `Pay with Tabby (${totalAmount} SAR) - Currently Inactive`}
            </span>
          </button>
        </div>

        {/* Tamara Option Card */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF805E]/20 text-[#9E3618] font-black text-xs flex items-center justify-center font-mono">
                Tamara
              </div>
              <div>
                <span className="text-xs font-bold text-[#193555] block">
                  {isAr ? PAYMENT_CONFIG.tamara.nameAr : PAYMENT_CONFIG.tamara.nameEn}
                </span>
                <span className="text-[11px] text-[#64748B]">
                  {isAr ? PAYMENT_CONFIG.tamara.badgeAr : PAYMENT_CONFIG.tamara.badgeEn}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#193555]">
              3 × {tamaraInstallment} {isAr ? 'ر.س' : 'SAR'}
            </span>
          </div>

          {/* Official Inactive Status Notice */}
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-between text-amber-900 text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="font-bold">
                {isAr ? PAYMENT_CONFIG.tamara.inactiveNoticeAr : PAYMENT_CONFIG.tamara.inactiveNoticeEn}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-200/60 font-semibold">
              {isAr ? PAYMENT_CONFIG.tamara.statusBadgeAr : PAYMENT_CONFIG.tamara.statusBadgeEn}
            </span>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 px-3 rounded-lg bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5 opacity-80"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? `الدفع عبر تمارا (${totalAmount} ريال) - غير مفعل حالياً`
                : `Pay with Tamara (${totalAmount} SAR) - Currently Inactive`}
            </span>
          </button>
        </div>
      </div>

      {/* 5. Working Immediate Booking Action via WhatsApp */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleWhatsAppBooking}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            {isAr
              ? `حجز فوري ومباشر عبر واتساب (${totalAmount} ريال)`
              : `Book Directly via WhatsApp (${totalAmount} SAR)`}
          </span>
        </motion.button>
      </div>

      {/* 6. Security & Central Bank Framework Guarantee */}
      <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[10px] text-[#64748B] leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-[#088AC3] flex-shrink-0 mt-0.5" />
        <span>
          {isAr
            ? 'عمليات الدفع الإلكتروني تخضع لمعايير الأمان المصرفي فور تفعيل حسابات التاجر الرسمية لدى تابي وتمارا. لا يتم حفظ أي بيانات بنكية في الموقع.'
            : 'Payment gateways operate under Saudi Central Bank banking encryption upon active merchant verification. No card credentials are stored locally.'}
        </span>
      </div>
    </motion.div>
  );
};
