import type { Metadata } from "next";
import { LabItem, LabSheet } from "@/components/LabItem";
import { PageHeader } from "@/components/PageHeader";
import { lab } from "@/data/lab";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small experiments, prototypes and half-finished ideas.",
};

export default function LabPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        title="Lab"
        intro="prototypes, hackathon projects, and other experiments."
      />
      <LabSheet>
        {lab.map((item) => (
          <LabItem key={item.id} item={item} showDescription />
        ))}
      </LabSheet>
    </div>
  );
}
