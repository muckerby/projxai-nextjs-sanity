# Session 25 Summary — 1 May 2026

## Primary Goal
Redesign the AI Opportunity Audit question system from a flat 14-question linear wizard into a branching silo architecture — so the report reads like someone who actually sat with the business.

## What We Built

### Branching Question Architecture — `src/app/audit/page.tsx` (complete rewrite)

**Architecture: 3 phases**
- **Phase 1 — Context (universal):** 6 questions: business type, team size, revenue model, tech comfort, AI tool usage, bottleneck selection
- **Phase 2 — Deep-dive silo:** 5–6 questions specific to whichever bottleneck they chose; 1 strategic free-text per silo
- **Phase 3 — Priorities (closing):** Software stack, comms stack (M365/GWS/other), hosting environment, IT support model, annual IT spend, budget, decision maker

**7 silos:**
| Silo | Bottleneck triggers |
|---|---|
| silo-a | Customer enquiries / follow-ups too slow |
| silo-b | Manual data entry & admin / can't find documents |
| silo-c | Lead follow-up gaps / quoting takes too long |
| silo-d | Reporting slow, unreliable, or non-existent |
| silo-e | Marketing attribution unknown / not enough enquiries |
| silo-f | Hiring / HR admin overwhelms |
| silo-g | Systems don't talk / data siloed everywhere |

**"Other" bottleneck handling:** Triggers a routing question (only shows when Other is selected) → user picks the closest area from a dropdown → routes to corresponding silo.

**Key implementation details:**
- `computeSequence(answers)` — `useMemo`-computed, recomputes on every answer change
- Stale silo answers cleared automatically when bottleneck changes
- `currentQ` clamped via `useEffect` if sequence shrinks (avoids out-of-bounds)
- Auto-advance on radio selection (380ms delay), suppressed when "Other" triggers free-text
- Phase dots progress indicator: Context → [Silo Name] → Priorities
- Separate `freeText` state (type='text' depth questions) and `otherText` state (Other fields)
- 10 bottleneck options including "Other — I'll describe it below"

**Closing questions added (infrastructure phase, universal):**
- Communications stack: M365 / Google Workspace / Other
- Hosting environment: Cloud-native / On-premises / Hybrid
- IT support model: Managed service / Internal team / Ad-hoc / None
- Annual IT spend: <$10k / $10-50k / $50k+

### Updated System Prompt — `src/app/api/audit/submit/route.ts`

**System Prompt v3 additions:**
1. **SILO FOCUS AREA section** — instructs Claude that Opportunity #1 must directly address the silo, month 1 of 90-day plan must be in the silo area, and at least one quick win must name a specific silo workflow. Free-text fields must be quoted/paraphrased.
2. **INFRASTRUCTURE CONTEXT section** — instructs Claude to match tool recommendations to comms stack (Copilot for M365, Gemini for GWS), adjust investment estimates for on-prem hosting, and flag high IT spend as a budget source signal.
3. **New scoring adjustments:** hosting (cloud: +3, on-prem: -5), comms stack (M365/GWS: +3), IT support (managed: +2, internal: +3, ad-hoc: -5), annual IT spend (>$50k: +5).

**`formatAnswers()` updated:** Now maps all 45+ question IDs to human-readable labels including all 7 silo deep-dive questions, routing field, and all 4 new infrastructure fields.

**`activeSilo` injection:** Route reads `activeSilo` from within `answers` object (where page.tsx puts it), converts raw silo key to friendly name (e.g. `silo-a` → "Customer Communication & Service"), injects into enrichedAnswers, and passes the label explicitly in the user message.

## Commit
`fd41415` — `feat(audit): branching question system v3 + silo-aware Claude prompt`
Vercel deploy: READY ✅

## Current State
- `/audit` — branching question flow live on projxai.com.au
- Question count varies per respondent: 14 questions (no Other) to ~17 (Other bottleneck path)
- 7 fully distinct deep-dive paths, each generating a different Opportunity #1
- Infrastructure questions captured for every respondent
- End-to-end pipeline (Resend email, HubSpot 10 properties, Supabase) unchanged from Session 22 — deferred live test to Session 26 (run as named business after new flow)

## Decisions Made This Session (carried forward from Session 24 transcript)
1. **Question interface:** Hybrid wizard (click-through radio/checkbox) — NOT conversational chat UI
2. **Brand names in reports:** Leave current behaviour, revisit closer to launch
3. **Post-report portal:** Phase 1 Workspace feature (`/portal/*`), inside existing site, Supabase Auth (magic link)

## Open for Session 26
1. **End-to-end live test** — run as "Sunrise Accounting" or similar through new branching flow. Check: business name in headline, correct silo Opportunity #1, Resend email arrives, HubSpot shows all 10 properties, Supabase row created.
2. **UX review** — does the question flow feel right? Any bottleneck labels that need refinement? Free-text placement timing?
3. **Report improvements** — now that silo data is richer, review whether ReportClient sections E-J surface silo-specific content well, or if the report template needs updating to match.
4. **Phase 2 Workspace** — auth, persistent report, "Tell me more" chat per opportunity card, Cal.com escalation with conversation summary.

## Session 26 Kick-Off Prompt

```
Session 26. Advanced model is on.

Read these files before starting:
- docs/ProjxAI Digital Business/Strategy Work/AI_Opportunity_Audit_Spec_v2_APPROVED.md
- docs/Claude Session Notes/Session_25_Summary.md

Session 25 shipped: branching question system v3 live at /audit. 7 silos, silo-aware Claude prompt, infrastructure questions in closing phase. Vercel READY on commit fd41415.

Session 26 priorities:

1. END-TO-END TEST — Run the audit as "Sunrise Accounting" (or similar named business). 
   Go through the Customer Comms silo (bottleneck: "Customer enquiries and follow-ups take too long").
   Verify:
   - Business name appears in headline
   - Opportunity #1 is Customer Comms specific (not generic)
   - Email gate works, blur lifts, toast fires
   - Resend email arrives at michaelc@collicorp.com.au
   - HubSpot contact created with all 10 audit properties
   - Supabase audit_reports row exists with correct JSON
   
2. UX REVIEW — After testing, note any friction points in the question flow. 
   Do the bottleneck options read naturally? Is the silo routing obvious?
   Any label tweaks or re-ordering needed?

3. REPORT TEMPLATE REVIEW — Does the report feel silo-specific enough? 
   Is the "wow factor" there? If Opportunity #1 is generic, the system prompt needs tightening.
   Check: does the 90-day plan month 1 reference a specific silo workflow?

4. If all three pass — start scoping Phase 2 Workspace build:
   /portal/[token] — persistent report view with Supabase Auth (magic link)
   "Tell me more" per opportunity card → Claude API chat with report JSON as context
   Cal.com escalation with conversation summary pre-filled

No re-litigation of architecture decisions. If something needs changing, change it — but decisions in Session 24/25 APPROVED docs are locked unless testing reveals a real problem.
```
