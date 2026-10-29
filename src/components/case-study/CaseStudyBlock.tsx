import type { Annotation, CaseStudyBlock as Block } from "@/data/types";
import { MediaFrame } from "../MediaFrame";

const artifactAspect = { wide: "aspect-[16/9]", square: "aspect-square", tall: "aspect-[3/4]" } as const;

const noteTone: Record<Annotation, string> = {
  "WHY THIS?": "bg-mustard-soft border-mustard/40",
  REJECTED: "bg-white border-silver",
  CHANGED: "bg-navy-tint border-navy/25",
  LEARNED: "bg-navy-tint border-navy/25",
  TRADEOFF: "bg-mustard-soft/60 border-mustard/30",
};

const noteMark: Record<Annotation, string> = {
  "WHY THIS?": "?",
  REJECTED: "×",
  CHANGED: "↻",
  TRADEOFF: "⇄",
  LEARNED: "✳",
};

export function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="max-w-[38rem] text-lede text-pretty">{block.body}</p>;

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="max-w-[38rem] divide-y divide-silver-soft border-y border-silver-soft">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 py-3">
              <span className="font-mono text-sm text-mustard-deep">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }

    case "media":
      return (
        <figure className="flex max-w-[42rem] flex-col gap-3">
          <MediaFrame media={block.media} aspect="aspect-[16/9]" sizes="(min-width: 1024px) 66vw, 100vw" />
          {block.media.caption && <figcaption className="label text-charcoal-soft">{block.media.caption}</figcaption>}
        </figure>
      );

    case "artifact":
      return (
        <figure className="flex max-w-[42rem] flex-col gap-3">
          <MediaFrame aspect={artifactAspect[block.aspect ?? "wide"]} placeholder={block.label} />
          {block.note && <figcaption className="label text-charcoal-soft">{block.note}</figcaption>}
        </figure>
      );

    case "code":
      return (
        <figure className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-2xl border border-navy bg-charcoal text-white">
            <div className="flex items-center gap-2 border-b border-white/10 bg-navy px-4 py-2.5">
              <span aria-hidden className="size-2.5 rounded-full bg-mustard" />
              <span aria-hidden className="size-2.5 rounded-full bg-white/40" />
              <span aria-hidden className="size-2.5 rounded-full bg-white/20" />
              <span className="label ml-2 flex-1 text-white/80">{block.filename ?? "snippet"}</span>
              {block.language && <span className="font-mono text-xs text-mustard-soft">{block.language}</span>}
            </div>
            <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed md:p-5">
              <code className="font-mono">{block.code}</code>
            </pre>
          </div>
          {block.caption && <figcaption className="label text-charcoal-soft">{block.caption}</figcaption>}
        </figure>
      );

    case "flow":
      return (
        <figure className="flex flex-col gap-3">
          <ol className="flex flex-col items-stretch gap-0 rounded-2xl border border-navy/30 bg-white p-5 md:flex-row md:items-center md:p-8">
            {block.nodes.map((node, i) => (
              <li key={i} className="flex flex-col items-center md:flex-1 md:flex-row">
                <span
                  className={`label w-full rounded-xl border border-navy/30 px-3 py-3 text-center ${
                    i % 2 ? "bg-navy text-white" : "bg-mustard-soft text-charcoal"
                  }`}
                >
                  {node}
                </span>
                {i < block.nodes.length - 1 && (
                  <span aria-hidden className="label px-3 py-2 text-navy">
                    <span className="md:hidden">↓</span>
                    <span className="max-md:hidden">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
          {block.caption && <figcaption className="label text-charcoal-soft">{block.caption}</figcaption>}
        </figure>
      );

    case "compare":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-silver bg-white p-4">
            <span className="label text-charcoal-muted">{block.beforeLabel ?? "Before"}</span>
            <CaseStudyBlock block={block.before} />
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-navy/30 bg-navy-tint p-4">
            <span className="label text-charcoal-muted">{block.afterLabel ?? "After"}</span>
            <CaseStudyBlock block={block.after} />
          </div>
        </div>
      );

    case "note":
      return <Note label={block.label} body={block.body} />;
  }
}

export function Note({ label, body }: { label: Annotation; body: string }) {
  return (
    <aside className={`rounded-2xl border p-4 ${noteTone[label]}`}>
      <p className="label flex items-center gap-2 text-charcoal">
        <span
          aria-hidden
          className="inline-grid size-5 place-items-center rounded-full bg-navy font-mono text-[0.65rem] text-white"
        >
          {noteMark[label]}
        </span>
        {label}
      </p>
      <p className="mt-2 text-[1.05rem] leading-snug text-charcoal">{body}</p>
    </aside>
  );
}
