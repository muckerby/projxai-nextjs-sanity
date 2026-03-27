import Link from "next/link";

const audiences = [
  {
    label: "SME Owner",
    body: "You know AI matters but don't know where to start. We'll show you exactly what to do first.",
    linkText: "Get a strategy",
    link: "/services/ai-consulting",
  },
  {
    label: "eCommerce Business",
    body: "You're spending hours on tasks that AI can automate in minutes. Let's fix that.",
    linkText: "See automation services",
    link: "/services/ai-automation",
  },
  {
    label: "Marketing Manager",
    body: "Your team needs to produce more content, faster. AI workflows make that possible.",
    linkText: "Explore AI content",
    link: "/services/ai-content",
  },
  {
    label: "Agency Owner",
    body: "Your clients are asking about AI. We help you deliver it — or build the capability in-house.",
    linkText: "Work with us",
    link: "/work-with-us",
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
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                {a.label}
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
