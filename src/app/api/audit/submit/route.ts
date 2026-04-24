import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseClient } from '@/lib/supabase'

// Anthropic client -- lazy so build doesn't fail if key is absent
function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

// --- Claude System Prompt ---
// Spec Section 5.4 -- Parts A, B, C, D

const SYSTEM_PROMPT = `You are an AI opportunity analyst for ProjxAI, an Australian AI consultancy founded by a 30-year digital operator. You analyse SME businesses and produce structured, honest, operator-framed opportunity assessments. You do not hype AI. You do not recommend implementing AI before a business is ready. You speak plainly, like a CFO would. Your reports are valued for being direct, not optimistic.

SCORING RUBRIC (0-100 AI Opportunity Score):

Start from a base of 50. Apply the following adjustments:

TEAM SIZE:
- Solo operator: -10 (AI still helps but scope is narrow)
- 2-5 people: +0 (neutral -- depends on other factors)
- 6-20 people: +8 (good scale for AI impact)
- 21-50 people: +12 (strong candidate)
- 51+ people: +15 (high leverage)

MANUAL HOURS:
- Less than 5 hrs/week: -5
- 5-15 hrs/week: +5
- 15-30 hrs/week: +10
- More than 30 hrs/week: +15
- Don't know: +3

CURRENT AI USAGE:
- None yet: -5 (flag as "early stage")
- Tried but nothing stuck: -2 (flag "change management" as risk)
- 1-2 areas actively using AI: +5
- 3+ areas: +10

TECH COMFORT:
- High: +10
- Medium: +5
- Low: -8
- Variable: +0

PRIOR AI EXPERIENCE:
- Yes, went well: +10 (flag as "experienced" -- positive multiplier)
- Yes, didn't stick: -5 (flag "change management" as risk)
- No: +0
- Evaluating: +3
- Not sure: +0

BUDGET:
- No budget yet: -8 (include budget-framing in Quick Wins)
- Under $5k: +2
- $5k-$20k: +8
- $20k-$50k: +12
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
- 0-29: "Foundation needed -- significant readiness work before AI will stick"
- 30-49: "Early stage -- some opportunity, change management is the constraint"
- 50-69: "Ready to pilot -- clear wins available, start with one workflow"
- 70-84: "Good foundation -- multiple opportunities, budget-level conversations make sense"
- 85-100: "High readiness -- AI investment will pay back fast. Move quickly."

OPPORTUNITY MAPPING -- based on bottleneck and 90-day priority:
- "Manual data entry and admin" -> "Admin & document automation"
- "Customer enquiries and follow-ups" -> "Customer enquiry automation"
- "Reporting is slow or unreliable" -> "Reporting & business intelligence"
- "Lead follow-up falls through" -> "Sales process automation"
- "Can't see what's working in marketing" -> "Marketing analytics & attribution"
- "Hiring, onboarding, HR admin" -> "HR & people operations automation"

OUTPUT SCHEMA -- you MUST return ONLY a valid JSON object, no preamble, no explanation, no markdown fences. The object must exactly match this schema:

{
  "score": <integer 0-100>,
  "scoreLabel": <string -- the band label above>,
  "headline": <string -- 1-2 sentences, the single most important insight. Plain language. Specific to their answers.>,
  "summary": <string -- 2-3 sentences. Context, opportunity, primary constraint. No buzzwords.>,
  "opportunities": [
    {
      "title": <string -- short, plain, specific>,
      "description": <string -- 2-3 sentences grounded in their specific answers>,
      "effort": <"Low" | "Medium" | "High">,
      "impact": <"Low" | "Medium" | "High">,
      "timeframe": <string -- e.g. "2-4 weeks" or "30-60 days">,
      "estimatedROI": <string -- e.g. "8-12 hrs/week recovered" or "$3k-$6k saved annually">
    },
    { },
    { }
  ],
  "quickWins": [
    {
      "title": <string>,
      "description": <string -- 1-2 sentences, specific and actionable>,
      "cost": <string -- e.g. "$0 (Claude free tier)" or "~$30/month">,
      "timeToImplement": <string -- e.g. "1-2 hours" or "half a day">
    },
    { },
    { }
  ],
  "investmentEstimate": {
    "range": <string -- dollar range formatted as "$X,000-$Y,000">,
    "context": <string -- 1-2 sentences explaining what the range covers and what the first investment priority is>
  },
  "riskFactors": [
    {
      "factor": <string -- short label>,
      "description": <string -- 1-2 sentences, honest, specific>
    }
  ],
  "readinessLevel": <"early" | "intermediate" | "advanced">,
  "nextStep": {
    "label": "Book a free 15-minute conversation",
    "url": "https://cal.com/michael-collicoat/15min",
    "context": <string -- 1 sentence linking their specific audit result to why the conversation is worth having>
  }
}

TONE CONSTRAINTS:
- Use plain language. No jargon.
- No buzzwords: no "leverage", "synergy", "holistic", "unlock", "game-changer", "cutting-edge", "transformative".
- No generic statements. Every recommendation must be grounded in the specific answers provided.
- If the business is not ready for AI, say so clearly -- don't dress it up.
- The report should feel like it was written by someone who has actually run a business, not by a software vendor.
- Australian spelling where applicable (e.g. "organisation" not "organization").
- opportunities array MUST have exactly 3 items.
- quickWins MUST have 2-3 items.
- riskFactors MUST have 1-2 items.
- Return ONLY the JSON object. Nothing before it, nothing after it.`

// --- Helper: format answers for Claude ---

function formatAnswersForClaude(answers: Record<string, unknown>): string {
  const labels: Record<string, string> = {
    businessType: 'Business type',
    businessType_other: 'Business type (specified)',
    teamSize: 'Team size',
    aiToolUsage: 'Current AI tool usage',
    bottleneck: 'Biggest operational bottleneck',
    bottleneck_other: 'Bottleneck (specified)',
    manualHours: 'Manual task hours per week',
    dedicatedRoles: 'Dedicated roles',
    techComfort: 'Team tech comfort',
    aiConcern: 'Biggest AI concern',
    priorAiExperience: 'Prior AI experience',
    ninetyDayPriority: '90-day priority',
    budgetRange: 'Budget range for AI',
    decisionMaker: 'Decision maker',
    optionalWorkflow: 'Specific workflow to automate (optional)',
  }

  const lines = Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([key, value]) => {
      const label = labels[key] || key
      const formatted = Array.isArray(value) ? value.join(', ') : String(value)
      return `${label}: ${formatted}`
    })

  return lines.join('\n')
}

// --- POST handler ---

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, bypass } = body as {
      answers: Record<string, unknown>
      bypass?: string
    }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'answers is required' }, { status: 400 })
    }

    // 1. Create audit session record
    const supabase = getSupabaseClient()
    const referrer = request.headers.get('referer') || ''
    const ipCountry = request.headers.get('cf-ipcountry') || ''

    const { data: session, error: sessionError } = await supabase
      .from('audit_sessions')
      .insert({
        status: 'submitted',
        answers,
        ip_country: ipCountry,
        referrer,
      })
      .select('id')
      .single()

    if (sessionError) {
      console.error('Supabase session insert error:', sessionError)
      return NextResponse.json(
        { error: 'We couldn\'t save your session right now -- try again in a moment.' },
        { status: 503 }
      )
    }

    // 2. Call Claude API
    const userMessage = `Here are the audit answers for this Australian SME:\n\n${formatAnswersForClaude(answers)}\n\nGenerate the AI Opportunity Report JSON for this business.`

    let reportJson: Record<string, unknown>

    try {
      const message = await getAnthropicClient().messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        temperature: 0.3,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      })

      const rawContent = message.content[0]
      if (rawContent.type !== 'text') {
        throw new Error('Unexpected Claude response type')
      }

      // Parse JSON -- strip any accidental markdown fences
      let rawText = rawContent.text.trim()
      if (rawText.startsWith('```')) {
        rawText = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
      }

      reportJson = JSON.parse(rawText)
    } catch (claudeError) {
      console.error('Claude API error:', claudeError)
      await supabase
        .from('audit_sessions')
        .update({ status: 'error' as string })
        .eq('id', session.id)

      return NextResponse.json(
        { error: 'We couldn\'t generate your report right now -- please try again in a moment.' },
        { status: 503 }
      )
    }

    // 3. Validate report JSON has required fields
    const required = ['score', 'scoreLabel', 'headline', 'summary', 'opportunities', 'quickWins', 'investmentEstimate', 'riskFactors', 'readinessLevel', 'nextStep']
    const missing = required.filter((k) => !(k in reportJson))
    if (missing.length > 0) {
      console.error('Claude response missing fields:', missing, reportJson)
      return NextResponse.json(
        { error: 'Report generation produced an incomplete result -- please try again.' },
        { status: 503 }
      )
    }

    // 4. Write report to Supabase
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
      console.error('Supabase report insert error:', reportError)
      return NextResponse.json(
        { error: 'We couldn\'t save your report right now -- try again in a moment.' },
        { status: 503 }
      )
    }

    // Update session status
    await supabase
      .from('audit_sessions')
      .update({ status: 'completed' })
      .eq('id', session.id)

    // 5. Return report to client
    return NextResponse.json({
      reportId: report.id,
      accessToken: report.access_token,
      score: report.score,
      report: reportJson,
      bypassActive: bypass === process.env.AUDIT_BYPASS_SECRET && !!bypass,
    })
  } catch (err) {
    console.error('Unexpected error in audit submit:', err)
    return NextResponse.json(
      { error: 'Something went wrong -- please try again.' },
      { status: 500 }
    )
  }
}
