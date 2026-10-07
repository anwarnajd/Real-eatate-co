export type Language = 'ar' | 'en';

export type PageId = 'home' | 'about' | 'properties' | 'property-details' | 'services' | 'contact';

export type PropertyType =
  | 'villa'
  | 'apartment'
  | 'penthouse'
  | 'commercial'
  | 'land'
  | 'ground_floor'
  | 'upper_floor'
  | 'resort'
  | 'roof_apartment'
  | 'residential_land'
  | 'commercial_land'
  | 'commercial_building'
  | 'residential_building'
  | 'retail_shop'
  | 'warehouse';

export type PropertyPurpose = 'buy' | 'rent';

export type RentalPeriod = 'daily' | 'monthly' | 'annual';

export interface Property {
  id: string;
  refNumber: string;
  title: {
    ar: string;
    en: string;
  };
  purpose: PropertyPurpose;
  rentalPeriod?: RentalPeriod;
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
  rentalPeriod?: RentalPeriod | 'all';
  type: PropertyType | 'all';
  district: string;
  minPrice: number;
  maxPrice: number;
  priceRangeId?: string;
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

export interface CustomerReview {
  id: string;
  name: string;
  rating: number; // 1-5 stars
  text: string;
  date: string;
  roleOrCity?: string;
  avatarUrl?: string;
}
