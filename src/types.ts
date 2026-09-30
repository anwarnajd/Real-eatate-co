export type Language = 'ar' | 'en';

export type PageId = 'home' | 'about' | 'properties' | 'property-details' | 'services' | 'contact';

export type PropertyType = 'villa' | 'apartment' | 'penthouse' | 'commercial' | 'land';
export type PropertyPurpose = 'buy' | 'rent';

export interface Property {
  id: string;
  refNumber: string;
  title: {
    ar: string;
    en: string;
  };
  purpose: PropertyPurpose;
  type: PropertyType;
  price: number;
  priceFormatted: {
    ar: string;
    en: string;
  };
  location: {
    districtAr: string;
    districtEn: string;
    cityAr: string;
    cityEn: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in sq meters
  featured: boolean;
  images: string[];
  description: {
    ar: string;
    en: string;
  };
  features: {
    ar: string[];
    en: string[];
  };
  yearBuilt?: number;
  facade?: {
    ar: string;
    en: string;
  };
  specs?: {
    labelAr: string;
    labelEn: string;
    valueAr: string;
    valueEn: string;
  }[];
}

export interface PropertyFilterState {
  purpose: PropertyPurpose | 'all';
  type: PropertyType | 'all';
  district: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  serviceOrProperty: string;
  message: string;
}
