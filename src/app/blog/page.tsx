import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Insights Blog | ProjxAI",
  description:
    "Practical AI insights, guides, and strategy for Australian SMEs. Plain English — no jargon, no hype. Written by Michael Collicoat.",
  openGraph: {
    title: "AI Insights Blog | ProjxAI",
    description:
      "Practical AI insights and strategy for Australian SMEs. Written by Michael Collicoat.",
    url: "https://www.projxai.com.au/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-16" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="max-w-4xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "rgba(107,63,231,0.3)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
            >
              Intelligence Brief
            </span>
            <h1
              className="font-extrabold leading-[0.95] tracking-tighter mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
              }}
            >
              Latest{" "}
              <span style={{ color: "#ccbdff", fontStyle: "italic" }}>Insights</span>
            </h1>
            <p
              className="text-xl max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Curated intelligence from the intersection of AI, digital strategy, and business
              transformation — written specifically for Australian SMEs.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMING SOON STATE ────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Coming soon card */}
            <div
              className="relative overflow-hidden rounded-[2rem] p-12 md:p-16 mb-16"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 60px rgba(21,28,39,0.06)" }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(107,63,231,0.06) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: "#e7eeff" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                  style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                >
                  Coming Soon
                </span>

                <h2
                  className="text-3xl font-extrabold mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
                >
                  First articles dropping soon.
                </h2>
                <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#494455" }}>
                  Michael is currently writing the first series of practical AI guides built specifically
                  for Australian business owners — no fluff, no filler, just actionable intelligence.
                </p>

                <div className="flex flex-wrap gap-4">
                  {[
                    "AI Readiness",
                    "Workflow Automation",
                    "SME Strategy",
                    "Tool Reviews",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: "#f0f3ff", color: "#494455", fontFamily: "Manrope, sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Practical guides",
                  desc: "Step-by-step AI implementation guides written for non-technical business owners.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "Real ROI focus",
                  desc: "Every article ties back to measurable business outcomes — not theory.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "Australian context",
                  desc: "Written with Australian regulations, market conditions, and business culture in mind.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#e7eeff" }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── NEWSLETTER SIGNUP ──────────────────────────────── */}
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-[2rem] p-10 md:p-14"
              style={{
                background: "linear-gradient(135deg, #151c27 0%, #2d1b69 50%, #6b3fe7 100%)",
              }}
            >
              <div className="max-w-xl">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
                >
                  Newsletter
                </span>
                <h2
                  className="font-black mb-4 leading-tight"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Weekly Intelligence.{" "}
                  <span style={{ color: "#ccbdff" }}>Delivered Fresh.</span>
                </h2>
                <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Get notified when new articles drop — plus early access to tools, frameworks, and
                  AI insights before they go public. No spam. Unsubscribe anytime.
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com.au"
                    className="flex-1 px-5 py-4 rounded-xl text-base outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] whitespace-nowrap"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      backgroundColor: "#ffffff",
                      color: "#151c27",
                    }}
                  >
                    Notify me
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl font-extrabold mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Can&apos;t wait? Let&apos;s talk now.
            </h2>
            <p className="text-lg mb-8" style={{ color: "#494455" }}>
              If you have specific questions about AI for your business, book a free 30-minute
              discovery call with Michael — no sales pitch, just straight answers.
            </p>
            <Link
              href="/contact#consulting"
              className="btn-primary-gradient inline-block px-10 py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
