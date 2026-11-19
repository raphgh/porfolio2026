"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { LabItem, LabSheet } from "@/components/LabItem";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { WiiPanel } from "@/components/wii/WiiPanel";
import { lab, labEntries } from "@/data/lab";
import type { LabEntry, LabStatus } from "@/data/types";
import { wiiSound } from "@/lib/wiiSound";

const READ_KEY = "wii-lab-read";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_LABEL: Record<LabStatus, string> = {
  SHIPPED: "SHIPPED",
  ONGOING: "IN PROGRESS",
  PAUSED: "PAUSED",
  ABANDONED: "ABANDONED",
};

function parseISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

function ymd(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function loadRead(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
}

function saveRead(ids: Set<string>) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

function formatDisplayDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

/**
 * Wii Message Board for Lab - calendar + message rows.
 * Modern mode keeps the existing LabItem list.
 */
export function WiiLabBoard() {
  const { mode } = useInterfaceMode();
  const reduce = useReducedMotion();

  const newest = useMemo(() => {
    const sorted = [...labEntries].sort((a, b) => b.date.localeCompare(a.date));
    return parseISO(sorted[0]?.date ?? "2026-03-01");
  }, []);

  const [cursor, setCursor] = useState({ y: newest.y, m: newest.m });
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [read, setRead] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRead(loadRead());
    setReady(true);
  }, []);

  const byDay = useMemo(() => {
    const map = new Map<string, LabEntry[]>();
    for (const entry of labEntries) {
      const list = map.get(entry.date) ?? [];
      list.push(entry);
      map.set(entry.date, list);
    }
    return map;
  }, []);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
        new Date(cursor.y, cursor.m, 1),
      ),
    [cursor],
  );

  const cells = useMemo(() => {
    const firstDow = new Date(cursor.y, cursor.m, 1).getDay();
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const out: ({ day: number; key: string; entries: LabEntry[] } | null)[] = [];
    for (let i = 0; i < firstDow; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = ymd(cursor.y, cursor.m, d);
      out.push({ day: d, key, entries: byDay.get(key) ?? [] });
    }
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [byDay, cursor]);

  const markRead = useCallback((id: string) => {
    setRead((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      saveRead(next);
      return next;
    });
  }, []);

  const jumpTo = useCallback(
    (entry: LabEntry) => {
      wiiSound.confirm();
      setHighlightId(entry.id);
      markRead(entry.id);
      const el = document.getElementById(`lab-${entry.id}`);
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      window.setTimeout(() => setHighlightId((cur) => (cur === entry.id ? null : cur)), 2200);
    },
    [markRead, reduce],
  );

  if (mode !== "wii") {
    return (
      <LabSheet>
        {lab.map((item) => (
          <LabItem key={item.id} item={item} showDescription />
        ))}
      </LabSheet>
    );
  }

  return (
    <div className="wii-lab">
      <WiiPanel className="wii-lab-list-panel">
        <ul className="wii-lab-list">
          {labEntries.map((entry, i) => {
            const unread = ready && !read.has(entry.id);
            const live = Boolean(entry.href && entry.href !== "#");
            return (
              <m.li
                key={entry.id}
                id={`lab-${entry.id}`}
                className={`wii-lab-msg${highlightId === entry.id ? " is-flash" : ""}${unread ? " is-unread" : ""}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0.25, delay: i * 0.04 }
                    : { type: "spring", stiffness: 280, damping: 28, delay: i * 0.06 }
                }
                onMouseEnter={() => markRead(entry.id)}
                onFocusCapture={() => markRead(entry.id)}
              >
                <div className="wii-lab-msg__avatar-wrap">
                  <span className="wii-lab-msg__avatar">
                    {entry.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.icon}
                        alt=""
                        className={entry.icon.endsWith(".svg") ? "is-svg" : undefined}
                      />
                    ) : (
                      <span className="wii-lab-msg__initial">{entry.title.slice(0, 1)}</span>
                    )}
                  </span>
                  {unread ? <span className="wii-lab-msg__unread" aria-label="Unread" /> : null}
                </div>

                <div className="wii-lab-msg__main">
                  <div className="wii-lab-msg__topline">
                    <span className={`wii-lab-badge wii-lab-badge--${entry.status.toLowerCase()}`}>
                      {STATUS_LABEL[entry.status]}
                    </span>
                    {live ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wii-lab-msg__title"
                      >
                        {entry.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="wii-lab-msg__title is-plain">{entry.title}</span>
                    )}
                  </div>
                  <p className="wii-lab-msg__desc">{entry.description}</p>
                  <dl className="wii-lab-chips">
                    <div className="wii-lab-chip">
                      <dt>Date</dt>
                      <dd>{formatDisplayDate(entry.date)}</dd>
                    </div>
                    <div className="wii-lab-chip">
                      <dt>Technology</dt>
                      <dd>{entry.tech.join(", ")}</dd>
                    </div>
                    <div className="wii-lab-chip">
                      <dt>Result</dt>
                      <dd>{entry.result}</dd>
                    </div>
                  </dl>
                </div>
              </m.li>
            );
          })}
        </ul>
      </WiiPanel>

      <WiiPanel className="wii-lab-cal-panel">
        <div className="wii-lab-cal">
          <div className="wii-lab-cal__head">
            <button
              type="button"
              className="wii-page-arrow wii-lab-cal__arrow wii-lab-cal__arrow--prev"
              aria-label="Previous month"
              onClick={() => {
                wiiSound.hover();
                setCursor((c) => {
                  const m = c.m - 1;
                  return m < 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m };
                });
              }}
            >
              <ArrowIcon />
            </button>
            <h2 className="wii-lab-cal__title">{monthLabel}</h2>
            <button
              type="button"
              className="wii-page-arrow wii-lab-cal__arrow wii-lab-cal__arrow--next"
              aria-label="Next month"
              onClick={() => {
                wiiSound.hover();
                setCursor((c) => {
                  const m = c.m + 1;
                  return m > 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m };
                });
              }}
            >
              <ArrowIcon />
            </button>
          </div>

          <div className="wii-lab-cal__weekdays" aria-hidden>
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="wii-lab-cal__grid" role="grid" aria-label={monthLabel}>
            {cells.map((cell, i) =>
              cell ? (
                <button
                  key={cell.key}
                  type="button"
                  role="gridcell"
                  className={`wii-lab-cal__day${cell.entries.length ? " has-entry" : ""}`}
                  disabled={!cell.entries.length}
                  aria-label={
                    cell.entries.length
                      ? `${cell.day}, ${cell.entries.map((e) => e.title).join(", ")}`
                      : `${cell.day}`
                  }
                  onClick={() => {
                    if (cell.entries[0]) jumpTo(cell.entries[0]);
                  }}
                >
                  <span className="wii-lab-cal__num">{cell.day}</span>
                  {cell.entries.length ? (
                    <span className="wii-lab-cal__marks">
                      {cell.entries.slice(0, 3).map((e) =>
                        e.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={e.id} src={e.icon} alt="" className="wii-lab-cal__icon" />
                        ) : (
                          <span
                            key={e.id}
                            className="wii-lab-cal__dot"
                            style={{ background: e.color ?? "#3fa9e0" }}
                          />
                        ),
                      )}
                    </span>
                  ) : null}
                </button>
              ) : (
                <span key={`pad-${i}`} className="wii-lab-cal__day is-pad" aria-hidden />
              ),
            )}
          </div>
        </div>
      </WiiPanel>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M8 4l10 8-10 8V4z" />
    </svg>
  );
}
