import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services for Australian SMEs | ProjxAI",
  description:
    "Bespoke AI consulting, implementation, automation, and content services designed for Australian SMEs. Starting from $750.",
  openGraph: {
    title: "AI Services for Australian SMEs | ProjxAI",
    description:
      "Bespoke AI consulting, implementation, automation, and content services designed for Australian SMEs.",
    url: "https://www.projxai.com.au/services",
  },
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="10" fill="#e7deff" />
    <path d="M8 12l3 3 5-5" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-24" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                Our Expertise
              </span>
              <h1
                className="text-6xl md:text-7xl font-extrabold leading-[1.05] mb-8"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}
              >
                The Architecture of{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>Intelligence.</span>
              </h1>
              <p className="text-xl leading-relaxed max-w-2xl font-light" style={{ color: "#494455" }}>
                We deploy custom-engineered AI frameworks that scale with Australian SMEs.
                Move beyond generic tools to bespoke digital architecture designed for high-impact results.
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div
                className="w-full aspect-square rounded-[3rem] overflow-hidden"
                style={{ boxShadow: "0 40px 80px rgba(21,28,39,0.12)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #1a0a3c 0%, #2d1a6b 40%, #4a2d9e 70%, #6b3fe7 100%)",
                  }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="130" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="90" stroke="#ccbdff" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="50" stroke="#ccbdff" strokeWidth="0.5" />
                  {[0,60,120,180,240,300].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const x = 200 + 130 * Math.cos(rad);
                    const y = 200 + 130 * Math.sin(rad);
                    return <circle key={deg} cx={x} cy={y} r="5" fill="#ccbdff" />;
                  })}
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full" style={{ background: "rgba(107,63,231,0.08)", filter: "blur(40px)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE 1: AI CONSULTING ──────────────────────────── */}
      <section className="py-32 mx-4 rounded-[3rem]" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Card */}
            <div>
              <div
                className="p-8 rounded-[2.5rem]"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 32px 64px rgba(21,28,39,0.05)" }}
              >
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11l3 3L22 4" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI Readiness Audit
                </h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: "#f9f9ff" }}>
                    <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif", color: "#6B3FE7" }}>What You Get</p>
                    <p style={{ color: "#494455" }}>A prioritised AI opportunity report — where to start, what to ignore, and what ROI to expect.</p>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: "#f9f9ff" }}>
                    <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif", color: "#6B3FE7" }}>Format</p>
                    <p style={{ color: "#494455" }}>2-hour remote session · Written report within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Copy */}
            <div>
              <h2 className="text-4xl font-extrabold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}>
                Start With Clarity, Not Hype.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#494455" }}>
                Most businesses don&apos;t know where AI fits in their operations until they&apos;ve wasted money
                finding out. The AI Readiness Audit gives you an honest, expert assessment of your
                current state and a prioritised roadmap — before you spend a cent on implementation.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Process mapping across all core business functions",
                  "Data readiness and quality assessment",
                  "Team capability and change readiness review",
                  "Prioritised AI opportunity register",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span style={{ color: "#151c27" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-extrabold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>From $750</span>
                <Link href="/contact#consulting" className="btn-primary-gradient inline-block px-8 py-3 rounded-xl text-white font-bold transition-all hover:shadow-[0_20px_40px_rgba(82,26,207,0.3)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Book an Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE 2: AI STRATEGY & ROADMAP ─────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}>
              AI Strategy &amp; Roadmap
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#494455" }}>
              A 90-day AI adoption plan built specifically for how your business operates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - wide */}
            <div className="md:col-span-2 p-12 rounded-[2.5rem] relative overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.05)" }}>
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                End-to-End Operational Strategy
              </h3>
              <p className="mb-8 max-w-md" style={{ color: "#494455" }}>
                We map your entire business operations, identify the highest-ROI automation opportunities,
                and deliver a phased implementation roadmap your team can actually execute.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-extrabold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>From $2,500</span>
                <Link href="/contact#consulting" className="px-6 py-3 rounded-xl font-bold transition-all hover:bg-[#6B3FE7] hover:text-white" style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                  Get Started
                </Link>
              </div>
            </div>

            {/* Card 2 - primary */}
            <div className="p-10 rounded-[2.5rem] flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", color: "#ffffff", boxShadow: "0 20px 60px rgba(82,26,207,0.25)" }}>
              <div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mb-8">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Intelligent Workflow Design</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#e5dbff" }}>
                  Custom workflow blueprints for your team with tool recommendations, integration specs, and change management guidance.
                </p>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ fontFamily: "Manrope, sans-serif" }}>Included in Strategy package</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-10 rounded-[2.5rem]" style={{ backgroundColor: "#e2e8f9" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>The Result</h3>
              <p className="mb-8" style={{ color: "#494455" }}>
                A documented AI strategy you own forever — not a vendor pitch disguised as consulting.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>3–5×</span>
                <span className="text-xs font-bold uppercase tracking-tight" style={{ fontFamily: "Manrope, sans-serif", color: "#494455" }}>Avg. ROI<br/>on implementation</span>
              </div>
            </div>

            {/* Card 4 - wide */}
            <div className="md:col-span-2 p-10 rounded-[2.5rem] flex items-center justify-between gap-12" style={{ backgroundColor: "#d3daea" }}>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>AI Tool Stack Review</h3>
                <p className="text-sm" style={{ color: "#494455" }}>
                  Optional add-on: audit your current tools for unused AI features and redundant subscriptions. Bundle with the Readiness Audit for the full picture.
                </p>
              </div>
              <span className="text-xl font-extrabold shrink-0" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>+$750</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE 3: AI WORKFLOW IMPLEMENTATION ─────────────── */}
      <section className="py-32 mx-4 rounded-[3rem]" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-extrabold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}>
                AI Workflow Implementation
              </h2>
              <p className="text-xl leading-relaxed mb-10" style={{ color: "#494455" }}>
                Done-for-you automation builds. We take the strategy and turn it into
                working systems — integrated into your existing tools, tested with your team,
                and handed over with documentation.
              </p>
              {[
                { label: "Discover", desc: "Deep-dive into the target workflow with your team." },
                { label: "Design", desc: "Architect the automation logic and integration points." },
                { label: "Build", desc: "Implement using the right tools for your stack." },
                { label: "Hand Over", desc: "Train your team and document everything." },
              ].map((s, i) => (
                <div key={s.label} className="flex items-start gap-4 mb-6 last:mb-0">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "#e7deff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>{s.label}: </span>
                    <span style={{ color: "#494455" }}>{s.desc}</span>
                  </div>
                </div>
              ))}
              <div className="mt-10 flex items-center gap-6">
                <span className="text-2xl font-extrabold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>From $3,000/workflow</span>
                <Link href="/contact#consulting" className="btn-primary-gradient inline-block px-8 py-3 rounded-xl text-white font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Discuss a Build
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="p-10 rounded-3xl" style={{ backgroundColor: "#151c27", boxShadow: "0 40px 80px rgba(21,28,39,0.12)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ fontFamily: "Manrope, sans-serif", color: "#959cb1" }}>
                Sample: Lead Capture Automation
              </p>
              {[
                { label: "Form Submission", status: "Live", pct: 100 },
                { label: "CRM Enrichment", status: "Live", pct: 88 },
                { label: "Qualification Score", status: "Live", pct: 75 },
                { label: "Sales Alert + Follow-up", status: "Live", pct: 62 },
                { label: "Reporting Dashboard", status: "Building", pct: 30 },
              ].map((row) => (
                <div key={row.label} className="mb-5 last:mb-0">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: row.status === "Live" ? "#ffffff" : "#494455", fontFamily: "Manrope, sans-serif" }}>{row.label}</span>
                    <span className="text-xs" style={{ color: row.status === "Live" ? "#ccbdff" : "#494455", fontFamily: "Manrope, sans-serif" }}>{row.status}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: "#2a313d" }}>
                    <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.status === "Live" ? "linear-gradient(90deg, #521acf, #6b3fe7)" : "#353943" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE 4: AI RETAINER ────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6" style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}>
                Ongoing Partnership
              </span>
              <h2 className="text-5xl font-extrabold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}>
                AI Retainer
              </h2>
              <p className="text-xl leading-relaxed mb-8" style={{ color: "#494455" }}>
                AI doesn&apos;t stand still and neither should your systems. A monthly retainer keeps
                your automations optimised, adds new capabilities as your business grows, and
                gives you direct access to expert support when you need it.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Monthly optimisation reviews and performance reporting",
                  "New workflow additions as your needs evolve",
                  "Priority access to new AI tools and integrations",
                  "Direct access to Michael — no account managers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span style={{ color: "#151c27" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-extrabold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7" }}>From $1,000/month</span>
                <Link href="/contact#consulting" className="btn-primary-gradient inline-block px-8 py-3 rounded-xl text-white font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Discuss Retainer
                </Link>
              </div>
            </div>
            {/* Stat card */}
            <div className="p-12 rounded-3xl text-center" style={{ backgroundColor: "#e7eeff" }}>
              <div className="text-7xl font-black mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7", letterSpacing: "-0.04em" }}>
                94%
              </div>
              <div className="text-lg font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                Client Retention Rate
              </div>
              <p style={{ color: "#494455" }}>
                Once AI is working for your business, you won&apos;t want to go back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="pb-32 px-4">
        <div className="container">
          <div className="rounded-3xl py-20 px-8 text-center relative overflow-hidden" style={{ backgroundColor: "#151c27" }}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ background: "rgba(107,63,231,0.2)", filter: "blur(80px)" }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em" }}>
                Ready to Architect Your Future?
              </h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#959cb1" }}>
                Book a diagnostic call to discover how ProjxAI can transform your operations.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/contact#consulting" className="btn-primary-gradient inline-block px-10 py-4 rounded-xl font-bold text-lg text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.4)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Schedule Consultation
                </Link>
                <Link href="/contact" className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}>
                  General Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
