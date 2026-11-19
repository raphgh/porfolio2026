import type { BlogPost } from "./types";

/**
 * Short logs - thoughts, events, moments. Newest first.
 * Drop photos under `/public/blog` or `/public/scrapbook`.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "capital-music-awards",
    title: "capital music awards ottawa",
    date: "2026",
    dateISO: "2026-10-09",
    summary: "Getting to be part of Ottawa’s Capital Music Awards.",
    body: [
      "got to be part of the second edition of the capital music awards, which celebrates the local music scene.",
      "being in that room with so many artists, tech crew, organizers, and other talented people felt really special.",
      "super grateful i got to be part of it. more nights like that please.",
    ],
  },
  {
    slug: "music-fundraiser",
    title: "music fundraiser @ the ottawa bike café",
    date: "2026",
    dateISO: "2026-06-19",
    summary: "A night of music for the Lebanese Red Cross, and over $1,200 raised.",
    body: [
      "we hosted a summer music fundraiser at the ottawa bike café with friends.",
      "it was a lot of work putting it together, but the outcome was awesome, having everyone share the space and genuinely enjoy fresh music and middle eastern culture.",
      "we also raised $1,200+ for the lebanese red cross. definitely one of my favourite achievements:)",
    ],
    photos: [
      {
        type: "image",
        src: "/scrapbook/fundraiser-setup.jpg",
        alt: "Setting up keys and drums at the Ottawa Bike Café, Lebanese flag on the counter",
      },
      {
        type: "image",
        src: "/scrapbook/fundraiser-band.jpg",
        alt: "Three friends posing with electric guitars at the Ottawa Bike Café fundraiser",
      },
    ],
  },
];
