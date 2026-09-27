import { tools } from "@/lib/data";
import { toolIcons } from "./icons/ToolIcons";

function Track() {
  return (
    <div className="marquee-track">
      {[...tools, ...tools].map((tool, i) => {
        const Icon = toolIcons[tool];
        return (
          <div
            key={`${tool}-${i}`}
            className="flex items-center gap-2.5 px-6 sm:px-8 shrink-0 text-ink-dim"
            aria-hidden={i >= tools.length}
          >
            {Icon && <Icon size={22} className="shrink-0" aria-hidden={true} />}
            <span className="text-sm sm:text-base font-medium whitespace-nowrap">{tool}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Tools and technologies" className="relative py-10 border-y border-line bg-surface-soft overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10"
        style={{ background: "linear-gradient(90deg, var(--surface-soft), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10"
        style={{ background: "linear-gradient(270deg, var(--surface-soft), transparent)" }}
        aria-hidden="true"
      />
      <Track />
    </section>
  );
}
