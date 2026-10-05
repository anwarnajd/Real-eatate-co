import React from 'react';
import { Language } from '../types';
import { SOCIAL_MEDIA_LINKS, SocialPlatform } from '../data/socialMedia';

interface SocialLinksProps {
  language: Language;
  className?: string;
  variant?: 'footer' | 'inline';
}

const renderSocialIcon = (id: SocialPlatform['id'], className = 'w-4 h-4') => {
  switch (id) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a5.5 5.5 0 0 0-5.5 5.5c0 .7.1 1.4.3 2-.9.3-1.6.8-1.8 1.5-.2.7.2 1.3.8 1.6-.2.4-.5.9-.5 1.4 0 .9.8 1.4 1.8 1.4.3 0 .7 0 1.1-.1.7.9 2.1 1.7 3.8 1.7s3.1-.8 3.8-1.7c.4.1.8.1 1.1.1 1 0 1.8-.5 1.8-1.4 0-.5-.3-1-.5-1.4.6-.3 1-.9.8-1.6-.2-.7-.9-1.2-1.8-1.5.2-.6.3-1.3.3-2A5.5 5.5 0 0 0 12 3z" />
        </svg>
      );
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  language,
  className = '',
}) => {
  const isAr = language === 'ar';

  return (
    <div className={`space-y-2.5 ${className}`}>
      <span className="block text-xs font-bold text-white tracking-wide">
        {isAr ? 'منصات التواصل الاجتماعي' : 'Official Social Channels'}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {SOCIAL_MEDIA_LINKS.map((platform) => {
          const hasUrl = Boolean(platform.url && platform.url.trim().length > 0);
          const platformName = isAr ? platform.nameAr : platform.nameEn;
          const statusTooltip = hasUrl
            ? platformName
            : isAr
            ? `${platformName} (قريباً)`
            : `${platformName} (Coming Soon)`;

          if (hasUrl) {
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                title={statusTooltip}
                aria-label={platform.ariaLabel}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#088AC3] text-white hover:text-white border border-white/15 hover:border-[#088AC3] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
              >
                {renderSocialIcon(platform.id, 'w-4 h-4')}
              </a>
            );
          }

          // Disabled/Prepared State (No fake links)
          return (
            <div
              key={platform.id}
              title={statusTooltip}
              aria-label={platform.ariaLabel}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center cursor-not-allowed opacity-75 hover:opacity-100 transition-opacity relative group"
            >
              {renderSocialIcon(platform.id, 'w-4 h-4')}
              <span className="sr-only">{statusTooltip}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
