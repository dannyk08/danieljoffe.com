import { MetadataRoute } from 'next';
import { experience } from './about/experience/[slug]/workHistory';
import { ABOUT_LINK, PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { DOMAIN_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes = [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${DOMAIN_URL}${ABOUT_LINK.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}${PROJECTS_LINK.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic experience routes
  const experienceRoutes = Object.keys(experience).map(slug => ({
    url: `${DOMAIN_URL}${ABOUT_LINK.href}/experience/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...experienceRoutes];
}
