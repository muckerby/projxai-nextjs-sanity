"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

type Option = {
  label: string;
  score: number; // 0–4 per option
};

type Question = {
  id: string;
  dimension: string;
  question: string;
  options: Option[];
};

type Scores = Record<string, number>;

type ReadinessBand = "Early Stage" | "Building Blocks" | "Good Foundation" | "Ready to Scale";

// ── Questions ────────────────────────────────────────────────────────────────
// 12 questions across 6 dimensions (2 per dimension)
// Scoring: 0 = lowest AI readiness, 4 = highest

const QUESTIONS: Question[] = [
  // DIMENSION 1: Process Clarity
  {
    id: "q1",
    dimension: "Process Clarity",
    question: "How well-defined are the repetitive tasks in your business?",
    options: [
      { label: "We figure it out as we go — no real process", score: 0 },
      { label: "Some processes exist but they're in people's heads", score: 1 },
      { label: "Key processes are documented but inconsistently followed", score: 2 },
      { label: "Clear, consistent processes that rarely change", score: 4 },
    ],
  },
  {
    id: "q2",
    dimension: "Process Clarity",
    question: "How much time does your team spend on manual, repetitive tasks each week?",
    options: [
      { label: "Very little — we're mostly doing creative or complex work", score: 1 },
      { label: "A few hours — there's some repetition but it's not a big deal", score: 2 },
      { label: "Several hours — it slows us down but we manage", score: 3 },
      { label: "A significant chunk — it's a real drag on productivity", score: 4 },
    ],
  },

  // DIMENSION 2: Data Quality
  {
    id: "q3",
    dimension: "Data Quality",
    question: "Where does most of your business data currently live?",
    options: [
      { label: "Scattered across email, spreadsheets, and people's heads", score: 0 },
      { label: "Mostly spreadsheets and files — not very organised", score: 1 },
      { label: "In tools (CRM, accounting, etc.) but not well connected", score: 2 },
      { label: "Centralised systems with clean, consistent data", score: 4 },
    ],
  },
  {
    id: "q4",
    dimension: "Data Quality",
    question: "How confident are you in the quality and consistency of your business data?",
    options: [
      { label: "Not confident — it's a mess", score: 0 },
      { label: "There are issues but we get by", score: 1 },
      { label: "Reasonably good, with some gaps", score: 3 },
      { label: "Very confident — it's clean and reliable", score: 4 },
    ],
  },

  // DIMENSION 3: Tool Integration
  {
    id: "q5",
    dimension: "Tool Integration",
    question: "How connected are your business tools to each other?",
    options: [
      { label: "They're all separate — lots of manual copying between them", score: 0 },
      { label: "A few are connected but most are standalone", score: 1 },
      { label: "Most are connected with some automation already running", score: 3 },
      { label: "Fully integrated — tools talk to each other automatically", score: 4 },
    ],
  },
  {
    id: "q6",
    dimension: "Tool Integration",
    question: "Which best describes your current software environment?",
    options: [
      { label: "Basic — email, spreadsheets, maybe one or two apps", score: 1 },
      { label: "Moderate — we use several tools but not systematically", score: 2 },
      { label: "Good — dedicated tools for most functions (CRM, accounting, etc.)", score: 3 },
      { label: "Advanced — cloud-based stack with APIs and integrations", score: 4 },
    ],
  },

  // DIMENSION 4: Team Readiness
  {
    id: "q7",
    dimension: "Team Readiness",
    question: "How does your team generally respond to adopting new technology?",
    options: [
      { label: "Strong resistance — change is very hard here", score: 0 },
      { label: "Mixed reactions — some keen, some reluctant", score: 2 },
      { label: "Generally open — with the right training", score: 3 },
      { label: "Enthusiastic — we move fast on new tools", score: 4 },
    ],
  },
  {
    id: "q8",
    dimension: "Team Readiness",
    question: "Has your team used any AI tools (ChatGPT, Copilot, etc.) in their work?",
    options: [
      { label: "No — and most wouldn't know where to start", score: 0 },
      { label: "A few individuals have experimented informally", score: 2 },
      { label: "Several team members use AI tools regularly", score: 3 },
      { label: "AI tools are already part of how we work day to day", score: 4 },
    ],
  },

  // DIMENSION 5: Leadership Buy-In
  {
    id: "q9",
    dimension: "Leadership Buy-In",
    question: "How does leadership view AI investment in your business?",
    options: [
      { label: "Sceptical — need to see proof before committing anything", score: 0 },
      { label: "Curious but cautious — open to a small trial", score: 2 },
      { label: "Supportive — willing to invest if the case is clear", score: 3 },
      { label: "Committed — AI is already a strategic priority", score: 4 },
    ],
  },
  {
    id: "q10",
    dimension: "Leadership Buy-In",
    question: "Do you have a rough budget set aside for AI or automation this year?",
    options: [
      { label: "No budget — would need to be free or very cheap", score: 0 },
      { label: "Under $2,000 — small experiment only", score: 1 },
      { label: "$2,000–$10,000 — enough for a meaningful pilot", score: 3 },
      { label: "Over $10,000 — serious about making this work", score: 4 },
    ],
  },

  // DIMENSION 6: Task Volume
  {
    id: "q11",
    dimension: "Task Volume",
    question: "How many times per week does your business perform the same task or type of task?",
    options: [
      { label: "Rarely — most work is unique each time", score: 1 },
      { label: "Occasionally — maybe 5–10 times a week", score: 2 },
      { label: "Regularly — 10–50 times a week across the team", score: 3 },
      { label: "Constantly — hundreds of times a week or more", score: 4 },
    ],
  },
  {
    id: "q12",
    dimension: "Task Volume",
    question: "Which of these tasks takes the most time in your business right now?",
    options: [
      { label: "Answering the same customer questions over and over", score: 4 },
      { label: "Creating content, reports, or documents manually", score: 4 },
      { label: "Following up leads or clients who don't respond", score: 4 },
      { label: "Entering, moving, or formatting data between systems", score: 4 },
    ],
  },
];

const TOTAL_QUESTIONS = QUESTIONS.length;
const MAX_SCORE = QUESTIONS.length * 4; // 48

// ── Use case recommendations based on dominant dimension ─────────────────────

type UseCase = {
  title: string;
  description: string;
  impact: "High" | "Medium";
};

function getTopUseCases(scores: Scores, q12Answer: string): UseCase[] {
  // Map q12 answer to use case
  const useCaseMap: Record<string, UseCase> = {
    "Answering the same customer questions over and over": {
      title: "AI Customer Service Responder",
      description:
        "A trained AI assistant that handles your most common customer questions — via email, chat, or your website — 24/7. Cuts response time from hours to seconds.",
      impact: "High",
    },
    "Creating content, reports, or documents manually": {
      title: "AI Content & Document Generator",
      description:
        "Automate the creation of proposals, reports, social posts, product descriptions, and internal documents — in your voice, at scale.",
      impact: "High",
    },
    "Following up leads or clients who don't respond": {
      title: "AI Lead Follow-Up Sequence",
      description:
        "Automated multi-touch follow-up that sends the right message at the right time — personalised, on-brand, and running while you sleep.",
      impact: "High",
    },
    "Entering, moving, or formatting data between systems": {
      title: "AI Data Pipeline & Automation",
      description:
        "Eliminate manual data entry by connecting your tools and automating the flow of information between them — no more copy-paste between spreadsheets and CRMs.",
      impact: "High",
    },
  };

  const primary = useCaseMap[q12Answer] ?? {
    title: "Workflow Automation",
    description:
      "Identify your highest-frequency manual tasks and automate them with AI — starting with the one that costs you the most time.",
    impact: "High" as const,
  };

  const secondary: UseCase = {
    title: "AI Meeting Notes & Actions",
    description:
      "Record, transcribe, and summarise every meeting automatically — pulling out action items, decisions, and follow-ups so nothing gets lost.",
    impact: "Medium",
  };

  const tertiary: UseCase = {
    title: "AI Knowledge Base",
    description:
      "Build an internal AI that your team can ask questions — trained on your SOPs, product info, and FAQs. Cut onboarding time and reduce repeat questions to senior staff.",
    impact: "Medium",
  };

  return [primary, secondary, tertiary];
}

function getBand(pct: number): ReadinessBand {
  if (pct < 35) return "Early Stage";
  if (pct < 55) return "Building Blocks";
  if (pct < 75) return "Good Foundation";
  return "Ready to Scale";
}

const BAND_CONFIG: Record<
  ReadinessBand,
  { color: string; bg: string; headline: string; summary: string }
> = {
  "Early Stage": {
    color: "#e57c00",
    bg: "#fff8f0",
    headline: "You're at the starting line — and that's fine.",
    summary:
      "Your business has real opportunity to benefit from AI, but there are some foundations to put in place first — cleaner data, clearer processes, and a culture open to change. The good news: even at this stage, there are quick wins available that don't require you to solve everything first.",
  },
  "Building Blocks": {
    color: "#1d72c4",
    bg: "#f0f7ff",
    headline: "You have the building blocks — time to start stacking.",
    summary:
      "Your business is better positioned than most. You have some processes, some data, and some openness to new tools. The next step is identifying the one or two workflows where AI will have the clearest impact — and running a focused pilot to prove the return before scaling.",
  },
  "Good Foundation": {
    color: "#148a5a",
    bg: "#f0fff8",
    headline: "You have a solid foundation — AI will work well here.",
    summary:
      "Your business is genuinely ready. You have the processes, data, and team capability to implement AI effectively. The question isn't whether to do it — it's where to start for the fastest measurable return. A scoped AI Audit will map your top 3 opportunities and give you a clear implementation sequence.",
  },
  "Ready to Scale": {
    color: "#6B3FE7",
    bg: "#f5f0ff",
    headline: "You're ahead of the curve — time to move fast.",
    summary:
      "Your business has strong AI fundamentals. You're already ahead of 90% of Australian SMEs in readiness. The opportunity now is to implement strategically — moving beyond experiments to integrated systems that give you a durable competitive advantage.",
  },
};

// ── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-semibold"
          style={{ color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
        >
          Question {current} of {total}
        </span>
        <span
          className="text-sm"
          style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
        >
          ~{Math.ceil((total - current + 1) * 0.4)} min remaining
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "#e7eeff", height: "6px" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            backgroundColor: "#6B3FE7",
            width: `${((current - 1) / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

// ── Email capture ─────────────────────────────────────────────────────────────

function EmailCapture({
  scores,
  band,
  pct,
  onSkip,
}: {
  scores: Scores;
  band: ReadinessBand;
  pct: number;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          businessName: business,
          message: `AI Opportunity Score submission. Score: ${pct}% — ${band}. Scores: ${JSON.stringify(scores)}`,
          enquiryType: "tool-score",
          sourcePage: "/tools/ai-opportunity-score",
          turnstileToken: "tool-bypass",
        }),
      });
      setState("done");
      setTimeout(onSkip, 1200);
    } catch {
      setState("error");
      onSkip();
    }
  }

  return (
    <div className="text-center py-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ backgroundColor: "#6B3FE7" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3
        className="text-2xl font-extrabold mb-2"
        style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
      >
        Your score is ready.
      </h3>
      <p
        className="mb-8 text-base max-w-sm mx-auto"
        style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}
      >
        Enter your details to get a copy emailed to you, or skip to see your
        results now.
      </p>

      {state === "done" ? (
        <p className="text-sm font-semibold" style={{ color: "#6B3FE7" }}>Sent! Loading your results…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto text-left">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#e0dcea] bg-white px-4 py-3 text-base text-[#151c27] outline-none focus:border-[#6B3FE7] focus:ring-2 focus:ring-[#6B3FE7]/20 transition-colors placeholder:text-[#b8b4c4]"
          />
          <input
            type="email"
            required
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#e0dcea] bg-white px-4 py-3 text-base text-[#151c27] outline-none focus:border-[#6B3FE7] focus:ring-2 focus:ring-[#6B3FE7]/20 transition-colors placeholder:text-[#b8b4c4]"
          />
          <input
            type="text"
            placeholder="Business name (optional)"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className="w-full rounded-xl border border-[#e0dcea] bg-white px-4 py-3 text-base text-[#151c27] outline-none focus:border-[#6B3FE7] focus:ring-2 focus:ring-[#6B3FE7]/20 transition-colors placeholder:text-[#b8b4c4]"
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="w-full rounded-xl py-4 text-base font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
          >
            {state === "submitting" ? "Sending…" : "Email my results →"}
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full text-sm text-center py-2"
            style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
          >
            Skip — just show me my results
          </button>
        </form>
      )}
    </div>
  );
}

// ── Score gauge ───────────────────────────────────────────────────────────────

function ScoreGauge({ pct, band }: { pct: number; band: ReadinessBand }) {
  const { color } = BAND_CONFIG[band];
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="90" viewBox="0 0 160 90">
        {/* Track */}
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke="#e7eeff"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        {/* Score text */}
        <text
          x="80"
          y="72"
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill="#151c27"
          fontFamily="Space Grotesk, sans-serif"
        >
          {pct}%
        </text>
      </svg>
      <span
        className="mt-1 font-bold text-sm px-4 py-1.5 rounded-full"
        style={{ backgroundColor: BAND_CONFIG[band].bg, color }}
      >
        {band}
      </span>
    </div>
  );
}

// ── Results page ─────────────────────────────────────────────────────────────

function Results({
  scores,
  answers,
  onRetake,
}: {
  scores: Scores;
  answers: Record<string, string>;
  onRetake: () => void;
}) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const pct = Math.round((total / MAX_SCORE) * 100);
  const band = getBand(pct);
  const { headline, summary } = BAND_CONFIG[band];
  const q12Answer = answers["q12"] ?? "";
  const useCases = getTopUseCases(scores, q12Answer);

  // Dimension scores (0–8 per dimension, 2 questions each)
  const dimensionPairs: Array<[string, string, string]> = [
    ["Process Clarity", "q1", "q2"],
    ["Data Quality", "q3", "q4"],
    ["Tool Integration", "q5", "q6"],
    ["Team Readiness", "q7", "q8"],
    ["Leadership Buy-In", "q9", "q10"],
    ["Task Volume", "q11", "q12"],
  ];

  return (
    <div className="max-w-[820px] mx-auto">
      {/* Score card */}
      <div
        className="rounded-3xl p-8 md:p-10 mb-8"
        style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.07)" }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreGauge pct={pct} band={band} />
          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-2xl font-extrabold mb-3"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
            >
              {headline}
            </h2>
            <p style={{ color: "#494455", fontFamily: "Manrope, sans-serif", lineHeight: 1.7 }}>
              {summary}
            </p>
          </div>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div
        className="rounded-3xl p-8 md:p-10 mb-8"
        style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.07)" }}
      >
        <h3
          className="text-xl font-extrabold mb-6"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
        >
          Breakdown by dimension
        </h3>
        <div className="space-y-5">
          {dimensionPairs.map(([label, q1id, q2id]) => {
            const dimScore = (scores[q1id] ?? 0) + (scores[q2id] ?? 0);
            const dimPct = Math.round((dimScore / 8) * 100);
            const isLow = dimPct < 40;
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Manrope, sans-serif", color: "#151c27" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isLow ? "#fff0f0" : "#f0f7ff",
                      color: isLow ? "#c0392b" : "#1d72c4",
                    }}
                  >
                    {isLow ? "Needs work" : dimPct >= 70 ? "Strong" : "Developing"}
                  </span>
                </div>
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "#f0f3ff", height: "8px" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      backgroundColor: isLow ? "#e57c00" : "#6B3FE7",
                      width: `${dimPct}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top use cases */}
      <div
        className="rounded-3xl p-8 md:p-10 mb-8"
        style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.07)" }}
      >
        <h3
          className="text-xl font-extrabold mb-2"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
        >
          Your top 3 AI use cases
        </h3>
        <p
          className="mb-7 text-sm"
          style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
        >
          Based on your answers — the highest-return places to start.
        </p>
        <div className="space-y-4">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="flex gap-4 rounded-2xl p-5"
              style={{ backgroundColor: i === 0 ? "#f5f0ff" : "#f9f9ff", border: i === 0 ? "1.5px solid #d4c5f9" : "1.5px solid #e7eeff" }}
            >
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: i === 0 ? "#6B3FE7" : "#e7eeff", color: i === 0 ? "#ffffff" : "#6B3FE7" }}
              >
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-bold text-base"
                    style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                  >
                    {uc.title}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: uc.impact === "High" ? "#6B3FE7" : "#e7eeff",
                      color: uc.impact === "High" ? "#ffffff" : "#6B3FE7",
                    }}
                  >
                    {uc.impact} Impact
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}>
                  {uc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-3xl p-8 md:p-10 text-center"
        style={{ backgroundColor: "#151c27" }}
      >
        <h3
          className="text-2xl font-extrabold mb-3"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#ffffff", letterSpacing: "-0.02em" }}
        >
          Want to turn this into a plan?
        </h3>
        <p
          className="mb-8 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.72)", fontFamily: "Manrope, sans-serif" }}
        >
          Book a free 15-minute Clarity Call and we&apos;ll walk through your score
          together, validate your top use case, and outline exactly what an
          implementation would look like.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block rounded-xl px-8 py-4 font-bold text-base transition-all hover:shadow-[0_20px_50px_rgba(107,63,231,0.4)]"
            style={{ backgroundColor: "#6B3FE7", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Book a Free Clarity Call →
          </Link>
          <Link
            href="/services/ai-consulting"
            className="inline-block rounded-xl px-8 py-4 font-bold text-base border transition-colors hover:bg-white/10"
            style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "#ffffff", fontFamily: "Space Grotesk, sans-serif" }}
          >
            See the AI Opportunity Audit →
          </Link>
        </div>
        <button
          onClick={onRetake}
          className="mt-6 text-sm underline"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Manrope, sans-serif" }}
        >
          Retake the assessment
        </button>
      </div>
    </div>
  );
}

// ── Main tool component ───────────────────────────────────────────────────────

type Phase = "questions" | "email" | "results";

export function AIOpportunityScoreTool() {
  const [phase, setPhase] = useState<Phase>("questions");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<number | null>(null);

  const question = QUESTIONS[currentQ];
  const isLast = currentQ === TOTAL_QUESTIONS - 1;

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const option = question.options[selected];
    const newScores = { ...scores, [question.id]: option.score };
    const newAnswers = { ...answers, [question.id]: option.label };
    setScores(newScores);
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      setPhase("email");
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  function handleBack() {
    if (currentQ === 0) return;
    setCurrentQ((q) => q - 1);
    setSelected(null);
  }

  function handleRetake() {
    setPhase("questions");
    setCurrentQ(0);
    setScores({});
    setAnswers({});
    setSelected(null);
  }

  if (phase === "email") {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const pct = Math.round((total / MAX_SCORE) * 100);
    const band = getBand(pct);
    return (
      <div className="max-w-[560px] mx-auto">
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.07)" }}
        >
          <EmailCapture
            scores={scores}
            band={band}
            pct={pct}
            onSkip={() => setPhase("results")}
          />
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return <Results scores={scores} answers={answers} onRetake={handleRetake} />;
  }

  // Questions phase
  return (
    <div className="max-w-[680px] mx-auto">
      <div
        className="rounded-3xl p-8 md:p-10"
        style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.07)" }}
      >
        <ProgressBar current={currentQ + 1} total={TOTAL_QUESTIONS} />

        {/* Dimension label */}
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
          style={{ backgroundColor: "#f0f3ff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
        >
          {question.dimension}
        </div>

        {/* Question */}
        <h2
          className="text-xl font-extrabold mb-7"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.01em", lineHeight: 1.3 }}
        >
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(i)}
                className="w-full text-left rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: isSelected ? "#6B3FE7" : "#f9f9ff",
                  color: isSelected ? "#ffffff" : "#494455",
                  border: isSelected ? "1.5px solid #6B3FE7" : "1.5px solid #e7eeff",
                  fontFamily: "Manrope, sans-serif",
                  boxShadow: isSelected ? "0 4px 20px rgba(107,63,231,0.2)" : "none",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentQ === 0}
            className="flex items-center gap-2 text-sm font-medium disabled:opacity-30"
            style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="rounded-xl px-8 py-3.5 font-bold text-base text-white transition-all disabled:opacity-40 hover:shadow-[0_12px_30px_rgba(107,63,231,0.3)]"
            style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
          >
            {isLast ? "Get my score →" : "Next →"}
          </button>
        </div>
      </div>

      {/* Trust note */}
      <p
        className="text-center text-xs mt-5"
        style={{ color: "#b8b4c4", fontFamily: "Manrope, sans-serif" }}
      >
        No email required to see your results · Takes about 5 minutes · Free forever
      </p>
    </div>
  );
}
