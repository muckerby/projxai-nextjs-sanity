import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | ProjxAI — How Our Engagements Work",
  description:
    "Transparent pricing philosophy for ProjxAI AI consulting engagements. Fixed-scope projects, from-pricing on core offers, retainers for ongoing work.",
  openGraph: {
    title: "Pricing | ProjxAI",
    description:
      "How ProjxAI pricing works — from-pricing on core offers, fixed scope, clear outcomes.",
    url: "https://www.projxai.com.au/pricing",
  },
};

const OFFERS = [
  {
    name: "AI Opportunity Audit",
    from: "$750",
    duration: "1–2 days",
    description:
      "A structured assessment of your business identifying where AI will deliver the clearest return. Includes a written findings report and prioritised recommendation list.",
    includes: [
      "Pre-engagement questionnaire",
      "60-minute discovery session",
      "Written AI Opportunity Report",
      "Top 3 prioritised use cases with effort/return matrix",
      "Recommended implementation sequence",
    ],
    cta: "/services/ai-consulting",
    ctaLabel: "Learn more →",
  },
  {
    name: "AI Roadmap Sprint",
    from: "$2,500",
    duration: "1 week",
    description:
      "Deep-dive strategy engagement that maps your 12-month AI implementation plan — tooling, data, sequencing, resource requirements, and expected outcomes.",
    includes: [
      "Full business and data landscape review",
      "Tool stack recommendation",
      "12-month implementation roadmap",
      "Risk and dependency mapping",
      "Executive briefing presentation",
    ],
    cta: "/services/ai-implementation",
    ctaLabel: "Learn more →",
  },
  {
    name: "Pilot Workflow Build",
    from: "$3,000",
    duration: "2–4 weeks",
    description:
      "End-to-end build and deployment of a single AI workflow — from scoping through testing to handover. Fixed scope, defined outcome.",
    includes: [
      "Workflow scoping and design",
      "Integration setup and configuration",
      "Testing and quality assurance",
      "Team training and documentation",
      "30-day post-launch support",
    ],
    cta: "/services/ai-content",
    ctaLabel: "Learn more →",
  },
  {
    name: "Managed AI Operations",
    from: "$1,000/month",
    duration: "Ongoing",
    description:
      "A retainer that keeps your AI systems running, improving, and expanding. Includes monitoring, optimisation, priority support, and regular strategy reviews.",
    includes: [
      "System monitoring and maintenance",
      "Monthly performance review",
      "Prompt and workflow optimisation",
      "Priority support response",
      "Quarterly roadmap refresh",
    ],
    cta: "/services/ai-automation",
    ctaLabel: "Learn more →",
  },
  {
    name: "AI Infrastructure & Hosting",
    from: "$1,500",
    duration: "Project-based",
    description:
      "Private AI deployment for businesses where data sovereignty is a hard requirement. Self-hosted language models, custom APIs, no third-party data exposure.",
    includes: [
      "Infrastructure architecture design",
      "Private LLM deployment",
      "Custom API build and integration",
      "Security and access configuration",
      "Documentation and handover",
    ],
    cta: "/services/ai-infrastructure",
    ctaLabel: "Learn more →",
  },
];

const PRICE_FACTORS = [
  {
    label: "Number of systems to integrate",
    desc: "Connecting to one CRM is simpler than connecting to five platforms — each integration has its own complexity.",
  },
  {
    label: "Data quality and preparation",
    desc: "Messy or unstructured data takes more work to prepare. Clean, centralised data is faster to work with.",
  },
  {
    label: "Approval and compliance requirements",
    desc: "Regulated industries or businesses with strict approval workflows require additional design care.",
  },
  {
    label: "Handover depth and training",
    desc: "Some teams want full autonomy; others prefer us to manage ongoing. Training and documentation scale accordingly.",
  },
  {
    label: "Ongoing support needs",
    desc: "Ad-hoc support costs more than a retainer; a retainer with defined scope costs more than monitoring only.",
  },
  {
    label: "Workflow complexity",
    desc: "A simple trigger-action automation is faster to build than a multi-step pipeline with conditional logic.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-14" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[760px]">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{
                backgroundColor: "#dce2f3",
                color: "#5e6573",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Pricing
            </span>

            <h1
              className="font-extrabold leading-[1.0] mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                letterSpacing: "-0.03em",
                color: "#151c27",
              }}
            >
              Transparent pricing.{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                No surprises.
              </span>
            </h1>

            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              We work with fixed-scope engagements wherever possible so you know
              what you&apos;re getting and what it costs before you commit. The
              prices below are starting points — your Clarity Call will give you
              a clear number.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-[780px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Fixed scope where possible",
                  desc: "We define the deliverable clearly before we start. You know what you&apos;re paying for.",
                },
                {
                  title: "Add-ons for complexity",
                  desc: "Simple engagements start at the from-price. More integrations or data complexity adds to scope.",
                },
                {
                  title: "Retainers for ongoing value",
                  desc: "Ongoing work is structured as a monthly retainer with defined scope — not open-ended hourly billing.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 16px rgba(21,28,39,0.05)",
                  }}
                >
                  <div
                    className="w-1.5 h-6 rounded-full mb-4"
                    style={{ backgroundColor: "#6B3FE7" }}
                  />
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      color: "#151c27",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: p.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERS ───────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <h2
            className="text-3xl font-extrabold mb-4 text-center"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "#151c27",
              letterSpacing: "-0.02em",
            }}
          >
            Core engagements
          </h2>
          <p
            className="text-center mb-14 text-lg"
            style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
          >
            All prices shown are from-pricing in AUD (exc. GST).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-w-[1100px] mx-auto">
            {OFFERS.map((offer, i) => {
              const isHighlighted = i === 2; // Pilot Workflow Build
              return (
                <div
                  key={offer.name}
                  className="rounded-3xl flex flex-col"
                  style={{
                    backgroundColor: isHighlighted ? "#6B3FE7" : "#ffffff",
                    boxShadow: isHighlighted
                      ? "0 20px 60px rgba(107,63,231,0.3)"
                      : "0 2px 24px rgba(21,28,39,0.06)",
                    position: "relative",
                  }}
                >
                  {isHighlighted && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#6B3FE7",
                        fontFamily: "Manrope, sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Most popular start
                    </div>
                  )}

                  <div className="p-8 pb-0">
                    {/* Duration */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                      style={{
                        backgroundColor: isHighlighted
                          ? "rgba(255,255,255,0.2)"
                          : "#f0f3ff",
                        color: isHighlighted ? "#fff" : "#6B3FE7",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {offer.duration}
                    </span>

                    {/* Name */}
                    <h3
                      className="text-xl font-extrabold mb-1"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        color: isHighlighted ? "#ffffff" : "#151c27",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {offer.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-5">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isHighlighted
                            ? "rgba(255,255,255,0.7)"
                            : "#7a7487",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        from
                      </span>
                      <span
                        className="text-3xl font-extrabold"
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          color: isHighlighted ? "#ffffff" : "#151c27",
                        }}
                      >
                        {offer.from}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{
                        color: isHighlighted
                          ? "rgba(255,255,255,0.8)"
                          : "#494455",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {offer.description}
                    </p>
                  </div>

                  {/* Includes */}
                  <div
                    className="px-8 pb-8 flex-1 flex flex-col"
                    style={{
                      borderTop: isHighlighted
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1.5px solid #f0f3ff",
                    }}
                  >
                    <div className="pt-6 flex-1">
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-4"
                        style={{
                          color: isHighlighted
                            ? "rgba(255,255,255,0.6)"
                            : "#7a7487",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        Includes
                      </p>
                      <ul className="space-y-2.5 mb-8">
                        {offer.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm"
                            style={{
                              color: isHighlighted
                                ? "rgba(255,255,255,0.9)"
                                : "#494455",
                              fontFamily: "Manrope, sans-serif",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="shrink-0 mt-0.5"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke={isHighlighted ? "#ccbdff" : "#6B3FE7"}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={offer.cta}
                      className="block w-full text-center rounded-xl py-3.5 font-bold text-sm transition-all"
                      style={{
                        backgroundColor: isHighlighted
                          ? "#ffffff"
                          : "transparent",
                        color: isHighlighted ? "#6B3FE7" : "#6B3FE7",
                        border: isHighlighted
                          ? "none"
                          : "1.5px solid #6B3FE7",
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      {offer.ctaLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT CHANGES PRICE ───────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-[780px] mx-auto">
            <h2
              className="text-3xl font-extrabold mb-4"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#151c27",
                letterSpacing: "-0.02em",
              }}
            >
              What changes the price
            </h2>
            <p
              className="mb-10 text-lg"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              From-pricing means the simplest version of that engagement. These
              are the factors that add scope — and therefore cost.
            </p>
            <div className="space-y-4">
              {PRICE_FACTORS.map((f) => (
                <div
                  key={f.label}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 16px rgba(21,28,39,0.04)",
                  }}
                >
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "#6B3FE7" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        color: "#151c27",
                      }}
                    >
                      {f.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#151c27" }}>
        <div className="container text-center">
          <h2
            className="text-3xl font-extrabold mb-4"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Get a clear number before you commit
          </h2>
          <p
            className="text-lg mb-10 max-w-lg mx-auto"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Book a free 15-minute Clarity Call. We&apos;ll scope your situation,
            tell you which engagement fits, and give you a firm price — no
            obligation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base transition-all hover:shadow-[0_20px_50px_rgba(107,63,231,0.4)]"
              style={{
                backgroundColor: "#6B3FE7",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Book a Free Clarity Call →
            </Link>
            <Link
              href="/tools/ai-opportunity-score"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base border transition-colors hover:bg-white/10"
              style={{
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Take the free AI Opportunity Score first →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
