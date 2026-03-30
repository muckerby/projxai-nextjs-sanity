import { Metadata } from "next";
import { GeneralEnquiryForm, ConsultingEnquiryForm } from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact ProjxAI | Get in Touch",
  description:
    "Get in touch with ProjxAI. General enquiries, partnerships, and consulting discovery calls for Australian SMEs. Response within 1 business day.",
  openGraph: {
    title: "Contact ProjxAI | Get in Touch",
    description:
      "Get in touch with ProjxAI. General enquiries, partnerships, and consulting discovery calls for Australian SMEs. Response within 1 business day.",
    url: "https://www.projxai.com.au/contact",
    images: [{ url: "https://www.projxai.com.au/images/logo.png" }],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-white pt-[140px] pb-16 dark:bg-gray-dark md:pb-20">
        <div className="container">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Get in touch
            </h1>
            <p className="text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Whether you have a quick question or you&apos;re ready to explore what AI can do for your business — we&apos;re here. All enquiries are handled personally by Michael. Response within 1 business day.
            </p>
          </div>
        </div>
      </section>

      {/* General Enquiry form */}
      <section id="general" className="scroll-mt-28 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[620px]">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">General enquiry</h2>
              <p className="text-base text-body-color dark:text-body-color-dark">
                Partnerships, media requests, general questions — anything that doesn&apos;t need a discovery call.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-one dark:bg-dark md:p-10">
              <GeneralEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="mx-auto max-w-[620px]">
          <div className="flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-stroke dark:bg-stroke-dark" />
            <span className="text-sm text-body-color dark:text-body-color-dark">or</span>
            <div className="h-px flex-1 bg-stroke dark:bg-stroke-dark" />
          </div>
        </div>
      </div>

      {/* Consulting Enquiry form */}
      <section id="consulting" className="scroll-mt-28 bg-white py-16 dark:bg-gray-dark md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[620px]">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">
                Explore AI consulting for your business
              </h2>
              <p className="text-base text-body-color dark:text-body-color-dark">
                Tell us a bit about your business and what you&apos;re trying to solve. We&apos;ll come back to you to arrange a free 30-minute discovery call.
              </p>
            </div>
            <div className="rounded-lg bg-gray-light p-8 shadow-one dark:bg-dark md:p-10">
              <ConsultingEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="bg-gray-light py-10 dark:bg-bg-color-dark">
        <div className="container">
          <div className="mx-auto max-w-[620px] text-center">
            <p className="text-sm text-body-color dark:text-body-color-dark">
              ProjxAI | ABN 80 398 642 662 | Brisbane, QLD, Australia
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
