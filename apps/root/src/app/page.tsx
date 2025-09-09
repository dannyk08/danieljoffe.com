import Achievements from './home/Achievements';
import Methodologies from './home/Methodologies';
import PreviousTeams from './home/PreviousTeams';
import Hero from './home/Hero';
import CTA from './home/CTA';
import type { Metadata } from 'next';
import { homeMetadata } from './home/metadata';

export const metadata: Metadata = homeMetadata;

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
