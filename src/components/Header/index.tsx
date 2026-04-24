"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 64);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Tools", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

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
            {/* Compass icon — filled purple circle with white navigation pointer */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#6B3FE7"/>
              {/* NE blade — bright white, tip pointing toward top-right */}
              <path d="M8 28 L28 8 L22 22 Z" fill="white"/>
              {/* SW blade — faded white, tip pointing toward bottom-left */}
              <path d="M28 8 L8 28 L14 14 Z" fill="white" fillOpacity="0.45"/>
              {/* Centre pivot hole */}
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
