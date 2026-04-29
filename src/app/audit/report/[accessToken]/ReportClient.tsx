'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types (matching Claude API output schema) ────────────────────────────────

interface Opportunity {
  title: string
  description: string
  effort: 'Low' | 'Medium' | 'High'
  impact: 'Low' | 'Medium' | 'High'
  timeframe: string
  estimatedROI: string
}

interface QuickWin {
  title: string
  description: string
  cost: string
  timeToImplement: string
}

interface RiskFactor {
  factor: string
  description: string
}

interface Report {
  score: number
  scoreLabel: string
  headline: string
  summary: string
  opportunities: Opportunity[]
  quickWins: QuickWin[]
  investmentEstimate: {
    range: string
    context: string
  }
  riskFactors: RiskFactor[]
  readinessLevel: 'early' | 'intermediate' | 'advanced'
  nextStep: {
    label: string
    url: string
    context: string
  }
}

interface ReportClientProps {
  report: Record<string, unknown>
  reportId: string
  accessToken: string
  alreadyGated: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CIRC = 2 * Math.PI * 54 // ~339.29

function scoreColour(score: number): string {
  if (score >= 85) return '#6B3FE7'
  if (score >= 70) return '#22c55e'
  if (score >= 50) return '#eab308'
  if (score >= 30) return '#f97316'
  return '#ef4444'
}

function effortStyle(level: string): { bg: string; text: string } {
  if (level === 'Low') return { bg: '#dcfce7', text: '#15803d' }
  if (level === 'High') return { bg: '#fee2e2', text: '#b91c1c' }
  return { bg: '#fef9c3', text: '#a16207' }
}

function impactStyle(level: string): { bg: string; text: string } {
  if (level === 'High') return { bg: '#e7eeff', text: '#6B3FE7' }
  if (level === 'Medium') return { bg: '#dbeafe', text: '#1d4ed8' }
  return { bg: '#f3f4f6', text: '#6b7280' }
}

function readinessMeta(level: string): { label: string; bg: string; text: string } {
  if (level === 'advanced') return { label: 'High readiness', bg: '#dcfce7', text: '#15803d' }
  if (level === 'intermediate') return { label: 'Building readiness', bg: '#fef9c3', text: '#a16207' }
  return { label: 'Early stage', bg: '#fee2e2', text: '#b91c1c' }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompassLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#6B3FE7" />
      <path d="M8 28 L28 8 L22 22 Z" fill="white" />
      <path d="M28 8 L8 28 L14 14 Z" fill="white" fillOpacity="0.45" />
      <circle cx="18" cy="18" r="2.5" fill="#6B3FE7" />
    </svg>
  )
}

function ScoreDial({ score }: { score: number }) {
  const colour = scoreColour(score)
  const offset = CIRC - (score / 100) * CIRC
  return (
    <svg width="160" height="160" viewBox="0 0 144 144">
      {/* Track */}
      <circle cx="72" cy="72" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
      {/* Progress arc */}
      <circle
        cx="72"
        cy="72"
        r="54"
        fill="none"
        stroke={colour}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={offset}
        transform="rotate(-90 72 72)"
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
      />
      {/* Score number */}
      <text
        x="72"
        y="68"
        textAnchor="middle"
        fontSize="32"
        fontWeight="800"
        fill={colour}
        fontFamily="Space Grotesk, sans-serif"
      >
        {score}
      </text>
      {/* Label */}
      <text
        x="72"
        y="88"
        textAnchor="middle"
        fontSize="11"
        fontWeight="500"
        fill="#9ca3af"
        fontFamily="Inter, sans-serif"
      >
        out of 100
      </text>
    </svg>
  )
}

// ─── Email Gate ───────────────────────────────────────────────────────────────

function EmailGate({
  score,
  scoreLabel,
  accessToken,
  onUnlock,
}: {
  score: number
  scoreLabel: string
  accessToken: string
  onUnlock: () => void
}) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const colour = scoreColour(score)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/audit/gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      onUnlock()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong -- please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#f9f9ff' }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <CompassLogo size={44} />
          </Link>
        </div>

        {/* Score teaser card */}
        <div
          className="rounded-2xl p-6 mb-5 text-center"
          style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 40px rgba(21,28,39,0.08)' }}
        >
          <div className="flex justify-center">
            <ScoreDial score={score} />
          </div>
          <p
            className="mt-2 text-sm font-bold"
            style={{ color: colour, fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {scoreLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#7a7487' }}>
            Your report includes 3 AI opportunities specific to your business, quick wins you can act on this week, an investment estimate, and a personalised next step.
          </p>
        </div>

        {/* Gate form card */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 40px rgba(21,28,39,0.08)' }}
        >
          <h1
            className="font-extrabold text-center mb-2"
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.625rem)',
              color: '#151c27',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Your report is ready
          </h1>
          <p className="text-sm text-center mb-6" style={{ color: '#7a7487' }}>
            Enter your email to unlock it. No spam -- ever.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com.au"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm border mb-3 outline-none focus:ring-2 transition"
              style={{
                borderColor: '#cac3d8',
                color: '#151c27',
                fontFamily: 'Inter, sans-serif',
              }}
            />

            {error && (
              <p className="text-sm text-red-600 mb-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !email}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {submitting ? 'Unlocking...' : 'Unlock my report'}
            </button>
          </form>

          <p
            className="text-xs text-center mt-5 leading-relaxed"
            style={{ color: '#7a7487', fontFamily: 'Manrope, sans-serif' }}
          >
            Handled in accordance with our{' '}
            <Link href="/privacy" className="underline hover:text-[#6B3FE7]">
              Privacy Policy
            </Link>
            . Collicorp Pty Ltd -- ABN 80 398 642 662.
          </p>
        </div>
      </div>
    </main>
  )
}

// ─── Full Report View ─────────────────────────────────────────────────────────

function ReportView({ report }: { report: Report }) {
  const colour = scoreColour(report.score)
  const rm = readinessMeta(report.readinessLevel)

  return (
    <div style={{ backgroundColor: '#f9f9ff' }}>

      {/* ── Sticky nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 border-b"
        style={{
          backgroundColor: 'rgba(249,249,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: '#e5e0f0',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <CompassLogo size={30} />
          <span
            className="font-bold text-sm hidden sm:block"
            style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            ProjxAI
          </span>
        </Link>
        <Link
          href={report.nextStep.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-xl text-white text-sm font-bold transition hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          Book a call
        </Link>
      </nav>

      {/* ── Section 1: Score + Headline ── */}
      <section className="pt-28 pb-20 px-4" style={{ backgroundColor: '#f9f9ff' }}>
        <div className="max-w-5xl mx-auto">

          {/* Eyebrow badge */}
          <div className="flex justify-center mb-8">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}
            >
              AI Opportunity Report
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

            {/* Score dial column */}
            <div className="flex flex-col items-center shrink-0">
              <ScoreDial score={report.score} />
              <p
                className="mt-3 text-sm font-bold text-center"
                style={{ color: colour, fontFamily: 'Space Grotesk, sans-serif', maxWidth: '160px' }}
              >
                {report.scoreLabel}
              </p>
            </div>

            {/* Headline + summary column */}
            <div className="flex-1 text-center md:text-left">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ backgroundColor: rm.bg, color: rm.text, fontFamily: 'Manrope, sans-serif' }}
              >
                {rm.label}
              </span>
              <h1
                className="font-extrabold mb-5"
                style={{
                  fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
                  color: '#151c27',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                {report.headline}
              </h1>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#494455' }}
              >
                {report.summary}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Opportunities ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f0f3ff' }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
              style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}
            >
              Top opportunities
            </span>
            <h2
              className="text-3xl font-bold"
              style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              3 AI opportunities for your business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {report.opportunities.map((opp, i) => {
              const ec = effortStyle(opp.effort)
              const ic = impactStyle(opp.impact)
              return (
                <div
                  key={i}
                  className="rounded-3xl p-8 flex flex-col"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 40px rgba(21,28,39,0.06)' }}
                >
                  {/* Number chip */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 shrink-0"
                    style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {i + 1}
                  </div>

                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {opp.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#494455' }}>
                    {opp.description}
                  </p>

                  {/* Effort + Impact badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: ec.bg, color: ec.text, fontFamily: 'Manrope, sans-serif' }}
                    >
                      {opp.effort} effort
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: ic.bg, color: ic.text, fontFamily: 'Manrope, sans-serif' }}
                    >
                      {opp.impact} impact
                    </span>
                  </div>

                  {/* Timeframe + ROI */}
                  <div className="border-t pt-4 space-y-2.5" style={{ borderColor: '#f0f0f8' }}>
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span className="text-xs" style={{ color: '#7a7487', fontFamily: 'Manrope, sans-serif' }}>
                        {opp.timeframe}
                      </span>
                    </div>
                    <div
                      className="rounded-xl px-3 py-2 text-xs font-semibold"
                      style={{ backgroundColor: '#f3eefe', color: '#6B3FE7', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {opp.estimatedROI}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Quick Wins ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f9f9ff' }}>
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
              style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}
            >
              Start here
            </span>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Quick wins you can act on now
            </h2>
            <p className="text-base" style={{ color: '#7a7487' }}>
              Low effort, real results -- no consultant required.
            </p>
          </div>

          <div className="space-y-4">
            {report.quickWins.map((qw, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 20px rgba(21,28,39,0.05)' }}
              >
                {/* Lightning bolt icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#e7eeff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3
                    className="font-bold mb-1.5"
                    style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {qw.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#494455' }}>
                    {qw.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#dcfce7', color: '#15803d', fontFamily: 'Manrope, sans-serif' }}
                    >
                      {qw.cost}
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}
                    >
                      {qw.timeToImplement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Investment + Risk Factors ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Investment estimate */}
          <div
            className="rounded-3xl p-8"
            style={{ backgroundColor: '#f9f9ff', border: '1px solid #cac3d8' }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}
            >
              Investment estimate
            </span>
            <p
              className="font-extrabold mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#151c27',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {report.investmentEstimate.range}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#494455' }}>
              {report.investmentEstimate.context}
            </p>
          </div>

          {/* Risk factors */}
          <div className="flex flex-col gap-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase self-start"
              style={{ backgroundColor: '#fef3c7', color: '#92400e', fontFamily: 'Manrope, sans-serif' }}
            >
              Risk factors to watch
            </span>
            {report.riskFactors.map((rf, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}
              >
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="shrink-0 mt-0.5"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <p
                      className="font-bold text-sm mb-1"
                      style={{ color: '#92400e', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {rf.factor}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>
                      {rf.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ── */}
      <section className="py-24 px-4" style={{ backgroundColor: '#151c27' }}>
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
            style={{ backgroundColor: 'rgba(107,63,231,0.25)', color: '#c4b5fd', fontFamily: 'Manrope, sans-serif' }}
          >
            Next step
          </span>
          <h2
            className="font-extrabold mb-5"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {report.nextStep.label}
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#9ca3af' }}>
            {report.nextStep.context}
          </p>
          <Link
            href={report.nextStep.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-xl text-white font-bold text-base transition hover:shadow-[0_20px_50px_rgba(82,26,207,0.4)] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Book my free 15-minute call
          </Link>
          <p
            className="mt-4 text-sm"
            style={{ color: '#6b7280', fontFamily: 'Manrope, sans-serif' }}
          >
            Free, no obligation. 15 minutes.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-4 border-t"
        style={{ backgroundColor: '#f9f9ff', borderColor: '#e5e0f0' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <CompassLogo size={28} />
            <span
              className="text-sm font-semibold"
              style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              ProjxAI
            </span>
          </Link>
          <p
            className="text-xs text-center sm:text-right"
            style={{ color: '#7a7487', fontFamily: 'Manrope, sans-serif' }}
          >
            Collicorp Pty Ltd | ABN 80 398 642 662 |{' '}
            <Link href="/privacy" className="underline hover:text-[#6B3FE7]">Privacy</Link>
            {' | '}
            <Link href="/terms" className="underline hover:text-[#6B3FE7]">Terms</Link>
          </p>
        </div>
      </footer>

    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ReportClient({
  report,
  accessToken,
  alreadyGated,
}: ReportClientProps) {
  const [unlocked, setUnlocked] = useState(alreadyGated)
  const typedReport = report as unknown as Report

  if (!unlocked) {
    return (
      <EmailGate
        score={typedReport.score}
        scoreLabel={typedReport.scoreLabel}
        accessToken={accessToken}
        onUnlock={() => setUnlocked(true)}
      />
    )
  }

  return <ReportView report={typedReport} />
}
