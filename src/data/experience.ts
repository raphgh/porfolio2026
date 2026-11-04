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
    company: "Nokia",
    display: "grouped",
    roles: [
      {
        title: "Software Designer",
        employmentType: "Co-op",
        start: "May 2026",
        end: "Aug 2026",
        location: "Ottawa, ON",
        overview: "Designed and implemented software solutions for a variety of clients using a variety of technologies.",
        technologies: ["Java", "Spring Boot", "Docker", "Kubernetes"],
        responsibilities: ["Designed and implemented software solutions for a variety of clients using a variety of technologies."],
        accomplishments: ["Accomplishment 1", "Accomplishment 2", "Accomplishment 3"],
      },
    ],
  },
  {
    id: "experience-two",
    company: "Nokia",
    display: "grouped",
    roles: [
      {
        title: "Software Designer",
        employmentType: "Co-op",
        start: "Sep 2026",
        end: "Dec 2026",
        location: "Ottawa, ON",
        overview: "Designed and implemented software solutions for a variety of clients using a variety of technologies.",
        technologies: ["Java", "Spring Boot", "Docker", "Kubernetes"],
        responsibilities: ["Designed and implemented software solutions for a variety of clients using a variety of technologies."],
        accomplishments: ["Accomplishment 1", "Accomplishment 2", "Accomplishment 3"],
      },
    ],
  },
  {
    id: "experience-three",
    company: "Canadian Intergovernmental Conference Secretariat (CICS)",
    display: "grouped",
    roles: [
      {
        title: "Full-Stack Systems Analyst",
        employmentType: "Co-op",
        start: "Jan 2025",
        end: "Apr 2025",
        location: "Ottawa, ON",
        overview: "Assisted with the development and maintenance of the internal CICS platform, as well as providing maintenance to the public-facing website.",
        technologies: ["Java", "C#", "HTML", "CSS", "JavaScript", "SQL", "Figma"],
        responsibilities: [""],
        accomplishments: ["Resolved 20+ IT tickets and bugs", "Implemented 3 new features to the system", "Initiated the core UX/UI of a new internal platform and presented them to a team."],
      },
    ],
  },
  {
    id: "experience-four",
    company: "Canadian Cancer Survivor Network (CCSN)",
    display: "grouped",
    roles: [
      {
        title: "Web Manager",
        employmentType: "Full-time",
        start: "Apr 2025",
        end: "July 2025",
        location: "Ottawa, ON",
        overview: "Researching up to date content for the ",
        technologies: ["Wordpress"],
        responsibilities: ["[Responsibility]"],
        accomplishments: ["[Accomplishment]"],
      },
    ],
  },
  {
    id: "experience-five",
    company: "La Rotonde",
    display: "grouped",
    roles: [
      {
        title: "Videographer",
        employmentType: "Part-time",
        start: "Sep 2024",
        end: "Apr 2025",
        location: "Ottawa, ON",
        overview: "Creating content about and for the uOttawa community, giving francophone students, athletes, and faculty members a voice to share their stories and experiences.",
        technologies: ["Capcut", "Canva", "Slack"],
        responsibilities: ["Attended weekly team meetings, attended student events, edited and produced videos, and uploaded videos to YouTube, Instagram, and TikTok."],
        accomplishments: ["Produced 30+ videos","Inceased viewership by 20%", "Increased engagement by 30%"],
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
