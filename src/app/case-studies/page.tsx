import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | ProjxAI — AI Implementation Results",
  description:
    "Real AI workflow results from Australian SMEs — anonymised examples showing what happens when you implement AI that actually fits your business.",
  openGraph: {
    title: "Case Studies | ProjxAI",
    description:
      "Real AI implementation results from Australian SMEs. Practical workflows, measurable outcomes.",
    url: "https://www.projxai.com.au/case-studies",
  },
};

// ── Workflow example cards (to be filled with real engagements) ───────────────

const WORKFLOW_EXAMPLES = [
  {
    industry: "eCommerce & Retail",
    challenge: "After-hours leads going cold overnight",
    solution: "AI Lead Qualification + Response System",
    outcome: "Lead response time reduced from 14 hours to under 3 minutes. Enquiry-to-booking conversion increased.",
    metrics: [
      { label: "Response time", before: "14 hrs", after: "< 3 min" },
      { label: "Leads followed up", before: "68%", after: "100%" },
    ],
    tags: ["Lead Automation", "After-Hours"],
    status: "example" as const,
  },
  {
    industry: "Professional Services",
    challenge: "Manual quote generation taking 2–3 hours per proposal",
    solution: "AI Proposal & Quote Generator",
    outcome:
      "Proposals generated in minutes from a short brief. Consistent formatting, personalised detail, professional output every time.",
    metrics: [
      { label: "Proposal time", before: "2–3 hrs", after: "12 min" },
      { label: "Proposals sent/week", before: "4", after: "14" },
    ],
    tags: ["Content Automation", "Sales"],
    status: "example" as const,
  },
  {
    industry: "Trades & Service",
    challenge: "Same 40 customer questions answered repeatedly across email and phone",
    solution: "AI Customer Knowledge Base + Chat Assistant",
    outcome:
      "Common enquiries handled automatically 24/7. Office team freed from repeat questions; focus shifted to booking and scheduling.",
    metrics: [
      { label: "Repeat enquiries handled", before: "Manual", after: "Automated" },
      { label: "Hours saved/week", before: "—", after: "~8 hrs" },
    ],
    tags: ["Customer Service", "Knowledge Base"],
    status: "example" as const,
  },
  {
    industry: "Marketing & Advertising",
    challenge: "Weekly reporting taking half a day to compile across 6 platforms",
    solution: "AI Reporting Aggregator + Summary Generator",
    outcome:
      "One automated pipeline pulls data from all platforms, generates a plain-English performance summary, and sends it to the client every Monday morning.",
    metrics: [
      { label: "Report production", before: "4 hrs", after: "Automated" },
      { label: "Client reports/month", before: "4", after: "8" },
    ],
    tags: ["Data Automation", "Reporting"],
    status: "example" as const,
  },
];

function WorkflowCard({
  example,
}: {
  example: (typeof WORKFLOW_EXAMPLES)[0];
}) {
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 24px rgba(21,28,39,0.06)",
      }}
    >
      {/* Card header */}
      <div
        className="px-8 py-6"
        style={{ borderBottom: "1.5px solid #f0f3ff" }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: "#f0f3ff",
              color: "#6B3FE7",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {example.industry}
          </span>
          {example.status === "example" && (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: "#fff8f0",
                color: "#e57c00",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Illustrative example
            </span>
          )}
        </div>
        <h3
          className="text-xl font-extrabold mb-1"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#151c27",
            letterSpacing: "-0.01em",
          }}
        >
          {example.solution}
        </h3>
        <p
          className="text-sm"
          style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
        >
          Challenge: {example.challenge}
        </p>
      </div>

      {/* Metrics */}
      <div className="px-8 py-6" style={{ borderBottom: "1.5px solid #f0f3ff" }}>
        <div className="grid grid-cols-2 gap-4">
          {example.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl p-4" style={{ backgroundColor: "#f9f9ff" }}>
              <div
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
              >
                {m.label}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm line-through"
                  style={{ color: "#b8b4c4", fontFamily: "Manrope, sans-serif" }}
                >
                  {m.before}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="#6B3FE7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="text-base font-bold"
                  style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {m.after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="px-8 py-6">
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
        >
          {example.outcome}
        </p>
        <div className="flex flex-wrap gap-2">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "#e7eeff",
                color: "#6B3FE7",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
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
              Results
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
              What AI actually{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                delivers.
              </span>
            </h1>

            <p
              className="text-lg max-w-xl leading-relaxed mb-6"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              Real workflow implementations and their measurable outcomes.
              Australian businesses, practical AI, concrete results.
            </p>

            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              style={{
                backgroundColor: "#fff8f0",
                border: "1px solid #fde8c8",
                color: "#8a5000",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>
                Examples below are illustrative. Real client results will be
                published here as engagements complete.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW EXAMPLES ────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WORKFLOW_EXAMPLES.map((example) => (
              <WorkflowCard key={example.solution} example={example} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE MEASURE ─────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
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
              What we measure, always
            </h2>
            <p
              className="text-lg mb-12"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              We don&apos;t declare success based on implementation alone. Every
              engagement has defined success metrics agreed upfront.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  label: "Time saved",
                  desc: "Hours recovered per week from automated tasks — converted to dollar value at your team rate.",
                },
                {
                  label: "Response speed",
                  desc: "How quickly leads, enquiries, and customer messages are handled — before vs. after.",
                },
                {
                  label: "Volume handled",
                  desc: "How many interactions, documents, or processes the AI system processes per week.",
                },
                {
                  label: "Conversion impact",
                  desc: "Where measurable: effect on lead-to-booking or enquiry-to-sale rates.",
                },
                {
                  label: "Error reduction",
                  desc: "Fewer missed follow-ups, formatting errors, or dropped tasks compared to manual processes.",
                },
                {
                  label: "Team capacity freed",
                  desc: "What your team can now focus on that was previously consumed by repetitive work.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 16px rgba(21,28,39,0.05)",
                  }}
                >
                  <div
                    className="shrink-0 w-2 rounded-full"
                    style={{ backgroundColor: "#6B3FE7" }}
                  />
                  <div>
                    <h3
                      className="font-bold mb-1.5"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        color: "#151c27",
                      }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
                    >
                      {item.desc}
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
            Ready to build your own result?
          </h2>
          <p
            className="text-lg mb-10 max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Manrope, sans-serif" }}
          >
            Start with the free AI Opportunity Score to see exactly where your
            business stands — then book a Clarity Call to turn it into a plan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools/ai-opportunity-score"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base transition-all hover:shadow-[0_20px_50px_rgba(107,63,231,0.4)]"
              style={{
                backgroundColor: "#6B3FE7",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Take the AI Opportunity Score →
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base border transition-colors hover:bg-white/10"
              style={{
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Book a Clarity Call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
