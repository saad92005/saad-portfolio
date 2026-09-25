"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion, useInView } from "framer-motion";
import {
  Cpu,
  Code2,
  Brain,
  Sparkles,
  Bot,
  Languages,
  Search,
  Wand2,
  Database,
  Layers,
  Bug,
  FlaskConical,
  Rocket,
  Globe,
  MonitorSmartphone,
  Smartphone,
  Component,
  Workflow,
  Zap,
  Plug,
  GitBranch,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { stack } from "@/lib/data";
import { GithubIcon } from "./icons/BrandIcons";

type Category = "AI / ML" | "Software" | "Web / Mobile" | "Automation";

const CATEGORY_COLOR: Record<Category, string> = {
  "AI / ML": "var(--teal)",
  Software: "var(--violet)",
  "Web / Mobile": "var(--rose)",
  Automation: "var(--accent)",
};

const ICONS: Record<string, LucideIcon> = {
  Python: Code2,
  "Machine Learning": Brain,
  "Generative AI": Sparkles,
  LLMs: Bot,
  NLP: Languages,
  RAG: Search,
  "Prompt Engineering": Wand2,
  "AI Assistants": Bot,
  "AI Agents": Cpu,
  "REST APIs": Plug,
  Databases: Database,
  "Application Architecture": Layers,
  Debugging: Bug,
  Testing: FlaskConical,
  Deployment: Rocket,
  "Web Development": Globe,
  "Responsive Design": MonitorSmartphone,
  "Android Development": Smartphone,
  "React / React Native": Component,
  "Workflow Automation": Workflow,
  "AI Automation": Zap,
  APIs: Plug,
  "Data Workflows": GitBranch,
  "Microsoft Excel": Table2,
  // GithubIcon's props ({size, style}) are a compatible subset of LucideIcon's — safe to treat as one here.
  GitHub: GithubIcon as unknown as LucideIcon,
};

// smaller representative sets for narrower containers — short labels, spread across all categories
const COMPACT_LABELS = new Set([
  "Python",
  "LLMs",
  "RAG",
  "NLP",
  "AI Agents",
  "GitHub",
  "Databases",
  "Testing",
  "React / React Native",
  "AI Automation",
]);

const MEDIUM_LABELS = new Set([
  "Python",
  "Machine Learning",
  "Generative AI",
  "LLMs",
  "NLP",
  "RAG",
  "Prompt Engineering",
  "AI Assistants",
  "AI Agents",
  "REST APIs",
  "Databases",
  "Testing",
  "Web Development",
  "React / React Native",
  "AI Automation",
  "GitHub",
]);

type Node = { label: string; category: Category; icon: LucideIcon };

function buildNodes(): Node[] {
  const seen = new Set<string>();
  const nodes: Node[] = [];
  for (const group of stack) {
    for (const item of group.items) {
      if (seen.has(item)) continue;
      seen.add(item);
      const category = group.category as Category;
      nodes.push({ label: item, category, icon: ICONS[item] ?? Cpu });
    }
  }
  return nodes;
}

const ALL_NODES = buildNodes();
const COMPACT_NODES = ALL_NODES.filter((n) => COMPACT_LABELS.has(n.label));
const MEDIUM_NODES = ALL_NODES.filter((n) => MEDIUM_LABELS.has(n.label));

// deterministic pseudo-random jitter so server and client render the same layout.
// Rounded to 3dp: Math.sin/cos can differ in their last bit between server and
// browser V8 builds, which otherwise trips a hydration mismatch on the coordinates.
function hash(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return round(x - Math.floor(x));
}

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

const FULL_RADII = [18, 31, 46];
const COMPACT_RADII = [20, 36];

/** Largest-remainder apportionment: gives each ring floor(share) items, then hands
 * the leftover items one at a time to the rings with the biggest fractional share,
 * instead of rounding each ring independently (which can starve one ring of room). */
function apportion(weights: number[], total: number) {
  const sumW = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (w / sumW) * total);
  const counts = raw.map((n) => Math.max(1, Math.floor(n)));
  let remaining = total - counts.reduce((a, b) => a + b, 0);
  const byRemainder = raw
    .map((n, i) => ({ i, frac: n - Math.floor(n) }))
    .sort((a, b) => b.frac - a.frac);
  for (const { i } of byRemainder) {
    if (remaining <= 0) break;
    counts[i]++;
    remaining--;
  }
  return counts;
}

function ringPositions(nodes: Node[], radii: number[]) {
  // each ring's room-per-item is proportional to radius/count, so weighting by
  // radius keeps that roughly even across rings instead of crowding one of them
  const counts = apportion(radii, nodes.length);

  // rings with more room-per-item (radius/count) take the longest labels first
  const roomPerItem = radii.map((radius, i) => radius / counts[i]);
  const ringOrder = roomPerItem.map((_room, i) => i).sort((a, b) => roomPerItem[b] - roomPerItem[a]);
  const byLength = [...nodes].sort((a, b) => b.label.length - a.label.length);

  let cursor = 0;
  const chunks: Node[][] = new Array(radii.length);
  for (const ringIndex of ringOrder) {
    const count = counts[ringIndex];
    chunks[ringIndex] = byLength.slice(cursor, cursor + count);
    cursor += count;
  }

  const rings = radii.map((radius, r) => ({
    radius,
    items: chunks[r],
    offset: (r * Math.PI) / (chunks[r].length || 1),
  }));

  const positioned: { node: Node; x: number; y: number }[] = [];
  rings.forEach(({ radius, items, offset }, r) => {
    items.forEach((node, i) => {
      const angle = (i / items.length) * Math.PI * 2 + offset + hash(i + r * 37) * 0.05;
      positioned.push({
        node,
        x: round(50 + radius * Math.cos(angle)),
        y: round(50 + radius * Math.sin(angle)),
      });
    });
  });
  return positioned;
}

type Tier = "compact" | "medium" | "full";

const TIERS: Record<Tier, { nodes: Node[]; radii: number[] }> = {
  compact: { nodes: COMPACT_NODES, radii: COMPACT_RADII },
  medium: { nodes: MEDIUM_NODES, radii: FULL_RADII },
  full: { nodes: ALL_NODES, radii: FULL_RADII },
};

function tierForWidth(width: number): Tier {
  if (width < 420) return "compact";
  if (width < 720) return "medium";
  return "full";
}

const LEGEND: { label: Category }[] = [
  { label: "AI / ML" },
  { label: "Software" },
  { label: "Web / Mobile" },
  { label: "Automation" },
];

function Rings({ radii }: { radii: number[] }) {
  return (
    <>
      {radii.map((r, i) => (
        <div
          key={r}
          className={`absolute rounded-full border border-dashed border-line opacity-40 ${
            i === radii.length - 1 ? "orbit-spin" : ""
          }`}
          style={{ inset: `${50 - r}%` }}
        />
      ))}
    </>
  );
}

function Hub() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[13%] h-[13%] min-w-[60px] min-h-[60px] max-w-[92px] max-h-[92px] rounded-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 35% 30%, var(--rose), var(--violet) 60%, var(--bg) 100%)",
        boxShadow: "0 0 50px 6px color-mix(in srgb, var(--violet) 45%, transparent)",
      }}
    >
      <Cpu className="text-white w-1/3 h-1/3" strokeWidth={1.5} />
    </motion.div>
  );
}

/** A single node: a draggable badge plus the "string" connecting it to the hub.
 * The string is a rotated/scaled div (not SVG) so its length and angle can be
 * driven by the same drag motion values as the badge, with no unit conversion —
 * drag it and the string stretches; let go and it snaps back like elastic. */
function Node({
  node,
  restX,
  restY,
  center,
  containerRef,
  index,
  active,
}: {
  node: Node;
  restX: number;
  restY: number;
  center: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  active: boolean;
}) {
  const Icon = node.icon;
  const reduceMotion = useReducedMotion();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const idleControls = useRef<ReturnType<typeof animate>[]>([]);

  function stopIdle() {
    idleControls.current.forEach((c) => c.stop());
    idleControls.current = [];
  }

  function startIdle() {
    if (reduceMotion) return;
    const ampX = 5 + hash(index * 3 + 1) * 6;
    const ampY = 5 + hash(index * 3 + 2) * 6;
    const durX = 4.5 + hash(index * 3 + 3) * 3;
    const durY = 4.5 + hash(index * 3 + 4) * 3;
    idleControls.current = [
      animate(dragX, [0, ampX, 0, -ampX, 0], { duration: durX, repeat: Infinity, ease: "easeInOut" }),
      animate(dragY, [0, -ampY, 0, ampY, 0], { duration: durY, repeat: Infinity, ease: "easeInOut" }),
    ];
  }

  // gentle idle drift by default — dragging takes over, then it resumes once released.
  // Gated to `active` (section in viewport) so ~24 nodes don't run 48 concurrent
  // infinite animations in the background the entire time the page is open.
  useEffect(() => {
    if (active && !reduceMotion) {
      startIdle();
    } else {
      stopIdle();
    }
    return stopIdle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, active]);

  const length = useTransform([dragX, dragY], (v) => {
    const [dx, dy] = v as [number, number];
    const ddx = restX - center + dx;
    const ddy = restY - center + dy;
    return Math.hypot(ddx, ddy);
  });
  const angle = useTransform([dragX, dragY], (v) => {
    const [dx, dy] = v as [number, number];
    const ddx = restX - center + dx;
    const ddy = restY - center + dy;
    return (Math.atan2(ddy, ddx) * 180) / Math.PI;
  });

  function snapBack() {
    const opts = reduceMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 260, damping: 14 };
    Promise.all([animate(dragX, 0, opts), animate(dragY, 0, opts)]).then(startIdle);
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none border-t border-dashed"
        style={{
          left: center,
          top: center,
          width: length,
          rotate: angle,
          transformOrigin: "0 0",
          borderColor: CATEGORY_COLOR[node.category],
          opacity: 0.35,
        }}
      />
      <motion.div
        drag={!reduceMotion}
        dragElastic={0.55}
        dragMomentum={false}
        dragConstraints={containerRef}
        onDragStart={stopIdle}
        onDragEnd={snapBack}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        whileHover={{ scale: 1.12 }}
        whileDrag={{ scale: 1.2, zIndex: 30 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.02, ease: [0.16, 1, 0.3, 1] }}
        data-cursor-hover
        data-cursor-text={node.label}
        className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-full border bg-bg-raised/90 backdrop-blur-sm whitespace-nowrap text-[10.5px] sm:text-xs cursor-grab active:cursor-grabbing touch-none"
        style={{
          left: restX,
          top: restY,
          x: dragX,
          y: dragY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: `color-mix(in srgb, ${CATEGORY_COLOR[node.category]} 45%, transparent)`,
          color: "var(--ink-dim)",
        }}
      >
        <Icon size={12} strokeWidth={1.75} style={{ color: CATEGORY_COLOR[node.category] }} />
        {node.label}
      </motion.div>
    </>
  );
}

export default function SkillConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const inView = useInView(containerRef, { margin: "200px 0px 200px 0px" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tier = width ? tierForWidth(width) : null;
  const active = tier ? TIERS[tier] : null;
  const positioned = active ? ringPositions(active.nodes, active.radii) : [];
  const center = (width ?? 0) / 2;

  return (
    <div>
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{ width: "min(92vw, 1000px)", aspectRatio: "1 / 1" }}
      >
        {active && <Rings radii={active.radii} />}
        <Hub />
        {active &&
          width &&
          positioned.map(({ node, x, y }, i) => (
            <Node
              key={node.label}
              node={node}
              restX={(x / 100) * width}
              restY={(y / 100) * width}
              center={center}
              containerRef={containerRef}
              index={i}
              active={inView}
            />
          ))}
      </div>

      <div className="mt-8 sm:mt-14 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-ink-faint font-mono">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLOR[l.label] }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
