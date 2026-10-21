/**
 * Pure layout helpers for a CSS 3D ring of NFT cards.
 * No DOM, no WebGL — host applies transforms.
 */

import type { NftCard, SceneLayoutOptions, ShowcaseScene } from "./types";

export const DEFAULT_RADIUS = 280;
export const DEFAULT_PERSPECTIVE = 900;

export interface CardTransform {
  id: string;
  rotateY: number;
  translateZ: number;
  /** Suggested CSS transform string */
  cssTransform: string;
}

export function layoutRing(
  cards: NftCard[],
  options: SceneLayoutOptions = {}
): CardTransform[] {
  const radius = options.radiusPx ?? DEFAULT_RADIUS;
  const n = cards.length;
  if (n === 0) return [];

  return cards.map((card, i) => {
    const step = 360 / n;
    const rotateY =
      Number.isFinite(card.orbitDegrees) && card.orbitDegrees !== 0
        ? card.orbitDegrees
        : step * i;
    const translateZ =
      Number.isFinite(card.depthPx) && card.depthPx !== 0
        ? card.depthPx
        : radius;
    return {
      id: card.id,
      rotateY,
      translateZ,
      cssTransform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
    };
  });
}

export function buildShowcaseScene(
  id: string,
  title: string,
  cards: Omit<NftCard, "orbitDegrees" | "depthPx">[],
  options: SceneLayoutOptions = {}
): ShowcaseScene {
  const radius = options.radiusPx ?? DEFAULT_RADIUS;
  const perspective = options.perspectivePx ?? DEFAULT_PERSPECTIVE;
  const n = cards.length || 1;
  const step = 360 / n;

  const placed: NftCard[] = cards.map((c, i) => ({
    ...c,
    orbitDegrees: step * i,
    depthPx: radius,
  }));

  return {
    id,
    title,
    radiusPx: radius,
    perspectivePx: perspective,
    cards: placed,
    note:
      "CSS 3D ring layout. Not a full WebGL scene graph. Media URLs are illustrative.",
  };
}

export function demoPixelJourneyScene(): ShowcaseScene {
  return buildShowcaseScene(
    "pxj-demo",
    "Pixel Journey sample ring",
    [
      {
        id: "card-1",
        name: "Pixal #0001",
        collection: "pixeljourney",
        mediaKind: "image",
        rarityLabel: "Genesis",
      },
      {
        id: "card-2",
        name: "Pixal #0042",
        collection: "pixeljourney",
        mediaKind: "image",
        rarityLabel: "Rare",
      },
      {
        id: "card-3",
        name: "Pixal #1337",
        collection: "pixeljourney",
        mediaKind: "image",
        rarityLabel: "Epic",
      },
      {
        id: "card-4",
        name: "Pack Teaser",
        collection: "pixeljourney",
        mediaKind: "unknown",
        rarityLabel: "Promo",
      },
    ],
    { radiusPx: 260, perspectivePx: 1000 }
  );
}

export function demoSparseScene(): ShowcaseScene {
  return buildShowcaseScene(
    "sparse",
    "Sparse two-card stage",
    [
      {
        id: "a",
        name: "Alpha",
        collection: "demo",
        mediaKind: "image",
      },
      {
        id: "b",
        name: "Beta",
        collection: "demo",
        mediaKind: "video",
      },
    ],
    { radiusPx: 200 }
  );
}
