import {
  LINKEDIN_PROFILE_URL,
  DOMAIN_URL,
  JOB_TITLE,
  FULL_NAME,
  GITHUB_PROFILE_URL,
} from '@/utils/constants';

// Structured data for better SEO
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: FULL_NAME,
  jobTitle: JOB_TITLE,
  description: `${FULL_NAME} is a full-stack engineer with 8+ years of experience building scalable web applications`,
  url: DOMAIN_URL,
  sameAs: [LINKEDIN_PROFILE_URL, GITHUB_PROFILE_URL],
  knowsAbout: [
    'React',
    'Angular',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Web Development',
    'Infrastructure',
    'Performance Optimization',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: JOB_TITLE,
    description: `${FULL_NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.`,
  },
  worksFor: {
    '@type': 'Organization',
    name: `${FULL_NAME} - Self-employed / Contract Work`,
  },
};
