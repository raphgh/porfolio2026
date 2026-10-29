import { formatDates } from "@/data/experience";
import type { Experience, Role } from "@/data/types";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

export function entryDates(entry: Experience) {
  const latest = entry.roles[0];
  const earliest = entry.roles[entry.roles.length - 1];
  return formatDates(earliest.start, latest.end);
}

export function ExperienceCard({ entry, index = 0 }: { entry: Experience; index?: number }) {
  const grouped = entry.roles.length > 1;
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

      <div className="grid grid-cols-12 gap-x-4 gap-y-8 p-5 pt-6 md:gap-x-8 md:p-8">
        <div className="col-span-12 md:col-span-3">
          <span aria-hidden className="label text-mustard-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-9">
          <header>
            <h2 id={`${entry.id}-company`} className="display text-title text-navy">
              {entry.companyUrl ? (
                <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-mustard-deep">
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
            </h2>
            {entry.descriptor && <p className="mt-2 text-charcoal-soft">{entry.descriptor}</p>}
            {grouped && <p className="label mt-2 text-charcoal-muted">{entry.roles.length} roles</p>}
          </header>

          <ol
            className={
              grouped
                ? "flex flex-col gap-12 border-l border-dashed border-silver pl-6 md:pl-8"
                : "flex flex-col"
            }
          >
            {entry.roles.map((role, i) => (
              <li key={i} className="relative">
                {grouped && (
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full border border-navy bg-mustard md:-left-[calc(2rem+5px)]"
                  />
                )}
                <RoleDetail role={role} showMeta={grouped} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function RoleDetail({ role, showMeta }: { role: Role; showMeta: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="display text-heading text-navy">
          {role.title} <span className="text-charcoal-soft">— {role.employmentType}</span>
        </h3>
        {showMeta && (
          <p className="label text-charcoal-soft">
            {formatDates(role.start, role.end)} · {role.location}
          </p>
        )}
      </div>

      <p className="max-w-[40rem] text-lede text-pretty">{role.overview}</p>

      {role.technologies.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="label text-charcoal-muted">Technologies</h4>
          <TagList items={role.technologies} className="text-navy" />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
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
  if (!items.length) return null;
  return (
    <div
      className={`flex flex-col gap-1 rounded-2xl border p-4 ${
        accent ? "border-mustard/40 bg-mustard-soft/50" : "border-navy/20 bg-navy-tint"
      }`}
    >
      <h4 className="label mb-2 text-charcoal-muted">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
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
