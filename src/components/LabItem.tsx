import type { LabExperiment, LabStatus } from "@/data/types";

const columns = "md:grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)]";

export const statusStyle: Record<LabStatus, string> = {
  SHIPPED: "bg-mustard-soft text-charcoal border-mustard/50",
  ONGOING: "bg-navy text-white border-navy",
  PAUSED: "bg-white text-charcoal border-silver",
  ABANDONED: "bg-charcoal text-white border-charcoal",
};

export function LabSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white">{children}</div>
  );
}

export function LabHeader() {
  return (
    <div
      aria-hidden
      className={`label hidden gap-x-6 border-b border-navy/20 bg-navy px-5 py-3 text-white md:grid ${columns}`}
    >
      <span>Experiment</span>
      <span>Date</span>
      <span>Technology</span>
      <span>Result</span>
    </div>
  );
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
      className="underline decoration-mustard decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:decoration-navy"
    >
      {item.title}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    item.title
  );

  return (
    <article
      className={`group relative grid items-start gap-x-6 gap-y-2 border-b border-dashed border-silver px-4 py-5 transition-colors last:border-b-0 hover:bg-navy-tint/50 md:px-5 md:py-6 ${columns}`}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="flex flex-wrap items-center gap-2.5 text-[1.15rem] leading-tight font-medium">
          {item.media?.type === "image" && (
            <span className="relative z-10 inline-block size-7 shrink-0 overflow-hidden rounded-md border border-navy/25 bg-navy-tint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.media.src} alt={item.media.alt} className="size-full object-cover" />
            </span>
          )}
          {item.status && (
            <span className={`label relative z-10 rounded-full border px-2 py-0.5 ${statusStyle[item.status]}`}>
              <span className="sr-only">Status: </span>
              {item.status}
            </span>
          )}
          {title}
        </h3>
        {showDescription && item.description && (
          <p className="relative z-10 text-sm text-charcoal-soft md:pl-1">{item.description}</p>
        )}
      </div>
      <Cell label="Date">{item.date}</Cell>
      <Cell label="Technology">{item.technology.join(", ")}</Cell>
      <Cell label="Result">{item.result}</Cell>
    </article>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="label relative z-10 flex gap-3 text-charcoal-soft md:block md:pt-1.5">
      <span className="w-24 shrink-0 text-charcoal-muted md:sr-only">{label}</span>
      <span className="normal-case tracking-normal text-charcoal md:text-charcoal-soft">{children}</span>
    </p>
  );
}
