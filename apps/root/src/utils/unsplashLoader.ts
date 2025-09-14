import { ImageLoader } from 'next/image';
import { UNSPLASH_PHOTOS_URL } from './constants';

const landscapeRatio = 900 / 1600;
const unsplashLoader: ImageLoader = ({ src, width: widthParam, quality }) => {
  const width = widthParam ?? 800;
  const height = Math.floor(width * landscapeRatio);
  const url = new URL(UNSPLASH_PHOTOS_URL);

  url.pathname = src;
  url.searchParams.set('w', width.toString());
  url.searchParams.set('h', height.toString());
  url.searchParams.set('q', (quality ?? 85).toString());
  url.searchParams.set('auto', 'compress,format');
  url.searchParams.set('fit', 'clip');
  url.searchParams.set('dpr', '1');
  return url.toString();
};

export default unsplashLoader;
