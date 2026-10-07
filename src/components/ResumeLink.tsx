import { site } from "@/data/site";

export function ResumeLink({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  const tone = inverted
    ? "bg-paper text-ink hover:bg-accent hover:text-paper"
    : "bg-ink text-paper hover:bg-accent";
  return (
    <a
      href={site.resume}
      target="_blank"
      rel="noopener"
      aria-label="Resume (PDF, opens in a new tab)"
      className={`label group inline-flex items-center gap-2 transition-colors duration-200 ${tone} ${
        compact ? "h-9 px-3" : "h-10 px-4"
      }`}
    >
      Resume
      <svg
        aria-hidden
        viewBox="0 0 10 10"
        className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </a>
  );
}
