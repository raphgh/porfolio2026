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

/** A few strong images — not a creative portfolio. */
export const scrapbook: ScrapbookItem[] = [
  {
    caption:
      "me hosting a music fundraiser for the lebanese red cross, with community members and artists, raising $1200+ !",
    media: {
      type: "image",
      src: "/scrapbook/fundraiser.jpg",
      alt: "Hosting a music fundraiser for the Lebanese Red Cross",
    },
  },
  {
    caption: "travelling back home in lebanon, one of my favourite places.",
    media: {
      type: "image",
      src: "/scrapbook/lebanon.jpg",
      alt: "Looking out over mountains in Lebanon",
    },
  },
  {
    caption: "some more travelling.",
    aspect: "landscape",
    media: {
      type: "image",
      src: "/scrapbook/travelling.jpg",
      alt: "Travelling — overlooking the Eiffel Tower in Paris",
    },
  },
];

/** Current reads — covers live under `/public/books/`. */
export const books: Book[] = [
  {
    title: "How to Teach Quantum Physics to Your Dog",
    author: "Chad Orzel",
    cover: {
      type: "image",
      src: "/books/quantum-physics-dog.png",
      alt: "Cover of How to Teach Quantum Physics to Your Dog by Chad Orzel",
    },
  },
  {
    title: "Show Your Work!",
    author: "Austin Kleon",
    cover: {
      type: "image",
      src: "/books/show-your-work.png",
      alt: "Cover of Show Your Work! by Austin Kleon",
    },
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
