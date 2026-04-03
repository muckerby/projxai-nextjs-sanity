import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: "Strategy First",
    paragraph:
      "Every engagement starts with a structured audit of your processes, your data, and your team. AI gets layered in where it creates real value, not where it sounds impressive.",
    link: "/services/ai-consulting",
    linkText: "We understand your business before we touch the AI",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v2H8v-2zm0-4h4v2H8V11z" />
      </svg>
    ),
    title: "Implementation, Not Advice",
    paragraph:
      "ProjxAI does not hand you a 90-page strategy document. We build the workflows, set up the tools, and make sure your team can use them without us in the room.",
    link: "/services/ai-implementation",
    linkText: "We build it. You run it.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-10-2h4v2h-4V5zm10 14H4V9h16v10z" />
      </svg>
    ),
    title: "Australian SME Focus",
    paragraph:
      "Enterprise AI consultants work with enterprise clients. We work with owner-operated businesses, marketing teams, and operators who need AI to pay for itself quickly.",
    link: "/services",
    linkText: "Built for businesses like yours, not BHP",
  },
];

export default featuresData;
