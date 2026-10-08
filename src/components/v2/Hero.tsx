"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

// WebGL only runs in the browser
const RobotScene = dynamic(() => import("./RobotScene"), { ssr: false });

// If WebGL is unavailable the scene throws; drop it instead of breaking the page.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const roles = ["AI Engineer", "Full-Stack Developer", "Automation Builder"];
const band = ["RAG SYSTEMS", "LLM APPS", "AI AGENTS", "NEXT.JS", "FASTAPI", "FLUTTER", "AUTOMATION", "SUPABASE"];
const ease = [0.16, 1, 0.3, 1] as const;
const D = 1.9; // the loader finishes opening around here

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollY } = useScroll();
  const robotY = useTransform(scrollY, [0, 700], [0, 120]);
  const robotScale = useTransform(scrollY, [0, 700], [1, 0.82]);
  const textY = useTransform(scrollY, [0, 700], [0, -70]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden flex flex-col pt-24">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="aurora w-[520px] h-[520px] -left-40 top-10 bg-accent-2/40" />
        <div className="aurora w-[460px] h-[460px] right-[-120px] top-[30%] bg-accent-3/25 [animation-delay:-6s]" />
        <div className="aurora w-[380px] h-[380px] left-[35%] bottom-[-160px] bg-accent/20 [animation-delay:-12s]" />
      </div>

      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 grid lg:grid-cols-[1.1fr_1fr] items-center gap-2 lg:gap-6">
        <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D, duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.04] backdrop-blur px-4 py-1.5 text-xs text-ink-dim"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            Available for internships &amp; freelance
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.1, duration: 0.7, ease }}
            className="mt-6 font-serif italic text-2xl sm:text-4xl text-ink-dim"
          >
            Hello, I&apos;m
          </motion.p>
          <h1 className="font-display font-extrabold leading-[0.88] tracking-[-0.03em] text-[clamp(3.4rem,12vw,8.6rem)]">
            {["SAAD", "SHAHID"].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className={`block ${i === 1 ? "shine" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: D + 0.15 + i * 0.12, duration: 1, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 0.55, duration: 0.8 }}
            className="mt-5 sm:mt-7 flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="h-px w-10 bg-accent" />
            <span className="relative h-[1.3em] overflow-hidden font-serif italic text-[clamp(1.5rem,4vw,2.4rem)] text-ink">
              <motion.span
                key={roleIdx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease }}
                className="block whitespace-nowrap"
              >
                {roles[roleIdx]}
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 0.7, duration: 0.8 }}
            className="hidden sm:block mt-6 max-w-md mx-auto lg:mx-0 text-ink-dim leading-relaxed"
          >
            {profile.subheadline} Based in {profile.locationShort}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.85, duration: 0.7 }}
            className="mt-7 sm:mt-9 flex flex-wrap justify-center lg:justify-start gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent text-[#050507] font-semibold pl-6 pr-2 py-2 hover:shadow-[0_0_40px_-6px_var(--accent)] transition-shadow"
            >
              See my work
              <span className="grid place-items-center w-9 h-9 rounded-full bg-[#050507] text-accent transition-transform group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-line-strong bg-white/[0.03] backdrop-blur px-6 py-3 font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: robotY, scale: robotScale }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: D + 0.1, duration: 1.2, ease }}
          className="relative h-[340px] sm:h-[460px] lg:h-[600px] -mx-5 sm:mx-0"
          data-cursor
        >
          {/* glowing rings behind the robot */}
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="absolute w-[78%] aspect-square rounded-full border border-accent/20 [animation:orbit_30s_linear_infinite]">
              <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
            </div>
            <div className="absolute w-[58%] aspect-square rounded-full border border-dashed border-accent-3/25 [animation:counter-orbit_22s_linear_infinite]">
              <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-accent-3 shadow-[0_0_14px_var(--accent-3)]" />
            </div>
            <div className="absolute w-[44%] aspect-square rounded-full bg-accent-2/25 blur-3xl" />
          </div>
          <SceneBoundary>
            <RobotScene />
          </SceneBoundary>
        </motion.div>
      </div>

      {/* skewed keyword band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1, duration: 1 }}
        className="relative z-10 mt-6 border-y border-line bg-white/[0.02] backdrop-blur-sm py-4 -rotate-1 overflow-hidden"
      >
        <div className="marquee-track [animation-duration:30s]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {band.map((w) => (
                <span key={w} className="font-display font-bold text-sm sm:text-base tracking-[0.2em] text-ink-dim whitespace-nowrap px-6 flex items-center gap-12">
                  {w} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: D + 1.2 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="hidden lg:grid absolute right-10 bottom-24 z-10 w-11 h-11 place-items-center rounded-full border border-line-strong text-ink-dim hover:text-accent hover:border-accent"
      >
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
