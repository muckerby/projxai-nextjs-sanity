import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Privacy | ProjxAI",
  description:
    "How ProjxAI thinks about data privacy, security, and human oversight in AI workflows. Plain-English principles — no jargon, no compliance theatre.",
  openGraph: {
    title: "Security & Privacy | ProjxAI",
    description:
      "How ProjxAI approaches privacy, data handling, and human oversight in AI implementation for Australian businesses.",
    url: "https://www.projxai.com.au/security-privacy",
  },
};

const PRINCIPLES = [
  {
    title: "Your data stays yours",
    body:
      "We never store, mine, or monetise your business data. When we build AI workflows for your business, the data flowing through those systems belongs to you — and the design reflects that. We work with you to understand what data your workflows touch, where it goes, and who can see it before we build anything.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Humans stay in the loop",
    body:
      "We don't build fully autonomous AI systems that make consequential decisions without a person checking the output. Every workflow we design has defined approval points, escalation paths, and clear handoff to a human where it matters. AI handles the repetitive work — your team keeps control of what counts.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 13l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "We choose tools that match your risk profile",
    body:
      "Not every AI tool is right for every business. Before recommending any platform or API, we consider what data it will process, whether that data is sensitive, what the provider's data handling policy is, and whether a private or local deployment makes more sense. We'll tell you clearly when a tool is not appropriate for your situation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m4.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "We design for least-privilege access",
    body:
      "AI systems only get access to the data they actually need to do the job. We don't connect tools to full databases when a subset of records will do. We scope API permissions tightly, use read-only access where write access isn't required, and document what each integration can and cannot touch.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sensitive industries get extra care",
    body:
      "If your business operates in health, legal, financial services, or another regulated sector, we apply a higher level of scrutiny to every tool and workflow we recommend. We'll be upfront about what we can and can't help with, and we'll point you to appropriate specialists when your situation requires it.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Private deployment when it matters",
    body:
      "For businesses where data sovereignty is a hard requirement — government suppliers, healthcare providers, legal firms — we can design and host AI infrastructure that runs entirely within your own environment. No third-party API calls, no data leaving your network. This is a core part of our AI Infrastructure service.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const QUESTIONS = [
  {
    q: "Do you share our data with AI companies?",
    a: "We use AI tools that require sending data to APIs (such as OpenAI, Anthropic, or Google) only when your data is suitable for that. When it isn't — for example, if your data includes personally identifiable information or commercially sensitive material — we use tools that don't require third-party API calls, or we design workflows that anonymise or summarise data before it leaves your environment.",
  },
  {
    q: "Are you ISO 27001 or SOC 2 certified?",
    a: "ProjxAI is a specialist consultancy, not a large enterprise. We don't hold these certifications ourselves. What we do is help you make informed decisions about the tools and platforms you use, many of which do carry these certifications. If your procurement process requires certified vendors, we'll help you structure your engagement to work within that requirement.",
  },
  {
    q: "What happens to our data after a project ends?",
    a: "We don't retain copies of your business data after a project concludes. Working files are deleted. Any test data used during development is your property and destroyed at handoff. We'll document this process as part of project close-out.",
  },
  {
    q: "Can AI workflows comply with the Australian Privacy Act?",
    a: "Yes — with the right design. The Privacy Act applies to how you collect, store, and use personal information. AI workflows need to be built with those obligations in mind: appropriate consent, data minimisation, access controls, and audit trails. We design with these requirements in mind and can walk you through how they apply to your specific use case. We are not lawyers and this is not legal advice — for complex privacy questions, we recommend engaging a privacy lawyer.",
  },
  {
    q: "What if we're in a regulated industry?",
    a: "Regulated industries (health, financial services, legal, education) have specific obligations that affect how AI can be deployed. We work in these sectors but apply significantly more scrutiny to tool selection and workflow design. We'll be direct about what we can confidently support and where you need additional specialist advice.",
  },
];

export default function SecurityPrivacyPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-14" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[720px]">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{
                backgroundColor: "#dce2f3",
                color: "#5e6573",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Security &amp; Privacy
            </span>

            <h1
              className="font-extrabold leading-[1.0] mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                letterSpacing: "-0.03em",
                color: "#151c27",
              }}
            >
              How we think about{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                your data.
              </span>
            </h1>

            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              Plain English. No compliance theatre, no fine-print hedging. This
              is how ProjxAI actually approaches privacy and security when
              building AI systems for Australian businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER BANNER ────────────────────────────────── */}
      <section className="py-5" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div
            className="flex items-start gap-4 rounded-2xl px-6 py-5 max-w-[780px]"
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #dce2f3",
            }}
          >
            <div className="shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#6B3FE7" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="#6B3FE7" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              <strong style={{ color: "#151c27" }}>What this page is not:</strong>{" "}
              This is not a legal compliance statement, a formal data processing
              agreement, or a privacy policy. It&apos;s a transparent description of
              how we approach these issues. Our formal{" "}
              <Link
                href="/privacy"
                style={{ color: "#6B3FE7" }}
                className="underline"
              >
                Privacy Policy
              </Link>{" "}
              is available separately.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR PRINCIPLES ───────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[780px] mx-auto">
            <h2
              className="text-3xl font-extrabold mb-3"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#151c27",
                letterSpacing: "-0.02em",
              }}
            >
              Our working principles
            </h2>
            <p
              className="mb-12 text-lg"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              These aren&apos;t aspirational values hanging on a wall. They are the
              decisions we make on every project.
            </p>

            <div className="space-y-6">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-5 rounded-3xl p-7"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 20px rgba(21,28,39,0.05)",
                  }}
                >
                  <div
                    className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: "#f0f3ff",
                      color: "#6B3FE7",
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-lg mb-2"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        color: "#151c27",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ─────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-[780px] mx-auto">
            <h2
              className="text-3xl font-extrabold mb-3"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#151c27",
                letterSpacing: "-0.02em",
              }}
            >
              Questions we get asked
            </h2>
            <p
              className="mb-10 text-lg"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              Straight answers to the things risk-conscious buyers want to know
              before they engage.
            </p>

            <div className="space-y-4">
              {QUESTIONS.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer font-bold text-base select-none list-none"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      color: "#151c27",
                    }}
                  >
                    {item.q}
                    <span
                      className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                      style={{ color: "#6B3FE7" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div
                    className="px-7 pb-6 text-base leading-relaxed"
                    style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#151c27" }}
      >
        <div className="container text-center">
          <h2
            className="text-3xl font-extrabold mb-4"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Have a question we haven&apos;t answered?
          </h2>
          <p
            className="text-lg mb-10 mx-auto max-w-lg"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Manrope, sans-serif" }}
          >
            If you have specific security or compliance requirements, bring them
            to the Clarity Call and we&apos;ll give you a direct answer.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base transition-all hover:shadow-[0_20px_50px_rgba(107,63,231,0.4)]"
              style={{
                backgroundColor: "#6B3FE7",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Book a Free Clarity Call →
            </Link>
            <Link
              href="/services/ai-infrastructure"
              className="inline-block rounded-xl px-8 py-4 font-bold text-base border transition-colors hover:bg-white/10"
              style={{
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Private AI &amp; Hosting →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
