import { UNSPLASH_PHOTOS_URL, UNSPLASH_URL } from '@/utils/constants';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

export type UnsplashImageMeta = {
  alt: string;
  src: `${typeof UNSPLASH_PHOTOS_URL}/photo-${string}`;
  origin: `${typeof UNSPLASH_URL}/photos${string}`;
  creator: `@${string}`;
};

export type UnsplashImageProps = UnsplashImageMeta & {
  priority: boolean;
  fetchPriority: 'high' | 'low';
  width?: number;
  height?: number;
  fill?: boolean;
};

export default function UnsplashImage({
  src,
  alt,
  creator,
  origin,
  width,
  height,
  priority,
  fetchPriority,
  fill = true,
}: UnsplashImageProps) {
  if (!src || !alt || !creator || !origin) {
    throw new Error('Missing required props');
  }

  if (fill == false && (!width || !height)) {
    throw new Error('Missing required props');
  }

  const imageProps: ImageProps = {
    src,
    alt,
    priority,
    fetchPriority,
    fill,
    className: 'object-cover',
    sizes:
      '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 1024px, 1024px',
  };

  if (fill == false || (width && height)) {
    imageProps.width = width as number;
    imageProps.height = height as number;
  }

  return (
    <div className='w-full h-48 sm:h-64 md:h-80 lg:h-96 relative'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent flex justify-end'>
        <p className='text-white text-sm flex items-end gap-1 md:flex-col'>
          <Link
            href={`${UNSPLASH_URL}/${creator}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
            aria-label={`Photo by ${creator} on Unsplash`}
          >
            Photo by {creator},
          </Link>
          <Link
            href={origin}
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            on Unsplash
          </Link>
        </p>
      </div>
    </div>
  );
}
