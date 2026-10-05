// The portfolio's one canonical address. Pinned explicitly (rather than taken from
// VERCEL_PROJECT_PRODUCTION_URL) so SEO metadata, the sitemap and Open Graph tags
// always point here, whichever domain Vercel considers primary.
// NEXT_PUBLIC_SITE_URL still overrides it, e.g. once a custom domain exists.
const CANONICAL_URL = "https://saadshahid-portfolio.vercel.app";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL) return CANONICAL_URL;
  return "http://localhost:3001";
}

export const siteUrl = resolveSiteUrl();
