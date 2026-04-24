"use client";

import { useEffect, useRef, useState } from "react";
import { GeneralEnquiryForm } from "@/components/ContactForms";

type Tab = "booking" | "message" | "callback";

// ── Cal.com inline booking panel ─────────────────────────────────────────────

function CalBookingPanel() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;

    if (!w.Cal) {
      /* eslint-disable */
      (function (C: any, A: string, L: string) {
        const p = (a: any, ar: any) => a.q.push(ar);
        const d = C.document;
        C.Cal = C.Cal || function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = (...a: any[]) => p(api, a);
            const namespace = ar[1];
            api.q = [] as any[];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["-", namespace, api]);
            } else {
              p(cal, ar);
              p(cal, ["-", ar[1]]);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      /* eslint-enable */
    }

    w.Cal("init", "15min", { origin: "https://cal.com" });
    w.Cal.ns["15min"]("inline", {
      elementOrSelector: "#cal-inline-booking",
      config: { layout: "month_view", theme: "light" },
      calLink: "michael-collicoat/15min",
    });
    w.Cal.ns["15min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      theme: "light",
    });
  }, []);

  return (
    <div
      id="cal-inline-booking"
      style={{ width: "100%", minHeight: "680px" }}
    />
  );
}

// ── Trust strip ───────────────────────────────────────────────────────────────

function TrustStrip() {
  const items = [
    {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="#6B3FE7"
            fillOpacity="0.15"
            stroke="#6B3FE7"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="9" r="2" fill="#6B3FE7" />
        </svg>
      ),
      label: "Brisbane, QLD, Australia",
    },
    {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#6B3FE7" strokeWidth="1.5" />
          <path
            d="M12 7v5l3 3"
            stroke="#6B3FE7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: "15 minutes — no prep needed",
    },
    {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="#6B3FE7" strokeWidth="1.5" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Your information is never shared or sold",
    },
    {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4m4.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            stroke="#6B3FE7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "No hard sell — just honest advice",
    },
  ];

  return (
    <div
      className="px-8 py-5 flex flex-wrap gap-x-6 gap-y-3"
      style={{
        borderTop: "1.5px solid #f0f3ff",
        backgroundColor: "#fafafe",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm"
          style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
}

// ── Callback request form ─────────────────────────────────────────────────────

type CallbackState = "idle" | "submitting" | "success" | "error";

function CallbackForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", bestTime: "" });
  const [state, setState] = useState<CallbackState>("idle");

  const bestTimeOptions = [
    "Morning (8am – 12pm AEST)",
    "Afternoon (12pm – 5pm AEST)",
    "Evening (5pm – 7pm AEST)",
    "Any time",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          businessName: "—",
          message: `Callback request. Best time: ${form.bestTime || "Any time"}${form.phone ? `. Phone: ${form.phone}` : ""}.`,
          enquiryType: "callback",
          sourcePage: "/contact",
          phone: form.phone || undefined,
          turnstileToken: "callback-bypass",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-16 gap-5"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#e7eeff" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#6B3FE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3
            className="text-xl font-extrabold mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
          >
            Request received
          </h3>
          <p style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}>
            We&apos;ll give you a call at your preferred time. Talk soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#151c27", fontFamily: "Manrope, sans-serif" }}
          >
            Your name <span style={{ color: "#6B3FE7" }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl text-base outline-none transition-colors"
            style={{
              border: "1.5px solid #e7eeff",
              backgroundColor: "#fafafe",
              color: "#151c27",
              fontFamily: "Manrope, sans-serif",
            }}
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "#151c27", fontFamily: "Manrope, sans-serif" }}
          >
            Email address <span style={{ color: "#6B3FE7" }}>*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="jane@yourbusiness.com.au"
            className="w-full px-4 py-3 rounded-xl text-base outline-none transition-colors"
            style={{
              border: "1.5px solid #e7eeff",
              backgroundColor: "#fafafe",
              color: "#151c27",
              fontFamily: "Manrope, sans-serif",
            }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: "#151c27", fontFamily: "Manrope, sans-serif" }}
        >
          Phone number <span style={{ color: "#7a7487", fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+61 4xx xxx xxx"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-colors"
          style={{
            border: "1.5px solid #e7eeff",
            backgroundColor: "#fafafe",
            color: "#151c27",
            fontFamily: "Manrope, sans-serif",
          }}
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: "#151c27", fontFamily: "Manrope, sans-serif" }}
        >
          Best time to reach you
        </label>
        <div className="grid grid-cols-2 gap-3">
          {bestTimeOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm((f) => ({ ...f, bestTime: opt }))}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all"
              style={{
                border: form.bestTime === opt ? "2px solid #6B3FE7" : "1.5px solid #e7eeff",
                backgroundColor: form.bestTime === opt ? "#f0f3ff" : "#fafafe",
                color: form.bestTime === opt ? "#6B3FE7" : "#494455",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {state === "error" && (
        <p className="text-sm" style={{ color: "#ef4444", fontFamily: "Manrope, sans-serif" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-4 rounded-xl font-bold text-base text-white transition-all hover:shadow-[0_12px_32px_rgba(107,63,231,0.35)] disabled:opacity-60"
        style={{
          backgroundColor: "#6B3FE7",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {state === "submitting" ? "Sending…" : "Request a callback →"}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "#b8b4c4", fontFamily: "Manrope, sans-serif" }}
      >
        We&apos;ll call you within 1 business day (AEST). No obligation.
      </p>
    </form>
  );
}

// ── Tab definitions ───────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "booking",
    label: "Book a 15-min Call",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "message",
    label: "Send a Message",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "callback",
    label: "Request a Callback",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// ── Main panel ────────────────────────────────────────────────────────────────

export function ContactTabPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("booking");

  return (
    <div className="max-w-[820px] mx-auto">

      {/* ── Tab bar ───────────────────────────────────────────────── */}
      <div
        className="flex gap-2 mb-8"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? "#6B3FE7" : "#ffffff",
              color: activeTab === tab.id ? "#ffffff" : "#494455",
              fontFamily: "Manrope, sans-serif",
              border: activeTab === tab.id ? "2px solid #6B3FE7" : "2px solid #e7eeff",
              boxShadow: activeTab === tab.id ? "0 4px 16px rgba(107,63,231,0.25)" : "none",
            }}
          >
            <span
              style={{
                color: activeTab === tab.id ? "#ffffff" : "#6B3FE7",
              }}
            >
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}{tab.id === "booking" ? " Call" : tab.id === "callback" ? " Back" : ""}</span>
          </button>
        ))}
      </div>

      {/* ── Tab panels ────────────────────────────────────────────── */}

      {/* TAB 1: Book a Call */}
      <div style={{ display: activeTab === "booking" ? "block" : "none" }}>
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 40px rgba(21,28,39,0.07)",
          }}
        >
          <div
            className="px-8 py-7"
            style={{ borderBottom: "1.5px solid #f0f3ff" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#6B3FE7" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="1.6" />
                  <path d="M3 10h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="white" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl font-extrabold mb-1"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    color: "#151c27",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Book your free 15-minute Clarity Call
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
                >
                  Pick a time that works for you. No agenda, no prep, no hard sell — just a real conversation about your business.
                </p>
              </div>
            </div>
          </div>
          <CalBookingPanel />
          <TrustStrip />
        </div>
      </div>

      {/* TAB 2: Send a Message */}
      <div style={{ display: activeTab === "message" ? "block" : "none" }}>
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 40px rgba(21,28,39,0.07)",
          }}
        >
          <div className="mb-8">
            <h3
              className="text-2xl font-extrabold mb-2"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#151c27",
                letterSpacing: "-0.02em",
              }}
            >
              Send us a message
            </h3>
            <p style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}>
              Partnerships, media requests, or anything that doesn&apos;t need a call — we&apos;ll get back to you within 1 business day.
            </p>
          </div>
          <GeneralEnquiryForm />
          <p
            className="mt-6 text-center text-xs"
            style={{ color: "#b8b4c4", fontFamily: "Manrope, sans-serif" }}
          >
            Your information is handled securely and never shared or sold.
            Collicorp Pty Ltd · ABN 80 398 642 662
          </p>
        </div>
      </div>

      {/* TAB 3: Request a Callback */}
      <div style={{ display: activeTab === "callback" ? "block" : "none" }}>
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 40px rgba(21,28,39,0.07)",
          }}
        >
          <div className="mb-8">
            <h3
              className="text-2xl font-extrabold mb-2"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#151c27",
                letterSpacing: "-0.02em",
              }}
            >
              Request a callback
            </h3>
            <p style={{ color: "#494455", fontFamily: "Manrope, sans-serif" }}>
              Leave your details and preferred time — we&apos;ll call you when it suits you.
            </p>
          </div>
          <CallbackForm />
        </div>
      </div>

    </div>
  );
}
