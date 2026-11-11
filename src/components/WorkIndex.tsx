import Link from "next/link";
import { projectHref } from "@/data/projects";
import type { Project } from "@/data/types";

/** Soft washes from the embroidery trail palette — same as Experience. */
const CARD_TONES = [
  { bg: "#f5e6b8", accent: "#e6b422" }, // mustard
  { bg: "#fde0d2", accent: "#f07a45" }, // coral
  { bg: "#fce8d8", accent: "#f0a06a" }, // peach
  { bg: "#f9d6e4", accent: "#e85a8a" }, // rose
  { bg: "#f5d0d4", accent: "#d94f5c" }, // terracotta
] as const;

/**
 * 2-column project grid matching the Experience look.
 * Cards link through to existing case-study pages — no modal, no filters.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
      {projects.map((project, i) => {
        const tone = CARD_TONES[i % CARD_TONES.length];
        const href = projectHref(project);
        const cover = project.cover?.type === "image" ? project.cover : null;
        const external = Boolean(href && !href.startsWith("/"));

        const body = (
          <>
            <div
              className="relative aspect-[2/1] w-full overflow-hidden"
              style={{ backgroundColor: cover ? undefined : tone.bg }}
            >
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover.src}
                  alt={cover.alt}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <span className="absolute inset-0" style={{ backgroundColor: tone.bg }} />
              )}
            </div>

            <div className="flex flex-col gap-2 px-5 py-4 md:px-6 md:py-5">
              <h2 className="display text-heading text-navy">{project.title}</h2>
              <p className="text-sm font-medium text-charcoal-soft">{project.role}</p>
              <p className="text-sm leading-snug text-charcoal-soft">{project.summary}</p>
            </div>
          </>
        );

        return (
          <li key={project.slug} id={project.slug} className="scroll-mt-24">
            {href ? (
              external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white text-left transition-transform duration-300 ease-(--ease-card) hover:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                >
                  {body}
                </a>
              ) : (
                <Link
                  href={href}
                  className="group relative block overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white text-left transition-transform duration-300 ease-(--ease-card) hover:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                >
                  {body}
                </Link>
              )
            ) : (
              <article className="overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white">
                {body}
              </article>
            )}
          </li>
        );
      })}
    </ul>
  );
}
