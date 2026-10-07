import type { LabExperiment, LabStatus } from "@/data/types";

const columns = "md:grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)]";

const statusStyle: Record<LabStatus, string> = {
  SHIPPED: "bg-accent",
  ONGOING: "bg-ink",
  PAUSED: "border border-ink",
  ABANDONED: "border border-ink-muted",
};

export function LabHeader() {
  return (
    <div aria-hidden className={`label hidden gap-x-6 border-b border-ink pb-3 text-ink-muted md:grid ${columns}`}>
      <span>Experiment</span>
      <span>Date</span>
      <span>Technology</span>
      <span>Result</span>
    </div>
  );
}

export function LabItem({ item, showDescription = false }: { item: LabExperiment; showDescription?: boolean }) {
  const title = item.link ? (
    <a
      href={item.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline"
    >
      {item.title}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    item.title
  );

  return (
    <article className={`group relative grid gap-x-6 gap-y-2 border-b border-rule py-5 transition-colors hover:bg-paper-deep/60 md:py-6 ${columns}`}>
      <div className="flex flex-col gap-1.5">
        <h3 className="flex items-center gap-3 text-[1.2rem] leading-tight font-medium">
          {item.status && (
            <span className={`size-2 shrink-0 ${statusStyle[item.status]}`} title={item.status}>
              <span className="sr-only">Status: {item.status}</span>
            </span>
          )}
          {title}
        </h3>
        {showDescription && item.description && <p className="text-sm text-ink-soft md:pl-5">{item.description}</p>}
      </div>
      <Cell label="Date">{item.date}</Cell>
      <Cell label="Technology">{item.technology.join(", ")}</Cell>
      <Cell label="Result">{item.result}</Cell>
    </article>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="label flex gap-3 text-ink-soft md:block md:pt-1.5">
      <span className="w-24 shrink-0 text-ink-muted md:sr-only">{label}</span>
      <span className="text-ink md:text-ink-soft">{children}</span>
    </p>
  );
}
