import { TECH_STACK } from "@/data/portfolio";

/**
 * TechTicker — infinite scrolling marquee of tech names.
 * Pure CSS animation (no Framer Motion overhead).
 * Items duplicated for seamless loop.
 */
export function TechTicker() {
  // Duplicate for seamless loop
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      className="relative py-6 overflow-hidden border-y border-white/[0.05]"
      aria-label="Technology stack"
    >
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg-base), transparent)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--color-bg-base), transparent)",
          zIndex: 1,
        }}
      />

      {/* Marquee track */}
      <div
        className="animate-ticker flex gap-12"
        style={{ width: "max-content" }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <div
              className="w-1.5 h-1.5 rounded-full bg-teal-500/50"
            />
            <span className="text-sm text-white/30 font-sans font-medium tracking-wide whitespace-nowrap hover:text-white/60 transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
