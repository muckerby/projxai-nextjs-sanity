# ProjxAI — Session 13 Summary
**Date:** 18 April 2026  
**Model:** Claude Sonnet 4.6 (Cowork)  
**Duration:** Full session  

---

## Deliverables Completed

### 1. ClickUp Catch-Up
Went through all completed tasks in ClickUp that were missing detailed notes. Added substantive comments to 20+ tasks across all folders (Website Build, Templates, Free Tools, Contact, Blog, Outreach). Status changes alone are not enough — every completed task now has a dated comment explaining what was built, how, and any decisions made. This is the "ClickUp as second brain" rule established in Session 12.

### 2. About Page Rewrite — LIVE
Rewrote `/about` entirely around the operator story narrative. Previous version was generic AI agency positioning. New version leads with "Built by an operator. Not a consultant."

**Sections built:**
- Hero: dark background (#151c27), purple italic accent on "Not a consultant."
- Operator Story: Michael's 37-year practitioner background, GM-level P&L ownership, AI systems built in production — told as a story, not a resume
- Four credential callout cards: 37+ years in tech / GM operator not advisor / AI built in production / Australian context
- Why It Matters: 3-pillar grid (Process before technology / Teams not just systems / Honest about what fits)
- Origin Story: why ProjxAI exists — with four stats row
- Business entity section: Collicorp Pty Ltd, ABN 80 398 642 662
- CTA: Clarity Call + View Services buttons

**Commit:** `5e454c1` | Verified live at projxai.com.au/about ✅

### 3. AI Roadmap Sprint Workshop Deck
**File:** `ProjxAI_AI_Roadmap_Sprint_Workshop_Deck.pptx` (327KB, 12 slides)  
**Location:** `C:\Collicorp\projxai\docs\ProjxAI Templates\`

Built using pptxgenjs (Node.js). Full facilitator deck in ProjxAI brand colours (#151c27 dark / #6B3FE7 purple / #F9F9FF light).

**Slides:**
1. Title cover — dark brand, purple accent bar
2. Agenda — 12-item timeline
3. What is an AI Roadmap Sprint? — 4-step definition boxes
4. Business Context — 5 discussion questions
5. Workflow Inventory — blank table (6 rows)
6. Use-Case Prioritisation Matrix — 2×2 quadrant + scoring guide
7. Feasibility & Readiness Check — 6-dimension scoring cards
8. 90-Day Roadmap Overview — 3-phase dark cards
9. Phase 1 Foundation — 4 task rows with week/description
10. Resource & Budget Frame — 5 workflow rows + total
11. Governance & Risk — 4 risk category cards
12. Next Steps & Close — 4 action items + contact footer

**Note:** pptxgenjs uses 6-digit hex only — no rgba(). Shape type is `pres.ShapeType.ellipse` not `.oval`.

### 4. 90-Day Roadmap Template
**File:** `ProjxAI_AI_Roadmap_Sprint_90Day_Template.docx` (11 pages, validates clean)  
**Location:** `C:\Collicorp\projxai\docs\ProjxAI Templates\`

**8 sections:**
1. Executive Summary — business context table, use-cases, roadmap at a glance
2. Phase 1 Foundation — data audit, process documentation, tool selection, team briefing, task schedule
3. Phase 2 Pilot Builds — workflow #1 & #2 pilot scope, feedback protocol, task schedule
4. Phase 3 Scale & Embed — scale plan, integration requirements, task schedule
5. Success Metrics & KPIs — primary KPIs, supporting metrics, review cadence
6. Budget & Resource Plan — tool cost table with totals, internal time budget
7. Governance & Risk — AU privacy principles, risk register, decision authority
8. Sign-Off — dual signature block (client + ProjxAI)

Header/footer with ProjxAI branding and page numbers throughout.

**Bug fixed:** Document initially rendered as 1919 pages (in Google Drive) / 591 pages (in LibreOffice). Root cause: `pt()` helper function used `n * 20` (twips multiplier, correct for spacing/margins) instead of `n * 2` (half-points, correct for docx font sizes). Result: all fonts were 10× too large. Fixed by changing the multiplier. **Critical rule: docx font `size` is in half-points — `size: 22` = 11pt, `size: 24` = 12pt. Never use a ×20 multiplier for font sizes.**

---

## Memory & Config Updates

- **Templates folder** locked in: `C:\Collicorp\projxai\docs\ProjxAI Templates\` (mount: `/sessions/.../mnt/projxai/docs/ProjxAI Templates/`) — all future .docx/.pptx/.xlsx deliverables go here
- **docx font size bug** added to feedback memory so it never recurs
- **Session 13 summary** saved to auto-memory

---

## Strategic Conversations

### Pro Bono Client Strategy
Michael plans to offer one free AI implementation to three businesses owned by friends, to build delivery experience, verified testimonials, and case studies before pursuing paying clients.

**Businesses identified:**
- Physique Physio — physiotherapy practice, Mt Tamborine
- Criterion Tavern / Burpengarry Tavern — 2-venue pub operator, Brisbane
- SafetyMate — wholesale safety products, Gold Coast

**Agreed approach:**
- Do NOT run the full Workshop Deck for free work — that is a paid engagement
- Run a lighter 90-minute discovery conversation (extended Clarity Call)
- Identify ONE specific workflow causing real pain
- Implement that ONE thing, measure the result, document it
- The AI Opportunity Audit tool is worth running as intake — practises the diagnostic process
- Deliver a working implementation with a before/after metric, then get a written testimonial
- Cap active pro bono work at two concurrent engagements max given Netlotto crossover constraint

**Sector-specific thinking (to be deep-dived in next session):**
- Physio: admin-heavy, appointment reminders, patient comms, post-treatment follow-up. DO NOT touch clinical/health records data — compliance risk. Best starting point.
- Pubs: social media/events content automation, or supplier ordering. Hospitality owners are time-poor and often tech-skeptical. Relationship closeness matters.
- SafetyMate: B2B quoting, catalogue management, customer follow-up automation. Best B2B case study.

### CEO Intelligence App Concept
Michael's product vision: a personalised AI executive assistant app for CEOs/founders/owners, pre-trained on the specific executive and their company/sector, delivering email triage, competitor intelligence, sector news, LinkedIn/blog posting, and periodic "from the desk of the CEO" staff communications. Future layer: lifestyle personalisation and opt-in brand offers platform targeting high-net-worth executives.

**Assessment:**
- Core concept (AI assistant with deep persistent context on one executive) is genuinely differentiable from generic tools like Copilot or Gemini
- Three distinct product layers bundled together: executive assistant + lifestyle concierge + media/brand deals platform
- Brand offers layer requires ~1,000+ active verified CEOs before it's attractive to brands — years away
- Web app (PWA) first, not native — use existing Next.js stack
- Needs to be validated before being built

**Recommended approach:** Test as a manual service first. Offer a weekly "CEO Intelligence Brief" — curated AI-generated summary of sector movements, competitor activity, and relevant news — to 3-4 consulting clients for $200-400/month. If they pay and use it, build the app. If not, you've learned cheaply.

**Strategic question deferred to next session:** Is this a ProjxAI product or a separate entity/startup?

### Pre-Made Tools Competitive Concern
Every target client is being approached by AI tool vendors and generic consultants with pre-packaged demos. Michael's differentiator is operator-led diagnosis, not a tools catalogue — but he still needs deliverables. This tension (differentiation vs. delivery readiness) is the core go-to-market challenge. **Deferred to Opus 4.7 strategic session for deep analysis.**

### Website vs. Real Work
Decision: the website is good enough now. More features will not get the first client. Real work and testimonials will. The natural rhythm going forward: do real work → document it as a case study → publish on the site. The site improves from real evidence, not speculation.

---

## Claude Design Discovery
Anthropic launched **Claude Design** on 17 April 2026 (Anthropic Labs research preview). Available as a plugin within Claude Cowork for Pro/Max/Team/Enterprise subscribers. Creates visual designs, prototypes, pitch decks, landing pages, social assets, and marketing collateral through conversation. Reads existing brand files/codebases to apply brand colours and typography automatically. Exports to Canva, PDF, PPTX, or HTML. Integrates with Claude Code via handoff bundle. **Replaces or significantly shortens the pptxgenjs scripting approach for future deck and visual work.**

---

## Next Session Priorities

1. **HubSpot integration** — wire `/api/contact` → HubSpot Contacts API (Michael needs to create a private app token first — sign up at HubSpot free tier if not done)
2. **Opus 4.7 strategic session** — using the prompt written at end of this session, covering: pro bono delivery plan per sector, pre-made tools strategy, CEO app concept, product vs. consultancy positioning, 30/60/90 day sequencing
3. Try **Claude Design** plugin in Cowork for next visual deliverable
4. /blog empty state email capture, /pricing page, /case-studies placeholder
5. 6 blog posts to write and publish via Sanity

---

## Technical Notes

- Git workaround confirmed working: `cp -r $REPO/.git /tmp/projxai-git` → set GIT_DIR/GIT_WORK_TREE → fetch → read-tree HEAD → stage specific files only → commit → push
- docx font size = half-points (`size = pt_value × 2`)
- docx spacing/margins = twips (`value = pt_value × 20`)
- pptxgenjs: no rgba() colours, use 6-digit hex only; `ShapeType.ellipse` not `.oval`
- Always validate docx with LibreOffice PDF conversion before reporting done
