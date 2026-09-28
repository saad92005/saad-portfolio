"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mic } from "lucide-react";

export function OmniraThumbnail() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/9.2] rounded-2xl overflow-hidden border border-line"
      style={{ background: "linear-gradient(155deg, var(--surface-soft), var(--gradient-2) 140%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <p className="absolute top-4 left-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
        Omnira
      </p>
      <span className="absolute top-4 right-5 flex items-center gap-1.5 text-[11px] font-medium text-ink-faint">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        Voice-driven
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)" }}
            initial={{ width: 56, height: 56, opacity: 0.5 }}
            animate={
              inView
                ? { width: [56, 150 + i * 30], height: [56, 150 + i * 30], opacity: [0.5, 0] }
                : { width: 56, height: 56, opacity: 0.3 }
            }
            transition={{ duration: 2.6, repeat: inView ? Infinity : 0, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(150deg, var(--accent), #8a4fc2)",
            boxShadow: "0 8px 30px -6px color-mix(in srgb, var(--accent) 60%, transparent)",
          }}
        >
          <Mic size={22} color="#fff" strokeWidth={1.75} />
        </div>
      </div>

      <div className="absolute bottom-4 left-5 right-5 flex items-center gap-1.5" aria-hidden="true">
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
    </div>
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
