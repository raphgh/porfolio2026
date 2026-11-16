"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, m, useMotionValue, useReducedMotion } from "motion/react";
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

const pageSpring = { type: "spring" as const, stiffness: 220, damping: 28 };

export function ChannelGrid({ page, onPageChange, onSelect, hoverId, onHoverChange }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dragStart = useRef(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [wiggleIndex, setWiggleIndex] = useState<number | null>(null);
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
    const width = wrapRef.current?.clientWidth ?? 0;
    if (!width) return;
    if (reduce) {
      x.set(-page * width);
      return;
    }
    animate(x, -page * width, pageSpring);
  }, [page, reduce, x]);

  useEffect(() => {
    const onResize = () => {
      const width = wrapRef.current?.clientWidth ?? 0;
      x.set(-page * width);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [page, x]);

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
      if (e.key === "ArrowLeft") {
        if (focusIndex % 4 === 0) goTo(page - 1);
        else setFocusIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        if ((focusIndex + 1) % 4 === 0) goTo(page + 1);
        else setFocusIndex((i) => Math.min(WII_BOARD_SLOTS - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        setFocusIndex((i) => Math.max(0, i - 4));
      } else if (e.key === "ArrowDown") {
        setFocusIndex((i) => Math.min(WII_BOARD_SLOTS - 1, i + 4));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusIndex, goTo, page]);

  const canPrev = page > 0;
  const canNext = page < WII_PAGE_COUNT - 1;

  return (
    <div className="wii-channel-grid" ref={wrapRef}>
      {canPrev ? (
        <PageArrow
          side="left"
          onClick={() => goTo(page - 1)}
          reduce={!!reduce}
        />
      ) : null}
      {canNext ? (
        <PageArrow
          side="right"
          onClick={() => goTo(page + 1)}
          reduce={!!reduce}
        />
      ) : null}

      {canNext ? <div className="wii-channel-grid__peek" aria-hidden /> : null}

      <m.div
        className="wii-channel-grid__track"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -((WII_PAGE_COUNT - 1) * (wrapRef.current?.clientWidth ?? 0)), right: 0 }}
        dragElastic={0.12}
        onDragStart={() => {
          dragStart.current = x.get();
        }}
        onDragEnd={(_, info) => {
          const width = wrapRef.current?.clientWidth ?? 1;
          const projected = -dragStart.current - info.offset.x - info.velocity.x * 0.2;
          const next = Math.round(projected / width);
          goTo(next);
        }}
      >
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
                  focused={pageIndex === page && focusIndex === i && !!channel}
                  hovered={!!channel && hoverId === channel.id}
                  dimmed={!!hoverId && !!channel && hoverId !== channel.id}
                  wiggle={pageIndex === page && wiggleIndex === i}
                  onHoverChange={onHoverChange}
                  onSelect={onSelect}
                  onFocusIndex={setFocusIndex}
                />
              </li>
            ))}
          </ul>
        ))}
      </m.div>

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
  reduce,
}: {
  side: "left" | "right";
  onClick: () => void;
  reduce: boolean;
}) {
  return (
    <m.button
      type="button"
      className={`wii-page-arrow wii-page-arrow--${side}`}
      aria-label={side === "left" ? "Previous page" : "Next page"}
      onClick={onClick}
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.15,
              x: side === "left" ? [0, -4, 0] : [0, 4, 0],
              transition: { x: { repeat: Infinity, duration: 0.9 }, scale: { duration: 0.15 } },
            }
      }
    >
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M8 4l10 8-10 8V4z" />
      </svg>
    </m.button>
  );
}
