"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExperienceDetail } from "@/components/ExperienceCard";
import type { Experience } from "@/data/types";

/** Soft washes from the embroidery trail palette */
const CARD_TONES = [
  { bg: "#f5e6b8", accent: "#e6b422" }, // mustard
  { bg: "#fde0d2", accent: "#f07a45" }, // coral
  { bg: "#fce8d8", accent: "#f0a06a" }, // peach
  { bg: "#f9d6e4", accent: "#e85a8a" }, // rose
  { bg: "#f5d0d4", accent: "#d94f5c" }, // terracotta
] as const;

function yearLabel(entry: Experience) {
  const start = entry.roles[entry.roles.length - 1]?.start ?? "";
  const end = entry.roles[0]?.end ?? entry.roles[0]?.start ?? "";
  const startYear = start.match(/\d{4}/)?.[0];
  const endYear = end.match(/\d{4}/)?.[0];
  if (startYear && endYear && startYear !== endYear) return `${startYear}–${endYear}`;
  return endYear ?? startYear ?? "";
}

function shortLabel(entry: Experience) {
  return entry.shortName ?? entry.company;
}

function coverSrc(entry: Experience) {
  return entry.thumbnail ?? entry.logo;
}

/**
 * 2-column experience grid. Click a card to open the full detail overlay;
 * click the backdrop (or Escape / shrink control) to close.
 * Modal is portaled to document.body so it stays viewport-centered
 * even when a parent page-enter animation applies a CSS transform.
 */
export function ExperienceGallery({ entries }: { entries: Experience[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const active = entries.find((e) => e.id === activeId) ?? null;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.overflow = prev.bodyOverflow;
      documentElement.style.overflow = prev.htmlOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const dialog =
    active && mounted
      ? createPortal(
          <div
            role="presentation"
            className="fixed inset-0 z-[100] flex animate-overlay-in items-center justify-center bg-charcoal/45 p-3 backdrop-blur-[2px] md:p-6"
            onClick={() => setActiveId(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative flex max-h-[min(92dvh,58rem)] w-full max-w-3xl animate-dialog-in flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_80px_-32px_rgb(26_26_26/0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 left-4 z-10 md:top-5 md:left-5">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Close experience details"
                  className="grid size-9 place-items-center rounded-full text-charcoal-muted transition-colors hover:bg-black/[0.05] hover:text-charcoal"
                >
                  <ShrinkIcon />
                </button>
              </div>

              <div
                data-experience-scroll
                className="overflow-y-auto px-6 pt-14 pb-10 md:px-12 md:pt-16 md:pb-14"
              >
                <ExperienceDetail entry={active} titleId={titleId} />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
        {entries.map((entry, i) => {
          const tone = CARD_TONES[i % CARD_TONES.length];
          const cover = coverSrc(entry);
          const year = yearLabel(entry);
          const label = shortLabel(entry);

          return (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setActiveId(entry.id)}
                aria-haspopup="dialog"
                aria-expanded={activeId === entry.id}
                className="group relative aspect-[2/1] w-full overflow-hidden rounded-[1.75rem] text-left transition-transform duration-300 ease-(--ease-card) hover:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                style={{ backgroundColor: tone.bg }}
              >
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover}
                    alt=""
                    className={`absolute inset-0 size-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                      entry.company === "Nokia" || entry.company === "La Rotonde"
                        ? "object-cover"
                        : "object-contain p-8 md:p-10"
                    }`}
                  />
                ) : null}

                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

                <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.04em] text-navy shadow-sm backdrop-blur-sm md:bottom-4 md:left-4">
                  {label}
                  {year ? <span className="text-charcoal-muted"> · {year}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {dialog}
    </>
  );
}

function ShrinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5 2v3H2M9 2v3h3M5 12V9H2M9 12V9h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
