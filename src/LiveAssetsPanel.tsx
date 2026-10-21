"use client";

import { useCallback, useId, useState } from "react";
import { fetchOwnerShowcase } from "./live/fetchAssets";
import type { ShowcaseScene } from "./types";

export function LiveAssetsPanel({
  onScene,
}: {
  onScene: (scene: ShowcaseScene) => void;
}) {
  const headingId = useId();
  const [owner, setOwner] = useState("");
  const [collection, setCollection] = useState("pixeljourney");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const load = useCallback(async () => {
    setBusy(true);
    setErrors([]);
    setStatus(null);
    const result = await fetchOwnerShowcase(owner.trim().toLowerCase(), {
      collection: collection.trim().toLowerCase() || undefined,
    });
    setErrors(result.errors);
    if (!result.scene) {
      setStatus("Probe failed — fixtures still work offline.");
      setBusy(false);
      return;
    }
    onScene(result.scene);
    setStatus(`Loaded ${result.scene.cards.length} cards (sample page).`);
    setBusy(false);
  }, [owner, collection, onScene]);

  return (
    <section
      className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 space-y-3"
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-violet-100">
        Optional live inventory
      </h3>
      <p className="text-sm text-violet-100/80">
        Soft-fail AtomicAssets first page → ring cards. Media may be bare IPFS hashes.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="owner.wam"
          className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        />
        <input
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          placeholder="collection (optional)"
          className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        />
      </div>
      <button
        type="button"
        disabled={busy || !owner.trim()}
        onClick={load}
        className="px-3 py-2 rounded-lg text-sm bg-violet-600 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      >
        {busy ? "Loading…" : "Probe owner"}
      </button>
      {status && (
        <p className="text-xs text-violet-100/90" role="status">
          {status}
        </p>
      )}
      {errors.map((e) => (
        <p key={e} className="text-xs text-amber-200/90">
          {e}
        </p>
      ))}
    </section>
  );
}
