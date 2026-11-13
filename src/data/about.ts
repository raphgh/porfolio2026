import type { Book, Inspiration, ScrapbookItem } from "./types";

/**
 * Draft copy built only from what's already stated elsewhere on the site.
 * Rewrite in your own voice and add specifics (school, city, current focus).
 */
export const about = {
  intro: "",
  paragraphs: [
    "i'm currently at uOttawa finishing up my bachelor's in software engineering, with a microprogram in AI- giving me early access to masters-level courses in AI/ML.",
    "i'm extremely passionate about art, music, and culture. i’m very drawn to community and to technology that creates social good. it's where a lot of my ideas come from.",
    "i'm certainly just motivated by what can be done with it and how quickly and so easily it can make an impact.",
    "i'm also great at and love working with others, leading things, and bringing cool ideas to life :)",
    "scroll down for more!",
  ],
};

/** A few strong images — not a creative portfolio. */
export const scrapbook: ScrapbookItem[] = [
  {
    caption: "back home in lebanon :)",
    media: {
      type: "image",
      src: "/scrapbook/lebanon.jpg",
      alt: "Looking out over mountains in Lebanon",
    },
  },
  {
    caption: "solo travel.",
    aspect: "landscape",
    media: {
      type: "image",
      src: "/scrapbook/travelling.jpg",
      alt: "Travelling — overlooking the Eiffel Tower in Paris",
    },
  },
  {
    caption: "running enthusiast 🚴",
    media: {
      type: "image",
      src: "/scrapbook/running.jpg",
      alt: "run with a croissant",
    },
  },
  {
    caption: "guitar",
    media: {
      type: "image",
      src: "/scrapbook/guitar.jpg",
      alt: "electric guitar with amp and pedals",
    },
  },
];


/** Simple bullets — add `href` when you want them to link out. */
export const inspirations: Inspiration[] = [
  {
    name: "Nabihah Ahmad",
    kind: "Creator",
    note: "building fashion-tech with values",
    href: "https://www.instagram.com/nabihah.ahmad/",
  },
  {
    name: "Gazi Jarin",
    kind: "Creator",
    note: "tech and lifestyle creator - previous work at Pinterest, Google, and Amazon",
    href: "https://www.instagram.com/gazisj/",
  },
  {
    name: "Imogen Heap",
    kind: "Creator",
    note: "musician, technologist, creator of Mi.Mu Gloves, mogen.ai, etc.",
    href: "https://www.imogenheap.com/",
  },
   {
    name: "julip.mp3",
    kind: "Creator",
    note: "musician & creative engineer — making music with hand-tracking code",
    href: "https://www.instagram.com/julip.mp3/",
  },
  {
    name: "Greta Thunberg",
    kind: "Creator",
    note: "climate activist",
    href: "https://www.instagram.com/gretathunberg/",
  },
  { name: "", kind: "Product", spacer: true },
  {
    name: "SSQRD",
    kind: "Product",
    note: "discovering sustainable, ethical brands worldwide",
    href: "https://ssqrd.co/",
  },
  {
    name: "All Things Go",
    kind: "Product",
    note: "festival website - i like how it looks :)",
    href: "https://www.allthingsgofestival.com/",
  },
  {
    name: "Sonic Liberation Devices",
    kind: "Product",
    note: "collective of artists, musicians, technologists, designers, organizers, and researchers.",
    href: "https://sonicliberationdevices.com/#top",
  },
  {
    name: "2048 Foundation",
    kind: "Creator",
    note: "funding palestinian creative projects and bringing ideas to life",
    href: "https://www.instagram.com/2048foundation/",
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
