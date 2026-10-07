import Link from "next/link";
import type { Project } from "@/data/types";
import { ArrowLink } from "../ArrowLink";
import { MediaFrame } from "../MediaFrame";
import { TagList } from "../Tag";
import { sectionId, sectionTitle } from "./CaseStudySection";

export function ProjectHero({ project }: { project: Project }) {
  const sections = project.caseStudy?.sections ?? [];
  const facts = [
    { label: "Role", value: project.role },
    { label: "Stack", value: project.stack.length ? project.stack.join(", ") : "—" },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
    ...(project.caseStudy?.facts ?? []),
  ];

  return (
    <header className="flex flex-col gap-10 md:gap-14">
      <nav aria-label="Breadcrumb" className="label text-ink-soft">
        <ol className="flex gap-2">
          <li>
            <Link href="/work" className="hover:text-ink">
              Work
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {project.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-12 gap-x-8 gap-y-8">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
          <TagList items={project.tags} emphasizeFirst className="text-ink-soft" />
          <h1 className="text-display font-medium">{project.title}</h1>
          <p className="max-w-[40rem] text-lede text-pretty text-ink-soft">{project.summary}</p>
          {project.links && (
            <div className="flex flex-wrap gap-6 pt-2">
              {project.links.live && (
                <ArrowLink href={project.links.live} external>
                  Live
                </ArrowLink>
              )}
              {project.links.repo && (
                <ArrowLink href={project.links.repo} external>
                  Source
                </ArrowLink>
              )}
              {project.links.other?.map((l) => (
                <ArrowLink key={l.href} href={l.href} external>
                  {l.label}
                </ArrowLink>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-12 grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:content-end">
          <dl className="grid grid-cols-[5.5rem_1fr] gap-y-2 border-t border-ink pt-4 text-sm">
            {facts.map((f) => (
              <div key={f.label} className="contents">
                <dt className="label pt-0.5 text-ink-muted">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {sections.length > 0 && (
            <nav aria-label="Case study contents" className="border-t border-ink pt-4">
              <p className="label mb-2 text-ink-muted">Contents</p>
              <ol className="label flex flex-wrap gap-x-2 gap-y-1.5">
                {sections.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    )}
                    <a href={`#${sectionId(s, i)}`} className="underline-offset-4 hover:text-accent-ink hover:underline">
                      {sectionTitle(s)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>

      <MediaFrame
        media={project.cover}
        placeholder={`${project.title} — cover`}
        aspect="aspect-[4/3] md:aspect-[21/9]"
        sizes="100vw"
        priority
      />
    </header>
  );
}
