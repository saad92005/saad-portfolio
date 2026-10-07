"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { profile } from "@/lib/data";
import SceneBoundary from "./SceneBoundary";

// WebGL only runs in the browser
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.65, 0, 0.35, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 900], [0, 180]);
  const sceneScale = useTransform(scrollY, [0, 900], [1, 0.85]);

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <motion.div
        style={{ y: sceneY, scale: sceneScale }}
        className="absolute right-[-15%] sm:right-[-5%] top-[8%] w-[90vw] sm:w-[60vw] h-[60vh] sm:h-[80vh] opacity-90"
        aria-hidden="true"
      >
        <SceneBoundary>
          <HeroScene />
        </SceneBoundary>
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-end max-w-[1400px] w-full mx-auto px-5 sm:px-10 pt-28 pb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="label mb-6 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Available for work — 2026
        </motion.p>

        <h1 className="serif text-[clamp(3.6rem,12vw,11rem)] leading-[0.88] tracking-tight">
          <Line delay={0.3}>Saad Shahid</Line>
          <Line delay={0.42}>
            builds <em className="text-accent">useful</em> AI.
          </Line>
        </h1>

        <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-8 items-end border-t border-line pt-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="max-w-xl text-ink-dim leading-relaxed"
          >
            AI Engineer and full-stack developer in {profile.locationShort}. I design and ship LLM products, RAG
            systems and mobile apps — five of them are live and used every day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9 }}
            className="flex gap-3"
          >
            <a href="#projects" className="btn btn-accent">
              Selected work <ArrowDownRight size={17} />
            </a>
            <a href="#contact" className="btn">
              Contact
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
