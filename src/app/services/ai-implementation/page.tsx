import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Strategy & Roadmap | ProjxAI",
  description:
    "A 90-day AI adoption plan built around your business, not a template. Full process mapping, tool selection, and week-by-week milestones.",
  openGraph: {
    title: "AI Strategy & Roadmap | ProjxAI",
    description:
      "A 90-day AI adoption plan built around your business, not a template. Full process mapping, tool selection, and week-by-week milestones.",
    url: "https://www.projxai.com.au/services/ai-implementation",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Full business process mapping across operations, marketing, and sales",
  "AI tool evaluation and selection matched to your stack and budget",
  "90-day implementation roadmap with week-by-week milestones",
  "ROI projections for each recommended initiative",
  "Team change management plan",
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
              AI Strategy &amp; Roadmap
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              AI Strategy &amp; Roadmap
            </h1>
            <p className="mb-4 text-xl font-medium text-black dark:text-white">
              A 90-day AI adoption plan built around your business, not a template.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              You know AI can help. But knowing where to start, what to prioritise, and how to sequence it without disrupting your team is where most businesses get stuck.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Get Your Roadmap →
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
                  body: "We understand your business goals, current tools, and where you feel most stuck with AI. No obligation — you leave with clarity either way.",
                },
                {
                  step: "Business Process Mapping (1–2 weeks)",
                  body: "We map your operations across all key areas: how work moves, where data lives, where time is lost, and where AI can realistically accelerate results.",
                },
                {
                  step: "Roadmap Delivery",
                  body: "A 60-minute working session to walk through your 90-day plan. Written in plain English. Every recommendation has a rationale, a tool, and a projected outcome.",
                },
                {
                  step: "30-Day Check-in",
                  body: "We follow up one month after delivery to review progress and help you stay on track. Included at no extra cost.",
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
              Starting from <strong className="text-black dark:text-white">$2,500 AUD</strong>. Final investment quoted after discovery call based on business size and scope.
            </p>
            <p className="text-sm text-body-color dark:text-body-color-dark">
              GST applicable. ABN 80 398 642 662.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">
              Ready for a plan that actually gets used?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Start with a free discovery call. We will confirm the roadmap is the right next step before you commit to anything.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Get Your Roadmap →
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
