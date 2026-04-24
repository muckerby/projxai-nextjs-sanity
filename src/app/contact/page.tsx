import { Metadata } from "next";
import { ContactTabPanel } from "@/components/ContactTabPanel";

export const metadata: Metadata = {
  title: "Contact ProjxAI | Book a Free Clarity Call",
  description:
    "Book a free 15-minute Clarity Call with ProjxAI — practical AI consulting for Australian SMEs. No prep, no hard sell, just an honest conversation.",
  openGraph: {
    title: "Contact ProjxAI | Book a Free Clarity Call",
    description:
      "Book a free 15-minute Clarity Call with ProjxAI — AI consulting for Australian businesses.",
    url: "https://www.projxai.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-10" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[760px]">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{
                backgroundColor: "#dce2f3",
                color: "#5e6573",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Get in Touch
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
              Let&apos;s talk about{" "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                your business.
              </span>
            </h1>

            <p
              className="text-lg max-w-lg leading-relaxed mb-8"
              style={{ color: "#494455" }}
            >
              Book a free 15-minute Clarity Call and we&apos;ll cut straight to
              what AI can realistically do for you — no jargon, no pressure.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Free 15-minute call", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#6B3FE7" strokeWidth="1.5"/>
                    <path d="M12 7v5l3 3" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )},
                { label: "No prep needed", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#6B3FE7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )},
                { label: "Brisbane, QLD, Australia", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#6B3FE7" fillOpacity="0.2" stroke="#6B3FE7" strokeWidth="1.5"/>
                    <circle cx="12" cy="9" r="2" fill="#6B3FE7"/>
                  </svg>
                )},
                { label: "No hard sell", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m4.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )},
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#494455",
                    boxShadow: "0 2px 12px rgba(21,28,39,0.05)",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT TABS + FORMS ──────────────────────────────────── */}
      <section className="py-10 pb-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <ContactTabPanel />
        </div>
      </section>

      {/* ── FOOTER STRIP ──────────────────────────────────────────── */}
      <section className="py-6" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <p
            className="text-center text-sm"
            style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
          >
            ProjxAI · Collicorp Pty Ltd · ABN 80 398 642 662 · Brisbane, QLD ·
            Your information is handled securely and never shared or sold.
          </p>
        </div>
      </section>
    </>
  );
}
