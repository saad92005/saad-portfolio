"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { profile, heroBadges } from "@/lib/data";
import Terminal from "./Terminal";
import MagneticButton from "./MagneticButton";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

const HeroGraph = dynamic(() => import("./HeroGraph"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
};

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}`, icon: MessageCircle },
];

export default function Hero() {
  const headlineLines = profile.headline.split("\n");

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-bg pt-32 pb-24 flex items-center">
      <div className="wash wash-amber" />
      <div className="absolute inset-0 -z-10">
        <HeroGraph />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden lg:flex flex-col items-center gap-5 fixed left-8 top-1/2 -translate-y-1/2 z-40"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label={s.label}
            className="text-ink-dim hover:text-accent transition-colors"
          >
            <s.icon size={17} strokeWidth={1.75} />
          </a>
        ))}
        <span className="w-px h-16 bg-line-strong" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
          <div>
            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-dim mb-8"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SYS.ONLINE
              </span>
              <span className="text-ink-faint">·</span>
              <span>SAAD_SHAHID // AI_ENGINEER</span>
            </motion.div>

            <h1 className="font-serif font-medium uppercase text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[0.96] tracking-tight">
              {headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`inline-block ${i === headlineLines.length - 1 ? "text-gradient" : ""}`}
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-8 text-ink-dim max-w-lg leading-relaxed text-[15px]"
            >
              {profile.subheadline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint"
            >
              {heroBadges.map((b, i) => (
                <span key={b} className="flex items-center gap-5">
                  {b}
                  {i < heroBadges.length - 1 && <span className="text-line-strong">/</span>}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#projects" className="btn-solid px-8 py-4 text-sm font-semibold inline-block">
                View my work →
              </MagneticButton>
              <MagneticButton
                href="#contact"
                dataCursorHover
                className="btn-outline px-8 py-4 text-sm font-semibold inline-block"
              >
                Let&apos;s connect
              </MagneticButton>
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11px] text-ink-faint"
            >
              {profile.metaLine.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 flex lg:hidden items-center gap-5"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-ink-dim"
                >
                  <s.icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* ambient hub glow — echoes the Skill Constellation center orb for visual continuity */}
            <div
              className="hidden lg:block absolute -z-10 w-[420px] h-[420px] rounded-full"
              style={{
                right: "-8%",
                top: "50%",
                transform: "translateY(-50%)",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--violet) 30%, transparent) 0%, color-mix(in srgb, var(--rose) 18%, transparent) 45%, transparent 72%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="hidden lg:block absolute -z-10 w-[300px] h-[300px] rounded-full border border-dashed border-line orbit-spin"
              style={{ right: "2%", top: "50%", transform: "translateY(-50%)" }}
            />
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
