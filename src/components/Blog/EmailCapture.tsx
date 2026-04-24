"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export function BlogEmailCapture({
  placeholder = "your@email.com.au",
  buttonText = "Notify me →",
  dark = false,
}: {
  placeholder?: string;
  buttonText?: string;
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setState("submitting");
    setError("");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Blog subscriber",
          email,
          businessName: "",
          message: "Blog email capture — early access subscription request.",
          enquiryType: "newsletter",
          sourcePage: "/blog",
          turnstileToken: "newsletter-bypass",
        }),
      });
      setState("success");
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div
        className="flex items-center gap-3 px-6 py-4 rounded-xl"
        style={{
          backgroundColor: dark ? "rgba(255,255,255,0.12)" : "#e7eeff",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke={dark ? "#ccbdff" : "#6B3FE7"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-sm font-semibold"
          style={{
            color: dark ? "#ccbdff" : "#6B3FE7",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          You&apos;re on the list — we&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        placeholder={placeholder}
        disabled={state === "submitting"}
        className="flex-1 px-5 py-4 rounded-xl text-base outline-none transition-colors"
        style={{
          backgroundColor: dark ? "rgba(255,255,255,0.1)" : "#ffffff",
          border: dark
            ? "1px solid rgba(255,255,255,0.2)"
            : "1.5px solid #e7eeff",
          color: dark ? "#ffffff" : "#151c27",
          fontFamily: "Manrope, sans-serif",
        }}
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="px-7 py-4 rounded-xl font-bold text-base whitespace-nowrap disabled:opacity-60 transition-all hover:shadow-[0_8px_24px_rgba(21,28,39,0.15)]"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          backgroundColor: dark ? "#ffffff" : "#6B3FE7",
          color: dark ? "#151c27" : "#ffffff",
        }}
      >
        {state === "submitting" ? "Sending…" : buttonText}
      </button>
      {(error || state === "error") && (
        <p
          className="text-sm sm:col-span-2"
          style={{ color: dark ? "#ffb3b3" : "#ef4444", fontFamily: "Manrope, sans-serif" }}
        >
          {error || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
