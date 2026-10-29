/**
 * Global site configuration. Empty strings render as visible placeholders
 * instead of broken links, so fill these in as they become available.
 */
export const site = {
  name: "Raphaelle Ghanem",
  shortName: "rg",
  title: "Software Engineer",
  description:
    "Software engineering student building products end-to-end — from backend systems and APIs to interfaces and experiences.",
  /** Used for canonical URLs, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Drop the real file at /public/resume.pdf. */
  resume: "/resume.pdf",
  contact: {
    email: "",
    github: "",
    linkedin: "",
  },
} as const;

export const hero = {
  headline: {
    lead: "I build things at the intersection of",
    emphasis: "technology, design & culture.",
  },
  body: "Software engineering student building products end-to-end — from backend systems and APIs to interfaces and experiences. Outside of software, I make music, content, and other things I’m curious about.",
  capabilities: ["Backend", "APIs", "Full-stack", "Infrastructure", "Interfaces", "Product"],
} as const;

/** Primary site navigation (header / footer). Route paths are unchanged. */
export const nav = [
  { label: "Projects", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
] as const;

/** Stacked landing-page cards — includes Home as the first card. */
export const stackNav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
] as const;

/** Confirmed stack from the site itself — expand as real tools are added to data. */
export const technologies = [
  { name: "React", group: "Frameworks" as const },
  { name: "Next.js", group: "Frameworks" as const },
  { name: "TypeScript", group: "Languages" as const },
  { name: "Tailwind CSS", group: "Tools" as const },
  { name: "Motion", group: "Tools" as const },
  { name: "Vercel", group: "Infrastructure" as const },
] as const;
