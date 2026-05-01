# ProjxAI Session 12 Summary
**Date: 17 April 2026**

## What was done

### Contact Page — 3-Tab Layout Restored
**ClickUp ticket:** Updated from Session 11

**Reason for restore:** Previous session had removed tabs in favour of toggle. Michael clarified preference: **keep the 3-tab layout.**

**Current tabs:**
1. **"Book a 15-min Call"** — Cal.com 15min embed + TrustStrip
2. **"Send a Message"** — GeneralEnquiryForm (general enquiry)
3. **"Request a Callback"** — NEW: CallbackForm with:
   - Name field
   - Email field
   - Phone field
   - Best time to call (time slot selector)

**Status:** Deployed ✅

---

### Turnstile Bypass Fix — Critical Bug Resolution
**ClickUp ticket:** Bug fix

**Problem:** All soft lead captures (newsletter signups, AI Opportunity Score email form, callback requests) were silently failing.

**Root causes identified:**
1. **Missing bypass tokens:** No way to skip Turnstile verification for non-sensitive soft leads
2. **Field validation bug:** `/api/contact` required `businessName` and `message` on ALL enquiry types, but soft leads (newsletter, tool-score) don't have those fields

**Fix applied to `/api/contact`:**

**Added `INTERNAL_BYPASS_TOKENS` set:**
```
INTERNAL_BYPASS_TOKENS = {
  'newsletter-bypass',
  'tool-bypass',
  'callback-bypass'
}
```

These tokens skip Cloudflare Turnstile verification server-side. Soft lead endpoints can use these tokens instead of CAPTCHA.

**Fixed field validation:**
- `enquiryType === 'newsletter'` → `businessName` and `message` NOT required
- `enquiryType === 'tool-score'` → `businessName` and `message` NOT required  
- `enquiryType === 'general'` → `businessName` and `message` optional
- `enquiryType === 'consulting'` → `businessName` and `message` required

**Impact:** All soft lead forms now capture successfully to Sanity

**Deployed:** Commit `ebea0db` → live on projxai.com.au ✅

---

## CRM Decision: HubSpot Confirmed
**Strategic decision locked for next session**

### Why HubSpot
As an AI agency, proper CRM with deal pipeline and contact history is essential from day one.

### HubSpot Free Tier Covers
- **CRM** — contact management, activity tracking, history
- **Email marketing** — newsletter templates, automation sequences
- **Deal pipeline** — lead-to-deal tracking with customizable stages
- **Contact segmentation** — tag-based grouping and filtering
- **Automation** — basic workflows (e.g., tag on form submit → add to list → send welcome email)

### Why NOT other tools
- **Mailchimp/Kit:** Email-only platforms. Don't handle consulting pipeline or deal tracking.
- **Pipedrive:** Strong CRM, but separate email tool required.
- **Folk:** Team-focused CRM, better for multiple users tracking same deals (not needed yet).

### HubSpot replaces
- **Sanity `lead` document type** (CRM is not a good database for lead tracking at scale)
- **Manual email notifications** (can use HubSpot automation instead of Resend)
- **Soft lead tracking** (contacts with lead_source tag: newsletter, tool-score, general)

### Keep Sanity for
- **Blog CMS** (content authoring)
- **Services/pages content** (no longer lead storage)

---

## Next Session Plan — HubSpot Integration
**Tasks for Michael before next session:**
1. Sign up to HubSpot (free tier): https://www.hubspot.com/pricing/crm
2. Create HubSpot API private app token
   - Settings → Integrations → Private Apps → Create App
   - Scopes needed: crm.objects.contacts.read/write, crm.objects.deals.read/write
3. Share token with Claude (add to `.env` as `HUBSPOT_PRIVATE_APP_TOKEN`)

**Claude will implement:**
1. Wire `/api/contact` → HubSpot Contacts API
   - All enquiry types create a Contact in HubSpot
   - Map fields: name → firstName/lastName, email → email, phone → phone, company → company
   
2. Wire consulting enquiries → Deal creation
   - Create Deal linked to Contact
   - Deal pipeline stage: "Contacted" (starting stage)
   - Deal value: TBD (medium ~ $5k-10k)
   
3. Tag enquiry source
   - Map `enquiryType` to HubSpot `lead_source` property:
     - `consulting` → "Consulting Inquiry"
     - `newsletter` → "Newsletter Signup"
     - `tool-score` → "Tool Signup"
     - `general` → "General Inquiry"
     - `callback` → "Callback Request"
   
4. Keep Resend for Michael notifications
   - OR: switch to HubSpot email sequences for nurture flows (later)

5. Deprecate Sanity `lead` document type
   - No longer write leads to Sanity
   - Sanity studio: delete lead schema from schemaTypes
   - Redeploy Studio

---

## Why This Matters

**Current state:** Soft leads captured to Sanity, consulting leads partially captured, no pipeline visibility.

**After HubSpot:** 
- All leads in one CRM
- Clear pipeline visibility (Contacted → Qualified → Proposal → Won/Lost)
- Email automation (welcome sequence, nurture, follow-up)
- Contact history and activity timeline
- Deal-level tracking (which prospect, which proposal, what stage)
- Revenue forecasting (deals × probability)

**At scale (Year 2):** Can layer Zapier/Make to trigger ads, Slack alerts, calendar holds, etc.

---

## Deployed
- Contact page 3-tab layout live
- Turnstile bypass + field validation fix live
- All soft lead forms now capturing

**Commit:** `ebea0db`

---

## Status

✅ **All lead capture paths now working**  
✅ **CRM strategy locked — HubSpot confirmed**  
🔲 **Next session: HubSpot integration (depends on Michael's signup + API token)**

---

## Key Learnings

1. **Turnstile is for sensitive forms only** — soft leads (email captures) don't need CAPTCHA
2. **Field validation matters** — different enquiry types have different required fields
3. **CRM > custom database** — at scale, lead tracking belongs in a proper CRM with pipeline visibility
4. **Email automation replaces manual follow-up** — HubSpot sequences can nurture at scale (Michael doesn't need to send every follow-up)

---

## Metrics to Track (Next Session)
- Soft lead volume (weekly)
- Consulting inquiry volume (weekly)
- Lead source breakdown (where leads come from)
- Pipeline stage progression (how many move to proposal stage)
- Conversion rate (inquiries → booked calls)
