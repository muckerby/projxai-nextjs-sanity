import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Implementation — ProjxAI",
  description:
    "You know what you want AI to do in your business. We build it properly and hand it over so your team can run it independently.",
};

export default function AiImplementationPage() {
  return (
    <>
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Implementation
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Stop planning. Start automating. We build it for you.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              You know what you want AI to do in your business. You just need someone with the technical capability to build it properly — and hand it over so your team can run it independently.
            </p>
            <Link href="/work-with-us" className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80">
              Book a free discovery call →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">Sound familiar?</h2>
            <ul className="mb-8 space-y-4">
              {[
                "You have a clear idea of what needs to be automated but no one to build it",
                "You've tried no-code tools and hit their limits",
                "You've had a developer quote but it came back too expensive or too slow",
                "You need something built, tested, and working — not another strategy doc",
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

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">What we build</h2>
            <ul className="space-y-3">
              {[
                "Custom AI workflow automations (using Make.com, Zapier, or custom code)",
                "AI-powered internal tools (data processing, reporting, content generation)",
                "API integrations connecting your existing tools with AI capabilities",
                "eCommerce automations (inventory, customer comms, ad reporting)",
                "Document processing and analysis systems",
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

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">The process</h2>
            <div className="space-y-6">
              {[
                { title: "Scoping Call (Free, 30 min)", body: "Define exactly what needs to be built and confirm feasibility." },
                { title: "Technical Specification", body: "We document the build in plain English before a single line of code is written. You approve it." },
                { title: "Build & Test", body: "We build, test thoroughly, and iterate until it works as specified." },
                { title: "Handover & Training", body: "We hand over full documentation and train your team to run it independently." },
              ].map((s, i) => (
                <div key={i} className="flex gap-5">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">{i + 1}</div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-black dark:text-white">{s.title}</h3>
                    <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">Have something specific in mind?</h2>
            <p className="mb-8 text-base text-white/70">Investment from $2,500 AUD — quoted per project after scoping call.</p>
            <Link href="/work-with-us" className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80">
              Let&apos;s scope it out — book a call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
