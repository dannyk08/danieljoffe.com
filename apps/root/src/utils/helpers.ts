import { KEYS_STR, UNSPLASH_PHOTOS_URL } from './constants';

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const triplet = (e1: number, e2: number, e3: number): string =>
  KEYS_STR.charAt(e1 >> 2) +
  KEYS_STR.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  KEYS_STR.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  KEYS_STR.charAt(e3 & 63);

export const getBase64DataUrl = (red: number, green: number, blue: number) =>
  [
    'data:image/gif;base64,R0lGODlhAQABAPAA',
    triplet(0, red, green),
    triplet(blue, 255, 255),
    '/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
  ].join('');

export const debounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeoutId: number | undefined = undefined;

  const debouncedFn = (...args: Parameters<T>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };

  debouncedFn.cancel = () => {
    window.clearTimeout(timeoutId);
  };

  return debouncedFn;
};

export const getUnsplashImage = (id: `/photo-${string}`) => {
  return new URL(`${UNSPLASH_PHOTOS_URL}${id}`).toString();
};
