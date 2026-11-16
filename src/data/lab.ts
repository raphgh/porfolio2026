import type { LabEntry, LabExperiment } from "./types";

/**
 * Lab message-board entries — single source for the Wii calendar + list.
 * `date` is ISO so the calendar can mark days.
 */
export const labEntries: LabEntry[] = [
  {
    id: "figbuild-2026",
    title: "FigBuild Hackathon 2026",
    icon: "/lab/figma.svg",
    status: "SHIPPED",
    date: "2026-03-15",
    description:
      "Figma’s annual design comp, with 600+ participating teams - designing a tool that tracks and influences something invisible/previously unmeasurable about the human sensory experience. built in 72 hours from concept to working prototype.",
    tech: ["Figma", "Figma Make"],
    result: "Shipped an online hackathon project with Figma and Figma Make AI.",
    href: "https://figbuild2026.devpost.com/",
    color: "#a259ff",
  },
  {
    id: "service-prototype",
    title: "Lumiere Studio",
    icon: "/lab/lumiere-studio.jpg",
    status: "SHIPPED",
    date: "2025-07-15",
    description: "Photography studio website / booking prototype.",
    tech: ["React", "HTML", "CSS", "JavaScript"],
    result: "Complete prototype site",
    href: "https://amykayrala.github.io/photography-service-site/",
    color: "#3fa9e0",
  },
  {
    id: "ecommerce-prototype",
    title: "Blossom Blocks",
    icon: "/lab/blossom-blocks.jpg",
    status: "SHIPPED",
    date: "2025-07-22",
    description: "Building-block ecommerce site prototype.",
    tech: ["React", "HTML", "CSS", "JavaScript"],
    result: "Complete prototype site",
    href: "https://amykayrala.github.io/blossom-blocks/",
    color: "#e85a8a",
  },
  {
    id: "game-prototype",
    title: "Emoji Blast!",
    icon: "/lab/emoji-blast.png",
    status: "SHIPPED",
    date: "2025-06-12",
    description: "Simple memory game.",
    tech: ["React", "HTML", "CSS", "JavaScript"],
    result: "Complete game",
    href: "https://amykayrala.github.io/memory-game/",
    color: "#e6b422",
  },
  {
    id: "uottahack",
    title: "uOttahack Hackathon",
    icon: "/lab/hackbibis.png",
    status: "SHIPPED",
    date: "2025-01-18",
    description: "uOttahack team build; data parsing app.",
    tech: ["Gadget"],
    result: "Group hackathon project for uOttahack",
    href: "https://hackbibis.gadget.app/",
    color: "#f07a45",
  },
  {
    id: "hack-the-hill",
    title: "Hack the Hill Hackathon",
    status: "ABANDONED",
    date: "2024-09-20",
    description: "Team build at Hack the Hill.",
    tech: ["Figma", "HTML", "CSS", "JavaScript"],
    result: "Group hackathon project",
    color: "#8a96a3",
  },
  {
    id: "personal-site-test",
    title: "Test Personal Website",
    status: "ABANDONED",
    date: "2025-06-01",
    description: "Early personal website experiment with React.",
    tech: ["React", "HTML", "CSS", "JavaScript"],
    result: "Complete personal site",
    href: "https://rgportfolio-ebon.vercel.app/index.html",
    color: "#6a7580",
  },
];

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** Modern-mode / mega-menu adapter — same content, display dates. */
export const lab: LabExperiment[] = labEntries.map((entry) => ({
  id: entry.id,
  title: entry.title,
  date: monthFmt.format(new Date(`${entry.date}T12:00:00Z`)),
  technology: entry.tech,
  result: entry.result,
  description: entry.description,
  status: entry.status,
  link: entry.href ? { label: "View", href: entry.href } : undefined,
  media: entry.icon
    ? { type: "image" as const, src: entry.icon, alt: `${entry.title} icon` }
    : undefined,
}));
