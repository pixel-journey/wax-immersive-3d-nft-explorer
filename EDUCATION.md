# Education — four cards, ninety degrees apart

> **Rung:** `npm test` passes. The host applies the CSS string. This file does not touch the DOM and it does not start WebGL.  
> **The test is the rule.** Reduced motion, which is a different flag, is [wax-reduced-motion-dashboard](https://github.com/pixel-journey/wax-reduced-motion-dashboard).

## Predict, then run

The demo ring has radius `260`. Four cards step by `360 / 4`.

| Card | rotateY | translateZ |
| --- | --- | --- |
| 1 | `0` | `260` |
| 2 | `90` | `260` |
| 3 | `180` | `260` |
| 4 | `270` | `260` |

The third transform string is `rotateY(180deg) translateZ(260px)`.

`layoutRing` treats `orbitDegrees === 0` as unset and uses `step * index` instead. On the first card that is also 0. A later card that really wants orbit 0 will not get it. Two cards are placed at `0` and `180`. An empty card list is an empty transform list. Media URLs are not fetched.
