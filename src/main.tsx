import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely clear any obsolete service workers or legacy property caches from prior sessions
if (typeof window !== 'undefined') {
  try {
    // 1. Unregister any obsolete/stale service workers from previous iterations
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().catch(() => {});
        }
      }).catch(() => {});
    }

    // 2. Clear any stale CacheStorage caches created by legacy service workers
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          if (
            key.includes('property') ||
            key.includes('properties') ||
            key.includes('anwar') ||
            key.includes('pwa') ||
            key.includes('workbox') ||
            key.includes('v1')
          ) {
            caches.delete(key).catch(() => {});
          }
        }
      }).catch(() => {});
    }

    // 3. Clear any obsolete property-related items in localStorage/sessionStorage
    // while strictly preserving legitimate user settings (e.g., 'anwar_najd_lang')
    const preserveKeys = new Set(['anwar_najd_lang']);
    if (window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          !preserveKeys.has(key) &&
          (key.includes('prop') ||
            key.includes('listing') ||
            key.includes('cache') ||
            key.includes('demo') ||
            key.includes('draft') ||
            key.includes('anw_'))
        ) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }

    if (window.sessionStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (
          key &&
          !preserveKeys.has(key) &&
          (key.includes('prop') ||
            key.includes('listing') ||
            key.includes('cache') ||
            key.includes('demo') ||
            key.includes('draft') ||
            key.includes('anw_'))
        ) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    }
  } catch {
    // Gracefully ignore in restricted / private browsing modes
  }
}

createRoot(document.getElementById('root')!).render(<App />);
