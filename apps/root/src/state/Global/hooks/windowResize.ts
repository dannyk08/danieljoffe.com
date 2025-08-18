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
  const _window =
    typeof window !== 'undefined'
      ? window
      : {
          innerWidth: 0,
          innerHeight: 0,
          addEventListener: () => void 0,
          removeEventListener: () => void 0,
        };

  const [size, setSize] = useState<WindowSizeInterface>({
    windowWidth: _window.innerWidth,
    windowHeight: _window.innerHeight,
    isMobile: _window.innerWidth < 768,
    isTablet: _window.innerWidth >= 768 && _window.innerWidth < 1024,
    isDesktop: _window.innerWidth >= 1024,
  });

  useEffect(() => {
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
