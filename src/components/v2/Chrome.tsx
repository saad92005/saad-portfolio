import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const nav = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

// Fixed frame around the page: top bar, left social rail, bottom-right CTA.
export default function Chrome() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-bg/90 to-transparent">
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 text-xs font-semibold tracking-[0.15em]">
          <a href="#top" className="font-display text-base tracking-normal" aria-label="Back to top">
            SS
          </a>
          <a href={`mailto:${profile.email}`} className="hidden md:block link-underline tracking-normal text-ink-dim hover:text-ink">
            {profile.email}
          </a>
          <nav className="flex gap-5 sm:gap-10">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-underline text-ink-dim hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="hidden md:flex fixed left-6 bottom-8 z-50 flex-col gap-5">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-ink-dim hover:text-accent transition-colors"
          >
            <Icon size={17} />
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="hidden md:flex fixed right-8 bottom-8 z-50 items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-ink-dim hover:text-accent transition-colors"
      >
        HIRE ME <ArrowUpRight size={14} />
      </a>
    </>
  );
}
