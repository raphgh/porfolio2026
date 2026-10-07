type Props = {
  items: readonly string[];
  className?: string;
  /** Visually emphasise the first tag (the project's primary type). */
  emphasizeFirst?: boolean;
};

/** Inline, dot-separated metadata list. Deliberately not pill-shaped. */
export function TagList({ items, className = "", emphasizeFirst = false }: Props) {
  if (!items.length) return null;
  return (
    <ul className={`label flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="opacity-50">
              ·
            </span>
          )}
          <span className={emphasizeFirst && i === 0 ? "text-accent-ink" : undefined}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Tag({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`label inline-flex h-7 items-center border px-2.5 transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-rule-strong text-ink-soft"
      }`}
    >
      {children}
    </span>
  );
}
