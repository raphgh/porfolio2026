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
        body: "You’re at a concert or a game with thousands of people who came for the same thing, and somehow everyone still feels like a stranger. Same floor, same song, same score, and almost no way to see what other people are actually doing in the moment. Outfits. Fan posters. Phone videos. Little scenes you’d never catch from your seat.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "The idea hit me on the way to a concert. How cool would it be to actually meet a few of those faces, not just stand next to them?",
      },
    ],
  },
  {
    kind: "research",
    title: "Insight",
    blocks: [
      {
        type: "text",
        body: "Insite is for people who are already at the same event, ten people or fifty thousand. Concerts and sports first. Everyone gets a temporary shared space (think folders) to post photos, videos, outfits, posters, and little moments from the night. Being there isn’t enough. I wanted the app to actually show you what the room is doing.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "Same city, same venue, same reason you’re there. The connection is already happening. The app just makes it visible.",
      },
    ],
  },
  {
    kind: "role",
    blocks: [
      {
        type: "text",
        body: "I’d been sitting on the idea for a while before I brought it to a team of six. We went with my concept, I led design in Figma (mockups + prototypes), and together we built a demo site and a pitch deck for the market story.",
      },
    ],
  },
  {
    kind: "exploration",
    blocks: [
      {
        type: "text",
        body: "I started on paper. This profile sketch was one of the first tries at how someone shows up inside an event: who you are, what you’ve posted, what you’re into, and how people can find you after.",
      },
      {
        type: "media",
        aspect: "tall",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/profile-sketch.jpg",
          alt: "Hand-drawn Insite profile wireframe with avatar, content folders, likes tags, socials, and bottom nav",
          caption: "Early profile brainstorm: folders for posts, likes as fandom tags, option to hide from public.",
        },
      },
      {
        type: "list",
        items: [
          "Content lives in folders: can be empty, can be hidden from the public",
          "Likes as interest tags (artists, teams) so you can spot shared taste at the same show",
          "Socials (Instagram, TikTok) for connecting after the event",
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
        body: "The hi-fi screens follow the night: browse what people are sharing, open an event’s folder, pick a show, then sit with one post. Everything stays tied to that venue and that night, not another endless social feed. I wanted it to feel like you were actually there with people.",
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/insite/home-page.jpg",
          alt: "Insite home page mockup - masonry grid of event photos with purple header and bottom nav",
          caption: "Home: scroll what the crowd is seeing.",
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
          caption: "Event folder: everything for one night in one place.",
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
          caption: "Events: search, filter, pick a show or game.",
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
          caption: "Post: open a moment; comment, like, or save.",
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
        body: "We designed in Figma, then built a demo site in HTML, CSS, and JavaScript for the pitch. We also made a slide deck with the market study and the product story, enough to present the whole idea without needing a finished app.",
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
        body: "We took first place in the SEG2900 engineering pitch competition. Demo + full pitch, done. The app isn’t live yet, but it’s still something I could see growing into a real product.",
      },
      {
        type: "note",
        label: "LEARNED",
        body: "A clear story and a real demo go further than a half-built backend, especially when you only have a few minutes with judges.",
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
        body: "A lot of student portfolios look the same: clean, modern, easy to forget. I wanted something for recruiters and design managers that still felt like me: creative, into a bunch of things, someone who pulls art, music, culture, and engineering into the same place. This isn’t my freelancing site (that’s separate). This one is for people who actually want to know me and my work.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "In the first 30 seconds I want someone to get that I’m more than a developer, that I bring mixed experiences and passions together through tech.",
      },
    ],
  },
  {
    kind: "exploration",
    blocks: [
      {
        type: "text",
        body: "I started with a huge Pinterest board: scrapbook layouts, playful type, collage energy, interactive ideas. I pivoted a few times before locking anything in, including killing a dedicated extracurriculars page and folding that stuff into About instead.",
      },
      {
        type: "media",
        aspect: "wide",
        fit: "contain",
        media: {
          type: "image",
          src: "/projects/this-website/pinterest-inspiration.jpg",
          alt: "Pinterest board of design ideas including Wii menu references, scrapbook layouts, and colorful portfolio concepts",
          caption: "Early board: scrapbook, collage, playful type, and Wii menu refs before Classic stuck.",
        },
      },
      {
        type: "note",
        label: "REJECTED",
        body: "A standalone extracurriculars page. Better as texture inside About than its own destination.",
      },
    ],
  },
  {
    kind: "design",
    blocks: [
      {
        type: "text",
        body: "The big call was two interfaces for one portfolio. Classic is the nostalgic channel home inspired by the System Menu. Modern is cleaner, for people who just want to browse. Same content, two moods. Classic is where the personality and interaction live; Modern keeps the colour play (yellow / pink / coral) and a colourful mouse trail without being too much.",
      },
      {
        type: "note",
        label: "WHY THIS?",
        body: "Classic is the part I care about most. Modern is there so the site can feel fun without trapping everyone in nostalgia.",
      },
      { type: "component", id: "wii-design-museum" },
      {
        type: "list",
        items: [
          "Classic channel grid: projects, work, lab, and me as selectable spaces",
          "Modern mode: same structure, quieter look",
          "About as more of a self-portrait: scrapbook gallery (running, music, travel), likings / creators / orgs I love, and cool reads",
          "Lab for smaller experiments and hackathons that don’t need a full case study",
        ],
      },
      {
        type: "note",
        label: "CHANGED",
        body: "I leaned harder into personalization on purpose (likings, creators, books, a gallery) so Me feels like a person, not a résumé dump.",
      },
    ],
  },
  {
    kind: "build",
    blocks: [
      {
        type: "text",
        body: "I designed and built it as a Next.js app with React, TypeScript, Tailwind, and Motion for the fun bits: mode switching, channel motion, and the Modern cursor trail.",
      },
      {
        type: "list",
        items: [
          "React + Next.js: pages, routing, dual-interface shell",
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
        body: "I shipped a portfolio I’m actually happy putting on applications and my résumé. It doesn’t feel like a template, and that was the whole point. Classic is the twist; Modern is there if you just want a straight read.",
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
      "A dual-mode portfolio for my personality and work, with Classic (Wii-inspired) and Modern.",
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
      "An app for people at the same concert, game, or venue: a shared space to post photos, outfits, posters, and little moments from the night.",
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
