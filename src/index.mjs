// Purpose: Execute the shared DecisionPacks runtime from a Directus operation with bounded input and time.
import { evaluate, createJevProvider, validatePack } from '@gbesse/decisionpacks';
import { snapshot, ensure } from './contracts.mjs';
export async function runDecision(pack, state, { provider, apiKey, timeoutMs = 30000, signal } = {}) {
  pack = snapshot(pack); state = snapshot(state); validatePack(pack);
  ensure(JSON.stringify({ pack, state }).length <= 100000, 'Decision input exceeds 100000 characters');
  return evaluate(pack, state, { provider: provider ?? createJevProvider({ apiKey, timeoutMs }), timeoutMs, signal });
}
