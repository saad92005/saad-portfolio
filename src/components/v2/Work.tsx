"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import CaseStudy from "./CaseStudy";
import { projects, type Project } from "@/lib/data";

const P = "/images/projects/";

type Media = {
  color: string;
  phones?: string[]; // fanned phone screens
  laptop?: string; // desktop screenshot shown on a laptop
  hero?: string; // full-bleed photo for projects without app screens
  aspect?: string; // phone screen ratio when captures are shorter than a modern phone
};

// Real captures of the shipped apps; Omnira and Arabic MT use free Unsplash photos.
const media: Record<string, Media> = {
  "sirat-path": { color: "#10b981", phones: ["sirat-m3.jpg", "sirat-m1.jpg", "sirat-m5.jpg"] },
  learnwise: { color: "#3b82f6", phones: ["learnwise-m2.jpg", "learnwise-m1.jpg", "learnwise-m4.jpg"] },
  thinkdesk: { color: "#8b5cf6", laptop: "thinkdesk-chat.png", phones: ["thinkdesk-m1.jpg"] },
  "aes-portal": { color: "#f59e0b", phones: ["aes-portal-workorders.jpeg", "aes-portal-dashboard.jpeg", "aes-portal-reports.jpeg"] },
  "aes-attendance": {
    color: "#22c55e",
    phones: ["aes-att-1.jpg", "aes-att-2.jpg"],
    aspect: "9/16",
  },
  "techpro-uae": { color: "#f97316", phones: ["techpro-m2.jpg", "techpro-m1.jpg", "techpro-m4.jpg"] },
  omnira: { color: "#06b6d4", hero: "omnira-hero.jpg" },
  "arabic-mt": { color: "#ec4899", hero: "arabic-mt-hero.jpg" },
};

const face = "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
const keep3d = { transformStyle: "preserve-3d" as const };

// The back of a device, seen halfway through the 360° turn.
function Back({ color, round, label }: { color: string; round: string; label: string }) {
  return (
    <div
      className={`absolute inset-0 ${round} ${face} grid place-items-center ring-1 ring-white/10 overflow-hidden`}
      style={{ transform: "rotateY(180deg)", background: "linear-gradient(145deg, #1d1d24, #0b0b0f 65%)" }}
    >
      <span className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at 30% 20%, ${color}, transparent 60%)` }} />
      <span className="relative font-display font-extrabold text-white/80 text-base">{label}</span>
    </div>
  );
}

function Phone({ src, alt, m, label }: { src: string; alt: string; m: Media; label: string }) {
  return (
    <div className="relative" style={keep3d}>
      <div className={`rounded-[1.6rem] p-[5px] bg-[#16161c] ring-1 ring-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] ${face}`}>
        <div className="relative rounded-[1.25rem] overflow-hidden bg-black" style={{ aspectRatio: m.aspect ?? "9/19.5" }}>
          <Image src={src} alt={alt} fill sizes="200px" className="object-cover object-top" />
          <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black" />
        </div>
      </div>
      <Back color={m.color} round="rounded-[1.6rem]" label={label} />
    </div>
  );
}

function Laptop({ src, alt, m, label }: { src: string; alt: string; m: Media; label: string }) {
  return (
    <div className="relative" style={keep3d}>
      <div className={face}>
        <div className="rounded-t-xl p-[6px] pb-0 bg-[#16161c] ring-1 ring-white/15">
          <div className="relative aspect-[16/10] rounded-t-md overflow-hidden bg-black">
            <Image src={src} alt={alt} fill sizes="420px" className="object-cover object-top" />
          </div>
        </div>
        <div className="h-3 -mx-[6%] rounded-b-xl bg-gradient-to-b from-[#2a2a33] to-[#121217] shadow-[0_30px_50px_-12px_rgba(0,0,0,0.9)]" />
      </div>
      <Back color={m.color} round="rounded-xl" label={label} />
    </div>
  );
}

// Photo card for projects without app screens, with real facts layered on top.
function HeroCard({ p, m }: { p: Project; m: Media }) {
  const chips = p.slug === "arabic-mt" ? ["BLEU 13.0 → 29.0", "4 dialects", "IEEE paper"] : p.highlights.slice(0, 3);
  return (
    <div className="relative w-[84%] aspect-[16/10]" style={keep3d}>
      <div className={`absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ${face}`}>
        <Image src={P + m.hero} alt={`${p.title} cover`} fill sizes="440px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4 text-white">
          <p className="font-display font-bold text-lg sm:text-xl">{p.title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <span key={c} className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Back color={m.color} round="rounded-2xl" label={p.title} />
    </div>
  );
}

// 3D stage: tilts with the pointer, and the device group makes a full 360° turn
// on hover (mouse) or each time it scrolls into view / is tapped (touch).
// each project gets its own turn so the section doesn't repeat one trick
const spins: ((t: number) => Record<string, number>)[] = [
  (t) => ({ rotateY: t * 360 }), // classic 360° turn
  (t) => ({ rotateX: t * 360 }), // forward flip
  (t) => ({ rotateZ: t * 360 }), // flat cartwheel
  (t) => ({ rotateX: t * 360, rotateY: t * 360 }), // diagonal tumble
  (t) => ({ rotateY: t * -720 }), // double reverse twist
  (t) => ({ rotateZ: t * -360, rotateY: t * 360 }), // corkscrew
];

function Stage({ p, i }: { p: Project; i: number }) {
  const m = media[p.slug] ?? { color: "#7c5cff" };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [turns, setTurns] = useState(0);
  const [hover, setHover] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 16 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 16 });

  useEffect(() => {
    if (!inView || window.matchMedia("(hover: hover)").matches) return;
    const id = setTimeout(() => setTurns((t) => t + 1), 150);
    return () => clearTimeout(id);
  }, [inView]);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  const phones = m.phones ?? [];
  const pair = phones.length === 2;
  const label = p.title.split(" ")[0];
  const spring = { type: "spring", stiffness: 160, damping: 18 } as const;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setHover(true);
        setTurns((t) => t + 1);
      }}
      onPointerLeave={() => {
        setHover(false);
        px.set(0);
        py.set(0);
      }}
      onClick={() => setTurns((t) => t + 1)}
      className="relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden"
      style={{
        perspective: 1100,
        background: `radial-gradient(120% 90% at 50% 100%, ${m.color}55, transparent 60%), linear-gradient(180deg, #ffffff, #f4eff9)`,
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
      <div aria-hidden="true" className="absolute left-1/2 bottom-6 -translate-x-1/2 w-2/3 h-8 rounded-[50%] blur-xl" style={{ background: `${m.color}55` }} />
      <motion.div style={{ rotateX: rx, rotateY: ry, ...keep3d }} className="absolute inset-0">
        <motion.div
          animate={spins[i % spins.length](turns)}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          style={keep3d}
          className="absolute inset-0 flex items-center justify-center"
        >
          {m.hero ? (
            <HeroCard p={p} m={m} />
          ) : m.laptop ? (
            <>
              <motion.div
                className="absolute w-[74%] -translate-x-[8%]"
                animate={{ z: hover ? 30 : 0, rotateX: hover ? 0 : 6 }}
                transition={spring}
                style={keep3d}
              >
                <Laptop src={P + m.laptop} alt={`${p.title} desktop`} m={m} label={label} />
              </motion.div>
              {phones[0] && (
                <motion.div
                  className="absolute w-[22%] max-w-[110px] right-[9%] bottom-[8%]"
                  animate={{ z: hover ? 90 : 60, y: hover ? -10 : 0, rotateY: -12 }}
                  transition={spring}
                  style={keep3d}
                >
                  <Phone src={P + phones[0]} alt={`${p.title} mobile`} m={m} label={label} />
                </motion.div>
              )}
            </>
          ) : (
            phones.map((src, i) => {
              const o = i - (phones.length - 1) / 2;
              return (
                <motion.div
                  key={src}
                  className="absolute w-[30%] max-w-[150px]"
                  animate={{
                    // two screens sit side by side; three fan out around the middle one
                    x: `${o * (pair ? (hover ? 122 : 112) : hover ? 78 : 58)}%`,
                    z: pair ? (hover ? 40 : 0) : o === 0 ? 60 : -40,
                    rotateY: o * (pair ? -10 : hover ? -22 : -14),
                    y: pair ? (hover ? -8 : 0) : o === 0 ? (hover ? -14 : 0) : hover ? 6 : 14,
                  }}
                  transition={spring}
                  style={{ zIndex: 10 - Math.abs(o), ...keep3d }}
                >
                  <Phone src={P + src} alt={`${p.title} mobile screen ${i + 1}`} m={m} label={label} />
                </motion.div>
              );
            })
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Body({ p, i }: { p: Project; i: number }) {
  const color = media[p.slug]?.color;
  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <span className="font-display text-5xl font-bold" style={{ WebkitTextStroke: "1px rgba(30,27,46,0.28)", color: "transparent" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="text-right">
          <h3 className="font-display text-xl sm:text-2xl font-bold">{p.title}</h3>
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

function Links({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <div className="mt-auto pt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-4 py-2 bg-ink text-white hover:bg-accent transition-colors"
      >
        <BookOpen size={14} /> Case study
      </button>
      {(p.links ?? []).map((l, k) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-semibold rounded-full px-4 py-2 transition-all ${
            k === 0
              ? "bg-accent/10 text-accent hover:bg-accent hover:text-white hover:shadow-[0_0_30px_-6px_var(--accent)]"
              : "border border-line-strong hover:border-accent hover:text-accent"
          }`}
        >
          {l.label} <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

// Desktop card: rotates like a cover-flow depending on where it sits in the viewport.
function FlowCard({ p, i, x, onOpen }: { p: Project; i: number; x: MotionValue<number>; onOpen: () => void }) {
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

  const d = useTransform(x, (v) => (center + v - vw / 2) / vw);
  const rotateY = useTransform(d, [-0.9, 0, 0.9], [28, 0, -28]);
  const scale = useTransform(d, [-0.9, 0, 0.9], [0.86, 1, 0.86]);
  const opacity = useTransform(d, [-1, -0.6, 0, 0.6, 1], [0.35, 0.8, 1, 0.8, 0.35]);

  return (
    <motion.article
      ref={ref}
      style={{ rotateY, scale, opacity, transformPerspective: 1400 }}
      className="shrink-0 w-[460px] xl:w-[500px] h-full flex flex-col rounded-3xl border border-line bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm p-6"
    >
      <Stage p={p} i={i} />
      <div className="pt-6 flex flex-col flex-1">
        <button type="button" onClick={onOpen} className="text-left cursor-pointer" aria-label={`Open ${p.title} case study`}>
          <Body p={p} i={i} />
        </button>
        <Links p={p} onOpen={onOpen} />
      </div>
    </motion.article>
  );
}

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

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

  const heading = (
    <h2 className="font-display font-bold tracking-[-0.02em]">
      Selected <span className="font-serif italic font-normal text-accent">work</span>
    </h2>
  );

  return (
    <div id="work">
      {/* desktop: vertical scroll drives a horizontal cover-flow track */}
      <section ref={section} className="hidden lg:block relative" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-20 pb-8">
          <div className="flex items-end justify-between px-16 pb-6 text-5xl">
            {heading}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-48 h-[2px] bg-line rounded-full overflow-hidden">
                <motion.div style={{ width: bar }} className="h-full bg-gradient-to-r from-accent to-accent-3" />
              </div>
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex flex-1 min-h-0 gap-8 px-16 items-stretch">
            {projects.map((p, i) => (
              <FlowCard key={p.slug} p={p} i={i} x={x} onOpen={() => setOpen(i)} />
            ))}
            <div className="shrink-0 w-[380px] flex flex-col items-center justify-center text-center">
              <p className="font-display text-3xl font-bold">Want to see more?</p>
              <p className="text-ink-dim mt-3 text-sm">Every public repo, pulled live from GitHub.</p>
              <a href="#github" className="mt-6 rounded-full bg-accent text-white font-semibold px-6 py-3 hover:shadow-[0_0_30px_-6px_var(--accent)] transition-shadow">
                See all repos →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* mobile + tablet: stacked cards; devices spin as each card scrolls in */}
      <section className="lg:hidden pt-20 px-5 sm:px-10">
        <div className="text-4xl pb-8">{heading}</div>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 50, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className="rounded-3xl border border-line bg-gradient-to-b from-white/80 to-white/40 p-5 sm:p-6 overflow-hidden"
            >
              <Stage p={p} i={i} />
              <button type="button" onClick={() => setOpen(i)} className="block w-full text-left pt-6" aria-label={`Open ${p.title} case study`}>
                <Body p={p} i={i} />
              </button>
              <Links p={p} onOpen={() => setOpen(i)} />
            </motion.article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <CaseStudy key={open} p={projects[open]} index={open} {...caseMedia(projects[open])} onClose={close} />
        )}
      </AnimatePresence>
    </div>
  );
}

// wide screenshots for the gallery, phone captures for the scroller
function caseMedia(p: Project) {
  const m = media[p.slug] ?? { color: "#7c62e0" };
  const wide = [...(m.hero ? [m.hero] : []), ...(m.laptop ? [m.laptop] : [])].map((f) => P + f);
  for (const im of p.images) if (!wide.includes(im.src) && p.frame === "browser") wide.push(im.src);
  const tall = (m.phones ?? []).map((f) => P + f);
  return { color: m.color, shots: wide, tall };
}
