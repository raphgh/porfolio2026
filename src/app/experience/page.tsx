import type { Metadata } from "next";
import { ExperienceGallery } from "@/components/ExperienceGallery";
import { PageHeader } from "@/components/PageHeader";
import { experienceEntries } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work experience — companies, teams, and impact.",
};

export default function ExperiencePage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader title="Experience" />
      <ExperienceGallery entries={experienceEntries()} />
    </div>
  );
}
