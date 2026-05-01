import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { Resend } from 'resend'

// ─── Resend email HTML template ───────────────────────────────────────────────

function renderAuditEmail({
  businessName,
  score,
  scoreLabel,
  opportunityTitle,
  opportunityDesc,
  reportUrl,
}: {
  businessName: string
  score: number
  scoreLabel: string
  opportunityTitle: string
  opportunityDesc: string
  reportUrl: string
}): string {
  const scoreColour = score >= 70 ? '#22c55e' : score >= 50 ? '#eab308' : score >= 30 ? '#f97316' : '#ef4444'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your AI Opportunity Report — ${businessName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Inter,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Logo header -->
        <tr><td align="center" style="padding-bottom:28px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px;">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#6B3FE7"/>
                  <path d="M8 28 L28 8 L22 22 Z" fill="white"/>
                  <path d="M28 8 L8 28 L14 14 Z" fill="white" fill-opacity="0.45"/>
                  <circle cx="18" cy="18" r="2.5" fill="#6B3FE7"/>
                </svg>
              </td>
              <td style="font-family:'Space Grotesk',Georgia,sans-serif;font-size:20px;font-weight:700;color:#151c27;letter-spacing:-0.02em;">ProjxAI</td>
            </tr>
          </table>
        </td></tr>

        <!-- Main card -->
        <tr><td style="background:#ffffff;border-radius:20px;padding:40px;box-shadow:0 4px 40px rgba(21,28,39,0.06);">

          <!-- Headline -->
          <h1 style="font-family:'Space Grotesk',Georgia,sans-serif;font-size:24px;font-weight:800;color:#151c27;letter-spacing:-0.02em;margin:0 0 8px;">Your AI Opportunity Report is ready</h1>
          <p style="font-size:15px;color:#7a7487;margin:0 0 28px;">For <strong style="color:#151c27;">${businessName}</strong></p>

          <!-- Score box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9ff;border-radius:16px;margin-bottom:28px;">
            <tr><td style="padding:24px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#7a7487;letter-spacing:0.05em;text-transform:uppercase;">AI Opportunity Score</p>
              <p style="margin:0 0 4px;font-family:'Space Grotesk',Georgia,sans-serif;font-size:56px;font-weight:800;color:${scoreColour};letter-spacing:-0.04em;line-height:1;">${score}</p>
              <p style="margin:0;font-size:14px;font-weight:600;color:${scoreColour};">${scoreLabel}</p>
            </td></tr>
          </table>

          <!-- Top opportunity -->
          <p style="font-size:13px;font-weight:700;color:#6B3FE7;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 8px;">${businessName}'s top opportunity</p>
          <h2 style="font-family:'Space Grotesk',Georgia,sans-serif;font-size:18px;font-weight:700;color:#151c27;margin:0 0 10px;">${opportunityTitle}</h2>
          <p style="font-size:14px;line-height:1.65;color:#494455;margin:0 0 28px;">${opportunityDesc.split('.')[0]}.</p>

          <!-- CTA button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
            <tr><td style="background:linear-gradient(135deg,#6B3FE7 0%,#4e2cb3 100%);border-radius:12px;text-align:center;">
              <a href="${reportUrl}" style="display:inline-block;padding:14px 32px;font-family:'Space Grotesk',Georgia,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">
                View your full report →
              </a>
            </td></tr>
          </table>

          <p style="font-size:13px;color:#9ca3af;text-align:center;margin:0 0 32px;">
            This link is permanent — bookmark it or share it with your team. It won't expire for 12 months.
          </p>

          <hr style="border:none;border-top:1px solid #e5e0f0;margin:0 0 28px;" />

          <!-- Book a call -->
          <p style="font-size:14px;line-height:1.65;color:#494455;margin:0 0 16px;">
            If you'd like to talk through what this means for ${businessName}, I'm available for a free 15-minute call.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="border:2px solid #6B3FE7;border-radius:12px;text-align:center;">
              <a href="https://cal.com/michael-collicoat/15min" style="display:inline-block;padding:12px 28px;font-family:'Space Grotesk',Georgia,sans-serif;font-size:14px;font-weight:700;color:#6B3FE7;text-decoration:none;">
                Book a free 15-minute call →
              </a>
            </td></tr>
          </table>

          <!-- Signature -->
          <p style="font-size:14px;color:#494455;margin:28px 0 0;line-height:1.6;">
            Michael Collicoat<br/>
            <span style="color:#9ca3af;">ProjxAI — Founded by a 30+ year Australian digital operator</span>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 16px;text-align:center;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            Collicorp Pty Ltd · ABN 80 398 642 662 · Brisbane, QLD, Australia<br/>
            <a href="https://projxai.com.au/privacy" style="color:#9ca3af;">Privacy Policy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── HubSpot helper — search contact by email ─────────────────────────────────

async function hsSearchContact(email: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['email'],
        limit: 1,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.results?.[0]?.id || null
  } catch {
    return null
  }
}

// ─── HubSpot helper — upsert contact with 10 audit properties ─────────────────

async function hsUpsertContact(
  email: string,
  apiKey: string,
  props: Record<string, string | number>,
): Promise<string | null> {
  try {
    const existingId = await hsSearchContact(email, apiKey)

    const properties = {
      email,
      lifecyclestage: 'lead',
      hs_lead_status: 'NEW',
      ...props,
    }

    if (existingId) {
      // PATCH existing
      const res = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ properties }),
      })
      return res.ok ? existingId : null
    } else {
      // POST new
      const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ properties }),
      })
      if (!res.ok) return null
      const data = await res.json()
      return data.id || null
    }
  } catch {
    return null
  }
}

// ─── HubSpot helper — create note on contact ─────────────────────────────────

async function hsCreateNote(
  contactId: string,
  apiKey: string,
  noteBody: string,
): Promise<void> {
  try {
    // Create engagement note
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        properties: {
          hs_note_body: noteBody,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [{
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        }],
      }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      console.warn('HubSpot note creation failed:', res.status, body)
    }
  } catch (err) {
    console.warn('HubSpot note error:', err)
  }
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, email } = body as { accessToken: string; email: string }

    if (!accessToken || !email) {
      return NextResponse.json({ error: 'accessToken and email are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    // Fetch report + session data
    const { data: reportRow, error: findError } = await supabase
      .from('audit_reports')
      .select('id, email, report_json, score, session_id')
      .eq('access_token', accessToken)
      .single()

    if (findError || !reportRow) {
      return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
    }

    // Patch email + timestamp if not already captured
    if (!reportRow.email) {
      const { error: patchError } = await supabase
        .from('audit_reports')
        .update({ email, email_captured_at: new Date().toISOString() })
        .eq('id', reportRow.id)

      if (patchError) {
        console.error('Supabase patch error:', patchError)
        return NextResponse.json({ error: 'Could not save your email — please try again.' }, { status: 503 })
      }
    }

    // Parse report JSON for downstream use
    const report = reportRow.report_json as Record<string, unknown>
    const businessName = (report?.businessName as string) || 'your business'
    const score = typeof report?.score === 'number' ? report.score : (reportRow.score || 0)
    const scoreLabel = (report?.scoreLabel as string) || ''
    const readinessLevel = (report?.readinessLevel as string) || ''
    const opportunities = (report?.opportunities as Array<Record<string, string>>) || []
    const topOpp = opportunities[0] || {}
    const reportUrl = `https://projxai.com.au/audit/report/${accessToken}`

    // Fetch session answers for HubSpot enrichment
    let sessionAnswers: Record<string, unknown> = {}
    if (reportRow.session_id) {
      const { data: session } = await supabase
        .from('audit_sessions')
        .select('answers')
        .eq('id', reportRow.session_id)
        .single()
      if (session?.answers) sessionAnswers = session.answers as Record<string, unknown>
    }

    // ── Resend email (non-blocking) ───────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: 'ProjxAI <hello@projxai.com.au>',
          to: email,
          replyTo: 'michaelc@projxai.com.au',
          subject: `Your AI Opportunity Report — ${businessName} · Score: ${score}/100`,
          html: renderAuditEmail({
            businessName,
            score,
            scoreLabel,
            opportunityTitle: topOpp.title || 'Your top AI opportunity',
            opportunityDesc: topOpp.description || '',
            reportUrl,
          }),
        })
      } catch (emailErr) {
        console.warn('Resend email error (non-blocking):', emailErr)
      }
    }

    // ── HubSpot enrichment (non-blocking) ─────────────────────────────────────
    const hubspotKey = process.env.HUBSPOT_API_TOKEN
    if (hubspotKey) {
      try {
        const auditProps: Record<string, string | number> = {
          projxai_audit_score: score,
          projxai_audit_completed_at: new Date().toISOString().split('T')[0], // YYYY-MM-DD for date field
          projxai_audit_business_name: businessName,
          projxai_audit_business_type: String(sessionAnswers.businessType || sessionAnswers.businessType_other || ''),
          projxai_audit_team_size: String(sessionAnswers.teamSize || ''),
          projxai_audit_budget_range: String(sessionAnswers.budgetRange || ''),
          projxai_audit_top_opportunity: topOpp.title || '',
          projxai_audit_bottleneck: String(sessionAnswers.bottleneck || sessionAnswers.bottleneck_other || ''),
          projxai_audit_report_url: reportUrl,
          projxai_audit_readiness_level: readinessLevel,
        }

        const contactId = await hsUpsertContact(email, hubspotKey, auditProps)

        if (contactId) {
          // Store HubSpot contact ID in Supabase
          await supabase
            .from('audit_reports')
            .update({ hubspot_contact_id: String(contactId) })
            .eq('id', reportRow.id)

          // Create HubSpot note with full summary
          const noteBody = [
            `Completed AI Opportunity Audit — ${new Date().toLocaleDateString('en-AU')}`,
            `Business: ${businessName}`,
            `Score: ${score}/100 — ${scoreLabel}`,
            `Readiness level: ${readinessLevel}`,
            `Top opportunity: ${topOpp.title || ''}`,
            `Main bottleneck: ${sessionAnswers.bottleneck || sessionAnswers.bottleneck_other || ''}`,
            `Team size: ${sessionAnswers.teamSize || ''}`,
            `Budget range: ${sessionAnswers.budgetRange || ''}`,
            `Decision maker: ${sessionAnswers.decisionMaker || ''}`,
            `Report URL: ${reportUrl}`,
          ].filter(Boolean).join('\n')

          await hsCreateNote(contactId, hubspotKey, noteBody)
        }
      } catch (hsErr) {
        console.warn('HubSpot enrichment error (non-blocking):', hsErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unexpected error in gate route:', err)
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
