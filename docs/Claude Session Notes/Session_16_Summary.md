# Session 16 — Homepage v1.1 Operator Positioning
**Date:** 22 April 2026
**Duration:** ~1 hour
**Commit:** `7e3abd1` — feat(homepage): apply v1.1 operator positioning (Session 16)
**Deploy:** READY — projxai.com.au live ✅

---

## What was done

Applied ProjxAI Strategic Foundation v1.1 (Parts 2 & 4) to the homepage (`src/app/page.tsx`). Single focused session — one file, clean diff, no collateral changes.

### Changes shipped

**Hero section:**
- Badge: "Practical AI for Australian SMEs" → "An operator's approach to AI"
- H1: Option C positioning — *"Three decades building Australian digital businesses. Now applying that operator's lens to AI for SMEs that don't have a CTO."*
- Subline: *"Practical AI systems engineered by someone who's actually run a business — not just consulted on one."*
- CTAs unchanged: "Book a Free Clarity Call" → `/contact#consulting`, "Try Free Tools" → `/tools`

**Founder credibility section (dark band):**
- H2: "Built by an operator. Not an agency."
- P1: 30-year operator intro — GM roles, P&L, multi-million-dollar budgets, hospitality/B2B/travel/services. Career spent running businesses, not advising from the outside.
- P2: The wave of AI services being sold by people who've never had to make a P&L work — the specific market gap ProjxAI closes.
- P3: ProjxAI's answer — production work led by someone who's spent three decades shipping systems, owning budgets, knowing exactly what a CFO will and won't approve.
- Quote block (italicised, `#ccbdff`): *"Most AI consultants will tell you what's possible. I'll tell you what's worth doing this quarter."*

**Stats grid (4 proof points):**
- Kept: "30+ / Years in Australian digital operations"
- Kept: "Brisbane / Based in QLD, working nationally"
- Replaced "48hr / AI Opportunity Audit turnaround" with "GM / P&L and multi-million-dollar budgets owned, not just consulted on"
- Replaced "2–4 wks / To your first live AI workflow" with "5+ / Industries: hospitality, B2B, travel, wagering, online services"

**Metadata:**
- Title: "ProjxAI — AI for Australian SMEs | Operator-led, not consultant-led"
- Description: "Thirty years in Australian digital operations. ProjxAI brings an operator's lens to AI for SMEs — practical systems built by someone who's actually run a business, not just consulted on one."

### What was NOT changed (intentional)
- No Project ABE language introduced anywhere
- No specific employer names (Netlotto not mentioned)
- No CPA numbers, ROAS numbers, or specific financial outcomes
- No fabricated case studies
- All CTAs still route to `/contact#consulting`
- Sections 2–5, 7–9 (pain points, workflow strip, engagement steps, verticals, tools/blog, FAQ, final CTA) unchanged

---

## Decisions carried forward

- Session 17: Rewrite `/about` to develop the full career arc using the operator story (Part 4) — no employer names, no ABE
- The "Operator Notes" blog pilot (3 posts) remains approved — Post 1 manifesto ready in `Operator_Notes_Post1_Manifesto.md` per Session 15
- CEO Coaching page (`/services/ceo-ai-coaching`) still to be built — target: live by 15 May
- Audit webapp remains Build #1 priority — Session 19 spec → Sessions 20–22 build

---

## Kick-off prompt for Session 17

```
Session 17 — Rewrite /about with operator story (v1.1 positioning)

Read:
- docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategic_Foundation_v1.1.md (Part 4 — The Operator Story)
- src/app/about/page.tsx (current state)
- docs/STYLE_GUIDE.md

Task: Rewrite the About page against the Part 4 canonical narrative. Full career arc, first-person voice, no employer names (Netlotto especially), no Project ABE references, no CPA/ROAS numbers. Use the "Where the story appears" table in Part 4 for the About page treatment: full version, first-person, narrative. Replace any remaining generic copy. CTAs to /contact#consulting. Commit and push.
```
