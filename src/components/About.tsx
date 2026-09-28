"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { aboutChecklist, aboutTags, aboutStats } from "@/lib/data";
import { useTilt } from "@/lib/useTilt";
import KineticHeading from "./KineticHeading";
import Counter from "./Counter";

function PhotoCard() {
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInView = useInView(ringRef, { margin: "200px 0px" });
  const { ref, tiltStyle, glowStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-sm mx-auto lg:mx-0"
    >
      <div ref={ringRef} className="absolute -inset-6 sm:-inset-8 pointer-events-none" aria-hidden="true">
        <motion.div
          className="w-full h-full rounded-full border border-dashed"
          style={{ borderColor: "var(--line-strong)" }}
          animate={ringInView ? { rotate: 360 } : {}}
          transition={{ duration: 40, repeat: ringInView ? Infinity : 0, ease: "linear" }}
        />
      </div>

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
        className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_70px_-24px_rgba(18,19,26,0.3)] aspect-[4/5]"
      >
        <Image
          src="/images/headshot.png"
          alt="Muhammad Saad, AI Automation & Software Engineer"
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-cover object-top"
        />
        <motion.div className="absolute inset-0 pointer-events-none" style={glowStyle} aria-hidden="true" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card absolute -bottom-5 -right-4 sm:-right-8 px-4 py-3 text-sm font-semibold"
      >
        CS Student @ UMT
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 bg-surface-soft overflow-hidden">
      <div className="orb w-[360px] h-[360px] top-1/3 -left-40" style={{ background: "var(--gradient-1)", opacity: 0.6 }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <PhotoCard />

        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.15em] accent mb-4"
          >
            <span className="w-6 h-px bg-accent" aria-hidden="true" />
            About me
          </motion.p>

          <KineticHeading
            text="I build systems that solve real problems."
            className="font-display font-semibold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,2.75rem)] mb-6 text-balance"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-ink-dim leading-relaxed mb-8"
          >
            I&apos;m Muhammad Saad — computer science student at UMT, Lahore, and an AI Automation &amp; Software
            Engineer. I turn rough requirements into working software: AI systems, automation workflows, and
            full-stack products that ship and get used.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-3 mb-9"
          >
            {aboutChecklist.map((item) => (
              <motion.li
                key={item}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-3 text-ink-dim"
              >
                <CheckCircle2 size={19} className="accent shrink-0 mt-0.5" strokeWidth={2} />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            className="grid grid-cols-3 gap-4 mb-9 pb-9 border-b border-line"
          >
            {aboutStats.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-ink-faint mt-1.5 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {aboutTags.map((tag) => (
              <span key={tag} className="chip px-3 py-1.5 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
