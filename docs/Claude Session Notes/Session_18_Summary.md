# ProjxAI Session 18 Summary
**Date:** 22 April 2026
**Session focus:** /about factual corrections + CEO Coaching page at /services/ceo-ai-coaching

---

## What was done

### 1. /about page — factual corrections (`src/app/about/page.tsx`)

Two corrections applied per Michael's review of the live page:

**Correction 1 — Australian tenure overstated:**
- "I've spent 37+ years inside Australian businesses" → "30+ years inside Australian businesses"
- Rationale: The total 37-year career span is not entirely within Australian businesses — "30+ years" is more accurate for the Australian-specific claim

**Correction 2 — 'digital' anachronistic for early career:**
- H1: "Thirty-seven years as a digital operator" → "Thirty-seven years as a technology and digital operator"
- Metadata title: updated to match
- Credential card label: "Years in Australian digital operations" → "Years across technology and digital operations"
- Rationale: In the mid-1980s, the correct term was "technology" not "digital." "Digital" becomes accurate from the 1990s onward. The phrase "technology and digital" accurately spans the full career arc.

The body copy ("I started in technology in the mid-1980s") was already correct and required no change.

---

### 2. CEO Coaching page — new route (`src/app/services/ceo-ai-coaching/page.tsx`)

Full build of the Executive AI Operator service page per Strategic Foundation v1.1 Part 7. Decision: CEO Coaching over Netlotto retainer pitch prep (Part 9 is a drawer asset — prepared when trigger conditions warrant; CEO Coaching is a zero-capex page that can convert revenue in May 2026).

**Page URL:** `/services/ceo-ai-coaching`

**Sections (Digital Architect section rhythm):**
1. Hero → `#151c27` (dark) — "Learn to run AI like an operator. *Not like a user.*"
2. Why this exists → `#f9f9ff` (L1) — the problem with AI apps + pull quote
3. Program structure → `#f0f3ff` (L2) — pre-program + 6-week breakdown cards
4. What you leave with → `#f9f9ff` (L1) — 5 deliverables + optional monthly check-in note
5. Pricing → `#f0f3ff` (L2) — 3-tier cards (Standard $5,500 / Premium $9,500 / Group $3,500/seat)
6. Who it's for → `#f9f9ff` (L1) — 3 target personas + "not right for you if…" caveat
7. About the coach → `#f0f3ff` (L2) — operator bio block (third-person, v1.1 compliant)
8. CTA → `#151c27` (dark)

**v1.1 compliance (all clean):**
- ✅ No employer names (Netlotto not mentioned)
- ✅ No Project ABE references
- ✅ No CPA, ROAS, or specific financial outcomes
- ✅ "30+ years" used for operator credential (consistent with /about correction)
- ✅ Style Guide: H1 clamp, Space Grotesk headings, #6B3FE7 brand colour, L1/L2 section rhythm

**Program details captured:**
- Program name: "ProjxAI Executive AI Operator"
- 6 weeks, 1 hour/week, 1:1
- Pre-program 30-min intake
- Weeks 1–6: environment setup, email triage, meeting workflows, competitive intelligence, comms automation, PKM + 90-day plan
- Optional: 30-min monthly check-in @ $500/month
- Pricing: Standard $5,500 + GST (6-week), Premium $9,500 + GST (12-week + custom skill), Group $3,500 + GST/seat

**No data leaves the executive's environment** — this is the key differentiation line vs AI apps.

---

### 3. Services index — CEO Coaching card added (`src/app/services/page.tsx`)

Added a "Executive Coaching" card between the Infrastructure add-on and the Process Strip. Card links to `/services/ceo-ai-coaching` and includes feature tags (Personal AI setup, 6 custom workflows, Prompt library, 90-day operating plan). Distinguished from the main engagement ladder by a different badge colour and framing ("no procurement process, typically bought personally").

---

## Git / Deploy

- **Commit:** `4828b03` — `feat(about,services): factual corrections to /about + CEO Coaching page (Session 18)`
- **Pushed to:** `main`
- **Vercel:** auto-deploys on push to main → projxai.com.au
- **New live URL:** https://www.projxai.com.au/services/ceo-ai-coaching

**Git workaround used (same as Sessions 16–17):** Copied `.git` to `/tmp/projxai-s18`, removed lock files (`find /tmp/projxai-s18 -name "*.lock" -delete`), reset to `origin/main`, staged only 3 files, committed and pushed with PAT from `.claude/github-pat`.

---

## Strategic context

The CEO Coaching page was chosen over the Netlotto retainer pitch prep because:
- Part 7 says "SHIP THIS IN MAY 2026" — highest-leverage net-new revenue in the strategy
- Zero capex, no infrastructure required, first client possible next week
- Netlotto retainer remains a drawer asset (prepared when trigger conditions warrant, per Session 14 decision)
- Part 12 operating principle: every decision is made for revenue, not for exit

Revenue target: first paid client by 31 May 2026. Cohort #1 (3-5 seats × $3,500–$5,500) by 30 June 2026.

---

## Out of scope (deferred to future sessions)

- Netlotto retainer pitch prep (one-page proposal doc) — drawer asset, prepare when trigger conditions met
- Service pages operator bio block (one paragraph, third-person) — deferred from Session 17
- `/contact` trust line update — deferred from Session 17
- Audit webapp spec (Session 19) and build (Sessions 20–22) — highest strategic priority post-CEO coaching
- Full site audit against STYLE_GUIDE.md
- Operator Notes Post 1 polish (Session 29 per plan)

---

## Kick-off prompt for Session 19

```
Session 19 — CEO Coaching page is live at /services/ceo-ai-coaching. Audit webapp is the next build priority (Part 5 of Strategic Foundation v1.1, Part 12 operating principles: "Audit webapp ships before anything else new"). Read docs/Claude Session Notes/ProjxAI_Session18_Summary.md for current state. Then start the Audit webapp spec: read docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategic_Foundation_v1.1.md Part 5 and begin speccing the conversational AI Opportunity Audit at /audit — 12-15 question Claude API flow, interactive report rendered in-browser, Sanity/Postgres for response storage, HubSpot sync. Produce a complete spec doc (architecture decisions, question flow, report structure, tech approach, task breakdown) before any code is written.
```
