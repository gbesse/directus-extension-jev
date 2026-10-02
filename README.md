# Jev decision operation for Directus

A native Flow operation with an editor form and server-side DecisionPacks evaluation. Its output is a typed record suitable for a following Directus Condition operation, notification or review queue.

**v0.1.0 experimental alpha · MIT · Directus 11 · Node.js 22+**. Independent community integration.

## Install

Clone this repository into your self-hosted Directus extensions directory, install production dependencies there, then restart Directus:

```sh
git clone --branch v0.1.0 https://github.com/gbesse/directus-extension-jev.git extensions/directus-extension-jev
cd extensions/directus-extension-jev
npm ci --omit=dev
```

Set `TYPESAFE_API_KEY` in the Directus server environment. The API extension reads the server operation context. Do not add the secret to `FLOWS_ENV_ALLOW_LIST`, which exposes allowed variables in the Flow data chain. The extension has separate native `app.js` and `api.js` entries and needs no addon build step.

In a Flow, add **Jev decision**. Paste `packs/support-triage.json` into **DecisionPack**, provide an object such as `{"text":"I was charged twice"}` in **State**, and use a 30000 ms timeout. The operation returns a record with `outcome`, `answers`, pinned model and pack/input fingerprints. If the operation key is `classify`, downstream conditions can read `classify.outcome`. Map trigger data to `state` using your Flow's data chain.

Keys are server-only. Do not place them in Flow options. Network/model/validation failures reject the operation so Directus can follow its rejection path. The fallback outcome is an ordinary valid decision and must be routed explicitly. State is sent to Typesafe when using the live provider.

## Shareable demo report

Run `npm run demo:report` to capture this repository’s bundled example as one JSON object with the project purpose, version and complete demo output. The command fails if the demo fails, so the report is useful when sharing a reproducible first look or reporting unexpected behavior. The bundled demo’s data and safety boundaries still apply.

## Verification

```sh
npm ci
npm run check
npm run typecheck
npm test
npm run demo
```

Five tests cover the official extension manifest schema, native operation exports, server key selection, pinned requests, malformed inputs and provider failures/deadlines. Tested against official extension contracts package 4.0.4. A complete Directus server and Flow UI have not been exercised; this alpha is not Marketplace-certified. Fixtures simulate provider responses, not model quality.

See [reuse and provenance](docs/reuse.md), [contributing](CONTRIBUTING.md) and [security](SECURITY.md).

Host references: [Flow environment visibility](https://docs.directus.io/app/flows) and [extension manifest/types](https://github.com/directus/directus/tree/main/packages/extensions).

[Recorded verification scope](docs/verification.md).
