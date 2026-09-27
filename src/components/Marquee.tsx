import { marqueeTools } from "@/lib/data";
import ToolIcon from "./icons/ToolIcon";

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14" aria-hidden={ariaHidden}>
      {marqueeTools.map((tool, i) => (
        <div
          key={`${tool.name}-${i}`}
          className="flex items-center gap-2.5 text-ink-faint shrink-0 grayscale hover:grayscale-0 hover:text-ink transition-[filter,color] duration-300"
        >
          <ToolIcon tool={tool} size={22} />
          <span className="font-mono text-sm whitespace-nowrap">{tool.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Tools and technologies" className="relative py-14 border-y border-line overflow-hidden">
      <div className="marquee-track">
        <Track />
        <Track ariaHidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent" />
    </section>
  );
}
