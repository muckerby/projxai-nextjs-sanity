import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools for Australian Businesses — ProjxAI",
  description:
    "Free and paid AI tools built for Australian SMEs. Start with the ROAS Calculator or get the Competitor Espionage Engine report for $99.",
};

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Free and paid AI tools built for Australian businesses
            </h1>
            <p className="text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              We build tools that solve real problems — not demos, not proof-of-concepts. Start with the free ROAS Calculator, or get a full competitor intelligence report for $99.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* ROAS Calculator */}
            <div className="rounded-lg bg-white p-8 shadow-one dark:bg-dark">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  FREE
                </span>
              </div>
              <div className="text-primary mb-5">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">ROAS Calculator</h2>
              <p className="mb-3 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Find out exactly what return your ad spend should be generating — and where the gaps are in your current campaigns. Takes 2 minutes. No signup required to use the calculator.
              </p>
              <p className="mb-6 text-sm text-body-color dark:text-body-color-dark">
                Full results report delivered to your email.
              </p>
              <Link
                href="/tools/roas-calculator"
                className="inline-block rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white duration-300 hover:bg-primary/80"
              >
                Try the Calculator →
              </Link>
            </div>

            {/* Competitor Espionage Engine */}
            <div className="rounded-lg bg-white p-8 shadow-one dark:bg-dark">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold">
                  $99 AUD
                </span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                  COMING SOON
                </span>
              </div>
              <div className="text-primary mb-5">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Competitor Espionage Engine</h2>
              <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                A full intelligence report on any competitor&apos;s ad strategy — creative formats, messaging angles, spend estimates, and gaps you can exploit. Automated, accurate, delivered in under an hour.
              </p>
              <a
                href="#waitlist-form"
                className="inline-block rounded-xs border border-primary px-6 py-3 text-sm font-semibold text-primary duration-300 hover:bg-primary/10"
              >
                Join the waitlist →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* More Tools Coming */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20" id="waitlist-form">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">More tools in development</h2>
            <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              We&apos;re building a suite of AI tools specifically for Australian SMEs. Join the list to be notified when new tools launch — and get early access before public release.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-xs border border-stroke px-5 py-3 text-base text-dark outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark dark:text-white"
              />
              <button
                type="submit"
                className="rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/80"
              >
                Notify me
              </button>
            </form>
            <p className="mt-3 text-sm text-body-color dark:text-body-color-dark">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Custom Tool CTA */}
      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Need a custom tool built for your business?</h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              If you have a specific process that needs automating or a tool that doesn&apos;t exist yet, we build custom solutions. Start with a free scoping call.
            </p>
            <Link
              href="/work-with-us"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book a scoping call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
