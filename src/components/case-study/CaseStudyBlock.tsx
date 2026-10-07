import type { Annotation, CaseStudyBlock as Block } from "@/data/types";
import { MediaFrame } from "../MediaFrame";

const artifactAspect = { wide: "aspect-[16/9]", square: "aspect-square", tall: "aspect-[3/4]" } as const;

export function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="max-w-[38rem] text-lede text-pretty">{block.body}</p>;

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="max-w-[38rem] divide-y divide-rule border-y border-rule">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 py-3">
              <span className="label pt-1.5 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </List>
      );
    }

    case "media":
      return (
        <figure className="flex flex-col gap-3">
          <MediaFrame media={block.media} aspect="aspect-[16/9]" sizes="(min-width: 1024px) 66vw, 100vw" />
          {block.media.caption && <figcaption className="label text-ink-soft">{block.media.caption}</figcaption>}
        </figure>
      );

    case "artifact":
      return (
        <figure className="flex flex-col gap-3">
          <MediaFrame aspect={artifactAspect[block.aspect ?? "wide"]} placeholder={block.label} />
          {block.note && <figcaption className="label text-ink-soft">{block.note}</figcaption>}
        </figure>
      );

    case "code":
      return (
        <figure className="flex flex-col gap-3">
          <div className="overflow-hidden bg-night text-paper">
            <div className="label flex items-center justify-between border-b border-paper/15 px-4 py-2.5 text-night-soft">
              <span>{block.filename ?? "snippet"}</span>
              {block.language && <span>{block.language}</span>}
            </div>
            <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed md:p-5">
              <code className="font-mono">{block.code}</code>
            </pre>
          </div>
          {block.caption && <figcaption className="label text-ink-soft">{block.caption}</figcaption>}
        </figure>
      );

    case "flow":
      return (
        <figure className="flex flex-col gap-3">
          <ol className="dot-grid flex flex-col items-stretch gap-0 border border-rule p-5 md:flex-row md:items-center md:p-8">
            {block.nodes.map((node, i) => (
              <li key={i} className="flex flex-col items-center md:flex-1 md:flex-row">
                <span className="label w-full border border-ink bg-paper px-3 py-3 text-center">{node}</span>
                {i < block.nodes.length - 1 && (
                  <span aria-hidden className="label px-3 py-2 text-accent">
                    <span className="md:hidden">↓</span>
                    <span className="max-md:hidden">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
          {block.caption && <figcaption className="label text-ink-soft">{block.caption}</figcaption>}
        </figure>
      );

    case "compare":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { label: block.beforeLabel ?? "Before", content: block.before },
            { label: block.afterLabel ?? "After", content: block.after },
          ].map(({ label, content }) => (
            <div key={label} className="flex flex-col gap-3">
              <span className="label text-ink-soft">{label}</span>
              <CaseStudyBlock block={content} />
            </div>
          ))}
        </div>
      );

    case "note":
      return <Note label={block.label} body={block.body} />;
  }
}

const noteMark: Record<Annotation, string> = {
  "WHY THIS?": "?",
  REJECTED: "×",
  CHANGED: "↻",
  TRADEOFF: "⇄",
  LEARNED: "✳",
};

export function Note({ label, body }: { label: Annotation; body: string }) {
  return (
    <aside className="border-l-2 border-accent pl-4">
      <p className="label flex items-center gap-2 text-accent-ink">
        <span aria-hidden className="inline-grid size-4 place-items-center bg-accent text-[0.6rem] text-paper">
          {noteMark[label]}
        </span>
        {label}
      </p>
      <p className="mt-2 font-serif text-[1.2rem] leading-snug italic">{body}</p>
    </aside>
  );
}
