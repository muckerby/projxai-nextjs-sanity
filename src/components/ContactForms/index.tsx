"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ── Shared field styles ────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-[#e0dcea] bg-white px-4 py-3 text-base text-[#151c27] outline-none focus:border-[#6B3FE7] focus:ring-2 focus:ring-[#6B3FE7]/20 transition-colors placeholder:text-[#b8b4c4]";

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#151c27",
  fontFamily: "Manrope, sans-serif",
};

const radioClass =
  "flex cursor-pointer items-start gap-3 rounded-xl border border-[#e0dcea] px-4 py-3 text-sm text-[#494455] transition-colors has-[:checked]:border-[#6B3FE7] has-[:checked]:bg-[#6B3FE7]/5 has-[:checked]:text-[#6B3FE7]";

type FormState = "idle" | "submitting" | "success" | "error";

// ── Success / Error states ────────────────────────────────────────────────────

function SuccessCard({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  return (
    <div
      className="rounded-2xl px-8 py-10 text-center"
      style={{ backgroundColor: "#e7eeff" }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: "#6B3FE7" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3
        className="text-xl font-extrabold mb-2"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          color: "#151c27",
          letterSpacing: "-0.02em",
        }}
      >
        {name ? `Thanks, ${name}!` : "Message sent"}
      </h3>
      <p style={{ color: "#494455" }}>{message}</p>
    </div>
  );
}

// ── General Enquiry Form ──────────────────────────────────────────────────────

export function GeneralEnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") setEmailError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!turnstileToken) {
      setErrorMsg("Please complete the security check.");
      return;
    }
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          enquiryType: "general",
          sourcePage: "/contact",
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <SuccessCard
        name={form.name}
        message="We'll get back to you within 1 business day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="g-name" style={labelStyle}>
          Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="g-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="g-email" style={labelStyle}>
          Email <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="g-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@yourbusiness.com.au"
          className={inputClass}
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>

      <div>
        <label htmlFor="g-business" style={labelStyle}>
          Business Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="g-business"
          name="businessName"
          type="text"
          required
          value={form.businessName}
          onChange={handleChange}
          placeholder="Your Business Pty Ltd"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="g-message" style={labelStyle}>
          Message <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <textarea
          id="g-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>

      <div>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken("")}
          onExpire={() => setTurnstileToken("")}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] active:scale-[0.99] disabled:opacity-60"
        style={{
          backgroundColor: "#6B3FE7",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {state === "submitting" ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}

// ── Call Back Form ────────────────────────────────────────────────────────────

export function CallBackForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    bestTime: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") setEmailError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.email && !isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!turnstileToken) {
      setErrorMsg("Please complete the security check.");
      return;
    }
    setState("submitting");
    setErrorMsg("");

    const message = [
      `Callback request from ${form.name}.`,
      `Phone: ${form.phone}.`,
      form.bestTime ? `Best time: ${form.bestTime}.` : "",
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email || `callback-noemail-${Date.now()}@noreply.projxai.internal`,
          businessName: form.businessName,
          message,
          enquiryType: "callback",
          sourcePage: "/contact#callback",
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <SuccessCard
        name={form.name}
        message={`We'll call you back${form.bestTime ? ` ${form.bestTime.toLowerCase()}` : ""} within 1 business day.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="cb-name" style={labelStyle}>
          Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="cb-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cb-phone" style={labelStyle}>
          Phone <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="cb-phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          placeholder="04xx xxx xxx"
          className={inputClass}
        />
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="cb-business" style={labelStyle}>
          Business Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="cb-business"
          name="businessName"
          type="text"
          required
          value={form.businessName}
          onChange={handleChange}
          placeholder="Your Business Pty Ltd"
          className={inputClass}
        />
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="cb-email" style={labelStyle}>
          Email{" "}
          <span
            style={{
              fontWeight: 400,
              color: "#7a7487",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            (optional — we&apos;ll send a confirmation)
          </span>
        </label>
        <input
          id="cb-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="jane@yourbusiness.com.au"
          className={inputClass}
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>

      {/* Best time */}
      <fieldset>
        <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
          Best time to call
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {["Morning (8am–12pm)", "Afternoon (12pm–5pm)", "Anytime"].map(
            (time) => (
              <label key={time} className={radioClass}>
                <input
                  type="radio"
                  name="bestTime"
                  value={time}
                  checked={form.bestTime === time}
                  onChange={() => setForm((p) => ({ ...p, bestTime: time }))}
                  className="mt-0.5 shrink-0 accent-[#6B3FE7]"
                />
                <span style={{ fontFamily: "Manrope, sans-serif" }}>
                  {time}
                </span>
              </label>
            )
          )}
        </div>
      </fieldset>

      {/* Notes */}
      <div>
        <label htmlFor="cb-notes" style={labelStyle}>
          Anything you&apos;d like us to know first?{" "}
          <span
            style={{
              fontWeight: 400,
              color: "#7a7487",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            (optional)
          </span>
        </label>
        <textarea
          id="cb-notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          placeholder="e.g. I run a 12-person marketing agency and want to automate our content workflow…"
          className={inputClass}
        />
      </div>

      {/* Turnstile */}
      <div>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken("")}
          onExpire={() => setTurnstileToken("")}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] active:scale-[0.99] disabled:opacity-60"
        style={{
          backgroundColor: "#6B3FE7",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {state === "submitting" ? "Sending…" : "Request a Call Back →"}
      </button>
    </form>
  );
}

// ── Consulting Enquiry Form (smart intake pipeline) ───────────────────────────
// Used on service page CTAs and embedded intake flows.

type ConsultingPhase =
  | "form"
  | "submitting"
  | "path-choice"
  | "booking-done"
  | "intake"
  | "intake-submitting"
  | "intake-done"
  | "error";

// ── Intake step progress bar ──────────────────────────────────────────────────

function IntakeProgress({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack?: () => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12l7-7M5 12l7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          )}
        </div>
        <span
          className="text-sm font-semibold"
          style={{ color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
        >
          Step {step} of {total}
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "#e7eeff", height: "6px" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            backgroundColor: "#6B3FE7",
            width: `${(step / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

type IntakeData = {
  industry: string;
  teamSize: string;
  aiMaturity: string;
  areasOfInterest: string[];
  biggestChallenge: string;
  biggestChallengeOther: string;
  timeframe: string;
};

const INDUSTRIES = [
  "Accommodation & Tourism",
  "Automotive",
  "Construction & Trades",
  "eCommerce & Retail",
  "Education & Training",
  "Finance & Insurance",
  "Food & Hospitality",
  "Health & Wellbeing",
  "Legal & Professional Services",
  "Marketing & Advertising",
  "Manufacturing & Logistics",
  "Property & Real Estate",
  "Technology & Software",
  "Other",
];

const TEAM_SIZES = ["Just me", "2–5", "6–15", "16–30", "31–50", "50+"];

const AI_MATURITY_OPTIONS = [
  "Completely new to it — not sure where to start",
  "Played around with ChatGPT or similar tools",
  "Using some AI tools but not getting much from them",
  "AI running in parts of the business, want to do more",
  "Specific AI project in mind, need expert help",
];

const AREAS_OF_INTEREST = [
  "Automating repetitive tasks & workflows",
  "AI for marketing, content & social media",
  "Customer service & chatbots",
  "Sales & lead management",
  "Data analysis & business intelligence",
  "AI strategy & where to start",
  "Staff training & AI upskilling",
  "Building or integrating AI tools",
  "I am not sure yet — I need guidance",
];

const CHALLENGES = [
  "Too much time on admin and manual tasks",
  "Not enough leads or visibility",
  "Converting leads into paying clients",
  "Keeping up with competitors",
  "Team capacity and productivity",
  "Understanding what technology can actually do for us",
  "Something else",
];

const TIMEFRAMES = [
  "Right now — I am ready to move",
  "Within the next month",
  "In the next 3 months",
  "Just exploring for now",
];

export function ConsultingEnquiryForm() {
  const [phase, setPhase] = useState<ConsultingPhase>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [leadId, setLeadId] = useState("");
  const [leadName, setLeadName] = useState("");
  const [intakeStep, setIntakeStep] = useState(1);
  const INTAKE_TOTAL = 6;
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    aiChallenge: "",
    preferredContact: "email",
    phone: "",
  });
  const [intake, setIntake] = useState<IntakeData>({
    industry: "",
    teamSize: "",
    aiMaturity: "",
    areasOfInterest: [],
    biggestChallenge: "",
    biggestChallengeOther: "",
    timeframe: "",
  });

  function handleFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") setEmailError("");
  }

  async function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!turnstileToken) {
      setErrorMsg("Please complete the security check.");
      return;
    }
    setPhase("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message:
            form.aiChallenge || "(consulting enquiry — no message provided)",
          enquiryType: "consulting",
          sourcePage: "/contact#consulting",
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setPhase("error");
      } else {
        setLeadId(data.leadId ?? "");
        setLeadName(form.name);
        setPhase("path-choice");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setPhase("error");
    }
  }

  async function handleBookingClick() {
    window.open("https://cal.com/michael-collicoat/30min", "_blank");
    if (leadId) {
      fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, leadPath: "booking" }),
      }).catch(() => {});
    }
    setPhase("booking-done");
  }

  function handleIntakeStart() {
    setPhase("intake");
  }

  function handleIntakeChange(field: keyof IntakeData, value: string) {
    setIntake((prev) => ({ ...prev, [field]: value }));
  }

  function handleAreaToggle(area: string) {
    setIntake((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(area)
        ? prev.areasOfInterest.filter((a) => a !== area)
        : [...prev.areasOfInterest, area],
    }));
  }

  async function handleIntakeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("intake-submitting");
    const biggestChallenge =
      intake.biggestChallenge === "Something else" &&
      intake.biggestChallengeOther
        ? `Something else: ${intake.biggestChallengeOther}`
        : intake.biggestChallenge;

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          leadPath: "intake",
          industry: intake.industry,
          teamSize: intake.teamSize,
          aiMaturity: intake.aiMaturity,
          areasOfInterest: intake.areasOfInterest,
          biggestChallenge,
          timeframe: intake.timeframe,
        }),
      });
      if (res.ok) {
        setPhase("intake-done");
      } else {
        setPhase("error");
        setErrorMsg(
          "Something went wrong saving your answers. Please try again."
        );
      }
    } catch {
      setPhase("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (phase === "path-choice") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#6B3FE7" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
          >
            Thanks — we have your details.
          </h3>
          <p style={{ color: "#494455" }}>
            To make sure we come to you prepared, how would you like to
            continue?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="flex flex-col rounded-2xl p-6"
            style={{ backgroundColor: "#f0f3ff", border: "1.5px solid #e7eeff" }}
          >
            <h4
              className="font-bold mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
            >
              Book a Discovery Call
            </h4>
            <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: "#494455" }}>
              Choose a time that suits you. We will come prepared.
            </p>
            <button
              onClick={handleBookingClick}
              className="w-full rounded-xl py-3 text-sm font-bold text-white"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book a 30-Minute Call →
            </button>
          </div>
          <div
            className="flex flex-col rounded-2xl p-6"
            style={{ backgroundColor: "#f0f3ff", border: "1.5px solid #e7eeff" }}
          >
            <h4
              className="font-bold mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
            >
              Tell Us More First
            </h4>
            <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: "#494455" }}>
              Answer 6 quick questions so we can research your business before we
              speak.
            </p>
            <button
              onClick={handleIntakeStart}
              className="w-full rounded-xl py-3 text-sm font-bold transition-colors"
              style={{
                border: "1.5px solid #6B3FE7",
                color: "#6B3FE7",
                backgroundColor: "transparent",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              Start the Intake →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "booking-done") {
    return (
      <SuccessCard
        name={leadName}
        message={`Booking page opened in a new tab. If it didn't open, visit cal.com/michael-collicoat/30min`}
      />
    );
  }

  // ── Stepped intake ──────────────────────────────────────────────────────────

  function canAdvanceStep(): boolean {
    switch (intakeStep) {
      case 1: return !!intake.industry;
      case 2: return !!intake.teamSize;
      case 3: return !!intake.aiMaturity;
      case 4: return intake.areasOfInterest.length > 0;
      case 5:
        return !!intake.biggestChallenge &&
          (intake.biggestChallenge !== "Something else" || !!intake.biggestChallengeOther);
      case 6: return !!intake.timeframe;
      default: return false;
    }
  }

  if (phase === "intake" || phase === "intake-submitting") {
    return (
      <div>
        {/* Intro header — only on step 1 */}
        {intakeStep === 1 && (
          <div className="mb-6">
            <p
              className="font-bold mb-1"
              style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Thanks {leadName} — just 6 quick questions.
            </p>
            <p className="text-sm" style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}>
              Your answers help us research your business before we speak.
            </p>
          </div>
        )}

        <IntakeProgress
          step={intakeStep}
          total={INTAKE_TOTAL}
          onBack={intakeStep > 1 ? () => setIntakeStep((s) => s - 1) : undefined}
        />

        {/* Step 1 — Industry */}
        {intakeStep === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="intake-industry" style={labelStyle}>
                What industry are you in?{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                id="intake-industry"
                value={intake.industry}
                onChange={(e) => handleIntakeChange("industry", e.target.value)}
                className={inputClass}
              >
                <option value="">Select your industry…</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              disabled={!canAdvanceStep()}
              onClick={() => setIntakeStep(2)}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 — Team size */}
        {intakeStep === 2 && (
          <div className="space-y-5">
            <fieldset>
              <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                How big is your team?{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TEAM_SIZES.map((size) => (
                  <label key={size} className={radioClass}>
                    <input
                      type="radio"
                      name="intake-teamSize"
                      value={size}
                      checked={intake.teamSize === size}
                      onChange={() => handleIntakeChange("teamSize", size)}
                      className="mt-0.5 accent-[#6B3FE7]"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              disabled={!canAdvanceStep()}
              onClick={() => setIntakeStep(3)}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 3 — AI maturity */}
        {intakeStep === 3 && (
          <div className="space-y-5">
            <fieldset>
              <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                Where is your business with AI right now?{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </legend>
              <div className="space-y-2">
                {AI_MATURITY_OPTIONS.map((opt) => (
                  <label key={opt} className={radioClass}>
                    <input
                      type="radio"
                      name="intake-aiMaturity"
                      value={opt}
                      checked={intake.aiMaturity === opt}
                      onChange={() => handleIntakeChange("aiMaturity", opt)}
                      className="mt-0.5 shrink-0 accent-[#6B3FE7]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              disabled={!canAdvanceStep()}
              onClick={() => setIntakeStep(4)}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 4 — Areas of interest */}
        {intakeStep === 4 && (
          <div className="space-y-5">
            <fieldset>
              <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                Which areas are most relevant to you?{" "}
                <span style={{ fontWeight: 400, color: "#7a7487" }}>
                  (select all that apply)
                </span>
              </legend>
              <div className="space-y-2">
                {AREAS_OF_INTEREST.map((area) => (
                  <label
                    key={area}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e0dcea] px-4 py-3 text-sm text-[#494455] transition-colors has-[:checked]:border-[#6B3FE7] has-[:checked]:bg-[#6B3FE7]/5 has-[:checked]:text-[#6B3FE7]"
                  >
                    <input
                      type="checkbox"
                      value={area}
                      checked={intake.areasOfInterest.includes(area)}
                      onChange={() => handleAreaToggle(area)}
                      className="mt-0.5 shrink-0 accent-[#6B3FE7]"
                    />
                    {area}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              disabled={!canAdvanceStep()}
              onClick={() => setIntakeStep(5)}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 5 — Biggest challenge */}
        {intakeStep === 5 && (
          <div className="space-y-5">
            <fieldset>
              <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                What is your biggest challenge right now?{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </legend>
              <div className="space-y-2">
                {CHALLENGES.map((challenge) => (
                  <label key={challenge} className={radioClass}>
                    <input
                      type="radio"
                      name="intake-challenge"
                      value={challenge}
                      checked={intake.biggestChallenge === challenge}
                      onChange={() => handleIntakeChange("biggestChallenge", challenge)}
                      className="mt-0.5 shrink-0 accent-[#6B3FE7]"
                    />
                    {challenge}
                  </label>
                ))}
              </div>
              {intake.biggestChallenge === "Something else" && (
                <div className="mt-3">
                  <label htmlFor="intake-other" style={labelStyle}>
                    Tell us more <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="intake-other"
                    type="text"
                    value={intake.biggestChallengeOther}
                    onChange={(e) => handleIntakeChange("biggestChallengeOther", e.target.value)}
                    placeholder="Describe your biggest challenge…"
                    className={inputClass}
                  />
                </div>
              )}
            </fieldset>
            <button
              type="button"
              disabled={!canAdvanceStep()}
              onClick={() => setIntakeStep(6)}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 6 — Timeframe + Submit */}
        {intakeStep === 6 && (
          <form onSubmit={handleIntakeSubmit} className="space-y-5">
            <fieldset>
              <legend style={{ ...labelStyle, marginBottom: "0.75rem" }}>
                What is your timeframe?{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </legend>
              <div className="space-y-2">
                {TIMEFRAMES.map((tf) => (
                  <label key={tf} className={radioClass}>
                    <input
                      type="radio"
                      name="intake-timeframe"
                      value={tf}
                      checked={intake.timeframe === tf}
                      onChange={() => handleIntakeChange("timeframe", tf)}
                      className="mt-0.5 shrink-0 accent-[#6B3FE7]"
                    />
                    {tf}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              disabled={!canAdvanceStep() || phase === "intake-submitting"}
              className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-40"
              style={{ backgroundColor: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
            >
              {phase === "intake-submitting" ? "Saving your answers…" : "Submit Answers →"}
            </button>
          </form>
        )}
      </div>
    );
  }

  if (phase === "intake-done") {
    return (
      <SuccessCard
        name={leadName}
        message="We'll review your answers, research your business, and come back to you ready to have a real conversation."
      />
    );
  }

  if (phase === "error") {
    return (
      <div
        className="rounded-2xl px-8 py-10 text-center"
        style={{ backgroundColor: "#fef2f2" }}
      >
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
        >
          Something went wrong
        </h3>
        <p className="mb-4 text-sm" style={{ color: "#494455" }}>
          {errorMsg}
        </p>
        <button
          onClick={() => {
            setPhase("form");
            setErrorMsg("");
          }}
          className="text-sm underline"
          style={{ color: "#6B3FE7" }}
        >
          Try again
        </button>
      </div>
    );
  }

  // Initial consulting form
  return (
    <form onSubmit={handleInitialSubmit} className="space-y-5">
      <div>
        <label htmlFor="c-name" style={labelStyle}>
          Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleFormChange}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="c-email" style={labelStyle}>
          Email <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleFormChange}
          placeholder="jane@yourbusiness.com.au"
          className={inputClass}
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>

      <div>
        <label htmlFor="c-business" style={labelStyle}>
          Business Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          id="c-business"
          name="businessName"
          type="text"
          required
          value={form.businessName}
          onChange={handleFormChange}
          placeholder="Your Business Pty Ltd"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="c-challenge" style={labelStyle}>
          What&apos;s your biggest AI challenge right now?{" "}
          <span
            style={{
              fontWeight: 400,
              color: "#7a7487",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            (optional)
          </span>
        </label>
        <textarea
          id="c-challenge"
          name="aiChallenge"
          rows={4}
          value={form.aiChallenge}
          onChange={handleFormChange}
          placeholder="e.g. We spend 10 hours a week writing product descriptions manually…"
          className={inputClass}
        />
      </div>

      <div>
        <p style={labelStyle}>How would you prefer we follow up?</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          {[
            { value: "email", label: "Email me back" },
            { value: "call", label: "Call me back" },
          ].map((opt) => (
            <label key={opt.value} className={radioClass}>
              <input
                type="radio"
                name="preferredContact"
                value={opt.value}
                checked={form.preferredContact === opt.value}
                onChange={handleFormChange}
                className="accent-[#6B3FE7]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {form.preferredContact === "call" && (
        <div>
          <label htmlFor="c-phone" style={labelStyle}>
            Phone number <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleFormChange}
            placeholder="04xx xxx xxx"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken("")}
          onExpire={() => setTurnstileToken("")}
        />
      </div>

      <button
        type="submit"
        disabled={phase === "submitting"}
        className="w-full rounded-xl py-4 text-base font-bold text-white transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] disabled:opacity-60"
        style={{
          backgroundColor: "#6B3FE7",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {phase === "submitting" ? "Sending…" : "Send Consulting Enquiry →"}
      </button>
    </form>
  );
}
