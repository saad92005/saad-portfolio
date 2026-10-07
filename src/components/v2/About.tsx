"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { aboutStats } from "@/lib/data";

const text =
  "I'm a Computer Science student at UMT Lahore who ships real software. I build AI systems — RAG, LLM apps and agents — and the full-stack products around them, from Next.js frontends to FastAPI and Supabase backends. Several of my apps are live and used daily by real teams.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  return (
    <section id="about" className="relative py-28 sm:py-40 px-5 sm:px-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent text-sm tracking-[0.4em] font-semibold mb-8">ABOUT ME</p>
        <p ref={ref} className="font-display text-[clamp(1.5rem,3.6vw,2.9rem)] leading-[1.25] font-medium">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 border-t border-line">
          {aboutStats.map((s) => (
            <div key={s.label} className="py-8 sm:pr-8 border-b sm:border-b-0 sm:border-r last:border-r-0 border-line sm:[&:not(:first-child)]:pl-8">
              <div className="font-display text-5xl font-medium text-gradient">
                {s.value}
                {s.suffix}
              </div>
              <p className="mt-2 text-sm text-ink-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
