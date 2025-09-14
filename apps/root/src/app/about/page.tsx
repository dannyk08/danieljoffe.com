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
      <section aria-labelledby='timeline-heading'>
        <Timeline />
      </section>
      <section aria-labelledby='mantra-heading'>
        <Mantra />
      </section>
      <section aria-labelledby='contact-heading'>
        <Contact />
      </section>
    </>
  );
}
