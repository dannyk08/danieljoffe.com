import { ImageLoader } from 'next/image';
import { UNSPLASH_PHOTOS_URL } from './constants';

// Custom loader that can accept height parameter
const unsplashLoader = (targetHeight?: number): ImageLoader => {
  return ({ src, width: widthParam, quality }) => {
    const width = widthParam ?? 800;
    const height = targetHeight ?? Math.floor(width * (9 / 16));
    const url = new URL(UNSPLASH_PHOTOS_URL);

    url.pathname = src;
    url.searchParams.set('w', width.toString());
    url.searchParams.set('h', height.toString());
    url.searchParams.set('q', (quality ?? 90).toString());
    url.searchParams.set('auto', 'compress,format');
    url.searchParams.set('fit', 'clip');

    return url.toString();
  };
};

export default unsplashLoader;
