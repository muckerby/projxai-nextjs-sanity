import { Metadata } from "next";
import { GeneralEnquiryForm, ConsultingEnquiryForm } from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact ProjxAI | Start the Conversation",
  description:
    "Get in touch with ProjxAI. General enquiries and consulting discovery calls for Australian SMEs. All handled personally by Michael Collicoat. Response within 1 business day.",
  openGraph: {
    title: "Contact ProjxAI | Start the Conversation",
    description:
      "Get in touch with ProjxAI. General enquiries and consulting discovery calls for Australian SMEs.",
    url: "https://www.projxai.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-24" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                Get in Touch
              </span>
              <h1
                className="font-extrabold leading-[0.95] tracking-tighter mb-8"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  color: "#151c27",
                  letterSpacing: "-0.03em",
                }}
              >
                Starting the{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>Conversation.</span>
              </h1>
              <p className="text-xl max-w-xl leading-relaxed" style={{ color: "#494455" }}>
                All enquiries are handled personally by Michael — no ticketing system, no call centre.
                Whether you&apos;re curious, ready to start, or just have a quick question, reach out.
              </p>
            </div>

            {/* Info cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[
                {
                  label: "Response time",
                  value: "Within 1 business day",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="#6B3FE7" opacity="0.2"/>
                      <path d="M12 7v5l3 3" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Location",
                  value: "Brisbane, QLD, Australia",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B3FE7" strokeWidth="1.5" fill="#6B3FE7" fillOpacity="0.15"/>
                      <circle cx="12" cy="9" r="2.5" fill="#6B3FE7"/>
                    </svg>
                  ),
                },
                {
                  label: "No hard sell",
                  value: "Just an honest conversation",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-5 rounded-2xl"
                  style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.05)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#e7eeff" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ fontFamily: "Manrope, sans-serif", color: "#7a7487" }}>
                      {item.label}
                    </div>
                    <div className="font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GENERAL ENQUIRY ──────────────────────────────────── */}
      <section id="general" className="scroll-mt-28 py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="max-w-[680px] mx-auto">
            <div className="mb-10">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                style={{ backgroundColor: "#dce2f3", color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
              >
                General Enquiry
              </span>
              <h2
                className="text-3xl font-extrabold mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                Got a question?
              </h2>
              <p style={{ color: "#494455" }}>
                Partnerships, media requests, general questions — anything that doesn&apos;t need a discovery call.
              </p>
            </div>
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.06)" }}
            >
              <GeneralEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div className="py-4" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[680px] mx-auto flex items-center gap-4">
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #cac3d8)" }} />
            <span
              className="text-sm font-bold px-4 py-2 rounded-full"
              style={{ fontFamily: "Manrope, sans-serif", color: "#7a7487", backgroundColor: "#f0f3ff" }}
            >
              or
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #cac3d8)" }} />
          </div>
        </div>
      </div>

      {/* ── CONSULTING ENQUIRY ───────────────────────────────── */}
      <section id="consulting" className="scroll-mt-28 py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-[680px] mx-auto">
            <div className="mb-10">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
              >
                AI Consulting
              </span>
              <h2
                className="text-3xl font-extrabold mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}
              >
                Explore AI consulting for your business.
              </h2>
              <p style={{ color: "#494455" }}>
                Tell us a bit about your business and what you&apos;re trying to solve. We&apos;ll come back to you
                to arrange a free 30-minute discovery call — no sales pitch, just an honest conversation.
              </p>
            </div>
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 40px rgba(21,28,39,0.06)" }}
            >
              <ConsultingEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────────────── */}
      <section className="py-8" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <p className="text-center text-sm" style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}>
            ProjxAI · Collicorp Pty Ltd · ABN 80 398 642 662 · Brisbane, QLD, Australia
          </p>
        </div>
      </section>
    </>
  );
}
