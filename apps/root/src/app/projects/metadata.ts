import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { Metadata } from 'next';
import { DOMAIN_URL, NAME } from '@/utils/constants';

export const projectsMetadata: Metadata = {
  title: 'Portfolio',
  description: `Explore ${NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries and technologies.`,
  keywords: [
    NAME,
    'Portfolio',
    'Projects',
    'Case Studies',
    'Technical Solutions',
    'Web Applications',
    'React Projects',
    'Angular Projects',
    'Full-Stack Development',
  ],
  alternates: {
    canonical: PROJECTS_LINK.href,
  },
  openGraph: {
    title: `${NAME} - Portfolio & Projects`,
    description: `Explore ${NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.`,
    url: `${DOMAIN_URL}${PROJECTS_LINK.href}`,
  },
  twitter: {
    title: `${NAME} - Portfolio & Projects`,
    description: `Explore ${NAME}'s portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.`,
  },
};
