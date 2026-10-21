# wax-immersive-3d-nft-explorer

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 1 — CSS 3D ring layout + pure engine  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **immersive NFT showcase** using a pure layout engine and **CSS 3D** transforms. No WebGL dependency in Pass 1.

Not a marketplace, not a claim that every NFT has 3D geometry.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { demoPixelJourneyScene, layoutRing } from "./src/engines";
```

## Pass 1 surface

| Piece | Role |
|-------|------|
| `layoutRing` | rotateY + translateZ per card |
| `buildShowcaseScene` | Place cards on a ring |
| `CarouselStage` | Interactive rotate + select |
| Fixtures | Pixel Journey ring · sparse stage |

## Pass 2 ideas

- Soft-fail AtomicAssets inventory → card list
- Optional Three.js layer behind a feature flag
- Keyboard / swipe controls

## License

MIT — **Pixel Journey**
