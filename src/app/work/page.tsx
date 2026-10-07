import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects I’ve built — across backend, full-stack, systems, and interfaces.",
};

export default function WorkPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(01) — Projects"
        title="Work"
        intro="Things I’ve built outside of professional roles. Some are systems, some are products, some are interfaces — each one is written up the way it was actually built."
      />
      <WorkIndex projects={projects} />
    </div>
  );
}
