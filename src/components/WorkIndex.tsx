"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "@/data/types";
import { ProjectCard } from "./ProjectCard";

const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];

export function WorkIndex({ projects }: { projects: Project[] }) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags))) as ProjectTag[];
  const [active, setActive] = useState<ProjectTag | null>(null);
  const visible = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  return (
    <div className="flex flex-col gap-12">
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        <FilterButton pressed={active === null} onClick={() => setActive(null)}>
          All <span className="text-charcoal-muted">{projects.length}</span>
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton key={tag} pressed={active === tag} onClick={() => setActive(active === tag ? null : tag)}>
            {tag}
          </FilterButton>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      <ul className="columns-1 gap-8 md:columns-2 xl:columns-3">
        {visible.map((project, i) => (
          <li key={project.slug} className="mb-8 break-inside-avoid">
            <ProjectCard
              project={project}
              index={projects.indexOf(project)}
              headingLevel="h2"
              mediaAspect={aspects[i % aspects.length]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="label inline-flex h-9 items-center gap-2 rounded-full border border-navy/35 bg-white px-3.5 text-navy transition-colors hover:border-navy hover:bg-navy-tint aria-pressed:border-navy aria-pressed:bg-mustard-soft aria-pressed:text-charcoal"
    >
      {children}
    </button>
  );
}
