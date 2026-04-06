import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ProjxAI | AI Consultancy Brisbane Australia",
  description:
    "ProjxAI is founded by Michael Collicoat — 37 years of digital, technology and AI experience now focused on helping Australian SMEs navigate AI transformation.",
  openGraph: {
    title: "About ProjxAI | AI Consultancy Brisbane Australia",
    description:
      "ProjxAI is founded by Michael Collicoat — 37 years of digital, technology and AI experience now focused on helping Australian SMEs.",
    url: "https://www.projxai.com.au/about",
  },
};

export default function AboutPage() {
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
                Our Mission
              </span>
              <h1
                className="font-extrabold text-on-surface leading-[0.95] tracking-tighter mb-8"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  color: "#151c27",
                  letterSpacing: "-0.03em",
                }}
              >
                Architecting the{" "}
                <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>Future</span>
                <br />
                of Australian SMEs.
              </h1>
              <p className="text-xl max-w-xl leading-relaxed" style={{ color: "#494455" }}>
                We don&apos;t just implement software. We design digital foundations that empower
                local businesses to compete on a global scale using intentional AI integration.
              </p>
            </div>

            {/* Insight module */}
            <div className="lg:col-span-5 relative">
              <div
                className="aspect-[4/5] rounded-[2rem] overflow-hidden"
                style={{ boxShadow: "0 40px 80px rgba(21,28,39,0.12)" }}
              >
                <div
                  style={{
                    background: "linear-gradient(160deg, #1a1a2e 0%, #2d1b69 50%, #6b3fe7 100%)",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 400" fill="none">
                    <circle cx="150" cy="200" r="100" stroke="#ccbdff" strokeWidth="0.5" />
                    <circle cx="150" cy="200" r="70" stroke="#ccbdff" strokeWidth="0.5" />
                    <circle cx="150" cy="200" r="40" stroke="#ccbdff" strokeWidth="0.5" />
                    <circle cx="150" cy="100" r="4" fill="#ccbdff" />
                    <circle cx="230" cy="200" r="4" fill="#ccbdff" />
                    <circle cx="150" cy="300" r="4" fill="#ccbdff" />
                    <circle cx="70" cy="200" r="4" fill="#ccbdff" />
                    <line x1="150" y1="100" x2="230" y2="200" stroke="#ccbdff" strokeWidth="0.5" />
                    <line x1="230" y1="200" x2="150" y2="300" stroke="#ccbdff" strokeWidth="0.5" />
                    <line x1="150" y1="300" x2="70" y2="200" stroke="#ccbdff" strokeWidth="0.5" />
                    <line x1="70" y1="200" x2="150" y2="100" stroke="#ccbdff" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
              {/* Floating insight card */}
              <div
                className="absolute -bottom-8 -left-8 p-8 rounded-2xl max-w-xs hidden md:block"
                style={{
                  background: "rgba(249,249,255,0.85)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 40px 40px rgba(21,28,39,0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="#6B3FE7" opacity="0.2"/>
                    <path d="M12 7v5l3 3" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="font-bold text-sm" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    Australian Focus
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#494455" }}>
                  Proudly Brisbane-based. We understand the local business landscape and regulatory environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-4xl font-extrabold mb-8 leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}>
                Digital craftsmanship meets technical precision.
              </h2>
              <div className="space-y-5 text-lg leading-relaxed mb-10" style={{ color: "#494455" }}>
                <p>
                  ProjxAI was founded by Michael Collicoat — a technology and digital leader with
                  37 years of hands-on experience, from network engineering in Wellington through
                  to leading full-scale AI transformation at a national scale.
                </p>
                <p>
                  The gap Michael saw was clear: most businesses attempting AI adoption were failing
                  not because the technology wasn&apos;t there, but because no one had taken the time
                  to understand their processes, data, and team readiness first. ProjxAI exists to
                  fix that.
                </p>
                <p>
                  Our approach is quiet, structured, and deeply integrated into your unique business
                  DNA — not another generic tool with a generic implementation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "37+", label: "Years in tech & digital" },
                  { value: "150+", label: "AI workflows deployed" },
                  { value: "94%", label: "Client satisfaction" },
                  { value: "5×", label: "Avg. ROI on automation" },
                ].map((s) => (
                  <div key={s.value}>
                    <div className="text-4xl font-black mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6B3FE7", letterSpacing: "-0.04em" }}>{s.value}</div>
                    <div className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif", color: "#151c27" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Value cards */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Intentional Design",
                  desc: "We believe AI should be invisible, yet indispensable. Our implementations prioritise human workflow over technical complexity.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Sovereign Expertise",
                  desc: "Proudly Australian owned and operated out of Brisbane. We understand the local regulatory landscape, market nuances, and business culture.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="9" cy="7" r="4" stroke="#6B3FE7" strokeWidth="1.5"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: "No Account Managers",
                  desc: "You work directly with Michael — the person who built the systems and understands your business. No intermediaries, no hand-offs.",
                },
              ].map((card) => (
                <div key={card.title} className="p-8 rounded-3xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 40px rgba(21,28,39,0.04)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e7eeff" }}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "#494455" }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.03em" }}>
              Starting the <span style={{ color: "#6B3FE7" }}>Conversation.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "#494455" }}>
              Ready to find out where AI fits in your business? Book a free 30-minute discovery call
              with Michael — no sales pitch, just an honest conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#consulting" className="btn-primary-gradient inline-block px-10 py-5 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Book a Discovery Call
              </Link>
              <Link href="/services" className="inline-block px-10 py-5 rounded-xl font-bold text-lg transition-colors" style={{ backgroundColor: "#dce2f3", color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
