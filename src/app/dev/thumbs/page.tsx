"use client";

import { useState } from "react";
import { ChannelThumb } from "@/components/wii/ChannelThumb";
import { wiiChannels, type ChannelThumbVariant } from "@/data/wiiChannels";

const EXTRAS: { variant: ChannelThumbVariant; title: string; accent?: string }[] = [
  { variant: "comingSoon", title: "Coming soon" },
];

/**
 * Side-by-side thumbnail review — compare designed channel faces.
 * Visit `/dev/thumbs` while iterating on the Wii home grid.
 */
export default function DevThumbsPage() {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const tiles = [
    ...wiiChannels.map((ch) => ({
      id: ch.id,
      variant: ch.thumb,
      title: ch.label,
      accent: ch.accent,
    })),
    ...EXTRAS.map((ex, i) => ({
      id: `extra-${i}`,
      variant: ex.variant,
      title: ex.title,
      accent: ex.accent,
    })),
  ];

  return (
    <div className="wii-dev-thumbs">
      <header className="wii-dev-thumbs__head">
        <h1>Channel thumbs</h1>
        <p>
          Hover a tile to preview Motion states. Aim for Wii Menu density: one subject, short title,
          shared gloss + scanlines, color family per section.
        </p>
      </header>
      <ul className="wii-dev-thumbs__grid">
        {tiles.map((tile) => (
          <li key={tile.id}>
            <button
              type="button"
              aria-label={tile.title}
              className={`wii-channel wii-dev-thumbs__tile${hoverId === tile.id ? " is-hover" : ""}`}
              onMouseEnter={() => setHoverId(tile.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(tile.id)}
              onBlur={() => setHoverId(null)}
            >
              <span className="wii-channel__face">
                <ChannelThumb
                  variant={tile.variant}
                  title={tile.title}
                  accent={tile.accent}
                  hovered={hoverId === tile.id}
                />
              </span>
            </button>
            <p className="wii-dev-thumbs__label">{tile.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
