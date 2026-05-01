'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'businessName' | 'questions' | 'submitting' | 'error'
type QuestionType = 'radio' | 'checkbox'

interface Question {
  id: string
  section: string
  sectionIndex: number
  text: string
  type: QuestionType
  options: string[]
  otherTrigger?: string
  otherPlaceholder?: string
  otherMaxLength?: number
}

interface Answers {
  [key: string]: string | string[] | undefined
}

// ─── Question Definitions — v2 (14 questions) ────────────────────────────────

const QUESTIONS: Question[] = [
  // SECTION 1: About your business (Q1–Q2)
  {
    id: 'businessType', section: 'About your business', sectionIndex: 1,
    text: 'What best describes your business?', type: 'radio',
    options: [
      'Professional services (accounting, legal, consulting, financial planning)',
      'Retail & eCommerce', 'Hospitality & food & beverage', 'Trade & construction',
      'Healthcare & allied health', 'B2B / wholesale / distribution',
      'Not-for-profit or community organisation', 'Other',
    ],
    otherTrigger: 'Other', otherPlaceholder: 'Describe your business type…', otherMaxLength: 150,
  },
  {
    id: 'teamSize', section: 'About your business', sectionIndex: 1,
    text: 'How many people work in your business (including yourself)?', type: 'radio',
    options: ['Just me (solo operator)', '2–5 people', '6–20 people', '21–50 people', '51+ people'],
  },

  // SECTION 2: Your operations (Q3–Q7)
  {
    id: 'revenueModel', section: 'Your operations', sectionIndex: 2,
    text: 'How does your business primarily generate revenue?', type: 'radio',
    options: [
      'Project or job-based (invoiced per engagement or contract)',
      'Ongoing retainer or subscription clients',
      'Transactional sales (products, orders, bookings)',
      'Fee-for-service (professional time billed hourly or daily)',
      'Mixed — multiple models', 'Other',
    ],
    otherTrigger: 'Other', otherPlaceholder: 'Describe your revenue model…', otherMaxLength: 100,
  },
  {
    id: 'softwareStack', section: 'Your operations', sectionIndex: 2,
    text: 'Which business software does your team use regularly? Select all that apply.', type: 'checkbox',
    options: [
      'Accounting software (Xero, MYOB, QuickBooks)',
      'CRM or contact management (HubSpot, Salesforce, Pipedrive)',
      'Project management (Asana, ClickUp, Monday, Trello)',
      'Email marketing (Mailchimp, ActiveCampaign, Klaviyo)',
      'Scheduling or booking software',
      'Industry-specific software (practice management, POS, ERP)',
      'Microsoft 365 (Word, Excel, Teams, Outlook)',
      'Google Workspace (Docs, Sheets, Gmail, Drive)',
      'None of the above — we work mostly in spreadsheets and email',
      "We use a lot of software but it doesn't talk to each other",
    ],
  },
  {
    id: 'aiToolUsage', section: 'Your operations', sectionIndex: 2,
    text: 'Which of these are you currently using AI tools for? Select all that apply.', type: 'checkbox',
    options: [
      'Writing emails, reports, or content', 'Customer service or live chat',
      'Data analysis or reporting', 'Social media or marketing',
      'Internal admin or scheduling', "None — we haven't started yet",
      "We've tried a few things but nothing stuck",
    ],
  },
  {
    id: 'bottleneck', section: 'Your operations', sectionIndex: 2,
    text: "What's your biggest operational bottleneck right now?", type: 'radio',
    options: [
      'Too much time on manual data entry and admin',
      'Customer enquiries and follow-ups take too long',
      'Our reporting is slow, unreliable, or non-existent',
      'Lead follow-up falls through the cracks',
      "We can't see what's actually working in our marketing",
      'Hiring, onboarding, or HR admin overwhelms us',
      "Something else (I'll describe below)",
    ],
    otherTrigger: "Something else (I'll describe below)",
    otherPlaceholder: 'Describe your bottleneck…', otherMaxLength: 100,
  },
  {
    id: 'manualHours', section: 'Your operations', sectionIndex: 2,
    text: 'Roughly how many hours per week does your team spend on repetitive, manual tasks?', type: 'radio',
    options: ['Less than 5 hours', '5–15 hours', '15–30 hours', 'More than 30 hours', "I honestly don't know"],
  },

  // SECTION 3: AI readiness (Q8–Q11)
  {
    id: 'dedicatedRoles', section: 'AI readiness', sectionIndex: 3,
    text: 'Do you have dedicated people for any of the following? Select all that apply.', type: 'checkbox',
    options: [
      'Marketing (dedicated role)', 'Operations or admin (dedicated role)',
      'IT or technology (dedicated role)', 'Finance (dedicated role or bookkeeper)',
      'None of the above — the owner handles most of it', 'None — we outsource everything',
    ],
  },
  {
    id: 'techComfort', section: 'AI readiness', sectionIndex: 3,
    text: "How would you describe your team's comfort with new technology tools?", type: 'radio',
    options: [
      'High — we adopt new tools quickly and without much friction',
      'Medium — it takes a few weeks but people come around',
      'Low — technology change is a real challenge in our business',
      'Variable — some team members are great, others resist',
    ],
  },
  {
    id: 'priorAiExperience', section: 'AI readiness', sectionIndex: 3,
    text: 'Have you had any AI projects, pilots, or tool rollouts in the past two years?', type: 'radio',
    options: [
      'Yes, and they went well', "Yes, but they didn't really stick or deliver value",
      "No — we haven't started", "We're currently evaluating options",
      "Not sure what counts as an AI project",
    ],
  },
  {
    id: 'aiConcern', section: 'AI readiness', sectionIndex: 3,
    text: 'What concerns you most about AI in your business? Pick your top concern.', type: 'radio',
    options: [
      "Cost — unclear what we'd actually get for the money", 'Data security and privacy',
      'Staff resistance or job anxiety', "Not knowing where to start",
      "Our data isn't organised enough to get value from AI",
      'Vendor lock-in or over-dependence on one tool', "Nothing — I'm ready to go",
    ],
  },

  // SECTION 4: Your priorities (Q12–Q14)
  {
    id: 'ninetyDayPriority', section: 'Your priorities', sectionIndex: 4,
    text: 'If AI could do one thing for your business in the next 90 days, what would matter most?', type: 'radio',
    options: [
      'Save time on admin and manual tasks', 'Improve speed and quality of customer responses',
      "Get better visibility into what's actually happening in the business",
      'Reduce errors in our operations', 'Scale our marketing without scaling headcount',
      'Reduce wage costs through automation',
    ],
  },
  {
    id: 'budgetRange', section: 'Your priorities', sectionIndex: 4,
    text: 'What budget are you considering for AI in the next 12 months?', type: 'radio',
    options: [
      "We're not budgeting for it yet", 'Under $5,000', '$5,000–$20,000',
      '$20,000–$50,000', 'Over $50,000', 'I need to understand the ROI before I can answer this',
    ],
  },
  {
    id: 'decisionMaker', section: 'Your priorities', sectionIndex: 4,
    text: 'Who makes the final call on technology and operational investment in your business?', type: 'radio',
    options: [
      'Me — I make the call', 'Me and a business partner or co-owner',
      'Me and a board or investors', 'I influence it but it goes to a finance or IT team',
      "It's complicated",
    ],
  },
]

const TOTAL_QUESTIONS = QUESTIONS.length // 14

const LOADING_MSGS = [
  (n: string) => `Analysing ${n}'s AI opportunity…`,
  () => 'Reviewing your operations and readiness profile…',
  () => 'Identifying your highest-value opportunities…',
  () => 'Building your 90-day plan…',
  () => 'Your report is almost ready…',
]

// ─── Compass Logo ─────────────────────────────────────────────────────────────

function CompassLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#6B3FE7" />
      <polygon points="18,4 21,18 18,16 15,18" fill="white" />
      <polygon points="32,18 18,21 20,18 18,15" fill="white" opacity="0.7" />
      <polygon points="18,32 15,18 18,20 21,18" fill="white" opacity="0.85" />
      <polygon points="4,18 18,15 16,18 18,21" fill="white" opacity="0.6" />
      <circle cx="18" cy="18" r="2.5" fill="#6B3FE7" />
    </svg>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm" style={{ color: '#6b7280' }}>Question {current + 1} of {total}</span>
        <span className="text-sm font-semibold" style={{ color: '#6B3FE7' }}>{pct}%</span>
      </div>
      <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#e5e7eb' }}>
        <div className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: '#6B3FE7' }} />
      </div>
    </div>
  )
}

function SectionBadge({ section }: { section: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
      style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}>
      {section}
    </span>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AuditPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [businessName, setBusinessName] = useState('')
  const [abn, setAbn] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [otherText, setOtherText] = useState<Record<string, string>>({})
  const [optionalNote, setOptionalNote] = useState('')
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingIdx, setLoadingIdx] = useState(0)
  const loadingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const bnInputRef = useRef<HTMLInputElement>(null)
  const [bypassMode, setBypassMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search)
      if (p.get('bypass')) setBypassMode(true)
    }
  }, [])

  useEffect(() => {
    if (phase === 'businessName') setTimeout(() => bnInputRef.current?.focus(), 80)
  }, [phase])

  useEffect(() => {
    if (phase === 'submitting') {
      setLoadingIdx(0)
      loadingRef.current = setInterval(() => setLoadingIdx(i => (i + 1) % LOADING_MSGS.length), 2200)
    } else {
      if (loadingRef.current) { clearInterval(loadingRef.current); loadingRef.current = null }
    }
    return () => { if (loadingRef.current) clearInterval(loadingRef.current) }
  }, [phase])

  const question = QUESTIONS[currentQ]
  const getAnswer = (id: string) => answers[id]

  const setRadioAnswer = useCallback((qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    const t = setTimeout(() => {
      const q = QUESTIONS.find(q => q.id === qId)
      if (q?.otherTrigger && value === q.otherTrigger) return
      advanceQuestion()
    }, 380)
    setAutoAdvanceTimer(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, autoAdvanceTimer])

  const toggleCheckbox = (qId: string, value: string) => {
    setAnswers(prev => {
      const cur = (prev[qId] as string[]) || []
      if (cur.includes(value)) return { ...prev, [qId]: cur.filter(v => v !== value) }
      const noneOpts = [
        "None — we haven't started yet", "We've tried a few things but nothing stuck",
        'None of the above — the owner handles most of it', 'None — we outsource everything',
        'None of the above — we work mostly in spreadsheets and email',
      ]
      if (noneOpts.includes(value)) return { ...prev, [qId]: [value] }
      return { ...prev, [qId]: [...cur.filter(v => !noneOpts.includes(v)), value] }
    })
  }

  const advanceQuestion = useCallback(() => {
    if (currentQ < TOTAL_QUESTIONS - 1) setCurrentQ(p => p + 1)
    else setCurrentQ(TOTAL_QUESTIONS)
  }, [currentQ])

  const goBack = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    if (currentQ === TOTAL_QUESTIONS) setCurrentQ(TOTAL_QUESTIONS - 1)
    else if (currentQ > 0) setCurrentQ(p => p - 1)
    else setPhase('businessName')
  }

  const canContinue = () => {
    if (currentQ >= TOTAL_QUESTIONS) return true
    const ans = getAnswer(question.id)
    if (question.type === 'radio') {
      if (!ans) return false
      if (question.otherTrigger && ans === question.otherTrigger) return (otherText[question.id] || '').trim().length > 0
      return true
    }
    return Array.isArray(ans) && ans.length > 0
  }

  const handleSubmit = async () => {
    setPhase('submitting')
    const finalAnswers: Record<string, unknown> = {
      businessName: businessName.trim(),
      ...(abn.trim() && { abn: abn.replace(/\s/g, '') }),
      ...answers,
    }
    for (const [k, v] of Object.entries(otherText)) if (v.trim()) finalAnswers[`${k}_other`] = v.trim()
    if (optionalNote.trim()) finalAnswers['optionalWorkflow'] = optionalNote.trim()

    try {
      // Step 1: Stream Claude response from submit endpoint
      const res = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })

      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Server error')
      }

      if (!res.body) throw new Error('No response stream received')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
      }

      // Check for error signal from stream
      if (fullText.includes('__ERROR__:')) {
        const errMsg = fullText.split('__ERROR__:')[1]?.trim() || 'Report generation failed'
        throw new Error(errMsg)
      }

      // Extract session ID from first line
      let sessionId = ''
      let jsonText = fullText
      if (fullText.startsWith('__SESSION__:')) {
        const firstNewline = fullText.indexOf('\n')
        sessionId = fullText.slice('__SESSION__:'.length, firstNewline).trim()
        jsonText = fullText.slice(firstNewline + 1)
      }

      // Robust JSON extraction: find outermost { ... }
      const firstBrace = jsonText.indexOf('{')
      const lastBrace = jsonText.lastIndexOf('}')
      if (firstBrace === -1 || lastBrace === -1) throw new Error('Invalid report format received')
      const reportJson = JSON.parse(jsonText.slice(firstBrace, lastBrace + 1))

      // Step 2: Save parsed report to Supabase, get accessToken
      const saveRes = await fetch('/api/audit/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, reportJson }),
      })

      if (!saveRes.ok) {
        const d = await saveRes.json().catch(() => ({}))
        throw new Error(d.error || 'Failed to save report')
      }

      const { accessToken } = await saveRes.json()
      router.push(`/audit/report/${accessToken}`)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setPhase('error')
    }
  }

  useEffect(() => () => { if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer) }, [autoAdvanceTimer])

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="flex justify-center mb-8"><CompassLogo size={56} /></div>
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}>Free · No credit card</span>
          </div>
          <h1 className="font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: '#151c27' }}>
            Find out where AI can make the biggest difference in your business.
          </h1>
          <p className="mb-8 mx-auto max-w-xl" style={{ color: '#4a5568', fontSize: '1.125rem', lineHeight: '1.7' }}>
            14 questions. About 3–4 minutes. A specific, named assessment of your business — not a generic checklist.
          </p>
          <div className="flex items-center justify-center gap-2 mb-10 text-sm" style={{ color: '#6b7280' }}>
            <CompassLogo size={18} />
            <span>Built by ProjxAI — founded by a 30+ year Australian digital operator.</span>
          </div>
          <button onClick={() => setPhase('businessName')}
            className="inline-block px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#6B3FE7' }}>
            Start the Audit →
          </button>
          <p className="mt-4 text-sm" style={{ color: '#9ca3af' }}>
            Free. No credit card. Your report is personalised to your business.
          </p>
          {bypassMode && <p className="mt-3 text-xs" style={{ color: '#6B3FE7' }}>✓ Operator access — email gate skipped.</p>}
        </div>
      </div>
    </main>
  )

  // ── BUSINESS NAME ─────────────────────────────────────────────────────────
  if (phase === 'businessName') return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(107,63,231,0.06)' }}>
            <SectionBadge section="Before we start" />
            <p className="font-semibold leading-snug mb-2"
              style={{ color: '#151c27', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
              What&apos;s the name of your business?
            </p>
            <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
              Your report will be personalised to your business — this makes all the difference.
            </p>
            <input ref={bnInputRef} type="text" value={businessName}
              onChange={e => setBusinessName(e.target.value.slice(0, 100))}
              placeholder="e.g. Smith & Jones Accounting"
              className="w-full px-4 py-3 rounded-xl border text-base mb-1 focus:outline-none transition"
              style={{ borderColor: '#e5d7fd', color: '#151c27' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
              onKeyDown={e => { if (e.key === 'Enter' && businessName.trim()) { setPhase('questions'); setCurrentQ(0) } }}
            />
            <p className="text-xs mb-6" style={{ color: '#9ca3af' }}>{businessName.length}/100 · Required</p>

            <p className="text-sm font-medium mb-2" style={{ color: '#374151' }}>
              ABN <span className="font-normal" style={{ color: '#9ca3af' }}>— optional, enriches your report with verified business details</span>
            </p>
            <input type="text" value={abn}
              onChange={e => setAbn(e.target.value.replace(/[^\d\s]/g, '').slice(0, 14))}
              placeholder="e.g. 12 345 678 901"
              className="w-full px-4 py-3 rounded-xl border text-base mb-8 focus:outline-none transition"
              style={{ borderColor: '#e5d7fd', color: '#151c27' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
            />

            <div className="flex items-center justify-between">
              <button onClick={() => setPhase('intro')} className="text-sm font-medium hover:underline" style={{ color: '#6B3FE7' }}>← Back</button>
              <button onClick={() => { setPhase('questions'); setCurrentQ(0) }} disabled={!businessName.trim()}
                className="px-8 py-3 rounded-xl font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#6B3FE7' }}>
                Continue →
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {[1,2,3,4].map(s => <div key={s} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }} />)}
          </div>
        </div>
      </div>
    </main>
  )

  // ── SUBMITTING ────────────────────────────────────────────────────────────
  if (phase === 'submitting') {
    const name = businessName.trim() || 'your business'
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#151c27' }}>
        <div className="text-center">
          <div className="flex justify-center mb-8 animate-spin" style={{ animationDuration: '3s' }}><CompassLogo size={64} /></div>
          <p key={loadingIdx} className="text-white text-xl font-medium mb-2" style={{ minHeight: '2rem' }}>
            {LOADING_MSGS[loadingIdx](name)}
          </p>
          <p style={{ color: '#9ca3af' }}>This usually takes 15–20 seconds.</p>
        </div>
      </main>
    )
  }

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (phase === 'error') return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6"><CompassLogo size={48} /></div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: '#151c27' }}>Something went wrong</h2>
        <p className="mb-6" style={{ color: '#6b7280' }}>We couldn&apos;t generate your report. Please try again in a moment.</p>
        {errorMessage && <p className="text-xs mb-6 font-mono" style={{ color: '#9ca3af' }}>{errorMessage}</p>}
        <button onClick={() => { setPhase('questions'); setCurrentQ(TOTAL_QUESTIONS - 1) }}
          className="px-8 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: '#6B3FE7' }}>
          Try again
        </button>
      </div>
    </main>
  )

  // ── QUESTIONS ─────────────────────────────────────────────────────────────
  const isOptional = currentQ === TOTAL_QUESTIONS

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      <div className="h-20" />
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {!isOptional && <div className="mb-8"><ProgressBar current={currentQ} total={TOTAL_QUESTIONS} /></div>}

          <div className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(107,63,231,0.06)' }}>

            {isOptional ? (
              <>
                <SectionBadge section="One last thing (optional)" />
                <p className="font-medium text-sm mb-1" style={{ color: '#6B3FE7' }}>This is where the report gets really specific to you.</p>
                <p className="text-xl font-semibold leading-snug mb-6" style={{ color: '#151c27' }}>
                  Is there a specific task, workflow, or process that&apos;s been on your mind?
                </p>
                <textarea value={optionalNote} onChange={e => setOptionalNote(e.target.value.slice(0, 300))}
                  placeholder="e.g. We manually enter every customer invoice into our accounting system after each job — about 2 hours a day…"
                  rows={4} className="w-full rounded-xl border px-4 py-3 text-base resize-none focus:outline-none transition"
                  style={{ borderColor: '#e5d7fd', backgroundColor: '#fafafa', color: '#151c27' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#6B3FE7'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e5d7fd'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <p className="text-xs mt-2 mb-6" style={{ color: '#9ca3af' }}>{optionalNote.length}/300 characters</p>
                <div className="flex items-center justify-between">
                  <button onClick={goBack} className="text-sm font-medium hover:underline" style={{ color: '#6B3FE7' }}>← Back</button>
                  <div className="flex gap-3">
                    <button onClick={handleSubmit} className="text-sm font-medium hover:underline" style={{ color: '#9ca3af' }}>Skip this</button>
                    <button onClick={handleSubmit}
                      className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: '#6B3FE7' }}>Generate my report →</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <SectionBadge section={question.section} />
                <p className="font-semibold leading-snug mb-7"
                  style={{ color: '#151c27', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
                  {question.text}
                </p>

                {question.type === 'radio' && (
                  <div className="flex flex-col gap-2">
                    {question.options.map(opt => {
                      const sel = getAnswer(question.id) === opt
                      const isOther = question.otherTrigger === opt
                      return (
                        <div key={opt}>
                          <button onClick={() => setRadioAnswer(question.id, opt)}
                            className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                            style={{ borderColor: sel ? '#6B3FE7' : '#e5e7eb', backgroundColor: sel ? '#f3eefe' : 'white', color: sel ? '#6B3FE7' : '#374151', boxShadow: sel ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none' }}>
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border mr-3 flex-shrink-0"
                              style={{ borderColor: sel ? '#6B3FE7' : '#d1d5db', backgroundColor: sel ? '#6B3FE7' : 'white', verticalAlign: 'middle' }}>
                              {sel && <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'white' }} />}
                            </span>
                            {opt}
                          </button>
                          {isOther && sel && (
                            <div className="mt-2 ml-1">
                              <input type="text" autoFocus value={otherText[question.id] || ''}
                                onChange={e => setOtherText(p => ({ ...p, [question.id]: e.target.value.slice(0, question.otherMaxLength || 150) }))}
                                placeholder={question.otherPlaceholder}
                                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                                style={{ borderColor: '#6B3FE7', boxShadow: '0 0 0 3px rgba(107,63,231,0.1)', color: '#151c27' }}
                                onKeyDown={e => { if (e.key === 'Enter' && (otherText[question.id] || '').trim()) advanceQuestion() }}
                              />
                              <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                                {(otherText[question.id] || '').length}/{question.otherMaxLength || 150} chars
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {question.type === 'checkbox' && (
                  <div className="flex flex-col gap-2">
                    {question.options.map(opt => {
                      const sel = ((getAnswer(question.id) as string[]) || []).includes(opt)
                      return (
                        <button key={opt} onClick={() => toggleCheckbox(question.id, opt)}
                          className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                          style={{ borderColor: sel ? '#6B3FE7' : '#e5e7eb', backgroundColor: sel ? '#f3eefe' : 'white', color: sel ? '#6B3FE7' : '#374151', boxShadow: sel ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none' }}>
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded border mr-3 flex-shrink-0"
                            style={{ borderColor: sel ? '#6B3FE7' : '#d1d5db', backgroundColor: sel ? '#6B3FE7' : 'white', verticalAlign: 'middle' }}>
                            {sel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={goBack} className="text-sm font-medium hover:underline" style={{ color: '#6B3FE7' }}>← Back</button>
                  {(question.type === 'checkbox' || (question.type === 'radio' && question.otherTrigger && getAnswer(question.id) === question.otherTrigger)) && (
                    <button onClick={advanceQuestion} disabled={!canContinue()}
                      className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#6B3FE7' }}>
                      Continue →
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {!isOptional && (
            <div className="flex justify-center gap-2 mt-6">
              {[1,2,3,4].map(s => (
                <div key={s} className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ backgroundColor: s === question.sectionIndex ? '#6B3FE7' : s < question.sectionIndex ? '#c4b5fd' : '#e5e7eb' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
