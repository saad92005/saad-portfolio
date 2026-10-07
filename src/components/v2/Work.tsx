"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

const P = "/images/projects/";

// Phone screenshots and plate color for each project (real captures of the shipped apps).
const media: Record<string, { color: string; phones: string[] }> = {
  "sirat-path": { color: "#10b981", phones: ["sirat-m1.jpg", "sirat-m3.jpg", "sirat-m5.jpg", "sirat-m4.jpg", "sirat-m6.jpg", "sirat-m2.jpg"] },
  learnwise: { color: "#3b82f6", phones: ["learnwise-m1.jpg", "learnwise-m2.jpg", "learnwise-m4.jpg"] },
  thinkdesk: { color: "#8b5cf6", phones: ["thinkdesk-m1.jpg", "thinkdesk-m2.jpg"] },
  "aes-portal": {
    color: "#f59e0b",
    phones: [
      "aes-portal-dashboard.jpeg",
      "aes-portal-workorders.jpeg",
      "aes-portal-reports.jpeg",
      "aes-portal-quotations.jpeg",
      "aes-portal-invoices.jpeg",
      "aes-portal-leave.jpeg",
    ],
  },
  "aes-attendance": { color: "#22c55e", phones: ["aes-attendance-app.png", "aes-attendance-checkedin.png"] },
  "techpro-uae": { color: "#f97316", phones: ["techpro-m1.jpg", "techpro-m2.jpg", "techpro-m4.jpg"] },
  omnira: { color: "#06b6d4", phones: [] },
  "arabic-mt": { color: "#ec4899", phones: [] },
};

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[1.6rem] p-[5px] bg-[#1a1622] ring-1 ring-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="relative rounded-[1.25rem] overflow-hidden aspect-[9/19.5] bg-black">
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover object-top" />
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black" />
      </div>
    </div>
  );
}

// 3D stage: up to three phones fanned in perspective; spread wider on hover, tilt with the pointer.
function Stage({ p }: { p: Project }) {
  const m = media[p.slug];
  const phones = (m?.phones ?? []).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 16 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 16 });

  function onMove(e: React.PointerEvent) {
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  const desktop = p.images.find((i) => !i.src.includes("aes-"))?.src;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        px.set(0);
        py.set(0);
      }}
      className="relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden"
      style={{
        perspective: 1100,
        background: `radial-gradient(120% 90% at 50% 100%, ${m?.color ?? "#8b5cf6"}55, transparent 60%), linear-gradient(180deg, #110d18, #0a0810)`,
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${m?.color}, transparent)` }} />
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="absolute inset-0 flex items-center justify-center">
        {phones.length > 0 ? (
          phones.map((src, i) => {
            const o = i - (phones.length - 1) / 2;
            return (
              <motion.div
                key={src}
                className="absolute w-[30%] max-w-[150px]"
                animate={{
                  x: `${o * (hover ? 78 : 58)}%`,
                  z: o === 0 ? 60 : -40,
                  rotateY: o * (hover ? -22 : -14),
                  y: o === 0 ? (hover ? -14 : 0) : hover ? 6 : 14,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                style={{ zIndex: 10 - Math.abs(o) }}
              >
                <Phone src={P + src} alt={`${p.title} mobile screen ${i + 1}`} />
              </motion.div>
            );
          })
        ) : desktop ? (
          <motion.div
            className="relative w-[82%] aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            animate={{ z: hover ? 50 : 0, rotateX: hover ? 0 : 8 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            <Image src={desktop} alt={`${p.title} screenshot`} fill sizes="420px" className="object-cover object-top" />
          </motion.div>
        ) : (
          <div className="font-mono text-[12px] leading-relaxed text-ink-dim px-8">
            <p className="text-ink-faint"># Arabic dialect → English</p>
            <p>baseline_gru.bleu = 13.0</p>
            <p style={{ color: m?.color }}>marian_finetuned.bleu = 29.0 ▲</p>
            <p className="text-ink-faint mt-2"># Moroccan · Levantine · Gulf · Tunisian</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Swipeable strip of every phone screen (used on mobile, where hover doesn't exist).
function Strip({ p }: { p: Project }) {
  const phones = media[p.slug]?.phones ?? [];
  if (phones.length < 2) return null;
  return (
    <div className="mt-5 -mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none]">
      {phones.map((src, i) => (
        <Phone key={src} src={P + src} alt={`${p.title} screen ${i + 1}`} className="snap-start shrink-0 w-[132px]" />
      ))}
    </div>
  );
}

function Body({ p, i }: { p: Project; i: number }) {
  const color = media[p.slug]?.color;
  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <span className="font-display text-5xl font-medium" style={{ WebkitTextStroke: "1px rgba(237,233,245,0.4)", color: "transparent" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="text-right">
          <h3 className="font-display text-xl sm:text-2xl font-medium">{p.title}</h3>
          <p className="text-xs text-ink-faint mt-1">{p.category}</p>
        </div>
      </div>
      <p className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] font-semibold" style={{ color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        {p.status.toUpperCase()}
      </p>
      <p className="mt-3 text-sm text-ink-dim leading-relaxed line-clamp-3">{p.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 5).map((s) => (
          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-line text-ink-dim">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.links?.length) return null;
  return (
    <div className="mt-auto pt-6 flex flex-wrap gap-3">
      {p.links.map((l, k) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-semibold rounded-lg px-4 py-2 transition-colors ${
            k === 0 ? "bg-accent text-[#0b0710] hover:bg-white" : "border border-line-strong hover:border-accent hover:text-accent"
          }`}
        >
          {l.label} <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

// Desktop card: rotates like a cover-flow depending on where it sits in the viewport.
function FlowCard({ p, i, x }: { p: Project; i: number; x: MotionValue<number> }) {
  const ref = useRef<HTMLElement>(null);
  const [center, setCenter] = useState(0);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const measure = () => {
      if (ref.current) setCenter(ref.current.offsetLeft + ref.current.offsetWidth / 2);
      setVw(window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const d = useTransform(x, (v) => (center + v - vw / 2) / vw); // -0.5 … 0.5 across the screen
  const rotateY = useTransform(d, [-0.9, 0, 0.9], [28, 0, -28]);
  const scale = useTransform(d, [-0.9, 0, 0.9], [0.86, 1, 0.86]);
  const opacity = useTransform(d, [-1, -0.6, 0, 0.6, 1], [0.35, 0.8, 1, 0.8, 0.35]);

  return (
    <motion.article
      ref={ref}
      style={{ rotateY, scale, opacity, transformPerspective: 1400 }}
      className="shrink-0 w-[460px] xl:w-[500px] h-full flex flex-col rounded-3xl border border-line bg-gradient-to-b from-white/[0.04] to-transparent p-6"
    >
      <Stage p={p} />
      <div className="pt-6 flex flex-col flex-1">
        <Body p={p} i={i} />
        <Links p={p} />
      </div>
    </motion.article>
  );
}

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the track must slide so its last card lines up with the viewport edge.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="work">
      {/* desktop: vertical scroll drives a horizontal cover-flow track */}
      <section ref={section} className="hidden lg:block relative" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-20 pb-8">
          <div className="flex items-end justify-between px-16 pb-6">
            <h2 className="font-display text-5xl font-medium">
              My <span className="text-accent">Work</span>
            </h2>
            <div className="w-48 h-[2px] bg-line rounded-full overflow-hidden mb-3">
              <motion.div style={{ width: bar }} className="h-full bg-accent" />
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex flex-1 min-h-0 gap-8 px-16 items-stretch">
            {projects.map((p, i) => (
              <FlowCard key={p.slug} p={p} i={i} x={x} />
            ))}
            <div className="shrink-0 w-[380px] flex flex-col items-center justify-center text-center">
              <p className="font-display text-3xl font-medium">Want to see more?</p>
              <p className="text-ink-dim mt-3 text-sm">Every public repo, pulled live from GitHub.</p>
              <a href="#github" className="mt-6 rounded-lg bg-accent text-[#0b0710] font-semibold px-6 py-3 hover:bg-white transition-colors">
                See all repos →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* mobile + tablet: stacked cards with a swipeable screen strip */}
      <section className="lg:hidden pt-20 px-5 sm:px-10">
        <h2 className="font-display text-4xl font-medium pb-8">
          My <span className="text-accent">Work</span>
        </h2>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 50, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="rounded-3xl border border-line bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6 overflow-hidden"
            >
              <Stage p={p} />
              <div className="pt-6">
                <Body p={p} i={i} />
              </div>
              <Strip p={p} />
              <Links p={p} />
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
