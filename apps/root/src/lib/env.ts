type DefaultEnvVars = 'NODE_ENV';

export enum RequiredEnvVars {
  VALIDKIT_API_KEY = 'VALIDKIT_API_KEY',
  WEB3FORMS_ACCESS_KEY = 'WEB3FORMS_ACCESS_KEY',
  VALIDKIT_API_URL = 'VALIDKIT_API_URL',
  WEB3FORMS_API_URL = 'WEB3FORMS_API_URL',
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY = 'NEXT_PUBLIC_HCAPTCHA_SITE_KEY',
}

export const env: Record<RequiredEnvVars | DefaultEnvVars, string | undefined> =
  Object.freeze({
    [RequiredEnvVars.VALIDKIT_API_KEY]: process.env.VALIDKIT_API_KEY,
    [RequiredEnvVars.WEB3FORMS_ACCESS_KEY]: process.env.WEB3FORMS_ACCESS_KEY,
    [RequiredEnvVars.VALIDKIT_API_URL]: process.env.VALIDKIT_API_URL,
    [RequiredEnvVars.WEB3FORMS_API_URL]: process.env.WEB3FORMS_API_URL,
    [RequiredEnvVars.NEXT_PUBLIC_HCAPTCHA_SITE_KEY]:
      process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });

export function validateEnv() {
  for (const varName of Object.values(RequiredEnvVars)) {
    if (!env[varName as keyof typeof env]) {
      console.error(`Missing required environment variable: ${varName}`);
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    }
  }
}

validateEnv();
