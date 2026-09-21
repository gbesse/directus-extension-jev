// Purpose: Validate Directus extension metadata, native entrypoints and bounded decision behavior.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ExtensionManifest, defineOperationApi, defineOperationApp } from '@directus/extensions';
import app from '../app.js';
import api from '../api.js';
import { runDecision } from '../src/index.mjs';
const read = async p => JSON.parse(await readFile(new URL(p, import.meta.url), 'utf8'));
const pack = await read('../packs/support-triage.json'), state = await read('../examples/billing-state.json'), fixture = await read('../examples/synthetic-billing-response.json');
test('manifest and native operation entrypoints satisfy the official SDK contract', async () => {
  const manifest = ExtensionManifest.parse(await read('../package.json'));
  assert.equal(manifest['directus:extension'].type, 'operation');
  assert.equal(defineOperationApi(api).id, defineOperationApp(app).id); assert.equal(app.options.length, 3);
  assert.ok(!JSON.stringify(app).includes('apiKey'));
});
test('Flow engine returns a full decision record without writing application data', async () => {
  const result = await runDecision(pack, state, { provider: async () => fixture }); assert.equal(result.outcome, 'billing'); assert.equal(result.schemaVersion, 1);
});
test('native handler uses only the server environment key and preserves the model pin', async () => {
  const original = globalThis.fetch; let request;
  globalThis.fetch = async (url, options) => { request = { url: String(url), ...options }; return new Response(JSON.stringify(fixture), { headers: { 'content-type': 'application/json' } }); };
  try {
    const result = await api.handler({ pack: JSON.stringify(pack), state: JSON.stringify(state), apiKey: 'attacker' }, { env: { TYPESAFE_API_KEY: 'server-only' } });
    assert.equal(result.outcome, 'billing'); assert.equal(request.headers.authorization, 'Bearer server-only'); assert.equal(JSON.parse(request.body).model, pack.model); assert.ok(request.signal); assert.equal(request.redirect, 'error');
  } finally { globalThis.fetch = original; }
});
test('HTTP errors reject the Flow step', async () => {
  const original = globalThis.fetch; globalThis.fetch = async () => new Response('down', { status: 503 });
  try { await assert.rejects(api.handler({ pack, state }, { env: { TYPESAFE_API_KEY: 'fixture' } }), /503/); }
  finally { globalThis.fetch = original; }
});
test('invalid state and blocked providers cannot produce successful decisions', async () => {
  await assert.rejects(runDecision(pack, {}, { provider: async () => fixture }), /input/);
  await assert.rejects(runDecision(pack, state, { provider: () => new Promise(() => {}), timeoutMs: 5 }), /timeout/);
});
