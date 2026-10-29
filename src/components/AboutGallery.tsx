import type { ScrapbookItem } from "@/data/types";
import { MediaFrame } from "./MediaFrame";

export function AboutGallery({ items, compact = false }: { items: ScrapbookItem[]; compact?: boolean }) {
  return (
    <ul
      className={`grid gap-4 ${
        compact ? "grid-cols-3 gap-3 sm:gap-4" : "grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6"
      }`}
    >
      {items.map((item, i) => (
        <li key={item.caption} className="group">
          <figure className="overflow-hidden rounded-2xl border border-navy/30 bg-white transition-colors group-hover:border-navy">
            <MediaFrame
              media={item.media}
              aspect="aspect-[4/5]"
              placeholder={compact ? "" : "Photo"}
              sizes="(min-width: 640px) 25vw, 45vw"
              className="rounded-none border-0"
            />
            <figcaption className="flex items-center justify-between px-3 py-2.5 text-sm text-navy">
              {item.caption}
              <span aria-hidden className="font-mono text-xs text-charcoal-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
