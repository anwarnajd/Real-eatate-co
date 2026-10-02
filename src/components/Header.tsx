import React, { useState, useEffect } from 'react';
import { PageId, Language } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { MessageCircle, Phone, Menu, X, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenInquiry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'properties', label: t.nav.properties },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  const openWhatsApp = () => {
    const message = isAr
      ? 'السلام عليكم، أود الاستفسار عن خدمات وعقارات شركة انوار نجد العقارية'
      : 'Hello, I would like to inquire about properties and services from Anwar Najd Real Estate Company';
    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(25,53,85,0.08)] py-0'
          : currentPage === 'home'
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/40 py-1'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Zone 1: Exact Brand Logo with smooth hover motion */}
          <motion.div
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer group flex-shrink min-w-0"
          >
            <Logo language={language} variant="light" size={scrolled ? 'sm' : 'md'} />
          </motion.div>

          {/* Zone 2: Navigation Links with Animated Underline */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`group px-3.5 py-2 text-sm font-semibold transition-colors whitespace-nowrap relative rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-[#088AC3] font-bold'
                      : 'text-[#193555] hover:text-[#088AC3]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#088AC3] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#088AC3]/70 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4/5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Language Switcher & WhatsApp/Call CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Functional Language Switcher: العربية | English */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#193555] hover:text-[#088AC3] hover:bg-white/70'
                }`}
                title="التحويل إلى اللغة العربية"
              >
                العربية
              </button>
              <span className="text-slate-300 text-xs px-1 select-none">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#193555] hover:text-[#088AC3] hover:bg-white/70'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>

            {/* Direct WhatsApp CTA with smooth hover lift and glow */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={openWhatsApp}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#088AC3] hover:bg-[#0779AB] rounded-lg shadow-sm hover:shadow-md hover:shadow-[#088AC3]/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>{t.nav.whatsApp}</span>
            </motion.button>

            {/* Direct Phone Call Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${t.companyPhone}`}
              className="p-2 text-[#193555] hover:text-[#088AC3] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title={t.companyPhoneDisplay}
            >
              <Phone className="w-4 h-4 text-[#088AC3]" />
            </motion.a>
          </div>

          {/* Mobile Menu & Compact Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden flex-shrink-0">
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#193555] hover:text-[#088AC3]'
                }`}
                title="العربية"
              >
                العربية
              </button>
              <span className="text-slate-300 text-[10px] px-0.5 select-none">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#088AC3] text-white shadow-xs'
                    : 'text-[#193555] hover:text-[#088AC3]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-[#193555] hover:text-[#088AC3] rounded-lg focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg"
        >
          {/* Mobile Language Switcher Row in Drawer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#193555] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#088AC3]" />
              <span>{isAr ? 'لغة الموقع' : 'Language'}</span>
            </span>
            <div className="flex items-center p-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setLanguage('ar');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#088AC3] text-white'
                    : 'text-[#193555] hover:text-[#088AC3]'
                }`}
              >
                العربية
              </button>
              <span className="text-slate-300 text-xs px-1 select-none">|</span>
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#088AC3] text-white'
                    : 'text-[#193555] hover:text-[#088AC3]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-start px-4 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                currentPage === link.id
                  ? 'bg-[#F0F7FB] text-[#088AC3]'
                  : 'text-[#193555] hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                openWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-white bg-[#088AC3] hover:bg-[#0779AB] rounded-lg cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'محادثة واتساب فورية (0502886202)' : 'WhatsApp (0502886202)'}</span>
            </button>

            <a
              href={`tel:${t.companyPhone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-[#193555] bg-slate-100 hover:bg-slate-200 rounded-lg font-mono dir-ltr"
            >
              <Phone className="w-4 h-4 text-[#088AC3]" />
              <span>{t.companyPhoneDisplay}</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
