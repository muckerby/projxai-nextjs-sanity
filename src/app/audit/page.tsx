'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'questions' | 'submitting' | 'error'

type QuestionType = 'radio' | 'checkbox'

interface Question {
  id: string
  section: string
  sectionIndex: number
  text: string
  type: QuestionType
  options: string[]
  // If option value equals this string, show a free-text input below
  otherTrigger?: string
  otherPlaceholder?: string
  otherMaxLength?: number
}

interface Answers {
  [key: string]: string | string[] | undefined
}

// ─── Question Definitions ─────────────────────────────────────────────────────
// 12 questions across 4 sections. Q3 revenue removed per spec decision D3.

const QUESTIONS: Question[] = [
  // ── SECTION 1: About your business ──────────────────────────────────────
  {
    id: 'businessType',
    section: 'About your business',
    sectionIndex: 1,
    text: 'What best describes your business?',
    type: 'radio',
    options: [
      'Professional services (accounting, legal, consulting, financial planning)',
      'Retail & eCommerce',
      'Hospitality & food & beverage',
      'Trade & construction',
      'Healthcare & allied health',
      'B2B / wholesale / distribution',
      'Not-for-profit or community organisation',
      'Other',
    ],
    otherTrigger: 'Other',
    otherPlaceholder: 'Describe your business type…',
    otherMaxLength: 250,
  },
  {
    id: 'teamSize',
    section: 'About your business',
    sectionIndex: 1,
    text: 'How many people work in your business (including yourself)?',
    type: 'radio',
    options: [
      'Just me (solo operator)',
      '2–5 people',
      '6–20 people',
      '21–50 people',
      '51+ people',
    ],
  },

  // ── SECTION 2: Your operations ───────────────────────────────────────────
  {
    id: 'aiToolUsage',
    section: 'Your operations',
    sectionIndex: 2,
    text: 'Which of these are you currently using AI tools for? Select all that apply.',
    type: 'checkbox',
    options: [
      'Writing emails, reports, or content',
      'Customer service or live chat',
      'Data analysis or reporting',
      'Social media or marketing',
      'Internal admin or scheduling',
      "None — we haven't started yet",
      "We've tried a few things but nothing stuck",
    ],
  },
  {
    id: 'bottleneck',
    section: 'Your operations',
    sectionIndex: 2,
    text: "What's your biggest operational bottleneck right now?",
    type: 'radio',
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
    otherPlaceholder: 'Describe your bottleneck…',
    otherMaxLength: 100,
  },
  {
    id: 'manualHours',
    section: 'Your operations',
    sectionIndex: 2,
    text: 'Roughly how many hours per week does your team spend on repetitive, manual tasks — things that feel like they should be automated?',
    type: 'radio',
    options: [
      'Less than 5 hours',
      '5–15 hours',
      '15–30 hours',
      'More than 30 hours',
      "I honestly don't know",
    ],
  },
  {
    id: 'dedicatedRoles',
    section: 'Your operations',
    sectionIndex: 2,
    text: 'Do you have dedicated people for any of the following? Select all that apply.',
    type: 'checkbox',
    options: [
      'Marketing (dedicated role)',
      'Operations or admin (dedicated role)',
      'IT or technology (dedicated role)',
      'Finance (dedicated role or bookkeeper)',
      'None of the above — the owner handles most of it',
      'None — we outsource everything',
    ],
  },

  // ── SECTION 3: AI readiness ──────────────────────────────────────────────
  {
    id: 'techComfort',
    section: 'AI readiness',
    sectionIndex: 3,
    text: "How would you describe your team's comfort with new technology tools?",
    type: 'radio',
    options: [
      'High — we adopt new tools quickly and without much friction',
      'Medium — it takes a few weeks but people come around',
      'Low — technology change is a real challenge in our business',
      'Variable — some team members are great, others resist',
    ],
  },
  {
    id: 'aiConcern',
    section: 'AI readiness',
    sectionIndex: 3,
    text: 'What concerns you most about AI in your business? Pick your top concern.',
    type: 'radio',
    options: [
      "Cost — unclear what we'd actually get for the money",
      'Data security and privacy',
      'Staff resistance or job anxiety',
      "Not knowing where to start",
      "Our data isn't organised enough to get value from AI",
      'Vendor lock-in or over-dependence on one tool',
      "Nothing — I'm ready to go",
    ],
  },
  {
    id: 'priorAiExperience',
    section: 'AI readiness',
    sectionIndex: 3,
    text: 'Have you had any AI projects, pilots, or tool rollouts in the past two years?',
    type: 'radio',
    options: [
      'Yes, and they went well',
      "Yes, but they didn't really stick or deliver value",
      "No — we haven't started",
      "We're currently evaluating options",
      "Not sure what counts as an AI project",
    ],
  },

  // ── SECTION 4: Your priorities ───────────────────────────────────────────
  {
    id: 'ninetyDayPriority',
    section: 'Your priorities',
    sectionIndex: 4,
    text: 'If AI could do one thing for your business in the next 90 days, what would matter most?',
    type: 'radio',
    options: [
      'Save time on admin and manual tasks',
      'Improve speed and quality of customer responses',
      'Get better visibility into what\'s actually happening in the business',
      'Reduce errors in our operations',
      'Scale our marketing without scaling headcount',
      'Reduce wage costs through automation',
    ],
  },
  {
    id: 'budgetRange',
    section: 'Your priorities',
    sectionIndex: 4,
    text: 'What budget are you considering for AI in the next 12 months?',
    type: 'radio',
    options: [
      "We're not budgeting for it yet",
      'Under $5,000',
      '$5,000–$20,000',
      '$20,000–$50,000',
      'Over $50,000',
      'I need to understand the ROI before I can answer this',
    ],
  },
  {
    id: 'decisionMaker',
    section: 'Your priorities',
    sectionIndex: 4,
    text: 'Who makes the final call on technology and operational investment in your business?',
    type: 'radio',
    options: [
      'Me — I make the call',
      'Me and a business partner or co-owner',
      'Me and a board or investors',
      'I influence it but it goes to a finance or IT team',
      "It's complicated",
    ],
  },
]

const TOTAL_QUESTIONS = QUESTIONS.length // 12

// ─── Compass Logo SVG (matches Header/index.tsx) ─────────────────────────────

function CompassLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#6B3FE7" />
      <polygon points="18,4 21,18 18,16 15,18" fill="white" />
      <polygon points="32,18 18,21 20,18 18,15" fill="white" opacity="0.7" />
      <polygon points="18,32 15,18 18,20 21,18" fill="white" opacity="0.85" />
      <polygon points="4,18 18,15 16,18 18,21" fill="white" opacity="0.6" />
      <circle cx="18" cy="18" r="2.5" fill="#6B3FE7" />
    </svg>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium" style={{ color: '#6B3FE7' }}>
          {pct}%
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: '#6B3FE7' }}
        />
      </div>
    </div>
  )
}

// ─── Section Badge ────────────────────────────────────────────────────────────

function SectionBadge({ section }: { section: string }) {
  return (
    <span
      className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
      style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}
    >
      {section}
    </span>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AuditPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [otherText, setOtherText] = useState<Record<string, string>>({}) // free-text for "Other" / "Something else"
  const [optionalNote, setOptionalNote] = useState('') // final optional textarea
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Check for bypass param
  const [bypassMode, setBypassMode] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('bypass')) {
        setBypassMode(true)
        // Store bypass token for use at gate — passed in submit payload
      }
    }
  }, [])

  const question = QUESTIONS[currentQ]

  // ── Answer helpers ──────────────────────────────────────────────────────

  const getAnswer = (qId: string) => answers[qId]

  const setRadioAnswer = useCallback(
    (qId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [qId]: value }))

      // Auto-advance after a short delay so user sees the selection
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
      const timer = setTimeout(() => {
        // If this question has a free-text trigger and that option was selected, don't auto-advance
        const q = QUESTIONS.find((q) => q.id === qId)
        if (q?.otherTrigger && value === q.otherTrigger) {
          return // Wait for user to type and click Continue
        }
        advanceQuestion()
      }, 380)
      setAutoAdvanceTimer(timer)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQ, autoAdvanceTimer]
  )

  const toggleCheckboxAnswer = (qId: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[qId] as string[]) || []
      if (current.includes(value)) {
        return { ...prev, [qId]: current.filter((v) => v !== value) }
      }
      // Mutual exclusivity: "None" options deselect everything else and vice versa
      const noneOptions = ["None — we haven't started yet", "We've tried a few things but nothing stuck", 'None of the above — the owner handles most of it', 'None — we outsource everything']
      if (noneOptions.includes(value)) {
        return { ...prev, [qId]: [value] }
      }
      const withoutNone = current.filter((v) => !noneOptions.includes(v))
      return { ...prev, [qId]: [...withoutNone, value] }
    })
  }

  // ── Navigation ──────────────────────────────────────────────────────────

  const advanceQuestion = useCallback(() => {
    if (currentQ < TOTAL_QUESTIONS - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      // Last question answered — show optional note screen before submit
      setPhase('questions') // Will be caught below — we show optional step
      setCurrentQ(TOTAL_QUESTIONS) // sentinel: optional step
    }
  }, [currentQ])

  const goBack = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    if (currentQ === TOTAL_QUESTIONS) {
      // On optional step — go back to last question
      setCurrentQ(TOTAL_QUESTIONS - 1)
    } else if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1)
    } else {
      setPhase('intro')
    }
  }

  const canContinue = () => {
    if (currentQ >= TOTAL_QUESTIONS) return true // optional step always continuable
    const ans = getAnswer(question.id)
    if (question.type === 'radio') {
      if (!ans) return false
      // If "Other" or "Something else" is selected, require some text
      if (question.otherTrigger && ans === question.otherTrigger) {
        return (otherText[question.id] || '').trim().length > 0
      }
      return true
    }
    if (question.type === 'checkbox') {
      return Array.isArray(ans) && ans.length > 0
    }
    return false
  }

  // ── Submit ──────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setPhase('submitting')

    // Merge other-text into answers
    const finalAnswers: Record<string, unknown> = { ...answers }
    for (const [qId, text] of Object.entries(otherText)) {
      if (text.trim()) {
        finalAnswers[`${qId}_other`] = text.trim()
      }
    }
    if (optionalNote.trim()) {
      finalAnswers['optionalWorkflow'] = optionalNote.trim()
    }

    // Include bypass param if present
    const bypassParam = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('bypass') || ''
      : ''

    try {
      const res = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers, bypass: bypassParam }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Server error')
      }

      const data = await res.json()

      // Redirect to the report page -- email gate + full report UI live there
      router.push(`/audit/report/${data.accessToken}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(msg)
      setPhase('error')
    }
  }

  // ── Cleanup timer on unmount ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    }
  }, [autoAdvanceTimer])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  // ── Intro Screen ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
        {/* Nav spacer */}
        <div className="h-20" />

        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            {/* Compass logo */}
            <div className="flex justify-center mb-8">
              <CompassLogo size={56} />
            </div>

            {/* Badge */}
            <div className="mb-4">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ backgroundColor: '#f3eefe', color: '#6B3FE7' }}
              >
                Free · No credit card
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-bold leading-tight mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                color: '#151c27',
              }}
            >
              Find out where AI can make the biggest difference in your business.
            </h1>

            {/* Sub */}
            <p
              className="mb-8 mx-auto max-w-xl"
              style={{ color: '#4a5568', fontSize: '1.125rem', lineHeight: '1.7' }}
            >
              13 questions. About 3 minutes. An honest operator&apos;s assessment of your specific
              situation — not a generic checklist.
            </p>

            {/* Credentials strip */}
            <div
              className="flex items-center justify-center gap-2 mb-10 text-sm"
              style={{ color: '#6b7280' }}
            >
              <CompassLogo size={18} />
              <span>Built by ProjxAI — founded by a 30+ year Australian digital operator.</span>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                setPhase('questions')
                setCurrentQ(0)
              }}
              className="inline-block px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#6B3FE7' }}
            >
              Start the Audit →
            </button>

            <p className="mt-4 text-sm" style={{ color: '#9ca3af' }}>
              Free. No credit card. We&apos;ll only contact you once your report is ready.
            </p>

            {bypassMode && (
              <p className="mt-3 text-xs" style={{ color: '#6B3FE7' }}>
                ✓ Operator access — email gate skipped.
              </p>
            )}
          </div>
        </div>
      </main>
    )
  }

  // ── Submitting / Loading Screen ───────────────────────────────────────────
  if (phase === 'submitting') {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: '#151c27' }}
      >
        <div className="text-center">
          {/* Animated compass */}
          <div className="flex justify-center mb-8 animate-spin" style={{ animationDuration: '3s' }}>
            <CompassLogo size={64} />
          </div>
          <p className="text-white text-xl font-medium mb-2">Analysing your business profile…</p>
          <p style={{ color: '#9ca3af' }}>This takes about 5–8 seconds.</p>
        </div>
      </main>
    )
  }

  // ── Error Screen ──────────────────────────────────────────────────────────
  if (phase === 'error') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CompassLogo size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#151c27' }}>
            Something went wrong
          </h2>
          <p className="mb-6" style={{ color: '#6b7280' }}>
            We couldn&apos;t generate your report right now. Please try again in a moment.
          </p>
          {errorMessage && (
            <p className="text-xs mb-6 font-mono" style={{ color: '#9ca3af' }}>
              {errorMessage}
            </p>
          )}
          <button
            onClick={() => {
              setPhase('questions')
              setCurrentQ(TOTAL_QUESTIONS - 1)
            }}
            className="px-8 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: '#6B3FE7' }}
          >
            Try again
          </button>
        </div>
      </main>
    )
  }


  // ── Questions Screen ──────────────────────────────────────────────────────

  // Optional step (sentinel: currentQ === TOTAL_QUESTIONS)
  const isOptionalStep = currentQ === TOTAL_QUESTIONS

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafafa' }}>
      {/* Nav spacer */}
      <div className="h-20" />

      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Progress bar (shown for all questions, not optional step) */}
          {!isOptionalStep && (
            <div className="mb-8">
              <ProgressBar current={currentQ} total={TOTAL_QUESTIONS} />
            </div>
          )}

          {/* Question card */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(107,63,231,0.06)',
            }}
          >
            {isOptionalStep ? (
              // ── Optional free-text step ──────────────────────────────────
              <>
                <SectionBadge section="One last thing (optional)" />
                <p
                  className="text-xl font-semibold leading-snug mb-6"
                  style={{ color: '#151c27' }}
                >
                  Is there a specific workflow or process you&apos;ve been hoping to automate?
                  Describe it in a sentence or two if you&apos;d like.
                </p>
                <textarea
                  value={optionalNote}
                  onChange={(e) => setOptionalNote(e.target.value.slice(0, 200))}
                  placeholder="e.g. We manually enter every customer invoice into our accounting system after each job…"
                  rows={4}
                  className="w-full rounded-xl border px-4 py-3 text-base resize-none focus:outline-none transition"
                  style={{
                    borderColor: '#e5d7fd',
                    backgroundColor: '#fafafa',
                    color: '#151c27',
                    fontSize: '1rem',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6B3FE7'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,63,231,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5d7fd'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <p className="text-xs mt-2 mb-6" style={{ color: '#9ca3af' }}>
                  {optionalNote.length}/200 characters
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={goBack}
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#6B3FE7' }}
                  >
                    ← Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      className="text-sm font-medium hover:underline"
                      style={{ color: '#9ca3af' }}
                    >
                      Skip this
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: '#6B3FE7' }}
                    >
                      Generate my report →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // ── Regular question ────────────────────────────────────────
              <>
                <SectionBadge section={question.section} />

                <p
                  className="text-xl font-semibold leading-snug mb-7"
                  style={{ color: '#151c27', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}
                >
                  {question.text}
                </p>

                {/* Radio options */}
                {question.type === 'radio' && (
                  <div className="flex flex-col gap-2">
                    {question.options.map((opt) => {
                      const selected = getAnswer(question.id) === opt
                      const isOtherTrigger = question.otherTrigger === opt
                      return (
                        <div key={opt}>
                          <button
                            onClick={() => setRadioAnswer(question.id, opt)}
                            className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                            style={{
                              borderColor: selected ? '#6B3FE7' : '#e5e7eb',
                              backgroundColor: selected ? '#f3eefe' : 'white',
                              color: selected ? '#6B3FE7' : '#374151',
                              boxShadow: selected ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none',
                            }}
                          >
                            <span
                              className="inline-flex items-center justify-center w-4 h-4 rounded-full border mr-3 flex-shrink-0"
                              style={{
                                borderColor: selected ? '#6B3FE7' : '#d1d5db',
                                backgroundColor: selected ? '#6B3FE7' : 'white',
                                verticalAlign: 'middle',
                              }}
                            >
                              {selected && (
                                <span
                                  className="block w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: 'white' }}
                                />
                              )}
                            </span>
                            {opt}
                          </button>

                          {/* Free-text input for "Other" / "Something else" */}
                          {isOtherTrigger && selected && (
                            <div className="mt-2 ml-1">
                              <input
                                type="text"
                                autoFocus
                                value={otherText[question.id] || ''}
                                onChange={(e) =>
                                  setOtherText((prev) => ({
                                    ...prev,
                                    [question.id]: e.target.value.slice(
                                      0,
                                      question.otherMaxLength || 250
                                    ),
                                  }))
                                }
                                placeholder={question.otherPlaceholder}
                                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                                style={{
                                  borderColor: '#6B3FE7',
                                  boxShadow: '0 0 0 3px rgba(107,63,231,0.1)',
                                  color: '#151c27',
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && (otherText[question.id] || '').trim()) {
                                    advanceQuestion()
                                  }
                                }}
                              />
                              <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                                {(otherText[question.id] || '').length}/
                                {question.otherMaxLength || 250} characters
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Checkbox options */}
                {question.type === 'checkbox' && (
                  <div className="flex flex-col gap-2">
                    {question.options.map((opt) => {
                      const selected = ((getAnswer(question.id) as string[]) || []).includes(opt)
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleCheckboxAnswer(question.id, opt)}
                          className="w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150"
                          style={{
                            borderColor: selected ? '#6B3FE7' : '#e5e7eb',
                            backgroundColor: selected ? '#f3eefe' : 'white',
                            color: selected ? '#6B3FE7' : '#374151',
                            boxShadow: selected ? '0 0 0 2px rgba(107,63,231,0.15)' : 'none',
                          }}
                        >
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded border mr-3 flex-shrink-0"
                            style={{
                              borderColor: selected ? '#6B3FE7' : '#d1d5db',
                              backgroundColor: selected ? '#6B3FE7' : 'white',
                              verticalAlign: 'middle',
                            }}
                          >
                            {selected && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Nav row */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={goBack}
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#6B3FE7' }}
                  >
                    ← Back
                  </button>

                  {/* Checkbox questions need an explicit Continue */}
                  {question.type === 'checkbox' && (
                    <button
                      onClick={advanceQuestion}
                      disabled={!canContinue()}
                      className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#6B3FE7' }}
                    >
                      Continue →
                    </button>
                  )}

                  {/* Radio with free-text also needs Continue when other text is entered */}
                  {question.type === 'radio' &&
                    question.otherTrigger &&
                    getAnswer(question.id) === question.otherTrigger && (
                      <button
                        onClick={advanceQuestion}
                        disabled={!canContinue()}
                        className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#6B3FE7' }}
                      >
                        Continue →
                      </button>
                    )}
                </div>
              </>
            )}
          </div>

          {/* Section indicator dots */}
          {!isOptionalStep && (
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      s === question.sectionIndex
                        ? '#6B3FE7'
                        : s < question.sectionIndex
                        ? '#c4b5fd'
                        : '#e5e7eb',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
