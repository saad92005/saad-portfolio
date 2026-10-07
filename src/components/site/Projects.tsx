"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Browser, Phone, Tilt } from "./Devices";
import SectionTitle from "./SectionTitle";

type Visual = {
  accent: string;
  url?: string;
  desktop?: string[];
  phones?: string[];
};

// How each featured project is staged. Images are real screenshots of the shipped apps.
const featured: Record<string, Visual> = {
  thinkdesk: {
    accent: "#8b5cf6",
    url: "thinkdesk-three.vercel.app",
    desktop: [
      "/images/projects/thinkdesk-hero.jpg",
      "/images/projects/thinkdesk-chat.png",
      "/images/projects/thinkdesk-documents.png",
      "/images/projects/thinkdesk-billing.png",
    ],
  },
  "sirat-path": {
    accent: "#10b981",
    url: "siratpath.vercel.app",
    desktop: ["/images/projects/sirat-path.png"],
    phones: ["/images/projects/sirat-path-mobile.jpg"],
  },
  learnwise: {
    accent: "#3b82f6",
    url: "learnwise-app.vercel.app",
    desktop: ["/images/projects/learnwise.png"],
    phones: ["/images/projects/learnwise-mobile.jpg"],
  },
  "aes-portal": {
    accent: "#f59e0b",
    phones: [
      "/images/projects/aes-portal-dashboard.jpeg",
      "/images/projects/aes-portal-workorders.jpeg",
      "/images/projects/aes-portal-reports.jpeg",
    ],
  },
  "techpro-uae": {
    accent: "#f97316",
    url: "techprouae.com",
    desktop: ["/images/projects/techpro-hero.jpg"],
  },
};

function Stage({ p, v }: { p: Project; v: Visual }) {
  const [shot, setShot] = useState(0);
  const desktop = v.desktop ?? [];
  const phones = v.phones ?? [];

  if (!desktop.length) {
    // phone-only app: fan three phones out in 3D
    return (
      <Tilt className="relative h-[460px] sm:h-[540px] flex items-center justify-center" max={8}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {phones.map((src, i) => {
            const offset = i - (phones.length - 1) / 2;
            return (
              <div
                key={src}
                className="absolute w-[150px] sm:w-[200px]"
                style={{
                  transform: `translateX(${offset * 62}%) translateZ(${-Math.abs(offset) * 80}px) rotateY(${-offset * 18}deg)`,
                  zIndex: 10 - Math.abs(offset),
                }}
              >
                <Phone src={src} alt={`${p.title} screen ${i + 1}`} />
              </div>
            );
          })}
        </div>
      </Tilt>
    );
  }

  return (
    <div>
      <Tilt className="relative" max={7}>
        <div style={{ transform: "translateZ(0px)" }}>
          <Browser src={desktop[shot]} alt={`${p.title} screenshot`} url={v.url} />
        </div>
        {phones[0] && (
          <div
            className="absolute -bottom-8 -right-3 sm:-right-8 w-[110px] sm:w-[170px]"
            style={{ transform: "translateZ(80px)" }}
          >
            <Phone src={phones[0]} alt={`${p.title} on mobile`} />
          </div>
        )}
      </Tilt>
      {desktop.length > 1 && (
        <div className="mt-6 flex gap-2">
          {desktop.map((src, i) => (
            <button
              key={src}
              onClick={() => setShot(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={`relative w-20 aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                shot === i ? "border-cyan scale-105" : "border-white/10 opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Feature({ p, v, i }: { p: Project; v: Visual; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className="relative grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="blob w-[420px] h-[420px] opacity-25"
        style={{ background: v.accent, top: "10%", [flip ? "right" : "left"]: "-10%" }}
      />
      <motion.div
        style={{ rotateX, scale, transformPerspective: 1400 }}
        className={`relative ${flip ? "lg:order-2" : ""}`}
      >
        <Stage p={p} v={v} />
      </motion.div>

      <motion.div style={{ y }} className="relative">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-display text-sm text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: v.accent }}>
            {p.category}
          </span>
        </div>
        <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{p.title}</h3>
        <p className="mt-2 text-ink-dim">{p.subtitle}</p>
        <p className="mt-6 text-ink-dim leading-relaxed">{p.description}</p>

        <ul className="mt-6 space-y-2.5">
          {p.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex gap-3 text-sm text-ink/90">
              <Check size={17} className="shrink-0 mt-0.5" style={{ color: v.accent }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.slice(0, 7).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {p.links?.map((l, k) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={k === 0 ? "btn-primary" : "btn-ghost"}
            >
              {l.label} <ArrowUpRight size={16} />
            </a>
          ))}
          <span className="flex items-center gap-2 text-xs text-ink-faint">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {p.status}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function MiniCard({ p, i }: { p: Project; i: number }) {
  const img = p.images[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}
    >
      <Tilt className="h-full" max={9}>
        <div className="glass ring-aurora rounded-3xl overflow-hidden h-full flex flex-col">
          <div className="relative aspect-[16/10] bg-bg-2 overflow-hidden">
            {img ? (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className={p.frame === "phone" ? "object-contain p-4" : "object-cover object-top"}
              />
            ) : (
              <div className="absolute inset-0 p-6 font-mono text-[11px] leading-relaxed text-cyan/70 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.35),transparent_60%)]">
                <p className="text-ink-faint"># dialect → English</p>
                <p>model = MarianMT.fine_tune(&quot;ar-en&quot;)</p>
                <p>bleu(zero_shot) = 13.0</p>
                <p className="text-pink">bleu(fine_tuned) = 29.0 ▲</p>
                <p className="text-ink-faint mt-2"># Moroccan · Levantine · Gulf · Tunisian</p>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-1">
            <p className="text-[11px] tracking-widest uppercase text-cyan font-semibold">{p.category}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-3 text-sm text-ink-dim leading-relaxed line-clamp-3">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 4).map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            {p.links?.[0] && (
              <a
                href={p.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold hover:text-cyan transition-colors"
              >
                {p.links[0].label} <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function Projects() {
  const main = projects.filter((p) => featured[p.slug]);
  const rest = projects.filter((p) => !featured[p.slug]);
  const order = ["thinkdesk", "sirat-path", "learnwise", "aes-portal", "techpro-uae"];
  main.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionTitle kicker="Selected work" title="Products I've" accent="shipped" />
        {main.map((p, i) => (
          <Feature key={p.slug} p={p} v={featured[p.slug]} i={i} />
        ))}

        <h3 className="mt-16 mb-10 font-display text-2xl sm:text-3xl font-bold">
          More <span className="text-aurora">builds &amp; research</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, i) => (
            <MiniCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
