import { ABOUT_LINK } from '@/components/assembled/Nav/Links';
import { DOMAIN_URL, FULL_NAME } from '@/utils/constants';
import { Metadata } from 'next';

export const aboutMetadata: Metadata = {
  title: `About ${FULL_NAME}`,
  description: `Learn about ${FULL_NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra. Get in touch to discuss opportunities.`,
  keywords: [
    FULL_NAME,
    'About',
    'Experience',
    'Career Timeline',
    'Professional Journey',
    'Full-Stack Engineer',
    'Software Engineer',
    'Contact',
    'Work History',
    'Professional Background',
    'Technical Skills',
    'Career Development',
  ],
  alternates: {
    canonical: ABOUT_LINK.href,
  },
  openGraph: {
    title: `About ${FULL_NAME} - Professional Journey & Experience`,
    description: `Learn about ${FULL_NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.`,
    url: `${DOMAIN_URL}${ABOUT_LINK.href}`,
    type: 'website',
    siteName: FULL_NAME,
  },
  twitter: {
    title: `About ${FULL_NAME} - Professional Journey & Experience`,
    description: `Learn about ${FULL_NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.`,
    card: 'summary_large_image',
    creator: '@danieljoffe',
  },
  icons: {
    other: [
      {
        url: '/images/daniel-joffe-profile.png',
        rel: 'preload',
        fetchPriority: 'high',
        media: '(max-width: 768px)',
        type: 'image/png',
      },
    ],
  },
};
