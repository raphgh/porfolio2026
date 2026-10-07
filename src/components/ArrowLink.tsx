import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function ArrowLink({ href, children, external, className = "" }: Props) {
  const classes = `label group inline-flex items-center gap-2 border-b border-current pb-1 transition-colors hover:text-accent-ink ${className}`;
  const arrow = (
    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
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
