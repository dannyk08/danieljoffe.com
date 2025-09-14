import { DOMAIN_URL, FULL_NAME } from '@/utils/constants';

export const homeMetadata = {
  title: 'Full-Stack Engineer & Technical Leader',
  description: `${FULL_NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
  keywords: [
    FULL_NAME,
    'Full-Stack Engineer',
    'Portfolio',
    'Web Development',
    'React',
    'Angular',
    'JavaScript',
    'TypeScript',
    'Infrastructure',
    'Performance Optimization',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${FULL_NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${FULL_NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
    url: DOMAIN_URL,
  },
  twitter: {
    title: `${FULL_NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${FULL_NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
  },
};
