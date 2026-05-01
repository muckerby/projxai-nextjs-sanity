import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

const REQUIRED_FIELDS = [
  'businessName', 'score', 'scoreLabel', 'headline', 'summary',
  'readinessDimensions', 'opportunities', 'quickWins', 'investmentEstimate',
  'riskFactors', 'ninetyDayPlan', 'readinessLevel', 'nextStep',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, reportJson } = body as {
      sessionId: string
      reportJson: Record<string, unknown>
    }

    if (!sessionId || !reportJson) {
      return NextResponse.json({ error: 'sessionId and reportJson are required' }, { status: 400 })
    }

    const missing = REQUIRED_FIELDS.filter(k => !(k in reportJson))
    if (missing.length > 0) {
      console.error('Missing report fields:', missing)
      return NextResponse.json(
        { error: `Report is missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()

    const { data: report, error: reportError } = await supabase
      .from('audit_reports')
      .insert({
        session_id: sessionId,
        report_json: reportJson,
        score: typeof reportJson.score === 'number' ? reportJson.score : null,
      })
      .select('id, access_token, score')
      .single()

    if (reportError || !report) {
      console.error('Supabase report error:', reportError)
      return NextResponse.json({ error: "We couldn't save your report — please try again." }, { status: 503 })
    }

    await supabase
      .from('audit_sessions')
      .update({ status: 'completed' })
      .eq('id', sessionId)

    return NextResponse.json({
      accessToken: report.access_token,
      score: report.score,
    })
  } catch (err) {
    console.error('Unexpected error in audit save:', err)
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
