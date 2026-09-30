import React, { useState } from 'react';
import { Language, ContactFormData } from '../types';
import { translations } from '../data/translations';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    serviceOrProperty: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = isAr
      ? `السلام عليكم، أود التواصل مع شركة أنوار نجد العقارية.\nالاسم: ${formData.name || 'عميل كريم'}\nرقم التواصل: ${formData.phone || 'غير محدد'}\nالموضوع: ${formData.serviceOrProperty || 'استفسار عام'}\n${formData.message}`
      : `Hello, I would like to contact Anwar Najd Real Estate Company.\nName: ${formData.name || 'Client'}\nPhone: ${formData.phone || 'Not specified'}\nTopic: ${formData.serviceOrProperty || 'General Inquiry'}\n${formData.message}`;

    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full bg-white text-[#193555] min-h-screen overflow-x-hidden">
      {/* 1. Header Banner on Light Subtle Blue/Gray */}
      <section className="py-20 bg-[#F4F8FB] border-b border-[#E1EBF2] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#088AC3]/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest font-bold text-[#088AC3]"
          >
            {t.contactPage.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-5xl font-black text-[#193555] tracking-tight"
          >
            {t.contactPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto"
          >
            {t.contactPage.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Main Contact Grid on Crisp White */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Cards & Quick Action Buttons (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Contact Card */}
            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#088AC3] font-bold block mb-1">
                  {t.companyName}
                </span>
                <h3 className="text-xl font-black text-[#193555]">
                  {t.contactPage.infoCardTitle}
                </h3>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'محادثة مباشرة عبر واتساب (0502886202)' : 'Chat Directly on WhatsApp (0502886202)'}</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={`tel:${t.companyPhone}`}
                  className="w-full py-3.5 px-4 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'اتصال هاتفي مباشر:' : 'Call Directly:'} {t.companyPhoneDisplay}</span>
                </motion.a>
              </div>

              {/* Details List */}
              <div className="space-y-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F0F7FB] text-[#088AC3] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-xs">{t.contactPage.addressLabel}</span>
                    <span className="text-[#193555] font-semibold">{t.companyAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F0F7FB] text-[#088AC3] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-xs">{t.contactPage.email}</span>
                    <a href={`mailto:${t.companyEmail}`} className="text-[#193555] font-mono hover:text-[#088AC3] font-semibold">
                      {t.companyEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F0F7FB] text-[#088AC3] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-xs">{t.contactPage.hoursLabel}</span>
                    <span className="text-[#193555] font-semibold">{t.contactPage.hoursValue}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-[#088AC3] font-semibold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>{t.crNumber}</span>
              </div>
            </div>

            {/* Stylized Riyadh Location Map in Light Theme */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <h4 className="text-sm font-bold text-[#193555] mb-3">
                {isAr ? 'موقع الشركة في الرياض' : 'Riyadh Headquarters'}
              </h4>
              <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden bg-[#F0F6FA] border border-slate-200 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #088AC3 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 rounded-full bg-[#088AC3] text-white flex items-center justify-center mx-auto mb-1 shadow-md"
                  >
                    <Building2 className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs font-bold text-[#193555] block">
                    {isAr ? 'طريق الملك فهد، الرياض' : 'King Fahd Road, Riyadh'}
                  </span>
                  <span className="text-[11px] text-[#088AC3] font-semibold">{t.companyShort}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) in Crisp White */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#193555]">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    {t.contactPage.successDesc}
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          serviceOrProperty: '',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#193555] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      {isAr ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#193555]">
                      {t.contactPage.formTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      {t.contactPage.formDesc}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#193555] mb-1">
                          {t.contactPage.name} <span className="text-[#088AC3]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.contactPage.namePlaceholder}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-[#193555] mb-1">
                          {t.contactPage.phone} <span className="text-[#088AC3]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.contactPage.phonePlaceholder}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none font-mono transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-[#193555] mb-1">
                          {t.contactPage.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.contactPage.emailPlaceholder}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Interested Property or Service */}
                      <div>
                        <label className="block text-xs font-bold text-[#193555] mb-1">
                          {t.contactPage.serviceOrProperty}
                        </label>
                        <input
                          type="text"
                          value={formData.serviceOrProperty}
                          onChange={(e) => setFormData({ ...formData, serviceOrProperty: e.target.value })}
                          placeholder={t.contactPage.servicePlaceholder}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-[#193555] mb-1">
                        {t.contactPage.message} <span className="text-[#088AC3]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contactPage.messagePlaceholder}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-[#088AC3] focus:bg-white rounded-lg text-xs sm:text-sm text-[#193555] focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    {/* Submit Button in Cyan */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-6 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#088AC3]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{loading ? t.contactPage.submitting : t.contactPage.submitBtn}</span>
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
