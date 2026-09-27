"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { about, profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_35px_70px_-30px_rgba(20,18,26,0.4)] border border-line">
              <Image
                src="/images/headshot.png"
                alt={`${profile.name} portrait`}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-5 -right-4 sm:-right-8 card px-4 py-3 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-mono text-ink">{about.photoChip}</span>
            </motion.div>
          </motion.div>

          <div>
            <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

            <p className="text-ink-dim leading-relaxed text-base sm:text-lg max-w-lg -mt-6 mb-8">{about.body}</p>

            <ul className="space-y-3.5 mb-8">
              {about.checklist.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-ink-dim leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <span key={tag} className="tag inline-flex items-center px-3.5 py-1.5 text-[12.5px] font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
