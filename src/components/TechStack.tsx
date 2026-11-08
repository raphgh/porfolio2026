import { technologies } from "@/data/site";

/**
 * Visual technology collection using Simple Icons CDN SVGs.
 */
/** Local SVGs for icons removed from Simple Icons (trademark). */
const localIcon: Record<string, string> = {
  "VS Code": "/icons/vscode.png",
  "C#": "/icons/csharp.svg",
  "REST APIs": "/icons/rest-api.png",
  "Microsoft SSMS": "/icons/ssms.png",
};

const iconSlug: Record<string, string> = {
  Java: "openjdk",
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML: "html5",
  CSS: "css",
  XML: "xml",
  SQL: "mysql",
  "React.js": "react",
  "Next.js": "nextdotjs",
  Motion: "framer",
  "Spring Boot": "springboot",
  ".NET": "dotnet",
  Figma: "figma",
  Cursor: "cursor",
  IntelliJ: "intellijidea",
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
  JavaScript: "F7DF1E",
  TypeScript: "3178C6",
  HTML: "E34F26",
  CSS: "1572B6",
  XML: "005FAD",
  "C#": "512BD4",
  SQL: "4479A1",
  "React.js": "61DAFB",
  "Next.js": "000000",
  Motion: "FF0055",
  "Spring Boot": "6DB33F",
  ".NET": "512BD4",
  "REST APIs": "1E3A6E",
  Figma: "F24E1E",
  Cursor: "000000",
  IntelliJ: "000000",
  "VS Code": "007ACC",
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
  "Design & IDEs": "",
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
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-3">
              {technologies
                .filter((t) => t.group === group)
                .map((tech) => {
                  const local = localIcon[tech.name];
                  const slug = iconSlug[tech.name];
                  const color = brandColor[tech.name] ?? "1E3A6E";
                  const src = local ?? (slug ? `https://cdn.simpleicons.org/${slug}/${color}` : null);
                  return (
                    <li key={tech.name}>
                      <span className="inline-flex items-center gap-2">
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt=""
                            width={tech.name === "REST APIs" ? 44 : 18}
                            height={18}
                            className={`h-[18px] shrink-0 object-contain ${
                              tech.name === "REST APIs" ? "w-11" : "w-[18px]"
                            }`}
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="grid size-[18px] place-items-center text-[0.55rem] font-semibold text-navy"
                          >
                            {tech.name.slice(0, 2)}
                          </span>
                        )}
                        <span className="text-[0.875rem] tracking-[-0.015em] text-charcoal">
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
