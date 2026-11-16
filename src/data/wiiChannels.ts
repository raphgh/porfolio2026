import { site } from "./site";

export type WiiChannel = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  preview?: string;
  previewAlt?: string;
  accent?: string;
  /** Show title badge on the tile face (top-left). Default false — hover tip handles naming. */
  showLabel?: boolean;
};

/**
 * Portfolio channels for the Wii Menu grid.
 * Empty slots pad each 12-slot page. Two pages enable peek + arrows.
 */
export const wiiChannels: WiiChannel[] = [
  {
    id: "projects",
    label: "Projects",
    href: "/work",
    preview: "/logos/yard365.png",
    previewAlt: "Projects preview",
    accent: "#fde0d2",
  },
  {
    id: "experience",
    label: "Experience",
    href: "/experience",
    preview: "/logos/nokia.jpg",
    previewAlt: "Experience preview",
    accent: "#fce8d8",
  },
  {
    id: "lab",
    label: "Lab",
    href: "/lab",
    preview: "/lab/emoji-blast.png",
    previewAlt: "Lab preview",
    accent: "#f9d6e4",
  },
  {
    id: "about",
    label: "About",
    href: "/me",
    preview: "/scrapbook/fundraiser.jpg",
    previewAlt: "About preview",
    accent: "#f5d0d4",
  },
  {
    id: "resume",
    label: "Resume",
    href: site.resume,
    external: true,
    accent: "#f5e6b8",
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
