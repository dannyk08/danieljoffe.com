declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    dataLayer?: Object[] | undefined;
    [key: string]: unknown;
  }
}

export type GAParams = {
  gaId: string;
  dataLayerName?: string;
  debugMode?: boolean;
  nonce?: string;
};
