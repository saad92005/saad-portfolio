"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "@/lib/data";

const roles = ["AI ENGINEER", "FULL-STACK DEVELOPER", "AUTOMATION BUILDER"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 40, damping: 20 });
  const gy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.15);
    my.set((e.clientY - r.top - r.height / 2) * 0.15);
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: gx, y: gy }}
        className="glow w-[640px] h-[640px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-16 grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="text-accent text-lg sm:text-2xl font-display mb-3"
          >
            Hello! I&apos;m
          </motion.p>
          <h1 className="font-display font-medium leading-[0.9] tracking-tight text-[clamp(3.5rem,11vw,9.5rem)]">
            {["SAAD", "SHAHID"].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-8 flex items-baseline gap-4"
          >
            <span className="text-ink-dim text-xl font-display">A</span>
            <span className="relative h-[1.3em] overflow-hidden font-display text-[clamp(1.4rem,3.5vw,2.6rem)] font-medium text-gradient min-w-[12ch]">
              <motion.span
                key={roleIdx}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {roles[roleIdx]}
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.8 }}
            className="mt-6 max-w-xl text-ink-dim leading-relaxed"
          >
            {profile.subheadline} Based in {profile.locationShort}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.85, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#work" className="rounded-lg bg-accent text-[#0b0710] font-semibold px-6 py-3 hover:bg-white transition-colors">
              See my work →
            </a>
            <a href="#contact" className="rounded-lg border border-line-strong px-6 py-3 font-semibold hover:border-accent hover:text-accent transition-colors">
              Hire me →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto md:mx-0 w-56 sm:w-72 lg:w-80 aspect-[4/5] rounded-[2rem] overflow-hidden border border-line-strong shadow-[0_0_80px_-20px_rgba(177,140,255,0.6)]"
        >
          <Image
            src="/images/headshot.png"
            alt={`Portrait of ${profile.brand}`}
            fill
            priority
            sizes="(min-width: 1024px) 320px, 288px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium bg-bg/70 backdrop-blur px-3 py-1.5 rounded-full border border-line">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Open to opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}
