export interface PaymentConfig {
  rize: {
    partnerUrl: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    buttonAr: string;
    buttonEn: string;
    pendingNoticeAr: string;
    pendingNoticeEn: string;
  };
  tabby: {
    nameAr: string;
    nameEn: string;
    badgeAr: string;
    badgeEn: string;
    inactiveNoticeAr: string;
    inactiveNoticeEn: string;
    statusBadgeAr: string;
    statusBadgeEn: string;
  };
  tamara: {
    nameAr: string;
    nameEn: string;
    badgeAr: string;
    badgeEn: string;
    inactiveNoticeAr: string;
    inactiveNoticeEn: string;
    statusBadgeAr: string;
    statusBadgeEn: string;
  };
}

export const PAYMENT_CONFIG: PaymentConfig = {
  rize: {
    partnerUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RIZE_PARTNER_URL) || '',
    titleAr: 'قسّط إيجارك السنوي شهرياً مع رايز (Rize)',
    titleEn: 'Split Annual Rent Monthly with Rize',
    subtitleAr: 'حلول تمويلية معتمدة تمكّنك من دفع إيجار العقار السنوي على دفعات شهرية ميسرة وفق ضوابط الشريعة.',
    subtitleEn: 'Accredited financing solutions allowing you to pay your annual rent in flexible monthly installments.',
    buttonAr: 'التقديم عبر منصة رايز المعتمدة',
    buttonEn: 'Apply via Official Rize Platform',
    pendingNoticeAr: 'رابط التقديم المباشر قيد الإعداد والاعتماد بالتنسيق مع إدارة رايز',
    pendingNoticeEn: 'Direct application link is pending configuration with Rize administration',
  },
  tabby: {
    nameAr: 'تابي (Tabby)',
    nameEn: 'Tabby',
    badgeAr: 'قسّم المبلغ على 4 دفعات شهرية متساوية بدون فوائد',
    badgeEn: 'Split into 4 interest-free monthly installments',
    inactiveNoticeAr: 'بانتظار اكتمال تفعيل حساب التاجر المعتمد لشركة انوار نجد العقارية لدى تابي',
    inactiveNoticeEn: 'Awaiting completion of accredited merchant account activation with Tabby',
    statusBadgeAr: 'قيد التفعيل',
    statusBadgeEn: 'Pending Activation',
  },
  tamara: {
    nameAr: 'تمارا (Tamara)',
    nameEn: 'Tamara',
    badgeAr: 'قسّم المبلغ على 3 دفعات ميسرة بدون رسوم إضافية',
    badgeEn: 'Split into 3 easy payments with zero additional fees',
    inactiveNoticeAr: 'بانتظار اكتمال تفعيل حساب التاجر المعتمد لشركة انوار نجد العقارية لدى تمارا',
    inactiveNoticeEn: 'Awaiting completion of accredited merchant account activation with Tamara',
    statusBadgeAr: 'قيد التفعيل',
    statusBadgeEn: 'Pending Activation',
  },
};
