// Purpose: Register a native Directus Flow operation; secrets come only from the server environment.
import { runDecision } from './src/index.mjs';
export default {
  id: 'gbesse-jev-decision',
  async handler({ pack, state, timeoutMs = 30000 }, { env }) {
    return runDecision(typeof pack === 'string' ? JSON.parse(pack) : pack, typeof state === 'string' ? JSON.parse(state) : state, { apiKey: env.TYPESAFE_API_KEY, timeoutMs: Number(timeoutMs) });
  },
};
