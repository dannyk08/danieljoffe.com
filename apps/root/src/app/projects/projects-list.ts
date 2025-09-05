import { NavLink } from '@/components/assembled/Nav/Links';
import { UnsplashImageMeta } from '@/components/assembled/UnsplashImage';
import { Metadata } from 'next';

export const uiComponentsV1Slug = 'ui-components-v1' as const;
export const allowedPages = [uiComponentsV1Slug] as const;

export type AllowedPages = (typeof allowedPages)[number];
export type ProjectInfo = Pick<Metadata, 'description'> & {
  slug: string;
  backgroundColor: string;
  link: NavLink;
  cover: UnsplashImageMeta;
};
export type AllowedPagesRecord = Record<AllowedPages, ProjectInfo>;
