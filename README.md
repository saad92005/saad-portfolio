# Saad Shahid — Portfolio

**Live:** [saadshahid-omega.vercel.app](https://saadshahid-omega.vercel.app)

Personal portfolio site for Muhammad Saad (Saad Shahid), an AI Engineer and full-stack developer. Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. It includes a working contact form (Resend), SEO metadata, Open Graph tags, a sitemap and robots.txt, and responsive project case studies.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view it (the dev/start scripts run on port 3001).

## Environment variables

The contact form (`/api/contact`) sends email via [Resend](https://resend.com). Set these in a local `.env.local` and in your Vercel project settings:

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from your Resend account. Without it, the contact form returns a clear "not configured" error instead of failing silently. |
| `CONTACT_FROM_EMAIL` | No | The `from` address used for outbound mail, e.g. `Portfolio <contact@yourdomain.com>` once you've verified a sending domain in Resend. Defaults to Resend's shared testing address (`onboarding@resend.dev`), which only works for the account's own verified email. |

Messages are sent to the address in `src/lib/data.ts` (`profile.email`), with the submitter's email set as `Reply-To`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Deploying

Deploy to [Vercel](https://vercel.com/new). Add the environment variables above in the project's settings before going live, or the contact form will report itself as unconfigured.
