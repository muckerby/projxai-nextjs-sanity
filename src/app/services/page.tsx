import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services for Australian SMEs | ProjxAI",
  description:
    "AI consulting, implementation, content creation and automation services built for Australian SMEs. Practical results, plain English.",
  openGraph: {
    title: "AI Services for Australian SMEs | ProjxAI",
    description:
      "AI consulting, implementation, content creation and automation services built for Australian SMEs. Practical results, plain English.",
    url: "https://www.projxai.com.au/services",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const services = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "AI Consulting & Strategy",
    audience: "SME owners and agencies who need a clear starting point",
    body: "Not sure where AI fits in your business? We audit your operations and deliver a practical implementation roadmap — no jargon, no fluff.",
    price: "From $1,500",
    link: "/services/ai-consulting",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "AI Tools & Automation",
    audience: "eCommerce operators and SMEs drowning in manual tasks",
    body: "We identify the repetitive work in your business and build AI automations that handle it — saving hours every week and reducing costly errors.",
    price: "From $2,000",
    link: "/services/ai-automation",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "AI Content Creation",
    audience: "Marketing managers and agencies needing more content, faster",
    body: "We build AI-powered content workflows your team can run independently — blog posts, social copy, email sequences, and ad creative at scale.",
    price: "From $1,500",
    link: "/services/ai-content",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "AI Implementation",
    audience: "Businesses that know what they want — and need someone to build it",
    body: "You have the vision. We have the technical capability to make it real. From custom tools to integrated AI systems, we build and hand over.",
    price: "From $2,500",
    link: "/services/ai-implementation",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              AI services built for Australian businesses
            </h1>
            <p className="text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              We don&apos;t do vague AI strategy decks. We audit your business, identify the highest-value opportunities, and build practical solutions your team can actually use — in plain English, with measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-lg bg-white p-8 shadow-one dark:bg-dark"
              >
                <div className="text-primary mb-5">{s.icon}</div>
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  {s.title}
                </h2>
                <p className="mb-3 text-sm font-medium text-primary">
                  For: {s.audience}
                </p>
                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {s.body}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-black dark:text-white">
                    {s.price}
                  </span>
                  <Link
                    href={s.link}
                    className="text-primary inline-flex items-center text-sm font-medium hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white">
              We work with four types of businesses
            </h2>
            <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Every engagement starts with understanding your specific context — your industry, your team, your current tools, and your goals. There&apos;s no one-size-fits-all AI solution.
            </p>
            <ul className="space-y-3">
              {[
                "SME owners (5–50 staff) who want to stay competitive without hiring a tech team",
                "eCommerce businesses spending too much time on tasks AI can handle",
                "Marketing managers who need to scale content output without scaling headcount",
                "Agency owners who want to add AI services to their offering or build capability in-house",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-body-color dark:text-body-color-dark">
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

      {/* Process */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">
            How we work
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Discovery Call",
                body: "A free 30-minute conversation to understand your business, your goals, and where AI can deliver the most value. No obligation.",
              },
              {
                n: "02",
                title: "Audit & Roadmap",
                body: "We analyse your operations, identify opportunities, and deliver a clear implementation plan with priorities, timelines, and investment required.",
              },
              {
                n: "03",
                title: "Build & Launch",
                body: "We build your solution — whether that's a custom tool, an automated workflow, or a content system — and make sure your team knows how to use it.",
              },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold">
                  {step.n}
                </div>
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">
              Not sure which service is right for you?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Start with a free discovery call. We&apos;ll ask the right questions, understand your situation, and recommend exactly where to start.
            </p>
            <Link
              href="/contact#consulting"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Book a free 30-min call →
            </Link>
            <p className="mt-4 text-sm text-white/50">
              Brisbane-based. Australian businesses only. Response within 1 business day.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
