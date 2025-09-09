import { Metadata } from 'next';
import { DOMAIN_URL, NAME } from '@/utils/constants';

export const rootMetadata: Metadata = {
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
