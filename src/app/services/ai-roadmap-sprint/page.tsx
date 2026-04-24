import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Roadmap Sprint | ProjxAI",
  description:
    "From audit findings to a 90-day action plan in 4 weeks. Process mapping, tool selection, phased roadmap, and business case projections — built specifically for your business.",
  openGraph: {
    title: "AI Roadmap Sprint | ProjxAI",
    description:
      "Turn your AI opportunity findings into a sequenced 90-day implementation plan built for the way your business actually operates.",
    url: "https://www.projxai.com.au/services/ai-roadmap-sprint",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Full business process mapping across operations, sales, marketing, and admin",
  "AI tool evaluation and selection matched to your existing stack and budget",
  "90-day phased implementation roadmap with week-by-week milestones",
  "Business case projections for each recommended initiative",
  "Team change management plan — how to bring your people with you",
  "60-minute walkthrough session when the roadmap is delivered",
  "30-day post-delivery check-in included at no extra cost",
];

const faqs = [
  {
    q: "Do I need an AI Opportunity Audit before the Roadmap Sprint?",
    a: "Not necessarily. If you already have a clear picture of where AI can help — from a previous assessment or your own research — the Sprint can start from that point. We'll confirm on the Clarity Call.",
  },
  {
    q: "What does the 90-day roadmap actually look like?",
    a: "A written plan in plain English — week-by-week milestones, tool recommendations with rationale, business case estimates for each initiative, and a change management section covering how to bring your team along. No jargon, no padding.",
  },
  {
    q: "How much of my team's time does this require?",
    a: "The main input is a series of discovery sessions across weeks 1 and 2 — typically 2 to 3 hours total from you and relevant team members. We do the rest.",
  },
  {
    q: "What happens after the 4 weeks?",
    a: "You receive the roadmap and a 30-day check-in is included. From there, many clients move into a Pilot Workflow Build to start executing — or use the roadmap with their own team.",
  },
];

export default function AiRoadmapSprintPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              Plan
            </span>
            <h1
              className="mb-5 font-extrabold leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.03em", color: "#151c27" }}
            >
              AI Roadmap Sprint
            </h1>
            <p className="mb-4 text-xl font-medium" style={{ color: "#151c27" }}>
              From audit findings to a 90-day action plan in 4 weeks.
            </p>
            <p className="mb-8 text-lg leading-relaxed" style={{ color: "#494455" }}>
              Knowing what&apos;s possible with AI isn&apos;t the same as knowing what to do, in what order, with the team and tools you actually have. The Roadmap Sprint takes your highest-value AI opportunities and turns them into a sequenced, practical plan — one your business can actually execute without disrupting operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact#consulting"
                className="inline-block rounded-xl px-8 py-4 text-base font-bold text-white duration-300 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Book a Clarity Call →
              </Link>
              <Link
                href="/services"
                className="inline-block rounded-xl px-8 py-4 text-base font-bold duration-300 hover:opacity-80"
                style={{ border: "2px solid #e7deff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
              >
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              What you get
            </h2>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base" style={{ color: "#494455" }}>
                  <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#6B3FE7" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              How it works
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "Clarity Call (Free, 15 min)",
                  body: "We confirm the Roadmap Sprint is the right next step — either following an Opportunity Audit or as a standalone engagement.",
                },
                {
                  step: "Discovery & Mapping (Weeks 1–2)",
                  body: "We map your operations in detail across all core functions — how work moves, where data lives, where time is lost, and where AI can realistically accelerate results. Light on your team's time.",
                },
                {
                  step: "Roadmap Delivery (Weeks 3–4)",
                  body: "A 60-minute working session to walk through your 90-day plan. Written in plain English. Every recommendation includes a rationale, a tool, and a projected outcome.",
                },
                {
                  step: "30-Day Check-in",
                  body: "We follow up one month after delivery to review progress and help you stay on track. Included at no extra cost.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: "#e7deff", color: "#6B3FE7" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                      {item.step}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "#494455" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              Common questions
            </h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {faq.q}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#494455" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-12 dark:bg-gray-dark">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h3 className="mb-5 text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              Often paired with
            </h3>
            <ul className="space-y-2 text-base" style={{ color: "#494455" }}>
              <li>
                <Link href="/services/ai-opportunity-audit" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  AI Opportunity Audit — start with a structured assessment first →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-content" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  Pilot Workflow Build — take the roadmap into your first live build →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Ready for a plan that actually gets used?
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Start with a free 15-minute Clarity Call. We will confirm the Roadmap Sprint is the right next step before you commit to anything.
            </p>
            <Link
              href="/contact#consulting"
              className="inline-block rounded-xl px-8 py-4 text-base font-bold text-white duration-300 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book a Clarity Call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
