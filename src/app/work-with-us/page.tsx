import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Us | Book a Free Clarity Call | ProjxAI",
  description:
    "Book a free 15-minute Clarity Call with ProjxAI. No sales pitch. Just a focused conversation about where AI can genuinely help your business — and what to do first.",
  openGraph: {
    title: "Work With Us | Book a Free Clarity Call | ProjxAI",
    description:
      "Book a free 15-minute Clarity Call with ProjxAI. No sales pitch. Just a focused conversation about where AI can genuinely help your business.",
    url: "https://www.projxai.com.au/work-with-us",
  },
};

export default function WorkWithUsPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
            >
              Free Clarity Call
            </span>
            <h1
              className="font-extrabold leading-[0.95] tracking-tighter mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                color: "#151c27",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s find out where AI fits —{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>starting with a free 15-minute call.</span>
            </h1>
            <p className="text-xl max-w-xl leading-relaxed mb-10" style={{ color: "#494455" }}>
              No sales pitch. No obligation. Just a focused 15 minutes about where AI can
              genuinely help your business — and what to do first.
            </p>
            <a
              href="https://cal.com/michael-collicoat/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-gradient inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book your free Clarity Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS ON THE CALL ─────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-12"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Here&apos;s exactly what we cover.
            </h2>
            <div className="flex flex-col gap-8">
              {[
                {
                  num: "01",
                  title: "We learn about your business",
                  body: "Your industry, your team size, your current tools, and your biggest operational pain points. 5 minutes of good questions beats an hour of generic advice.",
                },
                {
                  num: "02",
                  title: "We identify your biggest AI opportunity",
                  body: "Based on what we hear, we will tell you specifically where AI can deliver the most value in your business — and roughly what it would take to get there.",
                },
                {
                  num: "03",
                  title: "You leave with a clear next step",
                  body: "Whether you work with us or not, you will leave with a concrete starting point. The call has value regardless of what you decide after.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex gap-8 p-8 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}
                >
                  <div
                    className="text-2xl font-black shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl"
                    style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7", backgroundColor: "#e7eeff" }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "#494455" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ─────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-10"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              We work best with
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🏢", text: "SME owners (5–100 staff) who want practical AI implementation, not theory" },
                { icon: "🛒", text: "eCommerce businesses spending too much time on manual processes and ad management" },
                { icon: "📣", text: "Marketing managers who need to scale content output without scaling headcount" },
                { icon: "🏛️", text: "Agency owners wanting to add AI services to their offering or upskill their team" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-4 p-6 rounded-2xl"
                  style={{ backgroundColor: "#f9f9ff", border: "1px solid #e7eeff" }}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <p className="text-base leading-relaxed" style={{ color: "#494455" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW ENGAGEMENT WORKS ─────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              How it works after the call.
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "#494455" }}>
              Every engagement is scoped individually because every business is different. After the Clarity Call, we will recommend the right starting point and provide a clear proposal — no obligation to proceed.
            </p>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { step: "Clarity Call", desc: "Free 15-minute call to understand your business and identify the highest-value AI opportunity." },
                { step: "Proposal", desc: "If there is a fit, we send a same-day written proposal with a clear scope and fixed investment." },
                { step: "Engagement", desc: "Work begins once you sign off. Most first engagements deliver a working output within 2–4 weeks." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-5 px-6 py-5 rounded-xl"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 8px rgba(21,28,39,0.04)" }}
                >
                  <div className="shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#6B3FE7" }} />
                  <div>
                    <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>{item.step}: </span>
                    <span style={{ color: "#494455" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "#5e6573" }}>ABN 80 398 642 662 · GST applicable on all invoices.</p>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-extrabold mb-4"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Book your free 15-minute Clarity Call
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Select a time that works for you. Brisbane-based. Australian businesses only.
            </p>
            <a
              href="https://cal.com/michael-collicoat/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-gradient inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.4)] mb-10"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Open Booking Calendar →
            </a>
            <div className="text-sm space-y-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              <p>ABN: 80 398 642 662 · Brisbane, QLD, Australia</p>
              <p>Prefer email? <a href="mailto:michaelc@projxai.com.au" className="underline hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>michaelc@projxai.com.au</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
