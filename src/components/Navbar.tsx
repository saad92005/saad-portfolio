"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#ai-lab", label: "AI Lab" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = links.map((l) => l.href.slice(1));

function AvailableBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-line bg-bg-raised/60 font-mono uppercase tracking-widest text-ink-dim ${
        compact ? "px-3 py-1.5 text-[11px]" : "px-3.5 py-1.5 text-[10.5px]"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      Available
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: a thin band near vertical center decides which section is "active",
  // via IntersectionObserver rather than per-scroll-frame position math
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActive(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 inset-x-0 z-50 px-4"
    >
      <div
        className="mx-auto max-w-4xl rounded-full transition-all duration-300"
        style={{
          padding: 1,
          background: `linear-gradient(120deg, color-mix(in srgb, var(--accent) ${
            scrolled ? 45 : 30
          }%, transparent), color-mix(in srgb, var(--violet) ${
            scrolled ? 45 : 30
          }%, transparent), color-mix(in srgb, var(--teal) ${scrolled ? 45 : 30}%, transparent))`,
        }}
      >
        <nav
          className={`rounded-full flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-12 px-3 sm:px-4" : "h-14 px-3 sm:px-4"
          } bg-bg/80 backdrop-blur-xl`}
          style={{
            boxShadow: scrolled
              ? "0 20px 50px -20px rgba(0, 0, 0, 0.7), 0 8px 32px -8px rgba(0, 0, 0, 0.5)"
              : "0 8px 32px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <a
            href="#top"
            data-cursor-hover
            className="font-mono text-[13px] tracking-widest pl-3 hover:text-accent transition-colors shrink-0"
          >
            SAAD<span className="accent">/</span>SHAHID
          </a>

          <ul className="hidden md:flex items-center gap-1 text-[13px] text-ink-dim">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    data-cursor-hover
                    className={`relative z-10 block px-3.5 py-1.5 rounded-full transition-colors duration-200 hover:text-ink hover:bg-white/5 ${
                      isActive ? "text-ink" : ""
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(120deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--violet) 20%, transparent))",
                        border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block pr-1">
            <AvailableBadge />
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden relative w-9 h-9 flex items-center justify-center text-ink"
            onClick={() => setOpen((o) => !o)}
          >
            <motion.span
              className="absolute block w-5 h-0.5 bg-current rounded-full"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute block w-5 h-0.5 bg-current rounded-full"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute block w-5 h-0.5 bg-current rounded-full"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 -z-10 bg-bg/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-auto max-w-4xl mt-2 rounded-3xl border border-line bg-bg-raised/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-1 text-base"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="py-2.5 border-b border-line/60 last:border-b-0 text-ink-dim hover:text-ink transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + links.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <AvailableBadge compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
