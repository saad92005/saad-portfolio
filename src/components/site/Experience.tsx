"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { certifications, education, experience } from "@/lib/data";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const entries = [
    ...experience.map((e) => ({ icon: Briefcase, ...e, sub: e.orgSubtitle })),
    {
      icon: GraduationCap,
      period: education.period,
      role: education.degree,
      org: education.school,
      sub: education.location,
      bullets: ["Focus on AI, NLP and software engineering; research project published as an IEEE-format paper."],
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-10">
        <SectionTitle kicker="Journey" title="Experience &" accent="education" center />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-line sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-cyan via-violet to-pink sm:-translate-x-1/2"
          />

          <div className="space-y-12">
            {entries.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <div key={e.role} className="relative grid sm:grid-cols-2 gap-6">
                  <span className="absolute left-5 sm:left-1/2 top-6 -translate-x-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-cyan shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                    <e.icon size={17} />
                  </span>
                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60, rotateY: right ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformPerspective: 1000 }}
                    className={`glass ring-aurora rounded-3xl p-6 sm:p-7 ml-14 sm:ml-0 ${right ? "sm:col-start-2 sm:ml-10" : "sm:mr-10"}`}
                  >
                    <p className="text-xs font-semibold text-cyan tracking-wide">{e.period}</p>
                    <h3 className="mt-2 font-display text-xl font-bold">{e.role}</h3>
                    <p className="text-sm text-ink-dim">
                      {e.org} · {e.sub}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {e.bullets.slice(0, 3).map((b) => (
                        <li key={b} className="text-sm text-ink-dim leading-relaxed flex gap-2">
                          <span className="mt-2 w-1 h-1 rounded-full bg-violet shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          {certifications.map((c) => (
            <div key={c.title} className="glass rounded-2xl p-5 flex gap-4 items-start">
              <Award className="text-pink shrink-0" size={22} />
              <div>
                <p className="text-xs text-ink-faint">{c.issuer}</p>
                <p className="text-sm font-medium mt-1">{c.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
