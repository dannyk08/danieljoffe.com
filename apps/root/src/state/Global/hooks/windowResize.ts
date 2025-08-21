'use client';

import { useEffect, useState } from 'react';
import { debounce } from '@/utils/helpers';

export interface WindowSizeInterface {
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useDebouncedWindowResize() {
  const [size, setSize] = useState<WindowSizeInterface>({
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    windowHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet:
      typeof window !== 'undefined'
        ? window.innerWidth >= 768 && window.innerWidth < 1024
        : false,
    isDesktop:
      typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  });

  useEffect(() => {
    const _window =
      typeof window !== 'undefined'
        ? window
        : {
            innerWidth: 0,
            innerHeight: 0,
            addEventListener: () => void 0,
            removeEventListener: () => void 0,
          };

    const handleResize = debounce(() => {
      setSize({
        windowWidth: _window.innerWidth,
        windowHeight: _window.innerHeight,
        isMobile: _window.innerWidth < 768,
        isTablet: _window.innerWidth >= 768 && _window.innerWidth < 1024,
        isDesktop: _window.innerWidth >= 1024,
      });
    }, 300);

    _window.addEventListener('resize', handleResize);

    return () => {
      _window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  return size;
}
