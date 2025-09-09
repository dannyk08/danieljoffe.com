import './global.scss';
import AppContext from './home/AppContext';
import { josefinSans, irn, firaMono } from './fonts';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from './home/GoogleAnalytics';
import { publicEnv } from '@/lib/public.env';
import Button from '@/components/units/Button';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  DOMAIN_URL,
  GITHUB_URL,
  JOB_TITLE,
  LINKEDIN_URL,
  NAME,
} from '@/utils/constants';
import { rootMetadata } from './metadata';
import Script from 'next/script';

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#0056b3',
};
// Structured data for better SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  jobTitle: JOB_TITLE,
  description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications`,
  url: DOMAIN_URL,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
  knowsAbout: [
    'React',
    'Angular',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Web Development',
    'Infrastructure',
    'Performance Optimization',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: JOB_TITLE,
    description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.`,
  },
  worksFor: {
    '@type': 'Organization',
    name: `${NAME} - Self-employed / Contract Work`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      data-svg-gradient='theme-one'
      className={[
        josefinSans.variable,
        irn.variable,
        firaMono.variable,
        'scroll-smooth',
      ].join(' ')}
    >
      <head>
        <Script
          id='structuredData'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
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
        >
          Skip to main content
        </Button>
        <AppContext>{children}</AppContext>
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
        />
      </body>
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics
        gaId={publicEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
      />
    </html>
  );
}
