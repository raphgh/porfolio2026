import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PageHeader } from "@/components/PageHeader";
import { experienceEntries } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional software engineering experience — teams, systems, and impact.",
};

export default function ExperiencePage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(02) — Professional"
        title="Experience"
        intro="Where I’ve worked on real teams and production systems — what I worked on, the technology involved, and what changed because of it."
      />
      <ExperienceTimeline entries={experienceEntries()} />
    </div>
  );
}
