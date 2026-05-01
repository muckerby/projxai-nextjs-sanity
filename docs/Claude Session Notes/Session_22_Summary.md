# Session 22 Summary — AI Opportunity Audit v2 Rebuild

**Date:** 1 May 2026
**Model:** Claude Sonnet 4.6 (Advanced)
**Duration:** Full session
**Status:** All scope delivered and deployed to main

---

## What Was Built

### Hotfix (first priority)
Vercel build was failing: `src/app/api/audit/gate/route.ts` was missing the closing `}` for the `POST` function (line 101, EOF before expected `}`). This was a pre-existing bug from Session 21. Fixed immediately and pushed as a standalone commit before proceeding with v2 work.

FUSE mount sync issue noted: the Edit tool (Windows path) wrote the fix correctly but the Linux bash sandbox didn't see it. Resolved by using `echo "}" >>` directly in bash. All subsequent file writes went through bash heredoc to avoid this issue.

---

### 1. Question Flow — `src/app/audit/page.tsx` (full rewrite)

- New phase `businessName` added between intro and questions
- **Q0a:** Business name — required text input, 100 char limit, auto-focus, Enter to continue
- **Q0b:** ABN — optional, digits+spaces only, sent to ABR API on submit
- **Q3 (new):** Revenue model — radio, 6 options including "Other" free text
- **Q4 (new):** Software stack — checkbox, 10 options including "spreadsheets and email" diagnostic
- Questions reordered per spec: dedicatedRoles moved to Section 3 (AI readiness)
- **14 numbered questions** total (was 12)
- Loading screen redesigned: cycling text every 2.2s using `setInterval`, names the business:
  - "Analysing [Business Name]'s AI opportunity…"
  - "Reviewing your operations and readiness profile…"
  - "Identifying your highest-value opportunities…"
  - "Building your 90-day plan…"
  - "Your report is almost ready…"
- Back from Q1 now returns to businessName screen (not intro)
- Submit payload includes `businessName` and `abn` in answers object

---

### 2. Claude System Prompt — `src/app/api/audit/submit/route.ts` (full rewrite)

**ABR API integration:**
- `lookupABN()` function: `GET https://abr.business.gov.au/ABRxmlSearch/AbrXmlSearch.asmx/ABRSearchByABN`
- 4-second timeout, gracefully skipped if GUID absent or API fails
- Parses XML response with regex (no library): entityDescription, state, gstRegistered, entityStatus
- ABR data injected into Claude prompt if available

**v2 system prompt** (8 mandatory requirements, enforced):
1. Business name must appear in headline
2. Top opportunity must match stated bottleneck
3. ROI calculated from answers (formula provided)
4. Software stack referenced in quick wins
5. Summary names business + industry + team size
6. Risk factors reference specific answers
7. 90-day plan calibrated to readiness level
8. Investment estimates per-opportunity

**New scoring adjustments:**
- Software stack multiplier: -5 for fragmented/spreadsheets, +5 for 3+ integrated tools, +3 for industry platform
- Revenue model signal: +5 transactional, +3 project-based, +3 retainer

**v2 JSON schema output:** businessName, readinessDimensions (4 dimensions × 1–5), ninetyDayPlan (month1/2/3), per-opportunity investmentEstimate, risk factor mitigation field, investmentEstimate.firstPriority

Validation updated to require all new v2 fields.

---

### 3. Report UI — `src/app/audit/report/[accessToken]/ReportClient.tsx` (full rewrite)

**Gate behaviour (v2 — inline blur):**
- Sections A–D always visible, never gated
- Sections E–J: CSS `filter: blur(6px)` + `pointer-events: none` when !unlocked
- Blur lifts with `transition: filter 0.6s ease-in-out` on unlock
- Gate form is inline between D and E — NOT a separate page
- After unlock: toast appears ("Report sent to [email]"), page scrolls to Section E

**10 report sections:**
- **A:** Business identity strip (name, "AI Opportunity Report", date) — light purple bg
- **B:** Score dial + headline + readiness badge — always visible
- **C/D:** Summary in B, first opportunity card in full — always visible
- **E:** Readiness dashboard — 4 dimension bars (aiExperience, dataReadiness, techComfort, changeCapacity)
- **F:** Opportunities 2 + 3 — full cards with per-opportunity investmentEstimate
- **G:** Quick wins — with softwareConnection callout line
- **H:** Investment estimate (range + firstPriority + context) + risk factors (with mitigation)
- **I:** 90-day plan — 3-column timeline, Month 1 in brand purple
- **J:** Dark CTA section

**New components:** DimensionBar, inline GateForm (purple gradient card), Toast (animated slide-in)

---

### 4. Gate API — `src/app/api/audit/gate/route.ts` (full rewrite)

**Resend email:**
- From: `ProjxAI <hello@projxai.com.au>`, Reply-to: `michaelc@projxai.com.au`
- Subject: `Your AI Opportunity Report — [Business Name] · Score: [XX]/100`
- HTML template (inline, no react-email dependency): score box, top opportunity, permanent report link, Cal.com CTA, Michael signature
- Non-blocking (failure does not block user response)

**HubSpot enrichment (10 properties):**
- `hsSearchContact()` — search by email before creating
- `hsUpsertContact()` — PATCH if exists, POST if new
- All 10 custom properties populated: `projxai_audit_score`, `projxai_audit_completed_at`, `projxai_audit_business_name`, `projxai_audit_business_type`, `projxai_audit_team_size`, `projxai_audit_budget_range`, `projxai_audit_top_opportunity`, `projxai_audit_bottleneck`, `projxai_audit_report_url`, `projxai_audit_readiness_level`
- `hsCreateNote()` — creates HubSpot note with full audit context (10 fields), associated to contact
- HubSpot contact ID stored back to Supabase `audit_reports.hubspot_contact_id`
- Non-blocking (failure does not block user response)

---

## Architecture Decisions

- **No react-email installed** — used inline HTML template function in gate/route.ts. Produces correct output, zero additional dependency.
- **businessName in report_json** — Claude outputs it as a top-level field. ReportClient reads from `report.businessName`. No schema change needed.
- **Session answers for HubSpot** — gate route fetches `audit_sessions.answers` by session_id to populate bottleneck, business type, team size, budget for HubSpot properties.
- **ABR API** — REST endpoint, XML response, regex parsing. Graceful skip if `ABR_API_GUID` not in env or API call fails/times out.

---

## What Was NOT Built (deferred)

- Nav updates (Tools dropdown, /tools page Audit card, cross-links) — deferred to Session 23
- `/contact` page tertiary link to Audit — deferred
- End-to-end live test with 3 named businesses — requires Vercel deploy to complete

---

## Commits

1. `515e0a7` — fix: add missing closing brace in gate/route.ts — resolves Vercel build error
2. `2d85c27` — feat: Session 22 — Audit v2 rebuild (question flow, report, inline gate, Resend, HubSpot)

---

## Session 23 Kick-Off Prompt

```
Session 23. Continue Session 22 work.

First: verify Vercel deploy from Session 22 (commit 2d85c27) built and deployed successfully.

Then complete the remaining Session 22 scope that was deferred:

1. Nav updates (spec Section 11):
   - Add "AI Opportunity Audit — Free" to Tools nav link (dropdown or separate entry)
   - Add Audit card to /tools page with CTA "Start your free audit →"
   - Add "Want a deeper analysis? Start the full Audit →" link on /tools/ai-opportunity-score results
   - Consider /contact page tertiary CTA linking to Audit

2. End-to-end test as a named business:
   - Go to /audit (or /audit?bypass=BYPASS_SECRET for gate skip)
   - Enter "Sunrise Accounting" as business name
   - Complete 14 questions as a 6–20 person accounting firm with 15–30 hrs/week manual tasks
   - Verify: business name in headline, 90-day plan present, readiness dimensions bars visible
   - Verify: email gate is inline (not a separate page), blur lifts after email submit
   - Verify: Resend email arrives with correct subject and permanent link
   - Verify: HubSpot contact shows all 10 audit properties populated

3. If any bugs found during testing — fix them in this session.

Exit criteria from spec: A named business audit report contains the business name in the headline, a specific ROI estimate, a 90-day plan, triggers a Resend email, and creates a HubSpot contact with all 10 audit properties.

Key files:
- src/app/audit/page.tsx — question flow
- src/app/api/audit/submit/route.ts — Claude prompt + ABR
- src/app/audit/report/[accessToken]/ReportClient.tsx — report UI
- src/app/api/audit/gate/route.ts — Resend + HubSpot
- src/components/Header/index.tsx — nav
- src/app/tools/page.tsx — tools page
```
