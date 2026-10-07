import type { Experience } from "./types";

/**
 * Professional experience, most recent first.
 *
 * Several terms at the same company? Add them to one entry's `roles` array.
 * `display: "grouped"` nests them under the company; `"separate"` lists each
 * role on its own.
 */
export const experience: Experience[] = [
  {
    id: "experience-one",
    company: "Company",
    display: "grouped",
    roles: [
      {
        title: "Software Engineering",
        employmentType: "Co-op",
        start: "[Start]",
        end: "[End]",
        location: "[Location]",
        overview: "[Short overview of the team and what you worked on.]",
        technologies: [],
        responsibilities: ["[Responsibility]"],
        accomplishments: ["[Accomplishment]"],
      },
    ],
  },
  {
    id: "experience-two",
    company: "Company",
    display: "grouped",
    roles: [
      {
        title: "Software Engineering",
        employmentType: "Co-op",
        start: "[Start]",
        end: "[End]",
        location: "[Location]",
        overview: "[Short overview of the team and what you worked on.]",
        technologies: [],
        responsibilities: ["[Responsibility]"],
        accomplishments: ["[Accomplishment]"],
      },
    ],
  },
  {
    id: "experience-three",
    company: "Company",
    display: "grouped",
    roles: [
      {
        title: "Engineering",
        employmentType: "Other",
        start: "[Start]",
        end: "[End]",
        location: "[Location]",
        overview: "[Short overview of the team and what you worked on.]",
        technologies: [],
        responsibilities: ["[Responsibility]"],
        accomplishments: ["[Accomplishment]"],
      },
    ],
  },
];

/** Expands `separate` entries into one entry per role. */
export function experienceEntries(list: Experience[] = experience): Experience[] {
  return list.flatMap((e) =>
    e.display === "separate" && e.roles.length > 1
      ? e.roles.map((role, i) => ({ ...e, id: `${e.id}-${i + 1}`, roles: [role] }))
      : [e],
  );
}

export const formatDates = (start: string, end?: string) => `${start} — ${end ?? "Present"}`;
