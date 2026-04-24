import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilot Workflow Build | ProjxAI",
  description:
    "One workflow. Built, tested, and running in your business. End-to-end automation builds using Make.com, Zapier, or n8n — integrated, documented, and handed over.",
  openGraph: {
    title: "Pilot Workflow Build | ProjxAI",
    description:
      "Take your highest-priority AI workflow from idea to live in a single, focused engagement. Done for you.",
    url: "https://www.projxai.com.au/services/ai-content",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Clarity Call to identify the highest-value workflow to build first",
  "Written scope document — inputs, outputs, tools, and edge cases — before we start",
  "End-to-end build using Make.com, Zapier, n8n, or the right tool for your stack",
  "Integration with your existing tools (CRM, email, calendar, accounting, or others)",
  "Testing and QA against real scenarios before handover",
  "Team training session and full documentation",
  "30-day support period from launch day",
];

const commonWorkflows = [
  "Lead follow-up sequences",
  "Customer onboarding",
  "Invoice & payment processing",
  "Appointment management",
  "After-hours enquiry handling",
  "Internal reporting dashboards",
  "Social content scheduling",
  "Document processing & data extraction",
];

export default function AiContentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              Build
            </span>
            <h1
              className="mb-5 font-extrabold leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.03em", color: "#151c27" }}
            >
              Pilot Workflow Build
            </h1>
            <p className="mb-4 text-xl font-medium" style={{ color: "#151c27" }}>
              One workflow. Built, tested, and running in your business.
            </p>
            <p className="mb-8 text-lg leading-relaxed" style={{ color: "#494455" }}>
              The gap between &ldquo;we should automate this&rdquo; and &ldquo;this is actually working&rdquo; is where most businesses get stuck. Strategy documents and tool recommendations don&apos;t run your operations. Working systems do. The Pilot Workflow Build takes one high-priority workflow — the one with the clearest business impact — and delivers it live, tested, and fully documented.
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
            <ul className="mb-10 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base" style={{ color: "#494455" }}>
                  <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#6B3FE7" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mb-5 text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
              Workflows we commonly build
            </h3>
            <div className="flex flex-wrap gap-2">
              {commonWorkflows.map((w) => (
                <span key={w} className="rounded-full px-4 py-1.5 text-sm font-medium" style={{ backgroundColor: "#e7deff", color: "#6B3FE7" }}>
                  {w}
                </span>
              ))}
            </div>
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
                  body: "We identify the right first workflow — the one with the clearest business impact and the fewest dependencies — and confirm it is the right starting point.",
                },
                {
                  step: "Scoping",
                  body: "We define the workflow precisely: inputs, outputs, tools involved, and edge cases. You receive a written scope document before we start building anything.",
                },
                {
                  step: "Build",
                  body: "We build the automation end-to-end, connecting your existing tools and systems. You are kept informed at key milestones throughout.",
                },
                {
                  step: "QA & Testing",
                  body: "We run the workflow through real-world scenarios before handover. If something breaks in testing, we fix it — no extra charge.",
                },
                {
                  step: "Handover & Training",
                  body: "We walk your team through how it works and hand over full documentation. 30-day support is included from the day it goes live.",
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
              The natural next step
            </h3>
            <ul className="space-y-2 text-base" style={{ color: "#494455" }}>
              <li>
                <Link href="/services/ai-automation" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  Managed AI Operations — keep it running, optimised, and growing →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-consulting" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  AI Opportunity Audit — not sure which workflow to build first? Start here →
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
              Have a workflow in mind?
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Tell us what you want to automate. We will scope it and build it — or tell you honestly if there is a better starting point.
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
