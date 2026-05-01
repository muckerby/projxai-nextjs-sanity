# Session 21 — Audit Report UI (Built) + Spec v2 (Produced)

**Date:** 29 April 2026
**Commits:** `0188629` (v1 report UI), `67074fa` (HubSpot env var fix)
**Status:** v1 live on projxai.com.au — tested, failed on 5 dimensions — Spec v2 produced, awaiting Michael's approval before Session 22 code begins

---

## Part 1 — What Was Built (v1)

Built the full report display UI for the AI Opportunity Audit — email gate, score dial, all report sections, Cal.com CTA. Deployed and live.

### Files Created / Modified

| File | Status | Notes |
|---|---|---|
| `src/app/api/audit/gate/route.ts` | Created | POST endpoint: stores email in audit_reports, creates HubSpot contact (graceful if key absent) |
| `src/app/audit/report/[accessToken]/page.tsx` | Created | Server component: fetches report from Supabase by accessToken, 404s if not found |
| `src/app/audit/report/[accessToken]/ReportClient.tsx` | Created | Client component: email gate phase + full report view |
| `src/app/audit/page.tsx` | Modified | Replaced inline 'results' phase with `router.push('/audit/report/[accessToken]')` |

### HubSpot env var fix (commit `67074fa`)

Code used `process.env.HUBSPOT_API_KEY` — Vercel has `HUBSPOT_API_TOKEN`. Corrected in `gate/route.ts`. Gate works without key (HubSpot step skipped gracefully). Key still not yet added to Vercel.

---

## Part 2 — Live Test Results (Michael's Feedback)

Michael ran through the tool at projxai.com.au/audit. Five failures identified:

1. **No business name captured** — report cannot personalise without it
2. **Gate UX wrong** — full-screen gate before score is shown; Michael landed at bottom of page not realising report was above. Spec required inline blur gate, not separate page.
3. **Report is too generic** — "parrot answers", could apply to any SME, not specific to the prospect's business
4. **No email delivery** — user enters email expecting to receive something; nothing was sent. Resend was in the spec but not built.
5. **No differentiation from the free AI Opportunity Score tool**

---

## Part 3 — Spec v2 Produced

After reading all strategy documents (v1 spec, Strategic Foundation v1.1, Sessions 8–19 notes, competitor analysis), produced a complete redesign spec:

**Location:** `docs/ProjxAI Digital Business/Strategy Work/AI_Opportunity_Audit_Spec_v2.md`
**Status:** DRAFT — Michael must approve before Session 22 code begins

### Spec v2 covers

- Honest 5-point failure assessment
- Tool positioning and differentiation from Score tool
- "Wow factor" design brief
- Redesigned 14-question flow + Q0 business name field (15 total)
- Q3 revenue model question (new) — adds budget signal
- Q4 software stack question (new) — enables integration specificity
- Claude prompt philosophy (8 mandatory requirements for personalised output)
- Updated JSON schema: `readinessDimensions`, `ninetyDayPlan`, per-opportunity `investmentEstimate`, risk `mitigation`
- Corrected inline blur gate UX (sections A-D visible, E-J blurred, gate between them)
- Resend email spec (HTML, triggered on gate, contains permanent report link)
- HubSpot 10-property sync + note creation
- Loading screen redesign
- Navigation updates (Tools dropdown, /tools card, Score cross-link)
- 8 open decisions (OD1–OD8) for Michael to confirm

---

## Open Decisions for Michael Before Session 22

| OD | Decision | Default in Spec |
|---|---|---|
| OD1 | Business name — required or optional? | Required (Q0, blocks submit if blank) |
| OD2 | Q3 revenue model question — keep as drafted? | Yes |
| OD3 | Resend sender domain — `hello@projxai.com.au` verified? | Needs Michael to confirm |
| OD4 | Create 10 HubSpot custom properties now? | Yes, ~20 min in HubSpot |
| OD5 | Include 90-day plan section in v2? | Yes (separate drawer/tab) |
| OD6 | Inline blur gate confirmed? | Yes |
| OD7 | Per-opportunity investment estimates in v2? | Yes |
| OD8 | React-email vs plain HTML for Resend | React-email (cleaner) |

---

## Kick-off Prompt for Session 22

> Session 22. Advanced model is on. This is a rebuild of the AI Opportunity Audit report layer based on the approved Spec v2 at: `docs/ProjxAI Digital Business/Strategy Work/AI_Opportunity_Audit_Spec_v2.md`. Read that spec in full before writing a line of code. It supersedes v1 entirely.
>
> Open decisions confirmed by Michael before this session: [paste OD1-OD8 answers here]
>
> Session 22 scope (in order):
> 1. Update question flow: add Q0 (business name, required text input before Q1), add Q3 (revenue model), add Q4 (software stack) — 15 questions total
> 2. Rebuild Claude system prompt to v2 schema (spec Section 6) — must reference business name, team size, bottleneck hours, software stack in every major insight
> 3. Rebuild `ReportClient.tsx`: inline blur gate (sections A-D visible ungated, E-J blurred, gate form between them), readiness dimensions radar/bars, 90-day plan section, per-opportunity investment estimates
> 4. Build Resend email delivery on gate submit — permanent report link, personalised with business name and score
> 5. Add 10 HubSpot custom properties + note creation on gate submit
> 6. Test end-to-end with 3 sample businesses
>
> Architecture decisions from v1 that are final and not to be re-litigated: Supabase schema, access_token URL pattern, bypass param, auto-advance on radio/Continue on checkbox. Do not change these.
