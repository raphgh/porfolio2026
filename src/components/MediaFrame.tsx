import type { Media } from "@/data/types";
import { AutoVideo } from "./AutoVideo";

type Props = {
  media?: Media;
  aspect?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** How the image fills the frame. Mockups usually want `contain`. */
  fit?: "cover" | "contain";
};

/**
 * Uses CSS background-image for stills - Safari can blank <img> under
 * overflow/transform compositing layers that are common on this site.
 */
export function MediaFrame({
  media,
  aspect = "aspect-[16/10]",
  placeholder = "Media",
  sizes: _sizes,
  priority: _priority,
  className = "",
  fit = "cover",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-navy/40 bg-paper-deep ${aspect} ${className}`}
      style={
        media?.type === "image"
          ? {
              backgroundImage: `url(${media.src})`,
              backgroundSize: fit === "contain" ? "contain" : "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
      role={media?.type === "image" ? "img" : undefined}
      aria-label={media?.type === "image" ? media.alt : undefined}
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
      {media?.type === "video" && <AutoVideo media={media} />}
    </div>
  );
}
