"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowUpRight, Boxes, MapPin, Radio, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { aboutStats, projects } from "@/lib/data";
import SpotlightCard from "./SpotlightCard";
import AboutIntro from "./AboutIntro";

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-40 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[500px] h-[500px] -right-60 top-20 bg-accent/15" />
      <div aria-hidden="true" className="aurora w-[420px] h-[420px] -left-52 top-1/3 bg-accent-2/5" />
      <div className="relative max-w-6xl mx-auto">
        <AboutIntro />
        <Bento />
      </div>
    </section>
  );
}

const focus = ["RAG pipelines", "LLM agents", "Next.js", "FastAPI", "Flutter", "Postgres", "Vector search", "PWAs"];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "numeric", minute: "2-digit", hour12: true }));
    const first = setTimeout(f, 0);
    const id = setInterval(f, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{t || "--:--"}</span>;
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 40, rotateX: 12 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
});

const statIcons = [Boxes, Rocket, ShieldCheck];
const focusRows = [focus, ["Tool calling", "Cloudflare Workers", "Serverless", "Prompt design", "Supabase", "TypeScript", "Python", "Groq"]];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-2 text-[11px] tracking-[0.22em] font-semibold text-ink-faint">{children}</p>;
}

function Bento() {
  const live = projects.filter((p) => /live|shipped|deployed/i.test(p.status));
  return (
    <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 [perspective:1400px]">
      {aboutStats.map((s, i) => {
        const Icon = statIcons[i % 3];
        return (
          <motion.div key={s.label} {...rise(i)} className="lg:col-span-2">
            <SpotlightCard color="#4169e1" className="h-full p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="grid place-items-center w-10 h-10 rounded-xl border border-line bg-accent/10 text-accent-2">
                  <Icon size={18} />
                </span>
                <span className="font-mono text-[10px] text-ink-faint">0{i + 1}</span>
              </div>
              <div className="mt-6 font-display text-5xl sm:text-6xl font-bold text-gradient leading-none">
                <Count to={Number(s.value)} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-ink-dim">{s.label}</p>
              <div className="mt-5 h-px bg-line overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
                />
              </div>
            </SpotlightCard>
          </motion.div>
        );
      })}

      {/* live products */}
      <motion.div {...rise(3)} className="sm:col-span-2 lg:col-span-4">
        <SpotlightCard className="h-full p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <Label>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              LIVE RIGHT NOW
            </Label>
            <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-dim whitespace-nowrap">{live.length} in production</span>
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-1.5">
            {live.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <a
                  href="#work"
                  className="group/l flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 hover:border-line hover:bg-accent/[0.07] transition-colors"
                >
                  <span className="font-mono text-[10px] text-ink-faint w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold text-ink truncate group-hover/l:text-accent-2 transition-colors">{p.title}</span>
                    <span className="block text-[11px] text-ink-faint truncate">{p.status.split("—").pop()?.trim()}</span>
                  </span>
                  <ArrowUpRight size={15} className="shrink-0 text-ink-faint opacity-0 -translate-x-1 group-hover/l:opacity-100 group-hover/l:translate-x-0 group-hover/l:text-accent-2 transition-all" />
                </a>
              </motion.li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>

      {/* location + time */}
      <motion.div {...rise(4)} className="lg:col-span-2">
        <SpotlightCard color="#8fb8ff" className="h-full min-h-[260px] p-6 sm:p-7 flex flex-col">
          {/* slowly turning wireframe globe */}
          <div aria-hidden="true" className="absolute -right-16 -bottom-16 w-56 h-56 [perspective:600px]">
            <div className="relative w-full h-full [transform-style:preserve-3d] animate-[spin_24s_linear_infinite]">
              {[0, 30, 60, 90, 120, 150].map((d) => (
                <span key={d} className="absolute inset-0 rounded-full border border-accent/30" style={{ transform: `rotateY(${d}deg)` }} />
              ))}
              <span className="absolute inset-0 rounded-full border border-accent-2/20" style={{ transform: "rotateX(90deg)" }} />
            </div>
            <span className="absolute inset-12 rounded-full bg-accent/25 blur-2xl" />
          </div>
          <Label>
            <MapPin size={13} className="text-accent-2" /> BASED IN
          </Label>
          <p className="mt-4 font-display text-3xl sm:text-4xl font-bold">Lahore, PK</p>
          <p className="mt-1 text-xs font-mono text-ink-faint">31.52° N · 74.36° E</p>
          <div className="relative mt-auto pt-8">
            <p className="font-display text-3xl font-bold text-ink">
              <Clock />
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-dim">
              <Radio size={12} className="text-emerald-400" /> PKT · open to remote work
            </p>
          </div>
        </SpotlightCard>
      </motion.div>

      {/* focus marquee */}
      <motion.div {...rise(5)} className="sm:col-span-2 lg:col-span-6">
        <SpotlightCard className="p-6 sm:p-7 overflow-hidden">
          <Label>
            <Sparkles size={13} className="text-accent-2" /> WHAT I WORK WITH
          </Label>
          <div className="mt-5 space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            {focusRows.map((row, r) => (
              <div
                key={r}
                className="flex gap-3 w-max hover:[animation-play-state:paused]"
                style={{ animation: `${r ? "marquee-right" : "marquee-left"} ${r ? 34 : 28}s linear infinite` }}
              >
                {[...row, ...row].map((f, i) => (
                  <span
                    key={i}
                    aria-hidden={i >= row.length}
                    className="shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-line bg-bg-2/80 text-ink-dim hover:text-ink hover:border-accent/60 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                    {f}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
