import type { ShowcaseScene } from "./types";
import { layoutRing } from "./engines";

export function exportSceneJson(scene: ShowcaseScene): string {
  const transforms = layoutRing(scene.cards, { radiusPx: scene.radiusPx });
  return JSON.stringify(
    {
      ...scene,
      transforms,
      exportedAt: new Date().toISOString(),
      trust: "educational-reference",
    },
    null,
    2
  );
}

export function exportSceneMarkdown(scene: ShowcaseScene): string {
  const rows = scene.cards
    .map(
      (c) =>
        `| ${c.id} | ${c.name} | ${c.collection} | ${c.mediaKind} | ${c.orbitDegrees.toFixed(1)}° |`
    )
    .join("\n");

  return `# Showcase scene — ${scene.title}

**Id:** ${scene.id}  
**Radius:** ${scene.radiusPx}px · **Perspective:** ${scene.perspectivePx}px  
**Note:** ${scene.note}

| Id | Name | Collection | Media | Orbit |
|----|------|------------|-------|-------|
${rows}

CSS 3D educational layout — not a marketplace order book.
`;
}
