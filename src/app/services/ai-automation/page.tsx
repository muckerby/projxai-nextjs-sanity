import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools & Automation | ProjxAI",
  description:
    "Identify what AI can automate in your business and build it. Save hours every week — eCommerce, SME, agency.",
  openGraph: {
    title: "AI Tools & Automation | ProjxAI",
    description:
      "Identify what AI can automate in your business and build it. Save hours every week — eCommerce, SME, agency.",
    url: "https://www.projxai.com.au/services/ai-automation",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function AiAutomationPage() {
  return (
    <>
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Tools &amp; Automation
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Automate the repetitive. Focus on the revenue-generating.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Every hour your team spends on manual, repetitive tasks is an hour not spent on customers, sales, and growth. We identify what AI can automate in your business — and build it.
            </p>
            <Link href="/contact#consulting" className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80">
              Book a free discovery call →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">Common automation wins we deliver</h2>
            <ul className="space-y-3">
              {[
                "Ad performance reporting (pull data, analyse, summarise — automated weekly)",
                "Customer inquiry routing and initial response",
                "Inventory monitoring and reorder alerts",
                "Invoice processing and data extraction",
                "Lead capture and CRM entry from multiple sources",
                "Social media scheduling and performance tracking",
                "Internal reporting and KPI dashboards",
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
            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Tools we use</h2>
            <div className="flex flex-wrap gap-3">
              {["Make.com", "Zapier", "n8n", "Apify", "OpenAI API", "Claude API", "Custom Python", "Your existing stack"].map((t) => (
                <span key={t} className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">Curious what could be automated in your business?</h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              The discovery call starts with a simple question: where does your team spend time doing the same thing over and over? The answer usually surprises people.
            </p>
            <p className="mb-8 text-sm text-white/60">From $2,000 AUD per automation project. Quoted per project after audit.</p>
            <Link href="/contact#consulting" className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80">
              Book a free automation audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
