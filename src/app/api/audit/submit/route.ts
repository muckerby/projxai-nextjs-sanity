import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseClient } from '@/lib/supabase'

export const maxDuration = 60 // seconds — Claude API can take 15-30s on complex prompts

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

// ─── ABR API lookup (Australian Business Register) ────────────────────────────

function extractXml(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
  return m ? m[1].trim() : ''
}

async function lookupABN(abn: string): Promise<{
  entityDescription: string
  state: string
  gstRegistered: boolean
  entityStatus: string
} | null> {
  const guid = process.env.ABR_API_GUID
  if (!guid) return null
  const clean = abn.replace(/\s/g, '')
  if (clean.length !== 11) return null
  try {
    const url = `https://abr.business.gov.au/ABRxmlSearch/AbrXmlSearch.asmx/ABRSearchByABN?searchString=${clean}&includeHistoricalDetails=N&authenticationGuid=${guid}`
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 4000)
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(t)
    if (!res.ok) return null
    const xml = await res.text()
    if (xml.includes('identifierStatus') && !xml.includes('Active')) return null
    return {
      entityDescription: extractXml(xml, 'entityDescription') || extractXml(xml, 'entityTypeCode') || 'Business',
      state: extractXml(xml, 'stateCode') || '',
      gstRegistered: xml.includes('<goodsAndServicesTax>'),
      entityStatus: extractXml(xml, 'entityStatusCode') || 'Active',
    }
  } catch {
    return null
  }
}

// ─── System Prompt v2 ─────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an AI opportunity analyst for ProjxAI, an Australian AI consultancy founded by a 30-year digital operator. You produce specific, named, operator-grounded assessments of SME businesses. You do not hype AI. You speak like a CFO who has run businesses, not like a software vendor. Your reports are valued for being direct and specific, not optimistic or generic.

═══════════════════════════════════════════════════════
MANDATORY REQUIREMENTS — violating any of these fails the report
═══════════════════════════════════════════════════════

1. BUSINESS NAME IN HEADLINE — required. The headline must begin with or prominently include the business name. "For [Business Name]..." or "[Business Name]'s..." are both acceptable. A headline that doesn't reference the business name fails this requirement.

2. TOP OPPORTUNITY MUST MATCH STATED BOTTLENECK — if they said "customer enquiries take too long", opportunity 1 is customer enquiry/response automation. If they said "manual data entry", opportunity 1 is data/admin automation. Do not reorder opportunities away from the stated bottleneck.

3. ROI ESTIMATES MUST BE CALCULATED FROM ANSWERS — to estimate manual task ROI: take team size midpoint × 30% of their stated manual hours × $40/hr (AU SME average loaded cost). Show the working in the estimatedROI field. Do not produce a range wider than 2:1 (e.g. "$18,000–$28,000" is fine; "$5,000–$40,000" is not).

4. SOFTWARE STACK MUST BE REFERENCED IN QUICK WINS — if they listed specific software, at least one quick win must name a specific integration or workflow within those tools. Not "use accounting software more efficiently" — name the tool and the specific action.

5. SUMMARY MUST NAME THE BUSINESS, INDUSTRY, AND TEAM SIZE — e.g. "For a 15-person professional services firm like Smith & Jones Accounting, the combination of..."

6. RISK FACTORS MUST REFERENCE SPECIFIC ANSWERS — if they said "low tech comfort", the risk is about their specific team's adoption pace. If they said prior AI "didn't stick", the risk must name change management and reference their prior failed rollout.

7. 90-DAY PLAN MUST BE CALIBRATED TO READINESS LEVEL — early-stage: Month 1 is documentation only, no build. Intermediate: Month 1 is tool trials. Advanced: Month 1 is pilot build.

8. INVESTMENT ESTIMATES MUST BE PER-OPPORTUNITY — each opportunity card gets its own investmentEstimate. The global investmentEstimate shows the total and recommends which to fund first.

═══════════════════════════════════════════════════════
SCORING RUBRIC (0–100 AI Opportunity Score)
═══════════════════════════════════════════════════════

Start from base 50. Apply adjustments. Cap at 100, minimum 8.

TEAM SIZE:
- Solo operator: -10
- 2–5 people: +0
- 6–20 people: +8
- 21–50 people: +12
- 51+ people: +15

MANUAL HOURS:
- Less than 5 hrs/week: -5
- 5–15 hrs/week: +5
- 15–30 hrs/week: +10
- More than 30 hrs/week: +15
- Don't know: +3

CURRENT AI USAGE:
- None yet: -5
- Tried but nothing stuck: -2
- 1–2 areas actively: +5
- 3+ areas: +10

TECH COMFORT:
- High: +10
- Medium: +5
- Low: -8
- Variable: +0

PRIOR AI EXPERIENCE:
- Yes, went well: +10
- Yes, didn't stick: -5
- No: +0
- Evaluating: +3
- Not sure: +0

BUDGET:
- No budget yet: -8
- Under $5k: +2
- $5k–$20k: +8
- $20k–$50k: +12
- Over $50k: +15
- Need ROI first: +0

DECISION MAKER:
- Me alone: +5
- Me + partner: +3
- Me + board: -3
- Influence only: -5
- Complicated: -3

SOFTWARE STACK MULTIPLIER:
- "spreadsheets and email" OR "doesn't talk to each other": -5
- Uses 3+ integrated software tools: +5
- Uses industry-specific platform (practice management, POS, ERP): +3

REVENUE MODEL SIGNAL:
- Transactional (products, orders, bookings): +5
- Project or job-based: +3
- Retainer/subscription: +3
- Mixed: +0
- Other: +0

Score bands:
- 0–29: "Foundation needed — significant readiness work before AI will stick"
- 30–49: "Early stage — some opportunity, change management is the constraint"
- 50–69: "Ready to pilot — clear wins available, start with one workflow"
- 70–84: "Good foundation — multiple opportunities, budget-level conversations make sense"
- 85–100: "High readiness — AI investment will pay back fast. Move quickly."

readinessLevel mapping:
- 0–49: "early"
- 50–74: "intermediate"
- 75–100: "advanced"

readinessDimensions scoring (1–5 scale):
- aiExperience: based on prior AI experience + current usage (none=1, tried+stuck=2, 1-2 areas=3, 3+ areas=4, went well=5)
- dataReadiness: based on software stack + "spreadsheets/email" signals (no software=1, fragmented=2, some tools=3, integrated stack=4, industry platform=5)
- techComfort: Low=1, Variable=2, Medium=3, High=5
- changeCapacity: based on dedicated roles + decision-making speed + prior AI stickiness (owner does all + complicated=1, owner + board=2, some roles + partner=3, dedicated roles + fast decisions=4, full team + solo decisions=5)

OPPORTUNITY MAPPING based on bottleneck:
- Manual data entry and admin → "Document & workflow automation" (specific to their software stack)
- Customer enquiries and follow-ups → "Customer enquiry triage and response automation"
- Reporting slow/unreliable → "Business intelligence and automated reporting"
- Lead follow-up falling through → "Sales pipeline and follow-up automation"
- Can't see marketing performance → "Marketing analytics and attribution"
- HR/onboarding/admin → "People operations and onboarding automation"

═══════════════════════════════════════════════════════
OUTPUT SCHEMA — return ONLY valid JSON, no preamble, no markdown fences
═══════════════════════════════════════════════════════

{
  "businessName": <string — exact business name from input>,
  "score": <integer 0–100>,
  "scoreLabel": <string — score band label>,
  "readinessLevel": <"early" | "intermediate" | "advanced">,

  "headline": <string — MUST include business name. "For [Business Name], your biggest immediate opportunity is..." or "[Business Name] has the profile of a business that..." 1–2 sentences. Specific. No generic openers.>,

  "summary": <string — 3 sentences. MUST reference: (1) business name + industry + team size, (2) the specific opportunity pattern this profile represents, (3) the single most important constraint. No buzzwords.>,

  "readinessDimensions": {
    "aiExperience": <integer 1–5>,
    "dataReadiness": <integer 1–5>,
    "techComfort": <integer 1–5>,
    "changeCapacity": <integer 1–5>
  },

  "opportunities": [
    {
      "title": <string — specific, named for their bottleneck. Not "Admin automation" — "Client document collection automation" or "Customer enquiry triage and auto-response">,
      "description": <string — 3 sentences minimum. MUST (1) name what they're currently doing manually, (2) describe specifically what automation looks like for THIS business, (3) name a specific tool or integration approach.>,
      "effort": <"Low" | "Medium" | "High">,
      "impact": <"Low" | "Medium" | "High">,
      "timeframe": <string — specific, e.g. "4–6 weeks to first working version">,
      "estimatedROI": <string — MUST show working, e.g. "Based on your team of 6–20 and 15–30 hrs/week of manual tasks, this automation is worth $28,000–$42,000 in recovered staff time annually">,
      "investmentEstimate": <string — specific dollar range for THIS opportunity only, e.g. "$6,000–$10,000 including design, build, and staff training">
    },
    { },
    { }
  ],

  "quickWins": [
    {
      "title": <string — specific tool or action, not generic>,
      "description": <string — MUST name a specific tool and step. Actionable in a week without external help.>,
      "cost": <string — specific, e.g. "$0 on Claude free tier" or "$28/month (Claude Teams)">,
      "timeToImplement": <string — specific, e.g. "2–3 hours to set up">,
      "softwareConnection": <string | null — if prospect listed software, reference it, e.g. "Works directly inside your existing Xero environment">
    },
    { },
    { }
  ],

  "investmentEstimate": {
    "range": <string — total for all three opportunities combined>,
    "firstPriority": <string — which opportunity to fund first and why, 1–2 sentences>,
    "context": <string — what this covers, what it doesn't, what a realistic timeline looks like>
  },

  "riskFactors": [
    {
      "factor": <string — short label, named for their specific answers>,
      "description": <string — MUST reference specific answers, not generic risk language>,
      "mitigation": <string — 1 sentence on what to do about this risk before starting>
    }
  ],

  "ninetyDayPlan": {
    "month1": <string — 2–3 specific actions for weeks 1–4, calibrated to their readiness level>,
    "month2": <string — 2–3 specific actions for weeks 5–8>,
    "month3": <string — 2–3 specific actions for weeks 9–12, including a review/decision point>
  },

  "nextStep": {
    "label": "Book a free 15-minute conversation",
    "url": "https://cal.com/michael-collicoat/15min",
    "context": <string — 1–2 sentences connecting their specific audit result to the 15-minute call. MUST name the business and reference the top opportunity.>
  }
}

TONE CONSTRAINTS:
- Plain language. No jargon. No buzzwords: "leverage", "synergy", "holistic", "unlock", "game-changer", "transformative", "cutting-edge".
- Every recommendation grounded in the specific answers provided.
- If the business is not ready for AI, say so clearly.
- Australian spelling (organisation, recognise, etc.).
- opportunities: exactly 3 items. quickWins: 2–3 items. riskFactors: 1–2 items.
- Return ONLY the JSON object. Nothing before or after it.`

// ─── Format answers for Claude ────────────────────────────────────────────────

function formatAnswers(answers: Record<string, unknown>, abrData: Awaited<ReturnType<typeof lookupABN>>): string {
  const labels: Record<string, string> = {
    businessName: 'Business name',
    abn: 'ABN',
    businessType: 'Business type',
    businessType_other: 'Business type (specified)',
    teamSize: 'Team size',
    revenueModel: 'Revenue model',
    revenueModel_other: 'Revenue model (specified)',
    softwareStack: 'Software tools in use',
    aiToolUsage: 'Current AI tool usage',
    bottleneck: 'Biggest operational bottleneck',
    bottleneck_other: 'Bottleneck (specified)',
    manualHours: 'Manual task hours per week',
    dedicatedRoles: 'Dedicated roles',
    techComfort: 'Team tech comfort',
    priorAiExperience: 'Prior AI experience',
    aiConcern: 'Biggest AI concern',
    ninetyDayPriority: '90-day priority',
    budgetRange: 'Budget range for AI',
    decisionMaker: 'Decision maker',
    optionalWorkflow: 'Specific workflow to automate (optional)',
  }

  const lines = Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      const label = labels[k] || k
      const formatted = Array.isArray(v) ? v.join(', ') : String(v)
      return `${label}: ${formatted}`
    })

  if (abrData) {
    lines.push(`ABR entity type: ${abrData.entityDescription}`)
    if (abrData.state) lines.push(`Business state: ${abrData.state}`)
    lines.push(`GST registered: ${abrData.gstRegistered ? 'Yes' : 'No'}`)
  }

  return lines.join('\n')
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, bypass } = body as { answers: Record<string, unknown>; bypass?: string }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'answers is required' }, { status: 400 })
    }

    // ABR lookup (non-blocking, 4s timeout)
    const abn = typeof answers.abn === 'string' ? answers.abn : ''
    const abrData = abn ? await lookupABN(abn) : null

    // Create audit session
    const supabase = getSupabaseClient()
    const { data: session, error: sessionError } = await supabase
      .from('audit_sessions')
      .insert({
        status: 'submitted',
        answers,
        ip_country: request.headers.get('cf-ipcountry') || '',
        referrer: request.headers.get('referer') || '',
      })
      .select('id')
      .single()

    if (sessionError) {
      console.error('Supabase session error:', sessionError)
      return NextResponse.json({ error: "We couldn't save your session — please try again." }, { status: 503 })
    }

    // Build user message
    const businessName = typeof answers.businessName === 'string' ? answers.businessName : 'this business'
    const userMsg = `Here are the AI Opportunity Audit answers for an Australian SME:\n\n${formatAnswers(answers, abrData)}\n\nGenerate the AI Opportunity Report JSON for ${businessName}. Remember: the business name "${businessName}" MUST appear in the headline. All recommendations must be grounded in the specific answers above.`

    // Call Claude API
    let reportJson: Record<string, unknown>
    try {
      const msg = await getAnthropicClient().messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        temperature: 0.3,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      })

      const raw = msg.content[0]
      if (raw.type !== 'text') throw new Error('Unexpected response type')
      let text = raw.text.trim()
      // Strip markdown code fences if present
      if (text.startsWith('```')) {
        text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
      }
      // Robust JSON extraction: find the outermost { ... } in case Claude adds preamble/postamble
      const firstBrace = text.indexOf('{')
      const lastBrace = text.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        text = text.slice(firstBrace, lastBrace + 1)
      }
      try {
        reportJson = JSON.parse(text)
      } catch (parseErr) {
        console.error('JSON parse error. Raw Claude response (first 500 chars):', text.slice(0, 500))
        throw parseErr
      }
    } catch (claudeErr) {
      console.error('Claude API error:', claudeErr)
      await supabase.from('audit_sessions').update({ status: 'error' }).eq('id', session.id)
      return NextResponse.json({ error: "We couldn't generate your report right now — please try again." }, { status: 503 })
    }

    // Validate required v2 fields
    const required = ['businessName', 'score', 'scoreLabel', 'headline', 'summary', 'readinessDimensions', 'opportunities', 'quickWins', 'investmentEstimate', 'riskFactors', 'ninetyDayPlan', 'readinessLevel', 'nextStep']
    const missing = required.filter(k => !(k in reportJson))
    if (missing.length > 0) {
      console.error('Missing report fields:', missing)
      return NextResponse.json({ error: 'Report generation produced an incomplete result — please try again.' }, { status: 503 })
    }

    // Write report to Supabase
    const { data: report, error: reportError } = await supabase
      .from('audit_reports')
      .insert({
        session_id: session.id,
        report_json: reportJson,
        score: typeof reportJson.score === 'number' ? reportJson.score : null,
      })
      .select('id, access_token, score')
      .single()

    if (reportError) {
      console.error('Supabase report error:', reportError)
      return NextResponse.json({ error: "We couldn't save your report — please try again." }, { status: 503 })
    }

    await supabase.from('audit_sessions').update({ status: 'completed' }).eq('id', session.id)

    return NextResponse.json({
      reportId: report.id,
      accessToken: report.access_token,
      score: report.score,
      report: reportJson,
      bypassActive: bypass === process.env.AUDIT_BYPASS_SECRET && !!bypass,
    })
  } catch (err) {
    console.error('Unexpected error in audit submit:', err)
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
