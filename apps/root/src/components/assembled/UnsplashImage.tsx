'use client';
import { UNSPLASH_URL } from '@/utils/constants';
import { ImageProps } from 'next/image';
import Button from '@/components/units/Button';
import { Blurhash } from 'react-blurhash';
import Image from 'next/image';
import unsplashLoader from '@/utils/unsplashLoader';
import useViewport from '@/hooks/inViewport';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGlobal } from '@/state/Global/Context';

export type UnsplashImageMeta = {
  alt: string;
  src: `/photo-${string}`;
  origin: `${typeof UNSPLASH_URL}/photos${string}`;
  creator: `@${string}`;
  blurHash: string;
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
  fill = false,
  blurHash,
}: UnsplashImageProps) {
  const [imageWidth, setImageWidth] = useState(Math.min(width ?? 800, 800));
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInViewport = useViewport<HTMLElement | null>(ref);
  const { windowWidth } = useGlobal();

  if (!src || !alt || !creator || !origin) {
    throw new Error('Missing required props');
  }

  if (fill == false && (!width || !height)) {
    throw new Error('Missing required props');
  }

  const onLoad = useCallback(() => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 750);
  }, []);

  useEffect(() => {
    setImageWidth(Math.min(windowWidth, 1024));
  }, [windowWidth]);

  const imageClasses = [
    'object-cover',
    imageLoaded ? 'opacity-100' : 'opacity-0',
  ];
  const imageProps: ImageProps = {
    onLoad,
    loader: unsplashLoader,
    src,
    alt,
    priority,
    fetchPriority,
    fill,
    sizes:
      '(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1024px',
  };

  if (fill == false || (width && height)) {
    imageClasses.push('w-full h-auto');
    imageProps.width = imageWidth as number;
    imageProps.height = height as number;
  }

  imageProps.className = imageClasses.join(' ');

  const placeholder = useMemo(() => {
    if (imageLoaded || !blurHash) return null;

    return (
      <div className='absolute inset-0 overflow-hidden'>
        <div className='relative w-full h-full'>
          <Blurhash
            hash={blurHash ?? ''}
            className='w-full h-full overflow-hidden'
            width='100%'
            height='100%'
          />
        </div>
      </div>
    );
  }, [imageLoaded, blurHash]);

  return (
    <div
      className='w-full h-48 sm:h-64 md:h-80 lg:h-96 flex relative'
      ref={ref}
    >
      {placeholder}
      {isInViewport && <Image {...imageProps} alt={alt} />}
      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent flex justify-end'>
        <p className='text-white text-sm flex items-end gap-1 md:flex-col'>
          <Button
            as='link'
            variant='link'
            size='sm'
            href={`${UNSPLASH_URL}/${creator}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Photo by ${creator} on Unsplash`}
          >
            Photo by {creator},
          </Button>
          <Button
            as='link'
            variant='link'
            size='sm'
            href={origin}
            target='_blank'
            rel='noopener noreferrer'
          >
            on Unsplash
          </Button>
        </p>
      </div>
    </div>
  );
}
