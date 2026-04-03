import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Audit | ProjxAI",
  description:
    "Understand exactly where AI fits in your business before spending a dollar on tools. A structured 2-hour assessment with a prioritised opportunity report.",
  openGraph: {
    title: "AI Readiness Audit | ProjxAI",
    description:
      "Understand exactly where AI fits in your business before spending a dollar on tools. A structured 2-hour assessment with a prioritised opportunity report.",
    url: "https://www.projxai.com.au/services/ai-consulting",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "2-hour structured assessment of your current workflows and tools",
  "Data audit — where your business data lives and how AI-ready it is",
  "Team capacity review — who will manage and use AI day to day",
  "Prioritised opportunity report — 3 to 5 specific AI use cases ranked by ROI potential and ease of implementation",
  "Optional add-on: AI Tool Stack Review — audit of tools you already pay for that have unused AI features ($750 bundled)",
];

export default function AiConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Readiness Audit
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              AI Readiness Audit
            </h1>
            <p className="mb-4 text-xl font-medium text-black dark:text-white">
              Understand exactly where AI fits in your business before spending a dollar on tools.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Most businesses that fail at AI do not fail because they chose the wrong tool. They fail because they did not understand their own processes, data, or team readiness before they started.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book Your Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              What is included
            </h2>
            <ul className="space-y-4">
              {included.map((item) => (
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

      {/* How it works */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              How it works
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "Discovery Call (Free, 30 min)",
                  body: "We learn about your business and confirm the audit is the right starting point. You leave with 3 insights regardless of whether we work together.",
                },
                {
                  step: "2-Hour Assessment",
                  body: "A structured working session — remote or in person. We go through your operations, tools, data, and team. You answer questions; we listen and map.",
                },
                {
                  step: "Opportunity Report Delivery",
                  body: "Within 3 business days, you receive a written report with 3 to 5 prioritised AI opportunities, ranked by ROI potential and implementation effort.",
                },
                {
                  step: "Optional: Continue to Implementation",
                  body: "Many clients use the report to move straight to implementation. Quoted separately based on the opportunities identified.",
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

      {/* Investment */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white">
              Investment
            </h2>
            <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Starting from <strong className="text-black dark:text-white">$750 AUD</strong>. Includes the 2-hour assessment and written opportunity report.
            </p>
            <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Optional add-on: AI Tool Stack Review bundled at $750. Final investment confirmed after discovery call based on business complexity.
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
              Next steps after your audit
            </h3>
            <ul className="space-y-2 text-base text-body-color dark:text-body-color-dark">
              <li>
                <Link href="/services/ai-implementation" className="text-primary hover:underline">
                  AI Strategy &amp; Roadmap — 90-day plan →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-content" className="text-primary hover:underline">
                  AI Workflow Implementation — build it →
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
              Ready to find out where AI fits in your business?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Start with a free 30-minute discovery call. No obligation. We will confirm the audit is the right starting point before you spend anything.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book Your Audit →
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
