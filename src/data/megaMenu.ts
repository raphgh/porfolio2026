import { about } from "./about";
import { experienceEntries } from "./experience";
import { lab } from "./lab";
import { projects } from "./projects";
import { nav } from "./site";

export type MegaMenuItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type MegaMenuColumn = {
  label: string;
  href: string;
  description?: string;
  items: MegaMenuItem[];
};

/** Columns for the header mega menu — one per primary section. */
export function megaMenuColumns(): MegaMenuColumn[] {
  const experienceItems: MegaMenuItem[] = experienceEntries().map((entry) => {
    const role = entry.roles[0];
    const name = entry.shortName ?? entry.company;
    const title = role?.title;
    const label = [name, title].filter(Boolean).join(" · ");
    return {
      label,
      href: `/experience#${entry.id}`,
      description: role?.overview || title || name,
    };
  });

  const projectItems: MegaMenuItem[] = projects.map((project) => ({
    label: project.title,
    href: `/work#${project.slug}`,
    description: project.summary,
  }));

  const labItems: MegaMenuItem[] = lab.map((item) => {
    const live = Boolean(item.link?.href && item.link.href !== "#");
    return {
      label: item.title,
      href: live ? item.link!.href : `/lab#${item.id}`,
      description: item.description ?? item.result,
      external: live,
    };
  });

  const meItems: MegaMenuItem[] = [
    {
      label: "Overview",
      href: "/me",
      description: about.paragraphs[0] || "A bit about me.",
    },
    {
      label: "Scrapbook",
      href: "/me#scrapbook",
      description: "Photos and moments from along the way.",
    },
    {
      label: "Inspirations",
      href: "/me#inspo",
      description: "Creators and products I appreciate.",
    },
    {
      label: "Reads",
      href: "/me#reads",
      description: "Books on the shelf right now.",
    },
    {
      label: "Technologies",
      href: "/me#tech",
      description: "Languages, tools, and platforms I've used.",
    },
  ];

  const byHref: Record<string, MegaMenuColumn> = {
    "/me": {
      label: "Me",
      href: "/me",
      description: "Bio, scrapbook, inspirations, and tools.",
      items: meItems,
    },
    "/experience": {
      label: "Experience",
      href: "/experience",
      description: "Roles, teams, and what I worked on.",
      items: experienceItems,
    },
    "/work": {
      label: "Projects",
      href: "/work",
      description: "Selected software and product work.",
      items: projectItems,
    },
    "/lab": {
      label: "Lab",
      href: "/lab",
      description: "Prototypes, hackathons, and experiments.",
      items: labItems,
    },
  };

  return nav.map((item) => byHref[item.href]).filter(Boolean);
}
