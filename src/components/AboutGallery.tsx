import type { ScrapbookItem } from "@/data/types";
import { MediaFrame } from "./MediaFrame";

/** Taped-in snapshots — deliberately small and loose, a scrapbook not a portfolio. */
export function AboutGallery({ items, compact = false }: { items: ScrapbookItem[]; compact?: boolean }) {
  return (
    <ul
      className={`grid gap-y-10 ${
        compact ? "grid-cols-3 gap-x-3 sm:gap-x-6" : "grid-cols-2 gap-x-5 sm:grid-cols-3 md:gap-x-10 md:gap-y-14"
      }`}
    >
      {items.map((item, i) => (
        <li
          key={item.caption}
          style={{ "--tilt": `${item.tilt ?? 0}deg` } as React.CSSProperties}
          className={`group relative ${!compact && i % 3 === 1 ? "sm:translate-y-8" : ""}`}
        >
          <figure className="relative rotate-(--tilt) bg-[#fbfaf6] p-2 pb-0 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_10px_24px_-14px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:-translate-y-1 md:p-2.5 md:pb-0">
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-3 bg-[#e6dcc4]/85 mix-blend-multiply"
            />
            <MediaFrame
              media={item.media}
              aspect="aspect-[4/5]"
              placeholder={compact ? "" : "Photo"}
              sizes="(min-width: 640px) 25vw, 45vw"
            />
            <figcaption className="label flex items-center justify-between py-2.5 text-ink md:py-3">
              {item.caption}
              <span aria-hidden className="text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
