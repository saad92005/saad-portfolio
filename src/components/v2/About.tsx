"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { aboutStats } from "@/lib/data";

// *wrapped* words get the italic serif accent
const text =
  "I'm a Computer Science student at UMT Lahore who *ships* *real* *software.* I design AI systems — RAG, LLM apps and *agents* — and the full-stack products around them, from Next.js frontends to FastAPI backends. Several of my apps are *live* and used *daily* by real teams.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const accent = word.startsWith("*");
  const clean = word.replaceAll("*", "");
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.25em] ${accent ? "font-serif italic font-normal text-accent tracking-normal" : ""}`}
    >
      {clean}
    </motion.span>
  );
}

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section id="about" className="relative py-28 sm:py-40 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[500px] h-[500px] -right-60 top-20 bg-accent-2/20" />
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div className="lg:pt-4">
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim">
            <span className="w-8 h-px bg-accent" /> ABOUT ME
          </p>
        </div>

        <div>
          <p
            ref={ref}
            className="font-display font-semibold tracking-[-0.02em] text-[clamp(1.6rem,3.6vw,3.1rem)] leading-[1.18]"
          >
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aboutStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-line bg-white/[0.02] p-6 overflow-hidden hover:border-accent/40 transition-colors"
              >
                <div aria-hidden="true" className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/25 transition-colors" />
                <div className="relative font-display text-5xl sm:text-6xl font-bold text-gradient">
                  <Count to={Number(s.value)} suffix={s.suffix} />
                </div>
                <p className="relative mt-3 text-sm text-ink-dim">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
