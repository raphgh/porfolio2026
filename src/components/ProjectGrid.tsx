import type { Project } from "@/data/types";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];

export function ProjectGrid({ projects, featureFirst = true }: { projects: Project[]; featureFirst?: boolean }) {
  const [first, ...rest] = projects;
  if (!first) return null;
  const grid = featureFirst ? rest : projects;

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {featureFirst && (
        <Reveal>
          <ProjectCard project={first} index={0} variant="feature" />
        </Reveal>
      )}
      {grid.length > 0 && (
        <ul className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {grid.map((project, i) => {
            const index = featureFirst ? i + 1 : i;
            return (
              <Reveal as="li" key={project.slug} delay={(i % 2) * 0.06}>
                <ProjectCard project={project} index={index} mediaAspect={aspects[i % aspects.length]} />
              </Reveal>
            );
          })}
        </ul>
      )}
    </div>
  );
}
