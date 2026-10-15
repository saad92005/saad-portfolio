"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, Radio } from "lucide-react";
import { aboutStats, projects } from "@/lib/data";
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

function Label({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-2 text-[11px] tracking-[0.22em] font-semibold text-ink-faint">{children}</p>;
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
});

function Bento() {
  const live = projects.filter((p) => /live|shipped|deployed/i.test(p.status));
  return (
    <div className="mt-16 sm:mt-24 space-y-4">
      {/* stats: one glass strip, numbers separated by hairlines */}
      <motion.div
        {...fade(0)}
        className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface/70 via-bg-2/60 to-surface/30 backdrop-blur"
      >
        <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent-2/60 to-transparent" />
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {aboutStats.map((s, i) => (
            <div key={s.label} className="group relative p-6 sm:p-8">
              <p className="font-mono text-[10px] text-ink-faint">0{i + 1}</p>
              <div className="mt-3 font-display text-5xl sm:text-6xl font-bold text-gradient leading-none">
                <Count to={Number(s.value)} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-ink-dim max-w-[22ch]">{s.label}</p>
              <span aria-hidden="true" className="absolute left-6 sm:left-8 bottom-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-2 transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* live products as a status board */}
        <motion.div {...fade(1)} className="min-w-0 rounded-3xl border border-line bg-bg-2/60 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Label>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              LIVE RIGHT NOW
            </Label>
            <span className="rounded-full bg-emerald-400/10 text-emerald-300 px-3 py-1 text-[11px] font-semibold whitespace-nowrap">
              {live.length} in production
            </span>
          </div>
          <ul className="divide-y divide-line">
            {live.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <a href="#work" className="group/l flex items-center gap-3 sm:gap-4 py-3 px-1 transition-colors">
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="min-w-0 flex-1 font-display font-semibold truncate transition-colors group-hover/l:text-accent-2">{p.title}</span>
                  <span className="hidden min-[440px]:inline shrink-0 rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-faint max-w-[45%] truncate">
                    {p.status.split("—").pop()?.trim()}
                  </span>
                  <ArrowUpRight size={15} className="shrink-0 text-ink-faint transition-all group-hover/l:rotate-45 group-hover/l:text-accent-2" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* location + local time */}
        <motion.div
          {...fade(2)}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-[radial-gradient(120%_90%_at_100%_100%,rgba(65,105,225,0.35),transparent_60%),linear-gradient(160deg,var(--surface),var(--bg-2))] p-6 sm:p-7 flex flex-col min-h-[280px]"
        >
          <div aria-hidden="true" className="absolute -right-16 -bottom-16 w-60 h-60 [perspective:600px]">
            <div className="relative w-full h-full [transform-style:preserve-3d] animate-[spin_24s_linear_infinite]">
              {[0, 30, 60, 90, 120, 150].map((d) => (
                <span key={d} className="absolute inset-0 rounded-full border border-accent-2/25" style={{ transform: `rotateY(${d}deg)` }} />
              ))}
            </div>
          </div>
          <Label>
            <MapPin size={13} className="text-accent-2" /> BASED IN
          </Label>
          <p className="mt-4 font-display text-4xl font-bold">Lahore, PK</p>
          <p className="mt-1 text-xs font-mono text-ink-faint">31.52° N · 74.36° E</p>
          <div className="relative mt-auto pt-10">
            <p className="font-display text-5xl font-bold text-gradient leading-none">
              <Clock />
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <Radio size={12} /> PKT · open to remote work
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
