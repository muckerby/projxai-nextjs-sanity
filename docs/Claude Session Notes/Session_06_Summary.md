# ProjxAI Session 6 Summary
**Date: 3 April 2026**

## What was done

### Smart Lead Pipeline Implementation
- Expanded Sanity `lead` schema with new fields:
  - `industry` — industry sector
  - `aiMaturity` — current AI adoption level
  - `areasOfInterest` — use case areas
  - `biggestChallenge` — primary business pain point
  - `timeframe` — implementation timeframe
  - `leadPath` — 'booking' or 'intake' (tracks which path user took)
  - `calBookingId` — Cal.com booking reference

- Created `/api/intake` route for post-initial-enquiry flow
  - Accepts 6-question intake submission
  - Patches Sanity lead record with answers
  - Sends enriched email with all responses + research brief to michaelc@projxai.com.au

### Contact Page Complete Rebuild
- Two-path smart flow implemented:
  - **Path A — Book a Call:** Opens https://cal.com/michael-collicoat/30min in new tab, updates Sanity lead with `leadPath='booking'`
  - **Path B — Start Intake:** Shows 6-question inline intake form (industry, team size, AI maturity, areas of interest, biggest challenge, timeframe)
  
- On intake submit: Sanity lead record patched with all answers, enriched email sent

### Homepage Complete Redesign
- New hero section with compelling proposition
- 3-pillar features grid
- AudienceStrip component (target segments)
- Statistics section
- Blog teaser section
- ConsultingCTA zone

### All 4 Service Pages Rewritten with Real Copy and Pricing
- **AI Consulting** — from $750 (Opportunity Audit)
- **AI Implementation** — from $2,500 (Strategy & Roadmap)
- **AI Content** — from $3,000/workflow (Workflow Implementation)
- **AI Automation** — from $1,000/month (Retainer)

### New Service Page Added
- `/services/ai-infrastructure` — from $1,500 (AI Infrastructure & Hosting)

### Navigation Updates
- Correct service links wired throughout
- Service index updated with all 5 services

---

## Key Decisions

1. **Two-track lead capture:** Book a call OR smart intake form (user choice)
2. **Email enrichment:** All intake answers bundled with research brief in notification email
3. **Service pricing restored:** Remove "from $X" later if strategy changes, but start with real pricing for credibility
4. **Homepage hero rewritten:** Stronger value prop, clearer audience focus

---

## Deployed
- All changes live on projxai.com.au
- Auto-deployed via Vercel on push to main

---

## Next Session Priorities
1. Phase 0 site fixes (pricing removal if needed, stats cleanup)
2. Service page visual refresh (if time permits)
3. Contact page CTA optimization
