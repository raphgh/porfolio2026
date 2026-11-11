import type { LabExperiment, LabStatus } from "@/data/types";

export const statusStyle: Record<LabStatus, string> = {
  SHIPPED: "bg-mustard-soft text-charcoal border-mustard/50",
  ONGOING: "bg-navy text-white border-navy",
  PAUSED: "bg-white text-charcoal border-silver",
  ABANDONED: "bg-charcoal text-white border-charcoal",
};

export function LabSheet({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-10 md:gap-12">{children}</div>;
}

/** Kept for callers; header columns removed with the table layout. */
export function LabHeader() {
  return null;
}

function isLiveHref(href?: string) {
  return Boolean(href && href !== "#");
}

export function LabItem({ item, showDescription = false }: { item: LabExperiment; showDescription?: boolean }) {
  const live = isLiveHref(item.link?.href);

  const title = live && item.link ? (
    <a
      href={item.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-mustard decoration-2 underline-offset-4 hover:decoration-navy"
    >
      {item.title}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    item.title
  );

  return (
    <article id={item.id} className="flex flex-col gap-2.5 scroll-mt-24">
      <h3 className="flex flex-wrap items-center gap-2.5 text-[1.15rem] leading-tight font-medium text-charcoal">
        {item.media?.type === "image" && (
          <span
            className={`inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-navy/25 bg-navy-tint ${
              item.media.src.endsWith(".svg") ? "p-1" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.media.src}
              alt={item.media.alt}
              className={`size-full ${item.media.src.endsWith(".svg") ? "object-contain" : "object-cover"}`}
            />
          </span>
        )}
        {item.status && (
          <span className={`label rounded-full border px-2 py-0.5 ${statusStyle[item.status]}`}>
            <span className="sr-only">Status: </span>
            {item.status}
          </span>
        )}
        {title}
      </h3>

      {showDescription && item.description && (
        <p className="max-w-2xl text-sm text-charcoal-soft">{item.description}</p>
      )}

      <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[0.9rem] text-charcoal-soft">
        <div className="flex gap-1.5">
          <dt className="text-charcoal-muted">Date</dt>
          <dd className="text-charcoal">{item.date}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-charcoal-muted">Technology</dt>
          <dd className="text-charcoal">{item.technology.join(", ")}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-charcoal-muted">Result</dt>
          <dd className="text-charcoal">{item.result}</dd>
        </div>
      </dl>
    </article>
  );
}
