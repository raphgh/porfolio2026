import { site } from "@/data/site";

type Props = { compact?: boolean; inverted?: boolean; plain?: boolean };

export function ResumeLink({ compact = false, inverted = false, plain = false }: Props) {
  if (plain) {
    return (
      <a
        href={site.resume}
        target="_blank"
        rel="noopener"
        aria-label="Resume (PDF, opens in a new tab)"
        className="group inline-flex items-center gap-1.5 rounded-full border border-transparent px-2 py-1 text-[0.95rem] text-navy transition-colors hover:border-navy/30 hover:bg-navy-tint"
      >
        resume
        <svg
          aria-hidden
          viewBox="0 0 10 10"
          className="size-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </a>
    );
  }

  const tone = inverted
    ? "bg-white text-navy border-navy"
    : "bg-navy text-white border-navy";

  return (
    <a
      href={site.resume}
      target="_blank"
      rel="noopener"
      aria-label="Resume (PDF, opens in a new tab)"
      className={`label group inline-flex items-center gap-2 rounded-full border px-4 transition-colors hover:bg-mustard hover:text-charcoal hover:border-mustard ${tone} ${
        compact ? "h-9" : "h-10"
      }`}
    >
      Resume
      <svg aria-hidden viewBox="0 0 10 10" className="size-2.5">
        <path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </a>
  );
}
