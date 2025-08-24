import Achievements from './Achievements';
import Methodologies from './Methodologies';
import PreviousTeams from './PreviousTeams';
import Hero from './Hero';
import CTA from './CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full-Stack Engineer & Technical Leader',
  description:
    'Daniel Joffe is a full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization. View my achievements, methodologies, and previous work.',
  keywords: [
    'Daniel Joffe',
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
  openGraph: {
    title: 'Daniel Joffe - Full-Stack Engineer & Technical Leader',
    description:
      'Full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.',
    url: 'https://danieljoffe.com',
  },
  twitter: {
    title: 'Daniel Joffe - Full-Stack Engineer & Technical Leader',
    description:
      'Full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Angular, and infrastructure optimization.',
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
