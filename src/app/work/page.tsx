import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I’ve built — across backend, full-stack, systems, and interfaces.",
};

export default function WorkPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(01) — Projects"
        title="Projects"
        intro="Things I’ve worked on outside of professional roles!"
      />
      <WorkIndex projects={projects} />
    </div>
  );
}
