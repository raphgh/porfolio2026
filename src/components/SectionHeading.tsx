import { ArrowLink } from "./ArrowLink";

type Props = {
  index?: string;
  kicker?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({ index, kicker, title, description, action, as: H = "h2", tone = "light", id }: Props) {
  const dark = tone === "dark";
  return (
    <header className="grid grid-cols-12 gap-x-4 gap-y-4 md:gap-x-8">
      <div className="col-span-12 flex items-center gap-3 md:col-span-3 md:flex-col md:items-start md:gap-2 md:pt-2">
        {index && (
          <span
            className={`label inline-flex rounded-full border px-2.5 py-1 ${
              dark ? "border-white/30 text-mustard-soft" : "border-navy/30 bg-navy-tint text-navy"
            }`}
          >
            {index}
          </span>
        )}
        {kicker && <p className={`label ${dark ? "text-white/60" : "text-charcoal-muted"}`}>{kicker}</p>}
      </div>
      <div className="col-span-12 flex min-w-0 flex-col gap-5 md:col-span-9">
        <H id={id} className={`display text-title lowercase ${dark ? "text-white" : "text-navy"}`}>
          {title.toLowerCase()}
        </H>
        {(description || action) && (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            {description && (
              <p className={`max-w-md text-lg leading-snug ${dark ? "text-white/75" : "text-charcoal-soft"}`}>
                {description}
              </p>
            )}
            {action && (
              <ArrowLink href={action.href} className="shrink-0">
                {action.label}
              </ArrowLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
