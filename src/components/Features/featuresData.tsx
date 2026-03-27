import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      // Wrench / tool icon
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
    title: "AI Tools",
    paragraph:
      "Free and paid tools built specifically for Australian businesses. Start with the ROAS Calculator — find out exactly what your ad spend should be returning.",
    link: "/tools",
    linkText: "Explore tools",
  },
  {
    id: 2,
    icon: (
      // Document / file-text icon
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v2H8v-2zm0-4h4v2H8V11z" />
      </svg>
    ),
    title: "AI Content",
    paragraph:
      "Blog posts, social copy, email sequences — produced at scale using AI workflows your team can actually use. More output, less time, consistent quality.",
    link: "/services/ai-content",
    linkText: "Learn more",
  },
  {
    id: 3,
    icon: (
      // Briefcase icon
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-10-2h4v2h-4V5zm10 14H4V9h16v10z" />
      </svg>
    ),
    title: "AI Consulting",
    paragraph:
      "Not sure where AI fits in your business? We audit your operations, identify the highest-value opportunities, and build you a practical implementation roadmap.",
    link: "/work-with-us",
    linkText: "Book a call",
  },
];

export default featuresData;
