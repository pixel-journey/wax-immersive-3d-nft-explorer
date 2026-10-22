"use client";

import { useId } from "react";
import type { ShowcaseScene } from "./types";

export function FlatCardList({
  scene,
  selectedId,
  onSelect,
}: {
  scene: ShowcaseScene;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <h3 id={headingId} className="text-sm font-semibold text-emerald-300/90">
        Flat list (reduced-motion friendly)
      </h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {scene.cards.map((card) => {
          const active = card.id === selectedId;
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => onSelect(card.id)}
                className={`w-full text-left rounded-xl border p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  active
                    ? "border-emerald-400 bg-emerald-500/15"
                    : "border-white/10 bg-black/40"
                }`}
                aria-pressed={active}
              >
                <p className="text-[10px] uppercase tracking-wide opacity-50">
                  {card.collection}
                </p>
                <p className="text-sm font-medium mt-0.5">{card.name}</p>
                <p className="text-[11px] opacity-40 mt-1">
                  {card.mediaKind}
                  {card.rarityLabel ? ` · ${card.rarityLabel}` : ""}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
