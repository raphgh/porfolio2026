"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChannelTile } from "@/components/wii/ChannelTile";
import {
  WII_BOARD_SLOTS,
  WII_PAGE_COUNT,
  getWiiPageSlots,
  type WiiChannel,
} from "@/data/wiiChannels";
import { wiiSound } from "@/lib/wiiSound";

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  onSelect: (channel: WiiChannel) => void;
  hoverId: string | null;
  onHoverChange: (id: string | null) => void;
};

const DRAG_THRESHOLD = 10;

/**
 * Page via scroll-snap (not transform). Pointer drag pans between pages.
 * Safari blanks <img> under Motion-transformed ancestors - thumbs use CSS backgrounds.
 */
export function ChannelGrid({ page, onPageChange, onSelect, hoverId, onHoverChange }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollingFromProp = useRef(false);
  const suppressClick = useRef(false);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    moved: boolean;
  } | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [wiggleIndex, setWiggleIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const pages = useMemo(
    () => Array.from({ length: WII_PAGE_COUNT }, (_, i) => getWiiPageSlots(i)),
    [],
  );

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(WII_PAGE_COUNT - 1, next));
      if (clamped === page) return;
      wiiSound.page();
      onPageChange(clamped);
    },
    [onPageChange, page],
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (!width) return;
    const target = page * width;
    if (Math.abs(el.scrollLeft - target) < 2) return;
    scrollingFromProp.current = true;
    el.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    const t = window.setTimeout(() => {
      scrollingFromProp.current = false;
    }, reduce ? 50 : 450);
    return () => window.clearTimeout(t);
  }, [page, reduce]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onResize = () => {
      el.scrollLeft = page * el.clientWidth;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [page]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      const filled = pages[page]?.map((c, i) => (c ? i : -1)).filter((i) => i >= 0) ?? [];
      if (!filled.length) return;
      const pick = filled[Math.floor(Math.random() * filled.length)]!;
      setWiggleIndex(pick);
      window.setTimeout(() => setWiggleIndex(null), 450);
    }, 12000);
    return () => window.clearInterval(id);
  }, [page, pages, reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;

      const current = focusIndex ?? 0;
      if (focusIndex === null) {
        setFocusIndex(0);
        return;
      }

      if (e.key === "ArrowLeft") {
        if (current % 4 === 0) goTo(page - 1);
        else setFocusIndex(Math.max(0, current - 1));
      } else if (e.key === "ArrowRight") {
        if ((current + 1) % 4 === 0) goTo(page + 1);
        else setFocusIndex(Math.min(WII_BOARD_SLOTS - 1, current + 1));
      } else if (e.key === "ArrowUp") {
        setFocusIndex(Math.max(0, current - 4));
      } else if (e.key === "ArrowDown") {
        setFocusIndex(Math.min(WII_BOARD_SLOTS - 1, current + 4));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusIndex, goTo, page]);

  // Kill the click that follows a drag so tiles don't open mid-swipe.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick.current) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    };
    el.addEventListener("click", onClickCapture, true);
    return () => el.removeEventListener("click", onClickCapture, true);
  }, []);

  const onScroll = () => {
    const el = wrapRef.current;
    if (!el || scrollingFromProp.current || drag.current) return;
    const width = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / width);
    if (next !== page) onPageChange(Math.max(0, Math.min(WII_PAGE_COUNT - 1, next)));
  };

  const endDrag = (el: HTMLDivElement, pointerId: number, clientX: number) => {
    const state = drag.current;
    if (!state || state.pointerId !== pointerId) return;
    drag.current = null;
    setDragging(false);
    try {
      el.releasePointerCapture(pointerId);
    } catch {
      /* already released */
    }
    if (!state.moved) return;

    suppressClick.current = true;
    scrollingFromProp.current = true;
    const width = el.clientWidth || 1;
    const dx = clientX - state.startX;
    const velocityBias = dx > 40 ? -0.25 : dx < -40 ? 0.25 : 0;
    const next = Math.round(el.scrollLeft / width + velocityBias);
    const clamped = Math.max(0, Math.min(WII_PAGE_COUNT - 1, next));
    if (clamped !== page) {
      wiiSound.page();
      onPageChange(clamped);
    } else {
      el.scrollTo({ left: page * width, behavior: reduce ? "auto" : "smooth" });
    }
    window.setTimeout(() => {
      scrollingFromProp.current = false;
    }, reduce ? 50 : 450);
  };

  const canPrev = page > 0;
  const canNext = page < WII_PAGE_COUNT - 1;

  return (
    <div className="wii-channel-grid">
      {canPrev ? (
        <PageArrow side="left" onClick={() => goTo(page - 1)} />
      ) : null}
      {canNext ? (
        <PageArrow side="right" onClick={() => goTo(page + 1)} />
      ) : null}

      {canNext ? <div className="wii-channel-grid__peek" aria-hidden /> : null}

      <div
        className={`wii-channel-grid__scroller${dragging ? " is-dragging" : ""}`}
        ref={wrapRef}
        onScroll={onScroll}
        onPointerDown={(e) => {
          if (e.button !== 0 || e.pointerType === "touch") return;
          const el = wrapRef.current;
          if (!el) return;
          drag.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          const state = drag.current;
          const el = wrapRef.current;
          if (!state || state.pointerId !== e.pointerId || !el) return;
          const dx = e.clientX - state.startX;
          if (!state.moved) {
            if (Math.abs(dx) < DRAG_THRESHOLD) return;
            state.moved = true;
            setDragging(true);
            el.setPointerCapture(e.pointerId);
            onHoverChange(null);
          }
          scrollingFromProp.current = true;
          el.scrollLeft = state.startScroll - dx;
        }}
        onPointerUp={(e) => {
          const el = wrapRef.current;
          if (!el) return;
          endDrag(el, e.pointerId, e.clientX);
        }}
        onPointerCancel={(e) => {
          const el = wrapRef.current;
          if (!el) return;
          endDrag(el, e.pointerId, e.clientX);
        }}
      >
        <div className="wii-channel-grid__track">
          {pages.map((slots, pageIndex) => (
            <ul
              key={pageIndex}
              className="wii-channel-grid__page"
              aria-label={pageIndex === page ? "Channels" : undefined}
              aria-hidden={pageIndex !== page}
            >
              {slots.map((channel, i) => (
                <li key={channel?.id ?? `p${pageIndex}-e${i}`}>
                  <ChannelTile
                    channel={channel}
                    index={i}
                    pageIndex={pageIndex}
                    focused={pageIndex === page && focusIndex !== null && focusIndex === i && !!channel}
                    hovered={!!channel && hoverId === channel.id}
                    dimmed={!!hoverId && !!channel && hoverId !== channel.id}
                    wiggle={pageIndex === page && wiggleIndex === i}
                    onHoverChange={(id) => {
                      if (id) setFocusIndex(null);
                      onHoverChange(id);
                    }}
                    onSelect={onSelect}
                    onFocusIndex={setFocusIndex}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {WII_PAGE_COUNT > 1 ? (
        <div className="wii-page-dots" aria-hidden>
          {Array.from({ length: WII_PAGE_COUNT }, (_, i) => (
            <span key={i} data-active={i === page ? "true" : "false"} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PageArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`wii-page-arrow wii-page-arrow--${side}`}
      aria-label={side === "left" ? "Previous page" : "Next page"}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M8 4l10 8-10 8V4z" />
      </svg>
    </button>
  );
}
