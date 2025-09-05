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
import { timeline } from '@/app/about/Timeline/timeline';
import { ABOUT_LINK } from '@/components/assembled/Nav/Links';
import { DOMAIN_URL, NAME } from '@/utils/constants';
import UnsplashImage from '@/components/assembled/UnsplashImage';

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
      NAME,
      item.company,
      item.role,
      'Experience',
      'Work History',
      'Professional Experience',
      'Software Engineer',
      'Full-Stack Engineer',
    ],
    openGraph: {
      title: `${item.role} at ${item.company} - ${NAME}`,
      description: `${item.description} ${item.challenge[0]?.substring(
        0,
        100
      )}...`,
      siteName: NAME,
      url: [DOMAIN_URL, ABOUT_LINK.href, `/experience/${slug}`].join(''),
      images: [
        {
          url: item.cover.src,
          width: 800,
          height: 400,
          alt: item.cover.alt,
        },
      ],
    },
    alternates: {
      canonical: `${ABOUT_LINK.href}/experience/${slug}`,
    },
    twitter: {
      title: `${item.role} at ${item.company} - ${NAME}`,
      description: `${item.description} ${item.challenge[0]?.substring(
        0,
        100
      )}...`,
      images: [item.cover.src],
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
    return redirect(ABOUT_LINK.href);
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
      name: NAME,
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
      <UnsplashImage
        src={item.cover.src}
        alt={item.cover.alt}
        creator={item.cover.creator}
        origin={item.cover.origin}
        priority={true}
        fetchPriority='high'
      />
      <Container>
        <article className='flex flex-col gap-4'>
          <header className='flex flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center justify-center bg-neutral-200 rounded-full p-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'>
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                width={96}
                height={96}
                priority={true}
                fetchPriority='high'
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
                href={`${ABOUT_LINK.href}?scrollTo=${timeline.id}`}
                className={[
                  buttonBaseStyles,
                  buttonVariantStyles.primary,
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
