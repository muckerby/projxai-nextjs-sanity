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

export function ConsultingEnquiryForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    aiChallenge: '',
    teamSize: '',
    preferredContact: 'email',
    phone: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
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
          message: form.aiChallenge || '(consulting enquiry — no message provided)',
          enquiryType: 'consulting',
          sourcePage: '/contact#consulting',
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
        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Enquiry received</h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          Thanks {form.name}! We&apos;ll be in touch within 1 business day to arrange a discovery call.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="e.g. We spend 10 hours a week writing product descriptions manually…"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="c-teamsize" className={labelClass}>
          Team size{' '}
          <span className="text-body-color font-normal dark:text-body-color-dark">(optional)</span>
        </label>
        <select
          id="c-teamsize"
          name="teamSize"
          value={form.teamSize}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select…</option>
          <option value="1-5">1–5 people</option>
          <option value="6-20">6–20 people</option>
          <option value="21-50">21–50 people</option>
          <option value="50+">50+ people</option>
        </select>
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
                onChange={handleChange}
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
            onChange={handleChange}
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
      {state === 'error' && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-block w-full rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80 disabled:opacity-60"
      >
        {state === 'submitting' ? 'Sending…' : 'Send consulting enquiry →'}
      </button>
    </form>
  )
}
