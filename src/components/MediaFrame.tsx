import Image from "next/image";
import type { Media } from "@/data/types";
import { AutoVideo } from "./AutoVideo";

type Props = {
  media?: Media;
  aspect?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function MediaFrame({
  media,
  aspect = "aspect-[16/10]",
  placeholder = "Media",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-navy/40 bg-paper-deep ${aspect} ${className}`}
    >
      {!media && (
        <div className="hatch absolute inset-0 flex items-end justify-between p-3 md:p-4">
          {placeholder ? (
            <span className="label rounded-full border border-navy/30 bg-white px-2.5 py-1 text-navy">
              {placeholder}
            </span>
          ) : (
            <span />
          )}
          <span aria-hidden className="font-mono text-sm text-mustard-deep">
            ✦
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
