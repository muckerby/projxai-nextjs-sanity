# Competitor Espionage Engine — Functional Specification
# File: docs/specs/espionage-engine-spec.md
# Version: 1.0 | Session 3 | 25 March 2026

---

## Overview

A $99 AUD paid digital product. Customer enters a competitor's website URL, pays via Stripe, and receives a full AI-generated competitor advertising intelligence report — delivered to their email within 60 minutes.

The entire process is automated: Stripe payment → Make.com webhook → Apify scraper → Claude API analysis → PDF generation → email delivery. No manual intervention required.

URL: /tools/competitor-espionage-engine

---

## Customer Journey

1. Customer lands on sales page at /tools/competitor-espionage-engine
2. Reads sales page — understands what they get
3. Enters competitor URL in the form
4. Clicks "Get the Report — $99"
5. Stripe Checkout opens (hosted payment page)
6. Customer pays $99 AUD
7. Stripe webhook fires to Make.com
8. Automated pipeline runs (< 60 minutes)
9. Customer receives email with PDF report attached
10. Customer can request one revision/update within 7 days (manual — email support)

---

## Sales Page Structure

### Hero
Headline: Your competitors are running ads. Find out exactly what they're doing.
Subhead: The Competitor Espionage Engine delivers a complete intelligence report on any competitor's ad strategy — creative formats, messaging angles, spend estimates, targeting clues, and the gaps you can exploit. Automated. Accurate. Delivered in under an hour.
Price: $99 AUD — one report

CTA: [Competitor URL input field] + "Get the Report — $99" button

### What's In the Report (6 items)
1. Active Ad Creatives — Every ad format they're currently running (image, video, carousel)
2. Messaging Analysis — The exact angles, hooks, and value propositions they're testing
3. Ad Frequency & Spend Estimates — How aggressively they're spending and on which platforms
4. Targeting Signals — Audience clues based on creative, copy, and platform placements
5. Creative Trends — What's working for them based on ad longevity (longer running = better performing)
6. Your Opportunity Gap — AI analysis of what they're NOT doing that you could own

### Social Proof (placeholder until real)
"Saved me weeks of manual research" — eCommerce store owner, Sydney
"The gap analysis alone was worth 10x the price" — Marketing Manager, Brisbane

### FAQ
Q: What competitors can I report on?
A: Any business with a Facebook/Instagram page running ads via Meta Ad Library. Works for any industry.

Q: How is this different from just checking Meta Ad Library myself?
A: Meta Ad Library shows you the ads but gives you no analysis. We scrape the data, run AI analysis across all their creative, identify patterns, estimate what's working, and give you a strategic read — in a formatted report, not a raw list.

Q: How long does it take?
A: Reports are delivered within 60 minutes of payment. Usually faster.

Q: What if my competitor isn't running ads?
A: We check before running the full analysis. If no active ads are found, we'll notify you and offer a full refund or a credit to run a report on a different competitor.

Q: Is this legal?
A: Yes. Meta Ad Library is publicly available data. We're automating the collection and adding AI analysis. No private data is accessed.

Q: Can I get reports on multiple competitors?
A: Yes — purchase one report per competitor. Bundle pricing coming soon.

### CTA Section
Headline: Ready to see inside your competitor's ad strategy?
Form: [Competitor URL input] + [Your email address]
Button: Get the Report — $99 AUD
Sub-note: Delivered within 60 minutes. Stripe secure payment. Refund if no ads found.

---

## Automation Pipeline — Make.com

### Trigger
Stripe webhook: payment_intent.succeeded event
Payload includes: customer email, competitor URL (passed via Stripe metadata)

### Step 1 — Validate URL
- Check competitor URL is valid and accessible
- Make GET request to URL — confirm it returns 200
- If invalid: send customer email with error + refund instruction

### Step 2 — Extract Facebook Page
- Use Apify actor: facebook-ads-scraper or similar
- Input: competitor domain → find associated Facebook page
- If no Facebook page found: notify customer, offer refund

### Step 3 — Scrape Meta Ad Library
- Use Apify to scrape Meta Ad Library for competitor's page
- Collect: all active ads, ad formats, ad text, headlines, CTAs, media URLs, first seen dates
- Output: structured JSON of all ad data

### Step 4 — AI Analysis (Claude API)
Send scraped data to Claude API with this system prompt:

```
You are a specialist digital advertising analyst producing a competitor intelligence report for an Australian business owner. 

Analyse the following Meta Ad Library data for [competitor name/URL] and produce a structured report covering:

1. CREATIVE OVERVIEW
- Total active ads found
- Ad formats in use (image/video/carousel/story)
- Approximate time span of ad activity

2. MESSAGING ANALYSIS  
- Primary value propositions being tested
- Emotional angles and hooks used
- Price/offer mentions
- Call-to-action patterns

3. WHAT'S WORKING (spend signals)
- Identify ads running longest (likely top performers)
- Patterns in high-longevity ads
- Creative elements that appear repeatedly

4. TARGETING SIGNALS
- Audience clues from copy and creative
- Geographic indicators
- Demographic signals
- Offer structures suggesting customer journey stage

5. THEIR AD STRATEGY SUMMARY
- Overall assessment of their approach
- Sophistication level (basic/intermediate/advanced)
- Platform focus and budget signals

6. YOUR OPPORTUNITY GAP
- What angles they're NOT covering
- Audiences they appear to be ignoring
- Offer structures they haven't tested
- Specific recommendations for differentiation

Write in clear, direct Australian English. Be specific — reference actual ad content. Avoid vague generalisations.
```

### Step 5 — Generate PDF Report
- Use a PDF generation service (WeasyPrint via Make.com HTTP module, or a dedicated PDF API)
- Template: ProjxAI branded — purple header, clean layout, logo
- Include: report date, competitor analysed, disclaimer footer

### Step 6 — Send Email
- To: customer email from Stripe
- Subject: "Your Competitor Report for [competitor domain] is ready"
- Body: brief intro, key findings teaser, download button
- Attachment: PDF report
- Use: SendGrid or Mailchimp Transactional

### Step 7 — Log to Google Sheets (or Airtable)
Record: date, customer email, competitor URL, report ID, delivery status
Purpose: tracking, quality review, refund management

---

## Stripe Configuration

- Product: Competitor Espionage Engine Report
- Price: $99.00 AUD
- Type: One-time payment
- Checkout mode: payment (not subscription)
- Metadata to pass in Checkout session:
  - competitor_url: [from form]
  - customer_email: [from form or Stripe]
- Webhook endpoint: Make.com webhook URL
- Webhook event: payment_intent.succeeded

Success URL: /tools/competitor-espionage-engine/success
Cancel URL: /tools/competitor-espionage-engine (back to sales page)

### Success Page ( /tools/competitor-espionage-engine/success )
Headline: You're in! Your report is being generated.
Body: Check your email in the next 60 minutes — your competitor intelligence report will be waiting. Check your spam folder if it doesn't arrive.
CTA: While you wait, try our free ROAS Calculator →

---

## Error Handling

| Scenario | Action |
|---|---|
| Invalid competitor URL | Email customer, offer rerun or refund |
| Competitor has no Facebook page | Email customer, offer different competitor or refund |
| Competitor has no active ads | Email customer, offer refund |
| Make.com pipeline fails | Alert email to michaelc@collicorp.com.au, manual intervention |
| Stripe payment fails | Standard Stripe handling — customer sees error on checkout |
| Email delivery fails | Retry × 3, then manual send |

---

## Phase 2 Enhancements
- Google Ads version (scrape Google Ad Transparency Centre)
- TikTok Ads version
- Bundle: 3 competitors for $249
- Scheduled re-run: subscribe for monthly updates on same competitor ($29/month)
- Agency white-label version with custom branding
- API access for agencies running multiple reports

---

## Build Dependencies
- Make.com account (existing or new — $9-29/month plan needed for webhooks)
- Apify account — pay per use, approx $0.50-2.00 per report scrape
- Stripe (existing — switch from sandbox to live before launch)
- SendGrid or Mailchimp Transactional for email delivery
- PDF generation: WeasyPrint, Puppeteer, or PDFShift API
- Claude API: approx $0.10-0.30 per analysis at current Sonnet pricing
- Total cost per report: approx $3-5 AUD → $99 revenue = ~$94 margin per report
