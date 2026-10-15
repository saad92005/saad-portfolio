"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "GitHub", href: "#github" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

// Fixed frame around the page: floating glass nav, left social rail, mobile sheet menu.
export default function Chrome() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // highlight whichever section crosses the middle of the viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const n of nav) {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border pl-5 pr-2 py-2 transition-all duration-500 ${
            scrolled || open
              ? "border-line-strong bg-bg/70 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(143,184,255,0.08)]"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" onClick={() => setOpen(false)} className="font-display font-extrabold text-lg" aria-label="Back to top">
            SS<span className="text-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-line bg-surface/40 p-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === n.href ? "bg-accent/15 text-ink shadow-[inset_0_0_0_1px_rgba(65,105,225,0.45)]" : "text-ink-dim hover:text-ink"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex group items-center gap-1.5 rounded-full bg-accent pl-4 pr-3 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--accent)] hover:brightness-110 transition"
            >
              Hire me <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative grid place-items-center w-10 h-10 rounded-full border border-line-strong bg-surface/60"
            >
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-all duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
          <nav className="flex flex-col">
            {nav.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={`flex items-baseline justify-between border-b border-line py-4 font-display text-3xl font-bold transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${active === n.href ? "text-accent-2" : "text-ink"}`}
              >
                {n.label}
                <span className="font-mono text-xs font-normal text-ink-faint">0{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="space-y-5">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-semibold text-white"
            >
              Hire me <ArrowUpRight size={16} />
            </a>
            <div className="flex items-center justify-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-11 h-11 rounded-full border border-line text-ink-dim hover:text-accent-2"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex fixed left-6 bottom-8 z-50 flex-col gap-5">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-ink-dim hover:text-accent-2 transition-colors"
          >
            <Icon size={17} />
          </a>
        ))}
      </div>
    </>
  );
}
