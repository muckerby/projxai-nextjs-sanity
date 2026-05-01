# ProjxAI Session 17 Summary
**Date:** 22 April 2026
**Session focus:** /about page rewrite — operator story v1.1 positioning

---

## What was done

### /about page — full rewrite (`src/app/about/page.tsx`)

Complete rewrite of the About page against the Part 4 Operator Story from `ProjxAI_Strategic_Foundation_v1.1.md`. The previous version (Session 13) used third-person voice and was abstract — solid bones, but not yet anchored to the specific career arc. This version is the canonical operator narrative.

**Key changes:**
- First-person voice throughout ("I've spent 37+ years…", "I sat in board meetings…", "I can walk into any vertical…")
- H1: "Thirty-seven years as a digital operator. *This is why ProjxAI exists.*" — first-person opener anchored to the founding moment
- Four sections covering: career arc (3 phases), founding pivot moment, what the operator's lens means (3 pillars), and business entity
- Three-phase career narrative: ~10yr hands-on tech → ~15yr GM/P&L leadership → ~10yr+ operator/AI intersection
- Founding pivot: two convergent forces (capability shift + wave of non-operator AI consultants hitting the SME market)
- Pull quote from the operator voice list: "Most AI consultants will tell you what's possible. I'll tell you what's worth doing this quarter."
- Three operator pillars: P&L instinct / bias for shipping / industry breadth
- Credential callout cards: 37+yrs, GM/P&L, SYS (production systems), AU (industry breadth)
- All CTAs to `/contact#consulting`

**Compliance with v1.1 rules (all clean):**
- ✅ No employer names (Netlotto not mentioned anywhere)
- ✅ No Project ABE references of any form
- ✅ No CPA, ROAS, or specific financial outcomes from prior roles
- ✅ No fabricated case studies
- ✅ Style Guide compliant: H1 clamp(2rem,5vw,3.25rem), L1/L2 section rhythm, Space Grotesk headings, correct badge colours

**Style Guide section rhythm:**
1. Hero → `#151c27` (dark)
2. Career Arc → `#f9f9ff` (L1)
3. Founding Moment → `#f0f3ff` (L2)
4. Operator's Lens → `#f9f9ff` (L1)
5. About the Business → `#f0f3ff` (L2)
6. CTA → `#151c27` (dark)

---

## Git / Deploy

- Commit: `fd56043` — `feat(about): rewrite /about with operator story — v1.1 positioning (Session 17)`
- Pushed to: `main`
- Vercel deployment: `dpl_3x3QwBvTahcGuKTKVPAWEXTNGbvu` → **READY**
- Live at: https://www.projxai.com.au/about

**Git workaround used:** Stale FUSE lock files (`HEAD.lock`, `index.lock`, `refs/heads/main.lock`) required fresh copy of `.git` to `/tmp/projxai-s17`. After `git reset origin/main` to fast-forward HEAD (local was 34 commits behind), staged only `src/app/about/page.tsx` and committed clean.

---

## Out of scope (deferred to future sessions)

- Service pages operator bio block (one paragraph, third-person)
- `/contact` trust line update
- CEO Coaching page (`/services/ceo-ai-coaching`) — target May 2026
- Operator Notes Post 1 polish (Session 29 per plan)
- Full site audit against STYLE_GUIDE.md
- Audit webapp spec (Session 19) and build (Sessions 20–22)

---

## Kick-off prompt for Session 18

```
Session 18 — Review projxai.com.au/about live and confirm it reads correctly against the v1.1 operator story. Then move to the highest-priority remaining item from the 30/60/90: either (a) CEO Coaching page at /services/ceo-ai-coaching, or (b) the Netlotto retainer pitch prep (one-page proposal doc as a drawer asset — not to be delivered yet). Read docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategic_Foundation_v1.1.md Part 7 (CEO Coaching) and Part 9 (Client Pipeline) before deciding. Also read docs/Claude Session Notes/ProjxAI_Session17_Summary.md for current state.
```
