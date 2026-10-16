/**
 * Utility functions for Netlify Image CDN optimization
 * Docs: https://docs.netlify.com/image-cdn/overview/
 * Format: /.netlify/images?url=<source-image>&w=<width>&q=80
 */

export function getOptimizedImageUrl(
  src: string,
  width?: number,
  quality: number = 80
): string {
  if (!src) return '';
  // Skip SVGs, data URIs, or external absolute URLs
  if (
    src.startsWith('data:') ||
    src.endsWith('.svg') ||
    src.startsWith('http://') ||
    src.startsWith('https://')
  ) {
    return src;
  }

  // In non-Netlify environments (local dev, preview containers), return direct local path immediately
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isNetlify = hostname.includes('netlify.app') || hostname.includes('anwarnajd.sa');
    if (!isNetlify) {
      return src;
    }
  }

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  const encodedSrc = encodeURIComponent(normalizedSrc);

  if (width && width > 0) {
    return `/.netlify/images?url=${encodedSrc}&w=${width}&q=${quality}`;
  }
  return `/.netlify/images?url=${encodedSrc}&q=${quality}`;
}

export function getResponsiveImageSrcSet(
  src: string,
  widths: number[] = [400, 800, 1200],
  quality: number = 80
): string {
  if (
    !src ||
    src.startsWith('data:') ||
    src.endsWith('.svg') ||
    src.startsWith('http://') ||
    src.startsWith('https://')
  ) {
    return '';
  }

  // In non-Netlify environments, avoid generating 404 srcset
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isNetlify = hostname.includes('netlify.app') || hostname.includes('anwarnajd.sa');
    if (!isNetlify) {
      return '';
    }
  }

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  const encodedSrc = encodeURIComponent(normalizedSrc);

  return widths
    .map(
      (w) =>
        `/.netlify/images?url=${encodedSrc}&w=${w}&q=${quality} ${w}w`
    )
    .join(', ');
}

export const CARD_IMAGE_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';

export const DETAIL_HERO_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';

export const HERO_SKYLINE_SIZES = '100vw';
