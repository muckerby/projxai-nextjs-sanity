import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Workflow Implementation | ProjxAI",
  description:
    "Done for you. Running in your business. Not on a slide deck. End-to-end automation builds using Make.com, Zapier, or n8n. Starting from $3,000 per workflow.",
  openGraph: {
    title: "AI Workflow Implementation | ProjxAI",
    description:
      "Done for you. Running in your business. Not on a slide deck. End-to-end automation builds using Make.com, Zapier, or n8n. Starting from $3,000 per workflow.",
    url: "https://www.projxai.com.au/services/ai-content",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Discovery session to scope the workflow precisely",
  "End-to-end build using Make.com, Zapier, or n8n",
  "Integration with your existing tools (CRM, email, calendar, accounting)",
  "Testing and QA before handover",
  "Documentation and team training",
  "30-day support period post-launch",
];

const commonWorkflows = [
  "Lead follow-up automation",
  "Customer onboarding",
  "Invoice processing",
  "Appointment management",
  "After-hours enquiry handling",
  "Social content scheduling",
  "Internal reporting",
];

export default function AiContentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Workflow Implementation
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              AI Workflow Implementation
            </h1>
            <p className="mb-4 text-xl font-medium text-black dark:text-white">
              Done for you. Running in your business. Not on a slide deck.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Knowing what to automate is one thing. Having it built, tested, and running in your actual systems is another. Most consultants stop at the strategy. We do not.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Scope Your Workflow →
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
            <ul className="mb-10 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-body-color dark:text-body-color-dark">
                  <svg className="text-primary mt-0.5 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mb-5 text-xl font-bold text-black dark:text-white">
              Common workflows we build
            </h3>
            <div className="flex flex-wrap gap-2">
              {commonWorkflows.map((w) => (
                <span key={w} className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
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
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              How it works
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: "Scoping Session (Free, 30 min)",
                  body: "We define the workflow precisely — inputs, outputs, tools involved, and edge cases. You get a written scope before we start anything.",
                },
                {
                  step: "Build",
                  body: "We build the automation end-to-end, connecting your existing tools. You are kept informed at key milestones.",
                },
                {
                  step: "Test & QA",
                  body: "We run the workflow through real scenarios before handover. If something breaks, we fix it — no extra charge.",
                },
                {
                  step: "Handover & Training",
                  body: "We walk your team through how it works and hand over full documentation. 30-day support is included from launch day.",
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
              Starting from <strong className="text-black dark:text-white">$3,000 AUD per workflow</strong>. Final investment quoted after scoping session based on complexity and integrations required.
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
              Have a workflow in mind?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Tell us what you want to automate. We will scope it, price it, and build it — or tell you honestly if there is a simpler way.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Scope Your Workflow →
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
