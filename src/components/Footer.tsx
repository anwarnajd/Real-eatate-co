import React from 'react';
import { PageId, Language } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  language,
  setLanguage,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = isAr
      ? 'السلام عليكم، أود التواصل مع شركة أنوار نجد العقارية'
      : 'Hello, I would like to contact Anwar Najd Real Estate Company';
    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer className="bg-[#10243B] text-slate-300 border-t-2 border-[#088AC3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Corporate Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="cursor-pointer inline-block" onClick={() => navigateTo('home')}>
              <Logo language={language} variant="footer" size="lg" />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              {t.footer.aboutSummary}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-bold pt-1">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>{t.crNumber}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'واتساب مباشر: 0502886202' : 'Direct WhatsApp'}</span>
              </button>

              <a
                href={`tel:${t.companyPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#088AC3] hover:bg-[#0779AB] text-white rounded-lg text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t.companyPhoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide border-s-2 border-[#088AC3] ps-2.5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.nav.home}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.nav.about}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('properties')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.nav.properties}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.nav.services}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.nav.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide border-s-2 border-[#088AC3] ps-2.5">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'تسويق وبيع العقارات' : 'Property Sales'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'إدارة وتأجير العقارات' : 'Leasing & Property Mgmt'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'التسويق العقاري الرقمي' : 'Real-Estate Marketing'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'الفرص الاستثمارية' : 'Investment Advisory'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#38BDF8] transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'البحث العقاري المخصص' : 'Bespoke Property Search'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide border-s-2 border-[#088AC3] ps-2.5">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.companyAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a href={`tel:${t.companyPhone}`} className="hover:text-[#38BDF8] font-mono dir-ltr font-bold">
                  {t.companyPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a href={`mailto:${t.companyEmail}`} className="hover:text-[#38BDF8] font-mono">
                  {t.companyEmail}
                </a>
              </div>
            </div>

            {/* Language Switcher pill in footer */}
            <div className="pt-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#38BDF8] py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer transition-colors"
              >
                <span>{language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>
          <p className="text-[11px] text-slate-400">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
