# Security — CSS ring layout

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty card list | empty transform list |
| Demo four-card ring | 0/90/180/270 at depth 260 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Media URLs | Host must validate and sandbox |
| Live Atomic fetch | Optional path; not the unit-tested layout core |
| Motion | Pair with reduced-motion preferences |

## Attack angles

1. Loading untrusted image URLs into a 3D stage without CSP.  
2. Marketing "WebGL explorer" from CSS transforms.

## Honesty limits

Pure layout does not touch the DOM. [docs.wax.io](https://docs.wax.io/) · [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard).
