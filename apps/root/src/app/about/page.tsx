import Hero from './Hero';
import Mantra from './Mantra';
import Timeline from './Timeline';
import Contact from './Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Daniel Joffe',
  description: 'Learn about Daniel Joffe\'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra. Get in touch to discuss opportunities.',
  keywords: [
    'Daniel Joffe',
    'About',
    'Experience',
    'Career Timeline',
    'Professional Journey',
    'Full-Stack Engineer',
    'Software Engineer',
    'Contact'
  ],
  openGraph: {
    title: 'About Daniel Joffe - Professional Journey & Experience',
    description: 'Learn about Daniel Joffe\'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.',
    url: 'https://danieljoffe.com/about',
  },
  twitter: {
    title: 'About Daniel Joffe - Professional Journey & Experience',
    description: 'Learn about Daniel Joffe\'s journey as a full-stack engineer. Explore my professional experience, career timeline, and personal mantra.',
  },
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Timeline />
      <Mantra />
      <Contact />
    </div>
  );
}
