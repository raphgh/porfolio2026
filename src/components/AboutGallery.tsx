import type { ScrapbookItem } from "@/data/types";
import { MediaFrame } from "./MediaFrame";

export function AboutGallery({ items, compact = false }: { items: ScrapbookItem[]; compact?: boolean }) {
  return (
    <ul
      className={`grid gap-4 ${
        compact ? "grid-cols-3 gap-3 sm:gap-4" : "grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6"
      }`}
    >
      {items.map((item) => (
        <li key={item.caption} className="group">
          <figure className="relative overflow-hidden rounded-2xl border border-navy/30 bg-white">
            <div className="relative">
              <MediaFrame
                media={item.media}
                aspect="aspect-[4/5]"
                placeholder={compact ? "" : "Photo"}
                sizes="(min-width: 640px) 30vw, 90vw"
                className="rounded-none border-0 transition-[filter] duration-300 ease-out group-hover:brightness-[0.55]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 py-4 text-sm font-medium tracking-[-0.01em] text-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}
