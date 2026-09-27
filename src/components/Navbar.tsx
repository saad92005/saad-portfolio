"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";

const sectionIds = navLinks.map((l) => l.href.slice(1));

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
      <nav
        className={`mx-auto max-w-4xl rounded-full flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14 px-4" : "h-16 px-4 sm:px-5"
        } bg-white/75 backdrop-blur-xl border border-line`}
        style={{
          boxShadow: scrolled
            ? "0 20px 45px -22px rgba(20,18,26,0.25)"
            : "0 10px 30px -18px rgba(20,18,26,0.18)",
        }}
      >
        <a href="#top" className="font-display font-extrabold text-[15px] tracking-tight pl-2 text-ink shrink-0">
          saad<span className="accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-[14px] text-ink-dim">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative z-10 block px-4 py-1.5 rounded-full transition-colors duration-200 hover:text-ink ${
                    isActive ? "text-ink" : ""
                  }`}
                >
                  {l.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-surface-soft border border-line"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-primary items-center px-5 py-2 text-[13px] font-semibold">
          Let&apos;s talk
        </a>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 -z-10 bg-ink/20 backdrop-blur-sm"
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
            className="md:hidden mx-auto max-w-4xl mt-2 rounded-3xl border border-line bg-white/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-1 text-base shadow-xl"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="py-2.5 border-b border-line last:border-b-0 text-ink-dim hover:text-ink transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + navLinks.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="btn-primary mt-4 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold"
            >
              Let&apos;s talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
