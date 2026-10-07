"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

// WebGL only runs in the browser
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 800], [0, 200]);
  const sceneOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);
  const textY = useTransform(scrollY, [0, 800], [0, -80]);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden flex items-center">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div className="blob w-[520px] h-[520px] bg-violet/30 -top-40 -left-40" aria-hidden="true" />
      <div className="blob w-[460px] h-[460px] bg-cyan/20 bottom-0 right-0" aria-hidden="true" />

      <motion.div
        style={{ y: sceneY, opacity: sceneOpacity }}
        className="absolute inset-0 lg:left-[38%] h-full"
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 pt-28 pb-20 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-ink-dim mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships, jobs &amp; freelance
          </motion.div>

          <h1 className="font-display font-bold tracking-tight leading-[0.95] text-[clamp(3rem,8.5vw,6.8rem)]">
            {["Hi, I'm Saad.", "I build AI"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block text-aurora"
                initial={{ y: "110%", rotate: 4 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.59, duration: 1, ease }}
              >
                that ships.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-7 text-lg text-ink-dim max-w-xl leading-relaxed"
          >
            AI Engineer &amp; Full-Stack Developer. I turn LLMs, RAG and automation into real products — SaaS
            platforms, PWAs and mobile apps that people use every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              View my work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s talk
            </a>
            <div className="flex items-center gap-2 ml-1">
              {[
                { href: profile.github, icon: GithubIcon, label: "GitHub" },
                { href: profile.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink-dim hover:text-cyan transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-10 flex items-center gap-2 text-sm text-ink-faint"
          >
            <MapPin size={15} /> {profile.locationShort} · BS Computer Science, UMT
          </motion.p>
        </div>
      </motion.div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 glass w-10 h-10 rounded-full flex items-center justify-center text-ink-dim"
      >
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
