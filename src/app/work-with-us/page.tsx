import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Us — ProjxAI",
  description:
    "Book a free 30-minute discovery call with ProjxAI. No sales pitch. Just a focused conversation about where AI can genuinely help your business.",
};

export default function WorkWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Let&apos;s build your AI strategy — starting with a free 30-minute call.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              No sales pitch. No obligation. Just a focused conversation about where AI can genuinely help your business — and what to do first.
            </p>
            <a
              href="mailto:michaelc@collicorp.com.au?subject=ProjxAI%20Discovery%20Call%20Request"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book your free discovery call →
            </a>
          </div>
        </div>
      </section>

      {/* What Happens on the Call */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              Here&apos;s exactly what we cover
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "We learn about your business",
                  body: "Your industry, your team size, your current tools, and your biggest operational pain points. 10 minutes of good questions beats an hour of generic advice.",
                },
                {
                  title: "We identify your biggest AI opportunity",
                  body: "Based on what we hear, we'll tell you specifically where AI can deliver the most value in your business — and roughly what it would take to get there.",
                },
                {
                  title: "You leave with three clear next steps",
                  body: "Whether you work with us or not, you'll leave with three concrete actions you can take immediately. The call has value regardless of what you decide after.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">{item.title}</h3>
                    <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">
              We work best with
            </h2>
            <ul className="space-y-4">
              {[
                "SME owners (5–100 staff) who want practical AI implementation, not theory",
                "eCommerce businesses spending too much time on manual processes and ad management",
                "Marketing managers who need to scale content output without scaling headcount",
                "Agency owners wanting to add AI services to their offering or upskill their team",
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

      {/* Investment Overview */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white">What does it cost?</h2>
            <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Every engagement is scoped individually because every business is different. Here&apos;s a rough guide:
            </p>
            <div className="space-y-3">
              {[
                { service: "AI Consulting & Strategy", price: "From $1,500 AUD" },
                { service: "AI Content Creation Systems", price: "From $1,500 AUD" },
                { service: "AI Tools & Automation", price: "From $2,000 AUD per project" },
                { service: "AI Implementation (custom builds)", price: "From $2,500 AUD" },
              ].map((item) => (
                <div key={item.service} className="flex items-center justify-between rounded-lg bg-white px-5 py-4 dark:bg-dark">
                  <span className="text-base font-medium text-black dark:text-white">{item.service}</span>
                  <span className="text-primary text-sm font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-body-color dark:text-body-color-dark">
              All projects are quoted after the free discovery call. No surprises. GST applicable.
            </p>
          </div>
        </div>
      </section>

      {/* Michael Bio */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">Who you&apos;ll be talking to</h2>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <div className="bg-primary/10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-3xl font-bold text-primary">
                MC
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-black dark:text-white">Michael Collicoat</h3>
                <p className="text-primary mb-4 text-sm font-medium">Director, Collicorp Pty Ltd | Founder, ProjxAI</p>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Michael is the founder of ProjxAI and director of Collicorp Pty Ltd, based in Brisbane, QLD. He works with Australian SMEs to help them understand and implement AI in practical, revenue-generating ways — without the jargon, without the overpriced consultants, and without the vague "digital transformation" promises.
                </p>
                <p className="mt-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  ProjxAI is his first Collicorp brand — built specifically to fill the gap between enterprise AI tools (built for big corporates) and Australian small businesses who know AI matters but don&apos;t know where to start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">Book your free 30-minute call</h2>
            <p className="mb-2 text-base text-white/70">
              Email us directly and we&apos;ll respond within 1 business day to confirm a time.
            </p>
            <p className="mb-8 text-base text-white/70">
              <strong className="text-white">michaelc@collicorp.com.au</strong>
            </p>
            <a
              href="mailto:michaelc@collicorp.com.au?subject=ProjxAI%20Discovery%20Call%20Request"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Send an email →
            </a>
            <div className="mt-8 space-y-1 text-sm text-white/50">
              <p>ABN: 80 398 642 662 | Brisbane, QLD, Australia</p>
              <p>Response within 1 business day</p>
              <p>All enquiries handled personally by Michael — no offshore VA, no automated responses</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
