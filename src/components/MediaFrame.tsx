import Image from "next/image";
import type { Media } from "@/data/types";
import { AutoVideo } from "./AutoVideo";

type Props = {
  media?: Media;
  /** Tailwind aspect class, e.g. `aspect-[16/10]`. */
  aspect?: string;
  /** Text shown in the empty slot. */
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fixed-ratio media slot. With no media it renders a labelled hatch so the
 * layout is honest about what's missing instead of using stock imagery.
 */
export function MediaFrame({
  media,
  aspect = "aspect-[16/10]",
  placeholder = "Media",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-paper-deep ${aspect} ${className}`}>
      {!media && (
        <div className="hatch absolute inset-0 flex items-end justify-between p-3 md:p-4">
          <span className="label text-ink-muted">{placeholder}</span>
          <span aria-hidden className="label text-ink-muted">
            +
          </span>
        </div>
      )}
      {media?.type === "image" && (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      )}
      {media?.type === "video" && <AutoVideo media={media} />}
    </div>
  );
}
