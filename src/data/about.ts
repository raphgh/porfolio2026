import type { Book, Inspiration, ScrapbookItem } from "./types";

/**
 * Draft copy built only from what's already stated elsewhere on the site.
 * Rewrite in your own voice and add specifics (school, city, current focus).
 */
export const about = {
  intro: "",
  paragraphs: [
    "",
    "outside of software i enjoy music, guitar, and making content. i’m drawn to community work and to technology that does social good, and makes people's lives better. those things aren’t separate from engineering for me; they’re where a lot of my ideas come from. they're drawn from the things i'm passionate about.",
  ],
};

/** A few strong images — not a creative portfolio. Add `media` to replace a frame. */
export const scrapbook: ScrapbookItem[] = [
  { caption: "Music", tilt: -2.5 },
  { caption: "Guitar", tilt: 1.5 },
  { caption: "Content", tilt: -1 },
];

/** Swap titles/authors and drop cover images in when ready. */
export const books: Book[] = [
  {
    title: "[Book title]",
    author: "[Author]",
  },
  {
    title: "[Book title]",
    author: "[Author]",
  },
  {
    title: "[Book title]",
    author: "[Author]",
  },
  {
    title: "[Book title]",
    author: "[Author]",
  },
];

/** Simple bullets — add `href` when you want them to link out. */
export const inspirations: Inspiration[] = [
  { name: "[Name]", kind: "Creator", note: "[quick idea]" },
  { name: "[Name]", kind: "Product", note: "[quick idea]" },
  { name: "[Name]", kind: "Website", note: "[quick idea]" },
  { name: "[Name]", kind: "Creator", note: "[quick idea]" },
  { name: "[Name]", kind: "Product", note: "[quick idea]" },
];
