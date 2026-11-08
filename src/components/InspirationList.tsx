import type { Inspiration } from "@/data/types";

/** Simple bullet list — link later via `href` when ready. */
export function InspirationList({ items }: { items: Inspiration[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const live = Boolean(item.href && item.href !== "#");
        const label = item.note ? (
          <>
            <span className="font-medium text-navy">{item.name}</span>
            <span className="text-charcoal-muted"> — </span>
            <span className="text-charcoal-soft">{item.note}</span>
          </>
        ) : (
          <span className="font-medium text-navy">{item.name}</span>
        );

        return (
          <li key={`${item.name}-${i}`} className="flex gap-3 text-[0.98rem] leading-snug">
            <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-navy/35" />
            {live && item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mustard-deep"
              >
                {label}
              </a>
            ) : (
              <span>{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
