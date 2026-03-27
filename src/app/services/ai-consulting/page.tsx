import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Consulting & Strategy — ProjxAI",
  description:
    "Not sure where AI fits in your business? We audit your operations and deliver a practical implementation roadmap built around your specific business.",
};

export default function AiConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Consulting &amp; Strategy
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              You know AI is important. We&apos;ll show you exactly where to start.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Most Australian SMEs know they need to act on AI — but don&apos;t know what to do first. We cut through the noise and give you a clear, practical roadmap built around your specific business.
            </p>
            <Link
              href="/work-with-us"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book a free discovery call →
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">
              Sound familiar?
            </h2>
            <ul className="mb-8 space-y-4">
              {[
                "You've read about AI but struggle to see where it fits in your specific business",
                "You've tried a few tools but haven't seen the results you expected",
                "Your competitors seem to be moving faster and you're not sure why",
                "You don't have an in-house tech team — and don't want to need one",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-body-color dark:text-body-color-dark">
                  <svg className="text-primary mt-0.5 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              This is where most Australian SMEs sit right now. Not behind because they&apos;re not smart or motivated — behind because the AI landscape is noisy, confusing, and full of solutions looking for problems. Our job is to cut through that and find what actually works for your business.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              What&apos;s included in an AI Consulting engagement
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "AI Opportunity Audit",
                  body: "We map your current operations, identify the 3-5 highest-value AI opportunities, and score them by effort vs. impact. You'll know exactly where to start and why.",
                },
                {
                  title: "Implementation Roadmap",
                  body: "A prioritised 90-day plan with specific tools, workflows, and milestones. Written in plain English — not a tech spec. Something your team can actually act on.",
                },
                {
                  title: "Tool & Platform Recommendations",
                  body: "We recommend specific tools based on your budget, your team's technical capability, and your business goals. No vendor bias — we recommend what actually works.",
                },
                {
                  title: "90-Day Check-in",
                  body: "We follow up at 90 days to review progress, troubleshoot blockers, and adjust the roadmap based on what you've learned. Implementation is ongoing, not a one-off event.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-6">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              The process
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "Step 1 — Discovery Call (Free, 30 min)",
                  body: "We learn about your business, your goals, and your current AI experience. You leave with 3 actionable insights regardless of whether we work together.",
                },
                {
                  step: "Step 2 — Business Audit (3–5 business days)",
                  body: "We analyse your operations in depth — your processes, your team structure, your current tools, and your competitive landscape. We identify where AI can deliver measurable results.",
                },
                {
                  step: "Step 3 — Roadmap Delivery",
                  body: "We present your AI Implementation Roadmap in a 60-minute working session — walking through priorities, rationale, and next steps. You receive the full document to keep.",
                },
                {
                  step: "Step 4 — Optional: Implementation Support",
                  body: "Many clients continue with us for implementation — building the tools, workflows, and systems identified in the roadmap. Quoted separately based on scope.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                      {item.step}
                    </h3>
                    <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">
              This engagement is right for you if...
            </h2>
            <ul className="space-y-4">
              {[
                "You're an SME owner (5–100 staff) who wants a clear AI strategy without the consultant jargon",
                "You're an agency that wants to understand how to offer AI services to your own clients",
                "You've tried AI tools independently and haven't seen the results you expected",
                "You want an outside perspective on where your business is losing time and money to manual processes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-body-color dark:text-body-color-dark">
                  <svg className="text-primary mt-0.5 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white">
              Investment
            </h2>
            <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              AI Consulting &amp; Strategy engagements start from <strong className="text-black dark:text-white">$1,500 AUD</strong>. Final investment depends on business complexity and engagement scope. All projects are quoted after the free discovery call — no surprises.
            </p>
            <p className="text-sm text-body-color dark:text-body-color-dark">
              GST applicable. ABN 80 398 642 662.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-12 dark:bg-gray-dark">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white">
              Related resources
            </h3>
            <ul className="space-y-2 text-base text-body-color dark:text-body-color-dark">
              <li>
                <Link href="/tools/roas-calculator" className="text-primary hover:underline">
                  Free tool: ROAS Calculator →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-implementation" className="text-primary hover:underline">
                  Next step: AI Implementation →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">
              Ready to get clarity on your AI strategy?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Book a free 30-minute discovery call. No obligation, no sales pitch — just a focused conversation about where AI can genuinely help your business.
            </p>
            <Link
              href="/work-with-us"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book your free call →
            </Link>
            <p className="mt-4 text-sm text-white/50">
              Michael Collicoat | ProjxAI | Brisbane, QLD | Response within 1 business day
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
