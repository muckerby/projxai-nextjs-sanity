# Session 20 — AI Opportunity Audit Webapp Foundation

**Date:** 24 April 2026
**Duration:** Full session
**Status:** EXIT CRITERIA MET

---

## What Was Built

Full audit webapp foundation — code complete, deployed to production, Claude prompt validated.

### Files Created / Modified

| File | Status | Notes |
|---|---|---|
| `src/app/audit/page.tsx` | Created | 12-question state machine, intro + results phases |
| `src/app/api/audit/submit/route.ts` | Created | Claude API + Supabase write, full error handling |
| `src/lib/supabase.ts` | Created | Lazy singleton, falls back to NEXT_PUBLIC_SUPABASE_URL |
| `docs/supabase_audit_tables.sql` | Created | DDL for audit_sessions + audit_reports with RLS |
| `scripts/test-audit-prompt.mjs` | Created | 3-profile Claude prompt test harness |
| `scripts/setup-audit.mjs` | Created | Combined setup + test runner |

### Infrastructure

- **Supabase tables:** audit_sessions + audit_reports created and accessible
- **Vercel env vars:** All 5 set (ANTHROPIC_API_KEY, AUDIT_BYPASS_SECRET, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
- **Vercel deployment:** READY — projxai.com.au/audit is live

---

## Claude Prompt Test Results (ALL PASSED)

Run: `node scripts/test-audit-prompt.mjs`

**Profile A** — Solo electrician, no AI, no budget
- PASSED | Score validated | Readiness: early
- Correctly flagged as foundation-needed

**Profile B** — Accounting firm, 6-20 team, mid budget
- PASSED | Score: intermediate readiness
- Investment: $5,000-$15,000
- Risk factors: Previous AI rollout didn't stick, Data security and privacy

**Profile C** — B2B distributor, 35 people, experienced, $20k-$50k budget
- PASSED (31.1s) | Score: 92/100 — "High readiness — AI investment will pay back fast. Move quickly."
- Readiness: advanced
- Headline grounded in specific Monday sales report answer
- Investment: $15,000-$40,000

Token usage: ~1849 in / ~1434 out per call

---

## Technical Issues Resolved This Session

1. **FUSE mount null byte injection** — Write tool appends null bytes to files on this FUSE mount. Fix: always use Python `open(path, 'wb')` for file writes in shell.
2. **sed truncating files on FUSE** — sed partial writes destroy files silently. Never use sed on FUSE-mounted files. Use Write tool or Python.
3. **SUPABASE_URL vs NEXT_PUBLIC_SUPABASE_URL** — Vercel had NEXT_PUBLIC_ prefix, code read SUPABASE_URL. Fixed: supabase.ts now falls back to NEXT_PUBLIC_SUPABASE_URL.
4. **Em dashes (U+2014) cause TS1002** — All string literals must use ASCII only in this codebase. Use -- for em dash.
5. **FUSE mount caching** — File changes made on Windows not immediately visible to Linux shell. Workaround: run scripts from Windows PowerShell directly.

---

## Session 21 Scope (Next Session)

Exit criteria for S21: Full end-to-end flow working with polished report UI

1. **Report display page** `/audit/report/[id]` — render the JSON as a proper visual report
2. **Email gate** — capture email before showing full report (store in audit_reports.email)
3. **Score visualisation** — circular score dial, band label, colour coding
4. **Opportunities section** — cards with effort/impact/timeframe/ROI
5. **Quick wins section** — low-friction action items
6. **CTA** — "Book a free 15-minute conversation" wired to Cal.com
7. **HubSpot integration** — create contact when email captured

---

## Kick-off Prompt for Session 21

> Session 21. Read docs/CLAUDE_UPDATED.md first. The AI Opportunity Audit backend is complete and Claude prompt is validated (Session 20 done). Now build the report display UI. The submit API already returns `{reportId, accessToken, report, score}`. After submit, redirect to `/audit/report/[accessToken]` which fetches the report from Supabase and renders it as a polished visual page. Must include: score dial, headline, summary, 3 opportunity cards (effort/impact/timeframe/ROI), 2-3 quick wins, investment estimate, risk factors, and Cal.com CTA. Email gate sits between submit and report — user enters email, we store it in audit_reports.email and create a HubSpot contact, then show the full report. Style guide: docs/STYLE_GUIDE.md. Brand colour #6B3FE7.
