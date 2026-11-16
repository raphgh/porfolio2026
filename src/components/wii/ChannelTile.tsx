"use client";

import { m, useReducedMotion } from "motion/react";
import type { WiiChannel } from "@/data/wiiChannels";
import { wiiSound } from "@/lib/wiiSound";

type Props = {
  channel?: WiiChannel | null;
  index: number;
  pageIndex: number;
  focused?: boolean;
  hovered?: boolean;
  dimmed?: boolean;
  wiggle?: boolean;
  onHoverChange?: (id: string | null) => void;
  onSelect?: (channel: WiiChannel) => void;
  onFocusIndex?: (index: number) => void;
};

const spring = { type: "spring" as const, stiffness: 420, damping: 24 };

export function ChannelTile({
  channel,
  index,
  pageIndex,
  focused,
  hovered,
  dimmed,
  wiggle,
  onHoverChange,
  onSelect,
  onFocusIndex,
}: Props) {
  const reduce = useReducedMotion();
  const empty = !channel;
  const globalIndex = pageIndex * 12 + index;

  const className = [
    "wii-channel",
    empty ? "wii-channel--empty" : "",
    hovered || focused ? "is-hover" : "",
    dimmed ? "is-dim" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const body = empty ? (
    <>
      <span className="wii-channel__face">
        <span className="wii-channel__scan" aria-hidden />
        <span className="wii-channel__empty-mark">rg</span>
        <span className="wii-channel__fade" aria-hidden />
      </span>
    </>
  ) : (
    <>
      <span className="wii-channel__face">
        {channel.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={channel.preview} alt="" className="wii-channel__preview" />
        ) : channel.id === "resume" ? (
          <span className="wii-channel__doc" style={{ background: channel.accent }}>
            <span className="wii-channel__doc-sheet" />
            <span className="wii-channel__doc-label">PDF</span>
          </span>
        ) : (
          <span className="wii-channel__wash" style={{ background: channel.accent }} />
        )}
        <span className="wii-channel__scan" aria-hidden />
        <span className="wii-channel__fade" aria-hidden />
        <span className="wii-channel__shine" aria-hidden />
        {channel.showLabel ? <span className="wii-channel__badge">{channel.label}</span> : null}
      </span>
      <span className="wii-channel__tip" aria-hidden>
        {channel.label}
      </span>
    </>
  );

  const motionProps = {
    className,
    initial: reduce ? false : ({ opacity: 0, scale: 0.8 } as const),
    animate: reduce
      ? ({ opacity: 1, scale: 1 } as const)
      : {
          opacity: 1,
          scale: hovered || focused ? 1.06 : 1,
          rotate: wiggle ? [0, -1.5, 1.5, 0] : 0,
          zIndex: hovered || focused ? 5 : 1,
        },
    transition: reduce
      ? { duration: 0.2 }
      : {
          ...spring,
          delay: globalIndex * 0.035,
          rotate: { duration: 0.4 },
        },
  };

  if (empty || !channel) {
    return (
      <m.div {...motionProps} aria-hidden>
        {body}
      </m.div>
    );
  }

  return (
    <m.button
      type="button"
      layoutId={`wii-channel-${channel.id}`}
      aria-label={channel.label}
      {...motionProps}
      onMouseEnter={() => {
        wiiSound.hover();
        onHoverChange?.(channel.id);
      }}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => {
        onFocusIndex?.(index);
        onHoverChange?.(channel.id);
      }}
      onBlur={() => onHoverChange?.(null)}
      onClick={() => onSelect?.(channel)}
    >
      {body}
    </m.button>
  );
}
