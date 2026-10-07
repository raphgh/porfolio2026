import type { Extracurricular } from "@/data/types";
import { ArrowLink } from "./ArrowLink";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

type Props = { item: Extracurricular; index: number; variant?: "compact" | "full" };

export function ExtracurricularCard({ item, index, variant = "compact" }: Props) {
  const number = String(index + 1).padStart(2, "0");

  if (variant === "compact") {
    return (
      <article className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between border-b border-rule pb-3">
          <span className="font-serif text-[2.75rem] leading-none italic">{number}</span>
          {item.date && <span className="label text-ink-soft">{item.date}</span>}
        </div>
        <MediaFrame media={item.media} aspect="aspect-[5/4]" placeholder={item.title} sizes="(min-width: 768px) 30vw, 100vw" />
        <TagList items={item.categories} emphasizeFirst className="text-ink-soft" />
        <h3 className="text-heading font-medium">{item.title}</h3>
        <p className="text-ink-soft">{item.summary}</p>
      </article>
    );
  }

  const flip = index % 2 === 1;
  return (
    <article id={item.id} aria-labelledby={`${item.id}-title`} className="grid grid-cols-12 gap-x-8 gap-y-8 border-t border-ink pt-6">
      <div className={`col-span-12 flex flex-col gap-6 md:col-span-6 ${flip ? "md:order-2" : ""}`}>
        <div className="flex items-baseline gap-5">
          <span className="font-serif text-[3.5rem] leading-none italic md:text-[5rem]">{number}</span>
          <TagList items={item.categories} emphasizeFirst className="text-ink-soft" />
        </div>
        <h2 id={`${item.id}-title`} className="text-title font-medium">
          {item.title}
        </h2>
        {(item.role || item.date) && (
          <p className="label text-ink-soft">{[item.role, item.date].filter(Boolean).join(" · ")}</p>
        )}
        <p className="max-w-[36rem] text-lede text-pretty">{item.summary}</p>
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}
        {item.link && (
          <ArrowLink href={item.link.href} external className="self-start">
            {item.link.label}
          </ArrowLink>
        )}
      </div>
      <div className={`col-span-12 md:col-span-6 ${flip ? "md:order-1" : ""}`}>
        <MediaFrame media={item.media} aspect="aspect-[4/3]" placeholder={`${item.title} — photo`} />
      </div>
    </article>
  );
}
