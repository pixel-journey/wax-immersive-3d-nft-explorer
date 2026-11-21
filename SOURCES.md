# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | AtomicAssets product context |
| [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) | Motion preference |
| [seizure-safe animations](https://github.com/pixel-journey/wax-seizure-safe-animations) | Flash rate clamp |
| [progressive hydration](https://github.com/pixel-journey/wax-progressive-nft-metadata-hydration-grid) | Missing metadata fields |

## Product facts locked by tests

| Card | rotateY | translateZ |
| --- | --- | --- |
| 1 | 0° | 260 |
| 2 | 90° | 260 |
| 3 | 180° | 260 |
| 4 | 270° | 260 |

- Demo radius **260**; default radius when unset **280**.
- Third CSS string: `rotateY(180deg) translateZ(260px)`.
- `orbitDegrees === 0` treated as unset → `step * index`.
- Empty input → empty output.
- **Not** WebGL. Host applies CSS. Pure path does not fetch media.
