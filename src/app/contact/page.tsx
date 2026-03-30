import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ProjxAI | Get in Touch",
  description:
    "Get in touch with ProjxAI. General enquiries, partnerships, and media requests — email michaelc@projxai.com.au. Response within 1 business day.",
  openGraph: {
    title: "Contact ProjxAI | Get in Touch",
    description:
      "Get in touch with ProjxAI. General enquiries, partnerships, and media requests — email michaelc@projxai.com.au. Response within 1 business day.",
    url: "https://www.projxai.com.au/contact",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Get in touch
            </h1>
            <p className="text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              General enquiries, partnerships, and media requests welcome. We respond to every email personally — no automated responses, no offshore VAs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[560px]">
            <div className="rounded-lg bg-white p-10 shadow-one dark:bg-dark text-center">
              <div className="text-primary mb-6 flex justify-center">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Email us</h2>
              <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
                For general enquiries, partnerships, and media requests:
              </p>
              <a
                href="mailto:michaelc@projxai.com.au"
                className="inline-block text-xl font-semibold text-primary hover:underline"
              >
                michaelc@projxai.com.au
              </a>
              <p className="mt-6 text-sm text-body-color dark:text-body-color-dark">
                Response within 1 business day.
              </p>
            </div>

            <div className="mt-8 rounded-lg bg-primary/5 border border-primary/20 px-8 py-6 text-center dark:bg-primary/10">
              <p className="mb-3 text-base font-medium text-black dark:text-white">
                Looking to work with us?
              </p>
              <p className="mb-5 text-sm text-body-color dark:text-body-color-dark">
                For consulting enquiries and discovery call bookings, visit our Work With Us page.
              </p>
              <Link
                href="/work-with-us"
                className="inline-block rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white duration-300 hover:bg-primary/80"
              >
                Book a free discovery call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[560px] text-center">
            <p className="text-sm text-body-color dark:text-body-color-dark">
              ProjxAI | ABN 80 398 642 662 | Brisbane, QLD, Australia
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
