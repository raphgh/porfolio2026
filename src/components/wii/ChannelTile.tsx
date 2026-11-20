"use client";

import { m, useReducedMotion } from "motion/react";
import { ChannelThumb } from "@/components/wii/ChannelThumb";
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
  pageIndex: _pageIndex,
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
  const hot = Boolean(hovered || focused);

  const className = [
    "wii-channel",
    empty ? "wii-channel--empty" : "",
    hot ? "is-hover" : "",
    dimmed ? "is-dim" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const body = empty ? (
    <>
      <span className="wii-channel__face">
        <ChannelThumb variant="comingSoon" title="Coming soon" hovered={false} />
      </span>
    </>
  ) : (
    <>
      <span className="wii-channel__face">
        <ChannelThumb
          variant={channel.thumb}
          title={channel.label}
          accent={channel.accent}
          hovered={hot}
        />
        <span className="wii-channel__shine" aria-hidden />
      </span>
      <span className="wii-channel__tip" aria-hidden>
        {channel.label}
      </span>
    </>
  );

  // No enter opacity/scale - Safari can leave layoutId tiles stuck invisible.
  const motionProps = {
    className,
    initial: false as const,
    animate: reduce
      ? ({ scale: 1 } as const)
      : {
          scale: hot ? 1.06 : 1,
          rotate: wiggle ? [0, -1.5, 1.5, 0] : 0,
          zIndex: hot ? 5 : 1,
        },
    transition: reduce
      ? { duration: 0.2 }
      : {
          ...spring,
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
