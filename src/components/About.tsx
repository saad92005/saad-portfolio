"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { aboutChecklist, aboutTags } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 bg-surface-soft">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-sm mx-auto lg:mx-0"
        >
          <div className="rounded-[2rem] overflow-hidden shadow-[0_30px_70px_-24px_rgba(20,18,26,0.3)] relative aspect-[4/5]">
            <Image
              src="/images/headshot.png"
              alt="Muhammad Saad, AI Automation & Software Engineer"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
            />
          </div>
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

        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.15em] accent mb-4"
          >
            About me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-semibold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,2.75rem)] mb-6 text-balance"
          >
            I build systems that solve real problems.
          </motion.h2>
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
            className="space-y-3 mb-8"
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
