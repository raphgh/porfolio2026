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
  mediaAspect?: string;
};

export function ProjectCard({
  project,
  index,
  variant = "default",
  headingLevel: H = "h3",
  mediaAspect,
}: Props) {
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
          className="text-[0.55em] font-normal text-mustard-deep transition-transform duration-300 group-hover:translate-x-1"
        >
          {external ? "↗" : "→"}
        </span>
      )}
    </span>
  );

  const link = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">
        {title}
      </a>
    ) : (
      <Link href={href} className="after:absolute after:inset-0 after:content-['']">
        {title}
      </Link>
    )
  ) : (
    title
  );

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white transition-colors hover:border-navy hover:bg-navy-tint/40 ${
        feature ? "grid gap-6 p-5 md:grid-cols-12 md:items-center md:gap-8 md:p-8" : "p-4 md:p-5"
      }`}
    >
      <span className="label absolute top-4 left-4 z-10 rounded-full border border-navy/25 bg-white/90 px-2.5 py-0.5 text-navy backdrop-blur-sm">
        {number}
      </span>

      <div className={feature ? "md:col-span-7 md:order-2" : ""}>
        <MediaFrame
          media={project.cover}
          placeholder={`${project.title} — cover`}
          aspect={mediaAspect ?? (feature ? "aspect-[16/10]" : "aspect-[4/3]")}
          sizes={feature ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
        />
      </div>

      <div className={`flex flex-col gap-4 ${feature ? "md:col-span-5 md:order-1" : "mt-5"}`}>
        <TagList items={project.tags} emphasizeFirst className="text-charcoal-soft" />
        <H className={`display ${feature ? "text-title" : "text-heading"} text-navy`}>{link}</H>
        <p className="text-charcoal-soft">{project.summary}</p>
        <dl className="grid grid-cols-[5.5rem_1fr] gap-y-1.5 border-t border-silver-soft pt-3 text-sm">
          <dt className="label pt-0.5 text-charcoal-muted">Role</dt>
          <dd>{project.role}</dd>
          <dt className="label pt-0.5 text-charcoal-muted">Stack</dt>
          <dd>{project.stack.length ? project.stack.join(", ") : "—"}</dd>
          {project.year && (
            <>
              <dt className="label pt-0.5 text-charcoal-muted">Year</dt>
              <dd>{project.year}</dd>
            </>
          )}
        </dl>
      </div>
    </article>
  );
}
