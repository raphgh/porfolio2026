import type { Experience, Media } from "./types";

/**
 * Professional experience, most recent first.
 *
 * Several terms at the same company? Add them to one entry's `roles` array.
 * `display: "grouped"` nests them under the company; `"separate"` lists each
 * role on its own.
 *
 * Logos live in `/public/logos/`. Point each entry's `logo` at the file path
 * (e.g. `/logos/nokia.jpg`). Omit `logo` to fall back to initials.
 *
 * Photo-strip placeholders: empty `src` renders a squircle slot until you
 * drop a real file in and point `src` at it (e.g. `/photos/nokia-1.jpg`).
 */
function photoSlots(label: string, count = 3): Media[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "image" as const,
    src: "",
    alt: `${label} — photo ${i + 1}`,
  }));
}

export const experience: Experience[] = [
  {
    id: "experience-one",
    company: "Nokia",
    shortName: "Nokia",
    logo: "/logos/nokia.jpg",
    thumbnail: "/logos/nokia.jpg",
    display: "grouped",
    roles: [
      {
        title: "Software Designer",
        employmentType: "Co-op",
        start: "May 2026",
        end: "Aug 2026",
        location: "Ottawa, ON",
        overview: "Continued work on the NSP System Health Admin Dashboard, and the NFM-P microservice.",
        technologies: ["Java", "Spring Boot", "Cursor", "Kubernetes K9s", "Jira", "Git/GitLab", "IntelliJ", "Linux", "Podman", "Gradle", "Jenkins"],
        responsibilities: [""],
        accomplishments: ["Accomplishment 1", "Accomplishment 2", "Accomplishment 3"],
        artifacts: photoSlots("Nokia"),
      },
    ], 
  },
  {
    id: "experience-two",
    company: "Nokia",
    shortName: "Nokia",
    logo: "/logos/nokia2.webp",
    thumbnail: "/logos/nokia2.webp",
    display: "grouped",
    roles: [
      {
        title: "Software Designer",
        employmentType: "Co-op",
        start: "Sep 2025",
        end: "Dec 2025",
        location: "Ottawa, ON",
        overview: "Designed and implemented software solutions for a variety of clients using a variety of technologies.",
        technologies: ["Java", "Spring Boot", "Docker", "Kubernetes"],
        responsibilities: ["Bridging Nokia’s NFM-P and NSP (Network Services Platform) by implementing a new dashlet within the NSP System Health Admin Dashboard, to display statuses and NFM-P data.", "Developing the backend for the microservice and implementing components using Java, Spring, REST APIs, Gradle, and Jenkins, and using tools such as IntelliJ, Linux, Podman, and Git/CVS throughout my term.", "Driving the project’s progression by working alongside cross-functional teams in NSP and UX, and refining Jira subtasks and workflows."],
        accomplishments: ["Accomplishment 1", "Accomplishment 2", "Accomplishment 3"],
        note: "Also served as a Student Ambassador with NextGEN, supporting internal events and the student community at Nokia.",
        artifacts: photoSlots("Nokia"),
      },
    ],
  },
  {
    id: "experience-three",
    company: "Canadian Intergovernmental Conference Secretariat (CICS)",
    shortName: "CICS",
    logo: "/logos/cics_50th_logo.webp",
    thumbnail: "/logos/cics_50th_logo.webp",
    display: "grouped",
    roles: [
      {
        title: "Full-Stack Systems Analyst",
        employmentType: "Co-op",
        start: "Jan 2025",
        end: "Apr 2025",
        location: "Ottawa, ON",
        overview: "Assisted with the development and maintenance of the internal CICS platform, as well as providing maintenance to the public-facing website.",
        technologies: ["Java", "C#", "HTML", "CSS", "JavaScript", "SQL", "Figma", "Razor views (.cshtml)"],
        responsibilities: ["Resolved software bugs and user-reported issues", "Implemented 3+ features, tested and deployed for public use.","Used SQL to analyze, retrieve, and modify database records to adapt to evolving user needs."],
        accomplishments: ["Resolved 20+ IT tickets and bugs", "Implemented 3 new features to the system", "Initiated the core UX/UI of a new internal platform and presented them to a team."],
      },
    ],
  },
  {
    id: "experience-four",
    company: "Canadian Cancer Survivor Network (CCSN)",
    shortName: "CCSN",
    logo: "/logos/CCSN_Logo_EN_SQUARE.png",
    thumbnail: "/logos/CCSN_Logo_EN_SQUARE.png",
    display: "grouped",
    roles: [
      {
        title: "Web Manager",
        employmentType: "Full-time",
        start: "Apr 2024",
        end: "July 2024",
        location: "Ottawa, ON",
        overview: "Researching up to date content for the Canadian Cancer Survivor Network (CCSN) website, about different types of cancer and how to support survivors.",
        technologies: ["Wordpress"],
        responsibilities: ["Improved website speed and efficiency through content optimization and WordPress enhancements.", "Reorganized content, reducing user navigation time and improving the overall user experience.","Updated outdated scientific information, ensuring 100% accuracy by sourcing the latest research and data."],
        accomplishments: ["Updated 50+ pages of content", "Increased website speed by 30%", "Improved user experience by 20%"],
      },
    ],
  },
  {
    id: "experience-five",
    company: "La Rotonde",
    shortName: "La Rotonde",
    logo: "/logos/cropped-La-Rotonde_Favicon.png",
    thumbnail: "/logos/la-rotonde.png",
    display: "grouped",
    roles: [
      {
        title: "Videographer",
        employmentType: "Part-time",
        start: "Sep 2023",
        end: "Apr 2024",
        location: "Ottawa, ON",
        overview:"Creating content about and for the uOttawa community, giving francophone students, athletes, and faculty members a voice to share their stories and experiences.",
        technologies: ["Capcut", "Canva", "Slack"],
        responsibilities: ["Attended weekly team meetings, attended student events, edited and produced videos, and uploaded videos to YouTube, Instagram, and TikTok.",],
        accomplishments: ["Produced 30+ videos", "Increased viewership by 20%", "Increased engagement by 30%"],
        note: "Covered major campus events including the Panda Game, Capital Hoops, and Colonel By at Ottawa TD Place.",
        artifacts: photoSlots("La Rotonde"),
      },
    ],
  },
  {
    id: "experience-six",
    company: "Carleton University",
    shortName: "Carleton University",
    logo: "/logos/",
    thumbnail: "/logos/",
    display: "grouped",
    roles: [
      {
        title: "Lab Assistant",
        employmentType: "Part-time",
        start: "March 2022",
        end: "June 2022",
        location: "Ottawa, ON",
        overview:"",
        technologies: [""],
        responsibilities: [", , .",],
        accomplishments: [" %"],
        artifacts: photoSlots("Carleton University"),
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
