'use client';
import { Button } from '@/components/units/Button';
import Container from '@/components/units/Container';
import { contactFormId } from './about/Contact/Form';
import { usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-transition-router';

export default function CTA() {
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
    <section
      className='bg-neutral-900 text-white'
      aria-labelledby='cta-heading'
    >
      <Container>
        <div className='flex flex-col max-w-[32rem] items-center self-center text-center gap-4'>
          <h2 id='cta-heading'>Let&apos;s Build Something Great Together</h2>
          <p>
            Ready to discuss how I can help drive your team&apos;s success?
            I&apos;m always excited to tackle new challenges and create
            meaningful impact.
          </p>
          <div className='flex gap-4'>
            <Button
              onClick={() => router.push('/work')}
              aria-label="View Daniel Joffe's work portfolio"
            >
              View my work
            </Button>
            <Button
              onClick={handleGetInTouch}
              aria-label='Get in touch with Daniel Joffe'
            >
              Get in touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
