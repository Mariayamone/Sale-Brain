/**
 * Browser-compatible unique shop identifier generation.
 * Uses Web Crypto API for secure random values.
 */
export function generateShopId(): string {
  const array = new Uint8Array(12);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function buildShopPublicUrl(shopId: string): string {
  // Use window.location.origin as a fallback for the base URL in a browser environment
  const base = window.location.origin;
  return `${base}/shop/${shopId}`;
}
