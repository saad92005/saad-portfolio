// Resolves the deployed site's own URL without hardcoding a domain:
// - NEXT_PUBLIC_SITE_URL lets you pin a custom domain once you have one.
// - VERCEL_PROJECT_PRODUCTION_URL is set by Vercel to the project's stable
//   production domain (e.g. "saad-portfolio.vercel.app"), independent of
//   per-deployment preview URLs.
// - Falls back to localhost for local dev.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3001";
}

export const siteUrl = resolveSiteUrl();
