// Purpose: Run the Flow operation's shared engine with a labeled offline provider fixture.
import { readFile } from 'node:fs/promises';
import { runDecision } from '../src/index.mjs';
const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const result = await runDecision(await read('../packs/support-triage.json'), await read('./billing-state.json'), { provider: async () => read('./synthetic-billing-response.json') });
console.log(JSON.stringify({ syntheticFixture: true, record: result }, null, 2));
