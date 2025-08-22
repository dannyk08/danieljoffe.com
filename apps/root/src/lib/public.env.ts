export enum PublicEnvVars {
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY = 'NEXT_PUBLIC_HCAPTCHA_SITE_KEY',
}

export const publicEnv: Record<PublicEnvVars, string | undefined> = {
  [PublicEnvVars.NEXT_PUBLIC_HCAPTCHA_SITE_KEY]:
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
};

function validatePublicEnv() {
  [PublicEnvVars.NEXT_PUBLIC_HCAPTCHA_SITE_KEY].forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`Missing required environment variable: ${varName}`);
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    }
  });
}

validatePublicEnv();
