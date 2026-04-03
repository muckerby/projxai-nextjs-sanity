'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

const inputClass =
  'w-full rounded-md border border-stroke bg-white px-4 py-3 text-base text-body-color outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-dark dark:text-body-color-dark dark:focus:border-primary'
const labelClass = 'mb-1 block text-sm font-medium text-black dark:text-white'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

// ─── General Enquiry Form ────────────────────────────────────────────────────

export function GeneralEnquiryForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'email') setEmailError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    if (!turnstileToken) {
      setErrorMsg('Please complete the security check.')
      return
    }
    setState('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          enquiryType: 'general',
          sourcePage: '/contact',
          turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setState('error')
      } else {
        setState('success')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg bg-green-50 px-8 py-10 text-center dark:bg-green-900/20">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Message sent</h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          Thanks {form.name}! We&apos;ll get back to you within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="g-name" className={labelClass}>
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="g-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="g-email" className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="g-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@yourbusiness.com.au"
          className={inputClass}
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>
      <div>
        <label htmlFor="g-business" className={labelClass}>
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          id="g-business"
          name="businessName"
          type="text"
          required
          value={form.businessName}
          onChange={handleChange}
          placeholder="Your Business Pty Ltd"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="g-message" className={labelClass}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="g-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>
      <div>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken('')}
          onExpire={() => setTurnstileToken('')}
        />
      </div>
      {state === 'error' && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-block w-full rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80 disabled:opacity-60"
      >
        {state === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}

// ─── Consulting Enquiry Form ─────────────────────────────────────────────────

type ConsultingPhase =
  | 'form'
  | 'submitting'
  | 'path-choice'
  | 'booking-done'
  | 'intake'
  | 'intake-submitting'
  | 'intake-done'
  | 'error'

type IntakeData = {
  industry: string
  teamSize: string
  aiMaturity: string
  areasOfInterest: string[]
  biggestChallenge: string
  biggestChallengeOther: string
  timeframe: string
}

const INDUSTRIES = [
  'Accommodation & Tourism',
  'Automotive',
  'Construction & Trades',
  'eCommerce & Retail',
  'Education & Training',
  'Finance & Insurance',
  'Food & Hospitality',
  'Health & Wellbeing',
  'Legal & Professional Services',
  'Marketing & Advertising',
  'Manufacturing & Logistics',
  'Property & Real Estate',
  'Technology & Software',
  'Other',
]

const TEAM_SIZES = ['Just me', '2–5', '6–15', '16–30', '31–50', '50+']

const AI_MATURITY_OPTIONS = [
  'Completely new to it — not sure where to start',
  'Played around with ChatGPT or similar tools',
  'Using some AI tools but not getting much from them',
  'AI running in parts of the business, want to do more',
  'Specific AI project in mind, need expert help',
]

const AREAS_OF_INTEREST = [
  'Automating repetitive tasks & workflows',
  'AI for marketing, content & social media',
  'Customer service & chatbots',
  'Sales & lead management',
  'Data analysis & business intelligence',
  'AI strategy & where to start',
  'Staff training & AI upskilling',
  'Building or integrating AI tools',
  'I am not sure yet — I need guidance',
]

const CHALLENGES = [
  'Too much time on admin and manual tasks',
  'Not enough leads or visibility',
  'Converting leads into paying clients',
  'Keeping up with competitors',
  'Team capacity and productivity',
  'Understanding what technology can actually do for us',
  'Something else',
]

const TIMEFRAMES = [
  'Right now — I am ready to move',
  'Within the next month',
  'In the next 3 months',
  'Just exploring for now',
]

const radioClass =
  'flex cursor-pointer items-start gap-3 rounded-md border border-stroke px-4 py-3 text-sm text-body-color has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary dark:border-stroke-dark dark:text-body-color-dark'

export function ConsultingEnquiryForm() {
  const [phase, setPhase] = useState<ConsultingPhase>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [leadId, setLeadId] = useState('')
  const [leadName, setLeadName] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    aiChallenge: '',
    preferredContact: 'email',
    phone: '',
  })
  const [intake, setIntake] = useState<IntakeData>({
    industry: '',
    teamSize: '',
    aiMaturity: '',
    areasOfInterest: [],
    biggestChallenge: '',
    biggestChallengeOther: '',
    timeframe: '',
  })

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'email') setEmailError('')
  }

  async function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    if (!turnstileToken) {
      setErrorMsg('Please complete the security check.')
      return
    }
    setPhase('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: form.aiChallenge || '(consulting enquiry — no message provided)',
          enquiryType: 'consulting',
          sourcePage: '/contact#consulting',
          turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setPhase('error')
      } else {
        setLeadId(data.leadId ?? '')
        setLeadName(form.name)
        setPhase('path-choice')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setPhase('error')
    }
  }

  async function handleBookingClick() {
    window.open('https://cal.com/michael-collicoat/30min', '_blank')
    if (leadId) {
      fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, leadPath: 'booking' }),
      }).catch(() => {})
    }
    setPhase('booking-done')
  }

  function handleIntakeStart() {
    setPhase('intake')
  }

  function handleIntakeChange(field: keyof IntakeData, value: string) {
    setIntake((prev) => ({ ...prev, [field]: value }))
  }

  function handleAreaToggle(area: string) {
    setIntake((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(area)
        ? prev.areasOfInterest.filter((a) => a !== area)
        : [...prev.areasOfInterest, area],
    }))
  }

  async function handleIntakeSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPhase('intake-submitting')
    const biggestChallenge =
      intake.biggestChallenge === 'Something else' && intake.biggestChallengeOther
        ? `Something else: ${intake.biggestChallengeOther}`
        : intake.biggestChallenge

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          leadPath: 'intake',
          industry: intake.industry,
          teamSize: intake.teamSize,
          aiMaturity: intake.aiMaturity,
          areasOfInterest: intake.areasOfInterest,
          biggestChallenge,
          timeframe: intake.timeframe,
        }),
      })
      if (res.ok) {
        setPhase('intake-done')
      } else {
        setPhase('error')
        setErrorMsg('Something went wrong saving your answers. Please try again.')
      }
    } catch {
      setPhase('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  // ── Path choice screen ──────────────────────────────────────────────────────
  if (phase === 'path-choice') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mb-3 text-4xl">✓</div>
          <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
            Thanks — we have your details.
          </h3>
          <p className="text-base text-body-color dark:text-body-color-dark">
            To make sure we come to you prepared, how would you like to continue?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Path A — Book a call */}
          <div className="flex flex-col rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
            <h4 className="mb-2 text-base font-bold text-black dark:text-white">
              Book a Discovery Call
            </h4>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
              Choose a time that suits you. We will come prepared.
            </p>
            <button
              onClick={handleBookingClick}
              className="inline-block w-full rounded-xs bg-primary px-5 py-3 text-sm font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book a 30-Minute Call →
            </button>
          </div>
          {/* Path B — Smart intake */}
          <div className="flex flex-col rounded-lg border border-stroke bg-white p-6 dark:border-stroke-dark dark:bg-dark">
            <h4 className="mb-2 text-base font-bold text-black dark:text-white">
              Tell Us More First
            </h4>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
              Answer 6 quick questions so we can research your business before we speak.
            </p>
            <button
              onClick={handleIntakeStart}
              className="inline-block w-full rounded-xs border border-primary px-5 py-3 text-sm font-semibold text-primary duration-300 hover:bg-primary hover:text-white"
            >
              Start the Intake →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Booking confirmed ────────────────────────────────────────────────────────
  if (phase === 'booking-done') {
    return (
      <div className="rounded-lg bg-green-50 px-8 py-10 text-center dark:bg-green-900/20">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
          Booking page opened
        </h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          If it didn&apos;t open,{' '}
          <a
            href="https://cal.com/michael-collicoat/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            click here to book
          </a>
          . We look forward to speaking with you, {leadName}.
        </p>
      </div>
    )
  }

  // ── Intake form ──────────────────────────────────────────────────────────────
  if (phase === 'intake' || phase === 'intake-submitting') {
    return (
      <form onSubmit={handleIntakeSubmit} className="space-y-8">
        <div>
          <p className="mb-1 text-sm font-semibold text-black dark:text-white">
            Thanks {leadName} — just 6 quick questions.
          </p>
          <p className="text-sm text-body-color dark:text-body-color-dark">
            Your answers help us research your business before we speak.
          </p>
        </div>

        {/* Q1 — Industry */}
        <div>
          <label htmlFor="intake-industry" className={labelClass}>
            1. What industry are you in? <span className="text-red-500">*</span>
          </label>
          <select
            id="intake-industry"
            required
            value={intake.industry}
            onChange={(e) => handleIntakeChange('industry', e.target.value)}
            className={inputClass}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Q2 — Team size */}
        <fieldset>
          <legend className={`${labelClass} mb-3`}>
            2. How big is your team? <span className="text-red-500">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TEAM_SIZES.map((size) => (
              <label key={size} className={radioClass}>
                <input
                  type="radio"
                  name="intake-teamSize"
                  value={size}
                  required
                  checked={intake.teamSize === size}
                  onChange={() => handleIntakeChange('teamSize', size)}
                  className="mt-0.5 accent-primary"
                />
                {size}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Q3 — AI maturity */}
        <fieldset>
          <legend className={`${labelClass} mb-3`}>
            3. Where is your business with AI right now? <span className="text-red-500">*</span>
          </legend>
          <div className="space-y-2">
            {AI_MATURITY_OPTIONS.map((opt) => (
              <label key={opt} className={radioClass}>
                <input
                  type="radio"
                  name="intake-aiMaturity"
                  value={opt}
                  required
                  checked={intake.aiMaturity === opt}
                  onChange={() => handleIntakeChange('aiMaturity', opt)}
                  className="mt-0.5 shrink-0 accent-primary"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Q4 — Areas of interest */}
        <fieldset>
          <legend className={`${labelClass} mb-3`}>
            4. Which areas are most relevant to you?{' '}
            <span className="text-body-color font-normal dark:text-body-color-dark">(select all that apply)</span>
          </legend>
          <div className="space-y-2">
            {AREAS_OF_INTEREST.map((area) => (
              <label
                key={area}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-stroke px-4 py-3 text-sm text-body-color has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary dark:border-stroke-dark dark:text-body-color-dark"
              >
                <input
                  type="checkbox"
                  value={area}
                  checked={intake.areasOfInterest.includes(area)}
                  onChange={() => handleAreaToggle(area)}
                  className="mt-0.5 shrink-0 accent-primary"
                />
                {area}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Q5 — Biggest challenge */}
        <fieldset>
          <legend className={`${labelClass} mb-3`}>
            5. What is your biggest challenge right now? <span className="text-red-500">*</span>
          </legend>
          <div className="space-y-2">
            {CHALLENGES.map((challenge) => (
              <label key={challenge} className={radioClass}>
                <input
                  type="radio"
                  name="intake-challenge"
                  value={challenge}
                  required
                  checked={intake.biggestChallenge === challenge}
                  onChange={() => handleIntakeChange('biggestChallenge', challenge)}
                  className="mt-0.5 shrink-0 accent-primary"
                />
                {challenge}
              </label>
            ))}
          </div>
          {intake.biggestChallenge === 'Something else' && (
            <div className="mt-3">
              <label htmlFor="intake-other" className={labelClass}>
                Tell us more <span className="text-red-500">*</span>
              </label>
              <input
                id="intake-other"
                type="text"
                required
                value={intake.biggestChallengeOther}
                onChange={(e) => handleIntakeChange('biggestChallengeOther', e.target.value)}
                placeholder="Describe your biggest challenge…"
                className={inputClass}
              />
            </div>
          )}
        </fieldset>

        {/* Q6 — Timeframe */}
        <fieldset>
          <legend className={`${labelClass} mb-3`}>
            6. What is your timeframe? <span className="text-red-500">*</span>
          </legend>
          <div className="space-y-2">
            {TIMEFRAMES.map((tf) => (
              <label key={tf} className={radioClass}>
                <input
                  type="radio"
                  name="intake-timeframe"
                  value={tf}
                  required
                  checked={intake.timeframe === tf}
                  onChange={() => handleIntakeChange('timeframe', tf)}
                  className="mt-0.5 shrink-0 accent-primary"
                />
                {tf}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={phase === 'intake-submitting'}
          className="inline-block w-full rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80 disabled:opacity-60"
        >
          {phase === 'intake-submitting' ? 'Saving your answers…' : 'Submit answers →'}
        </button>
      </form>
    )
  }

  // ── Intake complete ──────────────────────────────────────────────────────────
  if (phase === 'intake-done') {
    return (
      <div className="rounded-lg bg-green-50 px-8 py-10 text-center dark:bg-green-900/20">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
          Perfect — we will be in touch shortly.
        </h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          Thanks {leadName}! We&apos;ll review your answers, research your business, and come back to you ready to have a real conversation.
        </p>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (phase === 'error') {
    return (
      <div className="rounded-lg bg-red-50 px-8 py-10 text-center dark:bg-red-900/20">
        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Something went wrong</h3>
        <p className="mb-4 text-base text-body-color dark:text-body-color-dark">{errorMsg}</p>
        <button
          onClick={() => { setPhase('form'); setErrorMsg('') }}
          className="text-primary text-sm underline"
        >
          Try again
        </button>
      </div>
    )
  }

  // ── Initial consulting form ──────────────────────────────────────────────────
  return (
    <form onSubmit={handleInitialSubmit} className="space-y-5">
      <div>
        <label htmlFor="c-name" className={labelClass}>
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleFormChange}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="c-email" className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleFormChange}
          placeholder="jane@yourbusiness.com.au"
          className={inputClass}
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>
      <div>
        <label htmlFor="c-business" className={labelClass}>
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          id="c-business"
          name="businessName"
          type="text"
          required
          value={form.businessName}
          onChange={handleFormChange}
          placeholder="Your Business Pty Ltd"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="c-challenge" className={labelClass}>
          What&apos;s your biggest AI challenge right now?{' '}
          <span className="text-body-color font-normal dark:text-body-color-dark">(optional)</span>
        </label>
        <textarea
          id="c-challenge"
          name="aiChallenge"
          rows={4}
          value={form.aiChallenge}
          onChange={handleFormChange}
          placeholder="e.g. We spend 10 hours a week writing product descriptions manually…"
          className={inputClass}
        />
      </div>
      <div>
        <p className={labelClass}>How would you prefer we follow up?</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {[
            { value: 'email', label: 'Email me back' },
            { value: 'call', label: 'Call me back' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-stroke px-4 py-3 text-sm text-body-color has-[:checked]:border-primary has-[:checked]:text-primary dark:border-stroke-dark dark:text-body-color-dark"
            >
              <input
                type="radio"
                name="preferredContact"
                value={opt.value}
                checked={form.preferredContact === opt.value}
                onChange={handleFormChange}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      {form.preferredContact === 'call' && (
        <div>
          <label htmlFor="c-phone" className={labelClass}>
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleFormChange}
            placeholder="04xx xxx xxx"
            className={inputClass}
          />
        </div>
      )}
      <div>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken('')}
          onExpire={() => setTurnstileToken('')}
        />
      </div>
      {phase === 'error' && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={phase === 'submitting'}
        className="inline-block w-full rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80 disabled:opacity-60"
      >
        {phase === 'submitting' ? 'Sending…' : 'Send consulting enquiry →'}
      </button>
    </form>
  )
}
