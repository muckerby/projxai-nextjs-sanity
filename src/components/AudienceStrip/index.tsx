import Link from "next/link";

const audiences = [
  {
    label: "SME Owner",
    heading: "You run the business. AI handles the repetition.",
    body: "From automating follow-ups to managing bookings after hours, we identify the workflows eating your week and eliminate them.",
    linkText: "Get a strategy",
    link: "/services/ai-consulting",
  },
  {
    label: "eCommerce Operator",
    heading: "More revenue. Less manual work.",
    body: "AI-driven content, smarter ad targeting, automated customer journeys. We build the systems that scale without scaling your headcount.",
    linkText: "See automation services",
    link: "/services/ai-automation",
  },
  {
    label: "Marketing Manager",
    heading: "Produce more. Spend less time producing it.",
    body: "AI content systems, briefing workflows, and automated reporting. We set up the production engine so your team focuses on strategy.",
    linkText: "Explore AI content",
    link: "/services/ai-content",
  },
  {
    label: "Agency Owner",
    heading: "Deliver AI services without building an AI team.",
    body: "White-label AI strategy and implementation for your clients. ProjxAI works behind the scenes so you can lead with AI capability.",
    linkText: "Work with us",
    link: "/contact",
  },
];

const AudienceStrip = () => {
  return (
    <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">
          Who We Work With
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div
              key={a.label}
              className="rounded-lg border border-stroke bg-white p-6 shadow-one dark:border-stroke-dark dark:bg-dark"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {a.label}
              </p>
              <h3 className="mb-3 text-base font-bold leading-snug text-black dark:text-white">
                {a.heading}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                {a.body}
              </p>
              <Link
                href={a.link}
                className="text-primary inline-flex items-center text-sm font-medium hover:underline"
              >
                {a.linkText}
                <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceStrip;
