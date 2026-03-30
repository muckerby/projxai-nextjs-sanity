import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ProjxAI",
  description:
    "ProjxAI Privacy Policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988.",
  openGraph: {
    title: "Privacy Policy | ProjxAI",
    description:
      "ProjxAI Privacy Policy — how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988.",
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
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-body-color dark:text-body-color-dark">
              Last updated: 30 March 2026
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[720px] space-y-10 text-base leading-relaxed text-body-color dark:text-body-color-dark">

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">1. Overview</h2>
              <p>
                ProjxAI (operated by Michael Collicoat, ABN 80 398 642 662, Brisbane, QLD, Australia) is committed to protecting your personal information in accordance with the <strong className="text-black dark:text-white">Australian Privacy Act 1988 (Cth)</strong> and the Australian Privacy Principles (APPs).
              </p>
              <p className="mt-3">
                This policy explains what information we collect, why we collect it, how we use it, and your rights regarding your data.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">2. Information we collect</h2>
              <p className="mb-3">We may collect the following types of personal information:</p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-black dark:text-white">Contact information:</strong> name, email address, phone number — when you contact us directly or submit an enquiry form.</li>
                <li><strong className="text-black dark:text-white">Business information:</strong> company name, industry, and business details you share during discovery calls or consultations.</li>
                <li><strong className="text-black dark:text-white">Usage data:</strong> pages visited, time on site, browser type, and device information — collected automatically via analytics tools.</li>
                <li><strong className="text-black dark:text-white">Email address:</strong> if you sign up for our tools waitlist or notification list.</li>
              </ul>
              <p className="mt-3">
                We collect only the information that is necessary for the purposes described in this policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">3. How we use your information</h2>
              <p className="mb-3">We use your personal information to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Respond to your enquiries and provide consulting services</li>
                <li>Send you information about our services, tools, and updates (where you have opted in)</li>
                <li>Improve our website and services based on usage patterns</li>
                <li>Comply with our legal and regulatory obligations</li>
              </ul>
              <p className="mt-3">
                We will not use your personal information for any purpose other than those described above without your consent.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">4. Cookies and tracking</h2>
              <p className="mb-3">
                Our website uses cookies and similar tracking technologies to improve your browsing experience and to collect anonymous usage statistics. Cookies we use may include:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-black dark:text-white">Essential cookies:</strong> required for the website to function correctly.</li>
                <li><strong className="text-black dark:text-white">Analytics cookies:</strong> used to understand how visitors interact with the site (e.g., Google Analytics or Vercel Analytics). These are anonymised and do not identify individuals.</li>
              </ul>
              <p className="mt-3">
                You can disable cookies in your browser settings, though some features of the site may not function as expected.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">5. Third-party services</h2>
              <p className="mb-3">
                We use the following third-party services that may collect or process your data:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-black dark:text-white">Vercel</strong> — website hosting and analytics</li>
                <li><strong className="text-black dark:text-white">Sanity</strong> — content management system</li>
                <li><strong className="text-black dark:text-white">Google Analytics</strong> — website traffic analytics (if enabled)</li>
              </ul>
              <p className="mt-3">
                These services have their own privacy policies and data handling practices. We encourage you to review them. We do not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">6. Data storage and security</h2>
              <p>
                Your personal information is stored securely using industry-standard practices. We take reasonable steps to protect your data from misuse, loss, and unauthorised access. Data may be stored on servers located outside Australia (e.g., Vercel infrastructure), in which case it is subject to the privacy laws of that jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">7. Disclosure of your information</h2>
              <p>
                We will not share your personal information with third parties except where required by law, or where you have given explicit consent. We do not sell, rent, or trade your personal data.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">8. Your rights</h2>
              <p className="mb-3">Under the Australian Privacy Act, you have the right to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information (subject to legal obligations)</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with the <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Office of the Australian Information Commissioner (OAIC)</a></li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">9. Contact for privacy matters</h2>
              <p>
                For any privacy-related enquiries, requests, or complaints, please contact us at:
              </p>
              <p className="mt-3">
                <a
                  href="/contact"
                  className="text-primary font-medium hover:underline"
                >
                  Contact us via our contact page →
                </a>
              </p>
              <p className="mt-2 text-sm">
                We will respond to all privacy enquiries within 5 business days.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">10. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be published on this page with a revised &ldquo;last updated&rdquo; date. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
