"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ExperienceGallery } from "@/components/ExperienceGallery";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { experienceBoard, experienceEntries } from "@/data/experience";
import type { ExperienceBoardEntry } from "@/data/types";
import { wiiSound } from "@/lib/wiiSound";

const PLACEHOLDER = "[Add details here]";

function detailSummary(entry: ExperienceBoardEntry) {
  return entry.details?.summary?.trim() || PLACEHOLDER;
}

function detailDates(entry: ExperienceBoardEntry) {
  return entry.details?.dates?.trim() || PLACEHOLDER;
}

function detailStack(entry: ExperienceBoardEntry) {
  const stack = entry.details?.stack?.filter(Boolean) ?? [];
  return stack.length ? stack : [PLACEHOLDER];
}

function detailHighlights(entry: ExperienceBoardEntry) {
  const items = entry.details?.highlights?.filter(Boolean) ?? [];
  return items.length ? items : [PLACEHOLDER];
}

/**
 * Wii Experience board — year rail, glossy channel tiles, detail zoom.
 * Modern mode keeps the existing ExperienceGallery.
 */
export function WiiExperienceBoard() {
  const { mode } = useInterfaceMode();
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState(experienceBoard[0]?.year ?? 2026);
  const yearRefs = useRef(new Map<number, HTMLElement>());

  const years = useMemo(() => {
    const set = new Set(experienceBoard.map((e) => e.year));
    return [...set].sort((a, b) => b - a);
  }, []);

  const byYear = useMemo(() => {
    const map = new Map<number, ExperienceBoardEntry[]>();
    for (const entry of experienceBoard) {
      const list = map.get(entry.year) ?? [];
      list.push(entry);
      map.set(entry.year, list);
    }
    return map;
  }, []);

  const active = experienceBoard.find((e) => e.id === activeId) ?? null;

  useEffect(() => {
    if (mode !== "wii") return;
    const root = document.querySelector(".wii-page__scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const year = Number((visible.target as HTMLElement).dataset.year);
        if (!Number.isNaN(year)) setActiveYear(year);
      },
      {
        root: root instanceof Element ? root : null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    for (const el of yearRefs.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, [mode, years]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        wiiSound.back();
        setActiveId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (mode !== "wii") {
    return <ExperienceGallery entries={experienceEntries()} />;
  }

  return (
    <div className="wii-exp">
      <div className="wii-exp-layout">
        <aside className="wii-exp-rail" aria-label="Years">
          <div className="wii-exp-rail__line" aria-hidden />
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`wii-exp-rail__node${activeYear === year ? " is-active" : ""}`}
              onClick={() => {
                wiiSound.hover();
                yearRefs.current.get(year)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "start",
                });
                setActiveYear(year);
              }}
            >
              <span className="wii-exp-rail__dot" aria-hidden />
              <span className="wii-exp-rail__label">{year}</span>
            </button>
          ))}
        </aside>

        <div className="wii-exp-years">
          {years.map((year) => (
            <section
              key={year}
              className="wii-exp-year"
              data-year={year}
              ref={(el) => {
                if (el) yearRefs.current.set(year, el);
                else yearRefs.current.delete(year);
              }}
            >
              <h2 className="wii-exp-year__label">{year}</h2>
              <ul className="wii-exp-grid">
                {(byYear.get(year) ?? []).map((entry, i) => (
                  <li key={entry.id} className="wii-exp-grid__item">
                    <m.button
                      type="button"
                      className="wii-exp-tile"
                      layoutId={`wii-exp-${entry.id}`}
                      aria-label={`${entry.company}, ${entry.role}, ${entry.year}`}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={reduce ? undefined : { scale: 1.04, zIndex: 3 }}
                      whileFocus={reduce ? undefined : { scale: 1.04, zIndex: 3 }}
                      transition={
                        reduce
                          ? { duration: 0.2 }
                          : { type: "spring", stiffness: 360, damping: 24, delay: i * 0.05 }
                      }
                      onClick={() => {
                        wiiSound.confirm();
                        setActiveId(entry.id);
                      }}
                    >
                      <span
                        className={`wii-exp-tile__media${entry.fit === "contain" ? " is-contain" : ""}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={entry.image}
                          alt=""
                          className={`wii-exp-tile__img wii-exp-tile__img--${entry.fit}`}
                        />
                        <span className="wii-exp-tile__gloss" aria-hidden />
                        <span className="wii-exp-tile__scan" aria-hidden />
                        <span className="wii-exp-tile__pill">
                          <strong>{entry.company}</strong>
                          <span>
                            · {entry.role} · {entry.year}
                          </span>
                        </span>
                      </span>
                    </m.button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <div className="wii-exp-detail-root" role="presentation">
            <m.button
              type="button"
              className="wii-exp-detail-backdrop"
              aria-label="Close details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                wiiSound.back();
                setActiveId(null);
              }}
            />
            <m.article
              layoutId={`wii-exp-${active.id}`}
              className="wii-exp-detail"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.company} ${active.role}`}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <div
                className={`wii-exp-detail__media${active.fit === "contain" ? " is-contain" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt=""
                  className={`wii-exp-tile__img wii-exp-tile__img--${active.fit}`}
                />
                <span className="wii-exp-tile__gloss" aria-hidden />
                <span className="wii-exp-tile__scan" aria-hidden />
              </div>
              <div className="wii-exp-detail__body">
                <header className="wii-exp-detail__head">
                  <h2 className="wii-exp-detail__title">
                    {active.company}
                    <span>
                      {" "}
                      · {active.role}
                    </span>
                  </h2>
                  <p className="wii-exp-detail__dates">{detailDates(active)}</p>
                </header>
                <p className="wii-exp-detail__summary">{detailSummary(active)}</p>
                <div className="wii-exp-detail__block">
                  <h3>Stack</h3>
                  <ul className="wii-exp-detail__stack">
                    {detailStack(active).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="wii-exp-detail__block">
                  <h3>Highlights</h3>
                  <ul className="wii-exp-detail__list">
                    {detailHighlights(active).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="wii-pill wii-pill--primary"
                  onClick={() => {
                    wiiSound.back();
                    setActiveId(null);
                  }}
                >
                  Close
                </button>
              </div>
            </m.article>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
