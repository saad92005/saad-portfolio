"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28 bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked." />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-line-strong" aria-hidden="true" />

          <div className="space-y-14">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.role + entry.org}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span
                  className="absolute -left-8 sm:-left-10 top-7 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-surface"
                  aria-hidden="true"
                />

                <div className="card card-glow p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">{entry.period}</p>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-tight">{entry.role}</h3>
                  <p className="accent font-semibold mt-1">
                    {entry.org} <span className="text-ink-faint font-normal">— {entry.orgSubtitle}</span>
                  </p>
                  {entry.note && <p className="text-sm text-ink-faint mt-1 italic">{entry.note}</p>}

                  <ul className="mt-4 space-y-2.5">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-ink-dim leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
