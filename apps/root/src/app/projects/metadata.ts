import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { Metadata } from 'next';
import { AllowedPages, uiComponentsV1Slug } from './projects-list';
import { pagesRecords } from './constants';
import { DOMAIN_URL, NAME } from '@/utils/constants';

export const rootMetadata: Metadata = {
  title: `${NAME} - Projects`,
  description: `Explore ${NAME}'s projects. View case studies, technical implementations, and solutions delivered across various industries and technologies.`,
  keywords: [
    NAME,
    'Projects',
    'Portfolio',
    'Web Development',
    'React',
    'Angular',
  ],
  alternates: {
    canonical: PROJECTS_LINK.href,
  },
  openGraph: {
    title: `${NAME} - Projects`,
    description: `Explore ${NAME}'s projects. View case studies, technical implementations, and solutions delivered across various industries and technologies.`,
  },
};

export const projectMetadata: Record<AllowedPages, Metadata> = {
  [uiComponentsV1Slug]: {
    title: 'Project | UI Components V1',
    description: pagesRecords[uiComponentsV1Slug].description,
    keywords: [
      'ui',
      'components',
      'design system',
      'accessibility',
      'react',
      'typescript',
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
      canonical: `${PROJECTS_LINK.href}/${uiComponentsV1Slug}`,
    },
    openGraph: {
      images: [
        {
          url: pagesRecords[uiComponentsV1Slug].cover.src,
          width: 4042,
          height: 2695,
          alt: 'UI Components V1',
        },
      ],
    },
    twitter: {
      images: [
        pagesRecords[uiComponentsV1Slug].cover.src,
        {
          url: pagesRecords[uiComponentsV1Slug].cover.src,
          width: 4042,
          height: 2695,
          alt: 'UI Components V1',
        },
      ],
      title: 'Project | UI Components V1',
      description: pagesRecords[uiComponentsV1Slug].description as string,
    },
  },
};
