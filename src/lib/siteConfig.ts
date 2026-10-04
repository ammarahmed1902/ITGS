export interface SiteConfig {
  origin: string;
  production: boolean;
  shareImage?: string;
  shareImageWidth?: number;
  shareImageHeight?: number;
  analyticsEndpoint?: string;
  monitoringEndpoint?: string;
  privacyUrl?: string;
  bookingUrl: string;
}

export function parseSiteConfig(env: Record<string, string | undefined>): SiteConfig {
  const production = env.SITE_ENV === 'production' || env.VERCEL_ENV === 'production';
  if (production && !env.SITE_URL) throw new Error('Production requires the approved SITE_URL.');
  const url = new URL(env.SITE_URL || 'http://localhost:4173');
  if (url.pathname !== '/' || url.search || url.hash || url.username || url.password || !['http:', 'https:'].includes(url.protocol)) throw new Error('SITE_URL must be an origin, without a path or credentials.');
  if (production && (url.protocol !== 'https:' || /localhost|example\.|APPROVED|YOUR_/i.test(url.hostname))) throw new Error('Production requires an approved HTTPS origin.');
  function optionalUrl(value: string | undefined) {
    if (!value) return undefined;
    const parsed = new URL(value, url.origin);
    if (parsed.protocol !== 'https:' && parsed.origin !== url.origin) throw new Error('Public endpoints must use HTTPS.');
    if (parsed.username || parsed.password) throw new Error('Public URLs cannot contain credentials.');
    return parsed.href;
  }
  return { origin: url.origin, production, shareImage: optionalUrl(env.SOCIAL_IMAGE_URL),shareImageWidth: env.SOCIAL_IMAGE_WIDTH ? Number(env.SOCIAL_IMAGE_WIDTH) : undefined,shareImageHeight:env.SOCIAL_IMAGE_HEIGHT?Number(env.SOCIAL_IMAGE_HEIGHT):undefined,
    analyticsEndpoint: production || env.ANALYTICS_PREVIEW === 'true' ? optionalUrl(env.ANALYTICS_ENDPOINT) : undefined,
    monitoringEndpoint: optionalUrl(env.MONITORING_ENDPOINT), privacyUrl: optionalUrl(env.PRIVACY_URL),
    bookingUrl: optionalUrl(env.BOOKING_URL) || 'https://calendly.com/ammarzerobyte/30min' };
}
