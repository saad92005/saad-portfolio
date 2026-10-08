"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { aboutStats, projects } from "@/lib/data";
import SpotlightCard from "./SpotlightCard";

// *wrapped* words get the italic serif accent
const text =
  "I'm a Computer Science student at UMT Lahore who *ships* *real* *software.* I design AI systems — RAG, LLM apps and *agents* — and the full-stack products around them, from Next.js frontends to FastAPI backends. Several of my apps are *live* and used *daily* by real teams.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const accent = word.startsWith("*");
  const clean = word.replaceAll("*", "");
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const sweep = useTransform(progress, range, ["0%", "100%"]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`relative isolate inline-block mr-[0.25em] ${accent ? "font-serif italic font-normal text-accent tracking-normal" : ""}`}
    >
      {accent && (
        <motion.span
          aria-hidden="true"
          style={{ width: sweep }}
          className="absolute left-[-0.08em] bottom-[0.12em] h-[0.38em] -z-10 rounded-sm bg-gradient-to-r from-lavender via-accent-2/70 to-accent-3/70"
        />
      )}
      {clean}
    </motion.span>
  );
}

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
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section id="about" className="relative py-28 sm:py-40 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[500px] h-[500px] -right-60 top-20 bg-accent-2/50" />
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div className="lg:pt-4">
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim">
            <span className="w-8 h-px bg-accent" /> ABOUT ME
          </p>
        </div>

        <div>
          <p
            ref={ref}
            className="font-display font-semibold tracking-[-0.02em] text-[clamp(1.6rem,3.6vw,3.1rem)] leading-[1.18]"
          >
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <Bento />
        </div>
      </div>
    </section>
  );
}

const focus = ["RAG pipelines", "LLM agents", "Next.js", "FastAPI", "Flutter", "Postgres", "Vector search", "PWAs"];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }));
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
  initial: { opacity: 0, y: 40, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
});

function Bento() {
  const live = projects.filter((p) => /live|shipped|deployed/i.test(p.status));
  const tones = ["#7c62e0", "#d76ba0", "#3fb88a"];
  return (
    <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {aboutStats.map((s, i) => (
        <motion.div key={s.label} {...rise(i)} className="lg:col-span-2">
          <SpotlightCard color={tones[i % 3]} className="h-full p-6">
            <div className="font-display text-5xl sm:text-6xl font-bold text-gradient">
              <Count to={Number(s.value)} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm text-ink-dim">{s.label}</p>
            <span aria-hidden="true" className="absolute right-5 top-5 w-2 h-2 rounded-full" style={{ background: tones[i % 3] }} />
          </SpotlightCard>
        </motion.div>
      ))}

      {/* live products ticker */}
      <motion.div {...rise(3)} className="sm:col-span-2 lg:col-span-4">
        <SpotlightCard className="h-full p-6">
          <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-semibold text-ink-dim">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            LIVE RIGHT NOW
          </p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6">
            {live.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-baseline justify-between gap-3 border-b border-line py-2.5"
              >
                <a href="#work" className="font-display font-semibold hover:text-accent transition-colors">{p.title}</a>
                <span className="text-[11px] text-ink-faint text-right">{p.status.split("—").pop()?.trim()}</span>
              </motion.li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>

      {/* location + time */}
      <motion.div {...rise(4)} className="lg:col-span-2">
        <SpotlightCard color="#f0955f" className="h-full p-6 flex flex-col">
          <div aria-hidden="true" className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-dashed border-accent/30 animate-[spin_30s_linear_infinite]" />
          <div aria-hidden="true" className="absolute -right-2 -bottom-2 w-24 h-24 rounded-full bg-accent-2/40 blur-xl" />
          <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-semibold text-ink-dim">
            <MapPin size={13} /> BASED IN
          </p>
          <p className="mt-4 font-display text-3xl font-bold">Lahore, PK</p>
          <p className="mt-auto pt-6 text-sm text-ink-dim">
            <span className="font-display text-2xl font-bold text-ink"><Clock /></span> PKT · remote-friendly
          </p>
        </SpotlightCard>
      </motion.div>

      {/* focus marquee */}
      <motion.div {...rise(5)} className="sm:col-span-2 lg:col-span-6">
        <SpotlightCard className="p-6 overflow-hidden">
          <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-semibold text-ink-dim">
            <Sparkles size={13} className="text-accent" /> WHAT I WORK WITH
          </p>
          <div className="mt-5 flex gap-3 w-max animate-[marquee-left_28s_linear_infinite] hover:[animation-play-state:paused]">
            {[...focus, ...focus].map((f, i) => (
              <span
                key={i}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold border border-line bg-white"
                style={{ boxShadow: `inset 0 -3px 0 ${["#e7ddff", "#ffc2da", "#b5ead4", "#ffdcc4"][i % 4]}` }}
              >
                {f}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
