'use client';

import { useEffect, useState } from 'react';
import { debounce } from '@/utils/helpers';

interface WindowSize {
  width: number;
  height: number;
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

  const [size, setSize] = useState<WindowSize>({
    width: _window.innerWidth,
    height: _window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: _window.innerWidth,
        height: _window.innerHeight,
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
