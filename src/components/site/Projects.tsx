"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Browser, Phone, Tilt } from "./Devices";
import { Fade, SectionHead } from "./Reveal";

type Visual = {
  plate: string;
  url?: string;
  desktop?: string[];
  phones?: string[];
};

// How each featured project is staged. Images are real screenshots of the shipped apps.
const featured: Record<string, Visual> = {
  thinkdesk: {
    plate: "#d8d3f0",
    url: "thinkdesk-three.vercel.app",
    desktop: [
      "/images/projects/thinkdesk-hero.jpg",
      "/images/projects/thinkdesk-chat.png",
      "/images/projects/thinkdesk-documents.png",
      "/images/projects/thinkdesk-billing.png",
    ],
  },
  "sirat-path": {
    plate: "#cfdcc9",
    url: "siratpath.vercel.app",
    desktop: ["/images/projects/sirat-path.png"],
    phones: ["/images/projects/sirat-path-mobile.jpg"],
  },
  learnwise: {
    plate: "#cdd9ea",
    url: "learnwise-app.vercel.app",
    desktop: ["/images/projects/learnwise.png"],
    phones: ["/images/projects/learnwise-mobile.jpg"],
  },
  "aes-portal": {
    plate: "#ead9bd",
    phones: [
      "/images/projects/aes-portal-workorders.jpeg",
      "/images/projects/aes-portal-dashboard.jpeg",
      "/images/projects/aes-portal-reports.jpeg",
    ],
  },
  "techpro-uae": {
    plate: "#e9cfc2",
    url: "techprouae.com",
    desktop: ["/images/projects/techpro-hero.jpg"],
  },
};

const order = ["thinkdesk", "sirat-path", "learnwise", "aes-portal", "techpro-uae"];

function Plate({ p, v }: { p: Project; v: Visual }) {
  const [shot, setShot] = useState(0);
  const desktop = v.desktop ?? [];
  const phones = v.phones ?? [];

  return (
    <div className="relative h-full min-h-[340px] sm:min-h-[460px] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden" style={{ background: v.plate }}>
      {desktop.length === 0 ? (
        // phone-only app: a flat, staggered row of screens
        <div className="w-full flex items-center justify-center gap-3 sm:gap-6">
          {phones.map((src, i) => (
            <motion.div
              key={src}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: i === 1 ? -28 : 12, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={i === 1 ? "w-[34%] max-w-[210px]" : "w-[29%] max-w-[180px]"}
            >
              <Phone src={src} alt={`${p.title} screen ${i + 1}`} />
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          <Tilt className="relative w-full max-w-[640px]" max={5}>
            <Browser src={desktop[shot]} alt={`${p.title} screenshot`} url={v.url} />
            {phones[0] && (
              <div className="absolute -bottom-6 right-2 sm:-right-6 w-[26%] max-w-[150px]" style={{ transform: "translateZ(60px)" }}>
                <Phone src={phones[0]} alt={`${p.title} on mobile`} />
              </div>
            )}
          </Tilt>
          {desktop.length > 1 && (
            <div className="mt-8 flex gap-2">
              {desktop.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setShot(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  className={`h-1.5 transition-all ${shot === i ? "w-10 bg-[#1b1a17]" : "w-5 bg-[#1b1a17]/25 hover:bg-[#1b1a17]/50"}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Card({ p, v, i, n, progress }: { p: Project; v: Visual; i: number; n: number; progress: MotionValue<number> }) {
  // earlier cards shrink and dim as later ones slide over them
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.035]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, 0.45]);

  return (
    <div className="lg:h-screen lg:sticky lg:top-0 flex items-center py-4 lg:py-0">
      <motion.article
        style={{ scale }}
        className="relative w-full lg:h-[82vh] grid lg:grid-cols-[1.25fr_1fr] bg-bg-2 border border-line origin-top overflow-hidden"
      >
        <Plate p={p} v={v} />

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center justify-between label">
            <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <span>{p.category}</span>
          </div>

          <h3 className="serif mt-8 text-5xl sm:text-6xl leading-[0.95]">{p.title}</h3>
          <p className="mt-3 text-ink-dim">{p.subtitle}</p>
          <p className="mt-6 text-sm text-ink-dim leading-relaxed">{p.description}</p>

          <ul className="mt-6 text-sm divide-y divide-line border-y border-line">
            {p.highlights.slice(0, 3).map((h) => (
              <li key={h} className="py-2.5 flex gap-3">
                <span className="text-accent">—</span>
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink-faint leading-relaxed">{p.stack.slice(0, 7).join("  ·  ")}</p>

          <div className="mt-auto pt-8 flex flex-wrap items-center gap-6">
            {p.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-1.5 text-sm font-medium">
                {l.label} <ArrowUpRight size={15} />
              </a>
            ))}
            <span className="ml-auto text-xs text-ink-faint">{p.status}</span>
          </div>
        </div>

        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-bg hidden lg:block" />
      </motion.article>
    </div>
  );
}

function Row({ p, i }: { p: Project; i: number }) {
  const img = p.images[0];
  return (
    <Fade delay={i * 0.06}>
      <a
        href={p.links?.[0]?.href ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="group grid md:grid-cols-[80px_1.2fr_1fr_160px] gap-4 md:gap-8 items-center py-8 border-b border-line"
      >
        <span className="label">{String(i + 6).padStart(2, "0")}</span>
        <div>
          <h3 className="serif text-3xl sm:text-4xl group-hover:text-accent transition-colors">{p.title}</h3>
          <p className="text-sm text-ink-faint mt-1">{p.category}</p>
        </div>
        <p className="text-sm text-ink-dim leading-relaxed line-clamp-3">{p.result}</p>
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-3 hidden md:block">
          {img ? (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="160px"
              className={`transition-transform duration-700 group-hover:scale-110 ${p.frame === "phone" ? "object-contain" : "object-cover object-top"}`}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center serif text-2xl text-ink-dim">
              29.0 <span className="text-xs ml-1 font-sans">BLEU</span>
            </span>
          )}
        </div>
      </a>
    </Fade>
  );
}

export default function Projects() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });
  const main = order.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => !!p);
  const rest = projects.filter((p) => !featured[p.slug]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionHead index="01" label="Selected work" title={["Things I've", <em key="b">built & shipped</em>]} />

        <div ref={stack} className="mt-16">
          {main.map((p, i) => (
            <Card key={p.slug} p={p} v={featured[p.slug]} i={i} n={main.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="mt-24">
          <p className="label mb-4">More builds &amp; research</p>
          <div className="border-t border-line">
            {rest.map((p, i) => (
              <Row key={p.slug} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
