# VERIFICATION-LOG — wax-immersive-3d-nft-explorer

**Trust label:** `educational-reference`  
**Updated:** 2026-10-22 (Pass 2)

| Claim | Status | Evidence |
|-------|--------|----------|
| layoutRing / buildShowcaseScene | **verified** (unit) | `src/engines.test.ts` |
| cardsFromAtomicAssets | **verified** (unit) | `src/live/fromAtomic.test.ts` |
| exportScene JSON/MD | **verified** (unit) | `src/exportScene.test.ts` |
| Live AtomicAssets always up | **not claimed** | soft-fail |
| WebGL required | **not claimed** | CSS 3D only |

```bash
npm test && npm run typecheck
```
