import Link from "next/link";
import { projectHref } from "@/data/projects";
import type { Project } from "@/data/types";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

type Props = {
  project: Project;
  index: number;
  variant?: "feature" | "default";
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, index, variant = "default", headingLevel: H = "h3" }: Props) {
  const href = projectHref(project);
  const external = href && !href.startsWith("/");
  const feature = variant === "feature";
  const number = String(index + 1).padStart(2, "0");

  const title = (
    <span className="inline-flex items-baseline gap-3">
      {project.title}
      {href && (
        <span
          aria-hidden
          className="text-[0.6em] text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
        >
          {external ? "↗" : "→"}
        </span>
      )}
    </span>
  );

  return (
    <article
      className={`group relative grid gap-x-8 gap-y-5 ${feature ? "md:grid-cols-12 md:items-end" : ""}`}
    >
      <MediaFrame
        media={project.cover}
        placeholder={`${project.title} — cover`}
        aspect={feature ? "aspect-[16/10]" : "aspect-[4/3]"}
        sizes={feature ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
        className={feature ? "md:col-span-7" : ""}
      />

      <div className={`flex flex-col gap-4 ${feature ? "md:col-span-5 md:pb-1" : ""}`}>
        <div className="flex items-center justify-between gap-4 border-b border-rule pb-3">
          <TagList items={project.tags} emphasizeFirst className="text-ink-soft" />
          <span className="label text-ink-muted">{number}</span>
        </div>

        <H className={`${feature ? "text-title" : "text-heading"} font-medium`}>
          {href ? (
            external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:content-['']"
              >
                {title}
              </a>
            ) : (
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {title}
              </Link>
            )
          ) : (
            title
          )}
        </H>

        <p className="max-w-prose text-ink-soft">{project.summary}</p>

        <dl className="grid grid-cols-[5.5rem_1fr] gap-y-1.5 text-sm">
          <dt className="label pt-0.5 text-ink-muted">Role</dt>
          <dd>{project.role}</dd>
          <dt className="label pt-0.5 text-ink-muted">Stack</dt>
          <dd>{project.stack.length ? project.stack.join(", ") : "—"}</dd>
          {project.year && (
            <>
              <dt className="label pt-0.5 text-ink-muted">Year</dt>
              <dd>{project.year}</dd>
            </>
          )}
        </dl>
      </div>
    </article>
  );
}
