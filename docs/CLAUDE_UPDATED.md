# CLAUDE.md — ProjxAI Project Context
# Last updated: Session 3 — 25 March 2026
# Read this file at the start of every Claude Code session

---

## Project Overview

**Product:** ProjxAI — AI consultancy and toolkit platform for Australian SMEs
**Entity:** Collicorp Pty Ltd | ABN 80 398 642 662
**Director:** Michael Collicoat | Brisbane, QLD, Australia
**Primary domain:** projxai.com.au
**Secondary domain:** projxai.com (DNS pending)
**ASIC registered:** Yes — business name PROJXAI registered 25 March 2026

---

## Tech Stack

- **Framework:** Next.js 16 with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity (project ID: zma68sbk, dataset: production)
- **Deployment:** Vercel (auto-deploy on push to main)
- **DNS / CDN:** Cloudflare
- **Payments:** Stripe (AUD, sandbox — switch to live before Phase 3)
- **Repo:** github.com/muckerby/projxai-nextjs-sanity (public)

---

## Working Directory

```
cd C:\Collicorp\projxai
```

Always navigate here before starting a session.

---

## Git Identity (set at repo level)

```bash
git config user.email 'mcollicoat@gmail.com'
git config user.name 'muckerby'
```

---

## Environment Variables

Location: `C:\Collicorp\projxai\.env` — gitignored, never commit
Also set in Vercel Project Settings > Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=zma68sbk
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## Brand

- **Primary colour:** #6B3FE7 (purple)
- **Brand name:** ProjxAI
- **Tagline:** Navigating AI for Business
- **Logo file:** public/images/logo.png (transparent PNG — created Session 3)
- **Favicon:** public/favicon.ico

---

## Site Architecture

Full architecture document: `docs/architecture/site-architecture.md`

### Navigation structure
Home | Services (dropdown) | Tools (dropdown) | Blog | About | Work With Us

### Services dropdown
- AI Consulting & Strategy → /services/ai-consulting
- AI Implementation → /services/ai-implementation
- AI Content Creation → /services/ai-content
- AI Tools & Automation → /services/ai-automation
- All Services → /services

### Tools dropdown
- ROAS Calculator → /tools/roas-calculator (free, Phase 2)
- Competitor Espionage Engine → /tools/competitor-espionage-engine ($99, Phase 3)
- All Tools → /tools

### All URLs
/ | /services | /services/ai-consulting | /services/ai-implementation
/services/ai-content | /services/ai-automation | /tools | /tools/roas-calculator
/tools/competitor-espionage-engine | /blog | /blog/[slug] | /about
/work-with-us | /contact | /privacy | /terms

---

## Target Audiences

1. **SME owners** (5-100 staff) — want AI strategy, don't know where to start
2. **eCommerce operators** — want automation, better ROAS, competitor intel
3. **Marketing managers** — need AI content workflows at scale
4. **Agency owners** — want to add AI services to their offering

---

## Income Streams

1. **Affiliate** (Phase 2): ROAS Calculator → email capture → affiliate tool recommendations
2. **$99 product** (Phase 3): Competitor Espionage Engine — automated delivery via Make.com
3. **Consulting** ($1,500+): AI audit, strategy, implementation — book via /work-with-us
4. **Lead gen**: Email capture → nurture sequences → consulting pipeline

---

## Sanity CMS

- Studio: https://projxai.sanity.studio (or localhost:3333)
- Login: michaelc@collicorp.com.au
- Project ID: zma68sbk | Dataset: production | Org ID: ooMfy8zSa
- Schemas: author, category, post, siteSettings (see docs/sanity/schemas.js)
- API token: KeePassXC vault

---

## Vercel

- Project: projxai-nextjs-sanity
- Team: muckerbys-projects
- Auto-deploy: every push to main branch
- Manual deploy fallback: `npx vercel --prod` from project root
- Production URL: projxai-nextjs-sanity.vercel.app (also live on projxai.com.au)

---

## Key Files

| File | Purpose |
|---|---|
| docs/prompts/session-3-start.md | Session start prompt — read at beginning of each session |
| docs/architecture/site-architecture.md | Full site strategy and content plan |
| docs/copy/*.md | Page copy — use verbatim when building pages |
| docs/sanity/schemas.js | Sanity schema definitions |
| docs/specs/roas-calculator-spec.md | ROAS Calculator functional spec |
| docs/specs/espionage-engine-spec.md | Espionage Engine functional spec |
| docs/marketing/marketing-plan.md | 90-day marketing plan |
| docs/marketing/blog-posts-draft.md | First 2 blog posts — ready to paste into Sanity |

---

## Session History

| Session | Date | Key Outcomes |
|---|---|---|
| Session 1 | 25 Mar 2026 | Dev machine configured, GitHub repo, Vercel live, Sanity trial started, Stripe sandbox |
| Session 2 | 25 Mar 2026 | Secure Boot, CLAUDE.md, Railway/Netlify deleted, Vercel webhook fixed, SVG logo, nav restructured, #6B3FE7 across 29 files |
| Session 3 | 25 Mar 2026 | Architecture v2.0 doc, /docs folder structure, all copy files, Sanity schemas, tool specs, marketing plan. Site builds: [update at session end] |

---

## Claude Code Session Start Checklist

1. `cd C:\Collicorp\projxai`
2. `claude` — then Shift+Tab to enable auto-accept
3. Paste the session start prompt from docs/prompts/session-3-start.md
4. Verify git identity is set
5. Confirm localhost:3000 is running (`npm run dev` if not)

---

## Important Notes

- `.env` is gitignored — never commit it
- `startup-pro.webp` was deleted from root in Session 3
- Sanity 30-day Growth Trial started 25 March 2026 — schemas must be configured ASAP
- projxai.com DNS records still needed in Cloudflare (A + CNAME same as .com.au)
- Calendly account needed for Work With Us page booking embed
- Michael's headshot needed for About and Work With Us pages (400x400px)
- All affiliate program applications pending — see docs/marketing/marketing-plan.md
