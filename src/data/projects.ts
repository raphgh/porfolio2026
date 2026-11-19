import type { CaseStudySection, Project } from "./types";

/**
 * Case-study skeletons. Each project can pick the structure that fits the
 * work - a systems project shouldn't be forced through a design process.
 * Copy one, then replace the bracketed placeholders with real content.
 */
const placeholder = (what: string) => `[${what}]`;

const systemCaseStudy: CaseStudySection[] = [
  {
    kind: "problem",
    blocks: [
      { type: "text", body: placeholder("What problem does this system solve, and for whom?") },
      { type: "note", label: "WHY THIS?", body: placeholder("Why this problem was worth solving.") },
    ],
  },
  {
    kind: "architecture",
    blocks: [
      { type: "text", body: placeholder("High-level architecture and how the pieces talk to each other.") },
      { type: "flow", nodes: ["Component A", "Component B", "Component C"], caption: placeholder("Architecture overview") },
      { type: "note", label: "TRADEOFF", body: placeholder("A trade-off made in the architecture.") },
    ],
  },
  {
    kind: "implementation",
    blocks: [
      { type: "text", body: placeholder("Key implementation details.") },
      { type: "code", filename: "placeholder.ts", language: "ts", code: "// Replace with a real code excerpt.\n" },
    ],
  },
  {
    kind: "apis",
    blocks: [
      { type: "text", body: placeholder("API design - resources, contracts, versioning.") },
      { type: "artifact", label: "API DIAGRAM", note: placeholder("Endpoints / data model") },
    ],
  },
  {
    kind: "infrastructure",
    blocks: [{ type: "text", body: placeholder("Hosting, deployment pipeline, environments, observability.") }],
  },
  {
    kind: "testing",
    blocks: [{ type: "text", body: placeholder("Testing strategy and what it caught.") }],
  },
  {
    kind: "outcome",
    blocks: [
      { type: "text", body: placeholder("Result and what changed because of it.") },
      { type: "note", label: "LEARNED", body: placeholder("What you'd do differently.") },
    ],
  },
];

/** Product case-study skeleton - copy into a project and fill the brackets. */
const productCaseStudy: CaseStudySection[] = [
  {
    kind: "problem",
    blocks: [{ type: "text", body: placeholder("The problem and the people who have it.") }],
  },
  {
    kind: "research",
    blocks: [
      { type: "text", body: placeholder("What you learned before building.") },
      { type: "note", label: "WHY THIS?", body: placeholder("The insight that shaped the direction.") },
    ],
  },
  {
    kind: "exploration",
    blocks: [
      { type: "text", body: placeholder("Directions explored, including ones that didn't make it.") },
      { type: "artifact", label: "SKETCHES / WIREFRAMES", aspect: "wide" },
      { type: "note", label: "REJECTED", body: placeholder("An idea that was dropped, and why.") },
    ],
  },
  {
    kind: "design",
    blocks: [
      { type: "text", body: placeholder("Key product and interaction decisions.") },
      {
        type: "compare",
        before: { type: "artifact", label: "BEFORE", aspect: "square" },
        after: { type: "artifact", label: "AFTER", aspect: "square" },
      },
      { type: "note", label: "CHANGED", body: placeholder("What changed between iterations.") },
    ],
  },
  {
    kind: "build",
    blocks: [{ type: "text", body: placeholder("How it was engineered and shipped.") }],
  },
  {
    kind: "outcome",
    blocks: [{ type: "text", body: placeholder("Result and learnings.") }],
  },
];

const insiteCaseStudy: CaseStudySection[] = [
  {
    kind: "problem",
    blocks: [
      {
        type: "text",
        body: "Concerts and sports events put thousands of people in the same venue for the same reason, then leave them strangers. You share a floor, a song, a score, and still have almost no way to see what other people there are actually up to in the moment: outfits, fan posters, phone videos, little scenes you’d never notice from your seat.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "The idea showed up on the way to a concert. How cool would it be to meet a few of those faces, not just stand next to them?",
      },
    ],
  },
  {
    kind: "research",
    title: "Insight",
    blocks: [
      {
        type: "text",
        body: "Insite is for people already inside the same shared event, whether that’s ten people or fifty thousand. Concert-goers and sports fans first. The product gives that crowd a temporary shared space (think folders) where they can post photos, videos, outfits, posters, and small moments from the night. Being there isn’t enough; the app is meant to give you an insight into what the room is actually doing.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "Same city, same venue, same purpose: the connection is already there. The app just makes it visible and social.",
      },
    ],
  },
  {
    kind: "role",
    blocks: [
      {
        type: "text",
        body: "The concept was mine for a while before I brought it to a team of six. We settled on my idea, then I led the design direction (mockups and prototypes in Figma) while we built a demo website and a pitch deck together for the market story.",
      },
    ],
  },
  {
    kind: "exploration",
    blocks: [
      {
        type: "text",
        body: "Early drafts started on paper. This profile sketch was one of the first passes at how someone shows up inside an event: who you are, what you’ve posted, what you’re into, and how people find you outside the app.",
      },
      {
        type: "media",
        aspect: "tall",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/profile-sketch.jpg",
          alt: "Hand-drawn Insite profile wireframe with avatar, content folders, likes tags, socials, and bottom nav",
          caption: "Early profile brainstorm: folders for posted content, likes as fandom tags, optional public hide.",
        },
      },
      {
        type: "list",
        items: [
          "Content posted as folders: could be empty, and could be hidden from the public",
          "Likes as interest tags (artists, teams) so people can recognize shared taste at the same show",
          "Socials (Instagram, TikTok) for connecting beyond the event space",
          "Bottom nav: home, search, profile, settings",
        ],
      },
      // TODO: REJECTED - fill when ready
    ],
  },
  {
    kind: "design",
    blocks: [
      {
        type: "text",
        body: "The high-fidelity screens walk the product loop: browse what people are sharing at events, open an event’s folder, pick a show, then sit with a single post. Content stays scoped to the venue and the night, not a generic social feed, so the app stays about presence and belonging.",
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/home-page.jpg",
          alt: "Insite home page mockup - masonry grid of event photos with purple header and bottom nav",
          caption: "Home: scroll the crowd’s perspective from the shared event space.",
        },
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/event-folder.jpg",
          alt: "Insite event folder mockup for Bluesfest Festival Ottawa with a photo grid",
          caption: "Event folder: everything related to one event in one place.",
        },
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/events-page.png",
          alt: "Insite events page mockup with colorful event tiles and search and date filter",
          caption: "Events: search, filter, and select upcoming or past shows and games.",
        },
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/post-page.png",
          alt: "Insite post page mockup with a concert photo and comment, like, and save actions",
          caption: "Post: open a moment in detail; comment, like, or save.",
        },
      },
      // TODO: CHANGED / decision note - fill when ready
    ],
  },
  {
    kind: "build",
    blocks: [
      {
        type: "text",
        body: "We designed in Figma, then shipped a demo site in HTML, CSS, and JavaScript for the pitch. Alongside the demo we built a slide deck covering the market study and the product story, enough to present the idea end-to-end without a production app.",
      },
      {
        type: "list",
        items: [
          "Figma: mockups and interaction prototypes",
          "HTML / CSS / JavaScript: pitch demo website",
          "Slide deck: market study and concept pitch",
        ],
      },
    ],
  },
  {
    kind: "outcome",
    blocks: [
      {
        type: "text",
        body: "Insite won first place in the SEG2900 engineering pitch competition. We delivered a working demo and a full pitch. The app itself hasn’t shipped as a live product yet, but it’s something that could still grow into one.",
      },
      {
        type: "note",
        label: "LEARNED",
        body: "A clear product story plus a tangible demo can carry a concept further than a half-built backend, especially when the idea has to land with judges in minutes.",
      },
    ],
  },
];

const fullStackCaseStudy: CaseStudySection[] = [
  {
    kind: "context",
    blocks: [{ type: "text", body: placeholder("Where this project came from.") }],
  },
  {
    kind: "system",
    blocks: [
      { type: "text", body: placeholder("How the system fits together end-to-end.") },
      { type: "flow", nodes: ["Client", "Server", "Data"], caption: placeholder("System overview") },
    ],
  },
  {
    kind: "frontend",
    blocks: [
      { type: "text", body: placeholder("Frontend architecture, state, rendering, accessibility.") },
      { type: "note", label: "WHY THIS?", body: placeholder("A frontend decision worth explaining.") },
    ],
  },
  {
    kind: "backend",
    blocks: [
      { type: "text", body: placeholder("Backend services, data model, and APIs.") },
      { type: "code", filename: "placeholder.ts", language: "ts", code: "// Replace with a real code excerpt.\n" },
    ],
  },
  {
    kind: "deployment",
    blocks: [
      { type: "text", body: placeholder("How it's deployed and monitored.") },
      { type: "note", label: "TRADEOFF", body: placeholder("A deployment or performance trade-off.") },
    ],
  },
  {
    kind: "learnings",
    blocks: [{ type: "list", items: [placeholder("Learning"), placeholder("Learning"), placeholder("Learning")] }],
  },
];

const thisWebsiteCaseStudy: CaseStudySection[] = [
  {
    kind: "problem",
    blocks: [
      {
        type: "text",
        body: "Most student portfolios look interchangeable: clean, modern, and easy to skim past. I needed a site for recruiters and design managers that still felt close to who I am: creative, multi-interested, and someone who pulls art, music, culture, and engineering into the same place. This isn’t a freelancing site; I keep that separate. This one is for people who want to know me and my work.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "In the first 30 seconds, I want someone to see I’m more than a developer, that I bring mixed experiences and passions together through technology.",
      },
    ],
  },
  {
    kind: "exploration",
    blocks: [
      {
        type: "text",
        body: "I started with a big Pinterest board of scrapbook layouts, playful type, collage energy, and interactive ideas. I pivoted a few times before locking a direction, including dropping a dedicated extracurriculars page and folding that story into About instead.",
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/this-website/pinterest-inspiration.jpg",
          alt: "Pinterest board of design ideas including Wii menu references, scrapbook layouts, and colorful portfolio concepts",
          caption: "Early design board: scrapbook, collage, playful type, and Wii menu references before the Classic direction landed.",
        },
      },
      {
        type: "note",
        label: "REJECTED",
        body: "A standalone extracurriculars page. Better as texture inside About than as its own destination.",
      },
    ],
  },
  {
    kind: "design",
    blocks: [
      {
        type: "text",
        body: "The big product decision was two interfaces for one portfolio: Classic, a nostalgic channel-style home inspired by the System Menu, and Modern, a cleaner layout for people who want a neat browse. Same content, two moods. Classic carries personality and interaction; Modern keeps colour play (yellow / pink / coral) and a colourful mouse trail without getting loud.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "Classic is the heart piece. Modern is the escape hatch, so the site can feel fun without trapping every visitor in nostalgia.",
      },
      { type: "component", id: "wii-design-museum" },
      {
        type: "list",
        items: [
          "Classic channel grid: projects, work, lab, and me as selectable spaces",
          "Modern mode: same information architecture, quieter visual system",
          "About as a fuller self-portrait: scrapbook gallery (running, music, travel), likings / creators / orgs I appreciate, and cool reads",
          "Lab: a home for smaller experiments and hackathons that don’t need a full case-study backstory",
        ],
      },
      {
        type: "note",
        label: "CHANGED",
        body: "Personalization got heavier on purpose: likings, creators, books, and a gallery so the Me page reads as a person, not a résumé dump.",
      },
    ],
  },
  {
    kind: "build",
    blocks: [
      {
        type: "text",
        body: "Designed and built as a Next.js app with React, TypeScript, Tailwind, and Motion for the interactive bits: mode switching, channel motion, and the Modern cursor trail.",
      },
      {
        type: "list",
        items: [
          "React + Next.js: pages, routing, and the dual-interface shell",
          "TypeScript + Tailwind: content model and styling",
          "Motion: channel hover, mode transitions, cursor trail",
        ],
      },
    ],
  },
  {
    kind: "outcome",
    blocks: [
      {
        type: "text",
        body: "I shipped a portfolio I’m confident putting on applications and my résumé. It doesn’t feel like a template, and that uniqueness was the goal. Classic gives the twist; Modern keeps it usable for anyone who wants a straight read.",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "YARD365",
    summary: "Web application for Ottawa homeowners, that allows users to request for house maintenance services from available professionals at any time.",
    role: "Developer",
    tags: ["SOFTWARE", "PRODUCT", "UI/UX"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "PostgresSQL", "BetterAuth", "Stripe"],
    featured: true,
    cover: {
      type: "image",
      src: "/logos/yard365.png",
      alt: "YARD365 - home and service booking screens on two phones",
    },
    //caseStudy: { sections: productCaseStudy },
  },
  {
    slug: "this-website",
    title: "This Website",
    summary:
      "A dual-mode portfolio to showcase my personality and work, with Wii-inspired and Modern UI.",
    role: "Designer & Developer",
    tags: ["UI/UX", "PRODUCT", "FRONTEND"],
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Motion"],
    year: "2026",
    featured: true,
    cover: {
      type: "image",
      src: "/projects/this-website/cover.png",
      alt: "This website - Classic mode channel home with project tiles",
    },
    caseStudy: {
      facts: [
        { label: "Audience", value: "Recruiters & design managers" },
        { label: "Modes", value: "Classic + Modern" },
      ],
      sections: thisWebsiteCaseStudy,
    },
  },
  {
    slug: "insite",
    title: "Insite",
    summary:
      "An app concept for people at the same concert, game, or venue: a shared space to post photos, outfits, posters, and small moments that turn a crowd into a community.",
    role: "Ideator, Designer, Co-Developer",
    tags: ["PRODUCT", "UI/UX", "FRONTEND"],
    stack: ["Figma", "HTML", "CSS", "JavaScript"],
    year: "2022/2023",
    featured: true,
    cover: {
      type: "image",
      src: "/logos/insite.jpg",
      alt: "Insite - event hub app screens on two phones over a collage of live events",
    },
    caseStudy: {
      facts: [
        { label: "Team", value: "6" },
        { label: "Outcome", value: "🏆 1st place in pitch competition" },
      ],
      sections: insiteCaseStudy,
    },
  },
  {
    slug: "project-four",
    title: "New Omelet",
    summary: "An Android application that allows users to order hardware and software parts, with a real-time inventory system.",
    role: "UX/UI Co-Designer, Co-Developer",
    tags: ["SOFTWARE", "PRODUCT", "ENGINEERING"],
    stack: ["Android Studio", "Java", "Figma", "Firebase", "SQLite", "XML"],
    featured: true,
    cover: {
      type: "image",
      src: "/logos/newomelet.png",
      alt: "New Omelet - egg logo with Get Started and Login screens on two phones",
    },
    //caseStudy: { sections: systemCaseStudy },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectHref = (p: Project) =>
  p.caseStudy ? `/work/${p.slug}` : (p.links?.live ?? p.links?.repo ?? null);
