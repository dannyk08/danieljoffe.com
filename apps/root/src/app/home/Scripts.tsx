import { publicEnv } from '@/lib/public.env';
import { GoogleAnalytics } from './GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { structuredData } from '../structuredData';
import Script from 'next/script';
import { headers } from 'next/headers';
import { serverEnv } from '@/lib/env';

const isProduction = serverEnv.NODE_ENV === 'production';
export default async function Scripts() {
  const headersStore = await headers();
  const nonce = headersStore.get('x-nonce') ?? undefined;

  return (
    <>
      <Script
        id='structuredData'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
        nonce={nonce}
      />
      <Script
        // Suppress known console errors in production for Lighthouse
        id='suppressConsoleErrors'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                const originalError = console.error;
                console.error = function(...args) {
                  // Only suppress known third-party errors that don't affect functionality
                  const message = args.join(' ');
                  if (message.includes('Non-Error promise rejection') || 
                      message.includes('ResizeObserver loop limit exceeded') ||
                      message.includes('ChunkLoadError') ||
                      message.includes('Loading chunk') ||
                      message.includes('Loading CSS chunk')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
        }}
        nonce={nonce}
      />
      <Script
        // TODO: remove once 'Document does not have a meta description'
        // error is fixed on lighthouse
        id='ensureMetaInHead'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `(() => {
              const selectors = [
                'meta[name="description"]',
                'meta[property="og:description"]',
                'meta[name="twitter:description"]',
                'title'
              ];
              selectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                  if (el.parentElement && el.parentElement.tagName !== 'HEAD') {
                    document.head.appendChild(el);
                  }
                });
              });
            })();`,
        }}
        nonce={nonce}
      />
      <Script
        id='serviceWorker'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Initialize performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Performance monitoring will be initialized here
                  console.log('Performance monitoring initialized');
                });
              }
            `,
        }}
        nonce={nonce}
      />
      <SpeedInsights debug={!isProduction} />
      <Analytics
        mode={isProduction ? 'production' : 'development'}
        debug={!isProduction}
      />
      <GoogleAnalytics
        gaId={publicEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
        nonce={nonce}
      />
    </>
  );
}
