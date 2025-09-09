import { DOMAIN_URL, NAME } from '@/utils/constants';
import { uiComponentsV1Slug } from '../projects-list';
import { AllowedPages } from '../projects-list';
import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { Metadata } from 'next';
import { pagesRecords } from '../constants';

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
