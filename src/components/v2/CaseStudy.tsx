"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import type { Project } from "@/lib/data";

const fade = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + d * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
});

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="self-start md:sticky md:top-24 flex items-center gap-3 text-[11px] tracking-[0.25em] font-semibold text-ink-faint mb-5">
      <span className="text-accent">{n}</span>
      <span className="w-6 h-px bg-line-strong" />
      {children}
    </p>
  );
}

// Full case study for one project: opens as a sheet over the page on every screen size.
export default function CaseStudy({
  p,
  index,
  color,
  shots,
  tall,
  onClose,
}: {
  p: Project;
  index: number;
  color: string;
  shots: string[];
  tall: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);

  const [lead, ...rest] = p.description.split(/(?<=\.)\s/);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end sm:items-stretch sm:justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} case study`}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.article
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="relative w-full sm:w-[min(980px,92vw)] h-[94dvh] sm:h-full sm:m-3 sm:rounded-3xl rounded-t-3xl bg-bg overflow-y-auto overscroll-contain shadow-2xl"
        data-lenis-prevent
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-line">
          <p className="text-xs tracking-[0.2em] font-semibold text-ink-dim truncate">
            CASE STUDY <span className="text-ink-faint">/ {String(index + 1).padStart(2, "0")}</span>
          </p>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="grid place-items-center w-10 h-10 rounded-full border border-line-strong hover:bg-ink hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* hero */}
        <header className="relative px-5 sm:px-10 pt-10 sm:pt-14 pb-10 overflow-hidden">
          <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-40" style={{ background: color }} />
          <motion.p {...fade(0)} className="relative inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] tracking-[0.15em] font-semibold" style={{ color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            {p.status.toUpperCase()}
          </motion.p>
          <motion.h2 {...fade(1)} className="relative mt-5 font-display font-bold tracking-[-0.03em] text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98]">
            {p.title}
          </motion.h2>
          <motion.p {...fade(2)} className="relative mt-3 font-serif italic text-2xl sm:text-3xl text-accent">
            {p.subtitle}
          </motion.p>
          <motion.dl {...fade(3)} className="relative mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-line bg-line">
            {[
              ["Category", p.category],
              ["Role", "Solo — design, build & ship"],
              ["Stack", p.stack.slice(0, 3).join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/80 p-4 last:col-span-2 sm:last:col-span-1">
                <dt className="text-[10px] tracking-[0.2em] text-ink-faint">{k.toUpperCase()}</dt>
                <dd className="mt-1 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </header>

        {/* cover */}
        {shots[0] && (
          <motion.div {...fade(4)} className="px-5 sm:px-10">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-white">
              <Image src={shots[0]} alt={`${p.title} cover`} fill sizes="(max-width: 980px) 100vw, 900px" className="object-cover object-top" />
            </div>
          </motion.div>
        )}

        <div className="px-5 sm:px-10 py-14 space-y-16">
          {/* overview */}
          <section className="grid md:grid-cols-[200px_1fr] gap-4">
            <Label n="01">OVERVIEW</Label>
            <div>
              <p className="font-display text-xl sm:text-2xl font-semibold leading-snug">{lead}</p>
              {rest.length > 0 && <p className="mt-4 text-ink-dim leading-relaxed">{rest.join(" ")}</p>}
            </div>
          </section>

          {/* key features */}
          <section className="grid md:grid-cols-[200px_1fr] gap-4">
            <Label n="02">WHAT I BUILT</Label>
            <ul className="grid sm:grid-cols-2 gap-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-2xl border border-line bg-white/70 p-4 text-sm leading-relaxed">
                  <span className="grid place-items-center shrink-0 w-6 h-6 rounded-full text-white" style={{ background: color }}>
                    <Check size={13} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* architecture flow */}
          <section className="grid md:grid-cols-[200px_1fr] gap-4">
            <Label n="03">HOW IT WORKS</Label>
            <ol className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-center">
              {p.system.map((s, i) => (
                <li key={s} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
                    <span className="font-display text-xs" style={{ color }}>{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </span>
                  {i < p.system.length - 1 && <ArrowRight size={14} className="text-ink-faint rotate-90 sm:rotate-0 ml-5 sm:ml-0" />}
                </li>
              ))}
            </ol>
          </section>

          {/* stack */}
          <section className="grid md:grid-cols-[200px_1fr] gap-4">
            <Label n="04">TECH STACK</Label>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full px-3.5 py-1.5 text-sm border border-line bg-white/70">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* gallery */}
          {(shots.length > 1 || tall.length > 0) && (
            <section>
              <Label n="05">SCREENS</Label>
              {shots.length > 1 && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {shots.slice(1).map((s) => (
                    <div key={s} className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-white">
                      <Image src={s} alt={`${p.title} screen`} fill sizes="(max-width: 640px) 100vw, 450px" className="object-cover object-top" />
                    </div>
                  ))}
                </div>
              )}
              {tall.length > 0 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {tall.map((s) => (
                    <div key={s} className="relative shrink-0 w-[44%] sm:w-[200px] aspect-[9/19] rounded-[1.4rem] overflow-hidden border-4 border-ink bg-ink snap-start">
                      <Image src={s} alt={`${p.title} mobile screen`} fill sizes="200px" className="object-cover object-top" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* outcome */}
          <section className="relative rounded-3xl p-7 sm:p-10 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}22, #ffc2da33 60%, #b5ead433)` }}>
            <Label n="06">OUTCOME</Label>
            <p className="font-display text-xl sm:text-2xl font-semibold leading-snug">{p.result}</p>
            {!!p.links?.length && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l, k) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      k === 0 ? "bg-ink text-white hover:bg-accent" : "border border-ink/20 bg-white/60 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </motion.article>
    </motion.div>
  );
}
