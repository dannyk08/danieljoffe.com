import BreadCrumbs from '@/components/units/BreadCrumbs';
import { PROJECTS_LINK } from '@/components/assembled/Nav/Links';
import { pagesRecords } from '../constants';
import UnsplashImage from '@/components/assembled/UnsplashImage';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/${slug}.mdx`);
  const { link, cover } = pagesRecords[slug as keyof typeof pagesRecords];

  return (
    <div className='flex flex-col gap-4'>
      <BreadCrumbs items={[PROJECTS_LINK, link]} />
      <div className='flex flex-col gap-12'>
        <div className='overflow-hidden'>
          <UnsplashImage
            src={cover.src}
            alt={cover.alt}
            origin={cover.origin}
            creator={cover.creator}
            priority={true}
            fetchPriority='high'
          />
        </div>
        <div className='flex-1 flex flex-col items-center'>
          <div
            className={[
              'prose prose-headings:font-sans prose-headings:font-medium',
              'prose-base prose-body:font-serif w-full',
            ].join(' ')}
          >
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(pagesRecords).map(slug => ({ slug }));
}

export const dynamicParams = false;
