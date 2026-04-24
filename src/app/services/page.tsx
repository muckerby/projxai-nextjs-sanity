import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services for Australian SMEs | ProjxAI",
  description:
    "A clear path from understanding to implementation. AI Opportunity Audit, Roadmap Sprint, Pilot Workflow Build, and Managed AI Operations — built for Australian businesses.",
  openGraph: {
    title: "AI Services for Australian SMEs | ProjxAI",
    description:
      "Practical AI services for Australian SMEs. Audit → Roadmap → Build → Operate.",
    url: "https://www.projxai.com.au/services",
  },
};

const selfSelect = [
  {
    label: "I'm not sure where AI fits in my business",
    action: "Start with the AI Opportunity Audit →",
    href: "/services/ai-opportunity-audit",
  },
  {
    label: "I know what I want to do but need a plan",
    action: "Start with the AI Roadmap Sprint →",
    href: "/services/ai-roadmap-sprint",
  },
  {
    label: "I have a workflow I want to automate now",
    action: "Start with the Pilot Workflow Build →",
    href: "/services/ai-content",
  },
  {
    label: "I have AI running but need it maintained and grown",
    action: "Start with Managed AI Operations →",
    href: "/services/ai-automation",
  },
];

const ladder = [
  {
    step: "01",
    badge: "Assess",
    name: "AI Opportunity Audit",
    href: "/services/ai-opportunity-audit",
    tagline: "Know exactly where AI fits — before you spend a cent.",
    desc: "A structured 2-hour assessment of your operations, data, and team readiness. You walk away with a prioritised register of 3 to 5 AI use cases ranked by potential impact and implementation effort. Written report within 48 hours.",
    outcomes: [
      "Business process mapping across all core functions",
      "Data readiness and quality assessment",
      "Prioritised AI opportunity register",
      "Written report within 48 hours",
    ],
    accent: "#6B3FE7",
    bg: "#f9f9ff",
  },
  {
    step: "02",
    badge: "Plan",
    name: "AI Roadmap Sprint",
    href: "/services/ai-roadmap-sprint",
    tagline: "From audit findings to a 90-day action plan in 4 weeks.",
    desc: "A focused 4-week engagement that turns your highest-value AI opportunities into a sequenced, practical roadmap — with tool recommendations, business case projections, and a change management plan your team can actually follow.",
    outcomes: [
      "Full process mapping across operations, sales, and marketing",
      "AI tool evaluation matched to your existing stack",
      "90-day phased implementation roadmap",
      "30-day post-delivery check-in included",
    ],
    accent: "#6B3FE7",
    bg: "#f0f3ff",
  },
  {
    step: "03",
    badge: "Build",
    name: "Pilot Workflow Build",
    href: "/services/ai-content",
    tagline: "One workflow. Built, tested, and running in your business.",
    desc: "We take your highest-priority workflow from scoping to live — end-to-end build, QA testing against real scenarios, team training, and full documentation. 30-day support from launch day.",
    outcomes: [
      "Written scope before we start building",
      "End-to-end build using Make.com, Zapier, or n8n",
      "Integration with your existing tools",
      "30-day post-launch support",
    ],
    accent: "#6B3FE7",
    bg: "#f9f9ff",
  },
  {
    step: "04",
    badge: "Operate",
    name: "Managed AI Operations",
    href: "/services/ai-automation",
    tagline: "Your AI systems — maintained, optimised, and evolving.",
    desc: "AI systems don't manage themselves. Managed AI Operations gives your business an ongoing partner: monthly performance reviews, workflow optimisation, new tool evaluation, and one new workflow build per quarter.",
    outcomes: [
      "Monthly performance reviews of all active systems",
      "Prompt and workflow optimisation",
      "One new workflow build per quarter",
      "Direct consultant access — no account managers",
    ],
    accent: "#6B3FE7",
    bg: "#f0f3ff",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-16" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              Services
            </span>
            <h1
              className="font-extrabold leading-[1.05] mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              A clear path from{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>understanding to operations.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#494455" }}>
              Every engagement starts with a free 15-minute Clarity Call. No jargon, no vague strategy. Just a structured path from where you are to working AI systems your team actually uses.
            </p>
          </div>
        </div>
      </section>

      {/* ── SELF-SELECTION ────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="mb-2 text-2xl font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
            >
              Where are you starting from?
            </h2>
            <p className="mb-8 text-base" style={{ color: "#494455" }}>
              Pick the statement that sounds most like you and we&apos;ll point you to the right starting point.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selfSelect.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group block rounded-2xl p-6 transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: "#f9f9ff", border: "1.5px solid #e7deff" }}
                >
                  <p className="mb-3 text-base font-medium leading-snug" style={{ color: "#151c27" }}>
                    &ldquo;{item.label}&rdquo;
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#6B3FE7" }}>
                    {item.action}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFER LADDER ─────────────────────────────────────── */}
      <section className="py-8" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
            >
              The full engagement path
            </h2>
            <p className="mt-2 text-base" style={{ color: "#494455" }}>
              Our services are designed to work in sequence — but you can enter at any stage.
            </p>
          </div>
        </div>
      </section>

      {ladder.map((service, idx) => (
        <section key={service.name} className="py-20" style={{ backgroundColor: service.bg }}>
          <div className="container">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
              {/* Copy */}
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-5xl font-extrabold leading-none"
                    style={{ color: "#e7deff", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {service.step}
                  </span>
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{ backgroundColor: "#e7deff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                  >
                    {service.badge}
                  </span>
                </div>
                <h2
                  className="text-4xl font-extrabold mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
                >
                  {service.name}
                </h2>
                <p className="text-lg font-medium mb-4" style={{ color: "#151c27" }}>
                  {service.tagline}
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#494455" }}>
                  {service.desc}
                </p>
                <Link
                  href={service.href}
                  className="inline-block px-7 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Learn more →
                </Link>
              </div>

              {/* Outcomes card */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className="p-8 rounded-3xl"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.06)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-6" style={{ fontFamily: "Manrope, sans-serif", color: "#6B3FE7" }}>
                    What you walk away with
                  </p>
                  <ul className="space-y-4">
                    {service.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-base" style={{ color: "#494455" }}>
                        <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#6B3FE7" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── INFRASTRUCTURE ADD-ON ─────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div
              className="p-10 rounded-3xl flex flex-col md:flex-row gap-10 items-start"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.05)" }}
            >
              <div className="flex-1">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                  style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
                >
                  Add-on
                </span>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                  AI Infrastructure &amp; Hosting
                </h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#494455" }}>
                  For businesses with specific data privacy requirements or who want to run AI workloads locally — we design, set up, and configure the right hosting environment. Often paired with a Pilot Workflow Build or Managed AI Operations engagement.
                </p>
                <Link href="/services/ai-infrastructure" className="font-bold hover:underline" style={{ color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                  Learn more →
                </Link>
              </div>
              <div className="shrink-0 flex flex-col gap-2">
                {["Cloud advisory", "Local AI deployment", "VM & container setup", "Security config"].map((f) => (
                  <span key={f} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: "#f0f3ff", color: "#494455", fontFamily: "Manrope, sans-serif" }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEO COACHING ─────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div
              className="p-10 rounded-3xl flex flex-col md:flex-row gap-10 items-start"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.05)", border: "1.5px solid #e7deff" }}
            >
              <div className="flex-1">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                  style={{ backgroundColor: "rgba(107,63,231,0.1)", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                >
                  Executive Coaching
                </span>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                  Executive AI Operator Program
                </h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#494455" }}>
                  A 6-week 1:1 coaching program for CEOs, founders, and GMs who want to operate AI as a personal productivity tool — without handing their data to a third-party app. No procurement process. Typically bought personally by the executive. From $5,500 + GST.
                </p>
                <Link href="/services/ceo-ai-coaching" className="font-bold hover:underline" style={{ color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                  Learn more →
                </Link>
              </div>
              <div className="shrink-0 flex flex-col gap-2">
                {["Personal AI setup", "6 custom workflows", "Prompt library", "90-day operating plan"].map((f) => (
                  <span key={f} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: "#f0f3ff", color: "#494455", fontFamily: "Manrope, sans-serif" }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ─────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="mb-2 text-2xl font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
            >
              How every engagement starts
            </h2>
            <p className="mb-10 text-base" style={{ color: "#494455" }}>
              Regardless of which service you start with, the first step is always the same.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  n: "1",
                  title: "Free Clarity Call",
                  body: "15 minutes. We ask questions, listen carefully, and tell you honestly which service is the right starting point for where you are now.",
                },
                {
                  n: "2",
                  title: "Scoped engagement",
                  body: "We define exactly what we will deliver, how long it will take, and what we need from you — before any work begins.",
                },
                {
                  n: "3",
                  title: "Delivery and handover",
                  body: "You receive the output: a report, a roadmap, a live workflow, or ongoing support — depending on the engagement. Always documented. Always yours.",
                },
              ].map((item) => (
                <div key={item.n}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold mb-4"
                    style={{ backgroundColor: "#e7deff", color: "#6B3FE7" }}
                  >
                    {item.n}
                  </div>
                  <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="rounded-3xl py-16 px-8 text-center relative overflow-hidden" style={{ backgroundColor: "#151c27" }}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ background: "rgba(107,63,231,0.2)", filter: "blur(80px)" }} />
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-5" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em" }}>
                Not sure where to start?
              </h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#959cb1" }}>
                Book a free 15-minute Clarity Call. We will ask the right questions, tell you honestly where AI fits in your business, and recommend the right starting point — no commitment required.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/contact#consulting"
                  className="inline-block px-10 py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Book a Clarity Call
                </Link>
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
                >
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
