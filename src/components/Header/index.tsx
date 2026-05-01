"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 64);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  const toolsItems = [
    {
      label: "AI Opportunity Audit",
      badge: "Free",
      desc: "14-question readiness check + full report",
      href: "/audit",
    },
    {
      label: "ROAS Calculator",
      badge: "Soon",
      desc: "Find out what your ad spend is really returning",
      href: "/tools",
    },
    {
      label: "Competitor Espionage Engine",
      badge: "Soon",
      desc: "Intelligence report on any competitor's ad strategy",
      href: "/tools",
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isToolsActive =
    isActive("/tools") || isActive("/audit");

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        sticky
          ? "glass-nav shadow-[0_40px_40px_rgba(21,28,39,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#6B3FE7"/>
              <path d="M8 28 L28 8 L22 22 Z" fill="white"/>
              <path d="M28 8 L8 28 L14 14 Z" fill="white" fillOpacity="0.45"/>
              <circle cx="18" cy="18" r="2.5" fill="#6B3FE7"/>
            </svg>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                letterSpacing: "-0.02em",
                color: "#151c27",
              }}
            >
              ProjxAI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.9375rem" }}
                className={`transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#6B3FE7] border-b-2 border-[#6B3FE7] pb-0.5"
                    : "text-[#151c27] hover:text-[#6B3FE7]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                onClick={() => setToolsOpen((v) => !v)}
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "0.9375rem" }}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  isToolsActive
                    ? "text-[#6B3FE7] border-b-2 border-[#6B3FE7] pb-0.5"
                    : "text-[#151c27] hover:text-[#6B3FE7]"
                }`}
              >
                Tools
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown panel */}
              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 20px 60px rgba(21,28,39,0.14)",
                    border: "1.5px solid #e7e0f8",
                  }}
                >
                  <div className="p-2">
                    {toolsItems.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-[#f5f0ff] transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="text-sm font-bold"
                              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                            >
                              {item.label}
                            </span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase"
                              style={{
                                backgroundColor: item.badge === "Free" ? "#6B3FE7" : "#e7eeff",
                                color: item.badge === "Free" ? "#ffffff" : "#7a7487",
                                fontFamily: "Manrope, sans-serif",
                              }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <p
                            className="text-xs leading-snug"
                            style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
                          >
                            {item.desc}
                          </p>
                        </div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "#6B3FE7" }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{ borderTop: "1px solid #f0ecfa", backgroundColor: "#faf8ff" }}
                  >
                    <Link
                      href="/tools"
                      onClick={() => setToolsOpen(false)}
                      className="text-xs font-bold"
                      style={{ color: "#6B3FE7", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      View all tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* CTA button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-primary-gradient inline-block px-7 py-3 rounded-xl text-white text-sm font-bold transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)] active:scale-95"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Open menu"
          >
            <span className={`block h-0.5 w-6 bg-[#151c27] transition-all duration-300 ${navbarOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#151c27] transition-all duration-300 ${navbarOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#151c27] transition-all duration-300 ${navbarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {navbarOpen && (
          <div className="md:hidden glass-nav rounded-2xl mb-4 px-6 py-6 shadow-[0_5px_40px_rgba(21,28,39,0.08)]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setNavbarOpen(false)}
                  className={`text-base font-semibold ${isActive(link.href) ? "text-[#6B3FE7]" : "text-[#151c27]"}`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Tools section */}
              <div className="pt-1 pb-1">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#7a7487", fontFamily: "Manrope, sans-serif" }}
                >
                  Tools
                </div>
                {toolsItems.map((item) => (
                  <Link
                    key={item.href + item.label + "mobile"}
                    href={item.href}
                    onClick={() => setNavbarOpen(false)}
                    className="flex items-center gap-2 py-2"
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: item.badge === "Free" ? "#6B3FE7" : "#e7eeff",
                        color: item.badge === "Free" ? "#ffffff" : "#7a7487",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {item.badge}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setNavbarOpen(false)}
                className="btn-primary-gradient mt-2 inline-block px-6 py-3 rounded-xl text-white text-sm font-bold text-center"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
