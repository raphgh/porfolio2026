import type { ScrapbookItem } from "./types";

/**
 * Draft copy built only from what's already stated elsewhere on the site.
 * Rewrite in your own voice and add specifics (school, city, current focus).
 */
export const about = {
  intro: "I’m a software engineering student who likes building the whole thing.",
  paragraphs: [
    "Most of what I make starts with a question about how something should work — then turns into a system, an interface, and eventually a product someone can actually use. I care about the parts nobody sees as much as the parts everybody does.",
    "Outside of software I make music, play guitar, and make content. I’m drawn to community work and to technology that does some good — socially and environmentally. Those things aren’t separate from engineering for me; they’re where a lot of my product instincts come from.",
  ],
  interests: [
    "Software engineering",
    "Product thinking",
    "Music",
    "Community",
    "Tech for social & environmental good",
    "Creative projects",
  ],
  /** Short preview used on the homepage. */
  preview:
    "Engineer first, but rarely only that. I make music, content, and community — and bring that curiosity back into what I build.",
};

/** A few strong images — not a creative portfolio. Add `media` to replace a frame. */
export const scrapbook: ScrapbookItem[] = [
  { caption: "Music", tilt: -2.5 },
  { caption: "Guitar", tilt: 1.5 },
  { caption: "Content", tilt: -1 },
  { caption: "Photography", tilt: 2 },
  { caption: "Video", tilt: -1.5 },
  { caption: "Community", tilt: 1 },
];
