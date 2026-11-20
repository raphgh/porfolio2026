"use client";

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

/**
 * Plain button (no Motion layoutId/transform). Safari blanks channel
 * artwork when tiles sit under a Motion-transformed ancestor or share layoutId.
 */
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
  const empty = !channel;
  const hot = Boolean(hovered || focused);

  const className = [
    "wii-channel",
    empty ? "wii-channel--empty" : "",
    hot ? "is-hover" : "",
    dimmed ? "is-dim" : "",
    wiggle ? "is-wiggle" : "",
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

  if (empty || !channel) {
    return (
      <div className={className} aria-hidden>
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={channel.label}
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
    </button>
  );
}
