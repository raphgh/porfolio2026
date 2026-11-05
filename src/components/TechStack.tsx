import { technologies } from "@/data/site";

/**
 * Visual technology collection using Simple Icons CDN SVGs.
 * Soft Apple-like chips; category emoji reserved for a couple of groups.
 */
const iconSlug: Record<string, string> = {
  Java: "openjdk",
  Python: "python",
  HTML: "html5",
  CSS: "css",
  "C#": "csharp",
  SQL: "mysql",
  "React.js": "react",
  "Spring Boot": "springboot",
  ".NET": "dotnet",
  Figma: "figma",
  Cursor: "cursor",
  IntelliJ: "intellijidea",
  VSCode: "visualstudiocode",
  "Android Studio": "androidstudio",
  Xcode: "xcode",
  "Microsoft SSMS": "microsoftsqlserver",
  Linux: "linux",
  Podman: "podman",
  Kubernetes: "kubernetes",
  Jenkins: "jenkins",
  Github: "github",
  GitLab: "gitlab",
  Jira: "jira",
  Confluence: "confluence",
};

const brandColor: Record<string, string> = {
  Java: "437291",
  Python: "3776AB",
  HTML: "E34F26",
  CSS: "1572B6",
  "C#": "512BD4",
  SQL: "4479A1",
  "React.js": "61DAFB",
  "Spring Boot": "6DB33F",
  ".NET": "512BD4",
  "REST APIs": "1E3A6E",
  Figma: "F24E1E",
  Cursor: "000000",
  IntelliJ: "000000",
  VSCode: "007ACC",
  "Android Studio": "3DDC84",
  Xcode: "147EFB",
  "Microsoft SSMS": "CC2927",
  Linux: "FCC624",
  Podman: "892CA0",
  Kubernetes: "326CE5",
  Jenkins: "D24939",
  Github: "181717",
  GitLab: "FC6D26",
  Jira: "0052CC",
  Confluence: "172B4D",
};

const groupEmoji: Partial<Record<(typeof technologies)[number]["group"], string>> = {
  "Design & Editors": "",
  Collaboration: "",
};

export function TechStack() {
  const groups = Array.from(new Set(technologies.map((t) => t.group)));

  return (
    <div className="font-sans flex flex-col gap-11">
      {groups.map((group) => {
        const emoji = groupEmoji[group];
        return (
          <div key={group}>
            <h3 className="mb-4 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[-0.01em] text-charcoal">
              {emoji && (
                <span aria-hidden className="text-base leading-none">
                  {emoji}
                </span>
              )}
              {group}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {technologies
                .filter((t) => t.group === group)
                .map((tech) => {
                  const slug = iconSlug[tech.name];
                  const color = brandColor[tech.name] ?? "1E3A6E";
                  return (
                    <li key={tech.name}>
                      <span className="inline-flex items-center gap-2 rounded-[14px] border border-black/[0.04] bg-[#f5f5f7] px-3.5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition-[background-color,transform] duration-200 hover:bg-[#ebebed] active:scale-[0.98]">
                        {slug ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://cdn.simpleicons.org/${slug}/${color}`}
                            alt=""
                            width={18}
                            height={18}
                            className="size-[18px] shrink-0"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="grid size-[18px] place-items-center rounded-[5px] bg-navy/10 text-[0.55rem] font-semibold text-navy"
                          >
                            {tech.name.slice(0, 2)}
                          </span>
                        )}
                        <span className="text-[0.875rem] font-medium tracking-[-0.015em] text-charcoal">
                          {tech.name}
                        </span>
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
