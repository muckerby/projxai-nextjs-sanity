import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Roadmap Sprint | ProjxAI",
  description:
    "From audit findings to a 90-day action plan in 4 weeks. Process mapping, tool selection, phased roadmap, and Business case projections — built specifically for your business.",
  openGraph: {
    title: "AI Roadmap Sprint | ProjxAI",
    description:
      "Turn your AI opportunity findings into a sequenced 90-day implementation plan built for the way your business actually operates.",
    url: "https://www.projxai.com.au/services/ai-implementation",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Full business process mapping across operations, sales, marketing, and admin",
  "AI tool evaluation and selection matched to your existing stack and budget",
  "90-day phased implementation roadmap with week-by-week milestones",
  "Business case projections for each recommended initiative",
  "Team change management plan — how to bring your people with you",
  "30-day post-delivery check-in included",
];

export default function AiImplementationPage() {
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

      {/* What is included */}
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
                  body: "We understand your business goals and confirm the Roadmap Sprint is the right next step — either following an Opportunity Audit or as a standalone engagement.",
                },
                {
                  step: "Discovery & Mapping (Weeks 1–2)",
                  body: "We map your operations in detail across all core functions — how work moves, where data lives, where time is lost, and where AI can realistically accelerate results.",
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

      {/* Related */}
      <section className="bg-gray-light py-12 dark:bg-bg-color-dark">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h3 className="mb-5 text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              Often paired with
            </h3>
            <ul className="space-y-2 text-base" style={{ color: "#494455" }}>
              <li>
                <Link href="/services/ai-consulting" className="hover:underline" style={{ color: "#6B3FE7" }}>
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
