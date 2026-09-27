"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mic, MessageSquare, Wrench, ShieldCheck, type LucideIcon } from "lucide-react";

const CAPABILITIES: { label: string; icon: LucideIcon; angle: number }[] = [
  { label: "Voice", icon: Mic, angle: -55 },
  { label: "Chat", icon: MessageSquare, angle: 35 },
  { label: "Tools", icon: Wrench, angle: 145 },
  { label: "System Control", icon: ShieldCheck, angle: 220 },
];

const BARS = [0, 1, 2, 3, 4];
const RADIUS = 108;
const CENTER = 150;

// Math.sin/cos can differ in their last bit between server and browser V8
// builds, which otherwise trips a hydration mismatch on these pixel offsets.
function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

const POINTS = CAPABILITIES.map((c) => {
  const rad = (c.angle * Math.PI) / 180;
  return { ...c, x: round(Math.cos(rad) * RADIUS), y: round(Math.sin(rad) * RADIUS) };
});

export default function OmniraVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(20,18,26,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,18,26,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* ambient core glow */}
      <div
        className="absolute w-[260px] h-[260px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent) 0%, color-mix(in srgb, var(--violet) 14%, transparent) 45%, transparent 72%)",
          filter: "blur(36px)",
        }}
      />

      <div className="absolute top-5 left-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
        <span>Voice assistant core</span>
        <span className="accent">●</span>
      </div>

      <div className="relative" style={{ width: CENTER, height: CENTER }}>
        <div className="absolute inset-0 rounded-full border border-dashed border-line-strong opacity-40 orbit-spin" />
        <div className="absolute inset-[22px] rounded-full border border-dashed border-line-strong opacity-50" />

        {/* strings from the orb to each capability badge */}
        <svg className="absolute inset-0 overflow-visible pointer-events-none" width={CENTER} height={CENTER}>
          {POINTS.map((p, i) => (
            <motion.line
              key={p.label}
              x1={CENTER / 2}
              y1={CENTER / 2}
              x2={CENTER / 2 + p.x}
              y2={CENTER / 2 + p.y}
              stroke="var(--accent)"
              strokeWidth={1}
              strokeDasharray="3 4"
              initial={{ opacity: 0.15 }}
              animate={inView ? { opacity: [0.15, 0.5, 0.15] } : { opacity: 0.15 }}
              transition={{ duration: 2.6, repeat: inView ? Infinity : 0, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 35% 30%, var(--violet), var(--accent) 60%, var(--bg) 100%)",
            boxShadow: "0 0 44px 8px color-mix(in srgb, var(--accent) 45%, transparent)",
          }}
          animate={inView ? { scale: [1, 1.07, 1] } : { scale: 1 }}
          transition={{ duration: 2.4, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
        >
          <Mic size={19} className="text-white" strokeWidth={1.75} />
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-end gap-[3px] h-4">
          {BARS.map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: "var(--accent)" }}
              animate={inView ? { height: [4, 15, 4] } : { height: 4 }}
              transition={{ duration: 1 + i * 0.15, repeat: inView ? Infinity : 0, ease: "easeInOut", delay: i * 0.1 }}
            />
          ))}
        </div>

        {POINTS.map((p) => (
          <div
            key={p.label}
            className="absolute left-1/2 top-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line-strong bg-white/90 backdrop-blur-sm text-[10px] font-mono text-ink-dim whitespace-nowrap"
            style={{ transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))` }}
          >
            <p.icon size={11} className="text-accent" strokeWidth={1.75} />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}
