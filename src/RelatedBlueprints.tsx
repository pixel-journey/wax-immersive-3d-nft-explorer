"use client";

import { useId } from "react";

const LINKS = [
  {
    name: "wax-atomicassets-inventory-by-owner",
    href: "https://github.com/pixel-journey/wax-atomicassets-inventory-by-owner",
    why: "Paginated / infinite-scroll inventory patterns that feed this showcase.",
  },
  {
    name: "wax-mutable-data-diff-visualizer",
    href: "https://github.com/pixel-journey/wax-mutable-data-diff-visualizer",
    why: "Inspect mutable metadata before putting an asset on the ring.",
  },
  {
    name: "wax-drops-and-pack-opening-experience",
    href: "https://github.com/pixel-journey/wax-drops-and-pack-opening-experience",
    why: "Pack unbox flows that produce the assets you might showcase.",
  },
  {
    name: "ECOSYSTEM-RESILIENCE.md (PX §11)",
    href: "https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ECOSYSTEM-RESILIENCE.md",
    why: "Do not depend on a single IPFS gateway or marketplace frontend.",
  },
] as const;

export function RelatedBlueprints({ className = "" }: { className?: string }) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Related blueprints
      </h3>
      <p className="text-sm text-white/60 mb-4">
        Showcase layout is presentation-only. Pair with inventory and data tools.
      </p>
      <ul className="space-y-3">
        {LINKS.map((l) => (
          <li key={l.href} className="text-sm">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-emerald-400 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {l.name}
            </a>
            <p className="text-white/55 text-xs mt-0.5 leading-relaxed">{l.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
