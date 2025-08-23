import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/thank-you/', '/api/'],
    },
    sitemap: 'https://danieljoffe.com/sitemap.xml',
  };
}
