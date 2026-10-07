"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span suppressHydrationWarning>Lahore {t}</span>;
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  // hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setSolid(y > 40);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? "bg-bg/95 border-b border-line" : ""}`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between text-sm">
        <a href="#top" className="font-medium">
          {profile.brand}
        </a>
        <span className="hidden md:block text-ink-faint text-xs">
          <Clock />
        </span>
        <nav className="flex gap-5 sm:gap-8">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="link-line text-ink-dim hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
