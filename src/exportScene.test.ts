import { describe, expect, it } from "vitest";
import { demoPixelJourneyScene } from "./engines";
import { exportSceneJson, exportSceneMarkdown } from "./exportScene";

describe("exportScene", () => {
  it("json includes transforms", () => {
    const json = JSON.parse(exportSceneJson(demoPixelJourneyScene()));
    expect(json.transforms).toHaveLength(4);
    expect(json.trust).toBe("educational-reference");
  });

  it("markdown lists cards", () => {
    const md = exportSceneMarkdown(demoPixelJourneyScene());
    expect(md).toContain("Pixal");
    expect(md).toContain("Orbit");
  });
});
