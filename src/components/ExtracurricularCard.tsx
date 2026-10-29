import type { Extracurricular } from "@/data/types";
import { ArrowLink } from "./ArrowLink";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

type Props = { item: Extracurricular; index: number; variant?: "compact" | "full" };

export function ExtracurricularCard({ item, index, variant = "compact" }: Props) {
  const number = String(index + 1).padStart(2, "0");

  if (variant === "compact") {
    return (
      <article className="group flex h-full flex-col gap-4 rounded-[1.25rem] border border-navy/30 bg-white p-4 transition-colors hover:border-navy hover:bg-navy-tint/40 md:p-5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-sm text-mustard-deep">{number}</span>
          {item.date && <span className="label text-charcoal-muted">{item.date}</span>}
        </div>
        <MediaFrame media={item.media} aspect="aspect-[5/4]" placeholder={item.title} sizes="(min-width: 768px) 30vw, 100vw" />
        <TagList items={item.categories} emphasizeFirst className="text-charcoal-soft" />
        <h3 className="display text-heading text-navy [overflow-wrap:anywhere]">{item.title}</h3>
        <p className="text-charcoal-soft">{item.summary}</p>
      </article>
    );
  }

  const flip = index % 2 === 1;
  return (
    <article
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className="relative grid grid-cols-12 gap-x-4 gap-y-8 rounded-[1.5rem] border border-navy/35 bg-white p-5 md:gap-x-8 md:p-10"
    >
      <div className={`col-span-12 flex flex-col gap-6 md:col-span-6 ${flip ? "md:order-2" : ""}`}>
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-3xl text-mustard-deep md:text-5xl">{number}</span>
          <TagList items={item.categories} emphasizeFirst className="text-charcoal-soft" />
        </div>
        <h2 id={`${item.id}-title`} className="display text-title text-navy">
          {item.title}
        </h2>
        {(item.role || item.date) && (
          <p className="label text-charcoal-muted">{[item.role, item.date].filter(Boolean).join(" · ")}</p>
        )}
        <p className="max-w-[36rem] text-lede text-pretty">{item.summary}</p>
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="text-mustard-deep">
                  ★
                </span>
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
