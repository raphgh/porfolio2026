import type { CaseStudySection as Section, CaseStudySectionKind } from "@/data/types";
import { Reveal } from "../Reveal";
import { CaseStudyBlock } from "./CaseStudyBlock";

export const sectionTitles: Record<CaseStudySectionKind, string> = {
  context: "Context",
  problem: "Problem",
  role: "My role",
  goals: "Goals",
  research: "Research",
  exploration: "Exploration",
  approach: "Technical approach",
  architecture: "Architecture",
  system: "System",
  design: "Design",
  implementation: "Implementation",
  frontend: "Frontend",
  backend: "Backend",
  apis: "APIs",
  infrastructure: "Infrastructure",
  deployment: "Deployment",
  testing: "Testing",
  build: "Build",
  challenges: "Challenges",
  tradeoffs: "Trade-offs",
  outcome: "Outcome",
  learnings: "Learnings",
};

export const sectionId = (section: Section, i: number) => `${String(i + 1).padStart(2, "0")}-${section.kind}`;
export const sectionTitle = (section: Section) => section.title ?? sectionTitles[section.kind];

export function CaseStudySection({ section, index }: { section: Section; index: number }) {
  const notes = section.blocks.filter((b) => b.type === "note");
  const content = section.blocks.filter((b) => b.type !== "note");
  const id = sectionId(section, index);

  return (
    <section
      aria-labelledby={`${id}-title`}
      id={id}
      className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-silver-soft pt-6 md:gap-x-8"
    >
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <span
            aria-hidden
            className="mb-3 grid size-9 place-items-center rounded-full bg-navy font-mono text-sm text-white"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 id={`${id}-title`} className="display text-heading text-navy">
            {sectionTitle(section)}
          </h2>
        </div>
      </div>

      <div className={`col-span-12 flex flex-col gap-8 ${notes.length ? "lg:col-span-6" : "lg:col-span-9"}`}>
        {content.map((block, i) => (
          <Reveal key={i}>
            <CaseStudyBlock block={block} />
          </Reveal>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="col-span-12 flex flex-col gap-6 sm:max-lg:max-w-md lg:col-span-3 lg:pt-2">
          {notes.map((block, i) => (
            <Reveal key={i} delay={0.1}>
              <CaseStudyBlock block={block} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
