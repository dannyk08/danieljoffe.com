import { publicEnv, PublicEnvVars } from '@/lib/public.env';

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Generates a base64 data URL for placeholder images
 */
export const getBase64DataUrl = (
  rgbColor: `rgb(${number},${number},${number})`
): string => {
  const canvas =
    typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback for SSR
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="40" height="40" fill="${rgbColor}" />
      </svg>`
    ).toString('base64')}`;
  }

  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = rgbColor;
    ctx.fillRect(0, 0, 40, 40);
  }

  return canvas.toDataURL();
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const devLog = (message: string, ...args: unknown[]) => {
  if (isProduction()) return;
  if (typeof window !== 'undefined') {
    console.warn(`🔍 ${new Date().toISOString()} ${message}`, ...args);
  }
};

// ============================================================================
// ENVIRONMENT UTILITIES
// ============================================================================

export const isProduction = () => {
  return publicEnv[PublicEnvVars.NEXT_PUBLIC_NODE_ENV] === 'production';
};
