"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hammer, Rocket, RefreshCw, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { philosophy } from "@/lib/data";

const toneVar: Record<string, string> = {
  accent: "var(--accent)",
  violet: "var(--violet)",
  teal: "var(--teal)",
};

const icons: LucideIcon[] = [Hammer, Rocket, RefreshCw];

function StepCard({
  index,
  step,
  Icon,
}: {
  index: number;
  step: (typeof philosophy)[number];
  Icon: LucideIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const color = toneVar[step.tone];
  const expanded = hovered || open;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: py * -6,
      ry: px * 8,
      mx: (px + 0.5) * 100,
      my: (py + 0.5) * 100,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
            hovered ? -8 : 0
          }px)`,
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg-raised) 92%, transparent), color-mix(in srgb, var(--bg-raised) 78%, black))",
          borderColor: hovered
            ? `color-mix(in srgb, ${color} 55%, transparent)`
            : "var(--line)",
          boxShadow: hovered
            ? `0 30px 60px -24px color-mix(in srgb, ${color} 45%, transparent), 0 0 0 1px color-mix(in srgb, ${color} 30%, transparent)`
            : "0 20px 40px -28px rgba(0, 0, 0, 0.6)",
        }}
        className="relative overflow-hidden rounded-2xl border backdrop-blur-md p-8 cursor-pointer transition-[transform,box-shadow,border-color] duration-300 will-change-transform"
      >
        {/* cursor-following spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(360px circle at ${tilt.mx}% ${tilt.my}%, color-mix(in srgb, ${color} 14%, transparent), transparent 65%)`,
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="font-mono text-xs" style={{ color }}>
            {step.index}
          </span>
          <div
            className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300"
            style={{
              background: `color-mix(in srgb, ${color} 14%, transparent)`,
              color,
              transform: hovered ? "scale(1.08) rotate(-6deg)" : "scale(1) rotate(0deg)",
            }}
          >
            <Icon size={16} strokeWidth={1.75} />
          </div>
        </div>

        <h3 className="relative font-serif text-3xl mt-5 mb-2">{step.title}</h3>
        <p className="relative text-sm text-ink-dim leading-relaxed">{step.description}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
            >
              <ul className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-line">
                {step.subpoints.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                    style={{
                      color,
                      borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
                      background: `color-mix(in srgb, ${color} 8%, transparent)`,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="How I work" title="From vision to production software." tone="amber" />

        <div className="relative">
          {/* connecting sequence line, desktop only */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute inset-x-0 -z-10"
            style={{ top: "2.75rem" }}
          >
            <div className="border-t border-dashed border-line" />
            <div className="absolute left-1/3 top-0 -translate-x-1/2 -translate-y-1/2 bg-bg px-1.5">
              <ArrowRight size={14} className="text-ink-faint" />
            </div>
            <div className="absolute left-2/3 top-0 -translate-x-1/2 -translate-y-1/2 bg-bg px-1.5">
              <ArrowRight size={14} className="text-ink-faint" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {philosophy.map((p, i) => (
              <StepCard key={p.title} index={i} step={p} Icon={icons[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
