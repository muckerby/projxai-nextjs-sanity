import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      leadId,
      leadPath,
      industry,
      teamSize,
      aiMaturity,
      areasOfInterest,
      biggestChallenge,
      timeframe,
    } = body

    if (!leadId || !leadPath) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Build patch data
    const patchData: Record<string, unknown> = { leadPath }

    if (leadPath === 'intake') {
      if (industry) patchData.industry = industry
      if (teamSize) patchData.teamSize = teamSize
      if (aiMaturity) patchData.aiMaturity = aiMaturity
      if (areasOfInterest?.length) patchData.areasOfInterest = areasOfInterest
      if (biggestChallenge) patchData.biggestChallenge = biggestChallenge
      if (timeframe) patchData.timeframe = timeframe
    }

    // Patch the lead record in Sanity
    await sanityClient.patch(leadId).set(patchData).commit()

    // If intake completed, fetch lead details and send enriched email
    if (leadPath === 'intake') {
      const lead = await sanityClient.getDocument(leadId) as Record<string, string> | null
      const name = lead?.name ?? 'Unknown'
      const businessName = lead?.businessName ?? 'Unknown'

      const areasText = Array.isArray(areasOfInterest) && areasOfInterest.length
        ? areasOfInterest.map((a: string) => `• ${a}`).join('\n')
        : 'Not specified'

      const emailBody = `
<h2>New intake completed — ${name} from ${businessName}</h2>

<h3>Intake Answers</h3>
<p><strong>Industry:</strong> ${industry ?? 'Not specified'}</p>
<p><strong>Team size:</strong> ${teamSize ?? 'Not specified'}</p>
<p><strong>AI maturity:</strong> ${aiMaturity ?? 'Not specified'}</p>
<p><strong>Areas of interest:</strong><br>${areasText.replace(/\n/g, '<br>')}</p>
<p><strong>Biggest challenge:</strong> ${biggestChallenge ?? 'Not specified'}</p>
<p><strong>Timeframe:</strong> ${timeframe ?? 'Not specified'}</p>

<hr>

<h3>--- RESEARCH BRIEF ---</h3>
<p>Before responding to this lead, research:</p>
<ol>
  <li><strong>${businessName}</strong> — their website, what they sell, team size visible online</li>
  <li>Their LinkedIn company page — recent posts, headcount, culture</li>
  <li>Their top 2–3 competitors in <strong>${industry ?? 'their industry'}</strong></li>
  <li>Their likely current tech stack (look for job ads, About pages, G2 reviews)</li>
  <li>Any recent news, awards, or press about the business</li>
</ol>
<p><strong>Goal:</strong> know their business better than they expect before the first call.</p>

<hr>
<p><small>Sanity lead ID: ${leadId}</small></p>
      `.trim()

      await resend.emails.send({
        from: 'ProjxAI <noreply@projxai.com.au>',
        to: 'michaelc@projxai.com.au',
        subject: `New intake completed — ${name} from ${businessName}`,
        html: emailBody,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[intake/route] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
