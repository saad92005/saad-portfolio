"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career" title="Where I've worked." />

        <div className="relative pl-8 sm:pl-10">
          <span className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-line-strong to-transparent" />

          {experience.map((job, idx) => (
            <motion.div
              key={job.role + job.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative pb-8 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.15 }}
                className="absolute -left-8 sm:-left-10 top-6 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg"
              />

              <div className="card card-hover p-7">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-2">{job.period}</p>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors">
                  {job.role}
                </h3>
                <p className="text-ink-dim text-sm mt-1 mb-1">{job.org}</p>
                <p className="text-xs text-ink-faint mb-1">{job.subrole}</p>
                {job.note && <p className="text-xs text-ink-faint italic mb-4">{job.note}</p>}

                <ul className={`space-y-1.5 ${job.note ? "" : "mt-4"}`}>
                  {job.points.map((pt) => (
                    <li key={pt} className="text-sm text-ink-dim flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
