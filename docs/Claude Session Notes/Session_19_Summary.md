# ProjxAI Session 19 Summary
**Date:** 22 April 2026  
**Session focus:** AI Opportunity Audit webapp — full specification

---

## What was done

### 1. Source documents read

- `docs/Claude Session Notes/ProjxAI_Session18_Summary.md` — confirmed CEO Coaching page live, Audit webapp next priority
- `docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategic_Foundation_v1.1.md` — Part 5 (Smart Tools) read in full; Part 12 Operating Principles confirmed: "Audit webapp ships before anything else new"

---

### 2. AI Opportunity Audit Webapp Specification — produced

**File:** `docs/ProjxAI Digital Business/Strategy Work/AI_Opportunity_Audit_Spec_v1.md`

Full 13-section specification covering:

**Architecture decisions made:**
- Gate at report reveal (not at start) — highest-converting pattern for intent-based tools
- Structured multi-choice questions (not open chat) — SME UX, scoreable, 3-minute completion
- Claude API called ONCE at report generation (not adaptive per-question) — reliable, cheap, debuggable
- Supabase Postgres for audit data (not Sanity — Sanity is CMS, not relational data store)
- Phase 1 portal = magic link from Resend email only (no Clerk/Supabase Auth until Phase 2)
- Phase 1 pricing = free with email gate (Stripe $295 cold walk-up deferred to Phase 2)

**Question flow:** 13 questions across 4 sections (Business context / Operations / AI readiness / Priorities). 2-3 branching rules. Optional 14th free-text field. Estimated completion time: 2.5-4 minutes.

**Report structure:** AI Opportunity Score (0-100), headline, executive summary, 3 priority opportunity areas, 2-3 quick wins, investment estimate, risk factors, next step CTA.

**Claude API approach:** `claude-sonnet-4-6`, temperature 0.3, JSON output, ~$0.08-0.15 AUD per audit. Single API call post-submission.

**HubSpot sync:** 8 custom properties to be created before Session 20 build. Contact create/update + note on gate.

**Route structure:**
- `/audit` — main flow
- `/audit/report/[reportId]` — public report (token-based, 12-month expiry)
- `/portal/audit/[reportId]` — thin portal wrapper (Phase 1)
- `/api/audit/submit` — answers → Claude API → Supabase
- `/api/audit/gate` — email → Resend + HubSpot + Sanity lead
- `/api/audit/report/[reportId]` — token-validated report fetch

**Task breakdown:**
- Session 20: Database setup + question flow + Claude API integration
- Session 21: Report components + gate UI + email + HubSpot sync
- Session 22: Polish + mobile + nav integration + deploy

**Open decisions for Michael** (8 items requiring confirmation before Session 20 build starts — see Section 11 of spec)

---

## No code written

Per the session brief: no code until spec is reviewed and approved by Michael.

---

## All 8 decisions confirmed (end of Session 19)

| D | Decision | Answer |
|---|---|---|
| D1 | Score ring | Circular progress ring (CSS) |
| D2 | "Other" Q1 | 250-char text input |
| D3 | Revenue question | Removed entirely — 12 questions total |
| D4 | Warm bypass | URL param: `/audit?bypass=SECRETWORD` (env var `AUDIT_BYPASS_SECRET`) |
| D5 | Report URL | Token in URL — shareable |
| D6 | Supabase | Project `projxai` live — ID: `ljydldlmodnhgascgtdo` — Sydney |
| D7 | Portal | `portal.projxai.com.au` — CNAME added in Cloudflare, domain to add in Vercel |
| D8 | Auto-advance | Auto-advance on radio; Continue button for checkboxes |

## Infrastructure completed (end of Session 19)

All pre-build infrastructure is done. Nothing outstanding before Session 20.

| Item | Status |
|---|---|
| Supabase project `projxai` — ID: `ljydldlmodnhgascgtdo` — Sydney | ✅ Live |
| Cloudflare CNAME: `portal → cname.vercel-dns.com` (DNS only) | ✅ Added |
| Vercel domain: `portal.projxai.com.au` → Production | ✅ Connected |
| `NEXT_PUBLIC_SUPABASE_URL` in Vercel | ✅ Added |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel | ✅ Added |
| `SUPABASE_SERVICE_ROLE_KEY` in Vercel | ✅ Added |
| `AUDIT_BYPASS_SECRET` in Vercel | ✅ Added |
| `ANTHROPIC_API_KEY` in Vercel (new key: `ProjxAI-Audit`) | ✅ Added |
| Anthropic billing: US$20 loaded, auto-reload $15 at $5 threshold | ✅ Done |
| HubSpot custom properties (8 items, spec Section 8.1) | ⏳ Session 20 or 21 |
| Local `.env` file — Supabase keys + bypass secret | ⏳ Start of Session 20 |

---

## Kick-off prompt for Session 20

```
Session 20 — AI Opportunity Audit webapp build begins. All infrastructure is in place (Supabase live, all env vars in Vercel, Anthropic API key + billing active, portal.projxai.com.au connected). Spec is fully approved — read docs/ProjxAI Digital Business/Strategy Work/AI_Opportunity_Audit_Spec_v1.md in full before writing a line of code.

Pre-code: add Supabase keys + AUDIT_BYPASS_SECRET to local .env file (values are in Vercel env vars — copy them).

Session 20 scope:
1. Create Supabase tables: audit_sessions + audit_reports (schema in spec Section 5.2)
2. Install @supabase/supabase-js and confirm @anthropic-ai/sdk is installed
3. Build /audit intro screen + 12-question flow (React state machine, branching rules in spec Section 3.4 — note: Q3 revenue removed, 12 questions total not 13)
4. Build /api/audit/submit route — receive answers → call Claude API (claude-sonnet-4-6, temp 0.3, JSON output) → write to Supabase → return report JSON
5. Test Claude system prompt (spec Section 5.4) against 3 sample answer sets before wiring to frontend

Exit criteria: submitting 12 answers via the /audit page returns valid report JSON and the record is visible in Supabase dashboard.
No report UI until Session 21. No gate until Session 21. Architecture decisions are final — build, don't re-litigate.
```
