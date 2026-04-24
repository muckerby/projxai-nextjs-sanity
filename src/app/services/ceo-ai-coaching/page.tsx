import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive AI Operator Program | ProjxAI CEO Coaching",
  description:
    "A 6-week 1:1 coaching program that teaches CEOs, founders, and GMs to operate AI as a personal tool — without handing their data to a third-party app. $5,500 + GST.",
  openGraph: {
    title: "Executive AI Operator Program | ProjxAI CEO Coaching",
    description:
      "Learn to operate AI as a personal productivity system. 6-week 1:1 program for Australian CEOs and senior leaders. Built on 30+ years of operator experience.",
    url: "https://www.projxai.com.au/services/ceo-ai-coaching",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

const weekByWeek = [
  {
    week: "Pre-program",
    title: "Discovery & stack audit",
    body: "A 30-minute intake session. We document your current tools, communication habits, and priorities. This shapes every subsequent session — generic prompts don't exist in this program.",
  },
  {
    week: "Week 1",
    title: "Set up your AI environment",
    body: "Choose and configure the right AI stack for your context — Claude Cowork, Claude Pro, ChatGPT Pro, or a hybrid. No data leaves your environment. You leave with a working setup, not a demo.",
  },
  {
    week: "Week 2",
    title: "Email triage and summarisation",
    body: "Build a daily email workflow: triage by urgency, surface the decisions that need you, draft responses in your voice. You reclaim 30-45 minutes per day from your inbox.",
  },
  {
    week: "Week 3",
    title: "Meeting prep and follow-up",
    body: "Build a meeting preparation system (agenda context, key questions, background brief) and a post-meeting follow-up workflow (action extraction, decision logging, follow-up drafts). Never walk into a meeting under-prepared again.",
  },
  {
    week: "Week 4",
    title: "Competitive intelligence digest",
    body: "A daily or weekly briefing that surfaces competitor moves, market signals, and industry news — filtered for what actually matters to your business. Configured once, runs itself.",
  },
  {
    week: "Week 5",
    title: "Communication automation",
    body: "Build a workflow for content you produce at regular intervals — LinkedIn updates, internal team communications, board reports, client newsletters. Your voice and style built into the system.",
  },
  {
    week: "Week 6",
    title: "Personal knowledge management + 12-week operating plan",
    body: "Build a persistent memory layer: a system that holds your business context, past decisions, and key relationships so you don't re-brief AI from scratch every session. Leave with a written 90-day plan for running your AI environment independently.",
  },
];

const deliverables = [
  "Full personal prompt library — curated for your role, voice, and industry",
  "Configured AI environment — set up, tested, and running in your preferred tools",
  "Six purpose-built workflows — email, meetings, intelligence, communications, knowledge management",
  "Written 90-day independent operating plan",
  "Custom skills or automations built where relevant (Premium program)",
];

const pricing = [
  {
    name: "Standard",
    price: "$5,500",
    gst: "+ GST",
    duration: "6-week program",
    description: "Six weekly 1:1 sessions (1 hour each). Full suite of workflows built and documented. Best for executives who want to operate AI themselves, with expert guidance.",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$9,500",
    gst: "+ GST",
    duration: "12-week program",
    description: "Six foundational weeks plus six weeks of deepening — one custom skill or automation built to spec during the extended program. For executives who want a more comprehensive build.",
    highlight: true,
  },
  {
    name: "Group Cohort",
    price: "$3,500",
    gst: "+ GST / seat",
    duration: "3–5 executives",
    description: "Monthly cohort intake. Shared learning with private 1:1 setup sessions. Best value for leadership teams who want to build AI capability across the executive layer.",
    highlight: false,
  },
];

const whoItsFor = [
  {
    label: "CEOs and founders",
    body: "Running an Australian business of 5–100 people. You use AI tools occasionally but haven't built a system. You want to be the operator, not the student.",
  },
  {
    label: "GMs and senior leaders",
    body: "You have P&L responsibility and a lot of communication overhead. You want to reclaim time without handing your business data to a third-party app.",
  },
  {
    label: "Executives who've tried apps",
    body: "You've tested Lindy, Reclaim, or similar tools and found them either too locked-down or too opinionated. This program builds your AI environment your way.",
  },
];

export default function CeoAiCoachingPage() {
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
              CEO Coaching
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
              Learn to run AI like an operator.{" "}
              <span style={{ color: "#a78bfa", fontStyle: "italic" }}>Not like a user.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
              A 6-week 1:1 coaching program for Australian CEOs and senior leaders. You leave with a fully configured personal AI environment, six purpose-built workflows, and the operator&apos;s instinct to run it yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact#consulting"
                className="inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #521acf, #6b3fe7)", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Book a Clarity Call
              </Link>
              <a
                href="#pricing"
                className="inline-block px-10 py-5 rounded-xl font-bold text-lg transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
            >
              Why this exists
            </span>
            <h2
              className="text-3xl font-extrabold mb-8 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Most AI tools are built for users. This program is built for operators.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#494455" }}>
              <p>
                There are hundreds of AI apps targeting senior executives right now. Email assistants. Scheduling tools. Meeting summarisers. Most of them are designed for one thing: to do the thinking for you, lock you into a subscription, and sit on a dataset of your most sensitive business communications.
              </p>
              <p>
                That&apos;s not operator thinking. Operators don&apos;t hand their P&L data to a third-party SaaS and hope for the best. They build systems they understand, control, and own.
              </p>
              <p>
                The ProjxAI Executive AI Operator program teaches a different approach. Six weeks of 1:1 coaching, grounded in 30+ years of operating Australian digital businesses. You configure your own environment. You build your own workflows. You learn to prompt for your context, not someone else&apos;s template. And at the end, you run it yourself.
              </p>
            </div>
            <blockquote
              className="mt-10 pl-6 border-l-4"
              style={{ borderColor: "#6B3FE7" }}
            >
              <p
                className="text-xl font-semibold leading-relaxed italic"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
              >
                &ldquo;The good news: most executives don&apos;t need a custom AI platform. They need three workflows automated and someone who&apos;ll show them how to run it.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── PROGRAM STRUCTURE ───────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              The Program
            </span>
            <h2
              className="text-3xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              ProjxAI Executive AI Operator
            </h2>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "#494455" }}>
              Six weeks. One hour per week. 1:1 with Michael Collicoat. Six workflows built, documented, and running before the program ends.
            </p>

            <div className="space-y-6">
              {weekByWeek.map((item) => (
                <div
                  key={item.week}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e7deff" }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl text-xs font-black text-center"
                    style={{ width: 60, height: 52, backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.1 }}
                  >
                    {item.week}
                  </div>
                  <div>
                    <p className="font-bold text-base mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEAVE WITH ─────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              What you leave with.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
              Every deliverable is configured for your role, your tools, and your operating context. Nothing generic.
            </p>

            <div className="space-y-4">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: 28, height: 28, backgroundColor: "#e7eeff", marginTop: 2 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#6B3FE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "#494455" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Optional retainer note */}
            <div
              className="mt-10 p-6 rounded-2xl"
              style={{ backgroundColor: "#f0f3ff", border: "1px solid #d8dfff" }}
            >
              <p className="text-base font-semibold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                Optional: Monthly check-in
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                After the program, continue with a 30-minute monthly check-in to refine workflows, add new capabilities, and stay ahead of what AI can do for your business. $500 + GST per month, no lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              Pricing
            </span>
            <h2
              className="text-3xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              No procurement process. No enterprise sales cycle.
            </h2>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "#494455" }}>
              CEOs typically buy this personally. One invoice, no committee approval. That&apos;s intentional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((tier) => (
                <div
                  key={tier.name}
                  className="p-8 rounded-2xl flex flex-col"
                  style={{
                    backgroundColor: tier.highlight ? "#ffffff" : "#ffffff",
                    border: tier.highlight ? "2px solid #6B3FE7" : "1px solid #e7deff",
                    position: "relative",
                  }}
                >
                  {tier.highlight && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: "#6B3FE7", color: "#ffffff", fontFamily: "Manrope, sans-serif", whiteSpace: "nowrap" }}
                    >
                      Most comprehensive
                    </div>
                  )}
                  <p
                    className="text-sm font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                  >
                    {tier.name}
                  </p>
                  <div className="mb-1">
                    <span
                      className="text-4xl font-extrabold"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm ml-1" style={{ color: "#5e6573" }}>{tier.gst}</span>
                  </div>
                  <p className="text-sm mb-5" style={{ color: "#5e6573" }}>{tier.duration}</p>
                  <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: "#494455" }}>
                    {tier.description}
                  </p>
                  <Link
                    href="/contact#consulting"
                    className="block text-center px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{
                      background: tier.highlight ? "linear-gradient(135deg, #521acf, #6b3fe7)" : "transparent",
                      color: tier.highlight ? "#ffffff" : "#6B3FE7",
                      border: tier.highlight ? "none" : "1.5px solid #6B3FE7",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    Book a Clarity Call
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Who this is for.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
              This program works best when the executive wants to own the system, not just use it.
            </p>

            <div className="space-y-6">
              {whoItsFor.map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e7deff" }}
                >
                  <p className="font-bold text-base mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Not right for */}
            <div
              className="mt-8 p-6 rounded-2xl"
              style={{ backgroundColor: "#f0f3ff", border: "1px solid #d8dfff" }}
            >
              <p className="font-bold text-base mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                This probably isn&apos;t right for you if…
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>
                You want someone else to build and run your AI system for you — that&apos;s a different service (see{" "}
                <Link href="/services/ai-automation" className="underline" style={{ color: "#6B3FE7" }}>
                  AI Workflow Implementation
                </Link>
                ). This program is for executives who want to operate AI themselves, with expert guidance. There&apos;s no passive option here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE COACH ─────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
            >
              Your coach
            </span>
            <h2
              className="text-2xl font-extrabold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              Led by an operator, not an AI trainer.
            </h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: "#494455" }}>
              Michael Collicoat is a 30+ year Australian technology and digital operator. GM-level roles, P&L responsibility, multi-million-dollar marketing budgets owned in-house. He has built and run production AI and automation systems inside operating businesses — not as a consultant hired in from outside, but as the person responsible for the result.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#494455" }}>
              Every workflow in this program is one Michael uses himself. The instinct he&apos;s teaching — &ldquo;what&apos;s worth doing this quarter?&rdquo; — comes from three decades of making that call with his own budget on the line.
            </p>
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
              Ready to operate AI,{" "}
              <span style={{ color: "#a78bfa" }}>not just use it?</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Start with a free 15-minute Clarity Call. We&apos;ll confirm the program is the right fit before you commit to anything.
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
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
