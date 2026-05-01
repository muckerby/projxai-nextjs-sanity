'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// ─── Types — v2 schema ────────────────────────────────────────────────────────

interface ReadinessDimensions {
  aiExperience: number
  dataReadiness: number
  techComfort: number
  changeCapacity: number
}

interface Opportunity {
  title: string
  description: string
  effort: 'Low' | 'Medium' | 'High'
  impact: 'Low' | 'Medium' | 'High'
  timeframe: string
  estimatedROI: string
  investmentEstimate: string
}

interface QuickWin {
  title: string
  description: string
  cost: string
  timeToImplement: string
  softwareConnection?: string | null
}

interface RiskFactor {
  factor: string
  description: string
  mitigation: string
}

interface Report {
  businessName: string
  score: number
  scoreLabel: string
  readinessLevel: 'early' | 'intermediate' | 'advanced'
  headline: string
  summary: string
  readinessDimensions: ReadinessDimensions
  opportunities: Opportunity[]
  quickWins: QuickWin[]
  investmentEstimate: { range: string; firstPriority: string; context: string }
  riskFactors: RiskFactor[]
  ninetyDayPlan: { month1: string; month2: string; month3: string }
  nextStep: { label: string; url: string; context: string }
}

interface Props {
  report: Record<string, unknown>
  reportId: string
  accessToken: string
  alreadyGated: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CIRC = 2 * Math.PI * 54

function scoreColour(s: number) {
  if (s >= 85) return '#6B3FE7'
  if (s >= 70) return '#22c55e'
  if (s >= 50) return '#eab308'
  if (s >= 30) return '#f97316'
  return '#ef4444'
}

function effortStyle(l: string) {
  if (l === 'Low') return { bg: '#dcfce7', text: '#15803d' }
  if (l === 'High') return { bg: '#fee2e2', text: '#b91c1c' }
  return { bg: '#fef9c3', text: '#a16207' }
}

function impactStyle(l: string) {
  if (l === 'High') return { bg: '#e7eeff', text: '#6B3FE7' }
  if (l === 'Medium') return { bg: '#dbeafe', text: '#1d4ed8' }
  return { bg: '#f3f4f6', text: '#6b7280' }
}

function readinessMeta(l: string) {
  if (l === 'advanced') return { label: 'High readiness', bg: '#dcfce7', text: '#15803d' }
  if (l === 'intermediate') return { label: 'Building readiness', bg: '#fef9c3', text: '#a16207' }
  return { label: 'Early stage', bg: '#fee2e2', text: '#b91c1c' }
}

// ─── Compass Logo ─────────────────────────────────────────────────────────────

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

// ─── Score Dial ───────────────────────────────────────────────────────────────

function ScoreDial({ score }: { score: number }) {
  const colour = scoreColour(score)
  const offset = CIRC - (score / 100) * CIRC
  return (
    <svg width="160" height="160" viewBox="0 0 144 144">
      <circle cx="72" cy="72" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
      <circle cx="72" cy="72" r="54" fill="none" stroke={colour} strokeWidth="12"
        strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={offset}
        transform="rotate(-90 72 72)" style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} />
      <text x="72" y="68" textAnchor="middle" fontSize="32" fontWeight="800" fill={colour}
        fontFamily="Space Grotesk, sans-serif">{score}</text>
      <text x="72" y="88" textAnchor="middle" fontSize="11" fontWeight="500" fill="#9ca3af"
        fontFamily="Inter, sans-serif">out of 100</text>
    </svg>
  )
}

// ─── Readiness Dimension Bar ──────────────────────────────────────────────────

function DimensionBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(Math.max((value / 5) * 100, 0), 100)
  const colour = pct >= 70 ? '#22c55e' : pct >= 40 ? '#eab308' : '#f97316'
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#374151' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: colour }}>{value}/5</span>
      </div>
      <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e5e7eb' }}>
        <div className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: colour }} />
      </div>
    </div>
  )
}

// ─── Opportunity Card ─────────────────────────────────────────────────────────

function OpportunityCard({ opp, index }: { opp: Opportunity; index: number }) {
  const ec = effortStyle(opp.effort)
  const ic = impactStyle(opp.impact)
  return (
    <div className="rounded-3xl p-8 flex flex-col"
      style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 40px rgba(21,28,39,0.06)' }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 shrink-0"
        style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Space Grotesk, sans-serif' }}>
        {index + 1}
      </div>
      <h3 className="text-lg font-bold mb-3"
        style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
        {opp.title}
      </h3>
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#494455' }}>{opp.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: ec.bg, color: ec.text, fontFamily: 'Manrope, sans-serif' }}>
          {opp.effort} effort
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: ic.bg, color: ic.text, fontFamily: 'Manrope, sans-serif' }}>
          {opp.impact} impact
        </span>
      </div>
      <div className="border-t pt-4 space-y-2.5" style={{ borderColor: '#f0f0f8' }}>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          <span className="text-xs" style={{ color: '#7a7487', fontFamily: 'Manrope, sans-serif' }}>{opp.timeframe}</span>
        </div>
        <div className="rounded-xl px-3 py-2 text-xs font-semibold"
          style={{ backgroundColor: '#f3eefe', color: '#6B3FE7', fontFamily: 'Space Grotesk, sans-serif' }}>
          {opp.estimatedROI}
        </div>
        {opp.investmentEstimate && (
          <div className="rounded-xl px-3 py-2 text-xs font-semibold"
            style={{ backgroundColor: '#f0fdf4', color: '#15803d', fontFamily: 'Space Grotesk, sans-serif' }}>
            Investment: {opp.investmentEstimate}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Inline Gate Form ─────────────────────────────────────────────────────────

function GateForm({
  businessName, accessToken, onUnlock,
}: {
  businessName: string; accessToken: string; onUnlock: (email: string) => void
}) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
      onUnlock(email)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="rounded-3xl p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)', boxShadow: '0 20px 60px rgba(107,63,231,0.3)' }}>

          {/* Lock icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-bold text-center text-white mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
            Your full report is ready — {businessName}
          </h2>
          <p className="text-sm text-center mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Enter your email to unlock it. We&apos;ll also send you a permanent link so you can
            come back any time or share it with your business partner.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@yourbusiness.com.au" required autoFocus
              className="w-full px-4 py-3.5 rounded-xl text-sm mb-3 outline-none focus:ring-2 transition"
              style={{ borderColor: '#cac3d8', color: '#151c27', fontFamily: 'Inter, sans-serif', border: 'none' }}
            />
            {error && <p className="text-sm mb-3" style={{ color: '#fca5a5' }}>{error}</p>}
            <button type="submit" disabled={submitting || !email}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontFamily: 'Space Grotesk, sans-serif', border: '2px solid rgba(255,255,255,0.4)' }}>
              {submitting ? 'Unlocking…' : 'Unlock my report →'}
            </button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Manrope, sans-serif' }}>
            No spam. We&apos;ll only contact you if you ask us to.{' '}
            <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>{' '}
            · Collicorp Pty Ltd · ABN 80 398 642 662
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ email, visible }: { email: string; visible: boolean }) {
  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-500"
      style={{
        backgroundColor: '#151c27',
        boxShadow: '0 8px 32px rgba(21,28,39,0.25)',
        transform: visible ? 'translateY(0)' : 'translateY(-80px)',
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#22c55e' }}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-sm text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        Report sent to <strong>{email}</strong> — check your inbox.
      </p>
    </div>
  )
}

// ─── Full Report View ─────────────────────────────────────────────────────────

function ReportView({ report, accessToken, alreadyGated }: { report: Report; accessToken: string; alreadyGated: boolean }) {
  const [unlocked, setUnlocked] = useState(alreadyGated)
  const [toastEmail, setToastEmail] = useState('')
  const [showToast, setShowToast] = useState(false)
  const sectionERef = useRef<HTMLDivElement>(null)

  const colour = scoreColour(report.score)
  const rm = readinessMeta(report.readinessLevel)
  const businessName = report.businessName || 'your business'

  const handleUnlock = (email: string) => {
    setToastEmail(email)
    setShowToast(true)
    setUnlocked(true)
    setTimeout(() => sectionERef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    setTimeout(() => setShowToast(false), 5000)
  }

  const blurStyle: React.CSSProperties = {
    filter: unlocked ? 'none' : 'blur(6px)',
    transition: 'filter 0.6s ease-in-out',
    pointerEvents: unlocked ? 'auto' : 'none',
    userSelect: unlocked ? 'auto' : 'none',
  }

  return (
    <div style={{ backgroundColor: '#f9f9ff' }}>
      <Toast email={toastEmail} visible={showToast} />

      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-16 border-b"
        style={{ backgroundColor: 'rgba(249,249,255,0.95)', backdropFilter: 'blur(12px)', borderColor: '#e5e0f0' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <CompassLogo size={30} />
          <span className="font-bold text-sm hidden sm:block" style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}>ProjxAI</span>
        </Link>
        <Link href={report.nextStep.url} target="_blank" rel="noopener noreferrer"
          className="px-5 py-2 rounded-xl text-white text-sm font-bold transition hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)', fontFamily: 'Space Grotesk, sans-serif' }}>
          Book a call
        </Link>
      </nav>

      {/* SECTION A — Business identity strip */}
      <div className="pt-16" style={{ backgroundColor: '#e7eeff' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 text-xs font-medium" style={{ color: '#4B3A8C' }}>
          <span style={{ fontFamily: 'Manrope, sans-serif' }}>
            <strong>{businessName}</strong>
          </span>
          <span style={{ color: '#9ca3af' }}>·</span>
          <span style={{ fontFamily: 'Manrope, sans-serif' }}>AI Opportunity Report</span>
          <span style={{ color: '#9ca3af' }}>·</span>
          <span style={{ fontFamily: 'Manrope, sans-serif' }}>Generated {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* SECTION B — Score + Headline */}
      <section className="pt-12 pb-16 px-4" style={{ backgroundColor: '#f9f9ff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}>
              AI Opportunity Report
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            <div className="flex flex-col items-center shrink-0">
              <ScoreDial score={report.score} />
              <p className="mt-3 text-sm font-bold text-center"
                style={{ color: colour, fontFamily: 'Space Grotesk, sans-serif', maxWidth: '160px' }}>
                {report.scoreLabel}
              </p>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ backgroundColor: rm.bg, color: rm.text, fontFamily: 'Manrope, sans-serif' }}>
                {rm.label}
              </span>
              <h1 className="font-extrabold mb-5"
                style={{ fontSize: 'clamp(1.625rem, 4vw, 2.5rem)', color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {report.headline}
              </h1>
              <p className="text-base leading-relaxed" style={{ color: '#494455' }}>{report.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C+D — Summary already in B above. Section D = First opportunity (always visible) */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f0f3ff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3"
              style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}>
              Top opportunity
            </span>
            <h2 className="text-2xl font-bold"
              style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
              Your #1 AI opportunity
            </h2>
          </div>
          {report.opportunities[0] && (
            <div className="max-w-2xl">
              <OpportunityCard opp={report.opportunities[0]} index={0} />
            </div>
          )}
        </div>
      </section>

      {/* GATE */}
      {!unlocked && (
        <GateForm businessName={businessName} accessToken={accessToken} onUnlock={handleUnlock} />
      )}

      {/* SECTIONS E–J — blurred until unlocked */}
      <div style={blurStyle}>

        {/* SECTION E — Readiness dimensions */}
        <section ref={sectionERef} className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3"
                style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}>
                Readiness dashboard
              </span>
              <h2 className="text-2xl font-bold mb-2"
                style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                What these dimensions mean for {businessName}
              </h2>
              <p className="text-sm" style={{ color: '#7a7487' }}>
                Four dimensions that shape how fast AI will stick in your business — and where to focus first.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#f9f9ff', border: '1px solid #e5e0f0' }}>
                <DimensionBar label="AI Experience" value={report.readinessDimensions.aiExperience} />
                <DimensionBar label="Data Readiness" value={report.readinessDimensions.dataReadiness} />
                <DimensionBar label="Tech Comfort" value={report.readinessDimensions.techComfort} />
                <DimensionBar label="Change Capacity" value={report.readinessDimensions.changeCapacity} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#494455' }}>
                  These four dimensions determine whether AI projects stick or stall. A high score in AI Experience with a low Change Capacity score is the most common pattern in businesses that have tried AI and found it didn&apos;t deliver — the tool was right but the change management was missing.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#494455' }}>
                  For {businessName}, the dimensions above reflect the specific answers you provided. The lowest-scoring dimension is typically the first thing to address before investing in a build.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F — Opportunities 2 + 3 */}
        {report.opportunities.length > 1 && (
          <section className="py-20 px-4" style={{ backgroundColor: '#f0f3ff' }}>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                  style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}>
                  Further opportunities
                </span>
                <h2 className="text-3xl font-bold"
                  style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                  Two more opportunities for {businessName}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report.opportunities.slice(1).map((opp, i) => (
                  <OpportunityCard key={i} opp={opp} index={i + 1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION G — Quick wins */}
        <section className="py-20 px-4" style={{ backgroundColor: '#f9f9ff' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}>
                Start here
              </span>
              <h2 className="text-3xl font-bold mb-3"
                style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                Quick wins you can act on now
              </h2>
              <p className="text-base" style={{ color: '#7a7487' }}>Low effort, real results — no consultant required.</p>
            </div>
            <div className="space-y-4">
              {report.quickWins.map((qw, i) => (
                <div key={i} className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-5"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 20px rgba(21,28,39,0.05)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#e7eeff' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1.5" style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}>{qw.title}</h3>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#494455' }}>{qw.description}</p>
                    {qw.softwareConnection && (
                      <p className="text-xs mb-3 font-medium" style={{ color: '#6B3FE7' }}>↗ {qw.softwareConnection}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: '#dcfce7', color: '#15803d', fontFamily: 'Manrope, sans-serif' }}>{qw.cost}</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: '#dce2f3', color: '#5e6573', fontFamily: 'Manrope, sans-serif' }}>{qw.timeToImplement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION H — Investment + Risk factors */}
        <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Investment */}
            <div className="rounded-3xl p-8" style={{ backgroundColor: '#f9f9ff', border: '1px solid #cac3d8' }}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}>
                Investment estimate
              </span>
              <p className="font-extrabold mb-2"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {report.investmentEstimate.range}
              </p>
              <p className="text-sm leading-relaxed mb-4 font-semibold" style={{ color: '#6B3FE7' }}>
                {report.investmentEstimate.firstPriority}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#494455' }}>
                {report.investmentEstimate.context}
              </p>
            </div>

            {/* Risk factors */}
            <div className="flex flex-col gap-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase self-start"
                style={{ backgroundColor: '#fef3c7', color: '#92400e', fontFamily: 'Manrope, sans-serif' }}>
                Risk factors to watch
              </span>
              {report.riskFactors.map((rf, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
                  <div className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ color: '#92400e', fontFamily: 'Space Grotesk, sans-serif' }}>{rf.factor}</p>
                      <p className="text-sm leading-relaxed mb-2" style={{ color: '#78350f' }}>{rf.description}</p>
                      {rf.mitigation && (
                        <p className="text-xs font-semibold" style={{ color: '#92400e' }}>
                          → {rf.mitigation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION I — 90-Day Plan */}
        <section className="py-20 px-4" style={{ backgroundColor: '#f9f9ff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                style={{ backgroundColor: '#e7eeff', color: '#6B3FE7', fontFamily: 'Manrope, sans-serif' }}>
                90-day plan
              </span>
              <h2 className="text-3xl font-bold mb-2"
                style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
                Here&apos;s what this looks like on your calendar
              </h2>
              <p className="text-base" style={{ color: '#7a7487' }}>
                Calibrated to {businessName}&apos;s readiness level — not a generic roadmap.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['month1', 'month2', 'month3'] as const).map((month, i) => (
                <div key={month} className="rounded-3xl p-7"
                  style={{ backgroundColor: i === 0 ? '#6B3FE7' : '#ffffff', boxShadow: '0 4px 40px rgba(21,28,39,0.06)', border: i === 0 ? 'none' : '1px solid #e5e0f0' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-5"
                    style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.2)' : '#e7eeff', color: i === 0 ? 'white' : '#6B3FE7', fontFamily: 'Space Grotesk, sans-serif' }}>
                    M{i + 1}
                  </div>
                  <h3 className="font-bold mb-4" style={{ color: i === 0 ? 'white' : '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Month {i + 1}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: i === 0 ? 'rgba(255,255,255,0.85)' : '#494455' }}>
                    {report.ninetyDayPlan[month]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION J — CTA */}
        <section className="py-24 px-4" style={{ backgroundColor: '#151c27' }}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: 'rgba(107,63,231,0.25)', color: '#c4b5fd', fontFamily: 'Manrope, sans-serif' }}>
              Next step
            </span>
            <h2 className="font-extrabold mb-5"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
              {report.nextStep.label}
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#9ca3af' }}>{report.nextStep.context}</p>
            <Link href={report.nextStep.url} target="_blank" rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-xl text-white font-bold text-base transition hover:shadow-[0_20px_50px_rgba(82,26,207,0.4)] active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6B3FE7 0%, #4e2cb3 100%)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Book my free 15-minute call
            </Link>
            <p className="mt-4 text-sm" style={{ color: '#6b7280', fontFamily: 'Manrope, sans-serif' }}>Free, no obligation. 15 minutes.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t" style={{ backgroundColor: '#f9f9ff', borderColor: '#e5e0f0' }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <CompassLogo size={28} />
              <span className="text-sm font-semibold" style={{ color: '#151c27', fontFamily: 'Space Grotesk, sans-serif' }}>ProjxAI</span>
            </Link>
            <p className="text-xs text-center sm:text-right" style={{ color: '#7a7487', fontFamily: 'Manrope, sans-serif' }}>
              Collicorp Pty Ltd | ABN 80 398 642 662 |{' '}
              <Link href="/privacy" className="underline hover:text-[#6B3FE7]">Privacy</Link>{' | '}
              <Link href="/terms" className="underline hover:text-[#6B3FE7]">Terms</Link>
            </p>
          </div>
        </footer>

      </div>{/* end blur wrapper */}
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ReportClient({ report, reportId, accessToken, alreadyGated }: Props) {
  const typedReport = report as unknown as Report
  return <ReportView report={typedReport} accessToken={accessToken} alreadyGated={alreadyGated} reportId={reportId} />
}
