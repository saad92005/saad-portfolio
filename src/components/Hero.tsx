"use client";

import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import { profile, heroCorners } from "@/lib/data";

// hidden below sm: on short mobile viewports the hero's content height varies
// with text wrapping, so a fixed bottom offset here can't be guaranteed to
// clear the CTAs — simplest reliable fix is to only show these once there's
// room to spare.
// Corner labels only render at xl+ (1280px) and pin close to the true edges
// (not the centered content) so they never contest space with the vertically
// centered badge/headline stack — that stack's height is content-driven and
// can't be predicted against arbitrary viewport heights, so the labels stay
// out of its way entirely instead of trying to share a band with it.
const cornerClass =
  "hidden xl:block absolute font-display font-extrabold uppercase leading-none text-ink/[0.13] select-none pointer-events-none text-[1.85rem] 2xl:text-[2.25rem] tracking-tight";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] gradient-wash overflow-hidden flex flex-col">
      <span className={`${cornerClass} top-24 left-6`}>{heroCorners.topLeft}</span>
      <span className={`${cornerClass} top-24 right-6 text-right`}>{heroCorners.topRight}</span>
      <span className={`${cornerClass} bottom-6 left-6`}>{heroCorners.bottomLeft}</span>
      <span className={`${cornerClass} bottom-6 right-6 text-right`}>{heroCorners.bottomRight}</span>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-10">
        <HeroBadge />

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center font-display font-extrabold text-[clamp(2rem,7vw,4rem)] leading-[1.04] tracking-tight text-ink max-w-3xl"
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-center text-ink-dim text-base sm:text-lg max-w-xl"
        >
          {profile.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#work" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold">
            View my work
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold">
            Let&apos;s connect
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs text-ink-faint"
        >
          {profile.metaLine.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
