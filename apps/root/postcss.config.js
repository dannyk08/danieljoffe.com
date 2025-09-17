// Note: If you use library-specific PostCSS/Tailwind configuration then you should remove the `postcssConfig` build
// option from your application's configuration (i.e. project.json).
//
// See: https://nx.dev/guides/using-tailwind-css-in-react#step-4:-applying-configuration-to-libraries

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    /** @type {import('@tailwindcss/postcss')} */
    '@tailwindcss/postcss': {
      // Enable CSS purging for production builds
      purge: isProduction,
      // Optimize CSS output
      optimize: isProduction ? { minify: true } : false,
      // Remove unused CSS
      removeUnusedCss: isProduction,
    },
    // Add autoprefixer for better browser compatibility
    autoprefixer: isProduction ? { remove: false } : false,
  },
};
