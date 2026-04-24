import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Managed AI Operations | ProjxAI",
  description:
    "Your AI systems. Maintained, optimised, and evolving. Monthly performance reviews, workflow optimisation, and ongoing builds — so your AI keeps working as your business grows.",
  openGraph: {
    title: "Managed AI Operations | ProjxAI",
    description:
      "Ongoing AI management for Australian SMEs. Monthly reviews, optimisation, and new workflow builds — your AI department without the hire.",
    url: "https://www.projxai.com.au/services/ai-automation",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Monthly performance review of all active AI workflows and systems",
  "Prompt and workflow optimisation as models and tools evolve",
  "New tool evaluation — stay current without doing the research yourself",
  "One new workflow build per quarter, scoped and built as part of your engagement",
  "Priority access for urgent requirements and new initiatives",
  "Direct consultant access — no account managers or ticketing systems",
];

export default function AiAutomationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              Grow
            </span>
            <h1
              className="mb-5 font-extrabold leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.03em", color: "#151c27" }}
            >
              Managed AI Operations
            </h1>
            <p className="mb-4 text-xl font-medium" style={{ color: "#151c27" }}>
              Your AI systems. Maintained, optimised, and evolving.
            </p>
            <p className="mb-8 text-lg leading-relaxed" style={{ color: "#494455" }}>
              A workflow built is not a workflow finished. Prompts drift as AI models update. Integrations break when tools release new versions. New opportunities emerge as your business grows. Without someone managing your AI systems, they degrade — quietly and expensively. Managed AI Operations gives you an ongoing partner who keeps everything running, optimised, and building.
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
              What is included
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
                  body: "We learn about your current AI setup — or your plans — and scope a managed operations engagement that fits your business stage and growth goals.",
                },
                {
                  step: "Onboarding",
                  body: "We audit your existing AI workflows and systems, document everything, and establish a performance baseline. Usually takes 1–2 weeks.",
                },
                {
                  step: "Monthly Reviews",
                  body: "A structured monthly session to review system performance, align on what has changed in your business, and plan upcoming optimisations or new builds.",
                },
                {
                  step: "Ongoing Operations",
                  body: "Between reviews: prompt updates, workflow tweaks, tool upgrades, and anything that needs attention. Response within 1 business day.",
                },
                {
                  step: "Quarterly Builds",
                  body: "One new workflow or AI integration each quarter — scoped and built as part of your ongoing engagement at no extra cost.",
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
              Not ready for ongoing yet?
            </h3>
            <ul className="space-y-2 text-base" style={{ color: "#494455" }}>
              <li>
                <Link href="/services/ai-content" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  Pilot Workflow Build — get your first AI workflow live first →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-consulting" className="hover:underline" style={{ color: "#6B3FE7" }}>
                  AI Opportunity Audit — start with a structured assessment of where AI fits →
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
              Want AI that keeps improving, not just getting built?
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Book a free 15-minute Clarity Call. Tell us where you are with AI today — we will scope a managed operations arrangement that fits where you are headed.
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
