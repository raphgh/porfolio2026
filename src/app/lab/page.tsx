import type { Metadata } from "next";
import { LabHeader, LabItem } from "@/components/LabItem";
import { PageHeader } from "@/components/PageHeader";
import { lab } from "@/data/lab";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small experiments, prototypes and half-finished ideas.",
};

const legend = [
  { label: "Shipped", className: "bg-accent" },
  { label: "Ongoing", className: "bg-ink" },
  { label: "Paused", className: "border border-ink" },
  { label: "Abandoned", className: "border border-ink-muted" },
];

export default function LabPage() {
  return (
    <div className="shell pb-24 md:pb-32">
      <PageHeader
        kicker="(04) — Experiments"
        title="Lab"
        intro="Smaller, lower-stakes things: prototypes, tools, and experiments I built to find something out. Not everything here worked — that’s the point."
      >
        <ul aria-label="Status legend" className="label flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2">
              <span aria-hidden className={`size-2 ${l.className}`} />
              {l.label}
            </li>
          ))}
        </ul>
      </PageHeader>
      <LabHeader />
      <div>
        {lab.map((item) => (
          <LabItem key={item.id} item={item} showDescription />
        ))}
      </div>
    </div>
  );
}
