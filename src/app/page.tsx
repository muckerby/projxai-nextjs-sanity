import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProjxAI — AI for Australian SMEs | Operator-led, not consultant-led",
  description:
    "Thirty years in Australian digital operations. ProjxAI brings an operator's lens to AI for SMEs — practical systems built by someone who's actually run a business, not just consulted on one.",
  openGraph: {
    title: "ProjxAI — AI for Australian SMEs | Operator-led, not consultant-led",
    description:
      "Thirty years in Australian digital operations. Practical AI systems built by someone who's actually run a business — not just consulted on one.",
    url: "https://www.projxai.com.au",
  },
};

export default function Home() {
  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ backgroundColor: "#f9f9ff" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(107,63,231,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
              >
                An operator&apos;s approach to AI
              </span>

              <h1
                className="font-extrabold leading-[1.05] mb-6"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  letterSpacing: "-0.03em",
                  color: "#151c27",
                }}
              >
                Three decades building{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>Australian digital businesses.</span>{" "}
                Now applying that operator&apos;s lens to AI for SMEs that don&apos;t have a CTO.
              </h1>

              <p className="text-xl max-w-xl mb-8 leading-relaxed" style={{ color: "#494455" }}>
                Practical AI systems engineered by someone who&apos;s actually run a business —
                not just consulted on one.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#consulting"
                  className="btn-primary-gradient inline-block px-9 py-4 rounded-xl text-white font-bold text-lg text-center transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] active:scale-95"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Book a Free Clarity Call
                </Link>
                <Link
                  href="/tools"
                  className="inline-block px-9 py-4 rounded-xl font-bold text-lg text-center transition-colors"
                  style={{ backgroundColor: "#dce2f3", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Try Free Tools
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div
                className="relative w-full rounded-3xl overflow-hidden"
                style={{ height: "400px", boxShadow: "0 40px 80px rgba(21,28,39,0.12)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, #1a0a3c 0%, #2d1a6b 40%, #4a2d9e 70%, #6b3fe7 100%)" }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="150" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="100" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="50" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="50" r="6" fill="#ccbdff" />
                  <circle cx="343" cy="125" r="6" fill="#ccbdff" />
                  <circle cx="343" cy="275" r="6" fill="#ccbdff" />
                  <circle cx="200" cy="350" r="6" fill="#ccbdff" />
                  <circle cx="57" cy="275" r="6" fill="#ccbdff" />
                  <circle cx="57" cy="125" r="6" fill="#ccbdff" />
                  <line x1="200" y1="50" x2="343" y2="125" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="343" y1="125" x2="343" y2="275" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="343" y1="275" x2="200" y2="350" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="200" y1="350" x2="57" y2="275" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="57" y1="275" x2="57" y2="125" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="57" y1="125" x2="200" y2="50" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="12" fill="#6B3FE7" />
                </svg>
                {/* Floating cards */}
                <div
                  className="absolute top-6 left-6 px-4 py-3 rounded-xl text-xs font-semibold"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "#ccbdff", fontFamily: "Manrope, sans-serif", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  ✓ Lead captured at 11:47pm
                </div>
                <div
                  className="absolute top-20 left-6 px-4 py-3 rounded-xl text-xs font-semibold"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "#ccbdff", fontFamily: "Manrope, sans-serif", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  ✓ Personalised reply sent 11:47pm
                </div>
                <div
                  className="absolute top-[136px] left-6 px-4 py-3 rounded-xl text-xs font-semibold"
                  style={{ backgroundColor: "rgba(107,63,231,0.3)", backdropFilter: "blur(8px)", color: "#ffffff", fontFamily: "Manrope, sans-serif", border: "1px solid rgba(107,63,231,0.4)" }}
                >
                  ✓ Meeting booked for 9am
                </div>
              </div>
              <div
                className="absolute -bottom-5 -right-5 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", boxShadow: "0 20px 60px rgba(21,28,39,0.12)" }}
              >
                <div className="text-xs mb-1" style={{ fontFamily: "Manrope, sans-serif", color: "#5e6573" }}>While you were asleep</div>
                <div className="text-lg font-black" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>3 leads qualified</div>
                <div className="text-xs" style={{ fontFamily: "Manrope, sans-serif", color: "#6B3FE7" }}>1 meeting booked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHY NOW — COMMON FRICTION ─────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              Sound familiar?
            </span>
            <h2
              className="text-4xl font-extrabold mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              Your competitors are already using AI.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "#494455" }}>
              Most Australian SMEs know they should be doing something with AI. Very few know where to start — or have time to figure it out while running a business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "🌙",
                pain: "Leads going cold after hours",
                desc: "A potential customer submits an enquiry at 9pm. Your competitors respond within minutes — automatically. You respond the next morning. The deal is gone.",
              },
              {
                icon: "📋",
                pain: "Hours lost to manual reporting",
                desc: "Every week someone on your team spends half a day pulling numbers from four different platforms just to produce a report nobody reads closely.",
              },
              {
                icon: "💬",
                pain: "Quotes that never follow up themselves",
                desc: "You send a quote. The prospect goes quiet. Following up manually feels awkward, so you don't. A structured AI follow-up sequence doubles your conversion rate.",
              },
              {
                icon: "🔁",
                pain: "The same questions answered over and over",
                desc: "Your team — and your customers — ask the same 20 questions constantly. An AI knowledge base answers them instantly, consistently, at any hour.",
              },
            ].map((item) => (
              <div
                key={item.pain}
                className="flex gap-5 p-7 rounded-2xl"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.05)" }}
              >
                <div className="text-3xl shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {item.pain}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WORKFLOW STRIP ────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
            >
              What we actually build
            </span>
            <h2
              className="text-4xl font-extrabold mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              AI that works while you don&apos;t have to.
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#494455" }}>
              These aren&apos;t hypothetical use cases. These are the workflows we build for Australian SMEs right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                label: "After-Hours Lead Response",
                trigger: "Trigger: Web enquiry submitted",
                steps: ["AI reads enquiry context", "Personalised reply sent in 60 seconds", "Lead scored and routed", "Meeting link included if qualified"],
                outcome: "You wake up to a booked meeting, not a missed opportunity.",
              },
              {
                label: "Quote Follow-Up Sequence",
                trigger: "Trigger: Quote sent but no response",
                steps: ["Day 2: Soft check-in sent", "Day 5: Value-add follow-up", "Day 10: Final nudge with deadline", "Win/loss logged automatically"],
                outcome: "More quotes convert. Zero awkward chasing.",
              },
              {
                label: "Meeting Notes & Actions",
                trigger: "Trigger: Meeting ends",
                steps: ["Recording transcribed automatically", "Action items extracted", "Summary emailed to attendees", "Tasks pushed to your project tool"],
                outcome: "Every meeting produces clear next steps with no manual write-up.",
              },
              {
                label: "AI Knowledge Base",
                trigger: "Trigger: Staff or customer question",
                steps: ["Question matched to knowledge base", "Accurate answer returned instantly", "Escalated to human if uncertain", "New answers added over time"],
                outcome: "Your team stops answering the same questions. Forever.",
              },
            ].map((wf) => (
              <div
                key={wf.label}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 30px rgba(21,28,39,0.06)" }}
              >
                <div className="p-1" style={{ background: "linear-gradient(90deg, #6B3FE7, #9b6dff)" }} />
                <div className="p-7">
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {wf.label}
                  </h3>
                  <div
                    className="text-xs font-semibold mb-4 px-3 py-1.5 rounded-lg inline-block"
                    style={{ backgroundColor: "#f0f3ff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                  >
                    {wf.trigger}
                  </div>
                  <div className="space-y-2 mb-5">
                    {wf.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#494455" }}>
                        <span className="shrink-0 mt-0.5 font-bold text-xs" style={{ color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed font-semibold" style={{ color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}>
                    → {wf.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW ENGAGEMENTS WORK ──────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                How We Work
              </span>
              <h2
                className="text-4xl font-extrabold mb-5"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
              >
                From audit to automation in weeks.
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
                Every engagement follows the same structure — because it works. We start by understanding your business, not by pitching tools.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    label: "AI Opportunity Audit",
                    desc: "A structured assessment of your operations, data, and team readiness. We identify the 3 highest-value AI opportunities, each ranked by potential impact and implementation effort.",
                  },
                  {
                    step: "02",
                    label: "AI Roadmap Sprint",
                    desc: "A 90-day action plan scoped to your business — not a generic framework. You get a clear sequence of what to build, in what order, and why.",
                  },
                  {
                    step: "03",
                    label: "Pilot Workflow Build",
                    desc: "Your first AI workflow, fully built and integrated with your existing tools. Live within 2–4 weeks. We train your team and hand over full documentation.",
                  },
                  {
                    step: "04",
                    label: "Managed AI Operations",
                    desc: "Ongoing optimisation, new capability every quarter, and a direct line to us when something needs attention. AI that grows with your business.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {s.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-base" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>{s.label}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/services"
                  className="inline-block font-bold text-sm transition-colors hover:text-[#6B3FE7]"
                  style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  View all services →
                </Link>
              </div>
            </div>

            {/* Pipeline visual */}
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "#151c27", boxShadow: "0 40px 80px rgba(21,28,39,0.15)" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ fontFamily: "Manrope, sans-serif", color: "#959cb1" }}>
                Live: After-Hours Lead Pipeline
              </div>
              {[
                { label: "Enquiry received", time: "11:47pm", active: true, done: true },
                { label: "AI qualifies + responds", time: "11:47pm", active: true, done: true },
                { label: "Lead scored & routed", time: "11:48pm", active: true, done: true },
                { label: "Meeting booked", time: "11:49pm", active: true, done: false },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4 mb-5 last:mb-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: row.done ? "#6B3FE7" : row.active ? "rgba(107,63,231,0.2)" : "#2a313d",
                      color: row.done ? "#ffffff" : row.active ? "#ccbdff" : "#494455",
                    }}
                  >
                    {row.done ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: row.active ? "#ffffff" : "#494455", fontFamily: "Manrope, sans-serif" }}>
                      {row.label}
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: "#5e6573", fontFamily: "Manrope, sans-serif" }}>{row.time}</div>
                </div>
              ))}
              <div className="mt-8 rounded-xl p-4" style={{ backgroundColor: "rgba(107,63,231,0.15)", border: "1px solid rgba(107,63,231,0.25)" }}>
                <div className="text-sm font-bold mb-1" style={{ color: "#ccbdff", fontFamily: "Space Grotesk, sans-serif" }}>
                  Total response time: 2 minutes
                </div>
                <div className="text-xs" style={{ color: "#7a7487" }}>
                  Your competitor responded the next morning.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHO WE HELP — 3 VERTICALS ────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              Who We Help
            </span>
            <h2
              className="text-4xl font-extrabold mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              Built for three types of Australian business.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#494455" }}>
              We don&apos;t work with everyone. We work deeply with businesses where AI can make a measurable difference fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                vertical: "eCommerce & Retail",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="3" y1="6" x2="21" y2="6" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 10a4 4 0 01-8 0" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                desc: "AI content at scale, automated customer journeys, smarter ad performance analysis, and competitor intelligence. Built for operators who want to scale revenue without scaling headcount.",
                wins: ["Product descriptions for 500 SKUs in a day", "Ad performance reports in 20 minutes", "Competitor intel every week, automatically"],
                cta: "Explore eCommerce AI →",
                href: "/services",
              },
              {
                vertical: "Professional Services",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                desc: "Consultants, accountants, agencies, and advisers. AI that handles proposal drafting, client communication, document processing, and knowledge management — so you bill more and admin less.",
                wins: ["Proposals drafted in 15 minutes", "Client onboarding automated end-to-end", "Meeting notes and actions in seconds"],
                cta: "Explore professional services AI →",
                href: "/services",
              },
              {
                vertical: "Trades & Service Businesses",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                desc: "Builders, plumbers, electricians, and field service operators. AI that qualifies leads after hours, follows up on quotes, and keeps your admin running when you&apos;re on the tools.",
                wins: ["Leads responded to in 60 seconds, 24/7", "Quote follow-up sequences that actually convert", "Job scheduling and client comms automated"],
                cta: "Explore trades AI →",
                href: "/services",
              },
            ].map((v) => (
              <div
                key={v.vertical}
                className="rounded-3xl p-8"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.06)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "#e7eeff" }}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                  {v.vertical}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#494455" }}>{v.desc}</p>
                <div className="space-y-2 mb-6">
                  {v.wins.map((w) => (
                    <div key={w} className="flex items-start gap-2 text-sm" style={{ color: "#494455" }}>
                      <span style={{ color: "#6B3FE7", fontWeight: 700 }}>✓</span>
                      {w}
                    </div>
                  ))}
                </div>
                <Link
                  href={v.href}
                  className="text-sm font-bold transition-colors hover:text-[#6B3FE7]"
                  style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {v.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FOUNDER CREDIBILITY ───────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
              >
                Why ProjxAI
              </span>
              <h2
                className="text-4xl font-extrabold mb-6 leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em" }}
              >
                Built by an operator. Not an agency.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                ProjxAI was founded by a 30-year Australian digital operator — GM roles, P&amp;L ownership, multi-million-dollar marketing budgets managed in-house across hospitality, B2B distribution, travel, and online services. Not a career spent advising businesses from the outside. A career spent running them.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                The wave of AI services being sold into the Australian SME market right now is largely coming from people who&apos;ve never had to make a P&amp;L work. Smart engineers. Good marketers. People who build impressive tools for other people&apos;s businesses — but who have never been the person in the room when the vendor&apos;s invoice was bigger than the value delivered.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                ProjxAI exists to close that gap. Production work for Australian SMEs, led by someone who&apos;s spent three decades shipping systems, owning budgets, and knowing exactly what a CFO will — and won&apos;t — approve.
              </p>
              <p className="text-base leading-relaxed mb-8 italic" style={{ color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}>
                &ldquo;Most AI consultants will tell you what&apos;s possible. I&apos;ll tell you what&apos;s worth doing this quarter.&rdquo;
              </p>
              <Link
                href="/about"
                className="inline-block font-bold text-sm transition-opacity hover:opacity-80"
                style={{ color: "#ccbdff", fontFamily: "Space Grotesk, sans-serif" }}
              >
                About ProjxAI →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "30+", label: "Years in Australian digital operations" },
                { value: "GM", label: "P&L and multi-million-dollar budgets owned, not just consulted on" },
                { value: "Brisbane", label: "Based in QLD, working nationally" },
                { value: "5+", label: "Industries: hospitality, B2B, travel, wagering, online services" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-2xl p-6 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="text-3xl font-extrabold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ccbdff", letterSpacing: "-0.03em" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs leading-snug" style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FREE TOOL + FEATURED GUIDES ───────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* AI Opportunity Audit card */}
            <div
              className="rounded-3xl p-10 h-full"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.06)" }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
              >
                Free Tool
              </span>
              <h3
                className="text-2xl font-extrabold mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                AI Opportunity Audit
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: "#494455" }}>
                Answer 14 questions about your business and get a personalised AI Opportunity Score with three specific automation recommendations — grounded in your actual operations, not generic advice.
              </p>
              <ul className="space-y-2 mb-8">
                {["Your AI Opportunity Score (0–100) with readiness breakdown", "Three named automation opportunities with ROI estimates", "A 90-day implementation plan calibrated to your team"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#494455" }}>
                    <span style={{ color: "#6B3FE7", fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/audit"
                className="btn-primary-gradient inline-block px-7 py-3 rounded-xl text-white font-bold text-sm transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Try the free AI Opportunity Audit →
              </Link>
            </div>

            {/* Featured guides */}
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                From the Blog
              </span>
              <h3
                className="text-2xl font-extrabold mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                Practical AI guides for Australian business owners.
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "What is ROAS and why most Australian eCommerce businesses are calculating it wrong",
                    category: "eCommerce AI",
                    href: "/blog/what-is-roas-australian-ecommerce",
                  },
                  {
                    title: "5 ways Australian SMEs are already using AI in 2026 (and how to catch up)",
                    category: "AI Strategy",
                    href: "/blog/australian-smes-using-ai-2026",
                  },
                ].map((post) => (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="group flex gap-4 p-5 rounded-2xl transition-all hover:shadow-md"
                    style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 12px rgba(21,28,39,0.04)" }}
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                      >
                        {post.category}
                      </span>
                      <h4
                        className="text-sm font-bold leading-snug transition-colors group-hover:text-[#6B3FE7]"
                        style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                      >
                        {post.title}
                      </h4>
                    </div>
                    <svg className="shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  href="/blog"
                  className="text-sm font-bold transition-colors hover:text-[#6B3FE7]"
                  style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  All articles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                Common Questions
              </span>
              <h2
                className="text-4xl font-extrabold"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
              >
                What you&apos;re probably wondering.
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How much does it cost?",
                  a: "Pricing depends on the scope and complexity of your engagement. Get in touch for a no-obligation conversation — we'll give you a clear indication on our first call.",
                },
                {
                  q: "How long does it take to see results?",
                  a: "The Opportunity Audit delivers a written report within 48 hours. Your first live AI workflow is typically running within 2–4 weeks of starting a Pilot Build. This is not a 6-month engagement before anything happens.",
                },
                {
                  q: "What tools do you work with?",
                  a: "We work with your existing stack — not against it. Most implementations use Make.com or Zapier for automation, Claude or ChatGPT for AI processing, and your existing CRM, email, and project tools. No rip-and-replace.",
                },
                {
                  q: "Where does our data go? Is this safe?",
                  a: "Australian data stays in Australian or agreed-jurisdiction infrastructure where possible. We work within your privacy obligations and can advise on the Privacy Act 1988 implications of each implementation. We do not build systems that create unreasonable data exposure.",
                },
                {
                  q: "Do we need a technical team?",
                  a: "No. We build and hand over complete systems with training and documentation. Your team doesn't need to be technical to use what we build. If something breaks or needs updating, we handle it.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 16px rgba(21,28,39,0.05)" }}
                >
                  <summary
                    className="flex items-center justify-between p-6 cursor-pointer list-none font-bold"
                    style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                  >
                    {faq.q}
                    <svg
                      className="shrink-0 ml-4 transition-transform group-open:rotate-45"
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                    >
                      <path d="M12 5v14M5 12h14" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#494455" }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ───────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div
            className="rounded-3xl p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #151c27 0%, #2d1b69 50%, #6b3fe7 100%)" }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
            >
              Let&apos;s talk
            </span>
            <h2
              className="text-4xl font-extrabold mb-5 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Book a free 15-minute{" "}
              <span style={{ color: "#ccbdff", fontStyle: "italic" }}>Clarity Call.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              No sales pitch. No discovery form that takes 20 minutes to fill in.
              Just an honest conversation about where AI fits in your business — and what it would actually take to get there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#consulting"
                className="btn-primary-gradient inline-block px-10 py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] active:scale-95"
                style={{ fontFamily: "Space Grotesk, sans-serif", backgroundColor: "#ffffff", color: "#151c27" }}
              >
                Book a Clarity Call
              </Link>
              <Link
                href="/services"
                className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
