"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="glass rounded-full flex items-center gap-1 p-1.5 pl-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]">
        <a href="#top" className="font-display font-bold mr-2 sm:mr-4 text-aurora">
          SS
        </a>
        <ul className="flex items-center">
          {links.map((l) => (
            <li key={l.id} className={l.id === "github" || l.id === "experience" ? "hidden sm:block" : ""}>
              <a
                href={`#${l.id}`}
                className={`relative block px-3 sm:px-4 py-2 text-[13px] rounded-full transition-colors ${
                  active === l.id ? "text-ink" : "text-ink-dim hover:text-ink"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
