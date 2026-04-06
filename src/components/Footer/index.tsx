"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f0f3ff", borderRadius: "1.5rem 1.5rem 0 0", marginTop: "4rem" }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="15" stroke="#6B3FE7" strokeWidth="1.5" fill="none"/>
                <path d="M18 18 L23 13" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 18 L13 23" stroke="#6B3FE7" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.35"/>
                <circle cx="18" cy="18" r="2.5" fill="#6B3FE7"/>
              </svg>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "#151c27" }}>
                ProjxAI
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#494455" }}>
              Digital Architects for Australian SMEs. We implement AI that actually fits your business.
            </p>
            <p className="text-xs" style={{ color: "#7a7487" }}>ABN 80 398 642 662 · Brisbane, QLD</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h5 className="font-bold mb-5 text-sm uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif", color: "#151c27", letterSpacing: "0.05em" }}>
                Navigate
              </h5>
              <ul className="space-y-3">
                {[
                  { label: "Services", href: "/services" },
                  { label: "Tools", href: "/tools" },
                  { label: "Blog", href: "/blog" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors duration-200 hover:text-[#6B3FE7]" style={{ color: "#494455" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-5 text-sm uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif", color: "#151c27", letterSpacing: "0.05em" }}>
                Legal
              </h5>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors duration-200 hover:text-[#6B3FE7]" style={{ color: "#494455" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="https://linkedin.com/in/michaelcollicoat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:text-[#6B3FE7]"
                  style={{ backgroundColor: "#ffffff", color: "#151c27" }}
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 17 16" fill="currentColor">
                    <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #cac3d8, transparent)" }} />
        <div className="py-6 text-center text-xs" style={{ color: "#7a7487" }}>
          © 2026 ProjxAI · Collicorp Pty Ltd · ABN 80 398 642 662 · Brisbane, QLD, Australia
        </div>
      </div>
    </footer>
  );
};

export default Footer;
