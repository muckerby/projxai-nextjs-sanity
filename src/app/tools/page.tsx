import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Tools for Australian SMEs | ProjxAI",
  description:
    "Free AI tools built specifically for Australian SMEs. Start with the AI Opportunity Score — find out where your business stands with AI in 5 minutes.",
  openGraph: {
    title: "Free AI Tools for Australian SMEs | ProjxAI",
    description:
      "Free AI tools for Australian SMEs. Take the AI Opportunity Score and find out exactly where to start.",
    url: "https://www.projxai.com.au/tools",
  },
};

export default function ToolsPage() {
  return (
    <>
      {/* ── HERO / FEATURED TOOL ─────────────────────────────── */}
      <section className="pt-40 pb-24" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#dce2f3", color: "#5e6573" }}
              >
                🟢 Live Now · Free Tool
              </span>
              <h1
                className="font-extrabold leading-[1.0] mb-6"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  color: "#151c27",
                  letterSpacing: "-0.03em",
                }}
              >
                AI Opportunity{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>Score</span>
              </h1>
              <p className="text-xl max-w-lg leading-relaxed mb-10" style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}>
                Answer 12 questions and get a personalised AI readiness score,
                your top 3 use cases, and the smartest first step for your
                business. Takes 5 minutes. No signup required to see results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/ai-opportunity-score"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-base transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
                  style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Take the Assessment →
                </Link>
              </div>
            </div>

            {/* Score visual preview */}
            <div className="lg:col-span-6">
              <div
                className="relative p-8 rounded-[2rem] overflow-hidden"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 40px 80px rgba(21,28,39,0.08)" }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(107,63,231,0.07) 0%, transparent 70%)" }}
                />
                <div className="relative space-y-4">
                  {/* Score band */}
                  <div className="p-6 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)" }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Manrope, sans-serif" }}>Your AI Opportunity Score</div>
                    <div className="text-5xl font-extrabold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>68%</div>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}>Good Foundation</div>
                    <div className="mt-4 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      <div className="h-2 rounded-full" style={{ width: "68%", backgroundColor: "#ccbdff" }} />
                    </div>
                  </div>
                  {/* Top use case */}
                  <div className="flex gap-3 items-start p-4 rounded-2xl" style={{ backgroundColor: "#f5f0ff", border: "1.5px solid #d4c5f9" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: "#6B3FE7", color: "#fff" }}>1</div>
                    <div>
                      <div className="font-bold text-sm mb-0.5" style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}>AI Lead Follow-Up Sequence</div>
                      <div className="text-xs" style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}>High Impact · Recommended first use case</div>
                    </div>
                  </div>
                  {/* Dim scores */}
                  {[
                    { label: "Process Clarity", pct: 75 },
                    { label: "Data Quality", pct: 50 },
                    { label: "Team Readiness", pct: 88 },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "Manrope, sans-serif", color: "#7a7487" }}>
                        <span>{d.label}</span><span className="font-bold" style={{ color: "#151c27" }}>{d.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: "#e7eeff" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: "#6B3FE7" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI TOOLKIT ────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <h2
                className="text-4xl font-extrabold tracking-tight mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                AI Toolkit
              </h2>
              <p style={{ color: "#494455" }}>Free tools built for Australian SMEs — live and coming soon.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wider"
                style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#e7eeff", color: "#494455" }}
              >
                SME SPECIALISED
              </span>
              <span
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wider"
                style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#dce2f3", color: "#6B3FE7" }}
              >
                AI NATIVE
              </span>
            </div>
          </div>

          {/* Tool cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live: AI Opportunity Score */}
            <Link
              href="/tools/ai-opportunity-score"
              className="group p-8 rounded-[2rem] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(107,63,231,0.15)] hover:-translate-y-1"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)", border: "1.5px solid #d4c5f9" }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#6B3FE7" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 17v-2m3 2v-4m3 4v-6M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#6B3FE7", color: "#ffffff" }}>
                  🟢 LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                AI Opportunity Score
              </h3>
              <p className="leading-relaxed mb-8" style={{ color: "#494455" }}>
                12 questions. Personalised AI readiness score, top use cases for your industry, and a recommended first step.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                <span>Take the assessment →</span>
              </div>
            </Link>

            {/* Coming soon: ROAS Calculator */}
            <div
              className="group p-8 rounded-[2rem] transition-all duration-500 cursor-default"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#e7eeff" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#f0f3ff", color: "#7a7487" }}>
                  Phase 2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                ROAS Calculator
              </h3>
              <p className="leading-relaxed mb-8" style={{ color: "#494455" }}>
                Find out exactly what return your ad spend is generating and where the gaps are. Takes 2 minutes.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#7a7487", fontFamily: "Space Grotesk, sans-serif" }}>
                <span>Coming soon</span>
              </div>
            </div>

            {/* Coming soon: Competitor Espionage */}
            <div
              className="group p-8 rounded-[2rem] transition-all duration-500 cursor-default"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#e7eeff" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#f0f3ff", color: "#7a7487" }}>
                  Phase 3
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                Competitor Espionage Engine
              </h3>
              <p className="leading-relaxed mb-8" style={{ color: "#494455" }}>
                A full intelligence report on any competitor&apos;s ad strategy — creative formats, messaging angles, spend estimates, and gaps you can exploit.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#7a7487", fontFamily: "Space Grotesk, sans-serif" }}>
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOM TOOL CTA ──────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div
            className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden"
            style={{ backgroundColor: "#151c27" }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(107,63,231,0.3), transparent)",
              }}
            />

            <div className="relative z-10 max-w-2xl">
              <h2
                className="font-black mb-6 leading-tight"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                Need a custom AI tool for your specific business logic?
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
                We build proprietary AI tools that integrate directly into your existing SME workflow.
                From custom LLM agents to automated reporting engines — if it can be built, we&apos;ll build it.
              </p>
              <Link
                href="/contact#consulting"
                className="inline-block px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105"
                style={{ fontFamily: "Space Grotesk, sans-serif", backgroundColor: "#ffffff", color: "#151c27" }}
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
