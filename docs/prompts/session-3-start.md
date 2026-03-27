# ProjxAI — Claude Code Session 3 Start Prompt

Copy and paste this entire prompt at the start of every Claude Code session.

---

## PASTE THIS INTO CLAUDE CODE:

```
You are working on ProjxAI — a professional AI consultancy and toolkit platform for Australian SMEs.
Built by Michael Collicoat / Collicorp Pty Ltd (ABN 80 398 642 662), Brisbane QLD Australia.

Read the following files before doing anything else:
- CLAUDE.md (project context)
- docs/architecture/site-architecture.md (full site structure and strategy)
- docs/copy/ (all page copy — use this verbatim when building pages)
- docs/sanity/schemas.js (Sanity schema definitions)
- docs/specs/ (tool specifications)

## TODAY'S SESSION 3 TASKS — work through these in order:

### IMMEDIATE (do first, no discussion needed):
1. Fix .gitignore — add `.env` as its own line, commit and push
2. Delete startup-pro.webp from repo root, commit and push
3. Run: git log --all --full-history -- .env (confirm .env was never committed — report result)

### CRITICAL BUILDS:
4. Fix logo — process public/images/projxai_accurate_original.png with Python PIL to remove white background. Save as public/images/logo.png (transparent). Update navbar component to use this PNG instead of SVG.
5. Generate favicon from logo — 32x32 and 16x16, save to public/favicon.ico
6. Add Services to navbar — new top-level item between Home and Tools, with dropdown:
   - AI Consulting & Strategy → /services/ai-consulting
   - AI Implementation → /services/ai-implementation  
   - AI Content Creation → /services/ai-content
   - AI Tools & Automation → /services/ai-automation
   - All Services → /services
7. Remove from Home page: pricing tiers section, testimonials section, sign in/up remnants, support ticket form
8. Rewrite hero section — use copy from docs/copy/home.md exactly
9. Rewrite 3-pillar features section — use copy from docs/copy/home.md exactly
10. Build /services index page — use copy from docs/copy/services-index.md
11. Build /services/ai-consulting page — use copy from docs/copy/services-ai-consulting.md
12. Build /work-with-us page — use copy from docs/copy/work-with-us.md
13. Build /about page — use copy from docs/copy/about.md
14. Shell /tools index page — card layout, use copy from docs/copy/tools-index.md
15. Configure Sanity schemas — use docs/sanity/schemas.js

### END OF SESSION:
16. Update CLAUDE.md with session 3 outcomes
17. Commit everything with message: "Session 3: services structure, page builds, content, Sanity schemas"

## TECHNICAL REMINDERS:
- Brand colour: #6B3FE7
- Git identity: git config user.email 'mcollicoat@gmail.com' && git config user.name 'muckerby'
- Auto-deploy: every git push deploys to projxai.com.au via Vercel
- Sanity project ID: zma68sbk | Dataset: production
- Working directory: C:\Collicorp\projxai\
- Use Shift+Tab at session start to enable auto-accept all edits
```
