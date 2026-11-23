# AI handoff — CSS card ring

## Non-negotiables

1. Cards 1..4 at radius 260: rotateY 0°, 90°, 180°, 270°; translateZ 260.
2. Demo radius **260**. Default radius when unset **280**.
3. Third CSS string: `rotateY(180deg) translateZ(260px)`.
4. `orbitDegrees === 0` is treated as unset → `step * index`.
5. Empty input → empty output.
6. **Not** WebGL. The host applies CSS. The pure path does not fetch media.
7. Reduced-motion and flash-rate clamps are sibling labs. This file only builds the transform string.

## Prompt seeds

- "CSS for card 3 at radius 260."
- "orbitDegrees 0 — custom angle or step times index?"
- "Refuse a WebGL scene inside the unit test."

## Do not

- Fetch NFT media in the pure path.
- Call this a 3D engine.
