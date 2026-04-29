import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, email } = body as { accessToken: string; email: string }

    if (!accessToken || !email) {
      return NextResponse.json(
        { error: 'accessToken and email are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()

    // Find the report row
    const { data: reportRow, error: findError } = await supabase
      .from('audit_reports')
      .select('id, email')
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
        return NextResponse.json(
          { error: 'Could not save your email -- please try again.' },
          { status: 503 }
        )
      }
    }

    // ── HubSpot contact creation (graceful -- non-blocking if key absent) ──
    const hubspotKey = process.env.HUBSPOT_API_TOKEN
    if (hubspotKey) {
      try {
        const hsRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hubspotKey}`,
          },
          body: JSON.stringify({
            properties: {
              email,
              lifecyclestage: 'lead',
              hs_lead_status: 'NEW',
              lead_source: 'AI Opportunity Audit',
            },
          }),
        })

        if (hsRes.ok) {
          const hsData = await hsRes.json().catch(() => ({}))
          if (hsData.id) {
            // Store HubSpot contact ID for reference
            await supabase
              .from('audit_reports')
              .update({ hubspot_contact_id: String(hsData.id) })
              .eq('id', reportRow.id)
          }
        } else if (hsRes.status !== 409) {
          // 409 = contact already exists -- ignore. Log anything else.
          const hsBody = await hsRes.json().catch(() => ({}))
          console.warn('HubSpot contact creation failed:', hsRes.status, hsBody)
        }
      } catch (hsErr) {
        // Non-blocking -- HubSpot failure must not block the user
        console.warn('HubSpot API error (non-blocking):', hsErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unexpected error in gate route:', err)
    return NextResponse.json(
      { error: 'Something went wrong -- please try again.' },
      { status: 500 }
    )
  }
