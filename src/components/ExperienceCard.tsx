import { formatDates } from "@/data/experience";
import type { Experience, Role } from "@/data/types";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

export function entryDates(entry: Experience) {
  const latest = entry.roles[0];
  const earliest = entry.roles[entry.roles.length - 1];
  return formatDates(earliest.start, latest.end);
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
  if (entry.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local logo assets from /public/logos
      <img
        src={entry.logo}
        alt={`${entry.company} logo`}
        className="h-16 w-auto max-w-[11rem] object-contain md:h-20 md:max-w-[13rem]"
      />
    );
  }

  return (
    <span aria-hidden className="font-mono text-[0.7rem] tracking-[0.08em] text-navy">
      {companyInitials(entry.company)}
    </span>
  );
}

/** Full experience content — used inside the gallery detail dialog. */
export function ExperienceDetail({
  entry,
  titleId,
  centered = false,
}: {
  entry: Experience;
  titleId?: string;
  centered?: boolean;
}) {
  const grouped = entry.roles.length > 1;
  const role = entry.roles[0];

  return (
    <div className={`mx-auto flex w-full max-w-2xl flex-col gap-8 ${centered ? "items-center text-center" : ""}`}>
      <header className={`flex flex-col gap-4 ${centered ? "items-center" : "items-start"}`}>
        <CompanyLogo entry={entry} />
        <div>
          <h2 id={titleId} className="display text-title text-navy">
            {entry.companyUrl ? (
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mustard-deep"
              >
                {entry.company}
              </a>
            ) : (
              entry.company
            )}
          </h2>
          {entry.descriptor && <p className="mt-2 text-charcoal-soft">{entry.descriptor}</p>}
        </div>
      </header>

      <dl
        className={`grid w-full grid-cols-2 gap-x-6 gap-y-4 border-y border-silver-soft py-5 sm:grid-cols-4 ${
          centered ? "text-center" : ""
        }`}
      >
        <div>
          <dt className="label text-charcoal-muted">Year</dt>
          <dd className="mt-1 text-navy">{entryDates(entry)}</dd>
        </div>
        <div>
          <dt className="label text-charcoal-muted">Role</dt>
          <dd className="mt-1 text-navy">{role?.title}</dd>
        </div>
        <div>
          <dt className="label text-charcoal-muted">Type</dt>
          <dd className="mt-1 text-navy">{role?.employmentType}</dd>
        </div>
        <div>
          <dt className="label text-charcoal-muted">Location</dt>
          <dd className="mt-1 text-navy">{role?.location}</dd>
        </div>
      </dl>

      <ol className={`w-full ${grouped ? "flex flex-col gap-12" : "flex flex-col"}`}>
        {entry.roles.map((r, i) => (
          <li key={i}>
            <RoleDetail role={r} showMeta={grouped} centered={centered} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Legacy full-page card layout (kept for any remaining callers). */
export function ExperienceCard({ entry, index = 0 }: { entry: Experience; index?: number }) {
  const locations = Array.from(new Set(entry.roles.map((r) => r.location)));
  const types = Array.from(new Set(entry.roles.map((r) => r.employmentType)));

  return (
    <article
      id={entry.id}
      aria-labelledby={`${entry.id}-company`}
      className="relative overflow-hidden rounded-[1.5rem] border border-navy/35 bg-white"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/20 bg-navy px-4 py-3 text-white md:px-8">
        <p className="label">{entryDates(entry)}</p>
        <p className="label opacity-80">{locations.join(" / ")}</p>
        <span className="label rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5">
          {types.join(" · ")}
        </span>
      </div>

      <div className="p-5 pt-6 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden className="label text-mustard-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <ExperienceDetail entry={entry} titleId={`${entry.id}-company`} />
      </div>
    </article>
  );
}

function RoleDetail({
  role,
  showMeta,
  centered = false,
}: {
  role: Role;
  showMeta: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-6 ${centered ? "items-center" : ""}`}>
      <div className={`flex flex-col gap-1 ${centered ? "items-center" : ""}`}>
        <h3 className="display text-heading text-navy">
          {role.title} <span className="text-charcoal-soft">— {role.employmentType}</span>
        </h3>
        {showMeta && (
          <p className="label text-charcoal-soft">
            {formatDates(role.start, role.end)} · {role.location}
          </p>
        )}
      </div>

      <p className={`max-w-[40rem] text-lede text-pretty ${centered ? "mx-auto" : ""}`}>{role.overview}</p>

      {role.note && (
        <aside
          className={`max-w-[40rem] rounded-2xl border border-dashed border-mustard/50 bg-mustard-soft/40 px-4 py-3 text-sm text-charcoal-soft ${
            centered ? "mx-auto text-center" : ""
          }`}
        >
          <p className="label mb-1 text-mustard-deep">Also</p>
          <p>{role.note}</p>
        </aside>
      )}

      {role.technologies.length > 0 && (
        <div className={`flex flex-col gap-2 ${centered ? "items-center" : ""}`}>
          <h4 className="label text-charcoal-muted">Technologies</h4>
          <TagList items={role.technologies} className={`text-navy ${centered ? "justify-center" : ""}`} />
        </div>
      )}

      <div className={`grid w-full gap-6 sm:grid-cols-2 ${centered ? "text-left" : ""}`}>
        <DetailList title="What I worked on" items={role.responsibilities} />
        <DetailList title="Selected impact" items={role.accomplishments} accent />
      </div>

      {role.artifacts && role.artifacts.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {role.artifacts.map((media, i) => (
            <li key={i}>
              <MediaFrame media={media} aspect="aspect-[4/3]" sizes="(min-width: 768px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DetailList({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  const filled = items.filter((item) => item.trim().length > 0);
  if (!filled.length) return null;
  return (
    <div
      className={`flex flex-col gap-1 rounded-2xl border p-4 ${
        accent ? "border-mustard/40 bg-mustard-soft/50" : "border-navy/20 bg-navy-tint"
      }`}
    >
      <h4 className="label mb-2 text-charcoal-muted">{title}</h4>
      <ul className="flex flex-col gap-2">
        {filled.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className={accent ? "text-mustard-deep" : "text-navy"}>
              {accent ? "★" : "›"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
