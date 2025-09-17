/**
 * @type {import('lighthouse').Config}
 */
const config = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/about/experience/winc',
        'http://localhost:3000/about/experience/professional-development',
        'http://localhost:3000/projects',
      ],
      startServerCommand: 'npx nx run @danieljoffe.com/root:start',
      startServerReadyPattern: 'ready - started server on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      // Ensure server is properly stopped after collection
      settings: {
        chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

module.exports = config;
