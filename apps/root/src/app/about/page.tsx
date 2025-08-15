import Hero from './Hero';
import Mantra from './Mantra';
import Timeline from './Timeline';
import Contact from './Contact';

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
