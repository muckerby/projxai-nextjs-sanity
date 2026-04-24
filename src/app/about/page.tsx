import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ProjxAI | Thirty-Seven Years as a Technology and Digital Operator",
  description:
    "ProjxAI was founded by a 37-year Australian technology and digital operator — GM-level roles, P&L ownership, production systems shipped across multiple industries. Not a consultant. An operator.",
  openGraph: {
    title: "About ProjxAI | Thirty-Seven Years as a Technology and Digital Operator",
    description:
      "Three decades of digital operations. GM-level roles, multi-million-dollar budgets owned in-house, production systems shipped. This is why ProjxAI exists.",
    url: "https://www.projxai.com.au/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-24" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="max-w-3xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "rgba(107,63,231,0.25)", color: "#c4b5fd", fontFamily: "Manrope, sans-serif" }}
            >
              About ProjxAI
            </span>
            <h1
              className="font-extrabold leading-[1.05] mb-8"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
              }}
            >
              Thirty-seven years as a technology and digital operator.{" "}
              <span style={{ color: "#a78bfa", fontStyle: "italic" }}>This is why ProjxAI exists.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              I&apos;ve spent 30+ years inside Australian businesses — running marketing, building systems, owning the P&amp;L. ProjxAI exists because I watched too many AI vendors sell solutions to problems they&apos;d never had to solve themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE CAREER ARC ──────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: narrative */}
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
              >
                The Operator Story
              </span>
              <h2
                className="text-3xl font-extrabold mb-8 leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                Three career phases. One consistent thing.
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: "#494455" }}>
                <p>
                  I started in technology in the mid-1980s — hands-on, production work. Networks, systems, the things that break at 2am and need to be fixed before the business opens. I spent the first decade learning how digital infrastructure actually works: not from a whiteboard, but from being the person responsible when it didn&apos;t.
                </p>
                <p>
                  The second phase was in senior leadership — GM-level roles in digital businesses, owning P&amp;L, managing teams, and holding multi-million-dollar marketing budgets. I sat in board meetings defending technology investment decisions. I scoped and approved vendor contracts. I made the calls that consultants typically avoid: not &ldquo;here are three options&rdquo; but &ldquo;here is what we&apos;re doing and why.&rdquo;
                </p>
                <p>
                  The third phase — the last decade-plus — has been as an operator at the intersection of marketing, technology, and AI. Building production systems in-house rather than buying vendor promises. Running multi-channel digital operations at scale. Watching what AI can actually do — and, more importantly, watching the gap between what vendors claim and what gets shipped.
                </p>
                <p>
                  That arc — hands-on tech, then P&amp;L leadership, then operator at the AI intersection — is the background ProjxAI is built on.
                </p>
              </div>
            </div>

            {/* Right: credential callouts */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "37+",
                  label: "Years across technology and digital operations",
                  desc: "From hands-on production tech in the mid-1980s through GM and P&L leadership roles to today.",
                },
                {
                  icon: "GM",
                  label: "Full P&L responsibility",
                  desc: "Owned multi-million-dollar marketing budgets in-house — not consulted on them from the outside.",
                },
                {
                  icon: "SYS",
                  label: "Production systems shipped",
                  desc: "Multi-channel marketing automation, performance dashboards, custom integrations, AI tooling — built and run, not specced and handed off.",
                },
                {
                  icon: "AU",
                  label: "Industry breadth",
                  desc: "Lottery, wagering, hospitality, B2B distribution, travel, online services. Brisbane-based, working with Australian businesses.",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e7deff" }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl text-sm font-black"
                    style={{ width: 52, height: 52, backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-bold text-base mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                      {c.label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── THE FOUNDING MOMENT ─────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              The Founding Moment
            </span>
            <h2
              className="text-3xl font-extrabold mb-8 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              What changed. And why I started ProjxAI.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#494455" }}>
              <p>
                Two things converged at around the same time.
              </p>
              <p>
                The first was the capability shift. AI crossed a threshold — from interesting-but-marginal to genuinely useful for businesses that aren&apos;t Google or McKinsey. The question stopped being &ldquo;can AI do this?&rdquo; and became &ldquo;is it worth doing for this business at this stage?&rdquo; That&apos;s a different question. It&apos;s an operator&apos;s question.
              </p>
              <p>
                The second was what I was watching in the market. A wave of AI consultants, agencies, and tools is being sold into the Australian SME market — by smart engineers and sharp salespeople who have never had to defend a marketing spend to a board, or make a technology call with their own budget on the line. They know what AI can do. They don&apos;t always know what&apos;s worth doing.
              </p>
              <p>
                ProjxAI exists to close that gap. To bring AI to Australian SMEs through someone who has spent a career running the kind of business those SMEs are running — and who understands that the operator&apos;s job isn&apos;t to be impressed by what a technology can do. It&apos;s to work out what it&apos;s worth.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote
              className="mt-12 pl-6 border-l-4"
              style={{ borderColor: "#6B3FE7" }}
            >
              <p
                className="text-xl font-semibold leading-relaxed italic"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
              >
                &ldquo;Most AI consultants will tell you what&apos;s possible. I&apos;ll tell you what&apos;s worth doing this quarter.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── WHAT AN OPERATOR'S LENS MEANS ───────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              What an operator&apos;s lens actually means.
            </h2>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "#494455" }}>
              Thirty-seven years inside digital businesses gives you three things that can&apos;t be taught in a course or acquired in a handful of consulting engagements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "P&L instinct",
                  body: "I know what a CFO will and won't approve, what a board will and won't underwrite, and how to frame an AI investment as a finance decision — not a tech decision.",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "A bias for shipping",
                  body: "Thirty-seven years of being the person responsible when things either work or don't. No tolerance for projects that show well in a deck and never reach production.",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Industry breadth",
                  body: "Lottery, wagering, hospitality, B2B distribution, travel, online services. I can walk into any vertical and orient inside an hour — not because I've read about it, but because I've run it.",
                },
              ].map((card) => (
                <div key={card.title}>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#e7eeff" }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE BUSINESS ──────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              About the Business
            </span>
            <h2
              className="text-2xl font-extrabold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              A properly structured Australian company.
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#494455" }}>
              ProjxAI is a brand under Collicorp Pty Ltd — not a freelancer or sole trader operating under a trading name. Professional accountability, proper contracts, and a business built to last.
            </p>
            <div
              className="flex flex-wrap justify-center gap-6 text-sm font-semibold"
              style={{ color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              <span>ABN 80 398 642 662</span>
              <span>·</span>
              <span>Registered Queensland, Australia</span>
              <span>·</span>
              <span>Brisbane-based</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#151c27" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl font-extrabold mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.03em" }}
            >
              Ready to talk to someone who&apos;s{" "}
              <span style={{ color: "#a78bfa" }}>actually run the operation?</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Book a free 15-minute Clarity Call. No sales pitch — just an honest conversation about where AI can genuinely help your business and what it will take to get there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#consulting"
                className="inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Book a Clarity Call
              </Link>
              <Link
                href="/services"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
