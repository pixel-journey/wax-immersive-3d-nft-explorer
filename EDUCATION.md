# Education — four cards, ninety degrees apart

> **Rung:** `npm test` passes. The host applies the CSS string. This file does not touch the DOM and it does not start WebGL.  
> **The test is the rule.** Reduced motion: [wax-reduced-motion-dashboard](https://github.com/pixel-journey/wax-reduced-motion-dashboard). Flash limits: [seizure-safe animations](https://github.com/pixel-journey/wax-seizure-safe-animations).

Official context: [docs.wax.io](https://docs.wax.io/) (AtomicAssets media is product context only; layout is pure).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Place four cards at 0 / 90 / 180 / 270 with depth 260 |
| Intermediate | Explain orbit 0 treated as unset |
| Masterclass | Refuse to call this a WebGL scene graph |

---

## Beginner — one scene

The demo ring has radius **260**. Four cards step by `360 / 4`.

| Card | rotateY | translateZ |
| --- | --- | --- |
| 1 | `0` | `260` |
| 2 | `90` | `260` |
| 3 | `180` | `260` |
| 4 | `270` | `260` |

The third transform string is `rotateY(180deg) translateZ(260px)`.

```bash
npm test
```

---

## Intermediate

`layoutRing` treats `orbitDegrees === 0` as **unset** and uses `step * index` instead. On the first card that is also 0. A later card that really wants orbit 0 will not get it (same for depth 0 → radius).

Two cards are placed at `0` and `180`. An empty card list is an empty transform list. Media URLs are not fetched by the pure layout path.

Default radius when not specified is **280**; the Pixel Journey demo overrides to **260**.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Claim WebGL from CSS | Pure string transforms only |
| Fetch media in layout tests | not on pure path |
| Ignore reduced motion | host must honor [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) |

---

## Masterclass

### Common mistakes

1. Claiming WebGL or Three.js from CSS `rotateY`.  
2. Fetching media inside unit tests of layout.  
3. Ignoring reduced-motion hosts that should flatten the ring.  
4. Treating depth 0 as intentional zero depth (lab uses default radius).

### Exercises

1. Four-card angles? (**0, 90, 180, 270**.)  
2. Empty list? (**`[]`**.)  
3. Is media loaded by `layoutRing`? (**No**.)

---

## What this course will not teach

- WebGL scene graphs
- Live AtomicAssets as a required dependency of the layout math
- Medical or WCAG claims from transforms alone
