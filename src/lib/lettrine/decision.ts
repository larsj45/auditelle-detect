// The editorial decision recorded on a report. This is what turns a signal
// into documentation: the decision is always the editors', never the tool's.

export const EDITORIAL_DECISIONS = ['proceed', 'clarify', 'reject_other', 'no_action'] as const
export type EditorialDecision = typeof EDITORIAL_DECISIONS[number]

export const MAX_DECISION_NOTE = 4000

export type DecisionValidation =
  | { ok: true; decision: EditorialDecision; note: string | null }
  | { ok: false; errorCode: 'invalid_decision' | 'note_too_long' }

export function isEditorialDecision(value: unknown): value is EditorialDecision {
  return typeof value === 'string' && (EDITORIAL_DECISIONS as readonly string[]).includes(value)
}

export function validateDecision(payload: unknown): DecisionValidation {
  if (!payload || typeof payload !== 'object') return { ok: false, errorCode: 'invalid_decision' }
  const body = payload as Record<string, unknown>
  if (!isEditorialDecision(body.decision)) return { ok: false, errorCode: 'invalid_decision' }
  const raw = typeof body.note === 'string' ? body.note.trim() : ''
  if (raw.length > MAX_DECISION_NOTE) return { ok: false, errorCode: 'note_too_long' }
  return { ok: true, decision: body.decision, note: raw || null }
}
