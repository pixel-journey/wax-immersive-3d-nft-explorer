# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | AtomicAssets product context |
| [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) | Motion preference |

## Product facts locked by tests

- Demo ring radius **260**; angles **0, 90, 180, 270**.
- Third CSS string: `rotateY(180deg) translateZ(260px)`.
- `orbitDegrees === 0` treated as unset → `step * index`.
- Empty input → empty output.
- **Not** WebGL. Host applies CSS.
