"use client";

import Link from "next/link";
import { CaseStudyBlock } from "@/components/case-study/CaseStudyBlock";
import { CaseStudySection, sectionId, sectionTitle } from "@/components/case-study/CaseStudySection";
import { ProjectHero } from "@/components/case-study/ProjectHero";
import { MediaFrame } from "@/components/MediaFrame";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiPage } from "@/components/wii/WiiPage";
import { WiiPanel } from "@/components/wii/WiiPanel";
import type { Project } from "@/data/types";

type Props = {
  project: Project;
  next?: Project | null;
};

/**
 * Case study body - Modern keeps the editorial layout; Classic uses the
 * shared channel-page shell + glossy panels like the rest of Wii mode.
 */
export function CaseStudyView({ project, next }: Props) {
  const { mode, ready } = useInterfaceMode();

  if (!ready) return null;

  if (mode !== "wii") {
    return <ModernCaseStudy project={project} next={next} />;
  }

  return <ClassicCaseStudy project={project} next={next} />;
}

function ModernCaseStudy({ project, next }: Props) {
  return (
    <article className="shell pt-10 pb-24 md:pt-14 md:pb-32">
      <ProjectHero project={project} />

      <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
        {project.caseStudy?.sections.map((section, i) => (
          <CaseStudySection key={i} section={section} index={i} />
        ))}
      </div>

      {next && next !== project ? (
        <nav aria-label="Next project" className="mt-28">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-3 rounded-[1.5rem] border border-navy bg-navy p-6 text-white transition-colors hover:bg-navy-deep md:p-10"
          >
            <span className="label text-mustard-soft">Next project</span>
            <span className="display flex items-baseline gap-4 text-title">
              {next.title}
              <span aria-hidden className="text-[0.6em] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}

function ClassicCaseStudy({ project, next }: Props) {
  const sections = project.caseStudy?.sections ?? [];
  const cover = project.cover?.type === "image" ? project.cover : undefined;
  const facts = [
    { label: "Role", value: project.role },
    { label: "Stack", value: project.stack.length ? project.stack.join(", ") : "-" },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
    ...(project.caseStudy?.facts ?? []),
  ];

  return (
    <WiiPage
      title={project.title}
      subtitle={project.summary}
      thumb={cover?.src}
      accent={project.tags.includes("PRODUCT") ? "#fde0d2" : "#e8eef3"}
      channelId={project.slug}
      backHref="/work"
    >
      <div className="wii-case">
        <WiiPanel className="wii-case-hero-panel">
          <div className="wii-case-hero">
            {project.tags.length > 0 ? (
              <ul className="wii-case-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}

            <dl className="wii-case-facts">
              {facts.map((f) => (
                <div key={f.label} className="wii-case-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            {sections.length > 0 ? (
              <nav aria-label="Case study contents" className="wii-case-toc">
                <p className="wii-case-toc__label">Contents</p>
                <ol>
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#${sectionId(s, i)}`}>
                        <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                        {sectionTitle(s)}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {cover ? (
              <div className="wii-case-cover">
                <MediaFrame
                  media={cover}
                  placeholder={`${project.title} - cover`}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                  fit="contain"
                />
              </div>
            ) : null}
          </div>
        </WiiPanel>

        {sections.map((section, i) => {
          const notes = section.blocks.filter((b) => b.type === "note");
          const content = section.blocks.filter((b) => b.type !== "note");
          const id = sectionId(section, i);

          return (
            <WiiPanel key={id} className="wii-case-section-panel">
              <section id={id} aria-labelledby={`${id}-title`} className="wii-case-section">
                <header className="wii-case-section__head">
                  <span className="wii-case-section__num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`${id}-title`} className="wii-case-section__title">
                    {sectionTitle(section)}
                  </h2>
                </header>

                <div className="wii-case-section__grid">
                  <div className="wii-case-section__body">
                    {content.map((block, bi) => (
                      <CaseStudyBlock key={bi} block={block} />
                    ))}
                  </div>
                  {notes.length > 0 ? (
                    <aside className="wii-case-section__notes">
                      {notes.map((block, bi) => (
                        <CaseStudyBlock key={bi} block={block} />
                      ))}
                    </aside>
                  ) : null}
                </div>
              </section>
            </WiiPanel>
          );
        })}

        {next && next !== project ? (
          <WiiPanel className="wii-case-next-panel">
            <Link href={`/work/${next.slug}`} className="wii-case-next">
              <span className="wii-case-next__label">Next project</span>
              <span className="wii-case-next__title">
                {next.title}
                <span aria-hidden> →</span>
              </span>
            </Link>
          </WiiPanel>
        ) : null}
      </div>
    </WiiPage>
  );
}
