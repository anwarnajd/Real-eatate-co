/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, PageId, Property, PropertyFilterState } from './types';
import { propertiesData } from './data/properties';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { IntroAnimation } from './components/IntroAnimation';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Bulletproof storage helper that never crashes even in strict private mode or sandboxed iframes
const getInitialLanguage = (): Language => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('anwar_najd_lang');
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    }
  } catch {
    // storage unavailable or restricted
  }
  return 'ar';
};

const setSafeLanguage = (lang: Language): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('anwar_najd_lang', lang);
    }
  } catch {
    // storage unavailable or restricted
  }
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error('Anwar Najd App caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-center font-sans">
          <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold text-[#193555] mb-2">شركة أنوار نجد العقارية</h2>
            <p className="text-xs text-slate-500 mb-6">Anwar Najd Real Estate Company</p>
            <button
              onClick={() => {
                try {
                  window.localStorage?.removeItem('anwar_najd_lang');
                } catch {}
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#088AC3] hover:bg-[#0779AB] text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
            >
              إعادة التحميل / Reload Website
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLang: Language) => {
    const safeLang: Language = newLang === 'en' ? 'en' : 'ar';
    setLanguageState(safeLang);
    setSafeLanguage(safeLang);
  };

  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [initialFilters, setInitialFilters] = useState<Partial<PropertyFilterState>>({});
  const [introFinished, setIntroFinished] = useState(false);

  // Inquiry Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [inquiryServiceTitle, setInquiryServiceTitle] = useState<string | null>(null);

  // Update HTML dir and lang on language change
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = language === 'ar'
      ? 'شركة أنوار نجد العقارية | Anwar Najd Real Estate Company'
      : 'Anwar Najd Real Estate Company | شركة أنوار نجد العقارية';
  }, [language]);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplySearchFilter = (filter: Partial<PropertyFilterState>) => {
    setInitialFilters(filter);
    setCurrentPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (propOrNull?: Property | null, serviceTitle?: string) => {
    setInquiryProperty(propOrNull || null);
    setInquiryServiceTitle(serviceTitle || null);
    setIsInquiryOpen(true);
  };

  const openWhatsAppFloating = () => {
    const isAr = language === 'ar';
    const message = isAr
      ? 'السلام عليكم، أود التواصل مع شركة أنوار نجد العقارية'
      : 'Hello, I would like to contact Anwar Najd Real Estate Company';
    window.open(`https://wa.me/966502886202?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <ErrorBoundary>
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen bg-white text-[#193555] flex flex-col selection:bg-[#088AC3] selection:text-white"
      >
      {/* 2. Premium 1-Second Intro Animation */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* 10. Subtle Premium Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        onOpenInquiry={() => handleOpenInquiry(null)}
      />

      {/* Main Pages with Smooth Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${language}${currentPage === 'property-details' ? `-${selectedProperty?.id || 'default'}` : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                language={language}
                setCurrentPage={setCurrentPage}
                onSelectProperty={handleSelectProperty}
                onOpenInquiry={handleOpenInquiry}
                onApplySearchFilter={handleApplySearchFilter}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                language={language}
                setCurrentPage={setCurrentPage}
                onOpenInquiry={() => handleOpenInquiry(null)}
              />
            )}

            {currentPage === 'properties' && (
              <PropertiesPage
                language={language}
                initialFilters={initialFilters}
                onSelectProperty={handleSelectProperty}
                onOpenInquiry={handleOpenInquiry}
              />
            )}

            {currentPage === 'property-details' && (
              <PropertyDetailsPage
                property={selectedProperty || propertiesData[0]}
                language={language}
                setCurrentPage={setCurrentPage}
                onSelectProperty={handleSelectProperty}
                onOpenInquiry={(p) => handleOpenInquiry(p)}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                language={language}
                setCurrentPage={setCurrentPage}
                onOpenInquiry={(svcTitle) => handleOpenInquiry(null, svcTitle)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage language={language} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer in Luxury Dark Navy Accent */}
      <Footer
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Reusable Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        property={inquiryProperty}
        serviceTitle={inquiryServiceTitle}
        language={language}
      />

      {/* Floating Quick Action CTA: WhatsApp & Direct Contact with Smooth Load Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 end-6 z-40 flex flex-col items-center gap-3"
      >
        {/* Floating Call Button with Motion Lift */}
        <motion.a
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          href="tel:0502886202"
          className="w-12 h-12 rounded-full bg-white text-[#088AC3] border border-slate-200 shadow-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
          title={language === 'ar' ? 'اتصال هاتفي مباشر: 0502886202' : 'Call: +966 50 288 6202'}
          aria-label="Direct Phone Call"
        >
          <Phone className="w-5 h-5" />
        </motion.a>

        {/* Floating WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={openWhatsAppFloating}
          className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-2xl flex items-center justify-center hover:bg-emerald-500 transition-all cursor-pointer border-2 border-white"
          title={language === 'ar' ? 'محادثة فورية عبر واتساب: 0502886202' : 'WhatsApp Us: +966 50 288 6202'}
          aria-label="WhatsApp Us"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
        </motion.button>
      </motion.div>
      </div>
    </ErrorBoundary>
  );
}
