import './global.scss';
import AppContext from './AppContext';
import { josefinSans, irn, firaMono } from './fonts';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { publicEnv } from '@/lib/public.env';
import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from '@/components/units/Button';

export const metadata: Metadata = {
  title: {
    default: 'Daniel Joffe - Full-Stack Engineer & Technical Leader',
    template: '%s | Daniel Joffe',
  },
  description:
    'Full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my portfolio, experience, and get in touch.',
  keywords: [
    'Daniel Joffe',
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
  authors: [{ name: 'Daniel Joffe' }],
  creator: 'Daniel Joffe',
  publisher: 'Daniel Joffe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://danieljoffe.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danieljoffe.com',
    title: 'Daniel Joffe - Full-Stack Engineer & Technical Leader',
    description:
      'Full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.',
    siteName: 'Daniel Joffe',
    images: [
      {
        url: '/images/daniel-joffe-profile.png',
        width: 800,
        height: 800,
        alt: 'Daniel Joffe - Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Joffe - Full-Stack Engineer & Technical Leader',
    description:
      'Full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.',
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
};

// Structured data for better SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel Joffe',
  jobTitle: 'Full-Stack Engineer',
  description:
    'Full-stack engineer with 8+ years of experience building scalable web applications',
  url: 'https://danieljoffe.com',
  sameAs: [
    'https://linkedin.com/in/danieljoffe',
    'https://github.com/danieljoffe',
    'https://twitter.com/danieljoffe',
  ],
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
    name: 'Full-Stack Engineer',
    description:
      'Building scalable web applications and optimizing infrastructure',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Self-employed / Contract Work',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-svg-gradient="theme-one"
      className={[
        josefinSans.variable,
        irn.variable,
        firaMono.variable,
        'scroll-smooth',
      ].join(' ')}
    >
      <head>
        <script
          type="application/ld+json"
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
        ].join(' ')}
      >
        <a
          href="#main-content"
          className={[
            buttonBaseStyles,
            buttonVariantStyles.primary,
            buttonSizeStyles.md,
            'sr-only focus:not-sr-only max-w-fit z-50',
          ].join(' ')}
        >
          Skip to main content
        </a>
        <AppContext>{children}</AppContext>
      </body>
      <GoogleAnalytics
        gaId={publicEnv.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
      />
    </html>
  );
}
