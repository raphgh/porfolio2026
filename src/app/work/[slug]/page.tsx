import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ProjectHero } from "@/components/case-study/ProjectHero";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const withStudies = projects.filter((p) => p.caseStudy);
  const next = withStudies[(withStudies.indexOf(project) + 1) % withStudies.length];

  return (
    <article className="shell pt-10 pb-24 md:pt-14 md:pb-32">
      <ProjectHero project={project} />

      <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
        {project.caseStudy.sections.map((section, i) => (
          <CaseStudySection key={i} section={section} index={i} />
        ))}
      </div>

      {next && next !== project && (
        <nav aria-label="Next project" className="mt-28 border-t border-ink pt-6">
          <Link href={`/work/${next.slug}`} className="group flex flex-col gap-2">
            <span className="label text-ink-soft">Next project</span>
            <span className="flex items-baseline gap-4 text-title font-medium">
              {next.title}
              <span aria-hidden className="text-[0.6em] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent">
                →
              </span>
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
