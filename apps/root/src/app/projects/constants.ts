import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { AllowedPages, ProjectInfo, uiComponentsV1Slug } from './projects-list';
import { UNSPLASH_URL } from '@/utils/constants';

export const pagesRecords: Record<AllowedPages, ProjectInfo> = {
  [uiComponentsV1Slug]: {
    slug: uiComponentsV1Slug,
    description:
      'Overview and documentation of foundational UI components in the src/components/units folder. Includes usage, design principles, accessibility, and best practices.',
    backgroundColor: 'bg-slate-900',
    link: {
      label: 'UI Components V1',
      href: `${PROJECTS_LINK.href}/${uiComponentsV1Slug}`,
    },
    cover: {
      alt: 'An image of a jellyfish in the dark',
      src: `/photo-1636576109679-6f23fdc040c8`,
      origin: `${UNSPLASH_URL}/photos/an-image-of-a-jellyfish-in-the-dark-4ckVcNeshmQ`,
      creator: '@and_machines',
      blurHash: 'L125+JD~D#-rn$WCkCj?D~xbxbNc',
    },
  },
};
