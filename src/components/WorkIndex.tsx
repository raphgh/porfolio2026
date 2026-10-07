"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "@/data/types";
import { ProjectCard } from "./ProjectCard";

/** Full project index with a tag filter. Filter state is local; no URL sync needed. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags))) as ProjectTag[];
  const [active, setActive] = useState<ProjectTag | null>(null);
  const visible = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  return (
    <div className="flex flex-col gap-12">
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        <FilterButton pressed={active === null} onClick={() => setActive(null)}>
          All <span className="text-ink-muted">{projects.length}</span>
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

      <ul className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:gap-x-16">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={projects.indexOf(project)} headingLevel="h2" />
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
      className="label inline-flex h-8 items-center gap-2 border border-rule-strong px-3 text-ink-soft transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper [&[aria-pressed=true]_span]:text-night-soft"
    >
      {children}
    </button>
  );
}
