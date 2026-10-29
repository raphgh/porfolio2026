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
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/work"
              className="label rounded-full border border-navy/30 bg-navy-tint px-3 py-1 text-navy hover:border-navy"
            >
              Projects
            </Link>
          </li>
          <li aria-hidden className="text-charcoal-muted">
            /
          </li>
          <li aria-current="page" className="label text-charcoal">
            {project.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
          <TagList items={project.tags} emphasizeFirst className="text-charcoal-soft" />
          <h1 className="display text-display text-navy">{project.title}</h1>
          <p className="max-w-[40rem] text-lede text-pretty text-charcoal-soft">{project.summary}</p>
          {project.links && (
            <div className="flex flex-wrap gap-3 pt-2">
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

        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <div className="rounded-[1.25rem] border border-navy bg-navy p-5 text-white">
            <p className="label mb-4 text-mustard-soft">Project file</p>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-y-2 text-sm">
              {facts.map((f) => (
                <div key={f.label} className="contents">
                  <dt className="label pt-0.5 text-white/55">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {sections.length > 0 && (
            <nav aria-label="Case study contents">
              <p className="label mb-2 text-charcoal-muted">Contents</p>
              <ol className="flex flex-wrap gap-2">
                {sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#${sectionId(s, i)}`}
                      className="label inline-flex items-center gap-1.5 rounded-full border border-navy/30 bg-white px-2.5 py-1 text-navy hover:bg-navy-tint"
                    >
                      <span aria-hidden className="font-mono text-[0.65rem] text-mustard-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
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
