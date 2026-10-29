type Props = {
  items: readonly string[];
  className?: string;
  emphasizeFirst?: boolean;
};

export function TagList({ items, className = "", emphasizeFirst = false }: Props) {
  if (!items.length) return null;
  return (
    <ul className={`label flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item, i) => (
        <li
          key={item}
          className={`rounded-full border px-2.5 py-0.5 ${
            emphasizeFirst && i === 0
              ? "border-mustard bg-mustard-soft text-charcoal"
              : "border-current/40"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Tag({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`label inline-flex h-7 items-center rounded-full border px-2.5 ${
        active ? "border-navy bg-navy text-white" : "border-navy/40 bg-white text-navy"
      }`}
    >
      {children}
    </span>
  );
}
