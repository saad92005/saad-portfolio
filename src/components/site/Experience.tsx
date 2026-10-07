"use client";

import { motion } from "framer-motion";
import { certifications, education, experience } from "@/lib/data";
import { Fade, SectionHead } from "./Reveal";

export default function Experience() {
  const entries = [
    ...experience.map((e) => ({ period: e.period, role: e.role, org: e.org, bullets: e.bullets })),
    {
      period: education.period,
      role: education.degree,
      org: `${education.school}, ${education.location}`,
      bullets: ["Focus on AI, NLP and software engineering. Dialect machine-translation research written up as an IEEE-format paper."],
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionHead index="03" label="Experience" title={["Where I've", <em key="b">been</em>]} />

        <div className="mt-16">
          {entries.map((e, i) => (
            <div key={e.role} className="relative grid md:grid-cols-[200px_1fr_1.3fr] gap-4 md:gap-10 py-10">
              <motion.span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px bg-line-strong origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
              <Fade>
                <p className="text-sm text-ink-faint">{e.period}</p>
              </Fade>
              <Fade delay={0.08}>
                <h3 className="serif text-3xl sm:text-4xl leading-tight">{e.role}</h3>
                <p className="mt-2 text-sm text-accent">{e.org}</p>
              </Fade>
              <Fade delay={0.16}>
                <ul className="space-y-2 text-sm text-ink-dim leading-relaxed">
                  {e.bullets.slice(0, 3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Fade>
              {i === entries.length - 1 && <span className="absolute bottom-0 left-0 right-0 h-px bg-line-strong" />}
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-[200px_1fr] gap-4 md:gap-10">
          <p className="label">Certifications</p>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.title} className="text-sm">
                <span className="text-ink-faint">{c.issuer} — </span>
                {c.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
