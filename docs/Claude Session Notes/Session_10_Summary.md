# ProjxAI Session 10 Summary
**Date: 15 April 2026**

## What was done

### Phase B Service Pages Shipped Live
All 5 rewritten service pages deployed to projxai.com.au ✅

- `/services/ai-consulting` — AI Opportunity Audit
- `/services/ai-implementation` — AI Strategy & Roadmap
- `/services/ai-content` — AI Workflow Implementation
- `/services/ai-automation` — AI Retainer
- `/services/ai-infrastructure` — AI Infrastructure & Hosting

**Status:** All live and verified

### Sanity Webhook Setup for Instant Blog Revalidation
**Problem:** ISR was 60-second delay before blog post updates appeared live.  
**Solution:** Webhook-based on-demand revalidation.

**Configuration:**
- Sanity project: `zma68sbk`
- Webhook created in sanity.io/manage → API → Webhooks
- Points to: `https://www.projxai.com.au/api/revalidate`
- Trigger: Create/Update/Delete on `_type == "post"`
- Authentication: secret header `x-sanity-webhook-secret` verified server-side in route

**Deployed:**
- `/api/revalidate` route created in Next.js
- Clears `/blog` and `/blog/[slug]` cache on any post publish
- Near-instant updates (sub-second)
- `SANITY_REVALIDATE_SECRET` added to `.env` and Vercel env vars

**Secret:** `066e3230819a813c1fe5c70664283f1f19e40aad5e1e60d7dbae6902a6a8c65f`

---

### Blog Content & GROQ Query Updates
**GROQ query improved:**
- Body images now use `asset->` to expand full asset references
- Main image also uses `asset->` expansion
- Image URLs fully resolved before rendering

**Portable Text renderer enhanced:**
- Added null guard for missing assets
- Gracefully skips missing images instead of crashing build
- Robust error handling

**Blog posts published:**

#### 2 Michael Articles (Published)
1. **"What is ROAS and why most Australian eCommerce businesses are calculating it wrong"**
   - Created via `create_documents_from_json`
   - Slug: `/blog/what-is-roas-australian-ecommerce`
   - Document ID: `9a8f7995-cade-4dd8-aa71-a72abd94561d`
   - Verified live ✅

2. **"5 ways Australian SMEs are already using AI in 2026 (and how to catch up)"**
   - Created via `create_documents_from_json`
   - Slug: `/blog/australian-smes-using-ai-2026`
   - Document ID: `77ecf222-d532-4a22-99c2-7980fbebb69b`
   - Verified live ✅

#### 2 Auto-Generated Posts (Unpublished)
- "How to Brief an AI Tool" (ID: 76d6a909) → moved to drafts
- "How to Measure ROI" (ID: a07c32dd) → moved to drafts
- Reason: Auto-generated content didn't meet quality bar; will rewrite or remove

#### 1 Blog Post Rewritten
- **"AI Adoption in Australian Businesses"** — body fully replaced with clean, original prose
  - 5 H2 sections (no bullets)
  - Proper Further Reading links
  - Actionable insights
  - Used `patch_document_from_json` with set path "body" and full Portable Text array
  - **Critical:** Never use `patch_document_from_markdown` for body replacement — it appends instead of replaces

---

## Git Workflow Issue Resolved
**Problem:** Stale `/tmp/projxai-git` was accidentally reverting recent commits.

**Root cause:** When using GIT_DIR workaround (due to FUSE lock issues), git index was stale. `git reset --soft` was restaging old file versions from index.

**Fix applied:**
1. Always refresh git dir from `$WORK/.git` first
2. Immediately fetch FETCH_HEAD from remote
3. Verify `git log --oneline -5` matches expected remote state
4. Only then stage specific files

**Why:** Prevents accidentally reverting work from previous sessions when reset-soft pulls stale versions from index.

**How to apply in future sessions:**
```bash
cp .git /tmp/projxai-git
export GIT_DIR=/tmp/projxai-git
git fetch  # Always fetch first
git reset --soft FETCH_HEAD  # Reset to remote HEAD
git log --oneline -5  # Verify state
# Now add specific files (never git add -A)
git add src/app/page.tsx
```

---

## Key Learning on Sanity Patching

**Critical distinction:**

- **`patch_document_from_json` with `set` path "body"** → Replaces entire body with full Portable Text array. Use this for body rewrites.
  
- **`patch_document_from_markdown`** → Appends markdown content to a field. Useful for extending content, NOT for replacement.

**Example (correct):**
```json
{
  "set": {
    "path": "body",
    "value": [{ "_type": "block", "text": "New content..." }, ...]
  }
}
```

**Why it matters:** Blog post bodies are Portable Text arrays in Sanity. Using markdown patch appends instead of replaces, leaving old content + new content. Using JSON patch with full array replaces entirely.

---

## No Images on Published Articles
Unsplash API key was invalid, so both published articles ship without hero images. This can be fixed by:
- Michael adding images manually via Sanity Studio (`/tools` → open post → upload image)
- OR: fixing Unsplash API key in `.env` for future posts

Images are optional; articles read fine without them.

---

## Next Session Priorities (Updated)

1. **Build Cowork blog skill** — document brand voice, content strategy, quality standards, worked examples from Michael's 2 articles
2. **Redesign scheduled task** as brief-executor — Michael writes article briefs, scheduled task executes (write, publish, promote)
3. **Create content queue** from Michael's 8 article ideas
4. **Fix image upload pipeline** in scheduled task (mainImage.asset._ref patching)
5. **Add images** to the 2 published articles (manual or API)
6. **Free tools — AI Opportunity Score** (priority #1)
7. **Email capture on /tools** wired to Mailchimp/ConvertKit
8. **Full site audit** against `docs/STYLE_GUIDE.md`
9. **`npx sanity deploy`** (redeploy Studio with updated lead schema)

---

## Deployed
- All Phase B service pages live
- Webhook revalidation live
- 2 Michael articles published
- Git workflow fixed and tested

---

## Status
✅ **Blog infrastructure complete. Publishing pipeline live. Ready for content acceleration.**
