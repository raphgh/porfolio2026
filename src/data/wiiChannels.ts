import { site } from "./site";

export type ChannelThumbVariant =
  | "projects"
  | "lab"
  | "experience"
  | "me"
  | "blog"
  | "resume"
  | "contact"
  | "github"
  | "linkedin"
  | "awards"
  | "comingSoon";

export type WiiChannel = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  preview?: string;
  previewAlt?: string;
  accent?: string;
  /** Designed thumbnail face for the home grid. */
  thumb: ChannelThumbVariant;
  /** Show title badge on the tile face (top-left). Default false - hover tip handles naming. */
  showLabel?: boolean;
};

/**
 * Portfolio channels for the Wii Menu grid.
 * Empty slots (`null`) pad each 12-slot page with the disc-slot look.
 */
export const wiiChannels: WiiChannel[] = [
  {
    id: "about",
    label: "About",
    href: "/me",
    thumb: "me",
    accent: "#e88a6a",
  },
  {
    id: "experience",
    label: "Work",
    href: "/experience",
    thumb: "experience",
    accent: "#1a3a6e",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/work",
    thumb: "projects",
    accent: "#1f6b3a",
  },
  {
    id: "lab",
    label: "Lab",
    href: "/lab",
    thumb: "lab",
    accent: "#f0a06a",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
    thumb: "blog",
    accent: "#3fa9e0",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: site.contact.linkedin,
    external: true,
    thumb: "linkedin",
    accent: "#0a66c2",
  },
  {
    id: "contact",
    label: "Contact",
    href: `mailto:${site.contact.email}`,
    external: true,
    thumb: "contact",
    accent: "#3fa9e0",
  },
  {
    id: "github",
    label: "GitHub",
    href: site.contact.github,
    external: true,
    thumb: "github",
    accent: "#4a5560",
  },
  {
    id: "resume",
    label: "Resume",
    href: site.resume,
    external: true,
    thumb: "resume",
    accent: "#9fd8e8",
  },
  {
    id: "awards",
    label: "Awards",
    href: "/me#awards",
    thumb: "awards",
    accent: "#d4a017",
  },
];

/** Classic Wii board is 12 channel slots (4×3) per page. */
export const WII_BOARD_SLOTS = 12;

/** Two pages so a 5th column can peek and arrows have somewhere to go. */
export const WII_PAGE_COUNT = 2;

export function getWiiPageSlots(page: number): (WiiChannel | null)[] {
  const start = page * WII_BOARD_SLOTS;
  return Array.from({ length: WII_BOARD_SLOTS }, (_, i) => wiiChannels[start + i] ?? null);
}
