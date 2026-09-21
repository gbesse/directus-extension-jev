// Purpose: Check the operation's public contract without generating a bundle.
import { runDecision } from '../src/index.mjs';
import type { Pack } from '@gbesse/decisionpacks';
declare const pack: Pack;
const outcome: string = (await runDecision(pack, { text: 'fixture' })).outcome;
void outcome;
