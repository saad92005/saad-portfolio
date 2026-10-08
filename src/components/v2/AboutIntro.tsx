"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const principles = [
  ["Ship, don't demo", "Every project here runs in production or is in daily use — real users, real data."],
  ["AI that's grounded", "RAG with citations, agents with human approval. No made-up answers."],
  ["End to end", "From database schema to the pixel on the phone — design, build, deploy, maintain."],
];

// Headshot in an arch frame that tilts toward the pointer, with floating badges.
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });
  const float = (d: number, dur: number) => ({ animate: { y: [0, d, 0] }, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-[78%] sm:w-full max-w-[360px]"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-br from-[#c9b8ff] via-accent-2 to-accent-3 p-[6px] shadow-[0_40px_80px_-30px_rgba(124,98,224,0.55)]">
          <div className="relative w-full h-full rounded-t-[999px] rounded-b-[1.7rem] overflow-hidden bg-[#fdfcf6]">
            <Image src="/images/headshot.png" alt="Saad Shahid" fill sizes="360px" className="object-cover object-[center_30%] scale-[1.15] origin-[50%_70%]" />
          </div>
        </div>

        <motion.span
          {...float(-8, 4)}
          style={{ translateZ: 60 }}
          className="absolute -left-6 sm:-left-12 top-[40%] flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-line shadow-lg px-4 py-2 text-xs font-semibold whitespace-nowrap"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
            <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
          </span>
          Open to work
        </motion.span>
        <motion.span
          {...float(8, 5)}
          style={{ translateZ: 80 }}
          className="absolute -right-6 sm:-right-10 top-[12%] rounded-2xl bg-ink text-white shadow-lg px-4 py-2.5 text-xs whitespace-nowrap"
        >
          <span className="block text-[10px] tracking-[0.2em] text-white/60">STUDYING</span>
          <span className="font-semibold">BS CS · UMT</span>
        </motion.span>
        <motion.span
          {...float(-6, 4.5)}
          style={{ translateZ: 70 }}
          className="absolute -right-4 sm:-right-8 bottom-[10%] flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-line shadow-lg px-4 py-2 text-xs font-semibold whitespace-nowrap"
        >
          <Sparkles size={13} className="text-accent" /> AI Engineer
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function Line({ children, d, className = "" }: { children: React.ReactNode; d: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: d, duration: 0.9, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function AboutIntro() {
  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-center">
      <Portrait />

      <div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim"
        >
          <span className="w-8 h-px bg-accent" /> ABOUT ME
        </motion.p>
        <h2 className="mt-6 font-display font-bold tracking-[-0.03em] text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1]">
          <Line d={0}>I build AI</Line>
          <Line d={0.1}>that actually</Line>
          <Line d={0.2} className="font-serif italic font-normal text-gradient pr-3">
            ships.
          </Line>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-7 text-lg text-ink-dim leading-relaxed max-w-xl"
        >
          I&apos;m <span className="text-ink font-semibold">Saad Shahid</span>, a Computer Science student at UMT Lahore. I design RAG
          systems, LLM apps and agents — and the full-stack products around them, from Next.js frontends to FastAPI backends.
        </motion.p>

        <ul className="mt-10 rounded-2xl overflow-hidden border border-line divide-y divide-line bg-white/50">
          {principles.map(([t, d], i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease }}
              className="group flex gap-5 hover:bg-white p-5 transition-colors"
            >
              <span className="font-display text-sm font-bold text-accent pt-0.5">0{i + 1}</span>
              <span>
                <span className="block font-display font-semibold group-hover:text-accent transition-colors">{t}</span>
                <span className="block mt-1 text-sm text-ink-dim">{d}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
