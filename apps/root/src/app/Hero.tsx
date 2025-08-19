'use client';
import { Button } from '@/components/units/Button';
import Blob from './Blob';
import Container from '@/components/units/Container';
import { contactFormId } from './about/Contact/Form';
import { usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-transition-router';
import { profileData } from '@/utils/profileData';

export default function Hero() {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleGetInTouch = () => {
    if (pathname === '/about') {
      const form = document.getElementById(contactFormId);
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/about#${contactFormId}`);
    }
  };
  return (
    <div className="min-h-[50vh] flex flex-col relative w-full overflow-hidden flex items-center justify-center md:min-h-[80vh]">
      <div className="absolute -z-1 flex w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 justify-center items-center">
        <Blob />
      </div>
      <Container>
        <div className="max-w-[32rem] flex flex-col">
          <h2 className="text-left text-white">hello, I&apos;m</h2>
          <h1 className="text-shadow-md text-7xl w-full text-right tracking-wide text-white">
            {profileData.name}
          </h1>
          <p className="text-shadow-md text-center text-lg text-white">
            {profileData.tagline}
          </p>
          <Button
            className="max-w-max mt-4 self-center"
            onClick={handleGetInTouch}
          >
            contact me
          </Button>
        </div>
      </Container>
    </div>
  );
}
