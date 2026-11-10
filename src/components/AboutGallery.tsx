import Image from "next/image";
import type { ScrapbookItem } from "@/data/types";

export function AboutGallery({ items, compact = false }: { items: ScrapbookItem[]; compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? "columns-3 gap-3 sm:gap-4"
          : "columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-3 md:gap-6"
      }
    >
      {items.map((item) => {
        const landscape = item.aspect === "landscape";
        const media = item.media?.type === "image" ? item.media : null;

        return (
          <li key={item.caption} className="group mb-4 break-inside-avoid sm:mb-5 md:mb-6">
            <figure className="relative overflow-hidden rounded-2xl border border-navy/30 bg-white">
              {media ? (
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={landscape ? 1200 : 800}
                  height={landscape ? 750 : 1000}
                  sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full transition-[filter] duration-300 ease-out sm:group-hover:brightness-[0.55]"
                />
              ) : (
                <div className="aspect-[5/6] bg-paper-deep" />
              )}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-4 text-sm font-medium tracking-[-0.01em] text-white opacity-100 transition-opacity duration-300 ease-out sm:opacity-0 sm:group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
