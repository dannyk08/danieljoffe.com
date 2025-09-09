import { ABOUT_LINK } from '@/components/assembled/Nav/Links';
import { DOMAIN_URL, NAME } from '@/utils/constants';
import { Metadata } from 'next';

export const aboutMetadata: Metadata = {
  title: `About ${NAME}`,
  description: `Learn about ${NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra. Get in touch to discuss opportunities.`,
  keywords: [
    NAME,
    'About',
    'Experience',
    'Career Timeline',
    'Professional Journey',
    'Full-Stack Engineer',
    'Software Engineer',
    'Contact',
  ],
  alternates: {
    canonical: ABOUT_LINK.href,
  },
  openGraph: {
    title: `About ${NAME} - Professional Journey & Experience`,
    description: `Learn about ${NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.`,
    url: `${DOMAIN_URL}${ABOUT_LINK.href}`,
  },
  twitter: {
    title: `About ${NAME} - Professional Journey & Experience`,
    description: `Learn about ${NAME}'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.`,
  },
};
