/**
 * Official Company Social Media Accounts
 * 
 * Paste your official social media URLs here to activate the links.
 * When a URL is empty (''), the icon is cleanly disabled with a polite "Coming Soon" indicator,
 * preventing any broken or fake links on the public website.
 */
export interface SocialPlatform {
  id: 'x' | 'instagram' | 'tiktok' | 'snapchat';
  nameAr: string;
  nameEn: string;
  url: string;
  ariaLabel: string;
}

export const SOCIAL_MEDIA_LINKS: SocialPlatform[] = [
  {
    id: 'x',
    nameAr: 'إكس (تويتر)',
    nameEn: 'X (Twitter)',
    url: '', // e.g. 'https://x.com/anwarnajd'
    ariaLabel: 'X / Twitter profile',
  },
  {
    id: 'instagram',
    nameAr: 'انستقرام',
    nameEn: 'Instagram',
    url: '', // e.g. 'https://instagram.com/anwarnajd'
    ariaLabel: 'Instagram profile',
  },
  {
    id: 'tiktok',
    nameAr: 'تيك توك',
    nameEn: 'TikTok',
    url: '', // e.g. 'https://tiktok.com/@anwarnajd'
    ariaLabel: 'TikTok profile',
  },
  {
    id: 'snapchat',
    nameAr: 'سناب شات',
    nameEn: 'Snapchat',
    url: '', // e.g. 'https://snapchat.com/add/anwarnajd'
    ariaLabel: 'Snapchat profile',
  },
];
