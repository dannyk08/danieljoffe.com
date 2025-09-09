import Hero from './Hero';
import Mantra from './Mantra';
import Timeline from './Timeline';
import Contact from './Contact';
import type { Metadata } from 'next';
import { aboutMetadata } from './metadata';

export const metadata: Metadata = aboutMetadata;

export default function About() {
  return (
    <>
      <Hero />
      <Timeline />
      <Mantra />
      <Contact />
    </>
  );
}
