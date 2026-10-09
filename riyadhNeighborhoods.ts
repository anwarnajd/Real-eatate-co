export interface RiyadhDistrict {
  id: string;
  nameAr: string;
  nameEn: string;
  zone: 'north' | 'east' | 'west' | 'central' | 'south';
}

export const RIYADH_DISTRICTS: RiyadhDistrict[] = [
  // North Riyadh - شمال الرياض
  { id: 'hittin', nameAr: 'حطين', nameEn: 'Hittin', zone: 'north' },
  { id: 'al-malqa', nameAr: 'الملقا', nameEn: 'Al Malqa', zone: 'north' },
  { id: 'al-narjis', nameAr: 'النرجس', nameEn: 'Al Narjis', zone: 'north' },
  { id: 'al-yasmin', nameAr: 'الياسمين', nameEn: 'Al Yasmin', zone: 'north' },
  { id: 'al-sahafa', nameAr: 'الصحافة', nameEn: 'Al Sahafa', zone: 'north' },
  { id: 'al-aqiq', nameAr: 'العقيق', nameEn: 'Al Aqiq', zone: 'north' },
  { id: 'al-ghadir', nameAr: 'الغدير', nameEn: 'Al Ghadir', zone: 'north' },
  { id: 'al-wadi', nameAr: 'الوادي', nameEn: 'Al Wadi', zone: 'north' },
  { id: 'al-nada', nameAr: 'الندى', nameEn: 'Al Nada', zone: 'north' },
  { id: 'al-rabia', nameAr: 'الربيع', nameEn: 'Al Rabia', zone: 'north' },
  { id: 'al-falah', nameAr: 'الفلاح', nameEn: 'Al Falah', zone: 'north' },
  { id: 'al-qayrawan', nameAr: 'القيروان', nameEn: 'Al Qayrawan', zone: 'north' },
  { id: 'al-arid', nameAr: 'العارض', nameEn: 'Al Arid', zone: 'north' },
  { id: 'al-nafl', nameAr: 'النفل', nameEn: 'Al Nafl', zone: 'north' },
  { id: 'banban', nameAr: 'بنبان', nameEn: 'Banban', zone: 'north' },
  { id: 'al-khair', nameAr: 'الخير', nameEn: 'Al Khair', zone: 'north' },
  { id: 'salboukh', nameAr: 'صلبوخ', nameEn: 'Salboukh', zone: 'north' },
  { id: 'ksu-district', nameAr: 'جامعة الملك سعود', nameEn: 'King Saud University District', zone: 'north' },
  { id: 'imamu-district', nameAr: 'جامعة الإمام', nameEn: 'Imam University District', zone: 'north' },

  // Central Riyadh - وسط الرياض
  { id: 'al-olaya', nameAr: 'العليا', nameEn: 'Al Olaya', zone: 'central' },
  { id: 'al-sulaimaniyah', nameAr: 'السليمانية', nameEn: 'Al Sulaimaniyah', zone: 'central' },
  { id: 'al-muruj', nameAr: 'المروج', nameEn: 'Al Muruj', zone: 'central' },
  { id: 'king-fahd', nameAr: 'الملك فهد', nameEn: 'King Fahd', zone: 'central' },
  { id: 'al-wurud', nameAr: 'الورود', nameEn: 'Al Wurud', zone: 'central' },
  { id: 'salah-al-din', nameAr: 'صلاح الدين', nameEn: 'Salah Al-Din', zone: 'central' },
  { id: 'al-nuzha', nameAr: 'النزهة', nameEn: 'Al Nuzha', zone: 'central' },
  { id: 'al-mursalat', nameAr: 'المرسلات', nameEn: 'Al Mursalat', zone: 'central' },
  { id: 'al-waha', nameAr: 'الواحة', nameEn: 'Al Waha', zone: 'central' },
  { id: 'al-muatamarat', nameAr: 'المؤتمرات', nameEn: 'Al Muatamarat', zone: 'central' },
  { id: 'al-namuthajiyah', nameAr: 'النموذجية', nameEn: 'Al Namuthajiyah', zone: 'central' },
  { id: 'al-maather', nameAr: 'المعذر', nameEn: 'Al Maather', zone: 'central' },
  { id: 'al-washam', nameAr: 'الوشام', nameEn: 'Al Washam', zone: 'central' },
  { id: 'al-murabba', nameAr: 'المربع', nameEn: 'Al Murabba', zone: 'central' },
  { id: 'al-futah', nameAr: 'الفوطة', nameEn: 'Al Futah', zone: 'central' },
  { id: 'al-fakhriyah', nameAr: 'الفاخرية', nameEn: 'Al Fakhriyah', zone: 'central' },
  { id: 'al-dirah', nameAr: 'الديرة', nameEn: 'Al Dirah', zone: 'central' },
  { id: 'al-marqab', nameAr: 'المرقب', nameEn: 'Al Marqab', zone: 'central' },
  { id: 'al-salhiyah', nameAr: 'الصالحية', nameEn: 'Al Salhiyah', zone: 'central' },
  { id: 'umm-al-hammam-east', nameAr: 'أم الحمام الشرقي', nameEn: 'Umm Al-Hammam East', zone: 'central' },
  { id: 'umm-al-hammam-west', nameAr: 'أم الحمام الغربي', nameEn: 'Umm Al-Hammam West', zone: 'central' },

  // East Riyadh - شرق الرياض
  { id: 'al-rimal', nameAr: 'الرمال', nameEn: 'Al Rimal', zone: 'east' },
  { id: 'al-mounisiyah', nameAr: 'المونسية', nameEn: 'Al Mounisiyah', zone: 'east' },
  { id: 'qurtubah', nameAr: 'قرطبة', nameEn: 'Qurtubah', zone: 'east' },
  { id: 'al-yarmuk', nameAr: 'اليرموك', nameEn: 'Al Yarmuk', zone: 'east' },
  { id: 'al-hamra', nameAr: 'الحمراء', nameEn: 'Al Hamra', zone: 'east' },
  { id: 'ghirnatah', nameAr: 'غرناطة', nameEn: 'Ghirnatah', zone: 'east' },
  { id: 'ishbiliyah', nameAr: 'إشبيلية', nameEn: 'Ishbiliyah', zone: 'east' },
  { id: 'al-rawdah', nameAr: 'الروضة', nameEn: 'Al Rawdah', zone: 'east' },
  { id: 'al-quds', nameAr: 'القدس', nameEn: 'Al Quds', zone: 'east' },
  { id: 'al-andalus', nameAr: 'الأندلس', nameEn: 'Al Andalus', zone: 'east' },
  { id: 'al-khaleej', nameAr: 'الخليج', nameEn: 'Al Khaleej', zone: 'east' },
  { id: 'al-nahdah', nameAr: 'النهضة', nameEn: 'Al Nahdah', zone: 'east' },
  { id: 'al-rawabi', nameAr: 'الروابي', nameEn: 'Al Rawabi', zone: 'east' },
  { id: 'al-rayyan', nameAr: 'الريان', nameEn: 'Al Rayyan', zone: 'east' },
  { id: 'al-nasim-sharqi', nameAr: 'النسيم الشرقي', nameEn: 'Al Naseem East', zone: 'east' },
  { id: 'al-nasim-gharbi', nameAr: 'النسيم الغربي', nameEn: 'Al Naseem West', zone: 'east' },
  { id: 'al-salam', nameAr: 'السلام', nameEn: 'Al Salam', zone: 'east' },
  { id: 'al-fayha', nameAr: 'الفيحاء', nameEn: 'Al Fayha', zone: 'east' },
  { id: 'al-jazeera', nameAr: 'الجزيرة', nameEn: 'Al Jazeera', zone: 'east' },
  { id: 'al-saadah', nameAr: 'السعادة', nameEn: 'Al Saadah', zone: 'east' },
  { id: 'al-sulay', nameAr: 'السلي', nameEn: 'Al Sulay', zone: 'east' },
  { id: 'al-nadheem', nameAr: 'النظيم', nameEn: 'Al Nadheem', zone: 'east' },
  { id: 'al-janadriyah', nameAr: 'الجنادرية', nameEn: 'Al Janadriyah', zone: 'east' },
  { id: 'al-bayan', nameAr: 'البيان', nameEn: 'Al Bayan', zone: 'east' },
  { id: 'al-nadwa', nameAr: 'الندوة', nameEn: 'Al Nadwa', zone: 'east' },
  { id: 'al-shuhada', nameAr: 'الشهداء', nameEn: 'Al Shuhada', zone: 'east' },
  { id: 'al-mugharrazat', nameAr: 'المغرزات', nameEn: 'Al Mugharrazat', zone: 'east' },

  // West Riyadh - غرب الرياض
  { id: 'al-nakheel', nameAr: 'النخيل', nameEn: 'Al Nakheel', zone: 'west' },
  { id: 'al-khuzama', nameAr: 'الخزامى', nameEn: 'Al Khuzama', zone: 'west' },
  { id: 'al-huda', nameAr: 'الهدا', nameEn: 'Al Huda', zone: 'west' },
  { id: 'diriyah', nameAr: 'الدرعية', nameEn: 'Al Diriyah', zone: 'west' },
  { id: 'irqah', nameAr: 'عرقة', nameEn: 'Irqah', zone: 'west' },
  { id: 'laban', nameAr: 'لبن', nameEn: 'Laban', zone: 'west' },
  { id: 'dhahrat-laban', nameAr: 'ظهرة لبن', nameEn: 'Dhahrat Laban', zone: 'west' },
  { id: 'tuwaiq', nameAr: 'طويق', nameEn: 'Tuwaiq', zone: 'west' },
  { id: 'al-mahdiyah', nameAr: 'المهدية', nameEn: 'Al Mahdiyah', zone: 'west' },
  { id: 'shubra', nameAr: 'شبرا', nameEn: 'Shubra', zone: 'west' },
  { id: 'al-suwaidi', nameAr: 'السويدي', nameEn: 'Al Suwaidi', zone: 'west' },
  { id: 'al-suwaidi-west', nameAr: 'السويدي الغربي', nameEn: 'Al Suwaidi West', zone: 'west' },
  { id: 'zahrat-al-badiat', nameAr: 'زهرة البديعة', nameEn: 'Zahrat Al Badiat', zone: 'west' },
  { id: 'al-badiah', nameAr: 'البديعة', nameEn: 'Al Badiah', zone: 'west' },
  { id: 'al-urayja', nameAr: 'العريجاء', nameEn: 'Al Urayja', zone: 'west' },
  { id: 'al-urayja-west', nameAr: 'العريجاء الغربية', nameEn: 'Al Urayja West', zone: 'west' },
  { id: 'al-rafiah', nameAr: 'الرفيعة', nameEn: 'Al Rafiah', zone: 'west' },
  { id: 'ulaishah', nameAr: 'عليشة', nameEn: 'Ulaishah', zone: 'west' },
  { id: 'al-jarradiyah', nameAr: 'الجرادية', nameEn: 'Al Jarradiyah', zone: 'west' },

  // South Riyadh - جنوب الرياض
  { id: 'al-shifa', nameAr: 'الشفاء', nameEn: 'Al Shifa', zone: 'south' },
  { id: 'badr', nameAr: 'بدر', nameEn: 'Badr', zone: 'south' },
  { id: 'al-marwah', nameAr: 'المروة', nameEn: 'Al Marwah', zone: 'south' },
  { id: 'namar', nameAr: 'نمار', nameEn: 'Namar', zone: 'south' },
  { id: 'al-hazm', nameAr: 'الحزم', nameEn: 'Al Hazm', zone: 'south' },
  { id: 'al-aziziyah', nameAr: 'العزيزية', nameEn: 'Al Aziziyah', zone: 'south' },
  { id: 'al-dar-al-baida', nameAr: 'الدار البيضاء', nameEn: 'Al Dar Al Baida', zone: 'south' },
  { id: 'al-mansourah', nameAr: 'المنصورة', nameEn: 'Al Mansourah', zone: 'south' },
  { id: 'al-khalidiyah', nameAr: 'الخالدية', nameEn: 'Al Khalidiyah', zone: 'south' },
  { id: 'al-yamamah', nameAr: 'اليمامة', nameEn: 'Al Yamamah', zone: 'south' },
  { id: 'manfuhah', nameAr: 'منفوحة', nameEn: 'Manfuhah', zone: 'south' },
  { id: 'manfuhah-new', nameAr: 'منفوحة الجديدة', nameEn: 'New Manfuhah', zone: 'south' },
  { id: 'al-batha', nameAr: 'البطحاء', nameEn: 'Al Batha', zone: 'south' },
  { id: 'ghubaira', nameAr: 'غبيراء', nameEn: 'Ghubaira', zone: 'south' },
  { id: 'utaiqah', nameAr: 'عتيقة', nameEn: 'Utaiqah', zone: 'south' },
  { id: 'taybah', nameAr: 'طيبة', nameEn: 'Taybah', zone: 'south' },
  { id: 'al-masani', nameAr: 'المصانع', nameEn: 'Al Masani', zone: 'south' },
  { id: 'al-hair', nameAr: 'الحائر', nameEn: 'Al Ha\'ir', zone: 'south' },
];

export interface PriceRangeOption {
  id: string;
  min: number;
  max: number;
  labelAr: string;
  labelEn: string;
}

export const EXACT_PRICE_RANGES: PriceRangeOption[] = [
  {
    id: 'all',
    min: 0,
    max: 0,
    labelAr: 'كافة الأسعار',
    labelEn: 'All Prices',
  },
  {
    id: '300k-500k',
    min: 300000,
    max: 500000,
    labelAr: 'من 300,000 ر.س حتى 500,000 ر.س',
    labelEn: '300,000 SAR – 500,000 SAR',
  },
  {
    id: '500k-800k',
    min: 500000,
    max: 800000,
    labelAr: 'من 500,000 ر.س حتى 800,000 ر.س',
    labelEn: '500,000 SAR – 800,000 SAR',
  },
  {
    id: '800k-1.3m',
    min: 800000,
    max: 1300000,
    labelAr: 'من 800,000 ر.س حتى 1,300,000 ر.س',
    labelEn: '800,000 SAR – 1,300,000 SAR',
  },
  {
    id: '1.3m-1.9m',
    min: 1300000,
    max: 1900000,
    labelAr: 'من 1,300,000 ر.س حتى 1,900,000 ر.س',
    labelEn: '1,300,000 SAR – 1,900,000 SAR',
  },
  {
    id: '1.9m-2.6m',
    min: 1900000,
    max: 2600000,
    labelAr: 'من 1,900,000 ر.س حتى 2,600,000 ر.س',
    labelEn: '1,900,000 SAR – 2,600,000 SAR',
  },
];

export const SALE_PRICE_RANGES = EXACT_PRICE_RANGES;

export const ANNUAL_RENT_PRICE_RANGES: PriceRangeOption[] = [
  {
    id: 'all',
    min: 0,
    max: 0,
    labelAr: 'كافة أسعار الإيجار السنوي',
    labelEn: 'All Annual Rates',
  },
  {
    id: '20k-40k-annual',
    min: 20000,
    max: 40000,
    labelAr: 'من 20 ألف إلى 40 ألف ر.س / سنوياً',
    labelEn: '20,000 – 40,000 SAR / year',
  },
  {
    id: '40k-60k-annual',
    min: 40000,
    max: 60000,
    labelAr: 'من 40 ألف إلى 60 ألف ر.س / سنوياً',
    labelEn: '40,000 – 60,000 SAR / year',
  },
  {
    id: '60k-100k-annual',
    min: 60000,
    max: 100000,
    labelAr: 'من 60 ألف إلى 100 ألف ر.س / سنوياً',
    labelEn: '60,000 – 100,000 SAR / year',
  },
  {
    id: '100k-plus-annual',
    min: 100000,
    max: 0,
    labelAr: '100 ألف ر.س فأكثر / سنوياً',
    labelEn: '100,000+ SAR / year',
  },
];

export const RENT_PRICE_RANGES = ANNUAL_RENT_PRICE_RANGES;

export const MONTHLY_RENT_PRICE_RANGES: PriceRangeOption[] = [
  {
    id: 'all',
    min: 0,
    max: 0,
    labelAr: 'كافة أسعار الإيجار الشهري',
    labelEn: 'All Monthly Rates',
  },
  {
    id: '20k-30k-monthly',
    min: 20000,
    max: 30000,
    labelAr: 'من 20,000 إلى 30,000 ر.س / شهرياً',
    labelEn: '20,000 – 30,000 SAR / month',
  },
  {
    id: '30k-40k-monthly',
    min: 30000,
    max: 40000,
    labelAr: 'من 30,000 إلى 40,000 ر.س / شهرياً',
    labelEn: '30,000 – 40,000 SAR / month',
  },
  {
    id: '40k-plus-monthly',
    min: 40000,
    max: 0,
    labelAr: '40,000 ر.س فأكثر / شهرياً',
    labelEn: '40,000+ SAR / month',
  },
];

export const DAILY_RENT_PRICE_RANGES: PriceRangeOption[] = [
  {
    id: 'all',
    min: 0,
    max: 0,
    labelAr: '120 ريال فأكثر / يوم (كافة أسعار اليومي)',
    labelEn: '120 SAR and above / day (All Daily Rates)',
  },
  {
    id: '120-150',
    min: 120,
    max: 150,
    labelAr: 'من 120 إلى 150 ريال / يوم',
    labelEn: '120 – 150 SAR / day',
  },
  {
    id: '150-200',
    min: 150,
    max: 200,
    labelAr: 'من 150 إلى 200 ريال / يوم',
    labelEn: '150 – 200 SAR / day',
  },
  {
    id: '200-plus',
    min: 200,
    max: 0,
    labelAr: '200 ريال فأكثر / يوم',
    labelEn: '200+ SAR / day',
  },
];

export const getActivePriceRanges = (
  purpose: 'buy' | 'rent' | 'all',
  rentalPeriod?: 'daily' | 'monthly' | 'annual' | 'all'
): PriceRangeOption[] => {
  if (purpose === 'rent') {
    if (rentalPeriod === 'daily') return DAILY_RENT_PRICE_RANGES;
    if (rentalPeriod === 'monthly') return MONTHLY_RENT_PRICE_RANGES;
    return ANNUAL_RENT_PRICE_RANGES;
  }
  return SALE_PRICE_RANGES;
};


export interface RentalPeriodOption {
  id: 'all' | 'daily' | 'monthly' | 'annual';
  nameAr: string;
  nameEn: string;
}

export const RENTAL_PERIOD_OPTIONS: RentalPeriodOption[] = [
  { id: 'all', nameAr: 'كافة فترات الإيجار', nameEn: 'All Rental Periods' },
  { id: 'daily', nameAr: 'إيجار يومي', nameEn: 'Daily Rental' },
  { id: 'monthly', nameAr: 'إيجار شهري', nameEn: 'Monthly Rental' },
  { id: 'annual', nameAr: 'إيجار سنوي', nameEn: 'Annual Rental' },
];

export interface OwnerPropertyTypeOption {
  id: string;
  nameAr: string;
  nameEn: string;
}

export const OWNER_PROPERTY_TYPES: OwnerPropertyTypeOption[] = [
  { id: 'all', nameAr: 'جميع الأنواع', nameEn: 'All Types' },
  { id: 'villa', nameAr: 'فيلا', nameEn: 'Villa' },
  { id: 'ground_floor', nameAr: 'دور أرضي', nameEn: 'Ground Floor' },
  { id: 'upper_floor', nameAr: 'دور علوي', nameEn: 'Upper Floor' },
  { id: 'penthouse', nameAr: 'بنتهاوس', nameEn: 'Penthouse' },
  { id: 'resort', nameAr: 'استراحة', nameEn: 'Rest House / Chalet' },
  { id: 'apartment', nameAr: 'شقة سكنية', nameEn: 'Residential Apartment' },
  { id: 'roof_apartment', nameAr: 'شقة مع السطح', nameEn: 'Rooftop Apartment' },
  { id: 'residential_land', nameAr: 'أرض سكنية', nameEn: 'Residential Land' },
  { id: 'commercial_land', nameAr: 'أرض تجارية', nameEn: 'Commercial Land' },
  { id: 'commercial_building', nameAr: 'عمارة تجارية', nameEn: 'Commercial Building' },
  { id: 'residential_building', nameAr: 'عمارة سكنية', nameEn: 'Residential Building' },
  { id: 'retail_shop', nameAr: 'محل تجاري', nameEn: 'Retail Shop' },
  { id: 'warehouse', nameAr: 'مستودع', nameEn: 'Warehouse' },
];
