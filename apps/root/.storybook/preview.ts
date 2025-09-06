import '@/app/global.scss';
import '@/app/fonts';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

export const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    viewport: {
      value: 'iphone13pro',
      isRotated: false,
    },
  },
};

export default preview;
