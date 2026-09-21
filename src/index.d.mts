// Purpose: Type the Directus Flow operation's decision seam.
import type { Pack, JSONValue, Provider, DecisionRecord } from '@gbesse/decisionpacks';
export function runDecision(pack: Pack, state: Record<string, JSONValue>, options?: { provider?: Provider; apiKey?: string; timeoutMs?: number; signal?: AbortSignal }): Promise<DecisionRecord>;
