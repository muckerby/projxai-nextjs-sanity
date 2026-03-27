# ROAS Calculator — Functional Specification
# File: docs/specs/roas-calculator-spec.md
# Version: 1.0 | Session 3 | 25 March 2026

---

## Overview

A free interactive calculator that helps Australian eCommerce and SME businesses understand whether their advertising spend is performing correctly. The tool is free to use but requires an email address to receive the full results report — this is the primary lead capture mechanism for the affiliate income stream.

URL: /tools/roas-calculator

---

## Business Logic

### What is ROAS?
Return on Ad Spend = Revenue generated from ads ÷ Cost of ads
Example: $10,000 revenue from $2,000 ad spend = 5x ROAS

### What the calculator does
1. Takes user inputs about their ad spend and revenue
2. Calculates their current ROAS across platforms
3. Compares against industry benchmarks for Australian businesses
4. Identifies whether they're above, at, or below benchmark
5. Provides a plain-English diagnosis and recommendations
6. Gates the full recommendations report behind email capture

---

## Input Fields

### Step 1 — Business Context
- Industry (dropdown): eCommerce / Retail / Services / Hospitality / Health & Wellness / Other
- Monthly revenue (AUD, number input): approximate total business revenue
- Primary goal (radio): More sales / Lower cost per acquisition / Better ROAS / Not sure

### Step 2 — Ad Spend by Platform
User selects which platforms they advertise on (checkboxes), then enters monthly spend for each selected:
- Meta (Facebook/Instagram)
- Google Ads (Search)
- Google Ads (Shopping)
- TikTok Ads
- LinkedIn Ads
- Other (text field + amount)

### Step 3 — Revenue from Ads
- Total monthly revenue attributed to paid ads (AUD)
- How are you tracking this? (dropdown): Google Analytics / Platform-reported / Manual / Not sure

---

## Calculations

Current ROAS = Total ad revenue ÷ Total ad spend

Benchmark ROAS by industry (Australian market figures):
- eCommerce: 4x (good), 2x (poor), 7x+ (excellent)
- Retail: 3x (good), 1.5x (poor), 5x+ (excellent)
- Services: 5x (good), 2.5x (poor), 10x+ (excellent)
- Hospitality: 3x (good), 1.5x (poor), 6x+ (excellent)
- Health & Wellness: 4x (good), 2x (poor), 8x+ (excellent)
- Other: 4x (good), 2x (poor), 7x+ (excellent)

Revenue gap calculation:
- At benchmark ROAS, what revenue should current spend generate?
- Difference = monthly revenue gap
- Annualised revenue gap = monthly gap × 12

---

## Output — Free Preview (shown without email)

Display immediately after calculation:
- Current ROAS: [X.Xx]
- Benchmark ROAS for your industry: [Xx]
- Status badge: BELOW BENCHMARK / AT BENCHMARK / ABOVE BENCHMARK (colour coded red/amber/green)
- One-line summary: "Your current ROAS of 2.3x is below the Australian [industry] benchmark of 4x."
- Teaser: "Your full report includes [N] specific recommendations to close a $[X,XXX]/month revenue gap."

---

## Email Gate

Trigger: User clicks "Get My Full Report"

Modal or inline form:
- Heading: "Where should we send your report?"
- Fields: First name, Email address
- Button: Send my report
- Sub-note: "No spam. Unsubscribe anytime. Your data is handled in accordance with our Privacy Policy."
- Legal: Consent checkbox for marketing emails (required for SPAM Act compliance — Australian law)

On submission:
1. Store email in email list (Mailchimp / ConvertKit — TBD)
2. Display full results inline immediately (don't make them wait for email)
3. Send email with results PDF / summary (Phase 2 — build email template separately)
4. Tag subscriber in email platform as "ROAS Calculator lead"

---

## Output — Full Report (after email capture)

### Section 1: Your ROAS Breakdown
- Per-platform ROAS table (where data entered for multiple platforms)
- Visual: simple bar chart showing their ROAS vs benchmark
- Colour coding: red/amber/green per platform

### Section 2: Your Revenue Gap
- "At benchmark ROAS, your current $[X,XXX] monthly ad spend should generate $[X,XXX] in revenue"
- "That's a potential $[X,XXX]/month ($[XX,XXX]/year) you're leaving on the table"

### Section 3: Why Your ROAS Might Be Low
3-4 most common reasons based on their industry and inputs:
- Attribution issues (if they selected "Not sure" for tracking)
- Platform-specific recommendations
- Creative fatigue indicators
- Budget allocation suggestions

### Section 4: Recommended Tools
This is the affiliate revenue section — contextual tool recommendations:
- If Meta ads: recommend Triple Whale (affiliate link) for attribution
- If Google Shopping: recommend relevant tools
- If general eCommerce: recommend A2X for accounting (affiliate)
- Each recommendation: tool name, what it does, why relevant to their result, affiliate CTA

### Section 5: CTA
- "Want expert help improving your ROAS? Book a free 30-min discovery call."
- Link: /work-with-us

---

## Technical Requirements

### Frontend
- Built as a React component in Next.js
- Multi-step form with progress indicator (Step 1 of 3)
- Real-time calculation as user types
- Responsive — must work on mobile
- No page reload — all client-side
- Results animate in on completion

### Data Storage
- Email addresses: POST to API route → forward to email platform
- No sensitive financial data stored — inputs are session-only
- Form validation: all numeric fields, email validation

### Analytics Events (Google Analytics / Plausible)
- calculator_started
- calculator_step2_reached
- calculator_step3_reached
- calculator_completed (with ROAS result bucketed: poor/ok/good/excellent)
- email_gate_shown
- email_submitted
- affiliate_link_clicked (with tool name)

---

## Affiliate Integration

Affiliate links are inserted contextually in the results. Each link:
- Opens in new tab
- Has UTM parameters: utm_source=projxai&utm_medium=roas_calculator&utm_campaign=[tool_name]
- Is disclosed as an affiliate relationship (small note at bottom of results)

Priority affiliate programs to apply for:
1. Triple Whale — Shopify attribution — https://www.triplewhale.com/affiliates
2. A2X Accounting — eCommerce accounting — https://www.a2xaccounting.com/partners
3. Klaviyo — email marketing for eCommerce — https://www.klaviyo.com/partners
4. Gorgias — eCommerce customer service — check their partner program

---

## Phase 2 Enhancements (after initial launch)
- PDF report generation and email delivery
- Industry benchmark data updated quarterly
- Saved results (requires user account — defer)
- Comparison tool: compare results month-over-month
- B2B version: agency can run reports for multiple clients
