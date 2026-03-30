import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ProjxAI",
  description:
    "ProjxAI Terms of Service — governing law, limitation of liability, consulting services scope, and your use of projxai.com.au.",
  openGraph: {
    title: "Terms of Service | ProjxAI",
    description:
      "ProjxAI Terms of Service — governing law, limitation of liability, consulting services scope, and your use of projxai.com.au.",
    url: "https://www.projxai.com.au/terms",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Terms of Service
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
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">1. Agreement to terms</h2>
              <p>
                By accessing and using <strong className="text-black dark:text-white">projxai.com.au</strong> (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site. These terms apply to all visitors, users, and clients of ProjxAI (operated by Michael Collicoat, ABN 80 398 642 662, Brisbane, QLD, Australia).
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">2. Use of this site</h2>
              <p className="mb-3">You agree to use this Site only for lawful purposes. You must not:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Use the Site in any way that violates applicable Australian or Queensland law</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
                <li>Transmit any unsolicited commercial communications via the Site</li>
                <li>Use the Site to distribute malware or other harmful code</li>
                <li>Reproduce or republish any Site content without prior written permission</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">3. Consulting services</h2>
              <p className="mb-3">
                Where ProjxAI provides consulting, implementation, or advisory services, the following applies:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>All services are scoped and agreed in writing prior to commencement</li>
                <li>Deliverables, timelines, and pricing are confirmed in a separate engagement agreement</li>
                <li>ProjxAI provides services based on information and access provided by the client — we cannot be held responsible for outcomes arising from incomplete or inaccurate information</li>
                <li>Consulting engagements do not constitute a guarantee of specific business outcomes or revenue results</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">4. No guarantees on AI outcomes</h2>
              <p>
                AI tools, systems, and strategies carry inherent uncertainty. ProjxAI will always act in your best interests and apply professional expertise, but we cannot guarantee specific outcomes from AI implementation. Results depend on factors outside our control, including your business conditions, data quality, market factors, and the evolving nature of AI technology.
              </p>
              <p className="mt-3">
                Recommendations and roadmaps are based on information available at the time of engagement. We do not guarantee that AI tools or platforms we recommend will remain available, affordable, or fit for purpose indefinitely.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">5. Intellectual property</h2>
              <p>
                All content on this Site — including text, graphics, logos, and tools — is the intellectual property of ProjxAI unless otherwise stated. You may not reproduce, distribute, or use any content without prior written consent.
              </p>
              <p className="mt-3">
                Where ProjxAI creates custom deliverables (reports, tools, workflows) for a client engagement, ownership is agreed in the individual engagement contract. By default, deliverables become the property of the client upon full payment.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">6. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, ProjxAI and its director(s) are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of this Site or our services. This includes loss of revenue, loss of data, or business interruption.
              </p>
              <p className="mt-3">
                Our total liability for any claim arising from a consulting engagement shall not exceed the total fees paid by you for that engagement.
              </p>
              <p className="mt-3">
                Nothing in these terms excludes liability that cannot be excluded under the <strong className="text-black dark:text-white">Australian Consumer Law</strong> or other applicable legislation.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">7. Third-party links and tools</h2>
              <p>
                This Site may contain links to third-party websites or reference third-party tools and platforms. These are provided for convenience only. ProjxAI does not endorse and is not responsible for the content, accuracy, or practices of third-party sites or services.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">8. Disclaimer</h2>
              <p>
                This Site and its content are provided &ldquo;as is&rdquo; without warranty of any kind. ProjxAI makes no representations about the accuracy or completeness of the information on this Site. Content may be updated or removed at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">9. Governing law</h2>
              <p>
                These Terms of Service are governed by the laws of Queensland, Australia. Any disputes arising from these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Queensland, Australia.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">10. Changes to these terms</h2>
              <p>
                We may update these Terms of Service from time to time. Changes will be posted on this page with a revised &ldquo;last updated&rdquo; date. Continued use of the Site after changes are posted constitutes your acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">11. Contact</h2>
              <p>
                Questions about these terms? Contact us at:
              </p>
              <p className="mt-3">
                <a
                  href="/contact"
                  className="text-primary font-medium hover:underline"
                >
                  Contact us via our contact page →
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
