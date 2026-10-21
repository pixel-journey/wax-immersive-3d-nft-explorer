/**
 * Educational scene graph for an immersive NFT showcase.
 * Pass 1 uses CSS 3D transforms — no WebGL required.
 */

export type MediaKind = "image" | "video" | "unknown";

export interface NftCard {
  id: string;
  name: string;
  collection: string;
  templateId?: string;
  mediaUrl?: string;
  mediaKind: MediaKind;
  rarityLabel?: string;
  /** Degrees around the carousel ring */
  orbitDegrees: number;
  /** Depth offset in px for CSS translateZ */
  depthPx: number;
}

export interface ShowcaseScene {
  id: string;
  title: string;
  radiusPx: number;
  perspectivePx: number;
  cards: NftCard[];
  note: string;
}

export interface SceneLayoutOptions {
  radiusPx?: number;
  perspectivePx?: number;
}
