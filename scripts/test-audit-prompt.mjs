/**
 * Session 20 — Claude System Prompt Test
 * Tests 3 sample answer sets against the audit system prompt.
 *
 * Run from repo root:
 *   node scripts/test-audit-prompt.mjs
 *
 * Requires: ANTHROPIC_API_KEY in .env (or env vars set)
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env manually
try {
  const envFile = readFileSync(resolve(__dirname, '../.env'), 'utf-8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    const val = trimmed.slice(eq + 1)
    if (!process.env[key]) process.env[key] = val
  }
} catch {
  // .env not found — rely on process env
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
if (!ANTHROPIC_API_KEY || ANTHROPIC_API_KEY === 'PASTE_FROM_VERCEL_OR_ANTHROPIC_CONSOLE') {
  console.error('\n❌  ANTHROPIC_API_KEY not set in .env\n')
  console.error('   Get it from: https://console.anthropic.com → API Keys')
  console.error('   Then paste it into .env as: ANTHROPIC_API_KEY=sk-ant-...\n')
  process.exit(1)
}

import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

// ─── System prompt (copy of route.ts — keep in sync) ─────────────────────────

const SYSTEM_PROMPT = `You are an AI opportunity analyst for ProjxAI, an Australian AI consultancy founded by a 30-year digital operator. You analyse SME businesses and produce structured, honest, operator-framed opportunity assessments. You do not hype AI. You do not recommend implementing AI before a business is ready. You speak plainly, like a CFO would. Your reports are valued for being direct, not optimistic.

SCORING RUBRIC (0–100 AI Opportunity Score):

Start from a base of 50. Apply the following adjustments:

TEAM SIZE:
- Solo operator: -10 (AI still helps but scope is narrow)
- 2–5 people: +0 (neutral — depends on other factors)
- 6–20 people: +8 (good scale for AI impact)
- 21–50 people: +12 (strong candidate)
- 51+ people: +15 (high leverage)

MANUAL HOURS:
- Less than 5 hrs/week: -5
- 5–15 hrs/week: +5
- 15–30 hrs/week: +10
- More than 30 hrs/week: +15
- Don't know: +3

CURRENT AI USAGE:
- None yet: -5 (flag as "early stage")
- Tried but nothing stuck: -2 (flag "change management" as risk)
- 1–2 areas actively using AI: +5
- 3+ areas: +10

TECH COMFORT:
- High: +10
- Medium: +5
- Low: -8
- Variable: +0

PRIOR AI EXPERIENCE:
- Yes, went well: +10 (flag as "experienced" — positive multiplier)
- Yes, didn't stick: -5 (flag "change management" as risk)
- No: +0
- Evaluating: +3
- Not sure: +0

BUDGET:
- No budget yet: -8 (include budget-framing in Quick Wins)
- Under $5k: +2
- $5k–$20k: +8
- $20k–$50k: +12
- Over $50k: +15
- Need ROI first: +0

DECISION MAKER:
- Me alone: +5 (fast decisions)
- Me + partner: +3
- Me + board: -3 (slower)
- Influence only: -5
- Complicated: -3

Cap the score at 100 minimum 8.

Score bands:
- 0–29: "Foundation needed — significant readiness work before AI will stick"
- 30–49: "Early stage — some opportunity, change management is the constraint"
- 50–69: "Ready to pilot — clear wins available, start with one workflow"
- 70–84: "Good foundation — multiple opportunities, budget-level conversations make sense"
- 85–100: "High readiness — AI investment will pay back fast. Move quickly."

OPPORTUNITY MAPPING — based on bottleneck and 90-day priority:
- "Manual data entry and admin" → "Admin & document automation"
- "Customer enquiries and follow-ups" → "Customer enquiry automation"
- "Reporting is slow or unreliable" → "Reporting & business intelligence"
- "Lead follow-up falls through" → "Sales process automation"
- "Can't see what's working in marketing" → "Marketing analytics & attribution"
- "Hiring, onboarding, HR admin" → "HR & people operations automation"

OUTPUT SCHEMA — you MUST return ONLY a valid JSON object, no preamble, no explanation, no markdown fences. The object must exactly match this schema:

{
  "score": <integer 0–100>,
  "scoreLabel": <string — the band label above>,
  "headline": <string — 1–2 sentences, the single most important insight. Plain language. Specific to their answers.>,
  "summary": <string — 2–3 sentences. Context, opportunity, primary constraint. No buzzwords.>,
  "opportunities": [
    {
      "title": <string — short, plain, specific>,
      "description": <string — 2–3 sentences grounded in their specific answers>,
      "effort": <"Low" | "Medium" | "High">,
      "impact": <"Low" | "Medium" | "High">,
      "timeframe": <string — e.g. "2–4 weeks" or "30–60 days">,
      "estimatedROI": <string — e.g. "8–12 hrs/week recovered" or "$3k–$6k saved annually">
    },
    { <second opportunity> },
    { <third opportunity> }
  ],
  "quickWins": [
    {
      "title": <string>,
      "description": <string — 1–2 sentences, specific and actionable>,
      "cost": <string — e.g. "$0 (Claude free tier)" or "~$30/month">,
      "timeToImplement": <string — e.g. "1–2 hours" or "half a day">
    },
    { <second quick win> },
    { <optional third quick win — only if genuinely relevant> }
  ],
  "investmentEstimate": {
    "range": <string — dollar range formatted as "$X,000–$Y,000">,
    "context": <string — 1–2 sentences explaining what the range covers and what the first investment priority is>
  },
  "riskFactors": [
    {
      "factor": <string — short label>,
      "description": <string — 1–2 sentences, honest, specific>
    }
  ],
  "readinessLevel": <"early" | "intermediate" | "advanced">,
  "nextStep": {
    "label": "Book a free 15-minute conversation",
    "url": "https://cal.com/michael-collicoat/15min",
    "context": <string — 1 sentence linking their specific audit result to why the conversation is worth having>
  }
}

TONE CONSTRAINTS:
- Use plain language. No jargon.
- No buzzwords: no "leverage", "synergy", "holistic", "unlock", "game-changer", "cutting-edge", "transformative".
- No generic statements. Every recommendation must be grounded in the specific answers provided.
- If the business is not ready for AI, say so clearly — don't dress it up.
- The report should feel like it was written by someone who has actually run a business, not by a software vendor.
- Australian spelling where applicable (e.g. "organisation" not "organization").
- opportunities array MUST have exactly 3 items.
- quickWins MUST have 2–3 items.
- riskFactors MUST have 1–2 items.
- Return ONLY the JSON object. Nothing before it, nothing after it.`

// ─── 3 Sample Answer Sets ─────────────────────────────────────────────────────

const SAMPLE_PROFILES = [
  {
    name: 'Profile A — Solo operator, no AI, no budget',
    description: 'Electrician, sole trader, 15–30 hrs manual work, never tried AI, low tech comfort',
    answers: {
      businessType: 'Trade & construction',
      teamSize: 'Just me (solo operator)',
      aiToolUsage: ["None — we haven't started yet"],
      bottleneck: 'Too much time on manual data entry and admin',
      manualHours: '15–30 hours',
      dedicatedRoles: ['None of the above — the owner handles most of it'],
      techComfort: 'Low — technology change is a real challenge in our business',
      aiConcern: "Not knowing where to start",
      priorAiExperience: "No — we haven't started",
      ninetyDayPriority: 'Save time on admin and manual tasks',
      budgetRange: "We're not budgeting for it yet",
      decisionMaker: 'Me — I make the call',
    },
  },
  {
    name: 'Profile B — 6–20 team, some AI, mid budget',
    description: 'Accounting firm, 10 people, uses AI for content + emails, wants to scale marketing',
    answers: {
      businessType: 'Professional services (accounting, legal, consulting, financial planning)',
      teamSize: '6–20 people',
      aiToolUsage: ['Writing emails, reports, or content', 'Social media or marketing'],
      bottleneck: "We can't see what's actually working in our marketing",
      manualHours: '5–15 hours',
      dedicatedRoles: ['Marketing (dedicated role)', 'Finance (dedicated role or bookkeeper)'],
      techComfort: 'Medium — it takes a few weeks but people come around',
      aiConcern: 'Data security and privacy',
      priorAiExperience: "Yes, but they didn't really stick or deliver value",
      ninetyDayPriority: 'Scale our marketing without scaling headcount',
      budgetRange: '$5,000–$20,000',
      decisionMaker: 'Me and a business partner or co-owner',
    },
  },
  {
    name: 'Profile C — 21–50 team, experienced with AI, high readiness',
    description: 'B2B distributor, 35 people, active AI user, $20k–$50k budget, fast decision maker',
    answers: {
      businessType: 'B2B / wholesale / distribution',
      teamSize: '21–50 people',
      aiToolUsage: [
        'Writing emails, reports, or content',
        'Data analysis or reporting',
        'Internal admin or scheduling',
      ],
      bottleneck: 'Our reporting is slow, unreliable, or non-existent',
      manualHours: 'More than 30 hours',
      dedicatedRoles: [
        'Operations or admin (dedicated role)',
        'IT or technology (dedicated role)',
        'Finance (dedicated role or bookkeeper)',
      ],
      techComfort: 'High — we adopt new tools quickly and without much friction',
      aiConcern: "Our data isn't organised enough to get value from AI",
      priorAiExperience: 'Yes, and they went well',
      ninetyDayPriority: "Get better visibility into what's actually happening in the business",
      budgetRange: '$20,000–$50,000',
      decisionMaker: 'Me — I make the call',
      optionalWorkflow: 'We manually compile a weekly sales report from 4 different systems — takes half a day every Monday.',
    },
  },
]

// ─── Validation ────────────────────────────────────────────────────────────────

function validateReport(report, profileName) {
  const errors = []

  if (typeof report.score !== 'number' || report.score < 0 || report.score > 100) {
    errors.push(`score out of range: ${report.score}`)
  }
  if (!report.scoreLabel) errors.push('missing scoreLabel')
  if (!report.headline) errors.push('missing headline')
  if (!report.summary) errors.push('missing summary')
  if (!Array.isArray(report.opportunities) || report.opportunities.length !== 3) {
    errors.push(`opportunities must have exactly 3 items, got ${report.opportunities?.length}`)
  }
  if (!Array.isArray(report.quickWins) || report.quickWins.length < 2 || report.quickWins.length > 3) {
    errors.push(`quickWins must have 2–3 items, got ${report.quickWins?.length}`)
  }
  if (!report.investmentEstimate?.range) errors.push('missing investmentEstimate.range')
  if (!Array.isArray(report.riskFactors) || report.riskFactors.length < 1 || report.riskFactors.length > 2) {
    errors.push(`riskFactors must have 1–2 items, got ${report.riskFactors?.length}`)
  }
  if (!['early', 'intermediate', 'advanced'].includes(report.readinessLevel)) {
    errors.push(`invalid readinessLevel: ${report.readinessLevel}`)
  }
  if (!report.nextStep?.url) errors.push('missing nextStep.url')

  // Check for banned words
  const banned = ['leverage', 'synergy', 'holistic', 'game-changer', 'cutting-edge', 'transformative', 'unlock']
  const fullText = JSON.stringify(report).toLowerCase()
  for (const word of banned) {
    if (fullText.includes(word)) errors.push(`banned word found: "${word}"`)
  }

  return errors
}

// ─── Run tests ─────────────────────────────────────────────────────────────────

async function runTests() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║  ProjxAI AI Opportunity Audit — Claude Prompt Test (S20)     ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  let allPassed = true

  for (const [i, profile] of SAMPLE_PROFILES.entries()) {
    console.log(`\n─── Test ${i + 1}/3: ${profile.name} ───`)
    console.log(`    ${profile.description}`)
    console.log('    Calling Claude API...')

    const startMs = Date.now()

    try {
      const answersText = Object.entries(profile.answers)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join('\n')

      const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        temperature: 0.3,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Here are the audit answers for this Australian SME:\n\n${answersText}\n\nGenerate the AI Opportunity Report JSON for this business.`,
          },
        ],
      })

      const elapsed = ((Date.now() - startMs) / 1000).toFixed(1)

      const rawText = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
      let report
      try {
        let clean = rawText
        if (clean.startsWith('```')) {
          clean = clean.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
        }
        report = JSON.parse(clean)
      } catch {
        console.log(`\n    ❌  FAILED — JSON parse error`)
        console.log(`    Raw output:\n${rawText.slice(0, 500)}`)
        allPassed = false
        continue
      }

      const errors = validateReport(report, profile.name)

      if (errors.length === 0) {
        console.log(`\n    ✅  PASSED (${elapsed}s)`)
        console.log(`    Score: ${report.score}/100 — "${report.scoreLabel}"`)
        console.log(`    Readiness: ${report.readinessLevel}`)
        console.log(`    Headline: "${report.headline.slice(0, 100)}…"`)
        console.log(`    Opportunities: ${report.opportunities.map(o => o.title).join(' | ')}`)
        console.log(`    Quick Wins: ${report.quickWins.length} items`)
        console.log(`    Investment estimate: ${report.investmentEstimate.range}`)
        console.log(`    Risk factors: ${report.riskFactors.map(r => r.factor).join(', ')}`)
      } else {
        console.log(`\n    ❌  FAILED — schema violations:`)
        errors.forEach((e) => console.log(`       • ${e}`))
        console.log(`    Partial report: score=${report.score}, readiness=${report.readinessLevel}`)
        allPassed = false
      }

      // Token usage
      console.log(`    Tokens: ${message.usage.input_tokens} in / ${message.usage.output_tokens} out`)
    } catch (err) {
      console.log(`\n    ❌  API ERROR: ${err.message}`)
      allPassed = false
    }
  }

  console.log('\n' + '═'.repeat(64))
  if (allPassed) {
    console.log('✅  ALL 3 TESTS PASSED — Claude prompt is production-ready.')
    console.log('   Session 20 exit criteria met. Ready to commit and push.')
  } else {
    console.log('❌  SOME TESTS FAILED — review output above before pushing.')
  }
  console.log('═'.repeat(64) + '\n')
}

runTests().catch((err) => {
  console.error('\nFatal error:', err)
  process.exit(1)
})
