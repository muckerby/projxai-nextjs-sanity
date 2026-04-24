import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ProjxAI",
  description:
    "How ProjxAI collects, uses, and protects your personal information — written in plain English.",
  openGraph: {
    title: "Privacy Policy | ProjxAI",
    description:
      "How ProjxAI collects, uses, and protects your personal information — written in plain English.",
    url: "https://www.projxai.com.au/privacy",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h1
              className="mb-4 font-extrabold leading-[1.05]"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em", color: "#151c27" }}
            >
              Privacy Policy
            </h1>
            <p className="mb-3 text-lg" style={{ color: "#494455" }}>
              The short version: we collect only what we need, we don&apos;t sell it, and you can ask us to delete it any time.
            </p>
            <p className="text-sm" style={{ color: "#888" }}>
              Last updated: 17 April 2026
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px] space-y-10 text-base leading-relaxed text-body-color dark:text-body-color-dark">

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>1. Who we are</h2>
              <p>
                ProjxAI is operated by Collicorp Pty Ltd (ABN 80 398 642 662), based in Brisbane, QLD, Australia. We take your privacy seriously and comply with the Australian Privacy Act 1988 and the Australian Privacy Principles.
              </p>
              <p className="mt-3">
                This policy explains what information we collect, why we collect it, how we use it, and your rights. If you have questions, the easiest way to reach us is through the contact page.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>2. What we collect</h2>
              <p className="mb-3">We only collect information that&apos;s genuinely useful for working with you:</p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong style={{ color: "#151c27" }}>Contact details</strong> — name, email, and phone number when you fill in a form or get in touch directly.</li>
                <li><strong style={{ color: "#151c27" }}>Business context</strong> — company name, industry, and relevant details you share during a discovery call or consultation.</li>
                <li><strong style={{ color: "#151c27" }}>Anonymous usage data</strong> — pages visited, time on site, and browser type, collected automatically to help us improve the site.</li>
              </ul>
              <p className="mt-3">
                We don&apos;t collect anything we don&apos;t need.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>3. How we use it</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Respond to your enquiries and deliver our consulting services</li>
                <li>Send updates about our services and tools — only if you&apos;ve opted in</li>
                <li>Improve the site based on how people actually use it</li>
                <li>Meet our legal obligations where required</li>
              </ul>
              <p className="mt-3">
                We won&apos;t use your information for anything else without asking you first.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>4. Cookies</h2>
              <p className="mb-3">
                We use cookies to keep the site working properly and to understand how people use it. That&apos;s it.
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong style={{ color: "#151c27" }}>Essential cookies</strong> — keep the site functional.</li>
                <li><strong style={{ color: "#151c27" }}>Analytics cookies</strong> — anonymous data on how the site is used (via Vercel Analytics). No individual is identified.</li>
              </ul>
              <p className="mt-3">
                You can turn off cookies in your browser settings if you prefer.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>5. Third-party tools</h2>
              <p className="mb-3">
                We use a small number of third-party services to run the site and manage our work:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong style={{ color: "#151c27" }}>Vercel</strong> — website hosting and performance analytics</li>
                <li><strong style={{ color: "#151c27" }}>Sanity</strong> — content management</li>
                <li><strong style={{ color: "#151c27" }}>HubSpot</strong> — CRM for managing enquiries and client relationships</li>
                <li><strong style={{ color: "#151c27" }}>Resend</strong> — transactional email delivery</li>
              </ul>
              <p className="mt-3">
                Each has its own privacy policy. We never sell your information.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>6. Security</h2>
              <p>
                We use industry-standard security practices to protect your information. Some data may be stored on servers outside Australia (for example, on Vercel&apos;s global infrastructure) — where that&apos;s the case, it&apos;s handled in accordance with applicable privacy laws.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>7. Sharing your information</h2>
              <p>
                We don&apos;t share your personal information with anyone except as needed to operate our services (e.g., passing form submissions to our CRM), or when required by law. We never sell, rent, or trade your data.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>8. Your rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>See what information we hold about you</li>
                <li>Ask us to correct anything that&apos;s wrong</li>
                <li>Request we delete your data (subject to any legal obligations we may have)</li>
                <li>Unsubscribe from any marketing communications at any time</li>
                <li>Raise a complaint with the <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: "#6B3FE7" }} className="hover:underline">Office of the Australian Information Commissioner (OAIC)</a></li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>9. Getting in touch</h2>
              <p>
                For any privacy-related questions or requests, reach us through our contact page. We aim to respond within 5 business days.
              </p>
              <p className="mt-3">
                <a href="/contact" style={{ color: "#6B3FE7" }} className="font-medium hover:underline">
                  Contact us →
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold" style={{ color: "#151c27" }}>10. Updates to this policy</h2>
              <p>
                We may update this policy occasionally. When we do, we&apos;ll update the date at the top of the page. Continuing to use the site after changes are posted means you&apos;re comfortable with the updated policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
