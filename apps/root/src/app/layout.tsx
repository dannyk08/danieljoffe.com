import './global.scss';
import AppContext from './AppContext';
import { josefinSans, irn, firaMono } from './fonts';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
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

export const metadata: Metadata = {
  title: {
    default: `${NAME} - Full-Stack Engineer & Technical Leader`,
    template: `%s | ${NAME}`,
  },
  description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my portfolio, experience, and get in touch.`,
  keywords: [
    NAME,
    'Full-Stack Engineer',
    'Software Engineer',
    'React Developer',
    'Angular Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Development',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Infrastructure',
    'Performance Optimization',
    'Technical Leadership',
    'Portfolio',
  ],
  authors: [{ name: NAME }],
  creator: NAME,
  publisher: NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(DOMAIN_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: DOMAIN_URL,
    title: `${NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.`,
    siteName: NAME,
    images: [
      {
        url: '/images/daniel-joffe-profile.png',
        width: 800,
        height: 800,
        alt: `${NAME} - Full-Stack Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.`,
    images: ['/images/daniel-joffe-profile.png'],
    creator: '@danieljoffe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/mstile-150x150.png', sizes: '150x150', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [{ rel: 'icon', url: '/favicon.ico' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#0056b3',
    'msapplication-TileColor': '#0056b3',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': DOMAIN_URL,
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <script
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
        <script
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
