/**
 * Map AtomicAssets API rows to showcase cards (pure, no fetch).
 */

import type { MediaKind, NftCard } from "../types";

export interface AtomicAssetRow {
  asset_id?: string;
  name?: string;
  collection?: { collection_name?: string } | string;
  template?: { template_id?: string | number };
  data?: { name?: string; img?: string; video?: string };
  immutable_data?: { name?: string; img?: string; video?: string };
}

export interface AtomicAssetsResponse {
  data?: AtomicAssetRow[];
  success?: boolean;
}

function collectionName(row: AtomicAssetRow): string {
  const c = row.collection;
  if (typeof c === "string") return c;
  return c?.collection_name ?? "unknown";
}

function mediaOf(row: AtomicAssetRow): { url?: string; kind: MediaKind } {
  const data = row.data ?? row.immutable_data ?? {};
  if (typeof data.video === "string" && data.video) {
    return { url: data.video, kind: "video" };
  }
  if (typeof data.img === "string" && data.img) {
    return { url: data.img, kind: "image" };
  }
  return { kind: "unknown" };
}

export function cardsFromAtomicAssets(
  payload: AtomicAssetsResponse,
  options: { max?: number; radiusPx?: number } = {}
): Omit<NftCard, "orbitDegrees" | "depthPx">[] {
  const max = options.max ?? 12;
  const rows = payload.data ?? [];
  const out: Omit<NftCard, "orbitDegrees" | "depthPx">[] = [];

  for (const row of rows) {
    if (out.length >= max) break;
    const id = row.asset_id ?? `row-${out.length}`;
    const media = mediaOf(row);
    const name =
      row.name ??
      row.data?.name ??
      row.immutable_data?.name ??
      `Asset ${id}`;
    const templateId =
      row.template?.template_id !== undefined
        ? String(row.template.template_id)
        : undefined;

    out.push({
      id,
      name,
      collection: collectionName(row),
      templateId,
      mediaUrl: media.url,
      mediaKind: media.kind,
    });
  }

  return out;
}
