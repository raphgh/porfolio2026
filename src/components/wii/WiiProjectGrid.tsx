"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { WorkIndex } from "@/components/WorkIndex";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiConfirmDialog } from "@/components/wii/WiiConfirmDialog";
import { projectHref } from "@/data/projects";
import type { Project } from "@/data/types";
import { wiiSound } from "@/lib/wiiSound";

type Props = { projects: Project[] };

/**
 * Wii: glossy 2-col channel cards + confirm dialog.
 * Modern: existing WorkIndex.
 */
export function WiiProjectGrid({ projects }: Props) {
  const { mode } = useInterfaceMode();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pending, setPending] = useState<Project | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const cards = useMemo(() => projects, [projects]);

  if (mode !== "wii") {
    return <WorkIndex projects={projects} />;
  }

  return (
    <>
      <ul className="wii-project-grid">
        {cards.map((project) => {
          const cover = project.cover?.type === "image" ? project.cover : null;
          const active = hoverId === project.slug;
          const dimmed = hoverId !== null && !active;
          return (
            <li key={project.slug} id={project.slug} className="wii-project-grid__item">
              <m.button
                type="button"
                className={`wii-project-card${active ? " is-hot" : ""}${dimmed ? " is-dim" : ""}`}
                aria-label={`${project.title}. ${project.role}.`}
                initial={false}
                animate={{
                  scale: active ? 1.04 : 1,
                  zIndex: active ? 4 : 1,
                }}
                transition={
                  reduce
                    ? { duration: 0.2 }
                    : { type: "spring", stiffness: 380, damping: 24 }
                }
                onMouseEnter={() => {
                  wiiSound.hover();
                  setHoverId(project.slug);
                }}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(project.slug)}
                onBlur={() => setHoverId(null)}
                onClick={() => {
                  wiiSound.hover();
                  setPending(project);
                }}
              >
                <span className="wii-project-card__media">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover.src}
                      alt=""
                      className="wii-project-card__img"
                    />
                  ) : (
                    <span className="wii-project-card__wash" />
                  )}
                  <span className="wii-project-card__gloss" aria-hidden />
                  <span className="wii-project-card__scan" aria-hidden />
                  <span className="wii-project-card__title">{project.title}</span>
                  <span className="wii-project-card__role">{project.role}</span>
                  <span className="wii-project-card__bubble" aria-hidden={!active}>
                    <span className="wii-project-card__bubble-text">{project.summary}</span>
                  </span>
                </span>
                <span className="wii-project-card__body">
                  <span className="wii-project-card__lede">{project.summary}</span>
                </span>
              </m.button>
            </li>
          );
        })}
      </ul>

      <WiiConfirmDialog
        label={pending?.title ?? null}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (!pending) return;
          const href = projectHref(pending);
          const next = pending;
          setPending(null);
          if (href && href.startsWith("/")) {
            router.push(href);
            return;
          }
          if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
          }
          setComingSoon(next.title);
        }}
      />

      <AnimatePresence>
        {comingSoon ? (
          <div className="wii-dialog-root" role="presentation">
            <m.button
              type="button"
              aria-label="Close"
              className="wii-dialog-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setComingSoon(null)}
            />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Coming soon"
              className="wii-dialog-panel wii-coming-soon"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
            >
              <p className="wii-coming-soon__ghost">Coming soon</p>
              <p className="wii-coming-soon__copy">
                The {comingSoon} case study isn&apos;t ready yet. Check back soon.
              </p>
              <button
                type="button"
                className="wii-pill wii-pill--primary"
                onClick={() => {
                  wiiSound.back();
                  setComingSoon(null);
                }}
              >
                OK
              </button>
            </m.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
