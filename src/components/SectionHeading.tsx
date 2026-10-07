import { ArrowLink } from "./ArrowLink";

type Props = {
  index?: string;
  /** Small mono line beside the index. */
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
    <header
      className={`grid grid-cols-12 gap-x-6 gap-y-5 border-t pt-5 md:gap-x-8 ${
        dark ? "border-paper/70" : "border-ink"
      }`}
    >
      <p className={`label col-span-12 md:col-span-3 ${dark ? "text-night-soft" : "text-ink-soft"}`}>
        {index && <span className={dark ? "text-paper" : "text-ink"}>({index})</span>}
        {index && kicker && " — "}
        {kicker}
      </p>
      <div className="col-span-12 flex min-w-0 flex-col gap-5 md:col-span-9">
        <H id={id} className="text-title font-medium uppercase">
          {title}
        </H>
        {(description || action) && (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            {description && (
              <p className={`max-w-md leading-snug ${dark ? "text-night-soft" : "text-ink-soft"}`}>{description}</p>
            )}
            {action && <ArrowLink href={action.href} className="shrink-0">{action.label}</ArrowLink>}
          </div>
        )}
      </div>
    </header>
  );
}
