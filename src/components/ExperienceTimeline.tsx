import Link from "next/link";
import type { Experience } from "@/data/types";
import { ExperienceCard, entryDates } from "./ExperienceCard";
import { Reveal } from "./Reveal";

export function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {entries.map((entry) => (
        <Reveal key={entry.id}>
          <ExperienceCard entry={entry} />
        </Reveal>
      ))}
    </div>
  );
}

/** Compact index used on the homepage; each row deep-links into /experience. */
export function ExperienceIndex({ entries }: { entries: Experience[] }) {
  return (
    <ul className="border-b border-rule">
      {entries.map((entry) => {
        const roles = Array.from(new Set(entry.roles.map((r) => r.title))).join(", ");
        const types = Array.from(new Set(entry.roles.map((r) => r.employmentType))).join(" · ");
        return (
          <li key={entry.id} className="border-t border-rule">
            <Link
              href={`/experience#${entry.id}`}
              className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:bg-paper-deep/60 md:py-6"
            >
              <span className="col-span-12 text-heading font-medium md:col-span-4">{entry.company}</span>
              <span className="col-span-12 text-ink-soft md:col-span-3">{roles}</span>
              <span className="label col-span-6 text-ink-soft md:col-span-2">{types}</span>
              <span className="label col-span-6 flex items-center justify-end gap-3 text-ink-soft md:col-span-3">
                {entryDates(entry)}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
