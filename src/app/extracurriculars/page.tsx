import type { Metadata } from "next";
import { ExtracurricularCard } from "@/components/ExtracurricularCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { extracurriculars } from "@/data/extracurriculars";

export const metadata: Metadata = {
  title: "Extracurriculars",
  description: "Hackathons, community initiatives, leadership and events.",
};

export default function ExtracurricularsPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(03) — Beyond the job"
        title="Extracurriculars"
        intro="Hackathons, community initiatives, and the things I organise or show up for — mostly about people, not code."
      />
      <div className="flex flex-col gap-20 md:gap-32">
        {extracurriculars.map((item, i) => (
          <Reveal key={item.id}>
            <ExtracurricularCard item={item} index={i} variant="full" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
