# AI change log

This file records the purpose and technical decisions of agent-authored changes.

## 2026-09-21 — v0.1.0

- Implemented `directus-extension-jev` as a native host integration with a runnable example and synthetic verification.
- Reused DecisionPacks directly for JavaScript, or ported its finite gates with reference cases for PHP/Python; retained MIT attribution.
- Added bounded provider calls, pinned model checks and explicit failure handling. Host authorization remains with the integrating application.
- Documented verified scope and alpha limitations. Tests and type/syntax checks only; no production build or live inference performed.
- Validation: Directus extension contracts 4.0.4: 5 tests. Syntax check, TypeScript noEmit and synthetic demo passed. No full Directus host.
- Trimmed development dependencies to official extension contracts; pinned patched js-yaml and Joi development dependencies.
