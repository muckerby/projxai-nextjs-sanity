import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Infrastructure & Hosting | ProjxAI",
  description:
    "Run AI in your business without the enterprise price tag. Cloud hosting advisory, local AI deployment, and managed hosting via retainer. Starting from $1,500.",
  openGraph: {
    title: "AI Infrastructure & Hosting | ProjxAI",
    description:
      "Run AI in your business without the enterprise price tag. Cloud hosting advisory, local AI deployment, and managed hosting via retainer. Starting from $1,500.",
    url: "https://www.projxai.com.au/services/ai-infrastructure",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const included = [
  "Cloud hosting advisory (Azure, AWS, or Google Cloud)",
  "Local AI deployment options for businesses with privacy requirements",
  "VM and container setup for AI workloads",
  "Cost comparison vs current spend — we regularly find 40–60% savings",
  "Ongoing managed hosting available via retainer",
];

export default function AiInfrastructurePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Infrastructure &amp; Hosting
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              AI Infrastructure &amp; Hosting
            </h1>
            <p className="mb-4 text-xl font-medium text-black dark:text-white">
              Run AI in your business without the enterprise price tag.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Many businesses assume AI requires expensive infrastructure or complex cloud setups. In 2026, that is not true. The right stack — properly configured — costs a fraction of what most businesses currently pay for legacy services.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Talk Infrastructure →
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
                  step: "Current Stack Review",
                  body: "We audit what you are currently paying for — hosting, SaaS, storage, software licences. Most businesses find 40–60% of spend is on services they could replace or consolidate.",
                },
                {
                  step: "Infrastructure Design",
                  body: "We design a hosting architecture matched to your AI workloads, data privacy requirements, and budget. Cloud, hybrid, or local — whichever makes sense.",
                },
                {
                  step: "Setup & Configuration",
                  body: "We stand up the environment, configure security, and connect it to your AI tools and workflows. Documented and handed over.",
                },
                {
                  step: "Optional: Managed Hosting",
                  body: "For businesses that want ongoing management, we offer managed hosting via our monthly retainer. Monitoring, updates, and support included.",
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
              Starting from <strong className="text-black dark:text-white">$1,500 AUD</strong> for the initial stack review and infrastructure design. Setup costs quoted after scoping based on complexity.
            </p>
            <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Managed hosting available via monthly retainer — priced separately based on requirements.
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
              Often paired with
            </h3>
            <ul className="space-y-2 text-base text-body-color dark:text-body-color-dark">
              <li>
                <Link href="/services/ai-content" className="text-primary hover:underline">
                  AI Workflow Implementation — build what runs on it →
                </Link>
              </li>
              <li>
                <Link href="/services/ai-automation" className="text-primary hover:underline">
                  AI Retainer — ongoing management and optimisation →
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
              Paying too much for infrastructure that is holding you back?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Tell us what you are currently running. We will tell you honestly whether there is a better, cheaper option — and build it if there is.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
            >
              Talk Infrastructure →
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
