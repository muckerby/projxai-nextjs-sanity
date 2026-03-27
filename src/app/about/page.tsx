import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ProjxAI — Collicorp Pty Ltd",
  description:
    "ProjxAI is a specialist AI consultancy for Australian SMEs, built by Michael Collicoat under Collicorp Pty Ltd (ABN 80 398 642 662). Brisbane, QLD.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              We&apos;re not a big agency. We&apos;re a specialist who knows AI and knows Australian business.
            </h1>
            <p className="text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              ProjxAI was built out of frustration — watching great Australian businesses fall behind because the AI tools and advice available to them were either too technical, too expensive, or too far removed from the reality of running an SME.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Why we built ProjxAI</h2>
            <div className="space-y-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              <p>
                In 2025, AI stopped being a future technology and became a present-day competitive advantage. The businesses embracing it — automating their operations, scaling their content, making smarter decisions faster — were pulling ahead. The ones waiting to &ldquo;see how it develops&rdquo; were already behind.
              </p>
              <p>
                The problem wasn&apos;t that Australian SMEs didn&apos;t want to use AI. It was that everything available to them was designed for someone else. Enterprise tools built for 500-person companies. US-focused playbooks that didn&apos;t apply to the Australian market. Consultants charging $500 an hour to explain things that shouldn&apos;t be complicated.
              </p>
              <p>
                ProjxAI exists to fix that gap. Practical AI implementation, in plain English, built around the specific reality of Australian small and medium businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Michael Bio */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">The person behind ProjxAI</h2>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <div className="bg-primary/10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-3xl font-bold text-primary">
                MC
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-black dark:text-white">Michael Collicoat</h3>
                <p className="text-primary mb-4 text-sm font-medium">Brisbane, QLD, Australia</p>
                <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Michael Collicoat is the founder of ProjxAI and director of Collicorp Pty Ltd. Based in Brisbane, he works directly with Australian SMEs — no account managers, no junior consultants, no offshore teams.
                </p>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  His approach is direct and practical: understand the business first, identify where AI actually delivers value, and build something that works. Not a pilot programme. Not a proof of concept. Something that runs in production and saves real time or generates real revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Collicorp */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-5 text-3xl font-bold text-black dark:text-white">About Collicorp</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              ProjxAI is a brand under Collicorp Pty Ltd — a properly structured Australian company, not a freelancer or sole trader operating under a trading name. This matters because it means professional accountability, proper contracts, and a business that&apos;s built to last.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "ABN", value: "80 398 642 662" },
                { label: "Registered", value: "Queensland, Australia" },
                { label: "Director", value: "Michael Collicoat" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white px-5 py-4 dark:bg-dark">
                  <div className="text-primary mb-1 text-xs font-semibold uppercase tracking-widest">{item.label}</div>
                  <div className="text-base font-medium text-black dark:text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
              Three principles we won&apos;t compromise on
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Plain English, not jargon",
                  body: "If we can't explain what we're doing in terms you understand, we're not doing it right. Every recommendation, every deliverable, every conversation — no buzzwords, no tech speak.",
                },
                {
                  title: "Practical builds, not theory",
                  body: "We don't deliver strategy decks and wish you luck. Everything we produce is designed to be implemented. If it can't be acted on, we don't include it.",
                },
                {
                  title: "Australian businesses, Australian context",
                  body: "The US AI playbook doesn't always translate. Australian market, Australian regulations, Australian business culture — we build recommendations that actually apply to where you operate.",
                },
              ].map((p) => (
                <div key={p.title} className="border-l-4 border-primary pl-6">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">{p.title}</h3>
                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Explore our services →
            </Link>
            <Link
              href="/work-with-us"
              className="inline-block rounded-xs border border-primary px-8 py-4 text-base font-semibold text-primary duration-300 hover:bg-primary/10"
            >
              Book a discovery call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
