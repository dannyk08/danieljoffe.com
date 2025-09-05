import Achievements from './Achievements';
import Methodologies from './Methodologies';
import PreviousTeams from './PreviousTeams';
import Hero from './Hero';
import CTA from './CTA';
import type { Metadata } from 'next';
import { DOMAIN_URL, NAME } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Full-Stack Engineer & Technical Leader',
  description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
  keywords: [
    NAME,
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
    title: `${NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
    url: DOMAIN_URL,
  },
  twitter: {
    title: `${NAME} - Full-Stack Engineer & Technical Leader`,
    description: `${NAME} is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.`,
  },
};

export default function Index() {
  return (
    <>
      <Hero />
      <PreviousTeams />
      <Achievements />
      <Methodologies />
      <CTA />
    </>
  );
}
