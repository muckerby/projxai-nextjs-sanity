import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseClient } from '@/lib/supabase'

export const maxDuration = 60 // no-op on Hobby, effective on Pro — kept for future

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

// ─── ABR API lookup ───────────────────────────────────────────────────────────

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

// ─── System Prompt v3 — silo-aware ───────────────────────────────────────────

const SYSTEM_PROMPT = `You are an AI opportunity analyst for ProjxAI, an Australian AI consultancy founded by a 30-year digital operator. You produce specific, named, operator-grounded assessments of SME businesses. You do not hype AI. You speak like a CFO who has run businesses, not like a software vendor. Your reports are valued for being direct and specific, not optimistic or generic.

═══════════════════════════════════════════════════════
SILO FOCUS AREA — read this first
═══════════════════════════════════════════════════════

The audit answers include a "Deep-dive silo" field that names which operational area the business went deepest on. You will also see 5–6 detailed answers from that silo's questions.

RULES:
1. Opportunity #1 MUST address the identified silo. It must reference specific silo answers — not generic AI benefits.
2. Opportunities #2 and #3 may draw from other answer signals but should still feel grounded in this business.
3. The 90-day plan month 1 action must be in the silo area.
4. Quick wins must include at least one silo-specific win (name the workflow, not the category).
5. If a free-text field was answered, quote or paraphrase it — it shows you actually read their submission.

This specificity is the entire value proposition. "Wow factor" = the report reads like someone who actually sat with them.

═══════════════════════════════════════════════════════
INFRASTRUCTURE CONTEXT
═══════════════════════════════════════════════════════

The answers include infrastructure fields: communications stack (M365 vs Google Workspace vs other), hosting environment (cloud vs on-premises vs hybrid), IT support model, and annual IT spend.

Use these to:
- Recommend AI tools that integrate with their actual stack (e.g., Copilot for M365 businesses, Gemini for GWS)
- Assess connector complexity (cloud-native = easier; on-prem = integration work required)
- Flag IT spend as a potential budget source if they're spending heavily on external IT (security, onboarding, dashboards are ripe)
- Adjust investment estimates upward if on-prem hosting is involved (migration/integration cost)

═══════════════════════════════════════════════════════
MANDATORY REQUIREMENTS
═══════════════════════════════════════════════════════

1. BUSINESS NAME IN HEADLINE — required.
2. TOP OPPORTUNITY MUST MATCH STATED BOTTLENECK / DEEP-DIVE SILO.
3. ROI ESTIMATES MUST BE CALCULATED FROM ANSWERS — show working in estimatedROI field.
4. SOFTWARE STACK MUST BE REFERENCED IN QUICK WINS.
5. SUMMARY MUST NAME THE BUSINESS, INDUSTRY, AND TEAM SIZE.
6. RISK FACTORS MUST REFERENCE SPECIFIC ANSWERS.
7. 90-DAY PLAN MUST BE CALIBRATED TO READINESS LEVEL.
8. INVESTMENT ESTIMATES MUST BE PER-OPPORTUNITY.
9. COMMS STACK MUST INFORM TOOL RECOMMENDATIONS.

═══════════════════════════════════════════════════════
SCORING RUBRIC (0-100 AI Opportunity Score)
═══════════════════════════════════════════════════════

Start from base 50. Apply adjustments. Cap at 100, minimum 8.

TEAM SIZE: Solo: -10 | 2-5: +0 | 6-20: +8 | 21-50: +12 | 51+: +15
CURRENT AI USAGE: None: -5 | Tried/stuck: -2 | 1-2 areas: +5 | 3+: +10
TECH COMFORT: High: +10 | Medium: +5 | Low: -8 | Variable: +0
BUDGET: None: -8 | <$5k: +2 | $5-20k: +8 | $20-50k: +12 | >$50k: +15 | ROI first: +0
DECISION MAKER: Me alone: +5 | Me+partner: +3 | Me+board: -3 | Influence: -5 | Complicated: -3
SOFTWARE: Spreadsheets/email only: -5 | 3+ integrated tools: +5 | Industry platform: +3
REVENUE: Transactional: +5 | Project-based: +3 | Retainer: +3 | Mixed: +0
HOSTING: Cloud-native: +3 | Hybrid: +0 | On-premises: -5
COMMS STACK: M365 or GWS (AI-ready platforms): +3 | Other/none: +0
IT SUPPORT: Managed service: +2 | Internal IT team: +3 | Ad-hoc/none: -5
ANNUAL IT SPEND: >$50k: +5 (budget signal) | $10-50k: +2 | <$10k: +0

Score bands:
- 0-29: "Foundation needed — significant readiness work before AI will stick"
- 30-49: "Early stage — some opportunity, change management is the constraint"
- 50-69: "Ready to pilot — clear wins available, start with one workflow"
- 70-84: "Good foundation — multiple opportunities, budget-level conversations make sense"
- 85-100: "High readiness — AI investment will pay back fast. Move quickly."

readinessLevel: 0-49="early" | 50-74="intermediate" | 75-100="advanced"

readinessDimensions (1-5):
- aiExperience: none=1, tried+stuck=2, 1-2 areas=3, 3+ areas=4, went well=5
- dataReadiness: no software=1, fragmented=2, some tools=3, integrated=4, industry platform=5
- techComfort: Low=1, Variable=2, Medium=3, High=5
- changeCapacity: owner does all + complicated=1, owner+board=2, some roles+partner=3, dedicated+fast=4, full team+solo decisions=5

═══════════════════════════════════════════════════════
OUTPUT SCHEMA — return ONLY valid JSON, no preamble, no markdown fences
═══════════════════════════════════════════════════════

{
  "businessName": <string>,
  "score": <integer 0-100>,
  "scoreLabel": <string>,
  "readinessLevel": <"early"|"intermediate"|"advanced">,
  "headline": <string — MUST include business name>,
  "summary": <string — 3 sentences, MUST name business + industry + team size>,
  "readinessDimensions": { "aiExperience": <1-5>, "dataReadiness": <1-5>, "techComfort": <1-5>, "changeCapacity": <1-5> },
  "opportunities": [
    { "title": <string>, "description": <string — 3+ sentences, MUST reference silo-specific answers for opp #1>, "effort": <"Low"|"Medium"|"High">, "impact": <"Low"|"Medium"|"High">, "timeframe": <string>, "estimatedROI": <string — show working>, "investmentEstimate": <string> },
    { ... },
    { ... }
  ],
  "quickWins": [
    { "title": <string>, "description": <string — name specific tool + silo workflow for win #1>, "cost": <string>, "timeToImplement": <string>, "softwareConnection": <string|null> },
    { ... },
    { ... }
  ],
  "investmentEstimate": { "range": <string>, "firstPriority": <string>, "context": <string> },
  "riskFactors": [ { "factor": <string>, "description": <string — ref specific answers>, "mitigation": <string> } ],
  "ninetyDayPlan": { "month1": <string — must be in silo area>, "month2": <string>, "month3": <string> },
  "nextStep": { "label": "Book a free 15-minute conversation", "url": "https://cal.com/michael-collicoat/15min", "context": <string — name business + top opportunity> }
}

TONE: Plain language. No jargon. Australian spelling. opportunities: exactly 3. quickWins: 2-3. riskFactors: 1-2.
Return ONLY the JSON object. Nothing before or after it.`

// ─── Format answers for Claude ────────────────────────────────────────────────

function formatAnswers(answers: Record<string, unknown>, abrData: Awaited<ReturnType<typeof lookupABN>>): string {
  const labels: Record<string, string> = {
    // Universal context
    businessName:               'Business name',
    abn:                        'ABN',
    businessType:               'Business type',
    businessType_other:         'Business type (specified)',
    teamSize:                   'Team size',
    revenueModel:               'Revenue model',
    revenueModel_other:         'Revenue model (specified)',
    techComfort:                'Team tech comfort',
    aiToolUsage:                'Current AI tool usage',
    bottleneck:                 'Biggest operational bottleneck',
    bottleneck_other:           'Bottleneck description (free text)',
    // Routing (Other bottleneck)
    bottleneckArea:             'Bottleneck area (selected after Other)',
    // Silo A — Customer Comms
    enquiryChannels:            'Enquiry channels',
    responseTimeExpectation:    'Customer response time expectation',
    afterFirstContact:          'What happens after first contact',
    crmUsage:                   'CRM usage',
    commsCostOfSlow:            'Cost of slow response',
    commsWorkflowFreeText:      'Comms workflow detail (free text)',
    // Silo B — Admin & Operations
    adminTaskTypes:             'Admin task types',
    systemSwitching:            'Systems switched between daily',
    dataAccuracy:               'Data accuracy confidence',
    unusedAutomation:           'Automation features not used',
    adminFreeText:              'Admin workflow detail (free text)',
    // Silo C — Sales & Leads
    leadSources:                'Lead sources',
    leadProcess:                'Lead follow-up process',
    salesCycleLength:           'Typical sales cycle length',
    salesCrmUsage:              'Sales CRM usage',
    lostLeadCost:               'Estimated cost of lost leads',
    salesFreeText:              'Sales workflow detail (free text)',
    // Silo D — Finance & Reporting
    reportingCadence:           'Reporting cadence',
    reportingPreparation:       'How reports are prepared',
    reportingTime:              'Hours spent on reporting per cycle',
    reportingDataSources:       'Data sources for reporting',
    reportingFreeText:          'Reporting workflow detail (free text)',
    // Silo E — Marketing & Growth
    marketingChannels:          'Active marketing channels',
    marketingTracking:          'Marketing performance tracking',
    marketingBudgetAllocation:  'Marketing budget allocation method',
    marketingFocus:             'Marketing focus area',
    marketingFreeText:          'Marketing workflow detail (free text)',
    // Silo F — People & HR
    hrTaskTypes:                'HR task types',
    recentHires:                'Recent hires in last 12 months',
    onboardingQuality:          'Onboarding quality rating',
    hrSoftware:                 'HR software in use',
    hrFreeText:                 'HR workflow detail (free text)',
    // Silo G — IT & Systems
    systemCount:                'Number of core business systems',
    systemDataSharing:          'Data sharing between systems',
    manualReentry:              'Manual data re-entry frequency',
    itManagement:               'IT management approach',
    itFreeText:                 'IT workflow detail (free text)',
    // Closing / Infrastructure
    softwareStack:              'Software tools in use',
    commsStack:                 'Communications stack (M365 / GWS / other)',
    hostingEnvironment:         'Hosting environment (cloud / on-prem / hybrid)',
    itSupportModel:             'IT support model',
    annualItSpend:              'Annual IT spend (est.)',
    budgetRange:                'Budget range for AI',
    decisionMaker:              'Decision maker',
    // Deep-dive label injected by route
    activeSilo:                 'Deep-dive silo',
  }

  const lines = Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${labels[k] || k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`)

  if (abrData) {
    lines.push(`ABR entity type: ${abrData.entityDescription}`)
    if (abrData.state) lines.push(`Business state: ${abrData.state}`)
    lines.push(`GST registered: ${abrData.gstRegistered ? 'Yes' : 'No'}`)
  }

  return lines.join('\n')
}

// Friendly silo name for the user message
function siloName(silo: string | undefined): string {
  const names: Record<string, string> = {
    'silo-a': 'Customer Communication & Service',
    'silo-b': 'Admin & Operations',
    'silo-c': 'Sales & Lead Management',
    'silo-d': 'Finance & Reporting',
    'silo-e': 'Marketing & Growth',
    'silo-f': 'People & HR',
    'silo-g': 'IT & Systems Integration',
  }
  return silo ? (names[silo] || silo) : 'General Operations'
}

// ─── POST handler — streams Claude response to client ────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers } = body as { answers: Record<string, unknown> }
    // activeSilo is sent inside answers by the client
    const activeSilo = typeof answers.activeSilo === 'string' ? answers.activeSilo : undefined

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'answers is required' }, { status: 400 })
    }

    // Inject activeSilo into answers so formatAnswers includes it
    const enrichedAnswers = { ...answers, activeSilo: siloName(activeSilo) }

    // ABR lookup (non-blocking, 4s timeout)
    const abn = typeof answers.abn === 'string' ? answers.abn : ''
    const abrData = abn ? await lookupABN(abn) : null

    // Create audit session in Supabase
    const supabase = getSupabaseClient()
    const { data: session, error: sessionError } = await supabase
      .from('audit_sessions')
      .insert({
        status: 'submitted',
        answers: enrichedAnswers,
        ip_country: request.headers.get('cf-ipcountry') || '',
        referrer: request.headers.get('referer') || '',
      })
      .select('id')
      .single()

    if (sessionError || !session) {
      console.error('Supabase session error:', sessionError)
      return NextResponse.json({ error: "We couldn't save your session — please try again." }, { status: 503 })
    }

    // Build Claude user message
    const businessName = typeof answers.businessName === 'string' ? answers.businessName : 'this business'
    const siloLabel = siloName(activeSilo)
    const userMsg = `Here are the AI Opportunity Audit answers for an Australian SME:\n\n${formatAnswers(enrichedAnswers, abrData)}\n\nGenerate the AI Opportunity Report JSON for ${businessName}.\n\nIMPORTANT:\n- The business name "${businessName}" MUST appear in the headline.\n- The deep-dive silo is "${siloLabel}" — Opportunity #1 must directly address this area using the specific silo answers above.\n- All recommendations must be grounded in the specific answers above, not generic AI advice.`

    // Stream Claude response directly to client
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send session ID as first line so client can pass it to /api/audit/save
          controller.enqueue(encoder.encode(`__SESSION__:${session.id}\n`))

          const claudeStream = getAnthropicClient().messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 4096,
            temperature: 0.3,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userMsg }],
          })

          for await (const event of claudeStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }

          controller.close()
        } catch (err) {
          console.error('Claude stream error:', err)
          controller.enqueue(
            encoder.encode(`\n__ERROR__:${err instanceof Error ? err.message : 'Unknown error'}`)
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('Unexpected error in audit submit:', err)
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
