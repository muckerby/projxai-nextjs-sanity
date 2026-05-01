# Session 24 Summary — 1 May 2026

## What We Fixed

### Audit Tool "Something Went Wrong" — Root Cause Chain
Three separate issues diagnosed and resolved in sequence:

1. **SyntaxError (first test)** — Claude occasionally prepended explanatory text before the JSON object. Fixed with brace-scan extraction (find first `{` / last `}`) replacing the fragile regex strip. Commit: `fb1bd31`

2. **504 Timeout (second test)** — Vercel Hobby plan has a hard 10-second function timeout. `export const maxDuration = 60` has no effect on Hobby (Pro plan only). Sonnet was taking 15–30s. Briefly switched to Haiku as interim fix, then replaced with proper solution.

3. **Streaming architecture (final solution)** — Split `/api/audit/submit` into two endpoints:
   - `/api/audit/submit` — creates Supabase session, streams Claude tokens directly to client via `ReadableStream`. Returns immediately so Vercel timeout clock stops. Streaming keeps connection alive for full Sonnet response duration.
   - `/api/audit/save` (new) — receives completed JSON + sessionId from client, validates fields, writes to `audit_reports`, returns `accessToken`.
   - `page.tsx handleSubmit()` updated to read stream, extract `__SESSION__` prefix, brace-scan parse JSON, then call save endpoint.
   - Model reverted to `claude-sonnet-4-6`. max_tokens set to 4096 (truncation fix).

### Homepage CTA
- Free Tools section now shows AI Opportunity Audit card (links to `/audit`)
- ROAS Calculator card removed (not yet built — Phase 2)

## Strategic Discussion — Next Session Design Decisions

### 1. Question System Redesign
Current 14-question linear wizard is wide but not deep. Agreed direction:
- 4–5 universal context questions (size, type, revenue model, bottleneck)
- 2–3 topic silos branching from bottleneck answer, 5–6 deep questions each
- Branching means: "customer enquiries too slow" → completely different deep-dive than "manual data entry"
- Chat-style interface (conversational) vs. form wizard — decision pending

### 2. Brand Name Strategy in Reports
- Keep brand names in visible/ungated sections (credibility)
- Keep implementation detail (the HOW) generic or gated → that's the consultation value
- Report shows WHAT and WHY. Consultation delivers HOW.

### 3. Post-Report "At Your Pace" Portal (Major Product Idea)
User gets access to exploration space after completing audit:
- Click any opportunity → "Tell me more" / "Add more context" / "I'm interested"
- AI asks clarifying questions, gives deeper explanation
- Escalation path: "I want to talk to someone" → books call with full context already collected
- Respects how people actually buy — research privately, reach out when ready
- By the time they book, they're already half-sold
- Build scope: auth (report email = login), persistent chat, report context fed to Claude, escalation paths
- Estimated: 2–3 sessions of focused build

### Open Questions for Next Session
1. Question redesign — wizard vs. conversational chat interface?
2. Brand names — "names in summary, generic in detail" as the rule?
3. Portal — feature inside existing site, or separate authenticated product?

## Commits This Session
- `fb1bd31` — fix(audit): robust JSON extraction + maxDuration=60
- `4356dbf` — feat(homepage): replace ROAS card with AI Opportunity Audit CTA
- `bfefe48` — fix(audit): switch to haiku model (interim, reverted)
- `705ccfb` — feat(audit): streaming Claude response — Sonnet on Hobby plan, no timeout
- `76144dc` — fix(audit): increase max_tokens 2500→4096

## Current State
- `/audit` end-to-end working: 14 questions → Sonnet streaming → JSON parse → Supabase save → report page
- Streaming architecture means no Vercel plan upgrade needed
- Homepage links to `/audit` from Free Tools section
- Email gate, Resend, HubSpot not yet verified this session (deferred to Session 25 after question redesign)
