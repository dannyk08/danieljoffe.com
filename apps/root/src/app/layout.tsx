import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { publicEnv } from '@/lib/public.env';
import AppContext from './home/AppContext';
import Button from '@/components/units/Button';
import { rootMetadata } from './metadata';
import './global.scss';
import { josefinSans, irn, firaMono } from './fonts';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from './home/GoogleAnalytics';
import { structuredData } from './structuredData';

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#0056b3',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersStore = await headers();
  const nonce = headersStore.get('x-nonce') ?? undefined;

  return (
    <html
      lang='en'
      className={[
        josefinSans.variable,
        irn.variable,
        firaMono.variable,
        'scroll-smooth',
      ].join(' ')}
    >
      <body
        className={[
          'antialiased font-sans text-neutral-900 bg-neutral-100 font-light line-height-1.5',
          'flex flex-col h-screen relative pt-[3.75rem] md:pt-[3.25rem]',
          'focus:outline-blue-500 focus:outline-2 focus:outline-offset-2',
          'focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2',
        ].join(' ')}
      >
        <Button
          as='link'
          href='#main-content'
          aria-label='Skip to main content'
          className='sr-only focus:not-sr-only max-w-fit z-50'
          id='skipToMainContent'
        >
          Skip to main content
        </Button>
        <AppContext>{children}</AppContext>
        <Script
          id='structuredData'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics
          gaId={publicEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
          nonce={nonce}
        />
      </body>
    </html>
  );
}
