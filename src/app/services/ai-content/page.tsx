import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Content Creation Australia | ProjxAI",
  description:
    "AI-powered content workflows your team will actually use. Blog posts, social copy, email sequences at scale — built for Australian marketing teams.",
  openGraph: {
    title: "AI Content Creation Australia | ProjxAI",
    description:
      "AI-powered content workflows your team will actually use. Blog posts, social copy, email sequences at scale — built for Australian marketing teams.",
    url: "https://www.projxai.com.au/services/ai-content",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function AiContentPage() {
  return (
    <>
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              AI Content Creation
            </span>
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              More content. Less time. AI-powered workflows your team will actually use.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              The businesses winning at content marketing in 2026 aren&apos;t working harder — they&apos;re using AI workflows that produce consistent, quality output at scale. We build those workflows for Australian marketing teams and agencies.
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
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">Sound familiar?</h2>
            <ul className="space-y-4">
              {[
                "Your team can't keep up with content demand across blog, social, email, and ads",
                "You've tried ChatGPT but the output needs too much editing to be useful",
                "You need a system, not a tool — something repeatable your whole team can use",
                "Your agency clients are asking about AI content and you don't have an answer yet",
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
            <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">What we deliver</h2>
            <div className="space-y-8">
              {[
                { title: "Content Workflow Audit", body: "Map your current content production process and identify where AI can accelerate it without sacrificing quality." },
                { title: "Custom AI Content System", body: "We build a structured workflow using the right combination of AI tools — prompts, templates, quality checks — tailored to your brand voice and content types." },
                { title: "Team Training", body: "Your team learns to run the system independently. We document every step so new team members can onboard quickly." },
                { title: "Content Types Covered", body: "Blog posts and articles, social media copy (LinkedIn, Instagram, Facebook), email sequences and newsletters, ad copy variations, and product descriptions." },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary pl-6">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">{item.title}</h3>
                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark py-20">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-5 text-3xl font-bold text-white">Ready to scale your content without scaling your headcount?</h2>
            <p className="mb-8 text-base text-white/70">From $1,500 AUD — quoted after discovery call based on content types and team size.</p>
            <Link href="/contact#consulting" className="inline-block rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80">
              Book a free discovery call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
