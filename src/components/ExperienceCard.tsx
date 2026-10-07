import { formatDates } from "@/data/experience";
import type { Experience, Role } from "@/data/types";
import { MediaFrame } from "./MediaFrame";
import { TagList } from "./Tag";

export function entryDates(entry: Experience) {
  const latest = entry.roles[0];
  const earliest = entry.roles[entry.roles.length - 1];
  return formatDates(earliest.start, latest.end);
}

/** Company → Role → What I worked on → Technologies → Impact. */
export function ExperienceCard({ entry }: { entry: Experience }) {
  const grouped = entry.roles.length > 1;
  const locations = Array.from(new Set(entry.roles.map((r) => r.location)));
  const types = Array.from(new Set(entry.roles.map((r) => r.employmentType)));

  return (
    <article id={entry.id} aria-labelledby={`${entry.id}-company`} className="grid grid-cols-12 gap-x-8 gap-y-6 border-t border-ink pt-6">
      <div className="col-span-12 flex flex-col gap-1 md:col-span-3">
        <p className="label text-ink">{entryDates(entry)}</p>
        <p className="label text-ink-soft">{locations.join(" / ")}</p>
        <p className="label text-ink-soft">{types.join(" · ")}</p>
      </div>

      <div className="col-span-12 flex flex-col gap-8 md:col-span-9">
        <header className="flex flex-col gap-1">
          <h2 id={`${entry.id}-company`} className="text-title font-medium">
            {entry.companyUrl ? (
              <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink">
                {entry.company}
              </a>
            ) : (
              entry.company
            )}
          </h2>
          {entry.descriptor && <p className="text-ink-soft">{entry.descriptor}</p>}
          {grouped && <p className="label mt-2 text-ink-muted">{entry.roles.length} roles</p>}
        </header>

        <ol className={grouped ? "flex flex-col gap-12 border-l border-rule-strong pl-6 md:pl-8" : "flex flex-col"}>
          {entry.roles.map((role, i) => (
            <li key={i} className="relative">
              {grouped && (
                <span aria-hidden className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 bg-accent md:-left-[calc(2rem+4.5px)]" />
              )}
              <RoleDetail role={role} showMeta={grouped} />
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function RoleDetail({ role, showMeta }: { role: Role; showMeta: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-heading font-medium">
          {role.title} <span className="text-ink-soft">— {role.employmentType}</span>
        </h3>
        {showMeta && (
          <p className="label text-ink-soft">
            {formatDates(role.start, role.end)} · {role.location}
          </p>
        )}
      </div>

      <p className="max-w-[40rem] text-lede text-pretty">{role.overview}</p>

      {role.technologies.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="label text-ink-muted">Technologies</h4>
          <TagList items={role.technologies} />
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
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
    <div className="flex flex-col gap-2">
      <h4 className="label text-ink-muted">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className={`mt-[0.6em] h-px w-3 shrink-0 ${accent ? "bg-accent" : "bg-ink"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
