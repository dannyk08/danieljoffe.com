'use client';
import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from '@/components/units/Button';
import Blob from './Blob';
import Container from '@/components/units/Container';
import { contactFormId } from './about/Contact/Form';
import { Link } from 'next-transition-router';
import { profileData } from '@/utils/profileData';

export default function Hero() {
  return (
    <section
      className='min-h-[50vh] flex flex-col w-full overflow-hidden flex items-center justify-center md:min-h-[80vh]'
      aria-labelledby='hero-heading'
    >
      <div className='flex relative w-full h-0 top-[30%]'>
        <div className='absolute -z-1 flex w-dvw h-dvh top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center'>
          <Blob />
        </div>
      </div>

      <Container>
        <div className='max-w-[32rem] flex flex-col'>
          <h2 className='text-left text-white'>hello, I&apos;m</h2>
          <h1
            id='hero-heading'
            className='text-shadow-lg text-7xl w-full text-right tracking-wide text-white'
          >
            {profileData.name}
          </h1>
          <p className='text-shadow-lg text-center text-lg text-white'>
            {profileData.tagline}
          </p>
          <div className='flex justify-center mt-4'>
            <Link
              className={[
                buttonBaseStyles,
                buttonVariantStyles.secondary,
                buttonSizeStyles.md,
              ].join(' ')}
              href={`/about?scrollTo=${contactFormId}`}
              aria-label='Get in touch with Daniel Joffe'
            >
              contact me
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
