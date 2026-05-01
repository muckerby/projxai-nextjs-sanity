# Claude Session Notes — ProjxAI

Complete record of all development sessions. **Updated through Session 14 (22 Apr 2026).**

---

## Session 1 (25 Mar 2026)
**Foundation setup**
- Dev machine configured
- GitHub repo created (github.com/muckerby/projxai-nextjs-sanity)
- Vercel live deployment via auto-push-to-main
- Sanity trial instance created
- Stripe sandbox

---

## Session 2 (25 Mar 2026)
**Brand identity & codebase structure**
- CLAUDE.md created with project instructions
- SVG compass logo implemented (solid purple circle, broad white blades, centre pivot hole)
- Primary brand colour locked: `#6B3FE7` (purple)
- Navigation restructured

---

## Session 3 (27 Mar 2026)
**Site architecture & CMS foundation**
- `docs/` folder established
- `logo.png` generated (transparent background)
- `favicon.ico` created
- Services dropdown implemented
- Homepage rebuilt with hero section
- **8 pages built:** `/services`, `/services/ai-consulting`, `/services/ai-implementation`, `/services/ai-content`, `/services/ai-automation`, `/about`, `/work-with-us`, `/tools`
- **Sanity schemas created:** author, category, lead, post, siteSettings
- Footer updated with proper branding
- Sanity Studio deployed to `projxai.sanity.studio`

---

## Session 4 (30 Mar 2026)
**Brand consolidation & core pages**
- Logo refinement: 40px, opacity 1.0
- Services + Tools dropdowns improved (z-index, shadow, hover states)
- **Brand sweep:** Collicorp → ProjxAI across all pages
- Email updated globally to `michaelc@projxai.com.au`
- `/about` reframed to mission/brand focus
- **Legal pages built:** `/privacy` (Australian Privacy Act 1988), `/terms` (Queensland law, limitation of liability)
- `/contact` page built (two-form layout: general + consulting enquiry)
- Full OG meta tags on all pages
- Footer `/contact` link updated
- CLAUDE.md updated with complete project context

---

## Session 5 (30 Mar 2026)
**Lead capture system v1**
- Sanity `lead` schema created with fields: name, email, businessName, message, enquiryType, submittedAt, leadPath, calBookingId
- `/api/contact` route implemented: Cloudflare Turnstile verify + Sanity lead write + Resend email notification
- `/contact` rebuilt as two-form page (general enquiry + consulting enquiry)
- All visible email addresses removed from public pages
- Service page CTAs updated to `/contact#consulting`
- `work-with-us` page email link replaced with `/contact#consulting` redirect

---

## Session 6 (3 Apr 2026)
**Smart lead pipeline & full homepage redesign**
- Sanity lead schema expanded: industry, aiMaturity, areasOfInterest, biggestChallenge, timeframe, leadPath, calBookingId
- `/api/intake` route created for post-initial-enquiry flow
- `/contact` rebuilt with two-path flow:
  - **Path A:** Book a Call via Cal.com 15-minute discovery
  - **Path B:** Start Intake (6-question smart form)
- On intake submit: Sanity lead patched + enriched email sent to michaelc@projxai.com.au
- **Homepage complete rewrite:**
  - New hero section with compelling proposition
  - 3-pillar features grid
  - Audience strip (target segments)
  - Statistics section
  - CTA zone
- **All 4 service pages rewritten** with real copy and pricing:
  - AI Consulting (from $750)
  - AI Implementation (from $2,500)
  - AI Content (from $3,000/workflow)
  - AI Automation (from $1,000/month)
- **New service page:** `/services/ai-infrastructure` (from $1,500)
- Navigation updated with correct service links
- Service index updated

---

## Session 7 (6 Apr 2026)
**Design system v1 & blog connection**
- **Digital Architect design system** applied site-wide
- Compass SVG logo (broad blades + pivot hole) in Header + Footer
- All hero H1 fonts: `clamp(2rem, 5vw, 3.25rem)`
- Nav font: `0.9375rem`
- Approved copy applied: homepage headline, services, about, work-with-us
- All personal Michael name references removed from public pages
- Cal.com link wired on Work With Us page
- **Blog connected to Sanity:**
  - Live post fetching from CMS
  - `/blog/[slug]` article pages implemented
  - PortableText rendering
  - ISR revalidate=60
- Sanity blog post slug bug fixed (API patch)
- Git index lock issue diagnosed and fixed
- `docs/STYLE_GUIDE.md` created with complete design system documentation

---

## Session 8 (10 Apr 2026)
**Cal.com embed fix, strategy review, ClickUp setup**

### Cal.com Booking Fix
- Previous iframe approach was blocked by X-Frame-Options: SAMEORIGIN
- Fixed via official Cal.com JS IIFE embed (embed.js from app.cal.com)
- CalBookingPanel now always-mounted (CSS show/hide, not conditional render) to prevent reinitialisation
- Committed: c9dfe3c | Verified live ✅

### Strategy Documents Reviewed
All 4 strategy docs in `docs/ProjxAI Digital Business/Strategy Work/` read and analysed:
- **Doc1:** Site Audit — positioning reset, trust fixes, 17-page architecture, vertical/use-case pages
- **Doc2:** Competitor Intelligence — 11 AU competitors profiled (IOTAI, Advancer highest threat)
- **Doc3:** Marketing Strategy — 3-track revenue (direct SME + white-label + workshops), 90-day plan
- **Doc4:** Tools & Services — full portfolio matrix, offer ladder, phased release

### Key Business Decisions
1. Go for broke — build comprehensively (Netlotto income provides runway)
2. Retire "Digital Architects" → "Practical AI systems for Australian SMEs"
3. Remove ALL pricing from live site
4. Remove unsupported stats and proof claims
5. Switch Cal.com to 15-minute discovery calls
6. Both tracks simultaneously: direct SME + white-label/fractional
7. LinkedIn parked until Netlotto transition
8. ClickUp adopted as PM tool

### ClickUp Setup
- Workspace: Projxai | Space: ProjxAI
- 7 folders created: Phase 0 (Immediate Site Fixes), Website Build, Templates & Deliverables, Free Tools, Paid Products, Content & Blog, Marketing & Outreach
- 14 lists created with descriptions
- MCP connected — Claude can create/update tasks directly

### Next Session Plan
1. Master Build Plan (.docx)
2. AI Opportunity Audit Template (.docx)
3. Same-Day Proposal Template (.docx)
4. Partner One-Pager (.docx)
5. ClickUp population
6. Phase 0 site fixes

---

## Session 9 (11 Apr 2026)
**Master Build Plan + 3 core templates**

### Documents Created
- **`ProjxAI_Master_Build_Plan.docx`** (33KB) — comprehensive Phase 0–3 plan. Includes dependency map, timeline vs. Michael's schedule, KPIs, competitor quick-reference, messaging rules, appendix.
- **`ProjxAI_AI_Opportunity_Audit_Template.docx`** (20KB) — 7-section working template. Covers: business context, workflow inventory, readiness scoring (6 dimensions), use-case priority matrix, ROI frame, governance/privacy, action summary.
- **`ProjxAI_Same_Day_Proposal_Template.docx`** (15KB) — post-Clarity-Call proposal. Two offer options (Audit + Pilot Build), terms, signature block.
- **`ProjxAI_Partner_One_Pager.docx`** (14KB) — referral partner overview + white-label/fractional detail.

### ClickUp Fully Populated
- ~45 tasks across all 7 folders / 14 lists
- **Phase 0 (urgent):** pricing removal, tagline retirement, 15min Cal link, stats cleanup, route fixes
- **Website Build:** core rewrites, service pages, verticals (5), use-cases (9), new pages
- **Templates:** audit template (done), roadmap template, pilot scope, retainer SLA, call scorecard, follow-up sequences
- **Free Tools:** AI Opportunity Score (priority), ROI Calculator, 3 more tools, prompt library
- **Paid Products:** 3 products (Months 3-4)
- **Blog:** 6 foundation posts (Weeks 4-6)
- **Outreach:** warm network list, partner list, CRM setup, white-label outreach

### Build Sequence
1. Phase 0 site fixes
2. Service page restructure (Weeks 1-2)
3. Contact page restyle (Week 2)
4. AI Opportunity Score tool (Weeks 5-6)
5. 3 vertical pages + 2 use-case pages (Weeks 5-6)
6. 6 blog posts (Weeks 4-6)
7. Phase 2 services + products (Months 3-4)

### Michael's Actions Before Next Session
- Create 15-minute Cal.com booking link
- Build warm network outreach list
- Choose CRM tool (HubSpot / Pipedrive / Folk)
- Export Partner One-Pager to PDF

---

## Session 10 (15 Apr 2026)
**Phase B live, webhook, blog publishing, git fix**

### Phase B Service Pages Shipped
- AI Opportunity Audit, AI Roadmap Sprint, Pilot Workflow Build, Managed AI Operations, AI Infrastructure
- All live on projxai.com.au ✅

### Sanity Webhook Setup
- Created webhook in sanity.io/manage → https://www.projxai.com.au/api/revalidate
- Fires on Create/Update/Delete for `_type == "post"`
- `/api/revalidate` route created — clears /blog and /blog/[slug] cache on publish
- Near-instant blog updates (replaces 60s ISR wait)
- Secret header verification in place

### Blog Updates
- GROQ query updated: body images now use `asset->` to expand references
- Portable Text image renderer has null guard — missing assets skip gracefully
- Blog post "AI Adoption in Australian Businesses" body fully rewritten (5 H2 sections, proper Further Reading)
- Used `patch_document_from_json` with set operation (patch_document_from_markdown appends, not replaces)
- 2 auto-generated posts unpublished: "How to Brief an AI Tool" + "How to Measure ROI"
- 2 Michael articles published:
  - "What is ROAS and why most Australian eCommerce businesses are calculating it wrong"
  - "5 ways Australian SMEs are already using AI in 2026 (and how to catch up)"
- Both verified live ✅

### Git Fix
- Stale `/tmp/projxai-git` was dropping files accidentally
- Solution: always refresh git dir from `$WORK/.git` AND fetch remote before staging
- Future: after GIT_DIR refresh, run `git fetch` + `git reset --soft FETCH_HEAD` then add specific files only

### Key Learning
**Patch document body:** Always use `patch_document_from_json` with set path "body" and full Portable Text array. Never use patch_document_from_markdown for body replacement.

---

## Session 11 (16 Apr 2026)
**Contact restyle, Security/Privacy page, AI Opportunity Score tool**

### Contact Page Restyle
- Confirmed Cal.com 15min slot live at `michael-collicoat/15min`
- Removed 3-tab layout; Cal.com 15min booking is primary hero action
- "Prefer to send a message instead?" toggle reveals GeneralEnquiryForm
- Callback tab removed
- TrustStrip: Brisbane, 15 min, privacy, no hard sell
- ConsultingEnquiryForm intake: stepped flow (one question/screen), Step X of 6 progress bar, Back/Next nav
- Hero copy: "Let's talk about your business."
- Metadata: "Contact ProjxAI | Book a Free Clarity Call"
- Verified live ✅

### Security & Privacy Page
- `/security-privacy` built with 6 plain-English principles
- FAQ accordion (5 questions)
- Disclaimer: not a legal compliance statement
- CTA to Clarity Call + AI Infrastructure
- Footer link added under Legal
- Verified live ✅

### AI Opportunity Score Tool (Priority #1)
- `/tools/ai-opportunity-score` built — 12 questions, 6 dimensions
- Score gauge, readiness band (4 bands), dimension breakdown bars
- Top 3 personalised use cases based on answers
- Optional email capture before results
- `/tools` page hero updated to feature this as live
- ROAS moved to Phase 2
- Verified live ✅

### Git Workflow Refined
- Always refresh GIT_DIR from `$WORK/.git`
- Immediately fetch FETCH_HEAD before staging
- Verify `git log --oneline -5` matches expected remote state

---

## Session 12 (17 Apr 2026)
**Contact page restored, Turnstile bypass fix, HubSpot confirmed**

### Contact Page (ContactTabPanel)
- Restored 3-tab layout Michael preferred: "Book a 15-min Call", "Send a Message", "Request a Callback"
- Previous session had incorrectly removed tabs in favour of toggle
- Committed: ebea0db | Verified live ✅

### Turnstile Bypass Fix
- Added `INTERNAL_BYPASS_TOKENS` set with `newsletter-bypass`, `tool-bypass`, `callback-bypass`
- These tokens skip Cloudflare Turnstile verification server-side
- Fixed second bug: soft-lead enquiry types (`newsletter`, `tool-score`) no longer require `businessName` and `message` fields
- Both bugs were silently dropping all soft lead captures

### CRM Decision: HubSpot Confirmed
- HubSpot handles both soft leads (newsletter, tool captures as contacts with source tag) AND consulting pipeline (contacts + deals)
- Free tier covers CRM + email marketing + contact management + automation
- Will replace entire Sanity lead pipeline + newsletter platform
- Next session: wire `/api/contact` → HubSpot Contacts API
- Map `enquiryType` to HubSpot `lead_source` (consulting / newsletter / tool-score / general)
- Deprecate Sanity `lead` document type once HubSpot confirmed

### Why HubSpot
As an AI agency, proper CRM with deal stages and contact history is critical from day one.

---

## Session 13 (18 Apr 2026)
**About page operator story, workshop deck, 90-day roadmap**

### ClickUp Update
- All task statuses updated
- Detailed comments added to all completed tasks

### About Page Rewrite
- `/about` fully rewritten around operator story narrative
- Hero: "Built by an operator. Not a consultant." (dark #151c27 background)
- Operator story: Michael's 37-year background, GM-level P&L, AI in production
- 4 credential callout cards: 37+yrs, GM operator, AI in production, AU context
- Why-it-matters 3-pillar grid
- Origin story section with 4 stats row
- Business entity section (Collicorp Pty Ltd, ABN)
- CTA: Clarity Call + View Services
- Committed: 5e454c1 | Verified live ✅

### AI Roadmap Sprint Deliverables
- **`ProjxAI_AI_Roadmap_Sprint_Workshop_Deck.pptx`** (327KB, 12 slides)
  Full brand-compliant facilitator deck: title, agenda, what-is-sprint, business context questions, workflow inventory table, 2×2 prioritisation matrix, feasibility 6-dimension scoring, 3-phase roadmap overview, phase 1 detail, resource/budget table, governance risk cards, next steps close.

- **`ProjxAI_AI_Roadmap_Sprint_90Day_Template.docx`** (22KB, 556 paragraphs)
  8 sections: executive summary, phase 1 foundation, phase 2 pilots, phase 3 scale, KPIs, budget, governance/risk, sign-off. Full fillable tables.

- Both saved to `/projxai/` workspace folder.

---

## Session 14 (22 Apr 2026)
**Strategic Foundation v1, four key business decisions**

### Strategic Foundation v1 Produced
- `docs/ProjxAI Digital Business/Strategy Work/ProjxAI_Strategic_Foundation_v1.md` (34KB, 12 parts)
- Comprehensive strategic operating document replacing Doc1-Doc4 as source of truth

### Four Key Decisions — Final Positions

#### 1. Positioning — MAJOR VARIATION
- **Issue:** Michael raised moral/ethical concern about using Project ABE (even anonymised) as hero credential. Netlotto owns the IP.
- **Decision:** Project ABE is DROPPED from public positioning entirely. No anonymised case study, no ASX-listed competitor framing.
- **Replacement anchor:** The Operator Story. Michael himself is the credential — 30+ year digital operator, founder of ProjxAI, has built AI-driven marketing/automation systems inside real Australian businesses.
- **Status:** Parts 2 and 4 of Strategic Foundation need rewrite to v1.1

#### 2. Netlotto Retainer — DEFERRED
- **Issue:** Michael does NOT want to table this within 14 days. Prefers to hold until trigger point.
- **Decision:** Prepare one-pager as DRAWER asset (keep ready, don't send). Salary stays flowing. ProjxAI revenue is additive, not replacement.
- **Revised target:** $30-45k in 90 days (down from $81k) while on Netlotto salary

#### 3. Audit Webapp — AGREED, START MONDAY
- **Build #1 confirmed.** End-May ship target.
- **Scope:** Functional requirements, question flow, scoring logic, output format, lead capture → HubSpot, pricing (free curated / $295 paywalled)
- **Status:** "Excited to start this one"

#### 4. CEO Coaching — AGREED but SEQUENTIAL
- Ships AFTER Audit webapp is live
- Revised launch: late June / early July 2026
- Build asset library (course structure, Cowork setup playbook, prompt library, templates, landing page) in parallel background work

### Context
- Michael: $130k base + 1% commission + super at Netlotto (still employed)
- Revenue at Netlotto declining
- Wife's salary covers non-mortgage
- Minimum need: $6k/mo (mortgage + car)
- Four warm prospects: Physique Physio, Criterion Taverns → Feros Group, Safetymate, En Perso
- Cybernara parked
- ProjxAI hours: Wed/Fri/Sat + evenings (~22 hrs/week)

### How to Apply
- Never reference Project ABE, Netlotto, or ASX-listed competitors in public copy
- All positioning rewrites must anchor to operator credibility
- Netlotto retainer pitch = drawer asset only
- Audit webapp is active build priority
- CEO Coaching is follow-on revenue engine
- Revenue pressure is moderate (not acute) while Netlotto salary continues

---

## Key Learnings Across All Sessions

### Git Workflow (Persists)
```bash
# Always use GIT_DIR workaround due to FUSE lock issue
cp .git /tmp/projxai-git
export GIT_DIR=/tmp/projxai-git

# After any reset, always verify remote state
git fetch
git reset --soft FETCH_HEAD
git log --oneline -5  # verify this matches expected state

# Stage specific files only (never git add -A)
git add path/to/file
```

### Sanity Patching (Critical)
- **For body/content replacement:** Always use `patch_document_from_json` with set path "body" and full Portable Text array
- **For field appends:** Use `patch_document_from_markdown` for markdown content (but NOT for body replacement)
- Blog post slugs: always use "Generate" button, never paste body into slug field

### Image Upload Pipeline
- Use Sanity API + CDN URLs directly
- Never give up on images because a third-party key failed

### ClickUp Workflow
- Always add detailed comment on every completed task
- Status change alone is not enough for tracking
- Use as second brain for context and decision tracking

### Design System
- Primary colour: `#6B3FE7` (hex values only, never RGB)
- Logo: inline SVG compass (not `<img>`)
- Dark mode enabled via next-themes
- All hero H1: `clamp(2rem, 5vw, 3.25rem)`
- Nav font: `0.9375rem`
- See `docs/STYLE_GUIDE.md` for complete system

### Cal.com Integration
- Use official JS embed (embed.js from app.cal.com), NOT iframe
- Always-mount component via CSS show/hide to prevent reinitialisation
- Current booking link: `michael-collicoat/15min`

### Lead Capture (Now HubSpot)
- All enquiries → HubSpot Contacts API
- Consulting enquiries also create Deal in pipeline
- Soft leads (newsletter, tool-score) tagged with `lead_source`
- Keep Resend for Michael notification emails

---

## Current Status (End of Session 14)

### ✅ Completed
- Site live on projxai.com.au with auto-deploy via Vercel
- Sanity CMS fully configured (blog live, lead pipeline ready for HubSpot)
- All 5 service pages live with real copy
- AI Opportunity Score tool live
- Contact page with Cal.com 15min booking
- Security/Privacy page
- About page with operator story
- 2 published blog articles
- 4 strategic templates (Master Plan, Audit, Proposal, Partner One-Pager)
- 2 workshop deliverables (Workshop Deck, 90-Day Roadmap Template)
- ClickUp fully populated (~45 tasks)

### 🔲 Next Session Priorities
1. HubSpot integration — wire `/api/contact` → HubSpot Contacts API (Michael signs up + creates API token)
2. `/blog` empty state email capture
3. `/pricing` page
4. `/case-studies` placeholder
5. 6 blog posts queued for writing
6. Full site audit against `docs/STYLE_GUIDE.md`
7. npx sanity deploy (redeploy Studio with updated lead schema)

### 🚀 Build Priorities (Post-HubSpot)
1. **Audit Webapp** (Build #1) — end of May ship
2. CEO Coaching (Build #2) — late June / early July

---

**Last updated:** 22 April 2026 (Session 14)
**Next session:** TBD
