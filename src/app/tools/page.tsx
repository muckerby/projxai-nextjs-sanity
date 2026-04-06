import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools for Australian SMEs | ProjxAI",
  description:
    "Free and premium AI tools built specifically for Australian small and medium businesses. ROAS Calculator, AI Readiness Scorecard, and more coming soon.",
  openGraph: {
    title: "AI Tools for Australian SMEs | ProjxAI",
    description:
      "Free and premium AI tools built specifically for Australian SMEs. Start with the ROAS Calculator.",
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
                className="inline-block text-xs font-bold tracking-widest uppercase mb-5"
                style={{ fontFamily: "Manrope, sans-serif", color: "#6B3FE7" }}
              >
                Featured Tool
              </span>
              <h1
                className="font-black leading-[0.95] tracking-tighter mb-8"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 5rem)",
                  color: "#151c27",
                  letterSpacing: "-0.04em",
                }}
              >
                ROAS{" "}
                <br />
                <span style={{ color: "#6B3FE7" }}>Calculator</span>
              </h1>
              <p className="text-xl max-w-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
                Precision engineering for your digital marketing. Calculate your Return on Ad Spend
                with granular accuracy to identify growth levers for your SME.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/roas-calculator"
                  className="btn-primary-gradient inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Launch Tool
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <span
                  className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#dce2f3", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                >
                  FREE TOOL
                </span>
              </div>
            </div>

            {/* ROAS visual card */}
            <div className="lg:col-span-6 relative">
              <div
                className="relative p-8 rounded-[2rem] overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 40px 80px rgba(21,28,39,0.08)",
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(107,63,231,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* Mock dashboard grid */}
                <div className="relative space-y-4">
                  <div className="flex gap-3">
                    {[
                      { label: "Ad Spend", value: "$12,400", color: "#e7eeff" },
                      { label: "Revenue", value: "$51,888", color: "#e7eeff" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex-1 p-5 rounded-2xl"
                        style={{ backgroundColor: item.color }}
                      >
                        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "Manrope, sans-serif", color: "#7a7487" }}>
                          {item.label}
                        </div>
                        <div className="text-2xl font-black" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ROAS result */}
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.7)" }}>
                          Your ROAS
                        </div>
                        <div className="text-4xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          4.2×
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.7)" }}>
                          Target
                        </div>
                        <div className="text-lg font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          5.0×
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                      <div className="h-2 rounded-full" style={{ width: "84%", backgroundColor: "#ccbdff" }} />
                    </div>
                    <div className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Manrope, sans-serif" }}>
                      84% of target — 0.8× gap to close
                    </div>
                  </div>

                  {/* Efficiency badge */}
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ backgroundColor: "#f0f3ff" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#e7eeff" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-sm font-semibold" style={{ color: "#494455" }}>
                      Increase budget by 19% to hit target ROAS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIGITAL ARCHITECT ARSENAL ────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <h2
                className="text-4xl font-extrabold tracking-tight mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                Digital Architect Arsenal
              </h2>
              <p style={{ color: "#494455" }}>Coming soon to the ProjxAI ecosystem.</p>
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

          {/* Coming-soon tool cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 17v-2m3 2v-4m3 4v-6M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "AI Readiness Scorecard",
                desc: "Evaluate your current operational efficiency and discover high-impact automation opportunities tailored for your specific industry.",
                eta: "Phase 2",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "Content Engine Estimator",
                desc: "Calculate how many pieces of high-quality content your AI could generate based on your current human resources and tech stack.",
                eta: "Phase 2",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Competitor Espionage Engine",
                desc: "A full intelligence report on any competitor's ad strategy — creative formats, messaging angles, spend estimates, and gaps you can exploit.",
                eta: "Phase 3",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="group p-8 rounded-[2rem] transition-all duration-500 cursor-default"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#e7eeff" }}
                  >
                    {tool.icon}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{ fontFamily: "Manrope, sans-serif", backgroundColor: "#f0f3ff", color: "#7a7487" }}
                  >
                    {tool.eta}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                >
                  {tool.title}
                </h3>
                <p className="leading-relaxed mb-8" style={{ color: "#494455" }}>
                  {tool.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                  <span>Notify me on launch</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
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
