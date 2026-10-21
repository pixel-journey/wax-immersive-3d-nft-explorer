"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { layoutRing } from "./engines";
import type { ShowcaseScene } from "./types";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function CarouselStage({
  scene,
  className = "",
}: {
  scene: ShowcaseScene;
  className?: string;
}) {
  const headingId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(
    scene.cards[0]?.id ?? null
  );

  useEffect(() => {
    setSelectedId(scene.cards[0]?.id ?? null);
    setRotation(0);
  }, [scene.id]);

  const transforms = useMemo(
    () => layoutRing(scene.cards, { radiusPx: scene.radiusPx }),
    [scene]
  );

  const selected = scene.cards.find((c) => c.id === selectedId) ?? null;
  const step = scene.cards.length ? 360 / scene.cards.length : 45;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setRotation((r) => r + step);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setRotation((r) => r - step);
      } else if (e.key === "Home") {
        e.preventDefault();
        setRotation(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <section className={`space-y-4 ${className}`} aria-labelledby={headingId}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 id={headingId} className="font-semibold text-lg text-emerald-300">
          {scene.title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-sm bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            onClick={() => setRotation((r) => r + step)}
          >
            ← Rotate
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-sm bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            onClick={() => setRotation((r) => r - step)}
          >
            Rotate →
          </button>
        </div>
      </div>

      <p className="text-[11px] opacity-50">
        Keyboard: ← → to rotate, Home to reset
        {reducedMotion ? " · reduced motion: transitions off" : ""}
      </p>

      <div
        className="relative mx-auto h-[320px] max-w-lg"
        style={{ perspective: `${scene.perspectivePx}px` }}
        tabIndex={0}
        aria-label="NFT card carousel. Use left and right arrow keys to rotate."
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: reducedMotion ? "none" : "transform 0.45s ease",
          }}
        >
          {scene.cards.map((card) => {
            const t = transforms.find((x) => x.id === card.id);
            const active = card.id === selectedId;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedId(card.id)}
                className={`absolute w-28 h-40 rounded-xl border text-left p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  active
                    ? "border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20"
                    : "border-white/20 bg-black/80"
                }`}
                style={{
                  transform: t?.cssTransform,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                aria-pressed={active}
              >
                <p className="text-[10px] uppercase tracking-wide opacity-50">
                  {card.collection}
                </p>
                <p className="text-xs font-medium mt-1 leading-snug">{card.name}</p>
                {card.rarityLabel && (
                  <p className="text-[10px] text-emerald-400/80 mt-2">
                    {card.rarityLabel}
                  </p>
                )}
                <p className="text-[9px] opacity-40 absolute bottom-2 left-2">
                  {card.mediaKind}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm"
          aria-live="polite"
        >
          <p className="font-medium text-emerald-300">{selected.name}</p>
          <p className="text-xs opacity-60 mt-1">
            {selected.collection}
            {selected.templateId ? ` · template ${selected.templateId}` : ""}
            {selected.rarityLabel ? ` · ${selected.rarityLabel}` : ""}
          </p>
          <p className="text-[11px] opacity-40 mt-2">{scene.note}</p>
        </div>
      )}
    </section>
  );
}
