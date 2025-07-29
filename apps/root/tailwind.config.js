const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      blue: {
        100: '#e3f0ff',
        200: '#aad3ff',
        300: '#71b6ff',
        400: '#3998ff',
        500: '#007bff',
        600: '#0060c6',
        700: '#00448e',
        800: '#002955',
        900: '#000e1c',
      },
      rose: {
        100: '#fee4ec',
        200: '#fbaec5',
        300: '#f9779f',
        400: '#f74179',
        500: '#f40b53',
        600: '#be0840',
        700: '#88062e',
        800: '#51041b',
        900: '#1b0109',
      },
      neutral: {
        100: '#f1f1f1',
        200: '#d4d4d4',
        300: '#b8b8b8',
        400: '#9c9c9c',
        500: '#808080',
        600: '#636363',
        700: '#474747',
        800: '#2a2a2a',
        900: '#0e0e0e',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0,-10px,0)' },
          '70%': { transform: 'translate3d(0,-5px,0)' },
          '90%': { transform: 'translate3d(0,-2px,0)' },
        },
      },
    },
  },
  plugins: [],
};
