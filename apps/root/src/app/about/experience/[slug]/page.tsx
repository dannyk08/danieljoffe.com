import Container from '@/components/units/Container';
import { experience } from './experience';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from '@/components/units/Button';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = experience[slug as keyof typeof experience];

  if (!item) {
    return {
      title: 'Experience Not Found',
      description: 'The requested experience page could not be found.',
    };
  }

  return {
    title: `${item.role} at ${item.company}`,
    description: `${item.description} ${item.challenge[0]?.substring(
      0,
      100
    )}...`,
    keywords: [
      'Daniel Joffe',
      item.company,
      item.role,
      'Experience',
      'Work History',
      'Professional Experience',
      'Software Engineer',
      'Full-Stack Engineer',
    ],
    openGraph: {
      title: `${item.role} at ${item.company} - Daniel Joffe`,
      description: `${item.description} ${item.challenge[0]?.substring(
        0,
        100
      )}...`,
      url: `https://danieljoffe.com/about/experience/${slug}`,
      images: [
        {
          url: item.cover.image,
          width: 800,
          height: 400,
          alt: item.cover.imageAlt,
        },
      ],
    },
    alternates: {
      canonical: `/about/experience/${slug}`,
    },
    twitter: {
      title: `${item.role} at ${item.company} - Daniel Joffe`,
      description: `${item.description} ${item.challenge[0]?.substring(
        0,
        100
      )}...`,
      images: [item.cover.image],
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = experience[slug as keyof typeof experience];

  if (!item) {
    return redirect('/about');
  }

  // Structured data for work experience
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: item.role,
    companyName: item.company,
    description: item.description,
    datePosted: item.year,
    employmentType: 'Full-time',
    jobLocation: {
      '@type': 'Place',
      addressCountry: 'US',
    },
    applicant: {
      '@type': 'Person',
      name: 'Daniel Joffe',
      jobTitle: 'Full-Stack Engineer',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className='w-full h-48 sm:h-64 md:h-80 lg:h-96 relative'>
        <Image
          src={item.cover.image}
          alt={item.cover.imageAlt}
          fill
          className='object-cover'
          priority={true}
          fetchPriority='high'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
        />
        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent flex justify-end'>
          <p className='text-white text-sm flex items-end gap-1 md:flex-col'>
            <Link
              href={`https://unsplash.com/${item.cover.creator}`}
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
              aria-label={`Photo by ${item.cover.creator} on Unsplash`}
            >
              Photo by {item.cover.creator},
            </Link>
            <Link
              href={item.cover.origin}
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              on Unsplash
            </Link>
          </p>
        </div>
      </div>
      <Container>
        <article className='flex flex-col gap-4'>
          <header className='flex flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center justify-center bg-neutral-200 rounded-full p-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'>
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                fill
                className='object-contain p-2'
                sizes='(max-width: 640px) 4rem, (max-width: 768px) 5rem, 6rem'
              />
            </div>
            <div className='flex flex-col gap-2 text-center md:text-left'>
              <h1 className='h2 m-0'>{item?.company}</h1>
              <h2 className='m-0 flex-1 h4'>{item.year}</h2>
              <h3 className='m-0 h5'>{item.role}</h3>
            </div>
          </header>
          <div className='flex flex-col gap-4 h-full'>
            <section>
              <h3 className='h5'>The Context</h3>
              <p>{item.description}</p>
            </section>
            <section>
              <h3 className='h5'>The Challenge</h3>
              <p> {item.challenge}</p>
            </section>
            <section>
              <h3 className='h5'>The Solution</h3>
              <p> {item.solution}</p>
            </section>
            <section>
              <h3 className='h5'>The Impact</h3>
              <p> {item.impact}</p>
            </section>
            <section>
              <h3 className='h5'>Lessons Learned</h3>
              <p> {item.learned}</p>
            </section>

            <div className='flex justify-center'>
              <Link
                href='/about'
                className={[
                  buttonBaseStyles,
                  buttonVariantStyles.secondary,
                  buttonSizeStyles.sm,
                ].join(' ')}
                aria-label='Back to timeline'
              >
                Back to Timeline
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}
