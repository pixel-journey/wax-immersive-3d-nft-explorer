# Security — CSS ring layout

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty card list | empty transform list |
| Demo four-card ring | **0 / 90 / 180 / 270** at depth **260** |
| `orbitDegrees === 0` | treated as unset → `step * index` |
| Default radius (no override) | **280** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Media URLs | Host must validate and sandbox (CSP) |
| Live Atomic fetch | Optional path; not the unit-tested layout core |
| Motion | Pair with [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) |
| Flash rate | Pair with [seizure-safe animations](https://github.com/pixel-journey/wax-seizure-safe-animations) |

## Attack angles

1. Loading untrusted image URLs into a 3D stage without CSP.  
2. Marketing "WebGL explorer" from CSS `rotateY` / `translateZ`.  
3. Ignoring reduced-motion and spinning the ring continuously.  
4. Treating depth 0 as intentional zero depth (lab substitutes default radius).  
5. Fetching AtomicAssets inside pure layout unit tests.

## Honesty limits

Pure layout does not touch the DOM. Not a scene graph. Not WebGL.

[docs.wax.io](https://docs.wax.io/) · [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) · [seizure-safe](https://github.com/pixel-journey/wax-seizure-safe-animations) · [progressive hydration](https://github.com/pixel-journey/wax-progressive-nft-metadata-hydration-grid).
