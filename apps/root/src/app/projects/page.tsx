import Container from '@/components/units/Container';
import { Metadata } from 'next';
import WorkItem from './Item';
import { Link } from 'next-transition-router';
import { pagesRecords } from './constants';
import { projectsMetadata } from './metadata';
import UnsplashImage from '@/components/assembled/UnsplashImage';
const projectsList = Object.values(pagesRecords);

export const metadata: Metadata = projectsMetadata;

export default function Projects() {
  return (
    <Container>
      <div className='flex flex-col gap-4'>
        <header>
          <h1>Projects</h1>
          <p>
            Explore my portfolio of web applications and technical solutions.
          </p>
        </header>
        <section aria-labelledby='projects-heading'>
          <h2 id='projects-heading' className='sr-only'>
            Project Portfolio
          </h2>
          <div
            className={[
              'grid grid-cols-1 md:grid-cols-2 md:grid-rows-2',
              'text-white max-w-[30rem] mx-auto md:max-w-full',
            ].join(' ')}
            aria-label='Project portfolio'
          >
            {projectsList.map(
              ({ slug, link, description, cover, backgroundColor }) => (
                <article key={slug} className='flex flex-col'>
                  <UnsplashImage
                    src={cover.src}
                    alt={cover.alt}
                    origin={cover.origin}
                    creator={cover.creator}
                    priority={true}
                    fetchPriority='high'
                    blurHash={cover.blurHash}
                    width={400}
                    height={225}
                  />
                  <Link
                    href={link.href}
                    className={[
                      'row-span-1 col-span-1',
                      backgroundColor,
                      'overflow-hidden',
                      'shadow-lg',
                    ].join(' ')}
                    aria-label={`View ${link.label} project details`}
                  >
                    <WorkItem
                      name={link.label as string}
                      description={description as string}
                    />
                  </Link>
                </article>
              )
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}
