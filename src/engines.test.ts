import { describe, expect, it } from "vitest";
import {
  buildShowcaseScene,
  demoPixelJourneyScene,
  layoutRing,
} from "./engines";

describe("layoutRing", () => {
  it("spaces four cards at 90° steps when orbit unset", () => {
    const scene = demoPixelJourneyScene();
    const transforms = layoutRing(scene.cards, { radiusPx: scene.radiusPx });
    expect(transforms).toHaveLength(4);
    expect(transforms.map((row) => row.rotateY)).toEqual([0, 90, 180, 270]);
    expect(transforms.map((row) => row.translateZ)).toEqual([260, 260, 260, 260]);
    expect(transforms[2].cssTransform).toBe("rotateY(180deg) translateZ(260px)");
  });

  it("returns empty for no cards", () => {
    expect(layoutRing([])).toEqual([]);
  });
});

describe("buildShowcaseScene", () => {
  it("assigns orbit and depth", () => {
    const s = buildShowcaseScene("t", "Test", [
      { id: "1", name: "One", collection: "c", mediaKind: "image" },
      { id: "2", name: "Two", collection: "c", mediaKind: "image" },
    ]);
    expect(s.cards[0].orbitDegrees).toBe(0);
    expect(s.cards[1].orbitDegrees).toBe(180);
    expect(s.note.toLowerCase()).toContain("css 3d");
  });
});
