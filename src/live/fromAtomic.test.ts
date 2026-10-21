import { describe, expect, it } from "vitest";
import { cardsFromAtomicAssets } from "./fromAtomic";

describe("cardsFromAtomicAssets", () => {
  it("maps rows and caps max", () => {
    const cards = cardsFromAtomicAssets(
      {
        data: [
          {
            asset_id: "1001",
            collection: { collection_name: "pixeljourney" },
            data: { name: "Pixal", img: "QmHash" },
            template: { template_id: 1 },
          },
          {
            asset_id: "1002",
            collection: "other",
            data: { video: "QmVid" },
          },
        ],
      },
      { max: 10 }
    );
    expect(cards).toHaveLength(2);
    expect(cards[0].collection).toBe("pixeljourney");
    expect(cards[0].mediaKind).toBe("image");
    expect(cards[1].mediaKind).toBe("video");
  });
});
