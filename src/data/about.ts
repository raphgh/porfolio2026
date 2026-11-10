import type { Book, Inspiration, ScrapbookItem } from "./types";

/**
 * Draft copy built only from what's already stated elsewhere on the site.
 * Rewrite in your own voice and add specifics (school, city, current focus).
 */
export const about = {
  intro: "",
  paragraphs: [
    "i'm currently at uOttawa for my bachelor's in software engineering.",
    "i'm a big enjoyer of art, music, and culture. i’m very drawn to community and to technology that creates social good. it's where a lot of my project ideas come from.",
    "scroll down for more!",
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
    caption: "back home in lebanon.",
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
  {
    title: "The Secret Lives of Planets",
    author: "Paul Murdin",
    cover: {
      type: "image",
      src: "/books/secret-lives-of-planets.png",
      alt: "Cover of The Secret Lives of Planets by Paul Murdin",
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
