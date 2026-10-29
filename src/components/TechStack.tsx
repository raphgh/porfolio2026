import { technologies } from "@/data/site";

/**
 * Visual technology collection using authentic Simple Icons CDN SVGs.
 * Only technologies confirmed by the site itself are listed in `site.technologies`.
 */
const iconSlug: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  Motion: "framer",
  Vercel: "vercel",
};

const brandColor: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  Motion: "#FF0055",
  Vercel: "#000000",
};

export function TechStack() {
  const groups = Array.from(new Set(technologies.map((t) => t.group)));

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="label mb-4 text-charcoal-muted">{group}</h3>
          <ul className="flex flex-wrap gap-3">
            {technologies
              .filter((t) => t.group === group)
              .map((tech) => {
                const slug = iconSlug[tech.name];
                const color = brandColor[tech.name] ?? "#1e3a6e";
                return (
                  <li key={tech.name}>
                    <span className="inline-flex items-center gap-2.5 rounded-2xl border border-silver bg-white px-3.5 py-2.5">
                      {slug ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
                          alt=""
                          width={22}
                          height={22}
                          className="size-[22px]"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-[22px] place-items-center rounded-md bg-navy-tint font-mono text-[0.65rem] text-navy"
                        >
                          {tech.name.slice(0, 2)}
                        </span>
                      )}
                      <span className="text-sm text-charcoal">{tech.name}</span>
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
