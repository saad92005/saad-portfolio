"use client";

import { motion, useInView } from "framer-motion";
import { Mic, MessageSquare, Zap, Terminal } from "lucide-react";
import { useTilt } from "@/lib/useTilt";

const orbitIcons = [
  { Icon: MessageSquare, angle: -35, dist: 78, delay: 0 },
  { Icon: Zap, angle: 145, dist: 70, delay: 0.15 },
  { Icon: Terminal, angle: 60, dist: 88, delay: 0.3 },
];

export function OmniraThumbnail() {
  const { ref, tiltStyle, onMouseMove, onMouseLeave } = useTilt(10);
  const inView = useInView(ref as React.RefObject<HTMLDivElement>, { margin: "200px 0px" });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[16/9.2] rounded-2xl overflow-hidden border border-line"
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, var(--surface-soft), var(--gradient-2) 130%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <p className="absolute top-4 left-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint z-10">
        Omnira
      </p>
      <span className="absolute top-4 right-5 flex items-center gap-1.5 text-[11px] font-medium text-ink-faint z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        Voice-driven
      </span>

      {/* layered 3D glass orb */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 600 }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)" }}
            initial={{ width: 60, height: 60, opacity: 0.5 }}
            animate={
              inView
                ? { width: [60, 160 + i * 32], height: [60, 160 + i * 32], opacity: [0.5, 0] }
                : { width: 60, height: 60, opacity: 0.3 }
            }
            transition={{ duration: 2.6, repeat: inView ? Infinity : 0, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}

        {orbitIcons.map(({ Icon, angle, dist, delay }, i) => (
          <motion.div
            key={i}
            className="absolute w-7 h-7 rounded-full card flex items-center justify-center text-accent"
            style={{
              transform: `rotate(${angle}deg) translate(${dist}px) rotate(${-angle}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: [0, 1, 1, 0.6], scale: [0.6, 1, 1, 0.9], y: [0, -4, 0, -4] } : { opacity: 0 }}
            transition={{ duration: 3.4, repeat: inView ? Infinity : 0, delay, ease: "easeInOut" }}
          >
            <Icon size={12} strokeWidth={2} />
          </motion.div>
        ))}

        <motion.div
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(155deg, var(--accent), var(--accent-2) 70%)",
            boxShadow:
              "0 14px 34px -8px color-mix(in srgb, var(--accent) 55%, transparent), inset -6px -6px 14px rgba(0,0,0,0.25), inset 4px 4px 10px rgba(255,255,255,0.35)",
          }}
          animate={inView ? { rotateY: [0, 360] } : {}}
          transition={{ duration: 12, repeat: inView ? Infinity : 0, ease: "linear" }}
        >
          <div
            className="absolute inset-1 rounded-full opacity-60"
            style={{ background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 55%)" }}
            aria-hidden="true"
          />
          <Mic size={24} color="#fff" strokeWidth={1.75} className="relative" />
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-5 right-5 flex items-center gap-1.5 z-10" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => {
          const h = 6 + ((i * 37) % 16);
          return (
            <motion.span
              key={i}
              className="rounded-full"
              style={{ width: 3, background: "var(--ink-faint)" }}
              initial={{ height: h }}
              animate={inView ? { height: [h, h + 10, h] } : { height: h }}
              transition={{ duration: 1.1 + (i % 5) * 0.15, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

const dialects = ["Moroccan", "Levantine", "Gulf", "Tunisian"];

export function ArabicMtThumbnail() {
  return (
    <div
      className="relative w-full aspect-[16/9.2] rounded-2xl overflow-hidden border border-line p-5 flex flex-col justify-between"
      style={{ background: "linear-gradient(155deg, var(--surface-soft), var(--gradient-1) 150%)" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">Dialect MT</p>
        <span className="text-[11px] font-medium text-ink-faint">AraBERT · GRU</span>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <div className="card px-4 py-3 text-right" dir="rtl" style={{ fontFamily: "var(--font-display)" }}>
          <p className="text-lg sm:text-xl font-semibold leading-none">مرحبا بالعالم</p>
          <p className="text-[10px] text-ink-faint mt-1.5 tracking-widest uppercase" dir="ltr">
            Dialect input
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 text-accent shrink-0">
          <span aria-hidden="true" className="text-lg">
            →
          </span>
          <span className="text-[10px] font-mono text-ink-faint whitespace-nowrap">encoder</span>
        </div>

        <div className="card px-4 py-3">
          <p className="text-lg sm:text-xl font-semibold leading-none font-display">Hello, world</p>
          <p className="text-[10px] text-ink-faint mt-1.5 tracking-widest uppercase">English output</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {dialects.map((d) => (
          <span key={d} className="chip px-2.5 py-1 text-[11px] font-medium">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
