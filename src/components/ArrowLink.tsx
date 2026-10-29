import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function ArrowLink({ href, children, external, className = "" }: Props) {
  const classes = `label group inline-flex h-10 items-center gap-2.5 rounded-full border border-navy bg-white px-4 text-navy transition-colors hover:bg-navy hover:text-white ${className}`;
  const arrow = (
    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
      {external ? "↗" : "→"}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
