"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const roles = ["AI ENGINEER", "FULL-STACK DEV", "AUTOMATION"];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollY } = useScroll();
  const robotY = useTransform(scrollY, [0, 700], [0, 120]);
  const robotScale = useTransform(scrollY, [0, 700], [1, 0.8]);
  const textY = useTransform(scrollY, [0, 700], [0, -60]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden flex items-center pt-20 pb-10">
      <div aria-hidden="true" className="glow w-[560px] h-[560px] sm:w-[760px] sm:h-[760px] left-1/2 top-[40%] lg:left-[30%] -translate-x-1/2 -translate-y-1/2 opacity-60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 grid lg:grid-cols-2 items-center gap-2 lg:gap-8">
        {/* robot: first on desktop, below the name on mobile */}
        <motion.div
          style={{ y: robotY, scale: robotScale }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1.2, ease }}
          className="order-2 lg:order-1 h-[340px] sm:h-[460px] lg:h-[600px] -mx-5 sm:mx-0"
          data-cursor
        >
          <SceneBoundary>
            <RobotScene />
          </SceneBoundary>
        </motion.div>

        <motion.div style={{ y: textY }} className="order-1 lg:order-2 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="text-accent text-base sm:text-2xl font-display mb-2 sm:mb-3"
          >
            Hello! I&apos;m
          </motion.p>
          <h1 className="font-display font-medium leading-[0.9] tracking-tight text-[clamp(3.2rem,13vw,8.5rem)]">
            {["SAAD", "SHAHID"].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 2 + i * 0.12, duration: 0.9, ease }}
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
            className="mt-5 sm:mt-8 flex items-baseline justify-center lg:justify-start gap-3"
          >
            <span className="text-ink-dim text-lg sm:text-xl font-display">An</span>
            <span className="relative h-[1.25em] overflow-hidden font-display text-[clamp(1.4rem,4.5vw,2.6rem)] font-medium text-gradient">
              <motion.span
                key={roleIdx}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
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
            transition={{ delay: 2.7, duration: 0.8 }}
            className="hidden sm:block mt-6 max-w-lg mx-auto lg:mx-0 text-ink-dim leading-relaxed"
          >
            {profile.subheadline} Based in {profile.locationShort}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.85, duration: 0.7 }}
            className="mt-6 sm:mt-9 flex flex-wrap justify-center lg:justify-start gap-3"
          >
            <a href="#work" className="rounded-lg bg-accent text-[#0b0710] font-semibold px-5 sm:px-6 py-3 hover:bg-white transition-colors">
              See my work →
            </a>
            <a href="#contact" className="rounded-lg border border-line-strong px-5 sm:px-6 py-3 font-semibold hover:border-accent hover:text-accent transition-colors">
              Hire me →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
