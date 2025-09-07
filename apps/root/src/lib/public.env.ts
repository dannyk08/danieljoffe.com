export enum PublicEnvVars {
  NEXT_PUBLIC_HCAPTCHA_SITE_ID = 'NEXT_PUBLIC_HCAPTCHA_SITE_ID',
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
  NEXT_PUBLIC_SENTRY_CONFIG_ID = 'NEXT_PUBLIC_SENTRY_CONFIG_ID',
}

export const publicEnv: Record<PublicEnvVars, string | undefined> = {
  [PublicEnvVars.NEXT_PUBLIC_HCAPTCHA_SITE_ID]:
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_ID,
  [PublicEnvVars.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID]:
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  [PublicEnvVars.NEXT_PUBLIC_SENTRY_CONFIG_ID]:
    process.env.NEXT_PUBLIC_SENTRY_CONFIG_ID,
};

export function validatePublicEnv() {
  Object.entries(PublicEnvVars).forEach(([varName, varValue]) => {
    if (varValue == null) {
      console.error(`Missing required environment variable: ${varName}`);
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}

validatePublicEnv();
