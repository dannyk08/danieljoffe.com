export enum PublicEnvVars {
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY = 'NEXT_PUBLIC_HCAPTCHA_SITE_KEY',
}

export const publicEnv: Record<PublicEnvVars, string | undefined> = {
  [PublicEnvVars.NEXT_PUBLIC_HCAPTCHA_SITE_KEY]:
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
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
