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
        accomplishments: [""],
        notes: [
          "Selected to join a Women in Engineering meeting at Nokia, representing co-ops and newer generations alongside other women in the field.",
          "Also rejoined the Student Ambassadors team with NextGEN, supporting internal events and the student community.",
        ],
        artifacts: [
          {
            type: "image",
            src: "/photos/nokia-2026-1.jpg",
            alt: "Co-op session in a Nokia conference room",
          },
          {
            type: "image",
            src: "/photos/nokia-2026-2.jpg",
            alt: "Lounge seating area in the Nokia office",
          },
          {
            type: "image",
            src: "/photos/nokia-2026-3.jpg",
            alt: "Cafe common area at Nokia during the workday",
          },
        ],
        embeds: [
          {
            src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7493387156565045248?collapsed=1",
            title: "LinkedIn post",
            height: 628,
            width: 504,
            note: "Student Ambassador gang!",
          },
        ],
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
        overview: "Bridging Nokia’s NFM-P and NSP (Network Services Platform, by implementing a new dashlet within the NSP System Health Admin Dashboard, to display statuses and NFM-P data.",
        technologies: ["Java", "Spring Boot", "IntelliJ", "Linux", "Podman", "Jenkins", "Jira", "Confluence"],
        responsibilities: ["Developed the backend for the microservice and implementing components.", "Drove the project’s progression by working alongside engineers and UX designers, and refining subtasks and workflows."],
        accomplishments: [""],
        notes: [
          "Also served as a Student Ambassador with NextGEN, supporting internal events and the student community at Nokia.",
        ],
        artifacts: [
          {
            type: "image",
            src: "/photos/nokia-1.jpg",
            alt: "Nokia desk setup with logo on the monitor",
          },
          {
            type: "image",
            src: "/photos/nokia-2.jpg",
            alt: "Pickleball court in the Nokia lobby",
          },
          {
            type: "image",
            src: "/photos/nokia-3.jpg",
            alt: "Nokia student community event at Tailgators",
          },
          {
            type: "image",
            src: "/photos/nokia-4.jpg",
            alt: "Holiday gathering in the Nokia atrium",
          },
        ],
        embeds: [
          {
            src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7399600010578993152?collapsed=1",
            title: "LinkedIn post",
            height: 628,
            width: 504,
            note: "Ceremony for Nokia's upcoming campus, alongside Jeffrey Maddox, President of Nokia Canada, and David Heard, Head of Network Infrastructure.",
          },
        ],
      },
    ],
  },
  {
    id: "experience-three",
    company: "Canadian Intergovernmental Conference Secretariat (CICS)",
    shortName: "CICS",
    logo: "/logos/cics_50th_logo.webp",
    thumbnail: "/logos/cics.jpg",
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
    logo: "/logos/ccsn.png",
    thumbnail: "/logos/ccsn.png",
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
        notes: [
          "Covered major campus events including the Panda Game, Capital Hoops, and Colonel By at Ottawa TD Place.",
        ],
        artifacts: [
          {
            type: "image",
            src: "/photos/la-rotonde-1.jpg",
            alt: "Filming a basketball game for La Rotonde",
          },
          {
            type: "image",
            src: "/photos/la-rotonde-2.jpg",
            alt: "Camera playback on court with a La Rotonde media pass",
          },
          {
            type: "image",
            src: "/photos/la-rotonde-3.jpg",
            alt: "Basketball huddle on court during coverage",
          },
        ],
      },
    ],
  },
  {
    id: "experience-six",
    company: "Carleton University",
    shortName: "Carleton",
    logo: "/logos/carleton-logo.png",
    thumbnail: "/logos/carleton-sign.png",
    preview: "/logos/carleton-lab.jpg",
    display: "grouped",
    roles: [
      {
        title: "Lab Assistant",
        employmentType: "Part-time",
        start: "March 2022",
        end: "June 2022",
        location: "Ottawa, ON",
        overview:
          "Supported lab research at Carleton University as a high school student, running tasks alongside university peers and contributing to the research progression.",
        technologies: [],
        responsibilities: [],
        accomplishments: [
          "Reduced project timeline through effective multitasking and lab procedures, increasing project efficiency.",
          "Successfully collaborated with university peers, demonstrating advanced lab skills as a high school student.",
        ],
        embeds: [
          {
            src: "https://onlinelibrary.wiley.com/doi/10.1111/fwb.70066",
            title: "Freshwater Biology article — title page",
            image: "/photos/carleton-paper-1.png",
            note: "Acknowledged for technical assistance in Freshwater Biology (Wiley).",
          },
          {
            src: "https://onlinelibrary.wiley.com/doi/10.1111/fwb.70066",
            title: "Freshwater Biology article — acknowledgements",
            image: "/photos/carleton-paper-2.png",
            linkLabel: "Full article here",
          },
        ],
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
