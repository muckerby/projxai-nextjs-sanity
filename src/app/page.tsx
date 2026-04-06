import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProjxAI — AI for Australian Business | Practical AI Implementation",
  description:
    "ProjxAI helps Australian SMEs implement AI that saves time, reduces costs, and grows revenue. Plain English. Practical results. No in-house tech team required.",
  openGraph: {
    title: "ProjxAI — AI for Australian Business | Practical AI Implementation",
    description:
      "ProjxAI helps Australian SMEs implement AI that saves time, reduces costs, and grows revenue. Plain English. Practical results. No in-house tech team required.",
    url: "https://www.projxai.com.au",
    images: [{ url: "https://www.projxai.com.au/images/logo-new.svg" }],
  },
};

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-40 pb-32"
        style={{ backgroundColor: "#f9f9ff" }}
      >
        {/* Subtle radial mood gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(107,63,231,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                style={{
                  backgroundColor: "#dce2f3",
                  color: "#5e6573",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4.5 13.5H11L10 22L20.5 10.5H14L13 2Z" fill="#6B3FE7" />
                </svg>
                AI-Powered Efficiency for Australian SMEs
              </div>

              <h1
                className="text-6xl md:text-7xl font-extrabold leading-[1.05] mb-8"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  letterSpacing: "-0.03em",
                  color: "#151c27",
                }}
              >
                Scale Your SME with{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                  AI-Driven
                </span>{" "}
                Efficiency.
              </h1>

              <p
                className="text-xl max-w-xl mb-10 leading-relaxed"
                style={{ color: "#494455" }}
              >
                We architect custom AI ecosystems that automate repetitive tasks,
                predict growth opportunities, and give your team their time back.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#consulting"
                  className="btn-primary-gradient inline-block px-10 py-5 rounded-xl text-white font-bold text-lg text-center transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] active:scale-95"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Book an AI Audit
                </Link>
                <Link
                  href="/services"
                  className="inline-block px-10 py-5 rounded-xl font-bold text-lg text-center transition-colors"
                  style={{
                    backgroundColor: "#dce2f3",
                    color: "#6B3FE7",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative w-full aspect-square rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 40px 80px rgba(21,28,39,0.12)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a0a3c 0%, #2d1a6b 40%, #4a2d9e 70%, #6b3fe7 100%)",
                  }}
                />
                {/* Floating network nodes */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle cx="200" cy="200" r="120" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="80" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="40" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="80" r="6" fill="#ccbdff" />
                  <circle cx="320" cy="200" r="6" fill="#ccbdff" />
                  <circle cx="200" cy="320" r="6" fill="#ccbdff" />
                  <circle cx="80" cy="200" r="6" fill="#ccbdff" />
                  <line x1="200" y1="80" x2="320" y2="200" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="320" y1="200" x2="200" y2="320" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="200" y1="320" x2="80" y2="200" stroke="#ccbdff" strokeWidth="0.5" />
                  <line x1="80" y1="200" x2="200" y2="80" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="10" fill="#6B3FE7" />
                </svg>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(107,63,231,0.3) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-6 p-5 rounded-2xl max-w-[200px]"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 20px 60px rgba(21,28,39,0.12)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#e7deff" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3v18h18" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" />
                      <path d="M7 16l4-4 4 4 4-6" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    Efficiency Boost
                  </span>
                </div>
                <div className="text-3xl font-black" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>
                  +42%
                </div>
                <div className="text-xs mt-1" style={{ fontFamily: "Manrope, sans-serif", color: "#494455" }}>
                  Avg. operational output increase
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SCALE ─────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              Who We Scale.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#494455" }}>
              Bespoke AI solutions tailored for the unique challenges of the Australian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Business Owners",
                desc: "For the visionary founder spending too much time in the business instead of on it. AI frees you to lead.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 16l4-4 4 4 4-6" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Growth Marketers",
                desc: "Predictive ROAS models and hyper-personalised content pipelines. Outperform larger competitors.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#6B3FE7" strokeWidth="1.5"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "Service Agencies",
                desc: "Scale delivery without adding headcount by leveraging intelligent workflow automation.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-10 rounded-[2rem] transition-all duration-500"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 40px rgba(21,28,39,0.04)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#e7eeff" }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                >
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#494455" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM FRICTION TO FLOW ─────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                How We Work
              </div>
              <h2
                className="text-4xl md:text-5xl font-extrabold mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
              >
                From Friction to Flow.
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
                Most businesses try to add AI on top of broken processes and wonder why it doesn&apos;t work.
                We start where it matters — mapping your operations, identifying the gaps, then building
                AI that fits how you actually work.
              </p>

              {[
                { step: "01", label: "AI Readiness Audit", desc: "We assess your current processes, data, and team." },
                { step: "02", label: "Strategy & Roadmap", desc: "A 90-day adoption plan built for your business." },
                { step: "03", label: "Build & Automate", desc: "Done-for-you workflow implementation and integration." },
                { step: "04", label: "Ongoing Retainer", desc: "Continuous optimisation and new capability rollout." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-5 mb-7 last:mb-0">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#e7deff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                      {s.label}
                    </div>
                    <div className="text-sm" style={{ color: "#494455" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual panel */}
            <div className="relative">
              <div
                className="rounded-3xl p-10"
                style={{ backgroundColor: "#151c27", boxShadow: "0 40px 80px rgba(21,28,39,0.15)" }}
              >
                <div className="mb-8">
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ fontFamily: "Manrope, sans-serif", color: "#959cb1" }}
                  >
                    AI Automation Pipeline
                  </div>
                  {[
                    { label: "Lead Capture", pct: 100, active: true },
                    { label: "CRM Enrichment", pct: 85, active: true },
                    { label: "Follow-up Sequence", pct: 70, active: true },
                    { label: "Reporting", pct: 55, active: false },
                  ].map((bar) => (
                    <div key={bar.label} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span style={{ color: bar.active ? "#ffffff" : "#494455", fontFamily: "Manrope, sans-serif" }}>
                          {bar.label}
                        </span>
                        <span style={{ color: bar.active ? "#ccbdff" : "#494455", fontFamily: "Manrope, sans-serif" }}>
                          {bar.active ? "Active" : "Queued"}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: "#2a313d" }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${bar.pct}%`,
                            background: bar.active
                              ? "linear-gradient(90deg, #521acf, #6b3fe7)"
                              : "#353943",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "rgba(107,63,231,0.15)", border: "1px solid rgba(107,63,231,0.2)" }}
                >
                  <div className="text-sm font-semibold mb-1" style={{ color: "#ccbdff", fontFamily: "Space Grotesk, sans-serif" }}>
                    Bespoke Tool Integration
                  </div>
                  <div className="text-xs" style={{ color: "#959cb1" }}>
                    Connected to your existing stack. No rip-and-replace.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "94%", label: "Client satisfaction rate" },
              { value: "150+", label: "AI workflows built" },
              { value: "5×", label: "Avg. ROI on automation" },
              { value: "48h", label: "Avg. audit turnaround" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div
                  className="text-5xl font-extrabold mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7", letterSpacing: "-0.04em" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ fontFamily: "Manrope, sans-serif", color: "#494455" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div
            className="rounded-3xl p-16 text-center"
            style={{ backgroundColor: "#151c27", boxShadow: "0 40px 80px rgba(21,28,39,0.15)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{ backgroundColor: "rgba(107,63,231,0.2)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
            >
              Start the conversation
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em" }}
            >
              Ready to Architect Your{" "}
              <span style={{ color: "#ccbdff", fontStyle: "italic" }}>AI Future?</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "#959cb1" }}>
              Book a free 30-minute discovery call. No sales pitch — just an honest
              conversation about where AI fits in your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#consulting"
                className="btn-primary-gradient inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.4)] active:scale-95"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/services"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  fontFamily: "Space Grotesk, sans-serif",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
