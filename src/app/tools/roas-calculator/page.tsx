import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROAS Calculator | ProjxAI",
  description:
    "Find out exactly what return your ad spend should be generating — and where the gaps are in your current campaigns. Free tool for Australian SMEs.",
  openGraph: {
    title: "ROAS Calculator | ProjxAI",
    description:
      "Find out exactly what return your ad spend should be generating. Free ROAS calculator for Australian SMEs.",
    url: "https://www.projxai.com.au/tools/roas-calculator",
  },
};

export default function RoasCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <span className="text-primary mb-4 block text-sm font-semibold uppercase tracking-widest">
              Free Tool
            </span>
            <h1
              className="font-extrabold leading-[1.05] mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                letterSpacing: "-0.03em",
                color: "#151c27",
              }}
            >
              ROAS Calculator
            </h1>
            <p className="mb-4 text-xl font-medium" style={{ color: "#151c27" }}>
              Find out exactly what return your ad spend should be generating — and where the gaps are.
            </p>
            <p className="mb-10 text-lg leading-relaxed" style={{ color: "#494455" }}>
              Takes 2 minutes. No signup required. Built specifically for Australian businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-24" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="mx-auto max-w-[640px] text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-8"
              style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M9 17v-2m3 2v-4m3 4v-6M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <h2
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Launching soon.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
              The ROAS Calculator is currently in development. It will let you calculate your return on ad spend, identify gaps against industry benchmarks, and get a plain-English breakdown of where your campaigns are underperforming.
            </p>

            <div className="p-8 rounded-3xl text-left mb-10" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.05)" }}>
              <h3 className="text-lg font-bold mb-5" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                What the tool will calculate:
              </h3>
              <ul className="space-y-3">
                {[
                  "Your current ROAS vs industry benchmarks",
                  "Revenue gap — what you should be generating at target ROAS",
                  "Break-even point for your current ad spend",
                  "Recommended budget adjustments to hit your targets",
                  "Plain-English summary of where spend is leaking",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base" style={{ color: "#494455" }}>
                    <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#6B3FE7" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gradient inline-block px-8 py-4 rounded-xl text-white font-bold transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Get Notified When It Launches
              </Link>
              <Link
                href="/tools"
                className="inline-block px-8 py-4 rounded-xl font-bold transition-all"
                style={{ backgroundColor: "#dce2f3", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
              >
                ← Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
