# wax-immersive-3d-nft-explorer

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 4 complete  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **CSS 3D NFT showcase** with pure layout math, optional AtomicAssets sample, scene export, keyboard controls, and an accessible **flat list** when reduced motion is preferred.

Not a marketplace. WebGL is out of scope for this pass set.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { demoPixelJourneyScene, layoutRing } from "./src/engines";
```

## Surface

| Layer | Features |
|-------|----------|
| Engine | Ring orbit / depth transforms |
| Stage | CSS 3D carousel or flat list |
| Live | Soft-fail owner inventory sample |
| Export | JSON + markdown |
| A11y | Keyboard, reduced-motion path |

## License

MIT — **Pixel Journey**

## What the mapper actually does

`cardsFromAtomicAssets` is pure. The test maps two rows: a `data.img` of `QmHash` becomes `image`, and a later row with `data.video` becomes `video`. Video is checked first, so a row with both fields would be video. Collection may be a string or `{ collection_name }`. Missing media is `unknown`. `max` stops the list.

It does not fetch. It does not read `schematypes`. A `video` string is whatever the row already contains, not a gateway race. v2 backing is unrelated: this function never sees `tokens_to_back`.
