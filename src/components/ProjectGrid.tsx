import type { Project } from "@/data/types";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

/**
 * Editorial rhythm: the first project gets a wide feature treatment, the
 * rest flow in two columns with an offset so the grid doesn't feel templated.
 */
export function ProjectGrid({ projects, featureFirst = true }: { projects: Project[]; featureFirst?: boolean }) {
  const [first, ...rest] = projects;
  if (!first) return null;
  const grid = featureFirst ? rest : projects;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {featureFirst && (
        <Reveal>
          <ProjectCard project={first} index={0} variant="feature" />
        </Reveal>
      )}
      {grid.length > 0 && (
        <ul className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24 lg:gap-x-16">
          {grid.map((project, i) => {
            const index = featureFirst ? i + 1 : i;
            return (
              <Reveal as="li" key={project.slug} delay={(i % 2) * 0.08} className={i % 2 ? "md:mt-24" : ""}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            );
          })}
        </ul>
      )}
    </div>
  );
}
