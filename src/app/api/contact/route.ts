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

async function verifyTurnstile(token: string): Promise<boolean> {
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

    // Validate required fields
    if (!name || !email || !businessName || !message) {
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

    // Verify Turnstile
    const turnstileValid = await verifyTurnstile(turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Security check failed. Please try again.' },
        { status: 400 },
      )
    }

    // Save lead to Sanity
    const lead = await sanityClient.create({
      _type: 'lead',
      name,
      email,
      businessName,
      message,
      enquiryType: enquiryType ?? 'general',
      ...(teamSize && { teamSize }),
      ...(aiChallenge && { aiChallenge }),
      ...(preferredContact && { preferredContact }),
      ...(phone && { phone }),
      sourcePage: sourcePage ?? '/contact',
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    // Send notification email
    const typeLabel = enquiryType === 'consulting' ? 'consulting' : 'general'
    const subject = `New ${typeLabel} enquiry from ${name} — ProjxAI`

    const emailBody = `
<h2>New ${typeLabel} enquiry</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Business:</strong> ${businessName}</p>
<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
${teamSize ? `<p><strong>Team size:</strong> ${teamSize}</p>` : ''}
${aiChallenge ? `<p><strong>AI challenge:</strong><br>${aiChallenge.replace(/\n/g, '<br>')}</p>` : ''}
${preferredContact ? `<p><strong>Preferred contact:</strong> ${preferredContact}</p>` : ''}
${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
<hr>
<p><small>Submitted from: ${sourcePage ?? '/contact'} | Sanity ID: ${lead._id}</small></p>
    `.trim()

    await resend.emails.send({
      from: 'ProjxAI Leads <onboarding@resend.dev>',
      to: 'michaelc@projxai.com.au',
      subject,
      html: emailBody,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
