import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Opportunity Audit | ProjxAI",
  description:
    "Know exactly where AI fits in your business — before you spend a cent. A structured assessment with a prioritised opportunity report delivered within 48 hours.",
  openGraph: {
    title: "AI Opportunity Audit | ProjxAI",
    description:
      "Know exactly where AI fits in your business before spending a cent. Prioritised opportunity report within 48 hours.",
    url: "https://www.projxai.com.au/services/ai-consulting",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Structured 2-hour working session (remote or in person)",
  "End-to-end business process mapping across operations, sales, and admin",
  "Data readiness assessment — where your data lives and how AI-ready it is",
  "Team capability and change readiness review",
  "Prioritised AI opportunity register — 3 to 5 use cases ranked by potential impact and implementation effort",
  "Written report delivered within 48 hours",
  "Optional add-on: AI Tool Stack Review — audit of tools you already pay for that have unused AI features",
];

export default function AiConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              Start Here
            </span>
            <h1
              className="mb-5 font-extrabold leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.03em", color: "#151c27" }}
            >
              AI Opportunity Audit
            </h1>
            <p className="mb-4 text-xl font-medium" style={{ color: "#151c27" }}>
              Know exactly where AI fits in your business — before you spend a cent.
            </p>
            <p className="mb-8 text-lg leading-relaxed" style={{ color: "#494455" }}>
              Most businesses that try AI and fail don&apos;t fail because they picked the wrong tool. They fail because they started building before they understood their own operations, data, and team readiness. The AI Opportunity Audit gives you that foundation — a clear, expert assessment of where AI can genuinely help, and in what order.
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
                  body: "We learn about your business and confirm the audit is the right starting point. You leave with 3 insights regardless of whether we work together.",
                },
                {
                  step: "Audit Session (2 hours)",
                  body: "A structured working session — remote or in person. We map your operations, review your tools and data, and assess your team's readiness. You answer; we listen and document.",
                },
                {
                  step: "Written Report (within 48 hours)",
                  body: "3 to 5 prioritised AI opportunities, each with a potential impact assessment and implementation effort score. Written in plain English — no jargon.",
                },
                {
                  step: "Optional: Proceed to Roadmap Sprint",
                  body: "Many clients use the report to move straight into a sequenced 90-day implementation plan. Quoted separately based on the opportunities identified.",
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
              The natural next steps
            </h3>
            <ul className="space-y-2 text-base" style={{ color: "#494455" }}>
              <li>
                <Link href="/services/ai-implementation" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  AI Roadmap Sprint — turn your audit into a 90-day action plan →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-content" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  Pilot Workflow Build — build and launch your first AI workflow →
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
              Ready to find out where AI fits?
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Start with a free 15-minute Clarity Call. We will confirm the audit is the right starting point before you commit to anything.
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
