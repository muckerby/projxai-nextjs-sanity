# ProjxAI — Claude Code Session 4 Start Prompt
# Copy and paste this entire block into Claude Code at session start

---

```
You are working on ProjxAI — a professional AI consultancy and toolkit platform for Australian SMEs.
Built by Michael Collicoat / Collicorp Pty Ltd (ABN 80 398 642 662), Brisbane QLD Australia.

Read CLAUDE.md and docs/copy/ before doing anything.

## SESSION 3 WAS COMPLETED — here is what was built:
- .gitignore fixed (.env added), startup-pro.webp deleted
- Logo PNG background removed, saved as public/images/logo.png
- Favicon generated (32x32 + 16x16)
- Services dropdown added to nav (AI Consulting, Implementation, Content, Automation, All Services)
- Home page: pricing/testimonials/sign-in removed, hero rewritten, 3-pillar features rewritten
- New home sections: AudienceStrip, StatsStrip, ToolTeasers, ConsultingCTA
- Pages built: /services, /services/ai-consulting, /services/ai-implementation, 
  /services/ai-content, /services/ai-automation, /work-with-us, /about, /tools
- Sanity schemas installed: author, category, post, siteSettings
- Footer rewritten with ProjxAI branding and ABN
- 46 files changed, pushed to main, live on projxai.com.au

## SESSION 4 TASKS — work through in order:

### FIXES FROM LIVE SITE REVIEW (do first):

1. LOGO — navbar logo is rendering too small/faint. Fix size and opacity in the 
   navbar component. The PNG is at public/images/logo.png — ensure it renders 
   clearly at the correct height (aim for 40px height in navbar).

2. SERVICES DROPDOWN — currently "janky". Fix dropdown styling: proper white/dark 
   background, box-shadow, border-radius, correct z-index so it sits cleanly over 
   page content. Items should have hover states matching brand colour #6B3FE7.

3. BRAND REFERENCES — audit ALL pages and components. Find every instance of 
   "Collicorp Pty Ltd" in visible page copy and replace with "ProjxAI". 
   EXCEPTION: the ABN line in footer must stay as legal text but reformat to:
   "ABN 80 398 642 662 | © 2026 ProjxAI | Brisbane, QLD, Australia"
   Do NOT change internal code variable names, just visible user-facing text.

4. EMAIL REFERENCES — replace ALL instances of michaelc@collicorp.com.au in 
   page copy and components with michael@projxai.com.au

5. ABOUT PAGE — reframe away from personal "blow your trumpet" tone:
   - Remove the "MC" avatar placeholder
   - Change "The person behind ProjxAI" to "Who we are"
   - Refocus on ProjxAI as a brand and its mission
   - Keep Michael's name but reduce prominence — one short paragraph
   - Lead with the company mission and the three principles instead
   - Use copy from docs/copy/about.md as the guide

### NEW BUILDS:

6. /privacy page — build a proper Australian privacy policy page at /privacy.
   Include: what data we collect, how it's used, cookies, third parties, 
   contact for privacy requests. Reference Australian Privacy Act 1988.
   Email for privacy: michael@projxai.com.au

7. /terms page — build terms of service at /terms.
   Include: use of site, disclaimer, limitation of liability, governing law 
   (Queensland, Australia), intellectual property.

8. /contact page — simple contact page at /contact.
   Heading: "Get in touch"
   Body: Short intro — general enquiries, partnerships, media.
   Email: michael@projxai.com.au
   Response time note: within 1 business day.
   No form needed yet — email link only.

9. TOOLS DROPDOWN in nav — currently Tools has no dropdown. Add dropdown with:
   - ROAS Calculator → /tools/roas-calculator
   - Competitor Espionage Engine → /tools/competitor-espionage-engine
   - All Tools → /tools

10. BLOG — the blog index page at /blog currently shows no posts because Sanity 
    has no content yet. Update the empty state to show:
    "Posts coming soon — sign up to be notified" with a simple email input field.
    Style consistently with the rest of the site.

11. HEADSHOT PLACEHOLDER — on /about and /work-with-us, replace the "MC" 
    initials avatar with a properly styled placeholder image component that 
    shows a subtle purple gradient with a person silhouette icon. 
    Add a HTML comment: <!-- Replace with real headshot: 400x400px -->

12. META TAGS — add proper meta title and description to every page:
    - Home: "ProjxAI — AI for Australian Business | Practical AI Implementation"
    - Services: "AI Services for Australian SMEs | ProjxAI"  
    - /services/ai-consulting: "AI Consulting & Strategy Australia | ProjxAI"
    - /services/ai-implementation: "AI Implementation for Business | ProjxAI"
    - /services/ai-content: "AI Content Creation Australia | ProjxAI"
    - /services/ai-automation: "AI Tools & Automation | ProjxAI"
    - /tools: "Free AI Tools for Australian Business | ProjxAI"
    - /about: "About ProjxAI | AI Consultancy Brisbane Australia"
    - /work-with-us: "Work With Us | Book a Free AI Discovery Call | ProjxAI"
    - /blog: "AI Blog for Australian Business | ProjxAI"
    Use Next.js Metadata API (not react-helmet).

### INFRASTRUCTURE:

13. Add DNS records for projxai.com in Cloudflare — Michael to do manually:
    Type: A | Name: @ | Content: 76.76.21.21 | Proxied
    Type: CNAME | Name: www | Content: cname.vercel-dns.com | DNS only
    Then add projxai.com as custom domain in Vercel project settings.

14. Update CLAUDE.md with Session 4 outcomes.

15. Commit everything: "Session 4: fixes, new pages, meta tags, brand cleanup"

## TECHNICAL REMINDERS:
- Brand colour: #6B3FE7
- Git: git config user.email 'mcollicoat@gmail.com' && git config user.name 'muckerby'
- Email on site: michael@projxai.com.au
- Sanity project ID: zma68sbk | Dataset: production
- Working directory: C:\Collicorp\projxai\
- Auto-deploy: every push to main → projxai.com.au via Vercel
- Use Shift+Tab at session start to enable auto-accept all edits
- Context window: if approaching auto-compact, update CLAUDE.md and commit first
```
