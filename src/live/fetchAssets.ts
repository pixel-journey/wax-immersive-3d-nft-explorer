import { cardsFromAtomicAssets, type AtomicAssetsResponse } from "./fromAtomic";
import { buildShowcaseScene } from "../engines";
import type { ShowcaseScene } from "../types";

export const DEFAULT_ATOMIC = "https://wax.api.atomicassets.io";

const NAME = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;

export interface AssetProbeResult {
  scene: ShowcaseScene | null;
  errors: string[];
}

export async function fetchOwnerShowcase(
  owner: string,
  options: {
    collection?: string;
    atomic?: string;
    signal?: AbortSignal;
    radiusPx?: number;
  } = {}
): Promise<AssetProbeResult> {
  if (!NAME.test(owner)) {
    return { scene: null, errors: ["Owner must be a valid Antelope name"] };
  }

  const host = options.atomic ?? DEFAULT_ATOMIC;
  try {
    const url = new URL("/atomicassets/v1/assets", `${host}/`);
    url.searchParams.set("owner", owner);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", "12");
    if (options.collection && NAME.test(options.collection)) {
      url.searchParams.set("collection_name", options.collection);
    }
    const res = await fetch(url.toString(), { signal: options.signal });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    const json = (await res.json()) as AtomicAssetsResponse;
    const cards = cardsFromAtomicAssets(json, { max: 12 });
    if (cards.length === 0) {
      return {
        scene: null,
        errors: ["No assets in sample page — try another owner or collection"],
      };
    }
    const scene = buildShowcaseScene(
      `live-${owner}`,
      `Live sample · ${owner}`,
      cards,
      { radiusPx: options.radiusPx ?? 260 }
    );
    scene.note =
      "Live AtomicAssets sample (first page). CSS 3D only — media may be IPFS hashes, not full URLs.";
    return { scene, errors: [] };
  } catch (e) {
    return {
      scene: null,
      errors: [`atomicassets: ${e instanceof Error ? e.message : String(e)}`],
    };
  }
}
