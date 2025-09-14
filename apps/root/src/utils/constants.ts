export const DOMAIN_URL = 'https://danieljoffe.com';
export const LINKEDIN_URL = 'https://www.linkedin.com';
export const GITHUB_URL = 'https://github.com';
export const UNSPLASH_URL = 'https://unsplash.com';
export const UNSPLASH_PHOTOS_URL = 'https://images.unsplash.com';
export const GOOGLE_DOCS_URL = 'https://docs.google.com';
export const EXAMPLE_URL = 'https://example.com';
export const GOOGLE_ANALYTICS_URL = 'https://www.google-analytics.com';
export const GOOGLE_TAG_MANAGER_URL = 'https://www.googletagmanager.com';
export const SENTRY_URL = 'https://www.sentry.io';
export const SCHEMA_ORG_URL = 'https://schema.org';
export const HCAPTCHA_URL = 'https://www.hcaptcha.com';

export const FULL_NAME = 'Daniel Joffe';
export const JOB_TITLE = 'Senior Software Engineer';
export const EMAIL_ADDRESS = 'hello@danieljoffe.com';
export const LINKEDIN_PROFILE_URL = `${LINKEDIN_URL}/in/dannyk08`;
export const GITHUB_PROFILE_URL = `${GITHUB_URL}/dannyk08`;
export const RESUME_URL = `${GOOGLE_DOCS_URL}/document/d/1v4IB1-XA_-h-wq5HLgzH8_dFzMbOm-PaqOwom8k5_i4/export?format=pdf&portrait=true`;

export const allowedImageOrigins = [
  UNSPLASH_URL,
  UNSPLASH_PHOTOS_URL,
  GOOGLE_DOCS_URL,
  EXAMPLE_URL,
  GOOGLE_ANALYTICS_URL,
  GOOGLE_TAG_MANAGER_URL,
];

export const allowedOrigins = [
  ...allowedImageOrigins,
  DOMAIN_URL,
  SENTRY_URL,
  SCHEMA_ORG_URL,
  HCAPTCHA_URL,
];
