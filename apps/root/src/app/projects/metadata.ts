import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { Metadata } from 'next';
import { DOMAIN_URL, FULL_NAME } from '@/utils/constants';

export const projectsMetadata: Metadata = {
  title: 'Portfolio',
  description: `Explore ${FULL_NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries and technologies.`,
  keywords: [
    FULL_NAME,
    'Portfolio',
    'Projects',
    'Case Studies',
    'Technical Solutions',
    'Web Applications',
    'React Projects',
    'Angular Projects',
    'Full-Stack Development',
    'Software Development',
    'Web Development',
    'Technical Implementation',
    'Project Showcase',
    'Code Examples',
  ],
  alternates: {
    canonical: PROJECTS_LINK.href,
  },
  openGraph: {
    title: `${FULL_NAME} - Portfolio & Projects`,
    description: `Explore ${FULL_NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.`,
    url: `${DOMAIN_URL}${PROJECTS_LINK.href}`,
    type: 'website',
    siteName: FULL_NAME,
  },
  twitter: {
    title: `${FULL_NAME} - Portfolio & Projects`,
    description: `Explore ${FULL_NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.`,
    card: 'summary_large_image',
    creator: '@danieljoffe',
  },
};
