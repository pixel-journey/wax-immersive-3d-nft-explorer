'use client';

import React, { useState } from 'react';
import { CarouselStage } from '../src/CarouselStage';
import { demoPixelJourneyScene, demoSparseScene } from '../src/engines';
import type { ShowcaseScene } from '../src/types';

export default function ImmersiveExplorerPage() {
  const [scene, setScene] = useState<ShowcaseScene>(demoPixelJourneyScene());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header>
          <p className="text-xs uppercase tracking-widest text-emerald-400/80">
            Pixel Journey · Explorer
          </p>
          <h1 className="text-2xl font-bold text-emerald-400 mt-1">
            IMMERSIVE 3D NFT EXPLORER
          </h1>
          <p className="text-sm opacity-60 mt-2 max-w-xl">
            Educational CSS 3D ring layout for NFT cards. No WebGL dependency in
            Pass 1. Not a marketplace.
          </p>
        </header>

        <section
          className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100/90"
          role="note"
        >
          <p className="font-medium">Scope</p>
          <ul className="list-disc pl-5 space-y-1 text-xs leading-relaxed mt-1">
            <li>Pure layout engine + CSS transforms — works offline.</li>
            <li>Media URLs optional; fixtures are illustrative.</li>
            <li>WebGL / Three.js is an optional later pass, not required here.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            onClick={() => setScene(demoPixelJourneyScene())}
          >
            Pixel Journey ring
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            onClick={() => setScene(demoSparseScene())}
          >
            Sparse stage
          </button>
        </div>

        <CarouselStage scene={scene} />

        <p className="text-[11px] opacity-40">
          Trust label: educational-reference · Collection names and mints are
          demo data unless you wire live AtomicAssets later.
        </p>
      </div>
    </div>
  );
}
