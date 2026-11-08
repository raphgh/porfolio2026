import { formatDates } from "@/data/experience";
import type { Experience, Media, Role } from "@/data/types";
import { ScrollFade } from "./ScrollFade";

export function entryDates(entry: Experience) {
  const latest = entry.roles[0];
  const earliest = entry.roles[entry.roles.length - 1];
  return formatDates(earliest.start, latest.end);
}

function yearLabel(entry: Experience) {
  const start = entry.roles[entry.roles.length - 1]?.start ?? "";
  const end = entry.roles[0]?.end ?? entry.roles[0]?.start ?? "";
  const startYear = start.match(/\d{4}/)?.[0];
  const endYear = end.match(/\d{4}/)?.[0];
  if (startYear && endYear && startYear !== endYear) return `${startYear}–${endYear}`;
  return endYear ?? startYear ?? entryDates(entry);
}

function companyInitials(name: string) {
  const parts = name.replace(/[()]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts
    .slice(0, 3)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function CompanyLogo({ entry }: { entry: Experience }) {
  if (entry.logo && entry.logo !== "/logos/") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local logo assets from /public/logos
      <img
        src={entry.logo}
        alt=""
        className="h-14 w-auto max-w-[10rem] object-contain md:h-16 md:max-w-[12rem]"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-14 place-items-center rounded-2xl bg-[#f5f5f7] text-sm font-semibold tracking-[0.06em] text-charcoal"
    >
      {companyInitials(entry.company)}
    </span>
  );
}

/** Full experience content — used inside the gallery detail dialog. */
export function ExperienceDetail({
  entry,
  titleId,
}: {
  entry: Experience;
  titleId?: string;
  /** Kept for callers; layout is left-aligned Apple-style. */
  centered?: boolean;
}) {
  const role = entry.roles[0];
  const preview = entry.thumbnail && entry.thumbnail !== "/logos/" ? entry.thumbnail : null;
  const techs = Array.from(new Set(entry.roles.flatMap((r) => r.technologies).filter((t) => t.trim())));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="flex flex-col items-center gap-5 pb-10 text-center md:pb-12">
        <CompanyLogo entry={entry} />
        <div className="flex flex-col gap-2">
          <h2
            id={titleId}
            className="text-[1.65rem] font-semibold tracking-[-0.02em] text-charcoal md:text-[1.85rem]"
          >
            {entry.companyUrl ? (
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                {entry.company}
              </a>
            ) : (
              entry.company
            )}
          </h2>
          {entry.descriptor && (
            <p className="text-[0.95rem] text-charcoal-muted">{entry.descriptor}</p>
          )}
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        <MetaCell label="Year" value={yearLabel(entry)} />
        <MetaCell label="Role" value={role?.title ?? "—"} />
        <MetaCell label="Type" value={role?.employmentType ?? "—"} />
        <MetaCell label="Location" value={role?.location ?? "—"} />
      </dl>

      <div className="mt-10 border-t border-black/[0.08] pt-10 md:mt-12 md:pt-12">
        {preview && (
          <ScrollFade className="mb-10 md:mb-12">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#f5f5f7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </ScrollFade>
        )}

        <ol className="flex flex-col gap-14">
          {entry.roles.map((r, i) => (
            <li key={i}>
              <RoleDetail role={r} showMeta={entry.roles.length > 1} />
            </li>
          ))}
        </ol>

        {techs.length > 0 && (
          <ScrollFade className="mt-12 border-t border-black/[0.08] pt-8">
            <p className="mb-3 text-[0.7rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase">
              Technologies
            </p>
            <p className="text-[0.95rem] leading-relaxed text-charcoal-soft">{techs.join(" · ")}</p>
          </ScrollFade>
        )}
      </div>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.7rem] font-medium tracking-[0.04em] text-charcoal-muted">{label}</dt>
      <dd className="mt-1.5 text-[0.95rem] leading-snug text-charcoal [overflow-wrap:anywhere]">
        {value}
      </dd>
    </div>
  );
}

/** Legacy full-page card layout (kept for any remaining callers). */
export function ExperienceCard({ entry }: { entry: Experience; index?: number }) {
  return (
    <article
      id={entry.id}
      aria-labelledby={`${entry.id}-company`}
      className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white"
    >
      <div className="p-6 md:p-10" data-experience-scroll>
        <ExperienceDetail entry={entry} titleId={`${entry.id}-company`} />
      </div>
    </article>
  );
}

function RoleDetail({ role, showMeta }: { role: Role; showMeta: boolean }) {
  const responsibilities = role.responsibilities.filter((item) => item.trim().length > 0);
  const accomplishments = role.accomplishments.filter((item) => item.trim().length > 0);
  const body = [...responsibilities, ...accomplishments];

  return (
    <div className="flex flex-col gap-8">
      {showMeta && (
        <ScrollFade>
          <div>
            <h3 className="text-[1.15rem] font-semibold tracking-[-0.015em] text-charcoal">
              {role.title}
            </h3>
            <p className="mt-1 text-sm text-charcoal-muted">
              {formatDates(role.start, role.end)} · {role.location} · {role.employmentType}
            </p>
          </div>
        </ScrollFade>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <ScrollFade className="md:col-span-4">
          <p className="mb-3 text-[0.7rem] font-medium tracking-[0.08em] text-charcoal-muted uppercase">
            The mission
          </p>
          {role.overview.trim() ? (
            <p className="text-[1.05rem] leading-snug font-medium tracking-[-0.01em] text-charcoal">
              {role.overview}
            </p>
          ) : (
            <p className="text-charcoal-muted">—</p>
          )}
        </ScrollFade>

        <div className="flex flex-col gap-5 md:col-span-8">
          {body.length > 0 ? (
            body.map((paragraph, i) => (
              <ScrollFade key={i} delay={i * 60}>
                <p className="text-[0.98rem] leading-[1.65] text-charcoal-soft">{paragraph}</p>
              </ScrollFade>
            ))
          ) : (
            <ScrollFade>
              <p className="text-charcoal-muted">Details coming soon.</p>
            </ScrollFade>
          )}

          {role.note && (
            <ScrollFade delay={body.length * 60}>
              <p className="border-l-2 border-black/[0.08] pl-4 text-[0.95rem] leading-relaxed text-charcoal-soft">
                {role.note}
              </p>
            </ScrollFade>
          )}
        </div>
      </div>

      {role.artifacts && role.artifacts.length > 0 && (
        <ScrollFade delay={80}>
          <PhotoStrip items={role.artifacts} />
        </ScrollFade>
      )}
    </div>
  );
}

/** Apple-style vertical squircles in a horizontal row. */
function PhotoStrip({ items, caption = "Photos" }: { items: Media[]; caption?: string }) {
  return (
    <figure className="flex flex-col items-center gap-4 pt-2">
      <ul className="flex w-full gap-2.5 md:gap-3">
        {items.map((media, i) => {
          const hasImage = media.type === "image" && Boolean(media.src);
          return (
            <li
              key={i}
              className="relative aspect-[3/4] min-w-0 flex-1 overflow-hidden rounded-[1.75rem] bg-[#f2f2f7] md:rounded-[2rem]"
            >
              {hasImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.src}
                  alt={media.alt}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <div className="hatch absolute inset-0 flex items-end p-3">
                  <span className="text-[0.65rem] font-medium tracking-[0.06em] text-navy/45 uppercase">
                    Photo {i + 1}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {caption && (
        <figcaption className="text-[0.8rem] tracking-[-0.01em] text-charcoal-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
