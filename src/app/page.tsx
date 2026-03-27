import AudienceStrip from "@/components/AudienceStrip";
import Blog from "@/components/Blog";
import ConsultingCTA from "@/components/ConsultingCTA";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import ToolTeasers from "@/components/ToolTeasers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjxAI — AI for Australian Business",
  description:
    "ProjxAI helps Australian SMEs implement AI that saves time, reduces costs, and grows revenue. Plain English. Practical results. No in-house tech team required.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AudienceStrip />
      <Features />
      <ToolTeasers />
      <StatsStrip />
      <Blog />
      <ConsultingCTA />
    </>
  );
}
