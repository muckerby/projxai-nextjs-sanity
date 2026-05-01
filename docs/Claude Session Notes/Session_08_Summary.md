# ProjxAI Session 8 Summary
**Date: 10 April 2026**

## What was done

### Cal.com Booking Embed Fixed
**Problem:** Previous iframe approach was blank because Cal.com sends `X-Frame-Options: SAMEORIGIN` headers, blocking cross-origin iframe embeds.

**Solution:** Switched to official Cal.com JS IIFE embed pattern
- Embed script from `app.cal.com` with `embed.js`
- New `CalBookingPanel` component always-mounted via CSS show/hide (not conditional render)
  - Prevents reinitialisation on component remount
  - Cal.com JS callback properly queued
- Verified DOM: CAL-INLINE element 1978px tall, `Cal.ns["30min"]` exists in window, queue processed

**Committed:** c9dfe3c | Verified live ✅

---

## Strategy Documents Reviewed
Read all 4 strategy docs in `docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategy_Document_Set/`:

### Doc 1: Site Audit
- Positioning reset recommendations
- Trust-building fixes needed
- 17-page site architecture plan
- Vertical pages (industry-specific) strategy
- Use-case pages strategy

### Doc 2: Competitor Intelligence
- 11 Australian AI consultancy competitors profiled
- IOTAI and Advancer identified as highest threat
- Positioning gaps identified
- Market share analysis

### Doc 3: Marketing Strategy
- 3-track revenue model:
  1. Direct SME consulting
  2. White-label / fractional partnerships
  3. Workshops + training
- 90-day plan with weekly milestones
- Content strategy
- Outreach sequencing

### Doc 4: Tools & Services
- Full portfolio matrix (5 core services)
- Offer ladder (entry → premium)
- Phased release sequence (Phase 0 → Phase 3)
- Free tools strategy
- Paid product roadmap

---

## Key Business Decisions Made

1. **Go for broke** — Build everything comprehensively. Netlotto income provides runway until ProjxAI generates revenue.

2. **Retire "Digital Architects" tagline** → New tagline: **"Practical AI systems for Australian SMEs"**

3. **Remove ALL pricing from live site** — Strategy decision: build credibility first before showing prices. Will add back once credibility established.

4. **Remove all unsupported stats and proof claims** — Only claim what can be backed up.

5. **Switch Cal.com to 15-minute discovery calls** — Down from 30min (shorter commitment barrier).

6. **Both tracks simultaneously** — Pursue direct SME sales AND white-label/fractional partnerships in parallel.

7. **LinkedIn parked** — Don't launch until Netlotto transition is clear.

8. **ClickUp adopted as PM tool** — Replace email-based task tracking with proper workspace management.

---

## ClickUp Workspace Setup

**Workspace:** Projxai  
**Space:** ProjxAI (renamed from default)

**7 Folders created:**
1. Phase 0 — Immediate Site Fixes
2. Website Build
3. Templates & Deliverables
4. Free Tools
5. Paid Products
6. Content & Blog
7. Marketing & Outreach

**14 Lists created** with descriptions for organizing tasks

**MCP Connected:** Claude can create/update/read tasks directly from this workspace

---

## Next Session Plan
**Create 4 strategic deliverables (all in .docx format):**
1. **Master Build Plan** — Consolidate all 4 strategy docs into single actionable plan
2. **AI Opportunity Audit Template** — #1 priority deliverable, unlocks ability to sell
3. **Same-Day Proposal Template** — Post-Clarity-Call closing document
4. **Partner One-Pager** — For white-label/fractional outreach

**Then:**
5. Populate ClickUp with tasks from the plan
6. Begin Phase 0 site fixes if time permits

---

## Michael's Schedule (Established)
- **Full days:** Wednesday, Friday, Saturday
- **Evenings:** Monday, Tuesday, Thursday
- **Total:** ~22 hours/week for ProjxAI
- Still employed at Netlotto ($130k base + commission)

---

## Key Learnings

1. **Strategy clarity:** Four separate docs with overlapping insights. Master consolidation will be essential.
2. **Go-to-market:** Three revenue tracks require different messaging and positioning.
3. **Market position:** Operator story (Michael's 30+ years) is stronger credential than past projects.
4. **Workflow management:** ClickUp + MCP integration enables rapid async task execution.

---

## Deployed
- Cal.com fix committed and live
- All new business decisions documented

---

## Status
🎯 **Strategy locked. Execution phase begins next session.**
