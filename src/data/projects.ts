import type { CaseStudySection, Project } from "./types";

/**
 * Case-study skeletons. Each project can pick the structure that fits the
 * work — a systems project shouldn't be forced through a design process.
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
      { type: "text", body: placeholder("API design — resources, contracts, versioning.") },
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

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary: placeholder("Short description of the project."),
    role: placeholder("Role"),
    tags: ["SOFTWARE", "PRODUCT", "UI/UX"],
    stack: [],
    featured: true,
    caseStudy: { sections: productCaseStudy },
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary: placeholder("Short description of the project."),
    role: placeholder("Role"),
    tags: ["FRONTEND", "UI/UX", "ENGINEERING"],
    stack: [],
    featured: true,
    caseStudy: { sections: fullStackCaseStudy },
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary: placeholder("Short description of the project."),
    role: placeholder("Role"),
    tags: ["SOFTWARE", "PRODUCT", "ENGINEERING"],
    stack: [],
    featured: true,
    caseStudy: { sections: systemCaseStudy },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectHref = (p: Project) =>
  p.caseStudy ? `/work/${p.slug}` : (p.links?.live ?? p.links?.repo ?? null);
