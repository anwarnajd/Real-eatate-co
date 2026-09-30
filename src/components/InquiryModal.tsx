import React, { useState } from 'react';
import { Property, Language } from '../types';
import { translations } from '../data/translations';
import { X, MessageCircle, Phone, CheckCircle2, Send } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  serviceTitle?: string | null;
  language: Language;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  serviceTitle,
  language,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const t = translations[language];
  const isAr = language === 'ar';

  const defaultSubject = property
    ? `${isAr ? property.title.ar : property.title.en} (${property.refNumber})`
    : serviceTitle || (isAr ? 'استفسار عام' : 'General Inquiry');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = isAr
      ? `السلام عليكم ورحمة الله،\nأنا مهتم بـ: ${defaultSubject}\nالاسم: ${name || 'عميل كريم'}\nرقم التواصل: ${phone || 'غير محدد'}\n${message}`
      : `Hello,\nI am interested in: ${defaultSubject}\nName: ${name || 'Prospective Client'}\nPhone: ${phone || 'Not provided'}\n${message}`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#193555]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#193555] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-slate-400 hover:text-[#193555] rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#193555]">
              {t.contactPage.successTitle}
            </h3>
            <p className="text-sm text-[#475569] max-w-sm mx-auto leading-relaxed">
              {t.contactPage.successDesc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'فتح المحادثة عبر واتساب الآن' : 'Open WhatsApp Chat Now'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#193555] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#088AC3] font-bold">
                {t.companyName}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#193555] mt-1">
                {property ? t.propertyDetails.enquireBtn : t.servicesPage.requestService}
              </h3>
              <p className="text-xs text-[#355D7F] mt-1 line-clamp-1 font-semibold">
                {defaultSubject}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#193555] mb-1">
                  {t.contactPage.name} <span className="text-[#088AC3]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contactPage.namePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-sm text-[#193555] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#193555] mb-1">
                  {t.contactPage.phone} <span className="text-[#088AC3]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.contactPage.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-sm text-[#193555] focus:outline-none font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#193555] mb-1">
                  {t.contactPage.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contactPage.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-sm text-[#193555] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#193555] mb-1">
                  {t.contactPage.message}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contactPage.messagePlaceholder}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-sm text-[#193555] focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#088AC3] hover:bg-[#0779AB] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contactPage.submitBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'واتساب مباشر (0502886202)' : 'Direct WhatsApp'}</span>
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>{isAr ? 'أو اتصل فوراً:' : 'Or Call Us:'}</span>
              <a href={`tel:${t.companyPhone}`} className="text-[#088AC3] font-mono font-bold flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" />
                <span>{t.companyPhoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
