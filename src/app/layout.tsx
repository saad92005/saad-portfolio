import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const grotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = "Saad Shahid — AI Engineer & Full-Stack Developer";
const description =
  "AI Engineer & Software Engineer building practical AI systems, automation workflows, and production applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Saad Shahid",
  },
  description,
  keywords: [
    "Saad Shahid",
    "AI Engineer",
    "Software Engineer",
    "AI Automation",
    "Machine Learning",
    "LLM",
    "RAG",
    "Lahore Pakistan",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer & Full-Stack Developer",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
