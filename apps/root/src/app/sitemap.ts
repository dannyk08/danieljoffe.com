import { MetadataRoute } from 'next';
import { experience } from './about/experience/[slug]/experience';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://danieljoffe.com';
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic experience routes
  const experienceRoutes = Object.keys(experience).map((slug) => ({
    url: `${baseUrl}/about/experience/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...experienceRoutes];
}
