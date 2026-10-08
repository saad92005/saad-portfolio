"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { education, experience } from "@/lib/data";

type Item = { title: string; org: string; year: string; text: string };

const items: Item[] = [
  {
    title: "Building AI Products",
    org: "Independent",
    year: "NOW",
    text: "Shipping AI SaaS, PWAs and agents: ThinkDesk, Sirat Path, LearnWise and Omnira — RAG, LLM tooling and full-stack delivery.",
  },
  ...experience.map((e) => ({
    title: e.role,
    org: e.org,
    year: e.period.match(/\d{4}/)?.[0] ?? "",
    text: e.bullets.slice(0, 2).join(" "),
  })),
  {
    title: "BS Computer Science",
    org: education.school,
    year: "2023",
    text: `${education.period}. Coursework and research in AI, NLP and software engineering, in ${education.location}.`,
  },
];

export default function Career() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="relative py-24 sm:py-36 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="glow w-[520px] h-[520px] -right-64 top-1/3 opacity-40" />
      <h2 className="font-display text-center text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.02em] mb-20">
        My career &amp;
        <br />
        <span className="font-serif italic font-normal text-accent">experience</span>
      </h2>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* timeline rail */}
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-line md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-accent-2 origin-top md:-translate-x-1/2"
        />

        <div className="space-y-16">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative grid md:grid-cols-2 gap-4 md:gap-20 pl-10 md:pl-0"
            >
              <span className="absolute left-3 md:left-1/2 top-2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 shadow-[0_0_20px_4px_rgba(217,183,126,0.55)]" />
              <div className="md:flex md:justify-between md:items-start md:pr-12">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium">{it.title}</h3>
                  <p className="text-accent text-sm mt-1">{it.org}</p>
                </div>
                <span className="font-display text-3xl sm:text-4xl font-medium text-ink/80 block mt-2 md:mt-0">{it.year}</span>
              </div>
              <p className="text-ink-dim leading-relaxed md:pl-12 text-[15px]">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
