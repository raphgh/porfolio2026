import Link from "next/link";
import type { Experience } from "@/data/types";
import { ExperienceCard, entryDates } from "./ExperienceCard";
import { Reveal } from "./Reveal";

export function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {entries.map((entry, i) => (
        <Reveal key={entry.id}>
          <ExperienceCard entry={entry} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

export function ExperienceIndex({ entries }: { entries: Experience[] }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white">
      <div
        aria-hidden
        className="label hidden grid-cols-12 gap-x-6 border-b border-navy/20 bg-navy-tint px-6 py-2.5 text-navy md:grid"
      >
        <span className="col-span-4">Company</span>
        <span className="col-span-3">Role</span>
        <span className="col-span-2">Type</span>
        <span className="col-span-3 text-right">Dates</span>
      </div>
      <ul>
        {entries.map((entry, i) => {
          const roles = Array.from(new Set(entry.roles.map((r) => r.title))).join(", ");
          const types = Array.from(new Set(entry.roles.map((r) => r.employmentType))).join(" · ");
          return (
            <li key={entry.id} className="border-t border-dashed border-silver first:border-t-0">
              <Link
                href={`/experience#${entry.id}`}
                className="group grid grid-cols-12 items-center gap-x-3 gap-y-1 px-4 py-5 transition-colors hover:bg-navy-tint/60 md:gap-x-6 md:px-6 md:py-6"
              >
                <span className="col-span-12 flex items-baseline gap-3 md:col-span-4">
                  <span aria-hidden className="font-mono text-xs text-mustard-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-heading text-navy">{entry.company}</span>
                </span>
                <span className="col-span-12 text-charcoal-soft md:col-span-3">{roles}</span>
                <span className="label col-span-6 rounded-full border border-navy/25 px-2.5 py-0.5 text-navy md:col-span-2">
                  {types}
                </span>
                <span className="label col-span-6 flex items-center justify-end gap-3 text-charcoal-soft md:col-span-3">
                  {entryDates(entry)}
                  <span
                    aria-hidden
                    className="grid size-7 place-items-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
