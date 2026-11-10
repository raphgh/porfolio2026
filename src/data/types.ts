/**
 * Content model for the whole site. Pages and components only read from
 * these shapes, so adding/reordering content never requires touching JSX.
 */

export type Media =
  | {
      type: "image";
      src: string;
      alt: string;
      width?: number;
      height?: number;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      /** Describes the video for screen readers. */
      alt: string;
      poster?: string;
      caption?: string;
    };

export type Link = { label: string; href: string };

/* -------------------------------------------------------------------------- */
/* Projects / WORK                                                            */
/* -------------------------------------------------------------------------- */

export type ProjectTag =
  | "SOFTWARE"
  | "ENGINEERING"
  | "FULL-STACK"
  | "BACKEND"
  | "FRONTEND"
  | "SYSTEMS"
  | "PRODUCT"
  | "UI/UX"
  | "INFRASTRUCTURE"
  | "AI"
  | "MOBILE"
  | "EXPERIMENTAL";

export type Annotation = "WHY THIS?" | "REJECTED" | "CHANGED" | "TRADEOFF" | "LEARNED";

export type CaseStudyBlock =
  | { type: "text"; body: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "media"; media: Media }
  /** Reserved slot for an artifact that hasn't been added yet (diagram, Figma screen, sketch…). */
  | { type: "artifact"; label: string; note?: string; aspect?: "wide" | "square" | "tall" }
  | { type: "code"; code: string; language?: string; filename?: string; caption?: string }
  /** Lightweight box-and-arrow diagram rendered in HTML — no image needed. */
  | { type: "flow"; nodes: string[]; caption?: string }
  | { type: "compare"; before: CaseStudyBlock; after: CaseStudyBlock; beforeLabel?: string; afterLabel?: string }
  /** Editorial margin note. Rendered beside the section on large screens. */
  | { type: "note"; label: Annotation; body: string };

export type CaseStudySectionKind =
  | "context"
  | "problem"
  | "role"
  | "goals"
  | "research"
  | "exploration"
  | "approach"
  | "architecture"
  | "system"
  | "design"
  | "implementation"
  | "frontend"
  | "backend"
  | "apis"
  | "infrastructure"
  | "deployment"
  | "testing"
  | "build"
  | "challenges"
  | "tradeoffs"
  | "outcome"
  | "learnings";

export type CaseStudySection = {
  kind: CaseStudySectionKind;
  /** Overrides the default title for this kind. */
  title?: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudy = {
  /** Free-form facts shown in the project header (e.g. Timeline, Team). */
  facts?: { label: string; value: string }[];
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  tags: ProjectTag[];
  stack: string[];
  year?: string;
  /** Shown on cards and in the case-study header. */
  cover?: Media;
  links?: { live?: string; repo?: string; other?: Link[] };
  /** Projects without a case study link straight out to `links`. */
  caseStudy?: CaseStudy;
  /** Shows the project on the homepage. Order in the array is display order. */
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type EmploymentType =
  | "Co-op"
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Other";

export type Embed = {
  src: string;
  title?: string;
  height?: number;
  width?: number;
  /** Caption / context shown above the embed. */
  note?: string;
};

export type Role = {
  title: string;
  employmentType: EmploymentType;
  start: string;
  /** Omit for a current role. */
  end?: string;
  location: string;
  overview: string;
  technologies: string[];
  responsibilities: string[];
  accomplishments: string[];
  /** Optional side notes / asides (ambassador work, special events, etc.). */
  notes?: string[];
  artifacts?: Media[];
  /** Embedded posts (e.g. LinkedIn) shown below the photo strip. */
  embeds?: Embed[];
};

export type Experience = {
  id: string;
  company: string;
  companyUrl?: string;
  /**
   * Path under `/public`, e.g. `/logos/nokia.jpg`.
   * Used in the detail modal header.
   */
  logo?: string;
  /**
   * Full-bleed cover for the experience grid card.
   * Falls back to `logo` when omitted.
   */
  thumbnail?: string;
  /** Short label on the grid pill, e.g. "Nokia". Defaults to company. */
  shortName?: string;
  /** Short descriptor of the company/team, e.g. "Payments platform". */
  descriptor?: string;
  /**
   * `grouped` shows multiple roles under one company heading;
   * `separate` lists each role as its own entry.
   */
  display?: "grouped" | "separate";
  /** Most recent first. */
  roles: Role[];
};

/* -------------------------------------------------------------------------- */
/* Extracurriculars                                                           */
/* -------------------------------------------------------------------------- */

export type Extracurricular = {
  id: string;
  title: string;
  categories: string[];
  role?: string;
  date?: string;
  summary: string;
  highlights?: string[];
  media?: Media;
  link?: Link;
};

/* -------------------------------------------------------------------------- */
/* Lab                                                                        */
/* -------------------------------------------------------------------------- */

export type LabStatus = "SHIPPED" | "ONGOING" | "PAUSED" | "ABANDONED";

export type LabExperiment = {
  id: string;
  title: string;
  date: string;
  technology: string[];
  result: string;
  description?: string;
  status?: LabStatus;
  link?: Link;
  media?: Media;
};

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

export type ScrapbookItem = {
  caption: string;
  media?: Media;
  /** Visual tilt in degrees for the scrapbook layout. */
  tilt?: number;
  /** Frame shape — defaults to portrait. */
  aspect?: "portrait" | "landscape";
};

export type Book = {
  title: string;
  author: string;
  /** Cover image under `/public`. Empty/omitted = placeholder spine. */
  cover?: Media;
  note?: string;
};

export type InspirationKind = "Creator" | "Product" | "Website";

export type Inspiration = {
  name: string;
  kind: InspirationKind;
  /** One short line on why it matters. */
  note?: string;
  href?: string;
  /** Renders as a blank gap in the list. */
  spacer?: boolean;
};
