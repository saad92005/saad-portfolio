"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

function Card({ p, i }: { p: Project; i: number }) {
  const img = p.images[0];
  return (
    <article className="group relative shrink-0 w-full md:w-[440px] lg:w-[480px] md:h-full border-b md:border-b-0 md:border-r border-line px-5 sm:px-10 py-10 flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <span className="font-display text-5xl font-medium">{String(i + 1).padStart(2, "0")}</span>
        <div className="text-right">
          <h3 className="font-display text-xl font-medium">{p.title}</h3>
          <p className="text-xs text-ink-faint mt-1">{p.category}</p>
        </div>
      </div>

      <div className="relative mt-8 aspect-[16/10] rounded-xl overflow-hidden border border-line bg-bg-2">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className={`transition-transform duration-700 group-hover:scale-105 ${p.frame === "phone" ? "object-contain" : "object-cover object-top"}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_40%,rgba(177,140,255,0.25),transparent_65%)]">
            <span className="font-display text-2xl font-medium">{p.title}</span>
            <span className="text-xs text-ink-faint">{p.subtitle}</span>
          </div>
        )}
      </div>

      <p className="mt-6 text-[11px] tracking-[0.2em] text-accent font-semibold">{p.status.toUpperCase()}</p>
      <p className="mt-3 text-sm text-ink-dim leading-relaxed line-clamp-4">{p.description}</p>

      <h4 className="mt-6 font-display font-medium">Tools and features</h4>
      <p className="mt-1.5 text-xs text-ink-faint leading-relaxed">{p.stack.join(", ")}</p>

      {p.links && p.links.length > 0 && (
        <div className="mt-auto pt-6 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-ink hover:text-accent transition-colors"
            >
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      )}
    </article>
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
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div id="work">
      {/* desktop: vertical scroll drives a horizontal track */}
      <section ref={section} className="hidden md:block relative" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-20">
          <h2 className="font-display text-5xl font-medium px-16 pb-8">
            My <span className="text-accent">Work</span>
          </h2>
          <motion.div ref={track} style={{ x }} className="flex flex-1 border-t border-b border-line mb-10">
            {projects.map((p, i) => (
              <Card key={p.slug} p={p} i={i} />
            ))}
            <div className="shrink-0 w-[420px] flex flex-col items-center justify-center text-center px-10">
              <p className="font-display text-3xl font-medium">Want to see more?</p>
              <p className="text-ink-dim mt-3 text-sm">Every public repo, pulled live from GitHub.</p>
              <a href="#github" className="mt-6 rounded-lg bg-accent text-[#0b0710] font-semibold px-6 py-3 hover:bg-white transition-colors">
                See all repos →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* mobile: plain vertical list */}
      <section className="md:hidden pt-20">
        <h2 className="font-display text-4xl font-medium px-5 pb-6">
          My <span className="text-accent">Work</span>
        </h2>
        <div className="border-t border-line">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
