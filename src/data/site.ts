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
    email: "rghan086@uottawa.ca",
    github: "https://github.com/raphgh",
    linkedin: "https://www.linkedin.com/in/raphaelle-ghanem/",
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

/**
 * Soft washes from the embroidery trail palette
 * (mustard, coral, peach, rose, terracotta) — one per stackNav entry.
 */
export const stackNavColors = [
  { bg: "#f5e6b8", border: "#e6b422", number: "#a87b0a" }, // Home — mustard
  { bg: "#fde0d2", border: "#f07a45", number: "#c45a28" }, // Projects — coral
  { bg: "#fce8d8", border: "#f0a06a", number: "#c47a3a" }, // Experience — peach
  { bg: "#f9d6e4", border: "#e85a8a", number: "#b03860" }, // Lab — rose
  { bg: "#f5d0d4", border: "#d94f5c", number: "#a83842" }, // About — terracotta
] as const;

/** Stack grouped for the About page — expand as tools change. */
export const technologies = [
  { name: "Java", group: "Languages" as const },
  { name: "Python", group: "Languages" as const },
  { name: "JavaScript", group: "Languages" as const },
  { name: "TypeScript", group: "Languages" as const },
  { name: "HTML", group: "Languages" as const },
  { name: "CSS", group: "Languages" as const },
  { name: "XML", group: "Languages" as const },
  { name: "C#", group: "Languages" as const },
  { name: "SQL", group: "Languages" as const },

  { name: "React.js", group: "Frameworks & APIs" as const },
  { name: "Next.js", group: "Frameworks & APIs" as const },
  { name: "Motion", group: "Frameworks & APIs" as const },
  { name: "Spring Boot", group: "Frameworks & APIs" as const },
  { name: ".NET", group: "Frameworks & APIs" as const },
  { name: "REST APIs", group: "Frameworks & APIs" as const },

  { name: "Figma", group: "Design & IDEs" as const },
  { name: "Cursor", group: "Design & IDEs" as const },
  { name: "IntelliJ", group: "Design & IDEs" as const },
  { name: "VS Code", group: "Design & IDEs" as const },
  { name: "Android Studio", group: "Design & IDEs" as const },
  { name: "Xcode", group: "Design & IDEs" as const },
  { name: "Microsoft SSMS", group: "Design & IDEs" as const },

  { name: "Linux", group: "Platforms & Ops" as const },
  { name: "Podman", group: "Platforms & Ops" as const },
  { name: "Kubernetes", group: "Platforms & Ops" as const },
  { name: "Jenkins", group: "Platforms & Ops" as const },

  { name: "Github", group: "Collaboration" as const },
  { name: "GitLab", group: "Collaboration" as const },
  { name: "Jira", group: "Collaboration" as const },
  { name: "Confluence", group: "Collaboration" as const },
] as const;
