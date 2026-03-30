# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ProjxAI** — AI consultancy and toolkit platform for Australian SMEs.
**Entity:** Collicorp Pty Ltd | ABN 80 398 642 662 | Director: Michael Collicoat | Brisbane, QLD
**Domain:** projxai.com.au | **Repo:** github.com/muckerby/projxai-nextjs-sanity

Full project context in `docs/CLAUDE_UPDATED.md`. Read that file at the start of each session.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner configured. Auto-deploy to projxai.com.au on every push to `main` via Vercel.

## Git Identity

```bash
git config user.email 'mcollicoat@gmail.com'
git config user.name 'muckerby'
```

## Brand

- **Primary colour:** `#6B3FE7` (purple)
- **Logo:** `public/images/logo.png` (transparent PNG)
- **Favicon:** `public/favicon.ico`

## Architecture

Next.js 16 App Router, React 19, TypeScript 5.3, Tailwind CSS v4, next-themes (dark mode).

### Routing (`src/app/`)

| Route | Status |
|---|---|
| `/` | ✅ Built — Hero, AudienceStrip, Features (3-pillar), ToolTeasers, StatsStrip, Blog, ConsultingCTA |
| `/services` | ✅ Built — 4-service grid, process, CTA |
| `/services/ai-consulting` | ✅ Built — full copy |
| `/services/ai-implementation` | ✅ Built |
| `/services/ai-content` | ✅ Built |
| `/services/ai-automation` | ✅ Built |
| `/about` | ✅ Built — full copy |
| `/work-with-us` | ✅ Built — email CTA (Calendly pending) |
| `/tools` | ✅ Built — ROAS + Espionage cards |
| `/tools/roas-calculator` | 🔲 Phase 2 |
| `/tools/competitor-espionage-engine` | 🔲 Phase 3 |
| `/blog` | ✅ Exists (Sanity) |
| `/blog/[slug]` | ✅ Exists (Sanity) |
| `/privacy` | ✅ Built — Australian Privacy Act 1988 compliant |
| `/terms` | ✅ Built — Queensland law, limitation of liability |
| `/contact` | ✅ Built — email CTA, link to /work-with-us |

### Key Components (`src/components/`)

- `Header/` — sticky nav, Services dropdown + Tools dropdown, logo PNG (40px, opacity 1), ThemeToggler
- `Hero/` — homepage hero (from home.md copy)
- `Features/` — 3-pillar section (AI Tools, AI Content, AI Consulting)
- `AudienceStrip/` — 4-audience routing cards
- `ToolTeasers/` — ROAS + Espionage dark-bg teasers
- `StatsStrip/` — purple stats banner
- `ConsultingCTA/` — dark CTA banner
- `Footer/` — ProjxAI branding, correct links, ABN

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Theme in `src/styles/index.css`.
Path alias: `@/*` → `./src/*`

### Sanity CMS

Schemas in `sanity/schemaTypes/` (author, category, post, siteSettings).
- Project ID: `zma68sbk` | Dataset: `production`
- Studio URL: https://projxai.sanity.studio/ ✅ deployed
- Studio App ID: `ozd8jpo1zrtzrafj8mki2f7d`
- Config files: `sanity.config.ts`, `sanity.cli.ts` (studioHost: `projxai`)
- Env vars in `.env` (gitignored) and Vercel project settings

### Pending Work (Session 5+)

- Calendly embed on `/work-with-us` (account needed)
- Michael's headshot (400×400px) — replace gradient placeholder on /about and /work-with-us
- `/tools/roas-calculator` — functional build (Phase 2)
- `/tools/competitor-espionage-engine` — functional build (Phase 3)
- projxai.com DNS records (A + CNAME in Cloudflare) — Michael to do manually
- Email capture form on `/tools` wired to Mailchimp/ConvertKit
- Blog: update empty state with "coming soon" email capture (Sanity has no posts yet)

## Contact

- **Email:** michaelc@projxai.com.au (confirmed, use this in all site copy)

## Session History

| Session | Date | Key Outcomes |
|---|---|---|
| 1 | 25 Mar 2026 | Dev machine, GitHub repo, Vercel live, Sanity trial, Stripe sandbox |
| 2 | 25 Mar 2026 | CLAUDE.md, SVG logo, nav restructured, #6B3FE7 brand colour across codebase |
| 3 | 27 Mar 2026 | docs/ folder, logo.png (transparent), favicon.ico, Services dropdown, homepage rebuilt, 8 pages built (/services full, /about, /work-with-us, /tools), Sanity schemas created, Footer updated, Sanity Studio deployed to projxai.sanity.studio |
| 4 | 30 Mar 2026 | Logo fix (40px, opacity 1), Services + Tools dropdowns improved (z-index, shadow, hover), Collicorp → ProjxAI brand sweep across all pages, email updated to michaelc@projxai.com.au, /about reframed to brand/mission focus, /privacy + /terms + /contact pages built, full OG meta tags on all pages, footer /contact link updated, CLAUDE.md updated |
