import TechStackOrbit from "@/components/v2/TechStackOrbit";

// Section shell stays a server component; the interactive orbit is a client component.
// To change the tools, edit the RINGS array at the top of TechStackOrbit.tsx.
export default function Stack() {
  return (
    <section id="stack" className="relative py-24 sm:py-36 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[700px] h-[700px] left-1/2 top-1/3 -translate-x-1/2 bg-accent/15" />
      <div className="relative text-center px-5">
        <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-faint mb-5">
          <span className="w-8 h-px bg-accent" /> TECH STACK <span className="w-8 h-px bg-accent" />
        </p>
        <h2 className="font-display font-bold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
          Tools I <span className="font-serif italic font-normal text-accent-2">build</span> with
        </h2>
        <p className="mt-4 text-sm text-ink-faint">
          <span className="hidden md:inline">Hover</span>
          <span className="md:hidden">Tap</span> an icon to light it up
        </p>
      </div>
      <div className="relative mt-6 sm:mt-10">
        <TechStackOrbit />
      </div>
    </section>
  );
}
