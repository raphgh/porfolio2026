import Link from "next/link";
import { nav, site } from "@/data/site";
import { LocalTime } from "./LocalTime";

const indexLinks = [
  { label: "Home", href: "/" },
  ...nav.map((item) => ({ label: item.label, href: item.href })),
  { label: "Resume", href: site.resume, external: true },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const mid = Math.ceil(indexLinks.length / 2);
  const left = indexLinks.slice(0, mid);
  const right = indexLinks.slice(mid);

  return (
    <footer className="relative z-10 border-t border-silver-soft bg-white">
      <div className="shell flex flex-col gap-8 pt-10 pb-8 md:gap-10 md:pt-12">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
          <div className="col-span-12 flex flex-col gap-1.5 md:col-span-5">
            <p className="display text-2xl text-navy lowercase">{site.name.toLowerCase()}</p>
            <LocalTime className="text-sm text-charcoal-muted tabular-nums" />
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-4">
            <h2 className="label mb-3 text-charcoal-muted">Index</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <ul className="flex flex-col gap-2">
                {left.map((item) => (
                  <li key={item.href}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className="text-navy hover:text-mustard-deep"
                      >
                        {item.label}
                        <span className="sr-only"> (PDF, opens in a new tab)</span>
                        <span aria-hidden> ↗</span>
                      </a>
                    ) : (
                      <Link href={item.href} className="text-navy hover:text-mustard-deep">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                {right.map((item) => (
                  <li key={item.href}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className="text-navy hover:text-mustard-deep"
                      >
                        {item.label}
                        <span className="sr-only"> (PDF, opens in a new tab)</span>
                        <span aria-hidden> ↗</span>
                      </a>
                    ) : (
                      <Link href={item.href} className="text-navy hover:text-mustard-deep">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <h2 className="label mb-3 text-charcoal-muted">reach out!</h2>
            <div className="flex flex-col gap-3">
              {site.contact.email && (
                <a href={`mailto:${site.contact.email}`} className="text-navy hover:text-mustard-deep">
                  {site.contact.email}
                </a>
              )}
              <ul className="flex items-center gap-4">
                {site.contact.linkedin && (
                  <li>
                    <a
                      href={site.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy transition-colors hover:text-mustard-deep"
                      aria-label="LinkedIn (opens in a new tab)"
                    >
                      <LinkedInIcon />
                    </a>
                  </li>
                )}
                {site.contact.github && (
                  <li>
                    <a
                      href={site.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy transition-colors hover:text-mustard-deep"
                      aria-label="GitHub (opens in a new tab)"
                    >
                      <GitHubIcon />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="label flex flex-col gap-3 border-t border-silver-soft pt-5 text-charcoal-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <a href="#main" className="hover:text-navy">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
