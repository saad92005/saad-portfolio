"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { education, experience } from "@/lib/data";

type Item = { title: string; org: string; year: string; text: string; kind: "now" | "work" | "edu" };

const items: Item[] = [
  {
    title: "Building AI Products",
    org: "Independent",
    year: "NOW",
    kind: "now",
    text: "Shipping AI SaaS, PWAs and agents: ThinkDesk, DevPulse, Aria, Sirat Path, LearnWise and Omnira — RAG, LLM tooling and full-stack delivery.",
  },
  ...experience.map((e) => ({
    title: e.role,
    org: e.org,
    year: e.period.match(/\d{4}/)?.[0] ?? "",
    kind: "work" as const,
    text: e.bullets.slice(0, 2).join(" "),
  })),
  {
    title: "BS Computer Science",
    org: education.school,
    year: "2023",
    kind: "edu",
    text: `${education.period}. Coursework and research in AI, NLP and software engineering, in ${education.location}.`,
  },
];

const icons = { now: Sparkles, work: Briefcase, edu: GraduationCap };

function Entry({ it, i }: { it: Item; i: number }) {
  const left = i % 2 === 0;
  const Icon = icons[it.kind];
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-24 pl-12 md:pl-0">
      {/* node on the rail */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="absolute left-4 md:left-1/2 top-7 -translate-x-1/2 z-10 grid place-items-center w-9 h-9 rounded-full border border-accent/50 bg-bg-2 text-accent-2 shadow-[0_0_24px_-2px_rgba(65,105,225,0.7)]"
      >
        <Icon size={15} />
      </motion.span>

      {/* big year, on the opposite side (desktop) */}
      <div className={`hidden md:flex items-start pt-5 ${left ? "order-2 justify-start" : "order-1 justify-end"}`}>
        <motion.span
          initial={{ opacity: 0, x: left ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl lg:text-7xl font-bold tracking-tight"
          style={{ WebkitTextStroke: "1px rgba(143,184,255,0.35)", color: "transparent" }}
        >
          {it.year}
        </motion.span>
      </div>

      <motion.article
        initial={{ opacity: 0, rotateY: left ? 18 : -18, x: left ? -40 : 40 }}
        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
        className={`group relative rounded-2xl border border-line bg-gradient-to-b from-surface/70 to-bg-2/80 p-6 sm:p-7 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-24px_rgba(65,105,225,0.55)] ${
          left ? "md:order-1" : "md:order-2"
        }`}
      >
        <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-2/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-line bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-accent-2">
            {it.kind === "now" ? "CURRENT" : it.kind === "edu" ? "EDUCATION" : "EXPERIENCE"}
          </span>
          <span className="md:hidden font-display text-2xl font-bold text-ink-faint">{it.year}</span>
        </div>
        <h3 className="mt-4 font-display text-xl sm:text-2xl font-semibold text-ink">{it.title}</h3>
        <p className="mt-1 text-sm text-accent-2">{it.org}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{it.text}</p>
      </motion.article>
    </div>
  );
}

export default function Career() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const dot = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section className="relative py-24 sm:py-36 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="glow w-[520px] h-[520px] -right-64 top-1/3 opacity-50" />
      <div className="text-center mb-16 sm:mb-24">
        <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-faint mb-5">
          <span className="w-8 h-px bg-accent" /> JOURNEY <span className="w-8 h-px bg-accent" />
        </p>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.02em]">
          My career &amp; <span className="font-serif italic font-normal text-accent-2">experience</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* timeline rail with a travelling light */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent origin-top -translate-x-1/2"
        />
        <motion.span
          aria-hidden="true"
          style={{ top: dot }}
          className="absolute left-4 md:left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_18px_6px_rgba(143,184,255,0.6)]"
        />

        <div className="space-y-12 sm:space-y-16">
          {items.map((it, i) => (
            <Entry key={i} it={it} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
