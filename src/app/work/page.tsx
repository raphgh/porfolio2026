import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I’ve built outside of professional roles.",
};

export default function WorkPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        title="Projects"
        intro="case studies for each project to be added soon!"
      />
      <WorkIndex projects={projects} />
    </div>
  );
}
