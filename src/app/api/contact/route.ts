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

// Internal bypass tokens used for soft-lead captures (newsletter, tool score, callback).
// These skip Cloudflare Turnstile verification — they never come from public forms.
const INTERNAL_BYPASS_TOKENS = new Set([
  'newsletter-bypass',
  'tool-bypass',
  'callback-bypass',
])

async function verifyTurnstile(token: string): Promise<boolean> {
  if (INTERNAL_BYPASS_TOKENS.has(token)) return true
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  )
  const data = await response.json()
  return data.success === true
}

// ── HubSpot helpers ───────────────────────────────────────────────────────────

const HUBSPOT_BASE = 'https://api.hubapi.com'

function hubspotHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
  }
}

/**
 * Map enquiryType to a HubSpot lifecycle stage.
 * newsletter → subscriber | tool-score/general/callback → lead | consulting → opportunity
 */
function getLifecycleStage(enquiryType: string): string {
  if (enquiryType === 'newsletter') return 'subscriber'
  if (enquiryType === 'consulting') return 'opportunity'
  return 'lead' // general, callback, tool-score
}

/**
 * Create or update a HubSpot contact by email.
 * Uses the upsert endpoint so duplicate emails are handled gracefully.
 * Returns the HubSpot contact ID, or null on failure.
 */
async function upsertHubSpotContact(params: {
  name: string
  email: string
  businessName?: string
  phone?: string
  enquiryType: string
  sourcePage: string
  message?: string
}): Promise<string | null> {
  const [firstname, ...rest] = params.name.trim().split(' ')
  const lastname = rest.join(' ') || '—'

  const properties: Record<string, string> = {
    email: params.email,
    firstname,
    lastname,
    lifecyclestage: getLifecycleStage(params.enquiryType),
    hs_lead_status: 'NEW',
    hubspot_owner_id: '90758533', // Michael Collicoat — auto-assign all inbound leads
  }
  if (params.businessName) properties.company = params.businessName
  if (params.phone) properties.phone = params.phone
  if (params.message) properties.message = params.message.slice(0, 65536)

  try {
    // Try create first
    const createRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: hubspotHeaders(),
      body: JSON.stringify({ properties }),
    })

    if (createRes.ok) {
      const data = await createRes.json()
      return data.id as string
    }

    // 409 = contact already exists — fetch by email and update
    if (createRes.status === 409) {
      const searchRes = await fetch(
        `${HUBSPOT_BASE}/crm/v3/objects/contacts/${encodeURIComponent(params.email)}?idProperty=email`,
        { method: 'GET', headers: hubspotHeaders() },
      )
      if (!searchRes.ok) return null
      const existing = await searchRes.json()
      const contactId = existing.id as string

      await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: hubspotHeaders(),
        body: JSON.stringify({ properties }),
      })
      return contactId
    }

    console.error('[hubspot] contact create failed:', createRes.status, await createRes.text())
    return null
  } catch (err) {
    console.error('[hubspot] upsertContact error:', err)
    return null
  }
}

/**
 * Create a HubSpot Deal and associate it with a contact.
 * Used for consulting enquiries only.
 */
async function createHubSpotDeal(params: {
  contactId: string
  businessName: string
  enquiryType: string
  message?: string
}): Promise<void> {
  try {
    const dealRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
      method: 'POST',
      headers: hubspotHeaders(),
      body: JSON.stringify({
        properties: {
          dealname: `${params.businessName} — ${params.enquiryType === 'consulting' ? 'Consulting Enquiry' : 'General Enquiry'}`,
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
          ...(params.message && { description: params.message.slice(0, 65536) }),
        },
      }),
    })

    if (!dealRes.ok) {
      console.error('[hubspot] deal create failed:', dealRes.status, await dealRes.text())
      return
    }

    const deal = await dealRes.json()
    const dealId = deal.id as string

    // Associate deal → contact (v4 associations API)
    await fetch(
      `${HUBSPOT_BASE}/crm/v4/objects/deals/${dealId}/associations/contacts/${params.contactId}/deal_to_contact`,
      { method: 'PUT', headers: hubspotHeaders() },
    )
  } catch (err) {
    console.error('[hubspot] createDeal error:', err)
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      businessName,
      message,
      enquiryType,
      teamSize,
      aiChallenge,
      preferredContact,
      phone,
      sourcePage,
      turnstileToken,
    } = body

    // Soft-lead enquiry types only require name + email
    const isSoftLead = enquiryType === 'newsletter' || enquiryType === 'tool-score' || enquiryType === 'callback'

    if (!name || !email || (!isSoftLead && (!businessName || !message))) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 },
      )
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Security check required.' },
        { status: 400 },
      )
    }

    const turnstileValid = await verifyTurnstile(turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Security check failed. Please try again.' },
        { status: 400 },
      )
    }

    // Build a combined message string for HubSpot notes
    const noteLines: string[] = []
    if (message) noteLines.push(message)
    if (teamSize) noteLines.push(`Team size: ${teamSize}`)
    if (aiChallenge) noteLines.push(`AI challenge: ${aiChallenge}`)
    if (preferredContact) noteLines.push(`Preferred contact: ${preferredContact}`)
    if (sourcePage) noteLines.push(`Source: ${sourcePage}`)
    const combinedNote = noteLines.join('\n\n')

    // ── Run Sanity + HubSpot in parallel ─────────────────────────────────────

    const [sanityResult, hubspotContactId] = await Promise.allSettled([

      // Sanity (kept as backup — will deprecate once HubSpot confirmed)
      sanityClient.create({
        _type: 'lead',
        name,
        email,
        businessName: businessName ?? '—',
        message: message ?? '',
        enquiryType: enquiryType ?? 'general',
        ...(teamSize && { teamSize }),
        ...(aiChallenge && { aiChallenge }),
        ...(preferredContact && { preferredContact }),
        ...(phone && { phone }),
        sourcePage: sourcePage ?? '/contact',
        status: 'new',
        createdAt: new Date().toISOString(),
      }),

      // HubSpot — create/update contact
      upsertHubSpotContact({
        name,
        email,
        businessName,
        phone,
        enquiryType: enquiryType ?? 'general',
        sourcePage: sourcePage ?? '/contact',
        message: combinedNote || undefined,
      }),

    ])

    // HubSpot deal for consulting leads
    const hsContactId =
      hubspotContactId.status === 'fulfilled' ? hubspotContactId.value : null

    if (hsContactId && (enquiryType === 'consulting' || enquiryType === 'general') && businessName) {
      await createHubSpotDeal({
        contactId: hsContactId,
        businessName,
        enquiryType: enquiryType ?? 'general',
        message: combinedNote || undefined,
      })
    }

    // Sanity ID for notification email (graceful if it failed)
    const sanityId =
      sanityResult.status === 'fulfilled'
        ? (sanityResult.value as { _id: string })._id
        : 'n/a'

    // ── Resend notification email ─────────────────────────────────────────────

    const typeLabel =
      enquiryType === 'consulting' ? 'consulting enquiry'
      : enquiryType === 'newsletter' ? 'newsletter sign-up'
      : enquiryType === 'tool-score' ? 'AI Opportunity Score capture'
      : enquiryType === 'callback' ? 'callback request'
      : 'general enquiry'

    const subject = `New ${typeLabel} from ${name} — ProjxAI`

    const emailBody = `
<h2>New ${typeLabel}</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${businessName ? `<p><strong>Business:</strong> ${businessName}</p>` : ''}
${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
${teamSize ? `<p><strong>Team size:</strong> ${teamSize}</p>` : ''}
${aiChallenge ? `<p><strong>AI challenge:</strong><br>${aiChallenge.replace(/\n/g, '<br>')}</p>` : ''}
${preferredContact ? `<p><strong>Preferred contact:</strong> ${preferredContact}</p>` : ''}
${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
<hr>
<p><small>Source: ${sourcePage ?? '/contact'} | HubSpot contact: ${hsContactId ?? 'failed'} | Sanity: ${sanityId}</small></p>
    `.trim()

    await resend.emails.send({
      from: 'ProjxAI <noreply@projxai.com.au>',
      to: 'michaelc@projxai.com.au',
      subject,
      html: emailBody,
    })

    return NextResponse.json({ success: true, leadId: sanityId })
  } catch (err) {
    console.error('[contact/route] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
