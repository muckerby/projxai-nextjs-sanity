import { Metadata } from "next";
import { AIOpportunityScoreTool } from "@/components/AIOpportunityScore";

export const metadata: Metadata = {
  title: "AI Opportunity Score | Free Assessment | ProjxAI",
  description:
    "Free 5-minute assessment: find out how ready your Australian business is for AI and which use cases will deliver the highest return. No email required to start.",
  openGraph: {
    title: "AI Opportunity Score — Free Assessment for Australian SMEs",
    description:
      "Answer 12 questions and get a personalised AI readiness score, your top use cases, and a clear first step. Free from ProjxAI.",
    url: "https://www.projxai.com.au/tools/ai-opportunity-score",
  },
};

export default function AIOpportunityScorePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-10" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[700px]">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{
                backgroundColor: "#dce2f3",
                color: "#5e6573",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Free Tool · 5 Minutes
            </span>

            <h1
              className="font-extrabold leading-[1.0] mb-5"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                letterSpacing: "-0.03em",
                color: "#151c27",
              }}
            >
              Your{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                AI Opportunity Score
              </span>
            </h1>

            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
            >
              Answer 12 questions about your business and we&apos;ll show you
              exactly where you stand with AI — your readiness score, your top
              3 use cases, and the smartest first step. No fluff, no sales
              pitch to get your results.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOL ─────────────────────────────────────────────── */}
      <section className="py-10 pb-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <AIOpportunityScoreTool />
        </div>
      </section>
    </>
  );
}
