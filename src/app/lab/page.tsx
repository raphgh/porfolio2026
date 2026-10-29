import type { Metadata } from "next";
import { LabHeader, LabItem, LabSheet, statusStyle } from "@/components/LabItem";
import { PageHeader } from "@/components/PageHeader";
import { lab } from "@/data/lab";
import type { LabStatus } from "@/data/types";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small experiments, prototypes and half-finished ideas.",
};

const legend: { label: string; status: LabStatus }[] = [
  { label: "Shipped", status: "SHIPPED" },
  { label: "Ongoing", status: "ONGOING" },
  { label: "Paused", status: "PAUSED" },
  { label: "Abandoned", status: "ABANDONED" },
];

export default function LabPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(03) — Experiments"
        title="Lab"
        intro="Smaller, lower-stakes things: prototypes, tools, and experiments I built to find something out. Not everything here worked — that’s the point."
      >
        <ul aria-label="Status legend" className="flex flex-wrap gap-2">
          {legend.map((l) => (
            <li key={l.label} className={`label rounded-full border px-2.5 py-1 ${statusStyle[l.status]}`}>
              {l.label}
            </li>
          ))}
        </ul>
      </PageHeader>
      <LabSheet>
        <LabHeader />
        {lab.map((item) => (
          <LabItem key={item.id} item={item} showDescription />
        ))}
      </LabSheet>
    </div>
  );
}
